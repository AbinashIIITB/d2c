'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  Globe,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  Sparkles,
  ExternalLink,
  HelpCircle,
  Send,
  Layers,
  PhoneCall,
  Calendar,
  Check
} from 'lucide-react';
import { SlugInput } from './SlugInput';
import { SectionCard } from './SectionCard';
import { ImageUploader } from './ImageUploader';
import { AdminFormSaveBar } from './AdminFormSaveBar';

export interface PageBlock {
  id: string;
  type: 'h2' | 'h3' | 'paragraph' | 'image' | 'cta' | 'highlights' | 'faq';
  text?: string;
  url?: string;
  alt?: string;
  caption?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  items?: string[];
  question?: string;
  answer?: string;
}

interface WordPressPageEditorProps {
  initialData?: any;
  isNew?: boolean;
}

export function WordPressPageEditor({ initialData = {}, isNew = false }: WordPressPageEditorProps) {
  const router = useRouter();

  const [pageData, setPageData] = useState<any>({
    slug: initialData.slug || '',
    title: initialData.title || '',
    h1: initialData.h1 || initialData.heading || initialData.title || '',
    subheading: initialData.subheading || '',
    badge: initialData.badge || 'Admissions Guide 2026-27',
    description: initialData.description || '',
    seoTitle: initialData.seoTitle || initialData.title || '',
    metaDescription: initialData.metaDescription || initialData.description || '',
    canonicalUrl: initialData.canonicalUrl || '',
    includeInSitemap: initialData.includeInSitemap ?? true,
    sitemapPriority: initialData.sitemapPriority ?? 0.8,
    changeFrequency: initialData.changeFrequency || 'weekly',
    published: initialData.published ?? true,
    featuredImage: initialData.featuredImage || '',
    imageAlt: initialData.imageAlt || '',
    imageCaption: initialData.imageCaption || '',
    content: initialData.content || '',
    sections: Array.isArray(initialData.sections) && initialData.sections.length > 0
      ? initialData.sections.map((s: any, idx: number) => ({ ...s, id: s.id || `block-${idx}` }))
      : [
          {
            id: 'block-1',
            type: 'h2',
            text: 'Overview & Direct Admission Opportunities'
          },
          {
            id: 'block-2',
            type: 'paragraph',
            text: 'Discover approved management quota pathways, college cutoffs, and transparent fee allocations for premier technical and professional institutes across India.'
          },
          {
            id: 'block-3',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
            alt: 'Campus auditorium and students collaborating on academic research',
            caption: 'Students engaging in campus technical workshops'
          },
          {
            id: 'block-4',
            type: 'cta',
            title: 'Ready to Secure Your Seat?',
            subtitle: 'Schedule a free consultation call with our senior counseling team.',
            buttonText: 'Book Free Profile Evaluation',
            badge: 'Session 2026-27'
          }
        ]
  });

  const [viewMode, setViewMode] = useState<'editor' | 'split' | 'preview'>('editor');
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const updateField = (field: string, value: any) => {
    setPageData((prev: any) => ({ ...prev, [field]: value }));
  };

  // Block management
  const addBlock = (type: PageBlock['type']) => {
    const newBlock: PageBlock = {
      id: `block-${Date.now()}`,
      type,
      text: type === 'h2' ? 'New Section Heading' : type === 'h3' ? 'Subsection Title' : 'Write your paragraph content here...',
      url: type === 'image' ? 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200' : undefined,
      alt: type === 'image' ? 'Describe the image for SEO search engines' : undefined,
      caption: type === 'image' ? 'Image caption' : undefined,
      title: type === 'cta' ? 'Take Action Now' : type === 'highlights' ? 'Key Highlights' : undefined,
      subtitle: type === 'cta' ? 'Connect with certified academic counselors today.' : undefined,
      buttonText: type === 'cta' ? 'Request Free Counseling' : undefined,
      items: type === 'highlights' ? ['100% Genuine Guidance', 'Transparent Fee Structure', 'Direct College Verification'] : undefined,
      question: type === 'faq' ? 'What is the eligibility criteria?' : undefined,
      answer: type === 'faq' ? 'Candidates must meet minimum Class 12 aggregate marks as per institutional guidelines.' : undefined
    };

    setPageData((prev: any) => ({
      ...prev,
      sections: [...(prev.sections || []), newBlock]
    }));
  };

  const updateBlock = (id: string, field: string, value: any) => {
    setPageData((prev: any) => ({
      ...prev,
      sections: (prev.sections || []).map((b: PageBlock) =>
        b.id === id ? { ...b, [field]: value } : b
      )
    }));
  };

  const removeBlock = (id: string) => {
    setPageData((prev: any) => ({
      ...prev,
      sections: (prev.sections || []).filter((b: PageBlock) => b.id !== id)
    }));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const sections = [...(pageData.sections || [])];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sections.length) return;
    const temp = sections[index];
    sections[index] = sections[targetIdx];
    sections[targetIdx] = temp;
    setPageData((prev: any) => ({ ...prev, sections }));
  };

  const handleSave = async () => {
    if (!pageData.title?.trim()) {
      setErrorMessage('Please enter a Page Title');
      return;
    }
    if (!pageData.slug?.trim()) {
      setErrorMessage('Please enter a URL Slug');
      return;
    }

    setSaving(true);
    setSavedSuccess(null);
    setErrorMessage('');

    try {
      const url = isNew ? '/api/admin/pages' : `/api/admin/pages/${pageData.slug}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData)
      });

      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error || 'Failed to save page');
      }

      const saved = json.page || pageData;
      const cleanSavedSlug = String(saved.slug || pageData.slug || '').trim().replace(/^\/+|\/+$/g, '');
      setPageData((prev: any) => ({ ...prev, slug: cleanSavedSlug }));
      setSavedSuccess(cleanSavedSlug);
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while saving the page.');
    } finally {
      setSaving(false);
    }
  };

  const isCore = ['home', 'about', 'contact', 'mba', 'privacy', 'terms'].includes(pageData.slug?.toLowerCase());

  const handleDelete = async () => {
    if (isCore) {
      alert('Core website pages cannot be deleted.');
      return;
    }
    if (!window.confirm(`Are you sure you want to permanently delete page "/${pageData.slug}"? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/pages/${pageData.slug}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        router.push('/admin/pages');
      } else {
        const json = await res.json();
        alert(json.error || 'Failed to delete page');
      }
    } catch {
      alert('Network error while deleting page');
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-28 font-dm-sans">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-d2c-navy hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                {isNew ? 'WordPress SEO Page Creator' : 'SEO Page Editor'}
              </span>
              {pageData.published ? (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Published
                </span>
              ) : (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                  Draft
                </span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-sora font-bold text-d2c-navy mt-1">
              {pageData.title || (isNew ? 'Create New SEO Page' : 'Edit Page')}
            </h1>
          </div>
        </div>

        {/* View Switcher & Actions */}
        <div className="flex items-center gap-2">
          {!isNew && !isCore && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors flex items-center gap-1"
              title="Delete this custom page"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          )}

          <div className="flex items-center gap-2 bg-gray-100/80 p-1 rounded-2xl border border-gray-200/80">
            <button
              type="button"
              onClick={() => setViewMode('editor')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'editor' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-600 hover:text-d2c-navy'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Block Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('split')}
              className={`hidden lg:flex px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all items-center gap-1.5 ${
                viewMode === 'split' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-600 hover:text-d2c-navy'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Split View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'preview' ? 'bg-d2c-royal text-white shadow-sm' : 'text-gray-600 hover:text-d2c-navy'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Responsive Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {savedSuccess && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">Page published and live in sitemap!</p>
              <p className="text-xs text-emerald-700">Public URL: {savedSuccess === 'home' ? '/' : `/${savedSuccess}`}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={savedSuccess === 'home' ? '/' : `/${savedSuccess}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Page</span>
            </Link>
            <Link
              href="/admin/pages"
              className="px-3.5 py-1.5 bg-white border border-emerald-200 hover:bg-emerald-100/50 text-emerald-800 rounded-xl text-xs font-bold transition-colors"
            >
              All Pages
            </Link>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className={`grid gap-8 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* BLOCK EDITOR PANE */}
        {(viewMode === 'editor' || viewMode === 'split') && (
          <div className="space-y-8">
            
            {/* Section 1: Page Details & Dedicated H1 Tag */}
            <SectionCard
              title="SEO Page Title & Dedicated H1 Tag"
              icon={Heading1}
              description="Core headline hierarchy — H1 is the primary semantic title used by Google for search indexing"
            >
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-semibold text-d2c-navy">
                      Dedicated H1 Tag (Main Page Heading) <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                      SEO Tag: &lt;h1&gt;
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={pageData.h1}
                    onChange={(e) => {
                      updateField('h1', e.target.value);
                      if (!pageData.title || pageData.title === pageData.h1) {
                        updateField('title', e.target.value);
                      }
                    }}
                    placeholder="e.g. Complete Guide to B.Tech Direct Admission & Cutoffs 2027"
                    className="w-full px-4 py-3 text-base rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-1 focus:ring-d2c-royal outline-none font-bold text-d2c-navy"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    Google recommends exactly one descriptive H1 per page containing your primary target keywords.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-d2c-navy mb-1.5">Page Name (Admin & Nav)</label>
                    <input
                      type="text"
                      value={pageData.title}
                      onChange={(e) => updateField('title', e.target.value)}
                      placeholder="e.g. B.Tech Direct Admission"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                    />
                  </div>

                  <SlugInput
                    label="URL Slug"
                    value={pageData.slug}
                    sourceText={pageData.h1 || pageData.title}
                    prefix=""
                    onChange={(slug) => updateField('slug', slug)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-d2c-navy mb-1.5">Top Badge Pill</label>
                    <input
                      type="text"
                      value={pageData.badge}
                      onChange={(e) => updateField('badge', e.target.value)}
                      placeholder="e.g. Admissions 2026-27"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-d2c-navy mb-1.5">Hero Subtitle / Lead Paragraph</label>
                    <input
                      type="text"
                      value={pageData.subheading}
                      onChange={(e) => updateField('subheading', e.target.value)}
                      placeholder="Brief 1-line overview under the main title..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <span className="text-xs font-bold text-d2c-navy">Publication Status</span>
                    <p className="text-[11px] text-gray-500">Live on /{pageData.slug} upon saving</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pageData.published}
                      onChange={(e) => updateField('published', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>
            </SectionCard>

            {/* Section 2: WordPress-Style Content Blocks */}
            <SectionCard
              title="Structured Content Blocks (H2, H3, Paragraphs & Images with Alt Tags)"
              icon={AlignLeft}
              description="Add and arrange semantic headings, rich paragraphs, images with SEO alt text, and call-to-actions"
            >
              <div className="space-y-4">
                {/* Block toolbar */}
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-gray-600 mr-2">Add Content:</span>
                  <button
                    type="button"
                    onClick={() => addBlock('h2')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-gray-100 text-d2c-navy border border-gray-200 shadow-xs flex items-center gap-1 transition-colors"
                  >
                    <Heading2 className="w-3.5 h-3.5 text-d2c-royal" /> + H2 Heading
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock('h3')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-gray-100 text-d2c-navy border border-gray-200 shadow-xs flex items-center gap-1 transition-colors"
                  >
                    <Heading3 className="w-3.5 h-3.5 text-blue-600" /> + H3 Heading
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock('paragraph')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-gray-100 text-d2c-navy border border-gray-200 shadow-xs flex items-center gap-1 transition-colors"
                  >
                    <AlignLeft className="w-3.5 h-3.5 text-gray-700" /> + Paragraph
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock('image')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-gray-100 text-emerald-800 border border-gray-200 shadow-xs flex items-center gap-1 transition-colors"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-600" /> + Image (with Alt Tag)
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock('cta')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-gray-100 text-amber-800 border border-gray-200 shadow-xs flex items-center gap-1 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" /> + CTA Banner
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock('faq')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-gray-100 text-purple-800 border border-gray-200 shadow-xs flex items-center gap-1 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-purple-600" /> + FAQ Accordion
                  </button>
                </div>

                {/* Blocks List */}
                <div className="space-y-4">
                  {(pageData.sections || []).map((block: PageBlock, index: number) => (
                    <div
                      key={block.id || index}
                      className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs hover:border-d2c-royal/40 transition-all space-y-3"
                    >
                      {/* Block Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            block.type === 'h2' ? 'bg-blue-50 text-d2c-royal border border-blue-100' :
                            block.type === 'h3' ? 'bg-sky-50 text-sky-800 border border-sky-100' :
                            block.type === 'paragraph' ? 'bg-gray-100 text-gray-700' :
                            block.type === 'image' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' :
                            block.type === 'cta' ? 'bg-amber-50 text-amber-800 border border-amber-100' :
                            'bg-purple-50 text-purple-800 border border-purple-100'
                          }`}>
                            {block.type === 'h2' ? '<h2> Section Heading' :
                             block.type === 'h3' ? '<h3> Subheading' :
                             block.type === 'paragraph' ? '<p> Paragraph Tag' :
                             block.type === 'image' ? '<img alt="..."> SEO Image' :
                             block.type === 'cta' ? 'CTA Banner' :
                             'FAQ Schema'}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">#{index + 1}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => moveBlock(index, 'up')}
                            className="p-1 text-gray-400 hover:text-d2c-navy disabled:opacity-30"
                            title="Move Up"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={index === (pageData.sections?.length || 0) - 1}
                            onClick={() => moveBlock(index, 'down')}
                            className="p-1 text-gray-400 hover:text-d2c-navy disabled:opacity-30"
                            title="Move Down"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeBlock(block.id)}
                            className="p-1 text-red-400 hover:text-red-600 ml-1"
                            title="Remove Block"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Block Body Inputs */}
                      {block.type === 'h2' && (
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Heading 2 Text (H2 Tag)
                          </label>
                          <input
                            type="text"
                            value={block.text || ''}
                            onChange={(e) => updateBlock(block.id, 'text', e.target.value)}
                            placeholder="e.g. Eligibility Criteria for Management Quota"
                            className="w-full px-3 py-2 text-sm font-bold text-d2c-navy rounded-xl border border-gray-200 outline-none focus:border-d2c-royal"
                          />
                        </div>
                      )}

                      {block.type === 'h3' && (
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Heading 3 Text (H3 Tag)
                          </label>
                          <input
                            type="text"
                            value={block.text || ''}
                            onChange={(e) => updateBlock(block.id, 'text', e.target.value)}
                            placeholder="e.g. Minimum Marks in Physics, Chemistry & Mathematics"
                            className="w-full px-3 py-2 text-sm font-semibold text-d2c-royal rounded-xl border border-gray-200 outline-none focus:border-d2c-royal"
                          />
                        </div>
                      )}

                      {block.type === 'paragraph' && (
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Paragraph Text (Paragraph Tag)
                          </label>
                          <textarea
                            rows={4}
                            value={block.text || ''}
                            onChange={(e) => updateBlock(block.id, 'text', e.target.value)}
                            placeholder="Type paragraph content..."
                            className="w-full px-3 py-2 text-sm text-gray-800 rounded-xl border border-gray-200 outline-none focus:border-d2c-royal leading-relaxed"
                          />
                        </div>
                      )}

                      {block.type === 'image' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Image Source URL <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={block.url || ''}
                                onChange={(e) => updateBlock(block.id, 'url', e.target.value)}
                                placeholder="https://..."
                                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:border-d2c-royal font-mono"
                              />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <label className="block text-xs font-semibold text-emerald-800">
                                  Image Alt Text Tag <span className="text-red-500">*</span>
                                </label>
                                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                  SEO Alt Tag
                                </span>
                              </div>
                              <input
                                type="text"
                                required
                                value={block.alt || ''}
                                onChange={(e) => updateBlock(block.id, 'alt', e.target.value)}
                                placeholder="e.g. B.Tech Computer Science laboratory at top engineering college"
                                className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-200 focus:border-emerald-500 outline-none font-medium"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Image Caption (Optional)
                            </label>
                            <input
                              type="text"
                              value={block.caption || ''}
                              onChange={(e) => updateBlock(block.id, 'caption', e.target.value)}
                              placeholder="e.g. Modern computer science laboratory equipped with cloud computing facilities"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none"
                            />
                          </div>
                          {block.url && (
                            <div className="p-2 bg-gray-50 rounded-xl border border-gray-150 flex items-center gap-3">
                              <img
                                src={block.url}
                                alt={block.alt || 'Preview'}
                                className="w-16 h-12 object-cover rounded-lg border border-gray-200"
                              />
                              <div className="text-xs text-gray-500">
                                <span className="font-semibold text-gray-700">Alt tag:</span> {block.alt || '(Missing alt text)'}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {block.type === 'cta' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">CTA Headline</label>
                            <input
                              type="text"
                              value={block.title || ''}
                              onChange={(e) => updateBlock(block.id, 'title', e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">CTA Subtitle</label>
                            <input
                              type="text"
                              value={block.subtitle || ''}
                              onChange={(e) => updateBlock(block.id, 'subtitle', e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Button Text</label>
                            <input
                              type="text"
                              value={block.buttonText || ''}
                              onChange={(e) => updateBlock(block.id, 'buttonText', e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none"
                            />
                          </div>
                        </div>
                      )}

                      {block.type === 'faq' && (
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Question</label>
                            <input
                              type="text"
                              value={block.question || ''}
                              onChange={(e) => updateBlock(block.id, 'question', e.target.value)}
                              placeholder="e.g. Can I get direct admission without entrance exam rank?"
                              className="w-full px-3 py-2 text-xs font-semibold text-d2c-navy rounded-xl border border-gray-200 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Answer</label>
                            <textarea
                              rows={2}
                              value={block.answer || ''}
                              onChange={(e) => updateBlock(block.id, 'answer', e.target.value)}
                              placeholder="e.g. Yes, authorized management quota seats allow direct admissions..."
                              className="w-full px-3 py-2 text-xs text-gray-700 rounded-xl border border-gray-200 outline-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* Section 3: XML Sitemap & Search Engine Optimization */}
            <SectionCard
              title="XML Sitemap & Search Engine Configuration"
              icon={Globe}
              description="Configure search engine crawlers, sitemap inclusion, priority weights, and SERP previews"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="sitemapToggle"
                      checked={pageData.includeInSitemap}
                      onChange={(e) => updateField('includeInSitemap', e.target.checked)}
                      className="w-4 h-4 rounded text-d2c-royal"
                    />
                    <label htmlFor="sitemapToggle" className="text-xs font-bold text-d2c-navy cursor-pointer">
                      Include in XML Sitemap
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Sitemap Priority ({pageData.sitemapPriority})
                    </label>
                    <select
                      value={pageData.sitemapPriority}
                      onChange={(e) => updateField('sitemapPriority', Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-gray-200 outline-none"
                    >
                      <option value="1.0">1.0 (Highest - Homepage level)</option>
                      <option value="0.9">0.9 (Very High - Core admission guide)</option>
                      <option value="0.8">0.8 (Standard - Recommended for SEO)</option>
                      <option value="0.7">0.7 (Medium)</option>
                      <option value="0.5">0.5 (Low - Supporting info)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Change Frequency
                    </label>
                    <select
                      value={pageData.changeFrequency}
                      onChange={(e) => updateField('changeFrequency', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-gray-200 outline-none"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-d2c-navy">Meta Title Tag</label>
                    <span className="text-[10px] text-gray-400">{(pageData.seoTitle || pageData.title || '').length} / 60 chars</span>
                  </div>
                  <input
                    type="text"
                    value={pageData.seoTitle}
                    onChange={(e) => updateField('seoTitle', e.target.value)}
                    placeholder={pageData.title || 'Page title for search engines...'}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-d2c-navy">Meta Description</label>
                    <span className="text-[10px] text-gray-400">{(pageData.metaDescription || '').length} / 160 chars</span>
                  </div>
                  <textarea
                    rows={2}
                    value={pageData.metaDescription}
                    onChange={(e) => updateField('metaDescription', e.target.value)}
                    placeholder="Concise overview snippet for search results (140-160 characters)..."
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                  />
                </div>
              </div>
            </SectionCard>

          </div>
        )}

        {/* LIVE RESPONSIVE PREVIEW PANE */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className="space-y-6">
            {/* Viewport switch toolbar */}
            <div className="bg-[#0B1120] text-white p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg border border-white/10 sticky top-20 z-20">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
                <Eye className="w-4 h-4 text-d2c-sky" />
                <span>Mobile Responsive Canvas</span>
              </div>

              <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setDevicePreview('desktop')}
                  className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                    devicePreview === 'desktop' ? 'bg-d2c-royal text-white font-bold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDevicePreview('tablet')}
                  className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                    devicePreview === 'tablet' ? 'bg-d2c-royal text-white font-bold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tablet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDevicePreview('mobile')}
                  className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                    devicePreview === 'mobile' ? 'bg-d2c-royal text-white font-bold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mobile (375px)</span>
                </button>
              </div>
            </div>

            {/* Device Canvas Frame */}
            <div className="flex justify-center bg-gray-100/60 p-4 rounded-3xl border border-gray-200 min-h-[600px] overflow-hidden">
              <div className={`transition-all duration-300 w-full ${
                devicePreview === 'desktop'
                  ? 'max-w-4xl'
                  : devicePreview === 'tablet'
                  ? 'max-w-[768px] shadow-2xl rounded-3xl border-4 border-gray-800 bg-white overflow-hidden'
                  : 'max-w-[375px] shadow-2xl rounded-[40px] border-8 border-gray-800 bg-white overflow-hidden'
              }`}>
                {/* Hero Header matching Direct2Campus Theme */}
                <div className="bg-d2c-navy text-white p-6 md:p-10 relative overflow-hidden">
                  <div className="inline-block px-3 py-1 bg-d2c-sky/20 border border-d2c-sky/30 rounded-md text-d2c-sky text-[11px] font-bold uppercase tracking-wider mb-3">
                    {pageData.badge || 'Admissions 2026-27'}
                  </div>

                  {/* Primary Semantic H1 Tag */}
                  <h1 className="text-2xl md:text-4xl font-sora font-bold text-white mb-3 leading-snug">
                    {pageData.h1 || pageData.title || 'Your Dedicated Page H1 Heading'}
                  </h1>

                  {pageData.subheading && (
                    <p className="text-xs md:text-sm text-d2c-ice/85 leading-relaxed max-w-xl">
                      {pageData.subheading}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-xs text-d2c-ice/70 pt-3 mt-4 border-t border-white/10">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-d2c-sky" />
                      <span>Verified Session 2026-27</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Government Approved Quota</span>
                    </div>
                  </div>
                </div>

                {/* Rendered Content Blocks */}
                <div className="bg-white p-6 md:p-10 space-y-6">
                  {(pageData.sections || []).map((block: PageBlock, bIdx: number) => {
                    if (block.type === 'h2') {
                      return (
                        <h2 key={bIdx} className="text-xl md:text-2xl font-sora font-bold text-d2c-navy mt-6 mb-2 border-b border-gray-100 pb-2">
                          {block.text}
                        </h2>
                      );
                    }
                    if (block.type === 'h3') {
                      return (
                        <h3 key={bIdx} className="text-lg md:text-xl font-sora font-bold text-d2c-royal mt-4 mb-2">
                          {block.text}
                        </h3>
                      );
                    }
                    if (block.type === 'paragraph') {
                      return (
                        <p key={bIdx} className="text-sm md:text-base text-gray-700 leading-relaxed my-3">
                          {block.text}
                        </p>
                      );
                    }
                    if (block.type === 'image') {
                      return (
                        <figure key={bIdx} className="my-6">
                          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-150">
                            <img
                              src={block.url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'}
                              alt={block.alt || 'Responsive SEO image'}
                              className="w-full max-h-[380px] object-cover"
                              onError={(e: any) => {
                                e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800';
                              }}
                            />
                          </div>
                          {block.caption && (
                            <figcaption className="text-xs text-gray-500 text-center mt-2 italic">
                              {block.caption}
                            </figcaption>
                          )}
                        </figure>
                      );
                    }
                    if (block.type === 'cta') {
                      return (
                        <div key={bIdx} className="p-6 bg-gradient-to-r from-d2c-navy to-d2c-royal rounded-2xl text-white space-y-3 shadow-md my-6">
                          <span className="text-xs font-bold uppercase tracking-wider text-d2c-gold px-2.5 py-0.5 rounded-full bg-white/10">
                            {block.badge || 'Admissions 2026-27'}
                          </span>
                          <h4 className="text-lg md:text-xl font-bold font-sora">
                            {block.title || 'Take the Next Step'}
                          </h4>
                          <p className="text-xs text-d2c-ice/85 leading-relaxed">
                            {block.subtitle || 'Connect with verified admission counselors.'}
                          </p>
                          <div className="pt-2">
                            <button
                              type="button"
                              className="px-5 py-2.5 bg-d2c-gold text-d2c-navy rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
                            >
                              <PhoneCall className="w-3.5 h-3.5" />
                              <span>{block.buttonText || 'Book Free Profile Evaluation'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    }
                    if (block.type === 'faq') {
                      return (
                        <div key={bIdx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5 my-3">
                          <div className="font-sora font-bold text-d2c-navy text-xs md:text-sm flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-d2c-royal" />
                            <span>{block.question}</span>
                          </div>
                          <p className="text-xs text-gray-600 pl-6 leading-relaxed">
                            {block.answer}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}

                  {/* Google Search Result Preview */}
                  <div className="pt-6 border-t border-gray-150">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-d2c-royal" /> Google SERP Snippet Preview
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1 font-sans">
                      <div className="text-xs text-gray-600 truncate">
                        https://direct2campus.com › <span className="text-gray-900">{pageData.slug || 'page-slug'}</span>
                      </div>
                      <div className="text-base text-[#1a0dab] font-medium hover:underline cursor-pointer truncate">
                        {pageData.seoTitle || pageData.h1 || pageData.title || 'Page Title'}
                      </div>
                      <div className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                        {pageData.metaDescription || pageData.description || 'Page meta description snippet preview.'}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>

      {/* Floating Save Bar */}
      <AdminFormSaveBar
        saving={saving}
        onSave={handleSave}
        previewUrl={pageData.slug ? `/${pageData.slug}` : undefined}
        successMessage={savedSuccess ? 'Page published successfully!' : undefined}
        errorMessage={errorMessage}
      />
    </div>
  );
}

