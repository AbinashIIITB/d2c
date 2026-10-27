export interface ParsedLead {
  rowIndex?: number;
  id: string;
  name: string;
  phone: string;
  email?: string;
  interestedCollege?: string;
  leadType?: string;
  message?: string;
  status?: string;
  notes?: string;
  created_at?: string;
  submittedAt?: string;
}

/**
 * Format any incoming Google Sheets timestamp/date into a clean, human-readable format
 * (e.g., "27 Oct 2026, 11:35 PM")
 */
export function formatLeadTimestamp(raw?: any): string {
  if (!raw) return 'Recent';
  const str = String(raw).trim();
  if (!str || str.toLowerCase() === 'undefined' || str.toLowerCase() === 'null') return 'Recent';

  // 1. Google Visualization API format: Date(2026,9,27,23,35,8) - month is 0-indexed
  const gvizMatch = str.match(/Date\((\d+),(\d+),(\d+)(?:,(\d+),(\d+)(?:,(\d+))?)?\)/);
  if (gvizMatch) {
    const [, y, m, d, hh = '0', mm = '0'] = gvizMatch;
    const date = new Date(Number(y), Number(m), Number(d), Number(hh), Number(mm));
    if (!isNaN(date.getTime())) {
      return formatDatePretty(date);
    }
  }

  // 2. Day-Month-Year format e.g. 27-10-2026 or 27/10/2026 with optional time
  const dmyMatch = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})(?:\s+(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM|am|pm)?)?$/i);
  if (dmyMatch) {
    const [, d, m, y, hh, mm, ampm] = dmyMatch;
    let hour = hh ? parseInt(hh, 10) : 0;
    const min = mm ? parseInt(mm, 10) : 0;
    if (ampm) {
      if (ampm.toUpperCase() === 'PM' && hour < 12) hour += 12;
      if (ampm.toUpperCase() === 'AM' && hour === 12) hour = 0;
    }
    const date = new Date(Number(y), Number(m) - 1, Number(d), hour, min);
    if (!isNaN(date.getTime())) {
      return formatDatePretty(date);
    }
  }

  // 3. Year-Month-Day format e.g. 2026-10-27
  const ymdMatch = str.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:\s+(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM|am|pm)?)?$/i);
  if (ymdMatch) {
    const [, y, m, d, hh, mm, ampm] = ymdMatch;
    let hour = hh ? parseInt(hh, 10) : 0;
    const min = mm ? parseInt(mm, 10) : 0;
    if (ampm) {
      if (ampm.toUpperCase() === 'PM' && hour < 12) hour += 12;
      if (ampm.toUpperCase() === 'AM' && hour === 12) hour = 0;
    }
    const date = new Date(Number(y), Number(m) - 1, Number(d), hour, min);
    if (!isNaN(date.getTime())) {
      return formatDatePretty(date);
    }
  }

  // 4. Standard Date parsing (ISO strings, Date.toString(), etc.)
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime()) && parsed.getFullYear() > 2000) {
    return formatDatePretty(parsed);
  }

  return str;
}

function formatDatePretty(d: Date): string {
  try {
    return d.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return d.toLocaleDateString();
  }
}

export function extractSheetId(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9-_]{20,}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return trimmed;
}

/**
 * 1. Read live leads from Google Apps Script Webhook (doGet)
 */
export async function fetchFromAppsScript(webhookUrl: string): Promise<ParsedLead[]> {
  try {
    const res = await fetch(webhookUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 0 },
      cache: 'no-store'
    });

    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      const text = await res.text();

      // Check if it's JSON
      if (text.startsWith('{') || text.startsWith('[') || contentType.includes('application/json')) {
        try {
          const data = JSON.parse(text);
          const list = Array.isArray(data) ? data : (data.leads || data.data || []);
          if (Array.isArray(list) && list.length > 0) {
            return list.map((item: any, idx: number) => {
              const formattedTime = formatLeadTimestamp(
                item.submittedAt || item.date || item.created_at || item.timestamp || item.time || item['Submitted At'] || item['Timestamp']
              );
              return {
                rowIndex: item.rowIndex || (idx + 2),
                id: String(item.id || `lead-${idx + 1}`),
                name: item.name || item.studentName || 'Student',
                phone: String(item.phone || item.mobile || ''),
                email: item.email || '',
                interestedCollege: item.interestedCollege || item.college || '',
                leadType: item.leadType || item.type || 'Direct Admission',
                message: item.message || '',
                status: item.status || 'New',
                notes: item.notes || '',
                created_at: formattedTime,
                submittedAt: formattedTime
              };
            });
          }
        } catch (e) {
          console.warn('Apps Script returned non-JSON text');
        }
      }
    }
  } catch (err) {
    console.error('Error fetching from Apps Script:', err);
  }
  return [];
}

/**
 * 2. Update a row in Google Sheets via Apps Script Webhook (Admin -> Google Sheets)
 */
export async function updateGoogleSheetRow(
  webhookUrl: string, 
  payload: { rowIndex?: number; id?: string; status?: string; notes?: string; interestedCollege?: string }
): Promise<boolean> {
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update',
        ...payload
      })
    });

    if (!res.ok) return false;
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return Boolean(data.success);
    } catch {
      return true;
    }
  } catch (err) {
    console.error('Error updating Google Sheet row:', err);
    return false;
  }
}

/**
 * 3. Delete a row in Google Sheets via Apps Script Webhook (Admin -> Google Sheets)
 */
export async function deleteGoogleSheetRow(
  webhookUrl: string,
  payload: { rowIndex?: number; id?: string }
): Promise<boolean> {
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'delete',
        ...payload
      })
    });

    if (!res.ok) return false;
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return Boolean(data.success);
    } catch {
      return true;
    }
  } catch (err) {
    console.error('Error deleting Google Sheet row:', err);
    return false;
  }
}

/**
 * 4. Read live leads directly from Google Sheet ID / URL via GViz or CSV
 */
export async function fetchFromGoogleSheet(sheetIdOrUrl: string): Promise<ParsedLead[]> {
  const sheetId = extractSheetId(sheetIdOrUrl);
  if (!sheetId) return [];

  try {
    // Try Google Visualization API (GViz)
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
    const res = await fetch(gvizUrl, { next: { revalidate: 0 }, cache: 'no-store' });

    if (res.ok) {
      const text = await res.text();
      if (text.includes('google.visualization.Query.setResponse')) {
        const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
        const data = JSON.parse(jsonStr);

        const cols: string[] = (data.table?.cols || []).map((c: any) =>
          String(c.label || c.id || '').trim().toLowerCase()
        );

        const rows: ParsedLead[] = (data.table?.rows || [])
          .map((r: any, idx: number) => {
            const raw: Record<string, string> = {};
            (r.c || []).forEach((cell: any, i: number) => {
              const colName = cols[i] || `col_${i}`;
              raw[colName] = cell ? String(cell.f || cell.v || '').trim() : '';
            });

            const id = findField(raw, ['id', 'leadid']) || `L-${idx + 2}`;
            const name = findField(raw, ['name', 'student name', 'full name', 'lead name']) ||
              Object.values(raw)[3] || Object.values(raw)[1] || 'Student';
            const phone = findField(raw, ['phone', 'mobile', 'contact', 'phone number', 'whatsapp']) ||
              Object.values(raw)[4] || Object.values(raw)[2] || '';
            const email = findField(raw, ['email', 'mail', 'email address']);
            const interestedCollege = findField(raw, ['interestedcollege', 'college', 'interested college', 'target college', 'course']);
            const leadType = findField(raw, ['leadtype', 'type', 'inquiry type', 'lead type', 'source']) || 'Direct Inquiry';
            const message = findField(raw, ['message', 'notes', 'query']);
            const status = findField(raw, ['status', 'state']) || 'New';
            const notes = findField(raw, ['counselornotes', 'counselor notes', 'admin notes', 'note', 'remarks']) || '';
            const rawCreatedAt = findField(raw, [
              'submittedat', 
              'date', 
              'timestamp', 
              'time', 
              'submitted at', 
              'created at', 
              'created_at',
              'submissiondate',
              'submission date',
              'submissiontime'
            ]) || Object.values(raw)[1]; // Column 2 in default sheets is Submitted At / Timestamp

            const formattedTime = formatLeadTimestamp(rawCreatedAt);

            return {
              rowIndex: idx + 2, // 1-based index (row 1 is header)
              id,
              name,
              phone,
              email,
              interestedCollege,
              leadType,
              message,
              status,
              notes,
              created_at: formattedTime,
              submittedAt: formattedTime
            };
          })
          .filter((l: ParsedLead) => l.name || l.phone);

        if (rows.length > 0) {
          return rows.reverse(); // Newest first
        }
      }
    }

    // Fallback: CSV Export
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    const csvRes = await fetch(csvUrl, { next: { revalidate: 0 }, cache: 'no-store' });

    if (csvRes.ok) {
      const csvText = await csvRes.text();
      return parseCsvToLeads(csvText);
    }
  } catch (err) {
    console.error('Error fetching Google Sheet:', err);
  }

  return [];
}

function findField(obj: Record<string, string>, possibleKeys: string[]): string {
  for (const key of possibleKeys) {
    for (const [k, v] of Object.entries(obj)) {
      if (k.toLowerCase().replace(/[^a-z0-9]/g, '') === key.toLowerCase().replace(/[^a-z0-9]/g, '')) {
        return v;
      }
    }
  }
  return '';
}

function parseCsvToLeads(csvText: string): ParsedLead[] {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.replace(/^["']|["']$/g, '').trim().toLowerCase());

  const leads: ParsedLead[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    const raw: Record<string, string> = {};
    headers.forEach((h, idx) => {
      raw[h] = values[idx] || '';
    });

    const name = findField(raw, ['name', 'student name', 'full name']) || values[3] || values[1] || 'Student';
    const phone = findField(raw, ['phone', 'mobile', 'contact']) || values[4] || values[2] || '';

    if (name || phone) {
      const rawCreatedAt = findField(raw, [
        'submittedat', 
        'date', 
        'timestamp', 
        'submitted at', 
        'created at', 
        'time', 
        'submission date'
      ]) || values[1];

      const formattedTime = formatLeadTimestamp(rawCreatedAt);

      leads.push({
        rowIndex: i + 1,
        id: findField(raw, ['id']) || `L-${i + 1}`,
        name,
        phone,
        email: findField(raw, ['email', 'mail']),
        interestedCollege: findField(raw, ['interestedcollege', 'college', 'course']),
        leadType: findField(raw, ['leadtype', 'type']) || 'Direct Inquiry',
        message: findField(raw, ['message', 'query']),
        status: findField(raw, ['status']) || 'New',
        notes: findField(raw, ['counselornotes', 'notes']) || '',
        created_at: formattedTime,
        submittedAt: formattedTime
      });
    }
  }

  return leads.reverse();
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' || char === "'") {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim().replace(/^["']|["']$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim().replace(/^["']|["']$/g, ''));
  return result;
}
