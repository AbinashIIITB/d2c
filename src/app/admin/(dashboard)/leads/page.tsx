'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Phone, 
  Mail, 
  MessageSquare, 
  Download, 
  Search, 
  RefreshCw,
  ExternalLink,
  Table,
  CheckCircle2,
  Trash2,
  Edit3,
  Code,
  Copy,
  Check,
  Radio,
  FileSpreadsheet,
  Calendar,
  Clock
} from 'lucide-react';
import { CircleLoader } from '@/components/admin/CircleLoader';

interface Lead {
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

function parseTimestampParts(ts?: string): { date: string; time: string } {
  if (!ts || ts === 'Recent' || ts === 'Just now') {
    return { date: ts || 'Recent', time: 'Live sync' };
  }
  // If comma separated: "27 Oct 2026, 11:35 PM"
  if (ts.includes(',')) {
    const parts = ts.split(',');
    return { date: parts[0].trim(), time: parts.slice(1).join(',').trim() };
  }
  // If space separated with AM/PM e.g. "27-10-2026 11:35 PM"
  const m = ts.match(/^(.+?)\s+(\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM|am|pm)?)$/);
  if (m) {
    return { date: m[1].trim(), time: m[2].trim() };
  }
  return { date: ts, time: '' };
}

const STATUS_OPTIONS = [
  { value: 'New', label: 'New', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  { value: 'Contacted', label: 'Contacted', color: 'bg-blue-50 text-blue-800 border-blue-200' },
  { value: 'Counseling Scheduled', label: 'Counseling Scheduled', color: 'bg-purple-50 text-purple-800 border-purple-200' },
  { value: 'Converted', label: 'Converted', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  { value: 'Not Interested', label: 'Not Interested', color: 'bg-rose-50 text-rose-800 border-rose-200' },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [source, setSource] = useState<string>('none');
  const [sheetInput, setSheetInput] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [lastSynced, setLastSynced] = useState<string>('Just now');
  const [activeEditingNoteId, setActiveEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [updatingRow, setUpdatingRow] = useState<number | null>(null);

  const fetchLeads = async (customSheet?: string, silent = false) => {
    try {
      if (!silent) setRefreshing(true);
      const savedSheet = customSheet ?? (typeof window !== 'undefined' ? localStorage.getItem('d2c_google_sheet_id') || '' : '');
      const url = savedSheet ? `/api/admin/leads?sheetId=${encodeURIComponent(savedSheet)}` : '/api/admin/leads';

      const res = await fetch(url);
      const data = await res.json();

      if (data.leads) {
        setLeads(data.leads);
        setSource(data.source || 'none');
        setLastSynced(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    } catch (err) {
      console.error('Failed to sync leads from Google Sheets:', err);
    } finally {
      setLoading(false);
      if (!silent) setRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('d2c_google_sheet_id');
      if (saved) setSheetInput(saved);
    }
    fetchLeads();
  }, []);

  // Live Auto-Sync Polling (Google Sheets -> Admin)
  useEffect(() => {
    if (!autoSync) return;
    const interval = setInterval(() => {
      fetchLeads(undefined, true);
    }, 12000); // Poll every 12s for any direct edits in Google Sheets

    return () => clearInterval(interval);
  }, [autoSync]);

  // Update lead status (Admin -> Google Sheets)
  const handleUpdateStatus = async (lead: Lead, newStatus: string) => {
    if (!lead.rowIndex && !lead.id) return;
    setUpdatingRow(lead.rowIndex || -1);

    // Optimistic UI update
    setLeads(prev => prev.map(l => (l.id === lead.id || l.rowIndex === lead.rowIndex) ? { ...l, status: newStatus } : l));

    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rowIndex: lead.rowIndex,
          id: lead.id,
          status: newStatus,
          notes: lead.notes || ''
        })
      });

      if (!res.ok) {
        console.error('Failed to sync status change to Google Sheets');
      }
    } catch (err) {
      console.error('Error syncing status change to Google Sheets:', err);
    } finally {
      setUpdatingRow(null);
    }
  };

  // Save Counselor Note (Admin -> Google Sheets)
  const handleSaveNote = async (lead: Lead) => {
    setUpdatingRow(lead.rowIndex || -1);
    setActiveEditingNoteId(null);

    // Optimistic update
    setLeads(prev => prev.map(l => (l.id === lead.id || l.rowIndex === lead.rowIndex) ? { ...l, notes: noteDraft } : l));

    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rowIndex: lead.rowIndex,
          id: lead.id,
          status: lead.status || 'New',
          notes: noteDraft
        })
      });
    } catch (err) {
      console.error('Error syncing note to Google Sheets:', err);
    } finally {
      setUpdatingRow(null);
    }
  };

  // Delete lead row (Admin -> Google Sheets)
  const handleDeleteLead = async (lead: Lead) => {
    if (!confirm(`Delete ${lead.name || 'this lead'} directly from Google Sheets?`)) return;

    setLeads(prev => prev.filter(l => l.id !== lead.id && l.rowIndex !== lead.rowIndex));

    try {
      await fetch(`/api/admin/leads?rowIndex=${lead.rowIndex || ''}&id=${encodeURIComponent(lead.id || '')}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Error deleting lead from Google Sheets:', err);
    }
  };

  const handleSaveSheet = () => {
    if (typeof window !== 'undefined') {
      if (sheetInput.trim()) {
        localStorage.setItem('d2c_google_sheet_id', sheetInput.trim());
      } else {
        localStorage.removeItem('d2c_google_sheet_id');
      }
    }
    fetchLeads(sheetInput.trim());
    setShowConfig(false);
  };

  const copyScriptCode = () => {
    const code = `// Paste into Google Sheets > Extensions > Apps Script:
// Read, Write & Two-Way Sync Script is located in your project root at google-apps-script.js`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filtered = leads.filter((lead) => {
    const q = search.toLowerCase();
    const matchesSearch = 
      (lead.name || '').toLowerCase().includes(q) ||
      (lead.phone || '').toLowerCase().includes(q) ||
      (lead.email || '').toLowerCase().includes(q) ||
      (lead.interestedCollege || '').toLowerCase().includes(q) ||
      (lead.notes || '').toLowerCase().includes(q) ||
      (lead.created_at || '').toLowerCase().includes(q) ||
      (lead.submittedAt || '').toLowerCase().includes(q);

    const matchesType = filterType === 'ALL' || lead.leadType === filterType;
    const matchesStatus = filterStatus === 'ALL' || lead.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const exportCSV = () => {
    if (filtered.length === 0) return;
    const headers = ['ID', 'Student Name', 'Phone', 'Email', 'Interested College', 'Inquiry Type', 'Status', 'Counselor Notes', 'Submitted At'];
    const rows = filtered.map((l) => [
      `"${l.id || ''}"`,
      `"${l.name || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.interestedCollege || ''}"`,
      `"${l.leadType || 'Inquiry'}"`,
      `"${l.status || 'New'}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      `"${l.created_at || l.submittedAt || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `d2c-google-sheets-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl pb-24 font-dm-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">
              Live Google Sheets Sync
            </h1>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              2-Way Direct Sync
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Any update made here writes directly to Google Sheets, and edits in Google Sheets automatically reflect here.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          {/* Auto Sync Toggle */}
          <button
            onClick={() => setAutoSync(!autoSync)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              autoSync ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-white text-gray-500 border-gray-200'
            }`}
            title="Toggle background auto-polling every 12 seconds"
          >
            <Radio className={`w-3.5 h-3.5 ${autoSync ? 'text-emerald-600 animate-pulse' : 'text-gray-400'}`} />
            Auto-Sync: {autoSync ? 'ON (12s)' : 'PAUSED'}
          </button>

          {/* Sync Now */}
          <button
            onClick={() => fetchLeads()}
            disabled={refreshing}
            className="bg-white hover:bg-gray-50 text-d2c-navy border border-gray-200 px-3.5 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            title="Fetch latest rows from Google Sheets immediately"
          >
            {refreshing ? (
              <CircleLoader size="xs" color="royal" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5 text-d2c-royal" />
            )}
            Sync Now
          </button>

          {/* Connect Google Sheet */}
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="bg-white hover:bg-gray-50 text-d2c-navy border border-gray-200 px-3.5 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            Sheet Link
          </button>

          {/* Setup Script Guide */}
          <button
            onClick={() => setShowScriptModal(true)}
            className="bg-white hover:bg-gray-50 text-d2c-navy border border-gray-200 px-3.5 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Code className="w-3.5 h-3.5 text-d2c-royal" />
            Apps Script Code
          </button>

          {/* Export CSV */}
          <button
            onClick={exportCSV}
            disabled={filtered.length === 0}
            className="bg-d2c-royal hover:bg-d2c-navy text-white px-4 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 shadow-md shadow-d2c-royal/20 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Sync Status Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-blue-500/5 to-transparent p-4 rounded-2xl border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-d2c-navy">
              Live Connection Active: <span className="text-emerald-700 font-semibold">{leads.length} leads in sync</span>
            </p>
            <p className="text-[11px] text-gray-500">
              Last checked Google Sheets at: <span className="font-mono text-d2c-navy font-bold">{lastSynced}</span>
            </p>
          </div>
        </div>

        {sheetInput && (
          <a
            href={sheetInput.startsWith('http') ? sheetInput : `https://docs.google.com/spreadsheets/d/${sheetInput}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 self-end sm:self-auto"
          >
            Open in Google Sheets <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Sheet Configuration Form */}
      {showConfig && (
        <div className="bg-white rounded-2xl p-6 border-2 border-emerald-500/30 shadow-lg space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-d2c-navy">Link Live Google Sheet URL</h3>
            </div>
            <button onClick={() => setShowConfig(false)} className="text-xs text-gray-400 hover:text-gray-600">✕ Close</button>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            Enter your Google Sheet URL (from your browser address bar) or Sheet ID. Make sure the sheet sharing is set to &quot;Anyone with the link can view&quot;.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={sheetInput}
              onChange={(e) => setSheetInput(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5n.../edit"
              className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:border-emerald-500 outline-none"
            />
            <button
              onClick={handleSaveSheet}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-colors shrink-0"
            >
              Save & Link Sheet
            </button>
          </div>
        </div>
      )}

      {/* Apps Script Installation Modal */}
      {showScriptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-d2c-royal" />
                <h3 className="text-base font-sora font-bold text-d2c-navy">Two-Way Google Apps Script Setup</h3>
              </div>
              <button onClick={() => setShowScriptModal(false)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
              <p className="font-semibold text-d2c-navy">To enable full two-way editing (status updates & counselor notes writing back to Google Sheets):</p>
              <ol className="list-decimal pl-5 space-y-1.5">
                <li>Open your Google Sheet where student responses go.</li>
                <li>In the top menu, click <strong>Extensions &gt; Apps Script</strong>.</li>
                <li>Select all existing code and replace it with the script located in your project at <code className="bg-gray-100 text-d2c-royal px-1.5 py-0.5 rounded font-mono font-bold">google-apps-script.js</code>.</li>
                <li>Click <strong>Deploy &gt; Manage deployments</strong> &gt; Edit (pencil icon) &gt; Version: <strong>New version</strong> &gt; Deploy.</li>
                <li>Ensure access is set to <strong>Anyone</strong>.</li>
              </ol>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">File: google-apps-script.js</span>
                <span className="text-[11px] text-emerald-600 font-semibold">Ready in root directory</span>
              </div>
              <p className="text-[11px] text-gray-500">
                The script includes <code className="font-mono text-d2c-navy">doGet</code> (fetching rows for Admin) and <code className="font-mono text-d2c-navy">doPost</code> (writing status/notes updates back from Admin).
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowScriptModal(false)}
                className="px-5 py-2 bg-d2c-royal hover:bg-d2c-navy text-white rounded-xl text-xs font-bold"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-150 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, phone, college, or counselor notes..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-transparent hover:border-gray-200 focus:border-d2c-royal outline-none"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-gray-200 bg-white font-medium text-gray-700 outline-none focus:border-d2c-royal"
          >
            <option value="ALL">All Statuses</option>
            {STATUS_OPTIONS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-gray-200 bg-white font-medium text-gray-700 outline-none focus:border-d2c-royal"
          >
            <option value="ALL">All Inquiry Types</option>
            <option value="Direct Admission">Direct Admission</option>
            <option value="Management Quota">Management Quota</option>
            <option value="Fee Inquiry">Fee Inquiry</option>
            <option value="Exam Counseling">Exam Counseling</option>
          </select>
        </div>
      </div>

      {/* Leads Table with Direct 2-Way Sync Editing */}
      <div className="relative bg-white rounded-2xl shadow-sm border border-gray-150 overflow-hidden">
        {refreshing && (
          <CircleLoader
            overlay
            size="md"
            color="royal"
            text="Syncing live leads with Google Sheets..."
            subtext="Connecting to live spreadsheet..."
          />
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-150 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Submitted At (Sheet)</th>
                <th className="px-5 py-4">Target College / Context</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Status (Syncs to Sheet)</th>
                <th className="px-5 py-4">Counselor Notes</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <CircleLoader
                      size="lg"
                      color="royal"
                      text="Fetching live student leads from Google Sheets..."
                      subtext="Reading live responses from connected sheet..."
                    />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center space-y-3">
                    <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-2xl flex items-center justify-center mx-auto">
                      <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-d2c-navy">No leads matching filter</h4>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1 leading-relaxed">
                        Leads submitted on public pages stream directly into your Google Sheet and appear here in real-time.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowConfig(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold transition-colors"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" /> Check Google Sheet URL
                    </button>
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => {
                  const isUpdating = updatingRow === lead.rowIndex;
                  const isEditingNote = activeEditingNoteId === lead.id;

                  return (
                    <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Student Info */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-d2c-navy leading-snug">
                          {lead.name || 'Anonymous Student'}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 font-medium">
                          {lead.phone || lead.email || 'No phone'}
                        </div>
                      </td>

                      {/* Submitted At / Timestamp from Sheet */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        {(() => {
                          const timeInfo = parseTimestampParts(lead.created_at || lead.submittedAt);
                          return (
                            <div>
                              <div className="flex items-center gap-1.5 text-xs font-bold text-d2c-navy">
                                <Calendar className="w-3.5 h-3.5 text-d2c-royal shrink-0" />
                                <span>{timeInfo.date}</span>
                              </div>
                              {timeInfo.time && (
                                <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1 font-mono">
                                  <Clock className="w-3 h-3 text-emerald-600 shrink-0" />
                                  <span>{timeInfo.time}</span>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </td>

                      {/* Interested College */}
                      <td className="px-5 py-4">
                        <div className="font-semibold text-xs text-d2c-navy max-w-[200px] truncate" title={lead.interestedCollege || lead.message}>
                          {lead.interestedCollege || lead.message || 'General Counseling'}
                        </div>
                      </td>

                      {/* Lead Type */}
                      <td className="px-5 py-4">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                          {lead.leadType || 'Direct Inquiry'}
                        </span>
                      </td>

                      {/* Status Dropdown (Writes directly to Google Sheet) */}
                      <td className="px-5 py-4">
                        <div className="relative inline-block">
                          <select
                            value={lead.status || 'New'}
                            disabled={isUpdating}
                            onChange={(e) => handleUpdateStatus(lead, e.target.value)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer transition-all ${
                              STATUS_OPTIONS.find(s => s.value === lead.status)?.color || 'bg-gray-50 text-gray-700 border-gray-200'
                            }`}
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value} className="bg-white text-gray-900">
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          {isUpdating && (
                            <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 mt-1 font-semibold">
                              <CircleLoader size="xs" color="emerald" />
                              <span>Syncing to sheet...</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Counselor Notes (Writes directly to Google Sheet) */}
                      <td className="px-5 py-4 max-w-[240px]">
                        {isEditingNote ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              autoFocus
                              value={noteDraft}
                              onChange={(e) => setNoteDraft(e.target.value)}
                              placeholder="Add counselor note..."
                              className="text-xs px-2.5 py-1.5 rounded-lg border border-d2c-royal focus:ring-1 focus:ring-d2c-royal outline-none w-full"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveNote(lead);
                                if (e.key === 'Escape') setActiveEditingNoteId(null);
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveNote(lead)}
                              className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shrink-0"
                              title="Save to Google Sheet"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div 
                            onClick={() => {
                              setActiveEditingNoteId(lead.id);
                              setNoteDraft(lead.notes || '');
                            }}
                            className="group flex items-center justify-between gap-2 p-1.5 -m-1.5 rounded-lg hover:bg-gray-100/70 cursor-pointer transition-colors"
                            title="Click to edit note (syncs to Google Sheet)"
                          >
                            <span className="text-xs text-gray-600 truncate">
                              {lead.notes ? lead.notes : <span className="text-gray-400 italic text-[11px]">+ Add Note</span>}
                            </span>
                            <Edit3 className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </div>
                        )}
                      </td>

                      {/* Quick Contact & Delete Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {lead.phone && (
                            <>
                              <a
                                href={`tel:${lead.phone.replace(/[^\d+]/g, '')}`}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 transition-colors"
                                title={`Call ${lead.phone}`}
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^\d]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-gray-100 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 transition-colors"
                                title="Open WhatsApp chat"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                            </>
                          )}
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="p-2 rounded-lg bg-gray-100 hover:bg-d2c-royal/10 text-gray-600 hover:text-d2c-royal transition-colors"
                              title={`Email ${lead.email}`}
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteLead(lead)}
                            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete lead directly from Google Sheet"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
