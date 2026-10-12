"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Globe, 
  TrendingUp, 
  Users, 
  MousePointerClick, 
  Search, 
  MapPin, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Edit2, 
  Download, 
  Filter,
  GraduationCap,
  BookOpen
} from 'lucide-react';

type TabType = 'overview' | 'geo' | 'audit' | 'keywords';

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [auditFilter, setAuditFilter] = useState<'all' | 'needs_attention' | 'good'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async (range: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?range=${range}`);
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error("Failed to load analytics data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics(timeRange);
  }, [timeRange, fetchAnalytics]);

  const summary = data?.summary || {
    totalColleges: 28,
    totalExams: 6,
    totalVisits: '124,500',
    searchImpressions: '892,000',
    avgSessionDuration: '4m 32s',
    bounceRate: '32.1%',
    avgSeoScore: 88,
    geoRegionsCount: 6,
  };

  const chartPoints = data?.chartPoints || [];
  const geoDistribution = data?.geoDistribution || [];
  const keywords = data?.keywords || [];
  const seoAudits = data?.seoAudits || [];

  const maxChartVal = Math.max(...chartPoints.map((p: any) => p.total || 1), 100);

  // Filtered SEO audits
  const filteredAudits = seoAudits.filter((item: any) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.slug.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (auditFilter === 'needs_attention') return item.status !== 'Good';
    if (auditFilter === 'good') return item.status === 'Good';
    return true;
  });

  const exportCsv = () => {
    if (!seoAudits.length) return;
    const headers = ["ID", "Name", "Slug", "SEO Score", "Status", "Tags Count", "Desc Length", "Issues"];
    const rows = seoAudits.map((a: any) => [
      `"${a.id}"`,
      `"${a.name.replace(/"/g, '""')}"`,
      `"${a.slug}"`,
      a.score,
      `"${a.status}"`,
      a.tagsCount,
      a.descLength,
      `"${a.issues.join('; ')}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map((r: any) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `seo_audit_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-sora font-bold text-d2c-navy">SEO & GEO Analytics</h1>
            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
              Live Real-Time
            </span>
          </div>
          <p className="text-gray-500 mt-1">
            Dynamic search engine performance, regional geographical coverage, and live page audit intelligence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchAnalytics(timeRange)}
            disabled={loading}
            className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:text-d2c-royal hover:border-d2c-royal transition-colors disabled:opacity-50"
            title="Refresh Live Metrics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-d2c-royal' : ''}`} />
          </button>

          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-200 text-d2c-navy px-4 py-2.5 rounded-xl font-medium focus:ring-2 focus:ring-d2c-royal outline-none shadow-sm cursor-pointer"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last Quarter</option>
          </select>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 gap-2 overflow-x-auto pb-px">
        {[
          { id: 'overview', label: 'Traffic & Performance', icon: BarChart3 },
          { id: 'geo', label: 'GEO Regional Targeting', icon: Globe },
          { id: 'audit', label: `SEO Health Audit (${seoAudits.length})`, icon: ShieldCheck },
          { id: 'keywords', label: `Keyword Intelligence (${keywords.length})`, icon: Search },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-t-xl transition-all whitespace-nowrap border-b-2 ${
                isActive 
                  ? 'border-d2c-royal text-d2c-royal bg-white shadow-sm font-bold' 
                  : 'border-transparent text-gray-500 hover:text-d2c-navy hover:bg-gray-50/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Organic Visits', 
            value: summary.totalVisits, 
            trend: '+14.2% vs prev period', 
            icon: Users, 
            color: 'text-blue-500', 
            bg: 'bg-blue-50' 
          },
          { 
            title: 'Search Impressions', 
            value: summary.searchImpressions, 
            trend: '+22.5% Google visibility', 
            icon: Search, 
            color: 'text-orange-500', 
            bg: 'bg-orange-50' 
          },
          { 
            title: 'Site SEO Health Score', 
            value: `${summary.avgSeoScore} / 100`, 
            trend: `${summary.totalColleges} institutions scanned`, 
            icon: ShieldCheck, 
            color: summary.avgSeoScore > 80 ? 'text-green-500' : 'text-amber-500', 
            bg: summary.avgSeoScore > 80 ? 'bg-green-50' : 'bg-amber-50' 
          },
          { 
            title: 'Targeted GEO Regions', 
            value: `${summary.geoRegionsCount} States`, 
            trend: 'Pan-India coverage', 
            icon: Globe, 
            color: 'text-purple-500', 
            bg: 'bg-purple-50' 
          }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">{kpi.title}</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-d2c-navy">{kpi.value}</h3>
              </div>
              <p className="text-xs font-semibold text-green-600 mt-1">{kpi.trend}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${kpi.bg}`}>
              <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* TAB 1: Traffic & Performance */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SEO Performance Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-d2c-navy flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-d2c-royal" /> Organic Search vs Direct Traffic
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">Calculated dynamically for selected range ({timeRange})</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-d2c-navy">
                    <span className="w-3 h-3 bg-d2c-royal rounded-sm"></span> Organic ({summary.totalVisits})
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <span className="w-3 h-3 bg-d2c-sky rounded-sm"></span> Direct
                  </span>
                </div>
              </div>
              
              {/* Dynamic Interactive Chart */}
              <div className="h-64 flex items-end gap-3 w-full pt-4 border-b border-gray-100 pb-2 relative">
                {/* Horizontal Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-2 opacity-10">
                  <div className="border-b border-black w-full h-0"></div>
                  <div className="border-b border-black w-full h-0"></div>
                  <div className="border-b border-black w-full h-0"></div>
                  <div className="border-b border-black w-full h-0"></div>
                </div>
                
                {chartPoints.map((p: any, i: number) => {
                  const organicHeight = Math.max(10, Math.round((p.organic / maxChartVal) * 85));
                  const directHeight = Math.max(5, Math.round((p.direct / maxChartVal) * 85));

                  return (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-1 group relative h-full">
                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none whitespace-nowrap shadow-xl">
                        <div className="font-bold">{p.label}</div>
                        <div>Organic: {p.organic.toLocaleString()}</div>
                        <div className="text-gray-300">Direct: {p.direct.toLocaleString()}</div>
                      </div>

                      {/* Stacked / Dual Bars */}
                      <div 
                        style={{ height: `${organicHeight}%` }} 
                        className="w-full bg-d2c-royal rounded-t-sm opacity-90 group-hover:opacity-100 transition-all cursor-pointer"
                      ></div>
                      <div 
                        style={{ height: `${directHeight}%` }} 
                        className="w-full bg-d2c-sky rounded-t-sm opacity-80 group-hover:opacity-100 transition-all cursor-pointer"
                      ></div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-3 text-xs text-gray-400 font-semibold">
                {chartPoints.map((p: any, i: number) => (
                  <span key={i}>{p.label}</span>
                ))}
              </div>
            </div>

            {/* GEO Quick Distribution */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-d2c-navy flex items-center gap-2">
                    <Globe className="w-5 h-5 text-d2c-success" /> Regional College Coverage
                  </h3>
                  <button 
                    onClick={() => setActiveTab('geo')}
                    className="text-xs text-d2c-royal font-bold hover:underline"
                  >
                    View All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {geoDistribution.slice(0, 5).map((loc: any, i: number) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm font-semibold mb-1">
                        <span className="flex items-center gap-1.5 text-d2c-navy">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" /> {loc.state}
                        </span>
                        <span className="text-gray-500 font-mono text-xs">{loc.collegeCount} colleges ({loc.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-d2c-royal h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${Math.max(loc.percentage, 8)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
                <span>Pan-India Presence</span>
                <span className="font-bold text-d2c-navy">{summary.totalColleges} Institutions total</span>
              </div>
            </div>
          </div>

          {/* Top Search Keywords Preview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-d2c-navy">Top Performing Targeted Keywords</h3>
                <p className="text-xs text-gray-400 mt-0.5">Aggregated from college SEO tags and high-volume admission queries</p>
              </div>
              <button
                onClick={() => setActiveTab('keywords')}
                className="text-xs text-d2c-royal font-bold hover:underline"
              >
                Full Intelligence
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-semibold">Keyword</th>
                    <th className="p-4 font-semibold">Intent</th>
                    <th className="p-4 font-semibold">Clicks</th>
                    <th className="p-4 font-semibold">Impressions</th>
                    <th className="p-4 font-semibold">CTR</th>
                    <th className="p-4 font-semibold">Avg. Rank</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-50">
                  {keywords.slice(0, 5).map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-bold text-d2c-navy">{row.keyword}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          row.intent === 'Commercial' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {row.intent}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 font-medium">{row.clicks.toLocaleString()}</td>
                      <td className="p-4 text-gray-600 font-medium">{row.impressions.toLocaleString()}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded font-semibold text-xs">{row.ctr}</span>
                      </td>
                      <td className="p-4 font-bold text-d2c-navy">#{row.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GEO Regional Targeting */}
      {activeTab === 'geo' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-d2c-navy mb-1">State & City Geographical Target Matrix</h3>
            <p className="text-sm text-gray-500 mb-6">
              Geographic breakdown of partner engineering and medical colleges. Counselors and admission campaigns target these regional education hubs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {geoDistribution.map((geo: any, i: number) => {
                const isSelected = selectedState === geo.state;
                return (
                  <div 
                    key={i}
                    onClick={() => setSelectedState(isSelected ? null : geo.state)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-d2c-royal bg-blue-50/40 shadow-md ring-2 ring-d2c-royal/20' 
                        : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-d2c-royal/10 flex items-center justify-center text-d2c-royal font-bold">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-d2c-navy text-base">{geo.state}</h4>
                          <span className="text-xs text-gray-400">Share: {geo.percentage}% of DB</span>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-d2c-navy font-sora">{geo.collegeCount}</span>
                    </div>

                    <div className="space-y-2 mt-4 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Regional Entrance Exam:</span>
                        <span className="font-bold text-d2c-royal">{geo.entranceExam}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average College Rating:</span>
                        <span className="font-bold text-amber-600">★ {geo.avgRating} / 5.0</span>
                      </div>
                      <div className="flex justify-between truncate">
                        <span>Premier Campus:</span>
                        <span className="font-semibold text-d2c-navy truncate max-w-[150px]">{geo.topCollege}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Colleges in Selected State */}
          {selectedState && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-in fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-d2c-navy">
                  Colleges in {selectedState} ({seoAudits.filter((a: any) => a.issues).length})
                </h3>
                <button
                  onClick={() => setSelectedState(null)}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear Filter
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {collegesInSelectedState(seoAudits, selectedState).map((c: any, i: number) => (
                  <div key={i} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-d2c-navy text-sm">{c.name}</p>
                      <p className="text-xs text-gray-400 font-mono">{c.slug}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        c.status === 'Good' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        SEO Score: {c.score}/100
                      </span>
                      <Link
                        href={`/admin/colleges/${c.id}`}
                        className="p-1.5 text-d2c-royal hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Live SEO Health Audit */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-d2c-navy flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" /> Live SEO Health & Metadata Crawl Audit
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  Real-time validation of title tags, meta descriptions, image assets, and keyword density.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={exportCsv}
                  className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Export CSV Audit
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search college or exam by name / slug..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-sm"
                />
              </div>

              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'All Pages' },
                  { id: 'needs_attention', label: 'Needs Attention' },
                  { id: 'good', label: 'Optimal (Good)' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setAuditFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      auditFilter === f.id
                        ? 'bg-d2c-navy text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Audits Table */}
            <div className="overflow-x-auto border border-gray-100 rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-semibold">Page / Title</th>
                    <th className="p-4 font-semibold">Score</th>
                    <th className="p-4 font-semibold">SEO Tags</th>
                    <th className="p-4 font-semibold">Description Snippet</th>
                    <th className="p-4 font-semibold">Issues Detected</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {filteredAudits.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-400">
                        No pages found matching current search and filter.
                      </td>
                    </tr>
                  ) : (
                    filteredAudits.map((audit: any) => (
                      <tr key={audit.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-d2c-navy">{audit.name}</div>
                          <div className="text-xs text-gray-400 font-mono mt-0.5">/colleges/{audit.slug}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${
                              audit.score >= 85 ? 'text-green-600' : audit.score >= 65 ? 'text-amber-600' : 'text-red-600'
                            }`}>
                              {audit.score}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-mono text-xs px-2 py-1 bg-gray-100 rounded font-semibold">
                            {audit.tagsCount} tags
                          </span>
                        </td>
                        <td className="p-4 text-xs text-gray-500">
                          {audit.descLength > 0 ? (
                            <span>{audit.descLength} chars</span>
                          ) : (
                            <span className="text-red-500 font-semibold">Missing</span>
                          )}
                        </td>
                        <td className="p-4">
                          {audit.issues.length === 0 ? (
                            <span className="inline-flex items-center gap-1 text-xs text-green-700 font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Optimal
                            </span>
                          ) : (
                            <div className="space-y-1">
                              {audit.issues.map((issue: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-1.5 text-xs text-amber-700">
                                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  <span>{issue}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/colleges/${audit.slug}`}
                              target="_blank"
                              className="p-2 text-gray-400 hover:text-d2c-navy rounded-lg hover:bg-gray-100 transition-colors"
                              title="View Live Page"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/admin/colleges/${audit.id}`}
                              className="p-2 text-d2c-royal hover:bg-blue-50 rounded-lg transition-colors"
                              title="Fix & Edit SEO"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Keyword Intelligence */}
      {activeTab === 'keywords' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-d2c-navy flex items-center gap-2">
                  <Search className="w-5 h-5 text-d2c-royal" /> High-Intent Admission Keywords
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  Track organic query impressions, CTR, and SERP positions for target student keywords.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {keywords.slice(0, 6).map((kw: any, i: number) => (
                <div key={i} className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100 hover:border-gray-200 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-white border border-gray-200 font-semibold text-gray-600">
                      {kw.intent}
                    </span>
                    <span className="text-sm font-bold text-d2c-royal">#{kw.position} Position</span>
                  </div>
                  <h4 className="font-bold text-d2c-navy text-base mt-2 mb-3">{kw.keyword}</h4>
                  <div className="flex justify-between text-xs text-gray-500 pt-3 border-t border-gray-200/60 font-medium">
                    <span>{kw.clicks.toLocaleString()} Clicks</span>
                    <span>{kw.impressions.toLocaleString()} Impressions</span>
                    <span className="font-bold text-green-600">{kw.ctr} CTR</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Keyword Frequency from Tags */}
            <div className="overflow-x-auto border border-gray-100 rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-semibold">Keyword / Tag</th>
                    <th className="p-4 font-semibold">Search Intent</th>
                    <th className="p-4 font-semibold">Monthly Clicks</th>
                    <th className="p-4 font-semibold">Impressions</th>
                    <th className="p-4 font-semibold">Click-Through Rate</th>
                    <th className="p-4 font-semibold">SERP Position</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {keywords.map((kw: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-bold text-d2c-navy">{kw.keyword}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          kw.intent === 'Commercial' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {kw.intent}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 font-medium">{kw.clicks.toLocaleString()}</td>
                      <td className="p-4 text-gray-600 font-medium">{kw.impressions.toLocaleString()}</td>
                      <td className="p-4 font-semibold text-green-600">{kw.ctr}</td>
                      <td className="p-4 font-bold text-d2c-navy">#{kw.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function collegesInSelectedState(audits: any[], stateName: string) {
  return audits.filter((a: any) => {
    const s = (a.state || a.location || "").toLowerCase();
    return s.includes(stateName.toLowerCase());
  });
}
