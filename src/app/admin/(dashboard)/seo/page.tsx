'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Search, 
  Globe, 
  ExternalLink, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  ArrowRight,
  TrendingUp,
  FileText,
  Building2,
  HelpCircle,
  Link as LinkIcon,
  RefreshCw,
  Eye
} from 'lucide-react';
import { PageSeoData } from '@/components/admin/SeoSuiteEditor';

interface LandingPageItem {
  id: string;
  name: string;
  slug: string;
  type: 'college' | 'exam';
  editUrl: string;
  publicUrl: string;
  seo: PageSeoData;
  updatedAt?: string;
}

export default function PageSeoStudio() {
  const [items, setItems] = useState<LandingPageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'college' | 'exam'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'configured' | 'pending'>('all');

  const loadData = async () => {
    setLoading(true);
    try {
      const [collegesRes, examsRes] = await Promise.all([
        fetch('/api/admin/colleges').then((r) => r.json()).catch(() => ({ colleges: [] })),
        fetch('/api/admin/exams').then((r) => r.json()).catch(() => ({ exams: [] }))
      ]);

      const collegeItems: LandingPageItem[] = (collegesRes.colleges || []).map((c: any) => ({
        id: String(c.id),
        name: c.name,
        slug: c.slug,
        type: 'college',
        editUrl: `/admin/colleges/${c.id}`,
        publicUrl: `/colleges/${c.slug}`,
        seo: c.seo || c.contact?.seo || {},
        updatedAt: c.updated_at || c.updatedAt
      }));

      const examItems: LandingPageItem[] = (examsRes.exams || []).map((e: any) => ({
        id: String(e.id),
        name: e.name,
        slug: e.slug,
        type: 'exam',
        editUrl: `/admin/exams/${e.id}`,
        publicUrl: `/exams/${e.slug}`,
        seo: e.seo || e.exam_pattern?.seo || {},
        updatedAt: e.updated_at || e.updatedAt
      }));

      setItems([...collegeItems, ...examItems]);
    } catch (err) {
      console.error('Failed to load SEO pages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getSeoHealth = (seo: PageSeoData) => {
    let score = 0;
    if (seo?.primaryKeyword?.trim()) score += 20;
    if (seo?.seoTitle?.trim() && seo.seoTitle.length >= 40) score += 20;
    if (seo?.metaDescription?.trim() && seo.metaDescription.length >= 100) score += 20;
    if (seo?.aeoFaqs && seo.aeoFaqs.length > 0) score += 15;
    if (seo?.headingStructure && seo.headingStructure.length > 0) score += 15;
    if (seo?.internalLinks && seo.internalLinks.length > 0) score += 10;
    return score;
  };

  const filteredItems = items.filter((item) => {
    if (typeFilter !== 'all' && item.type !== typeFilter) return false;
    
    const health = getSeoHealth(item.seo);
    if (statusFilter === 'configured' && health < 40) return false;
    if (statusFilter === 'pending' && health >= 40) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchSlug = item.slug.toLowerCase().includes(q);
      const matchKeyword = item.seo?.primaryKeyword?.toLowerCase().includes(q);
      const matchTitle = item.seo?.seoTitle?.toLowerCase().includes(q);
      return matchName || matchSlug || matchKeyword || matchTitle;
    }
    return true;
  });

  const totalPages = items.length;
  const configuredPages = items.filter((i) => getSeoHealth(i.seo) >= 40).length;
  const pendingPages = totalPages - configuredPages;
  const totalFaqs = items.reduce((acc, curr) => acc + (curr.seo?.aeoFaqs?.length || 0), 0);

  return (
    <div className="max-w-7xl mx-auto pb-20 font-dm-sans">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-1 rounded-full bg-d2c-gold/15 text-d2c-navy text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-d2c-gold" />
              SEO & AEO Intelligence Studio
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">
            Page SEO & AEO Management
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            Configure primary keywords, optimized titles, meta descriptions, H1-H3 hierarchies, schema.org/FAQPage AEO rich snippets, and internal linking across all approved landing pages.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-d2c-navy rounded-xl text-xs font-bold transition-colors shadow-sm self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh List
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Approved Pages</span>
            <Globe className="w-4 h-4 text-d2c-sky" />
          </div>
          <div className="text-2xl font-sora font-bold text-d2c-navy">{totalPages}</div>
          <p className="text-[11px] text-gray-400 mt-1">Colleges & Entrance Exams</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">SEO Optimized</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-sora font-bold text-emerald-600">{configuredPages}</div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">
            {totalPages > 0 ? Math.round((configuredPages / totalPages) * 100) : 0}% coverage
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Optimization Needed</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-sora font-bold text-amber-600">{pendingPages}</div>
          <p className="text-[11px] text-gray-400 mt-1">Needs title, meta, or keyword</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">AEO FAQ Schema</span>
            <Sparkles className="w-4 h-4 text-d2c-royal" />
          </div>
          <div className="text-2xl font-sora font-bold text-d2c-royal">{totalFaqs}</div>
          <p className="text-[11px] text-gray-400 mt-1">Indexed for AI answer engines</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by page name, slug, target keyword, or title..."
            className="w-full pl-10 pr-4 py-2 text-xs md:text-sm rounded-xl border border-gray-200 outline-none focus:border-d2c-royal focus:ring-1 focus:ring-d2c-royal"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                typeFilter === 'all' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-500 hover:text-d2c-navy'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setTypeFilter('college')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                typeFilter === 'college' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-500 hover:text-d2c-navy'
              }`}
            >
              Colleges
            </button>
            <button
              onClick={() => setTypeFilter('exam')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                typeFilter === 'exam' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-500 hover:text-d2c-navy'
              }`}
            >
              Exams
            </button>
          </div>

          <div className="flex items-center bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === 'all' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-500 hover:text-d2c-navy'
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setStatusFilter('configured')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === 'configured' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-d2c-navy'
              }`}
            >
              Optimized
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === 'pending' ? 'bg-white text-amber-700 shadow-sm' : 'text-gray-500 hover:text-d2c-navy'
              }`}
            >
              Needs Work
            </button>
          </div>
        </div>
      </div>

      {/* Pages Table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <RefreshCw className="w-8 h-8 text-d2c-royal animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-d2c-navy">Loading Landing Pages & SEO Index...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-sm font-semibold text-gray-500">No landing pages match your search criteria.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/70 border-b border-gray-200/80 text-gray-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Landing Page</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Primary Target Keyword</th>
                  <th className="py-3.5 px-4">SEO Title & Meta</th>
                  <th className="py-3.5 px-4">AEO FAQs</th>
                  <th className="py-3.5 px-4">SEO Health</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((item) => {
                  const health = getSeoHealth(item.seo);
                  const titleLen = (item.seo?.seoTitle || '').length;
                  const descLen = (item.seo?.metaDescription || '').length;
                  const faqsCount = item.seo?.aeoFaqs?.length || 0;
                  const headingCount = item.seo?.headingStructure?.length || 0;

                  return (
                    <tr key={`${item.type}-${item.id}`} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-d2c-navy max-w-xs truncate">{item.name}</div>
                        <div className="text-[11px] text-gray-400 font-mono flex items-center gap-1 mt-0.5">
                          {item.publicUrl}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            item.type === 'college'
                              ? 'bg-blue-50 text-d2c-royal'
                              : 'bg-purple-50 text-purple-700'
                          }`}
                        >
                          {item.type === 'college' ? (
                            <Building2 className="w-3 h-3" />
                          ) : (
                            <FileText className="w-3 h-3" />
                          )}
                          {item.type}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {item.seo?.primaryKeyword ? (
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-medium text-[11px] border border-emerald-200/50">
                            {item.seo.primaryKeyword}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic text-[11px]">Not assigned</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-gray-400 w-10">Title:</span>
                            {item.seo?.seoTitle ? (
                              <span className="text-gray-700 font-medium truncate max-w-[200px]" title={item.seo.seoTitle}>
                                {item.seo.seoTitle}
                              </span>
                            ) : (
                              <span className="text-amber-500 italic text-[11px]">Missing</span>
                            )}
                            {item.seo?.seoTitle && (
                              <span className={`text-[10px] font-mono px-1 rounded ${
                                titleLen >= 40 && titleLen <= 60 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {titleLen}c
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-gray-400 w-10">Meta:</span>
                            {item.seo?.metaDescription ? (
                              <span className="text-gray-500 truncate max-w-[200px]" title={item.seo.metaDescription}>
                                {item.seo.metaDescription}
                              </span>
                            ) : (
                              <span className="text-amber-500 italic text-[11px]">Missing</span>
                            )}
                            {item.seo?.metaDescription && (
                              <span className={`text-[10px] font-mono px-1 rounded ${
                                descLen >= 120 && descLen <= 160 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {descLen}c
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        {faqsCount > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-[11px]">
                            <Sparkles className="w-3 h-3 text-indigo-500" />
                            {faqsCount} Schema FAQs
                          </span>
                        ) : (
                          <span className="text-gray-400 text-[11px]">0 FAQs</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="w-24">
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="font-bold text-gray-600">{health}%</span>
                            <span className={`text-[10px] font-bold ${
                              health >= 70 ? 'text-emerald-600' : health >= 40 ? 'text-amber-600' : 'text-red-500'
                            }`}>
                              {health >= 70 ? 'Good' : health >= 40 ? 'Fair' : 'Poor'}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                health >= 70 ? 'bg-emerald-500' : health >= 40 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${health}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={item.publicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-400 hover:text-d2c-navy hover:bg-gray-100 rounded-lg transition-colors"
                            title="Preview Public Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <Link
                            href={item.editUrl}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-d2c-royal hover:bg-d2c-navy text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit SEO Suite</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
