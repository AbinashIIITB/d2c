import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/auth';
import { 
  fetchFromGoogleSheet, 
  fetchFromAppsScript, 
  updateGoogleSheetRow, 
  deleteGoogleSheetRow 
} from '@/lib/google-sheets';
import { supabaseAdmin } from '@/lib/supabase';

// 1. GET: Fetch leads from Google Sheets (Sync Sheets -> Admin)
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

    // First try Google Apps Script webhook
    if (webhookUrl) {
      const scriptLeads = await fetchFromAppsScript(webhookUrl);
      if (scriptLeads.length > 0) {
        return NextResponse.json({
          leads: scriptLeads,
          source: 'apps-script',
          count: scriptLeads.length,
          webhookConfigured: true
        });
      }
    }

    // Next try direct Google Sheet ID/URL
    if (sheetId) {
      const sheetLeads = await fetchFromGoogleSheet(sheetId);
      if (sheetLeads.length > 0) {
        return NextResponse.json({
          leads: sheetLeads,
          source: 'google-sheets',
          sheetId,
          count: sheetLeads.length,
          webhookConfigured: Boolean(webhookUrl)
        });
      }
    }

    // Check Supabase 'leads' table if present
    const { data: dbLeads, error } = await supabaseAdmin
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && dbLeads && dbLeads.length > 0) {
      return NextResponse.json({
        leads: dbLeads,
        source: 'supabase',
        count: dbLeads.length,
        webhookConfigured: Boolean(webhookUrl)
      });
    }

    return NextResponse.json({
      leads: [],
      source: 'none',
      sheetConfigured: Boolean(sheetId),
      webhookConfigured: Boolean(webhookUrl),
      message: 'No leads found yet in connected sheet.'
    });
  } catch (error: any) {
    console.error('Error in leads API (GET):', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. PATCH: Update a lead's status/notes (Sync Admin -> Google Sheets)
export async function PATCH(req: Request) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json({ 
        error: 'GOOGLE_SHEETS_WEBHOOK_URL is not configured in .env.local' 
      }, { status: 400 });
    }

    const success = await updateGoogleSheetRow(webhookUrl, {
      rowIndex: body.rowIndex,
      id: body.id,
      status: body.status,
      notes: body.notes,
      interestedCollege: body.interestedCollege
    });

    if (!success) {
      return NextResponse.json({ error: 'Failed to update row in Google Sheets' }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      message: 'Status/Notes successfully updated in Google Sheets'
    });
  } catch (error: any) {
    console.error('Error in leads API (PATCH):', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 3. DELETE: Remove lead from Google Sheets (Sync Admin -> Google Sheets)
export async function DELETE(req: Request) {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const rowIndex = searchParams.get('rowIndex');
    const id = searchParams.get('id');
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json({ 
        error: 'GOOGLE_SHEETS_WEBHOOK_URL is not configured in .env.local' 
      }, { status: 400 });
    }

    const success = await deleteGoogleSheetRow(webhookUrl, {
      rowIndex: rowIndex ? parseInt(rowIndex, 10) : undefined,
      id: id || undefined
    });

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete row from Google Sheets' }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      message: 'Lead deleted from Google Sheets'
    });
  } catch (error: any) {
    console.error('Error in leads API (DELETE):', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
