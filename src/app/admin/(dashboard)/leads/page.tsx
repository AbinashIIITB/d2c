'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Phone, 
  Mail, 
  MessageSquare, 
  Download, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  Code, 
  FileSpreadsheet, 
  Calendar, 
  Clock,
  GraduationCap,
  Briefcase,
  Stethoscope,
  PhoneCall,
  Layers,
  HelpCircle,
  Eye,
  Check,
  Radio,
  FileText
} from 'lucide-react';
import { CircleLoader } from '@/components/admin/CircleLoader';

interface Lead {
  rowIndex?: number;
  id: string;
  name: string;
  phone: string;
  email?: string;
  course?: string;
  category?: string;
  interestedCollege?: string;
  college?: string;
  exam?: string;
  leadType?: string;
  formType?: string;
  message?: string;
  status?: string;
  notes?: string;
  created_at?: string;
  submittedAt?: string;
}

function parseCategory(lead: Lead): string {
  if (lead.category) return lead.category;
  const combined = `${lead.course || ''} ${lead.leadType || ''} ${lead.formType || ''} ${lead.message || ''}`.toLowerCase();
  if (combined.includes('b.tech') || combined.includes('btech') || combined.includes('engineering') || combined.includes('cse') || combined.includes('wbjee')) {
    return 'B.Tech';
  }
  if (combined.includes('mba') || combined.includes('pgdm') || combined.includes('b-school') || combined.includes('cat') || combined.includes('mat')) {
    return 'MBA';
  }
  if (combined.includes('mbbs') || combined.includes('bds') || combined.includes('neet') || combined.includes('medical')) {
    return 'Medical / MBBS';
  }
  if (combined.includes('callback')) {
    return 'Callback';
  }
  if (combined.includes('college')) {
    return 'College Query';
  }
  if (combined.includes('exam')) {
    return 'Exam Query';
  }
  return 'General Enquiry';
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
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [autoSync, setAutoSync] = useState(true);
  const [lastSynced, setLastSynced] = useState<string>('Just now');
  const [sheetInput, setSheetInput] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [selectedLeadModal, setSelectedLeadModal] = useState<Lead | null>(null);

  // Inline editing
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
        setLastSynced(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    } catch (err) {
      console.error('Failed to sync leads:', err);
    } finally {
      setLoading(false);
      if (!silent) setRefreshing(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('d2c_google_sheet_id');
      if (saved) setSheetInput(saved);
    }
    fetchLeads();
  }, []);

  // Live Auto-Sync Polling
  useEffect(() => {
    if (!autoSync) return;
    const interval = setInterval(() => {
      fetchLeads(undefined, true);
    }, 15000);
    return () => clearInterval(interval);
  }, [autoSync]);

  const handleStatusChange = async (lead: Lead, newStatus: string) => {
    setUpdatingRow(lead.rowIndex ?? -1);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: lead.id,
          rowIndex: lead.rowIndex,
          status: newStatus,
          notes: lead.notes || ''
        })
      });

      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: newStatus } : l));
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    } finally {
      setUpdatingRow(null);
    }
  };

  const handleSaveNotes = async (lead: Lead) => {
    setUpdatingRow(lead.rowIndex ?? -1);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: lead.id,
          rowIndex: lead.rowIndex,
          status: lead.status || 'New',
          notes: noteDraft
        })
      });

      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, notes: noteDraft } : l));
        setActiveEditingNoteId(null);
      }
    } catch (err) {
      console.error('Failed to update notes:', err);
    } finally {
      setUpdatingRow(null);
    }
  };

  const handleDeleteLead = async (lead: Lead) => {
    if (!window.confirm(`Are you sure you want to delete lead submission for ${lead.name || 'this student'}?`)) {
      return;
    }

    try {
      const res = await fetch('/api/admin/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: lead.id,
          rowIndex: lead.rowIndex
        })
      });

      if (res.ok) {
        setLeads(prev => prev.filter(l => l.id !== lead.id));
        if (selectedLeadModal?.id === lead.id) setSelectedLeadModal(null);
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = {
      ALL: leads.length,
      'B.Tech': 0,
      'MBA': 0,
      'Medical / MBBS': 0,
      'College Query': 0,
      'Callback': 0,
      'Exam Query': 0,
      'General Enquiry': 0
    };

    leads.forEach(l => {
      const cat = parseCategory(l);
      if (counts[cat as keyof typeof counts] !== undefined) {
        counts[cat as keyof typeof counts]++;
      } else {
        counts['General Enquiry']++;
      }
    });

    return counts;
  }, [leads]);

  // Filtered Leads
  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      const cat = parseCategory(lead);
      const matchesCategory = selectedCategoryTab === 'ALL' || cat === selectedCategoryTab;
      const matchesStatus = filterStatus === 'ALL' || lead.status === filterStatus;

      const q = search.toLowerCase();
      const matchesSearch = 
        !q ||
        (lead.name || '').toLowerCase().includes(q) ||
        (lead.phone || '').toLowerCase().includes(q) ||
        (lead.email || '').toLowerCase().includes(q) ||
        (lead.course || '').toLowerCase().includes(q) ||
        (lead.interestedCollege || '').toLowerCase().includes(q) ||
        (lead.message || '').toLowerCase().includes(q) ||
        (lead.notes || '').toLowerCase().includes(q);

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [leads, selectedCategoryTab, filterStatus, search]);

  const exportCSV = () => {
    if (filtered.length === 0) return;
    const headers = ['ID', 'Student Name', 'Phone', 'Email', 'Form Category', 'Course', 'Interested College', 'Status', 'Counselor Notes', 'Submitted At', 'Full Message'];
    const rows = filtered.map((l) => [
      `"${l.id || ''}"`,
      `"${l.name || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${parseCategory(l)}"`,
      `"${l.course || ''}"`,
      `"${l.interestedCollege || l.college || ''}"`,
      `"${l.status || 'New'}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      `"${l.created_at || l.submittedAt || ''}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const filenameCategory = selectedCategoryTab === 'ALL' ? 'all-leads' : selectedCategoryTab.toLowerCase().replace(/[^a-z0-9]/g, '-');
    link.setAttribute('download', `d2c-${filenameCategory}-${new Date().toISOString().slice(0, 10)}.csv`);
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
            <div className="w-10 h-10 rounded-2xl bg-d2c-royal/10 text-d2c-royal flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">
                Form Submissions & Student Leads
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Individual listings separated by form type (B.Tech, MBA, Medical, College & Callback inquiries) with 2-way Google Sheets sync
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setAutoSync(!autoSync)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
              autoSync ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-white text-gray-500 border-gray-200'
            }`}
            title="Auto background sync"
          >
            <Radio className={`w-3.5 h-3.5 ${autoSync ? 'text-emerald-600 animate-pulse' : 'text-gray-400'}`} />
            Auto-Sync: {autoSync ? 'ON (15s)' : 'PAUSED'}
          </button>

          <button
            onClick={() => fetchLeads()}
            disabled={refreshing}
            className="bg-white hover:bg-gray-50 text-d2c-navy border border-gray-200 px-3.5 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            {refreshing ? <CircleLoader size="xs" color="royal" /> : <RefreshCw className="w-3.5 h-3.5 text-d2c-royal" />}
            Sync Now
          </button>

          <button
            onClick={() => setShowConfig(!showConfig)}
            className="bg-white hover:bg-gray-50 text-d2c-navy border border-gray-200 px-3.5 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            Sheets Setup
          </button>

          <button
            onClick={exportCSV}
            disabled={filtered.length === 0}
            className="bg-d2c-royal hover:bg-d2c-navy text-white px-4 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 shadow-md shadow-d2c-royal/20 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" /> Export {selectedCategoryTab !== 'ALL' ? selectedCategoryTab : ''} CSV
          </button>
        </div>
      </div>

      {/* QUICK STATS CARDS: CATEGORIZED LISTINGS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          type="button"
          onClick={() => setSelectedCategoryTab('ALL')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedCategoryTab === 'ALL'
              ? 'bg-d2c-navy text-white border-d2c-navy shadow-md ring-2 ring-d2c-royal/20'
              : 'bg-white text-gray-700 border-gray-200 hover:border-d2c-royal/40'
          }`}
        >
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-70">All Forms</div>
          <div className="text-2xl font-bold font-sora mt-1">{categoryCounts.ALL}</div>
          <div className="text-[10px] opacity-60 mt-0.5">Total responses</div>
        </button>

        <button
          type="button"
          onClick={() => setSelectedCategoryTab('B.Tech')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedCategoryTab === 'B.Tech'
              ? 'bg-purple-900 text-white border-purple-900 shadow-md ring-2 ring-purple-500/20'
              : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">B.Tech</span>
            <GraduationCap className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold font-sora mt-1 text-purple-900 group-hover:text-purple-700">
            {categoryCounts['B.Tech']}
          </div>
          <div className="text-[10px] text-gray-500 mt-0.5">B.Tech Applications</div>
        </button>

        <button
          type="button"
          onClick={() => setSelectedCategoryTab('MBA')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedCategoryTab === 'MBA'
              ? 'bg-blue-900 text-white border-blue-900 shadow-md ring-2 ring-blue-500/20'
              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">MBA</span>
            <Briefcase className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold font-sora mt-1 text-blue-900">
            {categoryCounts['MBA']}
          </div>
          <div className="text-[10px] text-gray-500 mt-0.5">MBA / PGDM Seats</div>
        </button>

        <button
          type="button"
          onClick={() => setSelectedCategoryTab('Medical / MBBS')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedCategoryTab === 'Medical / MBBS'
              ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">MBBS</span>
            <Stethoscope className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-sora mt-1 text-emerald-900">
            {categoryCounts['Medical / MBBS']}
          </div>
          <div className="text-[10px] text-gray-500 mt-0.5">Medical & NEET</div>
        </button>

        <button
          type="button"
          onClick={() => setSelectedCategoryTab('College Query')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedCategoryTab === 'College Query'
              ? 'bg-amber-900 text-white border-amber-900 shadow-md ring-2 ring-amber-500/20'
              : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">College Forms</span>
            <Layers className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-sora mt-1 text-amber-900">
            {categoryCounts['College Query']}
          </div>
          <div className="text-[10px] text-gray-500 mt-0.5">Specific College Forms</div>
        </button>

        <button
          type="button"
          onClick={() => setSelectedCategoryTab('Callback')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedCategoryTab === 'Callback'
              ? 'bg-rose-900 text-white border-rose-900 shadow-md ring-2 ring-rose-500/20'
              : 'bg-white text-gray-700 border-gray-200 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Callbacks</span>
            <PhoneCall className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold font-sora mt-1 text-rose-900">
            {categoryCounts['Callback']}
          </div>
          <div className="text-[10px] text-gray-500 mt-0.5">Urgent Call Requests</div>
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-200 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search across ${selectedCategoryTab === 'ALL' ? 'all' : selectedCategoryTab} submissions by name, phone, course, college...`}
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
        </div>
      </div>

      {/* LEADS TABLE */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200/80 overflow-hidden relative">
        {refreshing && (
          <CircleLoader
            overlay
            size="md"
            color="royal"
            text="Syncing form submissions..."
            subtext="Updating live leads..."
          />
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-150 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-4">Student & Contact</th>
                <th className="px-5 py-4">Dedicated Form / Course</th>
                <th className="px-5 py-4">Target College / Context</th>
                <th className="px-5 py-4">Status (2-Way Sync)</th>
                <th className="px-5 py-4">Counselor Notes</th>
                <th className="px-5 py-4">Submitted At</th>
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
                      text="Loading form submissions..."
                      subtext="Reading leads database..."
                    />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center space-y-3">
                    <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-2xl flex items-center justify-center mx-auto">
                      <FileSpreadsheet className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-d2c-navy">
                        No submissions found for {selectedCategoryTab === 'ALL' ? 'selected filter' : selectedCategoryTab}
                      </h4>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1 leading-relaxed">
                        When users submit forms for {selectedCategoryTab} on the website, they immediately appear in this dedicated section.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => {
                  const cat = parseCategory(lead);
                  const isEditingNote = activeEditingNoteId === lead.id;

                  return (
                    <tr key={lead.id} className="hover:bg-gray-50/60 transition-colors">
                      {/* Student Info */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-d2c-navy leading-snug">
                          {lead.name || 'Prospective Student'}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <a
                            href={`tel:${lead.phone}`}
                            className="text-xs font-semibold text-gray-600 hover:text-d2c-royal flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3 text-emerald-600" />
                            <span>{lead.phone}</span>
                          </a>
                          {lead.phone && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded hover:bg-emerald-100 transition-colors font-bold"
                              title="Chat on WhatsApp"
                            >
                              WhatsApp
                            </a>
                          )}
                        </div>
                        {lead.email && (
                          <div className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span className="truncate max-w-[180px]">{lead.email}</span>
                          </div>
                        )}
                      </td>

                      {/* Dedicated Category & Course */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            cat === 'B.Tech' ? 'bg-purple-50 text-purple-800 border border-purple-200' :
                            cat === 'MBA' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                            cat === 'Medical / MBBS' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                            cat === 'Callback' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                            'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}>
                            {cat}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-gray-900 leading-snug">
                          {lead.course || lead.formType || 'Direct Admission'}
                        </div>
                      </td>

                      {/* Target College */}
                      <td className="px-5 py-4">
                        <div className="text-xs font-semibold text-d2c-navy leading-snug max-w-[200px]">
                          {lead.interestedCollege || lead.college || 'General College Guidance'}
                        </div>
                        {lead.exam && (
                          <div className="text-[10px] text-gray-500 mt-0.5">
                            Exam: <span className="font-semibold text-gray-700">{lead.exam}</span>
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <select
                          value={lead.status || 'New'}
                          onChange={(e) => handleStatusChange(lead, e.target.value)}
                          className={`text-xs px-2.5 py-1.5 rounded-xl font-bold border transition-colors outline-none cursor-pointer ${
                            STATUS_OPTIONS.find(s => s.value === (lead.status || 'New'))?.color || 'bg-gray-50'
                          }`}
                        >
                          {STATUS_OPTIONS.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                      </td>

                      {/* Counselor Notes */}
                      <td className="px-5 py-4 max-w-[220px]">
                        {isEditingNote ? (
                          <div className="space-y-1.5">
                            <textarea
                              rows={2}
                              value={noteDraft}
                              onChange={(e) => setNoteDraft(e.target.value)}
                              className="w-full text-xs p-2 rounded-lg border border-d2c-royal outline-none"
                              placeholder="Add counselor follow-up notes..."
                            />
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleSaveNotes(lead)}
                                className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setActiveEditingNoteId(null)}
                                className="px-2 py-0.5 rounded bg-gray-200 text-gray-600 text-[10px]"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setActiveEditingNoteId(lead.id);
                              setNoteDraft(lead.notes || '');
                            }}
                            className="group/note flex items-start justify-between gap-1 cursor-pointer hover:bg-gray-100/60 p-1 rounded-lg transition-colors"
                            title="Click to edit notes"
                          >
                            <span className="text-xs text-gray-600 line-clamp-2 italic">
                              {lead.notes || 'Add follow-up notes...'}
                            </span>
                            <Edit3 className="w-3 h-3 text-gray-400 group-hover/note:text-d2c-royal shrink-0 mt-0.5 opacity-0 group-hover/note:opacity-100 transition-opacity" />
                          </div>
                        )}
                      </td>

                      {/* Submitted At */}
                      <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">
                        <div className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span>{lead.submittedAt || lead.created_at?.slice(0, 10) || 'Recent'}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedLeadModal(lead)}
                            className="p-1.5 text-gray-500 hover:text-d2c-royal hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Full Submission Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteLead(lead)}
                            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
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

      {/* LEAD DETAILS MODAL */}
      {selectedLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-gray-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                  {parseCategory(selectedLeadModal)}
                </span>
                <span className="text-xs text-gray-400">ID: {selectedLeadModal.id}</span>
              </div>
              <button
                onClick={() => setSelectedLeadModal(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold font-sora text-d2c-navy">
                {selectedLeadModal.name || 'Prospective Student'}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Submitted on {selectedLeadModal.submittedAt || selectedLeadModal.created_at || 'Recent'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div>
                <span className="text-gray-400 block font-medium">Target Course:</span>
                <span className="font-bold text-gray-900 text-sm">{selectedLeadModal.course || 'Not specified'}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Form Name:</span>
                <span className="font-bold text-gray-900 text-sm">{selectedLeadModal.formType || selectedLeadModal.leadType || 'Direct Website Form'}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Target College:</span>
                <span className="font-bold text-gray-900">{selectedLeadModal.interestedCollege || selectedLeadModal.college || 'General'}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Entrance Exam:</span>
                <span className="font-bold text-gray-900">{selectedLeadModal.exam || 'N/A'}</span>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${selectedLeadModal.phone}`}
                className="flex-1 px-4 py-2.5 rounded-xl bg-d2c-royal hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <Phone className="w-4 h-4" /> Call: {selectedLeadModal.phone}
              </a>
              {selectedLeadModal.phone && (
                <a
                  href={`https://wa.me/${selectedLeadModal.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
                </a>
              )}
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Submitted Message / Query:
              </label>
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-xs md:text-sm text-gray-800 leading-relaxed">
                {selectedLeadModal.message || 'No specific text message submitted.'}
              </div>
            </div>

            {/* Counselor Notes */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Counselor Follow-up Notes:
              </label>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700">
                {selectedLeadModal.notes || 'No counselor notes recorded yet.'}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => handleDeleteLead(selectedLeadModal)}
                className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete this lead
              </button>
              <button
                type="button"
                onClick={() => setSelectedLeadModal(null)}
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
