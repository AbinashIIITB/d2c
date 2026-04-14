function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // The user added a row above the headers.
    // Headers are now in row 2 (instead of row 1).
    const headerRow = 2;
    const headers = sheet.getRange(headerRow, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Map the incoming JSON data to the corresponding columns based on Row 2 headers
    const row = headers.map(header => {
      switch(header) {
        case "Lead Type": return data.leadType || "";
        case "Name": return data.name || "";
        case "Phone": return data.phone || "";
        case "Email": return data.email || "";
        case "Message": return data.message || "";
        case "Interested College": return data.interestedCollege || "";
        case "Submitted At": return data.submittedAt || "";
        default: return "";
      }
    });
    
    // Append the data row at the end of the sheet
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
