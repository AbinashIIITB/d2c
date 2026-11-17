#!/usr/bin/env node
// Removes "direct admission" wording and college-partner claims from the live Supabase rows
// (colleges, exams, blogs, and the CMS pages store row), using the rules in ./wording-rules.mjs.
//
//   node scripts/cleanup-db-wording.mjs                     dry run (default): prints changes, writes a JSON report
//   node scripts/cleanup-db-wording.mjs --apply             backs up originals, then PATCHes only the changed columns
//   node scripts/cleanup-db-wording.mjs --restore <backup>  puts the original values back from a backup file
//
// Options: --report <file> (default ./wording-cleanup-report.json)
//          --backup <file> (default ./wording-cleanup-backup-<timestamp>.json)
//          --tables colleges,exams,blogs
// Needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (read from env, else parsed from .env.local).
// Node 20+, no dependencies. Exits non-zero on any HTTP error. Secrets are never printed.

import fs from 'node:fs';
import path from 'node:path';
import { cleanValue, SELF_CHECK_RE } from './wording-rules.mjs';

// Internal store rows whose `description` column holds a JSON string of CMS docs (pages, blogs).
const JSON_STORE_IDS = new Set(['__d2c_cms_pages_store__', '__d2c_cms_blogs_store__']);
const PAGE_SIZE = 500;

// ---- args ------------------------------------------------------------------------------------
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const opt = (n, d) => {
  const i = argv.indexOf(n);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : d;
};
const APPLY = flag('--apply');
const RESTORE = opt('--restore');
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const REPORT = opt('--report', './wording-cleanup-report.json');
const BACKUP = opt('--backup', `./wording-cleanup-backup-${stamp}.json`);
const TABLES = (opt('--tables', 'colleges,exams,blogs') || '').split(',').map((s) => s.trim()).filter(Boolean);
if (APPLY && RESTORE) die('Use either --apply or --restore, not both.');

function die(msg) {
  console.error(`ERROR: ${msg}`);
  process.exit(1);
}

// ---- env -------------------------------------------------------------------------------------
function loadEnvFile() {
  const candidates = [path.resolve('.env.local'), path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', '.env.local')];
  for (const f of candidates) {
    if (!fs.existsSync(f)) continue;
    for (const line of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!m || line.trim().startsWith('#')) continue;
      let v = m[2];
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      else v = v.replace(/\s+#.*$/, '');
      if (process.env[m[1]] === undefined) process.env[m[1]] = v;
    }
    return;
  }
}
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) loadEnvFile();
const BASE = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/+$/, '');
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
if (!BASE || !KEY) die('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set (env or .env.local).');

const headers = (extra = {}) => ({ apikey: KEY, Authorization: `Bearer ${KEY}`, ...extra });

class HttpError extends Error {
  constructor(status, where, body) {
    super(`HTTP ${status} on ${where}: ${String(body).slice(0, 300)}`);
    this.status = status;
  }
}

async function fetchAll(table) {
  const rows = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const res = await fetch(`${BASE}/rest/v1/${encodeURIComponent(table)}?select=*&order=id.asc`, {
      headers: headers({ 'Range-Unit': 'items', Range: `${from}-${from + PAGE_SIZE - 1}` }),
    });
    if (res.status === 404) return null; // table missing
    if (!res.ok) {
      const body = await res.text();
      if (/PGRST205|does not exist|schema cache/i.test(body)) return null;
      throw new HttpError(res.status, `GET ${table}`, body);
    }
    const page = await res.json();
    rows.push(...page);
    if (page.length < PAGE_SIZE) break;
  }
  return rows;
}

async function patchRow(table, id, fields) {
  const res = await fetch(`${BASE}/rest/v1/${encodeURIComponent(table)}?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: headers({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new HttpError(res.status, `PATCH ${table} id=${id}`, await res.text());
}

// ---- diff helpers ----------------------------------------------------------------------------
function excerpt(before, after) {
  let i = 0;
  while (i < before.length && i < after.length && before[i] === after[i]) i++;
  let ea = before.length, eb = after.length;
  while (ea > i && eb > i && before[ea - 1] === after[eb - 1]) { ea--; eb--; }
  const ctx = 28;
  const cut = (s, a, b) => (a > ctx ? '…' : '') + s.slice(Math.max(0, a - ctx), Math.min(s.length, b + ctx)) + (b + ctx < s.length ? '…' : '');
  return { before: cut(before, i, ea).replace(/\s+/g, ' '), after: cut(after, i, eb).replace(/\s+/g, ' ') };
}

/** Clean one column value. Returns { value, changes[] } where changes is a list of {before, after} excerpts. */
function cleanColumn(row, col) {
  const orig = row[col];
  const changes = [];
  const onChange = (b, a) => changes.push(excerpt(b, a));

  if (JSON_STORE_IDS.has(row.id)) {
    if (col !== 'description' || typeof orig !== 'string') return { value: orig, changes };
    let parsed;
    try { parsed = JSON.parse(orig); } catch { return { value: orig, changes }; }
    const cleaned = cleanValue(parsed, onChange);
    if (!changes.length) return { value: orig, changes };
    const indent = /^[{\[]\r?\n([ \t]+)/.exec(orig)?.[1] ?? undefined;
    return { value: JSON.stringify(cleaned, null, indent), changes };
  }
  const value = cleanValue(orig, onChange, col);
  return { value: changes.length ? value : orig, changes };
}

const isInternalRow = (row) => typeof row.id === 'string' && row.id.startsWith('__d2c_') && !JSON_STORE_IDS.has(row.id);

// ---- restore ---------------------------------------------------------------------------------
async function restore(file) {
  const b = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!b || !b.changed) die('Backup file has no "changed" section.');
  let n = 0;
  for (const [table, rows] of Object.entries(b.changed)) {
    const originals = new Map((b.rows[table] || []).map((r) => [String(r.id), r]));
    for (const [id, cols] of Object.entries(rows)) {
      const orig = originals.get(id);
      if (!orig) die(`Backup is missing the original row ${table}/${id}.`);
      const fields = Object.fromEntries(cols.map((c) => [c, orig[c]]));
      await patchRow(table, id, fields);
      n++;
    }
  }
  console.log(`Restored ${n} row(s) from ${file}.`);
}

// ---- main ------------------------------------------------------------------------------------
async function main() {
  if (RESTORE) return restore(RESTORE);

  console.log(`Mode: ${APPLY ? 'APPLY (writes to the database)' : 'DRY RUN (no writes)'}  host: ${new URL(BASE).host}`);
  const report = { generatedAt: new Date().toISOString(), mode: APPLY ? 'apply' : 'dry-run', tables: {} };
  const backup = { createdAt: report.generatedAt, host: new URL(BASE).host, rows: {}, changed: {} };
  const patches = []; // {table,id,fields}
  const totals = { rowsScanned: 0, rowsChanged: 0, fieldsChanged: 0, stringsChanged: 0 };

  for (const table of TABLES) {
    const rows = await fetchAll(table);
    if (rows === null) { console.log(`[${table}] table not found, skipped`); report.tables[table] = { skipped: 'not found' }; continue; }
    const t = (report.tables[table] = { scanned: rows.length, skippedInternal: 0, changedRows: [] });
    for (const row of rows) {
      if (isInternalRow(row)) { t.skippedInternal++; continue; }
      totals.rowsScanned++;
      const fields = {};
      const detail = {};
      for (const col of Object.keys(row)) {
        if (col === 'id') continue;
        const { value, changes } = cleanColumn(row, col);
        if (value != null && SELF_CHECK_RE.test(typeof value === 'string' ? value : JSON.stringify(value))) {
          (t.residual ||= []).push({ id: row.id, column: col });
        }
        if (!changes.length) continue;
        fields[col] = value;
        detail[col] = changes;
        totals.stringsChanged += changes.length;
      }
      const cols = Object.keys(fields);
      if (!cols.length) continue;
      totals.rowsChanged++;
      totals.fieldsChanged += cols.length;
      t.changedRows.push({ id: row.id, name: row.name ?? row.title ?? row.slug ?? null, fields: detail });
      patches.push({ table, id: row.id, fields });
      (backup.rows[table] ||= []).push(row);
      ((backup.changed[table] ||= {})[String(row.id)] = cols);
      console.log(`\n[${table}] ${row.id}${row.name ? ` (${String(row.name).slice(0, 50)})` : ''}`);
      for (const col of cols) {
        const shown = detail[col].slice(0, 4);
        console.log(`  ${col}: ${detail[col].length} change(s)`);
        for (const c of shown) console.log(`    - ${c.before}\n    + ${c.after}`);
        if (detail[col].length > shown.length) console.log(`    ... ${detail[col].length - shown.length} more (see report)`);
      }
    }
  }

  report.totals = totals;
  fs.writeFileSync(REPORT, JSON.stringify(report, null, 2) + '\n');
  console.log(`\nSummary: scanned ${totals.rowsScanned} rows, ${totals.rowsChanged} would change (${totals.fieldsChanged} fields, ${totals.stringsChanged} strings).`);
  for (const [tb, t] of Object.entries(report.tables)) console.log(`  ${tb}: ${t.skipped ? 'skipped' : `${t.scanned} rows, ${t.changedRows.length} changed, ${t.skippedInternal} internal skipped`}`);
  for (const [tb, t] of Object.entries(report.tables)) {
    if (t.residual?.length) console.log(`  WARNING ${tb}: ${t.residual.length} column(s) still match the self-check pattern after cleaning (see report.residual): review by hand.`);
  }
  console.log(`Report: ${REPORT}`);

  if (!APPLY) { console.log('Dry run only. Re-run with --apply to write.'); return; }
  if (!patches.length) { console.log('Nothing to change.'); return; }

  fs.writeFileSync(BACKUP, JSON.stringify(backup, null, 2) + '\n');
  console.log(`Backup of ${patches.length} original row(s) saved: ${BACKUP}`);
  let done = 0;
  for (const p of patches) {
    await patchRow(p.table, p.id, p.fields);
    done++;
  }
  console.log(`Applied ${done} row update(s). To undo: node scripts/cleanup-db-wording.mjs --restore ${BACKUP}`);
}

main().catch((e) => {
  console.error(`ERROR: ${e.message}`);
  process.exit(1);
});
