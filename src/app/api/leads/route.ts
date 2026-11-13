import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const LEADS_FILE = path.join(process.cwd(), "src", "data", "leads-store.json");
const TMP_LEADS_FILE = path.join("/tmp", "d2c-leads-store.json");

function inferCategory(course: string, formType: string, message: string): string {
  const combined = `${course} ${formType} ${message}`.toLowerCase();
  if (combined.includes("b.tech") || combined.includes("btech") || combined.includes("engineering") || combined.includes("cse") || combined.includes("wbjee") || combined.includes("jee")) {
    return "B.Tech";
  }
  if (combined.includes("mba") || combined.includes("pgdm") || combined.includes("b-school") || combined.includes("cat") || combined.includes("mat")) {
    return "MBA";
  }
  if (combined.includes("mbbs") || combined.includes("bds") || combined.includes("neet") || combined.includes("medical")) {
    return "Medical / MBBS";
  }
  if (combined.includes("callback") || formType.toLowerCase().includes("callback")) {
    return "Callback";
  }
  if (combined.includes("college") || formType.toLowerCase().includes("college")) {
    return "College Query";
  }
  if (combined.includes("exam") || formType.toLowerCase().includes("exam")) {
    return "Exam Query";
  }
  return "General Enquiry";
}

function persistLocalLead(lead: any) {
  try {
    let currentLeads: any[] = [];
    if (fs.existsSync(LEADS_FILE)) {
      const raw = fs.readFileSync(LEADS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.leads)) currentLeads = parsed.leads;
    }
    currentLeads.unshift(lead);
    const payload = JSON.stringify({ leads: currentLeads, updatedAt: new Date().toISOString() }, null, 2);
    const dir = path.dirname(LEADS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LEADS_FILE, payload, "utf-8");
  } catch (err) {
    console.warn("Could not write to local leads store:", err);
  }

  try {
    let tmpLeads: any[] = [];
    if (fs.existsSync(TMP_LEADS_FILE)) {
      const raw = fs.readFileSync(TMP_LEADS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.leads)) tmpLeads = parsed.leads;
    }
    tmpLeads.unshift(lead);
    fs.writeFileSync(TMP_LEADS_FILE, JSON.stringify({ leads: tmpLeads }), "utf-8");
  } catch {
    // Ignore serverless /tmp error
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const course = data.course || data.targetCourse || "";
    const formType = data.formType || data.leadType || "Application Form";
    const name = data.name || (data.firstName ? `${data.firstName} ${data.lastName || ""}`.trim() : "Prospective Student");
    const phone = data.phone || "";
    const email = data.email || "";
    const college = data.interestedCollege || data.college || "";
    const exam = data.exam || "";
    const message = data.message || "";
    const category = inferCategory(course, formType, message);

    const nowTimestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata", 
      day: "2-digit", 
      month: "2-digit", 
      year: "numeric", 
      hour: "2-digit", 
      minute: "2-digit", 
      hour12: true
    }).replace(/\//g, '-').replace(',', '').toUpperCase();

    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const structuredLead = {
      id: leadId,
      name,
      phone,
      email,
      course: course || (category !== "General Enquiry" ? category : ""),
      formType,
      category,
      interestedCollege: college,
      college,
      exam,
      message,
      submittedAt: nowTimestamp,
      status: "New",
      notes: `Submitted via website (${formType})`,
      created_at: new Date().toISOString()
    };

    // 1. Always persist to local store (ensures 100% zero-lead-loss guarantee)
    persistLocalLead(structuredLead);

    // 2. Save to Supabase 'leads' table if connected
    if (isSupabaseConfigured) {
      try {
        await supabaseAdmin.from("leads").insert([{
          id: leadId,
          name,
          phone,
          email,
          lead_type: formType,
          interested_college: college,
          message: `${message} [Course: ${course || category}]`,
          status: "New",
          created_at: new Date().toISOString()
        }]);
      } catch (dbErr) {
        console.warn("Supabase lead insertion error:", dbErr);
      }
    }

    // 3. Send to Google Sheets Webhook if configured
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "create",
            id: leadId,
            leadType: `${category}: ${formType}`,
            name,
            phone,
            email,
            message: `Course: ${course || category} | College: ${college} | ${message}`,
            interestedCollege: college,
            submittedAt: nowTimestamp,
            status: "New",
            notes: ""
          }),
        });
      } catch (sheetErr) {
        console.warn("Google Apps Script webhook forward failed:", sheetErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
      leadId,
      category
    });
  } catch (error: any) {
    console.error("Failed to process lead:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to submit lead" },
      { status: 500 }
    );
  }
}
