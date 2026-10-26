/**
 * Direct2Campus (D2C) — Two-Way Google Sheets Sync Script
 * 
 * INSTRUCTIONS TO INSTALL:
 * 1. Open your Google Sheet where leads are stored.
 * 2. In the top menu, click Extensions > Apps Script.
 * 3. Replace all existing code in Code.gs with this entire script.
 * 4. Click "Save" (disk icon).
 * 5. Click "Deploy" > "Manage deployments" (or "New deployment").
 * 6. Under "Who has access", select "Anyone".
 * 7. Click "Deploy" and copy the Web app URL.
 * 8. Paste that URL into .env.local as GOOGLE_SHEETS_WEBHOOK_URL.
 */

// Headers row configuration
var HEADERS = [
  "ID",
  "Submitted At",
  "Lead Type",
  "Student Name",
  "Phone",
  "Email",
  "Interested College",
  "Message",
  "Status",
  "Counselor Notes"
];

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  
  // Setup headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#f2f3ff");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// 1. GET: Read all leads from Google Sheets (Sync Sheets -> Admin)
function doGet(e) {
  try {
    var sheet = getOrCreateSheet();
    var lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      return jsonResponse({ success: true, leads: [], total: 0 });
    }
    
    var data = sheet.getRange(1, 1, lastRow, HEADERS.length).getValues();
    var leads = [];
    
    // Loop through rows (skip header row 0)
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var name = row[3] || "";
      var phone = row[4] ? String(row[4]) : "";
      
      // Only include non-empty rows
      if (name || phone) {
        leads.push({
          rowIndex: i + 1, // 1-based sheet row number for updates
          id: row[0] || ("LEAD-" + (i + 1)),
          created_at: row[1] || "",
          leadType: row[2] || "Direct Inquiry",
          name: name,
          phone: phone,
          email: row[5] || "",
          interestedCollege: row[6] || "",
          message: row[7] || "",
          status: row[8] || "New",
          notes: row[9] || ""
        });
      }
    }
    
    // Return newest first
    leads.reverse();
    return jsonResponse({ success: true, leads: leads, total: leads.length });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

// 2. POST: Handle Create, Update, and Delete (Sync Admin -> Sheets)
function doPost(e) {
  try {
    var sheet = getOrCreateSheet();
    var payload = {};
    
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    }
    
    var action = payload.action || "create";
    
    // --- ACTION A: UPDATE ROW FROM ADMIN ---
    if (action === "update") {
      var rowIndex = parseInt(payload.rowIndex, 10);
      
      // If rowIndex is provided and valid
      if (rowIndex && rowIndex > 1 && rowIndex <= sheet.getLastRow()) {
        if (payload.status !== undefined) {
          sheet.getRange(rowIndex, 9).setValue(payload.status);
        }
        if (payload.notes !== undefined) {
          sheet.getRange(rowIndex, 10).setValue(payload.notes);
        }
        if (payload.interestedCollege !== undefined) {
          sheet.getRange(rowIndex, 7).setValue(payload.interestedCollege);
        }
        return jsonResponse({ success: true, message: "Row updated in Google Sheets", rowIndex: rowIndex });
      }
      
      // Fallback: search by ID
      if (payload.id) {
        var data = sheet.getRange(1, 1, sheet.getLastRow(), 1).getValues();
        for (var r = 1; r < data.length; r++) {
          if (String(data[r][0]) === String(payload.id)) {
            var targetRow = r + 1;
            if (payload.status !== undefined) sheet.getRange(targetRow, 9).setValue(payload.status);
            if (payload.notes !== undefined) sheet.getRange(targetRow, 10).setValue(payload.notes);
            return jsonResponse({ success: true, message: "Row updated by ID", rowIndex: targetRow });
          }
        }
      }
      return jsonResponse({ success: false, error: "Row not found for update" });
    }
    
    // --- ACTION B: DELETE ROW FROM ADMIN ---
    if (action === "delete") {
      var deleteRowIndex = parseInt(payload.rowIndex, 10);
      if (deleteRowIndex && deleteRowIndex > 1 && deleteRowIndex <= sheet.getLastRow()) {
        sheet.deleteRow(deleteRowIndex);
        return jsonResponse({ success: true, message: "Row deleted from Google Sheets" });
      }
      return jsonResponse({ success: false, error: "Invalid row index for deletion" });
    }
    
    // --- ACTION C: CREATE NEW LEAD (Default from public site forms) ---
    var timestamp = payload.submittedAt || Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MM-yyyy hh:mm a");
    var leadId = "L-" + Utilities.formatDate(new Date(), "Asia/Kolkata", "yyMMdd-HHmmss");
    
    sheet.appendRow([
      leadId,
      timestamp,
      payload.leadType || "Direct Admission",
      payload.name || "",
      payload.phone ? String(payload.phone) : "",
      payload.email || "",
      payload.interestedCollege || "",
      payload.message || "",
      payload.status || "New",
      payload.notes || ""
    ]);
    
    return jsonResponse({ success: true, message: "Lead captured successfully", id: leadId });
    
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
