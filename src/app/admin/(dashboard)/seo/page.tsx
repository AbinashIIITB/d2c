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
  RefreshCw,
  Eye,
  Newspaper,
  Layout
} from 'lucide-react';
import { sortCollegesWithIEMFirst } from '@/lib/iem-priority';
import { CircleLoader } from '@/components/admin/CircleLoader';
import { SeoModalEditor, SeoModalItem } from '@/components/admin/seo/SeoModalEditor';

interface PageSeoEntry {
  id: string;
  name: string;
  slug: string;
  type: 'college' | 'exam' | 'blog' | 'page';
  editUrl: string;
  publicUrl: string;
  seo: any;
  rawItem: any;
  updatedAt?: string;
}

export default function PageSeoStudio() {
  const [items, setItems] = useState<PageSeoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'college' | 'exam' | 'blog' | 'page'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'configured' | 'pending'>('all');

  // Modal editor state
  const [activeItem, setActiveItem] = useState<SeoModalItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [collegesRes, examsRes, blogsRes, pagesRes] = await Promise.all([
        fetch('/api/admin/colleges').then((r) => r.json()).catch(() => ({ colleges: [] })),
        fetch('/api/admin/exams').then((r) => r.json()).catch(() => ({ exams: [] })),
        fetch('/api/admin/blogs').then((r) => r.json()).catch(() => []),
        fetch('/api/admin/pages').then((r) => r.json()).catch(() => ({ pages: {} }))
      ]);

      // 1. Colleges
      const rawColleges = Array.isArray(collegesRes) ? collegesRes : (collegesRes.colleges || []);
      const collegeItems: PageSeoEntry[] = sortCollegesWithIEMFirst(rawColleges.map((c: any) => ({
        id: String(c.id),
        name: c.name,
        slug: c.slug,
        type: 'college',
        editUrl: `/admin/colleges/${c.id}`,
        publicUrl: `/colleges/${c.slug}`,
        seo: c.seo || c.contact?.seo || {},
        rawItem: c,
        updatedAt: c.updated_at || c.updatedAt
      })));

      // 2. Exams
      const rawExams = Array.isArray(examsRes) ? examsRes : (examsRes.exams || []);
      const examItems: PageSeoEntry[] = rawExams.map((e: any) => ({
        id: String(e.id),
        name: e.name,
        slug: e.slug,
        type: 'exam',
        editUrl: `/admin/exams/${e.id}`,
        publicUrl: `/exams/${e.slug}`,
        seo: e.seo || e.exam_pattern?.seo || {},
        rawItem: e,
        updatedAt: e.updated_at || e.updatedAt
      }));

      // 3. Blogs
      const rawBlogs = Array.isArray(blogsRes) ? blogsRes : [];
      const blogItems: PageSeoEntry[] = rawBlogs.map((b: any) => ({
        id: String(b.id || b.slug),
        name: b.title,
        slug: b.slug,
        type: 'blog',
        editUrl: `/admin/blogs/${b.id || b.slug}`,
        publicUrl: `/blog/${b.slug}`,
        seo: {
          seoTitle: b.seoTitle || `${b.title} | Direct2Campus`,
          metaDescription: b.metaDescription || b.excerpt || '',
          primaryKeyword: b.tags?.[0] || b.category || '',
          secondaryKeywords: b.tags || [],
          canonicalUrl: b.canonicalUrl || `https://direct2campus.com/blog/${b.slug}`
        },
        rawItem: b,
        updatedAt: b.updatedAt || b.date
      }));

      // 4. Core Pages
      const rawPagesObj = pagesRes.pages || {};
      const corePageSlugs = [
        { slug: 'home', name: 'Home Page', path: '/' },
        { slug: 'about', name: 'About Us', path: '/about' },
        { slug: 'contact', name: 'Contact Us', path: '/contact' },
        { slug: 'colleges', name: 'Colleges Hub Directory', path: '/colleges' },
        { slug: 'exams', name: 'Entrance Exams Directory', path: '/exams' },
        { slug: 'blog', name: 'Admission Insights & Blogs', path: '/blog' }
      ];

      const corePageItems: PageSeoEntry[] = corePageSlugs.map((p) => {
        const pageData = rawPagesObj[p.slug] || {};
        return {
          id: p.slug,
          name: pageData.title || p.name,
          slug: p.slug,
          type: 'page',
          editUrl: `/admin/pages/${p.slug}`,
          publicUrl: p.path,
          seo: {
            seoTitle: pageData.title || `${p.name} | Direct2Campus`,
            metaDescription: pageData.description || '',
            primaryKeyword: pageData.primaryKeyword || '',
            keywords: pageData.keywords || [],
            canonicalUrl: pageData.canonicalUrl || `https://direct2campus.com${p.path === '/' ? '' : p.path}`
          },
          rawItem: pageData,
          updatedAt: pageData.updatedAt
        };
      });

      setItems([...collegeItems, ...examItems, ...blogItems, ...corePageItems]);
    } catch (err) {
      console.error('Failed to load SEO pages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getSeoHealth = (item: PageSeoEntry) => {
    let score = 0;
    const title = item.seo?.seoTitle || item.name || '';
    const desc = item.seo?.metaDescription || '';
    const kw = item.seo?.primaryKeyword || '';

    if (title.trim().length >= 40 && title.trim().length <= 70) score += 30;
    else if (title.trim().length > 0) score += 15;

    if (desc.trim().length >= 100 && desc.trim().length <= 170) score += 30;
    else if (desc.trim().length > 0) score += 15;

    if (kw.trim().length > 0) score += 20;

    if (item.type === 'college') {
      if (item.seo?.aeoFaqs && item.seo.aeoFaqs.length > 0) score += 10;
      if (item.seo?.h1Title) score += 10;
    } else if (item.type === 'exam') {
      if (item.rawItem?.faqs && item.rawItem.faqs.length > 0) score += 10;
      if (item.rawItem?.aboutExam) score += 10;
    } else {
      if (item.seo?.canonicalUrl) score += 20;
    }

    return Math.min(score, 100);
  };

  const filteredItems = items.filter((item) => {
    if (typeFilter !== 'all' && item.type !== typeFilter) return false;
    
    const health = getSeoHealth(item);
    if (statusFilter === 'configured' && health < 60) return false;
    if (statusFilter === 'pending' && health >= 60) return false;

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
  const configuredPages = items.filter((i) => getSeoHealth(i) >= 60).length;
  const pendingPages = totalPages - configuredPages;
  const totalFaqs = items.reduce((acc, curr) => {
    const aeoCount = curr.seo?.aeoFaqs?.length || 0;
    const rawFaqCount = curr.rawItem?.faqs?.length || 0;
    return acc + Math.max(aeoCount, rawFaqCount);
  }, 0);

  const openEditor = (entry: PageSeoEntry) => {
    setActiveItem({
      id: entry.id,
      name: entry.name,
      slug: entry.slug,
      type: entry.type,
      publicUrl: entry.publicUrl,
      rawItem: entry.rawItem,
      seoData: entry.seo
    });
    setIsModalOpen(true);
  };

  const handleSaveSuccess = (updatedRaw: any) => {
    loadData();
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-20 font-dm-sans min-w-0">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-1 rounded-full bg-d2c-gold/15 text-d2c-navy text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-d2c-gold" />
              SEO & AEO Intelligence Suite
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">
            Page SEO & Meta Forms Suite
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            Configure primary keywords, title tags, meta descriptions, H1-H3 hierarchies, schema.org FAQPage rich snippets, and social sharing cards across all College, Exam, Blog, and Core pages.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-d2c-navy rounded-xl text-xs font-bold transition-colors shadow-sm self-start shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Suite
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Pages</span>
            <Globe className="w-4 h-4 text-d2c-sky" />
          </div>
          <div className="text-2xl font-sora font-bold text-d2c-navy">{totalPages}</div>
          <p className="text-[11px] text-gray-400 mt-1">Colleges, Exams, Blogs & Site Pages</p>
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
          <p className="text-[11px] text-gray-400 mt-1">Needs title, meta, or target keyword</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">AEO FAQ Schemas</span>
            <Sparkles className="w-4 h-4 text-d2c-royal" />
          </div>
          <div className="text-2xl font-sora font-bold text-d2c-royal">{totalFaqs}</div>
          <p className="text-[11px] text-gray-400 mt-1">Eligible for Google & AI Answer Boxes</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by page name, slug, target keyword, or title..."
            className="w-full pl-10 pr-4 py-2 text-xs md:text-sm rounded-xl border border-gray-200 outline-none focus:border-d2c-royal focus:ring-1 focus:ring-d2c-royal"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex flex-wrap items-center bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                typeFilter === 'all' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-500 hover:text-d2c-navy'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setTypeFilter('college')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shrink-0 ${
                typeFilter === 'college' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-500 hover:text-d2c-navy'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" /> Colleges
            </button>
            <button
              onClick={() => setTypeFilter('exam')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shrink-0 ${
                typeFilter === 'exam' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-500 hover:text-d2c-navy'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Exams
            </button>
            <button
              onClick={() => setTypeFilter('blog')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shrink-0 ${
                typeFilter === 'blog' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-500 hover:text-d2c-navy'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" /> Blogs
            </button>
            <button
              onClick={() => setTypeFilter('page')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shrink-0 ${
                typeFilter === 'page' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-500 hover:text-d2c-navy'
              }`}
            >
              <Layout className="w-3.5 h-3.5" /> Core Pages
            </button>
          </div>

          <div className="flex items-center bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                statusFilter === 'all' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-500 hover:text-d2c-navy'
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setStatusFilter('configured')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                statusFilter === 'configured' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-d2c-navy'
              }`}
            >
              Optimized
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
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
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <CircleLoader
            size="lg"
            color="royal"
            text="Loading SEO Suite & Index..."
            subtext="Analyzing college, entrance exam, blog, and page metadata..."
          />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-sm font-semibold text-gray-500">No pages match your search criteria.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto relative">
            <table className="w-full text-left text-xs min-w-[860px]">
              <thead className="bg-gray-50/80 border-b border-gray-200/80 text-gray-500 uppercase tracking-wider font-semibold whitespace-nowrap">
                <tr>
                  <th className="py-3 px-4 min-w-[200px]">Page / Landing</th>
                  <th className="py-3 px-3 min-w-[90px]">Category</th>
                  <th className="py-3 px-3 min-w-[130px]">Primary Target Keyword</th>
                  <th className="py-3 px-3 min-w-[200px]">SEO Title & Meta Snippet</th>
                  <th className="py-3 px-3 text-center min-w-[90px]">AEO / Schema</th>
                  <th className="py-3 px-3 text-center min-w-[90px]">Health</th>
                  <th className="py-3 px-4 text-right min-w-[140px] sticky right-0 bg-gray-50/95 backdrop-blur-sm shadow-[-6px_0_10px_-2px_rgba(0,0,0,0.06)] z-10">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((item) => {
                  const health = getSeoHealth(item);
                  const titleLen = (item.seo?.seoTitle || item.name || '').length;
                  const descLen = (item.seo?.metaDescription || '').length;
                  const faqsCount = item.seo?.aeoFaqs?.length || item.rawItem?.faqs?.length || 0;

                  return (
                    <tr key={`${item.type}-${item.id}`} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => openEditor(item)}
                          className="text-left font-bold text-d2c-navy hover:text-d2c-royal transition-colors max-w-xs truncate block"
                          title={`Edit SEO for ${item.name}`}
                        >
                          {item.name}
                        </button>
                        <div className="text-[11px] text-gray-400 font-mono flex items-center gap-1 mt-0.5 truncate">
                          {item.publicUrl}
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            item.type === 'college'
                              ? 'bg-blue-50 text-d2c-royal'
                              : item.type === 'exam'
                              ? 'bg-purple-50 text-purple-700'
                              : item.type === 'blog'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {item.type === 'college' && <Building2 className="w-3 h-3" />}
                          {item.type === 'exam' && <FileText className="w-3 h-3" />}
                          {item.type === 'blog' && <Newspaper className="w-3 h-3" />}
                          {item.type === 'page' && <Layout className="w-3 h-3" />}
                          {item.type}
                        </span>
                      </td>

                      <td className="py-3.5 px-3">
                        {item.seo?.primaryKeyword ? (
                          <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-medium text-[11px] border border-emerald-200/50 truncate max-w-[140px]" title={item.seo.primaryKeyword}>
                            {item.seo.primaryKeyword}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic text-[11px]">Not assigned</span>
                        )}
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] uppercase font-bold text-gray-400 w-9 shrink-0">Title:</span>
                            <span className="text-gray-700 font-medium truncate max-w-[160px]" title={item.seo?.seoTitle || item.name}>
                              {item.seo?.seoTitle || item.name}
                            </span>
                            <span className={`text-[9px] font-mono px-1 rounded shrink-0 ${
                              titleLen >= 45 && titleLen <= 65 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {titleLen}c
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] uppercase font-bold text-gray-400 w-9 shrink-0">Meta:</span>
                            {item.seo?.metaDescription ? (
                              <span className="text-gray-500 truncate max-w-[160px]" title={item.seo.metaDescription}>
                                {item.seo.metaDescription}
                              </span>
                            ) : (
                              <span className="text-amber-500 italic text-[11px]">Missing</span>
                            )}
                            {item.seo?.metaDescription && (
                              <span className={`text-[9px] font-mono px-1 rounded shrink-0 ${
                                descLen >= 120 && descLen <= 160 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {descLen}c
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        {faqsCount > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold text-[11px]">
                            <Sparkles className="w-3 h-3 text-indigo-500" />
                            {faqsCount} FAQs
                          </span>
                        ) : (
                          <span className="text-gray-400 text-[11px]">0 FAQs</span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        <div className="inline-block w-20">
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="font-bold text-gray-600">{health}%</span>
                            <span className={`text-[10px] font-bold ${
                              health >= 70 ? 'text-emerald-600' : health >= 50 ? 'text-amber-600' : 'text-red-500'
                            }`}>
                              {health >= 70 ? 'Good' : health >= 50 ? 'Fair' : 'Poor'}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                health >= 70 ? 'bg-emerald-500' : health >= 50 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${health}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right sticky right-0 bg-white group-hover:bg-[#f6f9fe] transition-colors shadow-[-6px_0_10px_-2px_rgba(0,0,0,0.06)] z-10">
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

                          <button
                            type="button"
                            id={`edit-seo-${item.slug}`}
                            onClick={() => openEditor(item)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-d2c-royal hover:bg-d2c-navy text-white rounded-lg text-xs font-bold transition-all shadow-sm shrink-0"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit SEO Form</span>
                          </button>
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

      {/* Dedicated SEO Modal Form */}
      <SeoModalEditor
        item={activeItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveSuccess={handleSaveSuccess}
      />
    </div>
  );
}
