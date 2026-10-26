'use client';

import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Search, 
  MapPin, 
  RefreshCw, 
  CheckCircle2, 
  ExternalLink,
  HelpCircle,
  FileText,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

interface AnalyticsData {
  kpis: {
    totalIndexedUrls: number;
    totalColleges: number;
    totalExams: number;
    totalBlogs: number;
    uniqueKeywords: number;
    totalLeads: number;
    gaConfigured: boolean;
    gaId: string | null;
    activeStatesCount: number;
  };
  geoDistribution: {
    region: string;
    count: number;
    percentage: number;
  }[];
  seoKeywords: {
    keyword: string;
    count: number;
    coverage: string;
  }[];
  topDemandedColleges: {
    name: string;
    inquiries: number;
  }[];
  health: {
    collegesWithTags: number;
    collegesWithImages: number;
    collegesWithAbout: number;
    tagsHealthPct: number;
    imagesHealthPct: number;
    contentHealthPct: number;
  };
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');

  const fetchAnalytics = async () => {
    try {
      setRefreshing(true);
      const res = await fetch('/api/admin/analytics');
      const json = await res.json();
      if (json.success) {
        setData(json);
        setLastRefreshed(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    } catch (err) {
      console.error('Failed to load live analytics:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const filteredKeywords = (data?.seoKeywords || []).filter(k => 
    k.keyword.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl pb-24 font-dm-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">
              Live SEO & GEO Analytics
            </h1>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-d2c-royal border border-blue-200">
              <Activity className="w-3.5 h-3.5 text-d2c-royal animate-pulse" /> Real Database Metrics
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Live geographic breakdown, search engine indexation health, and keyword coverage.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={fetchAnalytics}
            disabled={refreshing}
            className="bg-white hover:bg-gray-50 text-d2c-navy border border-gray-200 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            title="Refresh database metrics"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-d2c-royal' : ''}`} />
            Refresh
          </button>

          <button
            onClick={() => setShowConnectModal(!showConnectModal)}
            className="bg-d2c-royal hover:bg-d2c-navy text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-d2c-royal/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-d2c-gold" />
            Connect GA4 & Search Console
          </button>
        </div>
      </div>

      {/* Integration Setup Drawer/Card */}
      {showConnectModal && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-d2c-royal/20 shadow-xl space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="text-base font-sora font-bold text-d2c-navy">Connect Google Analytics 4 & Search Console</h3>
              <p className="text-xs text-gray-400 mt-0.5">Stream visitor clickstreams, search queries, and impression logs</p>
            </div>
            <button onClick={() => setShowConnectModal(false)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">✕ Close</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GA4 Setup */}
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-d2c-royal text-white flex items-center justify-center font-bold text-xs">GA4</div>
                <h4 className="text-sm font-bold text-d2c-navy">1. Google Analytics 4 (Real-time Visitors)</h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Add your Measurement ID into <code className="bg-white px-1.5 py-0.5 rounded border text-d2c-royal font-mono font-bold">.env.local</code>:
              </p>
              <pre className="p-3 bg-white rounded-xl border text-[11px] font-mono text-gray-800 overflow-x-auto select-all">
                NEXT_PUBLIC_GA_ID=&quot;G-XXXXXXXXXX&quot;
              </pre>
              <p className="text-[11px] text-gray-500">
                The tracking script is already integrated into the root layout and will immediately track real page views, sessions, and device locations.
              </p>
            </div>

            {/* Google Search Console Setup */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">GSC</div>
                <h4 className="text-sm font-bold text-d2c-navy">2. Google Search Console (Organic Keywords)</h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Verify your ownership of <strong className="text-d2c-navy">https://direct2campus.com</strong> and submit your live sitemap:
              </p>
              <div className="space-y-1.5 text-xs text-gray-700">
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border">
                  <span>Live Sitemap:</span>
                  <a href="/sitemap.xml" target="_blank" className="font-mono text-d2c-royal font-bold hover:underline flex items-center gap-1">
                    /sitemap.xml <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border">
                  <span>Robots File:</span>
                  <a href="/robots.txt" target="_blank" className="font-mono text-d2c-royal font-bold hover:underline flex items-center gap-1">
                    /robots.txt <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline pt-1"
              >
                Open Google Search Console Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Real KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Indexed URLs */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-150 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Search Indexed URLs</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-sora font-bold text-d2c-navy">
                {loading ? '...' : data?.kpis.totalIndexedUrls || 0}
              </h3>
              <span className="text-[11px] text-emerald-600 font-bold">100% Crawlable</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              {data?.kpis.totalColleges} colleges + {data?.kpis.totalExams} exams + {data?.kpis.totalBlogs} blogs
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-d2c-royal flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Unique SEO Keywords */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-150 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Monitored SEO Tags</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-sora font-bold text-d2c-navy">
                {loading ? '...' : data?.kpis.uniqueKeywords || 0}
              </h3>
              <span className="text-[11px] text-d2c-royal font-bold">Live DB Tags</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Indexed across courses & quotas</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Search className="w-6 h-6" />
          </div>
        </div>

        {/* Active States Hub */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-150 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">States with Institutions</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-sora font-bold text-d2c-navy">
                {loading ? '...' : data?.kpis.activeStatesCount || 0}
              </h3>
              <span className="text-[11px] text-emerald-600 font-bold">Pan-India</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Across 70+ engineering & medical campuses</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Globe className="w-6 h-6" />
          </div>
        </div>

        {/* GA4 Live Connection */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-150 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Google Analytics 4</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-base font-sora font-bold text-d2c-navy">
                {data?.kpis.gaConfigured ? 'Active & Tracking' : 'Not Configured'}
              </h3>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              {data?.kpis.gaId ? `ID: ${data.kpis.gaId}` : 'Add NEXT_PUBLIC_GA_ID to track'}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            data?.kpis.gaConfigured ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
          }`}>
            <Activity className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Charts & Geo Breakdown Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real GEO Regional Distribution */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-150 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-sora font-bold text-d2c-navy flex items-center gap-2">
                <Globe className="w-4 h-4 text-d2c-royal" />
                Regional Institution & Demand Distribution (Real Data)
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Calculated directly from colleges and admission demand stored in your database
              </p>
            </div>
            <span className="text-xs text-gray-400 font-mono">
              Total {data?.kpis.totalColleges || 0} Campuses
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-gray-400">Loading regional distribution...</div>
          ) : (
            <div className="space-y-4">
              {(data?.geoDistribution || []).map((geo, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="flex items-center gap-2 text-d2c-navy">
                      <MapPin className="w-3.5 h-3.5 text-d2c-royal" /> {geo.region}
                    </span>
                    <span className="text-gray-500 font-mono">
                      {geo.count} Colleges ({geo.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-d2c-royal to-d2c-sky h-full rounded-full transition-all duration-500" 
                      style={{ width: `${Math.max(geo.percentage, 4)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Technical SEO Indexing Health */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-150 space-y-5">
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              SEO Quality & Meta Health
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Automated on-page audit of published colleges</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-d2c-navy">
                <span>SEO Keywords Configured</span>
                <span className="text-emerald-700">{data?.health.tagsHealthPct || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${data?.health.tagsHealthPct || 0}%` }}></div>
              </div>
              <p className="text-[10px] text-gray-500">{data?.health.collegesWithTags} of {data?.kpis.totalColleges} colleges have custom SEO tags</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-d2c-navy">
                <span>Featured OG Image Coverage</span>
                <span className="text-blue-700">{data?.health.imagesHealthPct || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-d2c-royal h-2 rounded-full" style={{ width: `${data?.health.imagesHealthPct || 0}%` }}></div>
              </div>
              <p className="text-[10px] text-gray-500">{data?.health.collegesWithImages} of {data?.kpis.totalColleges} have social share images</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-d2c-navy">
                <span>Overview & Descriptions</span>
                <span className="text-purple-700">{data?.health.contentHealthPct || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${data?.health.contentHealthPct || 0}%` }}></div>
              </div>
              <p className="text-[10px] text-gray-500">{data?.health.collegesWithAbout} of {data?.kpis.totalColleges} have detailed content</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real Top Performing Keywords from Database */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-150 overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">
              Top Monitored Keywords & Tags (Real Database)
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Live tags extracted from colleges and entrance exams matching search queries
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Filter keyword tags..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-150 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4">Search Keyword / Tag</th>
                <th className="py-3 px-4">Pages Featuring Keyword</th>
                <th className="py-3 px-4">Indexation Coverage</th>
                <th className="py-3 px-4 text-right">Target Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400">Loading keywords...</td>
                </tr>
              ) : filteredKeywords.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400">No keywords match your filter.</td>
                </tr>
              ) : (
                filteredKeywords.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-d2c-navy capitalize flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-d2c-royal"></span>
                      {row.keyword}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 font-medium font-mono">
                      {row.count} institutions
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 bg-blue-50 text-d2c-royal rounded-md font-bold text-[11px]">
                        {row.coverage}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-gray-400 text-[11px]">
                      Search Engine Indexing
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
