'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  Image as ImageIcon, 
  Tag, 
  Globe, 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  ExternalLink,
  BookOpen,
  Send,
  AlertCircle,
  HelpCircle,
  Layers,
  PhoneCall
} from 'lucide-react';
import Link from 'next/link';
import { ImageUploader } from './ImageUploader';
import { SlugInput } from './SlugInput';
import { SectionCard } from './SectionCard';
import { AdminFormSaveBar } from './AdminFormSaveBar';
import { JsonArrayEditor } from './JsonArrayEditor';

interface BlogEditFormProps {
  initialData?: any;
  isNew?: boolean;
}

const CATEGORIES = [
  'Admission Guide',
  'Entrance Exams',
  'College Reviews',
  'Engineering',
  'Medical',
  'Management',
  'Career Advice',
  'Campus News'
];

export function BlogEditForm({ initialData = {}, isNew = false }: BlogEditFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<any>({
    id: initialData.id || '',
    title: initialData.title || '',
    slug: initialData.slug || '',
    category: initialData.category || 'Admission Guide',
    excerpt: initialData.excerpt || '',
    content: initialData.content || '',
    author: initialData.author || 'Direct2Campus Editorial Team',
    date: initialData.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: initialData.readTime || initialData.read_time || '5 min read',
    imageUrl: initialData.imageUrl || initialData.image_url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    tags: initialData.tags || ['Admission Guidance', 'Direct Admission', 'Direct2Campus'],
    published: initialData.published ?? true,
    seoTitle: initialData.seoTitle || initialData.seo_title || '',
    metaDescription: initialData.metaDescription || initialData.meta_description || ''
  });

  const [viewMode, setViewMode] = useState<'edit' | 'split' | 'preview'>('edit');
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState<{ id: string; slug: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.title?.trim()) {
      setErrorMessage('Please enter an Article Title');
      return;
    }
    if (!formData.slug?.trim()) {
      setErrorMessage('Please enter a URL Slug');
      return;
    }

    setSaving(true);
    setSavedSuccess(null);
    setErrorMessage('');

    try {
      const url = isNew && !formData.id ? '/api/admin/blogs' : `/api/admin/blogs/${formData.id || formData.slug}`;
      const method = isNew && !formData.id ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json.error || 'Failed to save blog post');
      }

      const savedBlog = json.blog || formData;
      setFormData((prev: any) => ({
        ...prev,
        id: savedBlog.id || prev.id,
        slug: savedBlog.slug || prev.slug
      }));

      setSavedSuccess({
        id: String(savedBlog.id || formData.id || formData.slug),
        slug: String(savedBlog.slug || formData.slug)
      });

      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  // Markdown-like parser for the preview pane
  const renderPreviewContent = (text: string) => {
    if (!text) {
      return (
        <p className="text-gray-400 italic text-sm py-4">
          No content written yet. Start typing in the Article Body to see the live formatted preview.
        </p>
      );
    }

    const blocks = text.split('\n\n');
    return blocks.map((block, i) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // H1 Header
      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={i} className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy mt-6 mb-3">
            {trimmed.replace(/^#\s+/, '')}
          </h1>
        );
      }

      // H2 Header
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={i} className="text-xl md:text-2xl font-sora font-bold text-d2c-navy mt-6 mb-3 border-b border-gray-100 pb-2">
            {trimmed.replace(/^##\s+/, '')}
          </h2>
        );
      }

      // H3 Header
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={i} className="text-lg md:text-xl font-sora font-bold text-d2c-navy mt-5 mb-2 text-d2c-royal">
            {trimmed.replace(/^###\s+/, '')}
          </h3>
        );
      }

      // Blockquote
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={i} className="p-4 my-4 border-l-4 border-d2c-royal bg-blue-50/50 rounded-r-xl text-gray-700 italic text-sm">
            {trimmed.replace(/^>\s+/, '')}
          </blockquote>
        );
      }

      // Bullet List
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const items = trimmed.split('\n');
        return (
          <ul key={i} className="space-y-2 my-4 list-disc pl-5 text-gray-700 text-sm md:text-base">
            {items.map((item, idx) => (
              <li key={idx}>
                {item.replace(/^(\*|-)\s+/, '')}
              </li>
            ))}
          </ul>
        );
      }

      // Numbered List
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n');
        return (
          <ol key={i} className="space-y-2 my-4 list-decimal pl-5 text-gray-700 text-sm md:text-base">
            {items.map((item, idx) => (
              <li key={idx}>
                {item.replace(/^\d+\.\s+/, '')}
              </li>
            ))}
          </ol>
        );
      }

      // Standard Paragraph
      return (
        <p key={i} className="text-gray-700 text-sm md:text-base leading-relaxed my-3">
          {trimmed.split(/(\*\*.*?\*\*)/).map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-bold text-d2c-navy">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 font-dm-sans">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-d2c-navy hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-d2c-royal border border-blue-100">
                {isNew ? 'New Article' : 'Article Editor'}
              </span>
              {formData.published ? (
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
              {formData.title || (isNew ? 'Write New Blog Article' : 'Untitled Article')}
            </h1>
          </div>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-2 bg-gray-100/80 p-1 rounded-2xl border border-gray-200/80">
          <button
            type="button"
            onClick={() => setViewMode('edit')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'edit'
                ? 'bg-white text-d2c-navy shadow-sm'
                : 'text-gray-600 hover:text-d2c-navy'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Edit Form</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`hidden lg:flex px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all items-center gap-1.5 ${
              viewMode === 'split'
                ? 'bg-white text-d2c-navy shadow-sm'
                : 'text-gray-600 hover:text-d2c-navy'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'preview'
                ? 'bg-d2c-royal text-white shadow-sm'
                : 'text-gray-600 hover:text-d2c-navy'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {savedSuccess && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">Article saved and published successfully!</p>
              <p className="text-xs text-emerald-700">Public URL: /blog/{savedSuccess.slug}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/blog/${savedSuccess.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Post</span>
            </Link>
            <Link
              href="/admin/blogs"
              className="px-3.5 py-1.5 bg-white border border-emerald-200 hover:bg-emerald-100/50 text-emerald-800 rounded-xl text-xs font-bold transition-colors"
            >
              All Articles
            </Link>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Grid: Depending on ViewMode */}
      <div className={`grid gap-8 ${
        viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
      }`}>
        {/* EDIT PANE */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className="space-y-8">
            {/* Section 1: Basic Metadata */}
            <SectionCard 
              title="Article Details & Metadata" 
              icon={FileText} 
              description="Headline, category classification, author attribution, and publication details"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-d2c-navy mb-1.5">
                    Article Title (H1 Tag) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="e.g. Complete Guide to Direct Admission & Management Quota 2027"
                    className="w-full px-4 py-3 text-base rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-1 focus:ring-d2c-royal outline-none font-medium"
                  />
                </div>

                <SlugInput
                  label="URL Slug"
                  value={formData.slug}
                  sourceText={formData.title}
                  prefix="blog"
                  onChange={(slug) => updateField('slug', slug)}
                />

                <div>
                  <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal bg-white outline-none"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Author</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => updateField('author', e.target.value)}
                      placeholder="e.g. Direct2Campus Editorial Team"
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Date</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.date}
                        onChange={(e) => updateField('date', e.target.value)}
                        placeholder="e.g. Oct 27, 2026"
                        className="w-full pl-9 pr-3 py-3 text-xs md:text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Read Time</label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.readTime}
                        onChange={(e) => updateField('readTime', e.target.value)}
                        placeholder="e.g. 5 min read"
                        className="w-full pl-9 pr-3 py-3 text-xs md:text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <div className="text-sm font-bold text-d2c-navy">Publication Status</div>
                    <div className="text-xs text-gray-500">Live on /blog immediately after saving</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => updateField('published', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>
            </SectionCard>

            {/* Section 2: Cover Image */}
            <SectionCard 
              title="Featured Cover Image" 
              icon={ImageIcon} 
              description="High-resolution banner displayed at the top of the article and in blog directory cards"
            >
              <ImageUploader
                label="Article Cover Image URL"
                value={formData.imageUrl}
                onChange={(url) => updateField('imageUrl', url)}
                folder="blogs"
              />
            </SectionCard>

            {/* Section 3: Excerpt & Full Content */}
            <SectionCard 
              title="Article Excerpt & Body Content" 
              icon={FileText} 
              description="Compose clear, authoritative paragraphs using Markdown headings (###), bullet points (*), and formatting"
            >
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-semibold text-d2c-navy">
                      Short Excerpt / Lead Summary <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-gray-400 font-mono">
                      {(formData.excerpt || '').length} characters
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => updateField('excerpt', e.target.value)}
                    placeholder="2-3 sentence overview highlighting key insights..."
                    className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-semibold text-d2c-navy">
                      Full Article Body (Markdown / Text) <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setViewMode('preview')}
                        className="text-xs text-d2c-royal hover:underline font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Toggle Preview
                      </button>
                      <span className="text-[11px] text-gray-400 font-mono">
                        {(formData.content || '').length} characters
                      </span>
                    </div>
                  </div>
                  <div className="mb-2 p-2.5 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-800 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Supports <code>### Section Title</code> (H3), <code>## Main Section</code> (H2), <code>* Bullet Item</code>, and <code>**Bold Text**</code>.</span>
                  </div>
                  <textarea
                    rows={16}
                    value={formData.content}
                    onChange={(e) => updateField('content', e.target.value)}
                    placeholder="Write or paste your article content here..."
                    className="w-full text-sm font-mono px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none leading-relaxed"
                  />
                </div>

                <JsonArrayEditor
                  label="Article Tags & Keywords"
                  value={formData.tags}
                  asPills={true}
                  onChange={(tags) => updateField('tags', tags)}
                  placeholder="e.g. Management Quota, B.Tech, WBJEE"
                />
              </div>
            </SectionCard>

            {/* Section 4: SEO Metadata */}
            <SectionCard 
              title="Search Engine Optimization (SEO)" 
              icon={Globe} 
              description="Custom title tags and meta descriptions for Google SERP visibility"
            >
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-semibold text-d2c-navy">SEO Title Tag</label>
                    <span className="text-[11px] text-gray-400">{(formData.seoTitle || formData.title || '').length} / 60 chars</span>
                  </div>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => updateField('seoTitle', e.target.value)}
                    placeholder={formData.title || 'Custom search engine title...'}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-semibold text-d2c-navy">Meta Description</label>
                    <span className="text-[11px] text-gray-400">{(formData.metaDescription || formData.excerpt || '').length} / 160 chars</span>
                  </div>
                  <textarea
                    rows={2}
                    value={formData.metaDescription}
                    onChange={(e) => updateField('metaDescription', e.target.value)}
                    placeholder={formData.excerpt || 'Brief description for search snippet (140-160 characters)...'}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                  />
                </div>
              </div>
            </SectionCard>
          </div>
        )}

        {/* LIVE PREVIEW PANE */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className="space-y-6">
            {/* Device Switcher Bar */}
            <div className="bg-[#0B1120] text-white p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg border border-white/10 sticky top-20 z-20">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
                <Eye className="w-4 h-4 text-d2c-sky" />
                <span>Live Article Preview</span>
              </div>

              <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setDevicePreview('desktop')}
                  className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                    devicePreview === 'desktop' ? 'bg-d2c-royal text-white font-bold' : 'text-white/60 hover:text-white'
                  }`}
                  title="Desktop View"
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
                  title="Tablet View"
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
                  title="Mobile View"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </div>
            </div>

            {/* Preview Frame Container */}
            <div className="flex justify-center bg-gray-100/60 p-4 rounded-3xl border border-gray-200 min-h-[600px] overflow-hidden">
              <div className={`transition-all duration-300 w-full ${
                devicePreview === 'desktop'
                  ? 'max-w-4xl'
                  : devicePreview === 'tablet'
                  ? 'max-w-[768px] shadow-2xl rounded-3xl border-4 border-gray-800 bg-white overflow-hidden'
                  : 'max-w-[375px] shadow-2xl rounded-[40px] border-8 border-gray-800 bg-white overflow-hidden'
              }`}>
                {/* Article Header (Navy Background) */}
                <div className="bg-d2c-navy text-white p-6 md:p-8 relative overflow-hidden">
                  <div className="inline-block px-3 py-1 bg-d2c-sky/20 border border-d2c-sky/30 rounded-md text-d2c-sky text-[11px] font-bold uppercase tracking-wider mb-3">
                    {formData.category || 'Admission Guide'}
                  </div>

                  <h1 className="text-xl md:text-3xl font-sora font-bold text-white mb-4 leading-snug">
                    {formData.title || 'Your Article Title Appears Here'}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-d2c-ice/80 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-d2c-royal flex items-center justify-center font-bold text-white text-[10px]">
                        <User className="w-3 h-3" />
                      </div>
                      <span className="font-semibold text-white">{formData.author || 'Direct2Campus Editorial Team'}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-d2c-sky" />
                      <span>{formData.date}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-d2c-gold" />
                      <span>{formData.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Article Body Content */}
                <div className="bg-white p-6 md:p-8 space-y-6">
                  {/* Featured Cover Image */}
                  {formData.imageUrl && (
                    <div className="rounded-2xl overflow-hidden shadow-md border border-gray-150">
                      <img
                        src={formData.imageUrl}
                        alt={formData.title || 'Blog cover'}
                        className="w-full max-h-[360px] object-cover"
                        onError={(e: any) => {
                          e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                    </div>
                  )}

                  {/* Excerpt callout */}
                  {formData.excerpt && (
                    <div className="p-4 bg-blue-50/70 border-l-4 border-d2c-royal rounded-r-xl text-gray-800 text-sm md:text-base font-medium leading-relaxed">
                      {formData.excerpt}
                    </div>
                  )}

                  {/* Parsed Body */}
                  <div className="prose prose-slate max-w-none">
                    {renderPreviewContent(formData.content)}
                  </div>

                  {/* Admission Counseling Callout */}
                  <div className="p-6 bg-gradient-to-r from-d2c-navy to-d2c-royal rounded-2xl text-white space-y-3 shadow-md">
                    <div className="flex items-center gap-2 text-d2c-gold font-bold text-xs uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" /> Direct Admission Support
                    </div>
                    <h4 className="text-lg font-bold font-sora">
                      Need Personalized Admission Counseling?
                    </h4>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Connect with verified academic advisors for direct admissions, cutoff analysis, and scholarship options.
                    </p>
                    <div className="pt-1 flex items-center gap-3">
                      <button
                        type="button"
                        className="px-4 py-2 bg-white text-d2c-navy rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-d2c-royal" />
                        <span>Book Free Counseling</span>
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  {Array.isArray(formData.tags) && formData.tags.length > 0 && (
                    <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-gray-400 mr-1" />
                      {formData.tags.map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Google SERP Snippet Preview */}
                  <div className="pt-6 border-t border-gray-150">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-d2c-royal" /> Google Search Result Snippet
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1 font-sans">
                      <div className="text-xs text-gray-600 truncate">
                        https://direct2campus.com › blog › <span className="text-gray-900">{formData.slug || 'article-slug'}</span>
                      </div>
                      <div className="text-base text-[#1a0dab] font-medium hover:underline cursor-pointer truncate">
                        {formData.seoTitle || formData.title || 'Article Title'}
                      </div>
                      <div className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                        {formData.metaDescription || formData.excerpt || 'Article summary description snippet appears here on search engine result pages.'}
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
        previewUrl={formData.slug ? `/blog/${formData.slug}` : undefined}
        successMessage={savedSuccess ? 'Saved successfully!' : undefined}
        errorMessage={errorMessage}
      />
    </div>
  );
}
