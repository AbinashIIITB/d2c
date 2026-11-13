import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { checkAdminAuth } from '@/lib/auth';
import { 
  fetchFromGoogleSheet, 
  fetchFromAppsScript, 
  updateGoogleSheetRow, 
  deleteGoogleSheetRow 
} from '@/lib/google-sheets';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

const LEADS_FILE = path.join(process.cwd(), "src", "data", "leads-store.json");

function getLocalLeads(): any[] {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const raw = fs.readFileSync(LEADS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.leads)) return parsed.leads;
    }
  } catch (err) {
    console.warn("Could not read local leads store:", err);
  }
  return [];
}

function updateLocalLead(id: string, updates: Partial<{ status: string; notes: string }>): boolean {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const raw = fs.readFileSync(LEADS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.leads)) {
        const idx = parsed.leads.findIndex((l: any) => String(l.id) === String(id));
        if (idx >= 0) {
          parsed.leads[idx] = { ...parsed.leads[idx], ...updates };
          fs.writeFileSync(LEADS_FILE, JSON.stringify(parsed, null, 2), "utf-8");
          return true;
        }
      }
    }
  } catch (err) {
    console.warn("Error updating local lead:", err);
  }
  return false;
}

function deleteLocalLead(id: string): boolean {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const raw = fs.readFileSync(LEADS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.leads)) {
        parsed.leads = parsed.leads.filter((l: any) => String(l.id) !== String(id));
        fs.writeFileSync(LEADS_FILE, JSON.stringify(parsed, null, 2), "utf-8");
        return true;
      }
    }
  } catch (err) {
    console.warn("Error deleting local lead:", err);
  }
  return false;
}

// 1. GET: Fetch leads from Sheets, Supabase, and local store
export async function GET(req: Request) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const customSheetId = searchParams.get('sheetId');
    const sheetId = customSheetId || process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEET_URL || '';
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || '';

    const leadsMap = new Map<string, any>();

    // 1. Load local persistent leads first
    const localLeads = getLocalLeads();
    for (const l of localLeads) {
      const key = l.id || `${l.phone}_${l.submittedAt}`;
      leadsMap.set(key, l);
    }

    // 2. Fetch from Google Apps Script webhook
    if (webhookUrl) {
      try {
        const scriptLeads = await fetchFromAppsScript(webhookUrl);
        for (const sl of scriptLeads) {
          const key = sl.id || `${sl.phone}_${sl.submittedAt}`;
          if (!leadsMap.has(key)) {
            leadsMap.set(key, sl);
          }
        }
      } catch (scriptErr) {
        console.warn('Apps Script leads fetch warning:', scriptErr);
      }
    }

    // 3. Next try direct Google Sheet ID/URL
    if (sheetId) {
      try {
        const sheetLeads = await fetchFromGoogleSheet(sheetId);
        for (const sh of sheetLeads) {
          const key = sh.id || `${sh.phone}_${sh.submittedAt}`;
          if (!leadsMap.has(key)) {
            leadsMap.set(key, sh);
          }
        }
      } catch (sheetErr) {
        console.warn('Google Sheet CSV fetch warning:', sheetErr);
      }
    }

    // 4. Check Supabase 'leads' table if connected
    if (isSupabaseConfigured) {
      try {
        const { data: dbLeads, error } = await supabaseAdmin
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(dbLeads)) {
          for (const dbl of dbLeads) {
            const key = dbl.id || `${dbl.phone}_${dbl.created_at}`;
            if (!leadsMap.has(key)) {
              leadsMap.set(key, {
                id: dbl.id,
                name: dbl.name,
                phone: dbl.phone,
                email: dbl.email,
                leadType: dbl.lead_type,
                interestedCollege: dbl.interested_college,
                message: dbl.message,
                status: dbl.status || 'New',
                notes: dbl.notes || '',
                submittedAt: dbl.created_at
              });
            }
          }
        }
      } catch (dbErr) {
        console.warn('Supabase leads fetch warning:', dbErr);
      }
    }

    const combinedLeads = Array.from(leadsMap.values());

    return NextResponse.json({
      leads: combinedLeads,
      source: webhookUrl ? 'apps-script' : (sheetId ? 'google-sheets' : 'local-store'),
      count: combinedLeads.length,
      webhookConfigured: Boolean(webhookUrl)
    });
  } catch (error: any) {
    console.error('Error in leads API (GET):', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. PATCH: Update a lead's status/notes (Sync Admin -> Sheets & Local)
export async function PATCH(req: Request) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    // Update local store
    if (body.id) {
      updateLocalLead(body.id, { status: body.status, notes: body.notes });
    }

    // Update Supabase if configured
    if (isSupabaseConfigured && body.id) {
      try {
        await supabaseAdmin
          .from('leads')
          .update({ status: body.status, notes: body.notes })
          .eq('id', body.id);
      } catch (err) {
        console.warn('Supabase lead update error:', err);
      }
    }

    // Sync to Google Sheets if configured
    if (webhookUrl) {
      await updateGoogleSheetRow(webhookUrl, {
        rowIndex: body.rowIndex,
        id: body.id,
        status: body.status,
        notes: body.notes,
      });
    }

    return NextResponse.json({ success: true, message: 'Lead updated successfully' });
  } catch (error: any) {
    console.error('Error in leads API (PATCH):', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 3. DELETE: Remove lead from Sheets & Local Store
export async function DELETE(req: Request) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (body.id) {
      deleteLocalLead(body.id);
    }

    if (isSupabaseConfigured && body.id) {
      try {
        await supabaseAdmin.from('leads').delete().eq('id', body.id);
      } catch (err) {
        console.warn('Supabase lead delete error:', err);
      }
    }

    if (webhookUrl && (body.rowIndex || body.id)) {
      await deleteGoogleSheetRow(webhookUrl, {
        rowIndex: body.rowIndex,
        id: body.id,
      });
    }

    return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error: any) {
    console.error('Error in leads API (DELETE):', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
