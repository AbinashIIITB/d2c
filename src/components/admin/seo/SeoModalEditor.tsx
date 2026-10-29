'use client';

import React, { useState } from 'react';
import { 
  X, 
  Save, 
  ExternalLink, 
  Search, 
  Sparkles, 
  Monitor, 
  Smartphone, 
  Share2, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { CollegeSeoForm, CollegeSeoFormData } from './CollegeSeoForm';
import { ExamSeoForm, ExamSeoFormData } from './ExamSeoForm';
import { BlogSeoForm, BlogSeoFormData } from './BlogSeoForm';
import { CorePageSeoForm, CorePageSeoFormData } from './CorePageSeoForm';

export interface SeoModalItem {
  id: string;
  name: string;
  slug: string;
  type: 'college' | 'exam' | 'blog' | 'page';
  publicUrl: string;
  rawItem: any;
  seoData: any;
}

interface SeoModalEditorProps {
  item: SeoModalItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess: (updatedItem: any) => void;
}

export function SeoModalEditor({
  item,
  isOpen,
  onClose,
  onSaveSuccess,
}: SeoModalEditorProps) {
  if (!isOpen || !item) return null;

  return (
    <SeoModalEditorContent
      item={item}
      onClose={onClose}
      onSaveSuccess={onSaveSuccess}
    />
  );
}

function SeoModalEditorContent({
  item,
  onClose,
  onSaveSuccess,
}: {
  item: SeoModalItem;
  onClose: () => void;
  onSaveSuccess: (updated: any) => void;
}) {
  const [formData, setFormData] = useState<any>(() => {
    if (item.type === 'college') {
      const seo = item.seoData || {};
      return {
        seoTitle: seo.seoTitle || '',
        metaDescription: seo.metaDescription || '',
        primaryKeyword: seo.primaryKeyword || '',
        secondaryKeywords: seo.secondaryKeywords || [],
        canonicalUrl: seo.canonicalUrl || '',
        h1Title: seo.h1Title || '',
        sectionHeadings: item.rawItem?.sectionHeadings || seo.sectionHeadings || {},
        aeoFaqs: seo.aeoFaqs || [],
        internalLinks: seo.internalLinks || [],
        cta: seo.cta || {},
        ogImage: seo.images?.ogImage || item.rawItem?.imageUrl || '',
        ogTitle: seo.ogTitle || '',
        ogDescription: seo.ogDescription || '',
      };
    } else if (item.type === 'exam') {
      const seo = item.seoData || {};
      return {
        seoTitle: seo.seoTitle || '',
        metaDescription: seo.metaDescription || '',
        primaryKeyword: seo.primaryKeyword || '',
        secondaryKeywords: seo.secondaryKeywords || [],
        canonicalUrl: seo.canonicalUrl || '',
        introduction: item.rawItem?.introduction || '',
        aboutExam: item.rawItem?.aboutExam || item.rawItem?.about_exam || '',
        faqs: item.rawItem?.faqs || [],
        cta: seo.cta || {},
        ogTitle: seo.ogTitle || '',
        ogDescription: seo.ogDescription || '',
        ogImage: item.rawItem?.logoUrl || '',
      };
    } else if (item.type === 'blog') {
      return {
        seoTitle: item.rawItem?.seoTitle || '',
        metaDescription: item.rawItem?.metaDescription || '',
        title: item.rawItem?.title || '',
        excerpt: item.rawItem?.excerpt || '',
        category: item.rawItem?.category || 'Admission Guide',
        author: item.rawItem?.author || 'Direct2Campus Editorial Team',
        readTime: item.rawItem?.readTime || '5 min read',
        tags: item.rawItem?.tags || [],
        canonicalUrl: item.rawItem?.canonicalUrl || '',
        imageUrl: item.rawItem?.imageUrl || '',
        published: item.rawItem?.published ?? true,
        ogTitle: item.rawItem?.ogTitle || '',
        ogDescription: item.rawItem?.ogDescription || '',
      };
    } else {
      // Core Page
      return {
        title: item.rawItem?.title || '',
        description: item.rawItem?.description || '',
        primaryKeyword: item.rawItem?.primaryKeyword || '',
        keywords: item.rawItem?.keywords || [],
        canonicalUrl: item.rawItem?.canonicalUrl || '',
        ogTitle: item.rawItem?.ogTitle || '',
        ogDescription: item.rawItem?.ogDescription || '',
        ogImage: item.rawItem?.ogImage || '',
      };
    }
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [previewTab, setPreviewTab] = useState<'google' | 'social'>('google');
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Compute live SEO Health score
  const calculateHealth = () => {
    let score = 0;
    const title = formData.seoTitle || formData.title || '';
    const desc = formData.metaDescription || formData.description || formData.excerpt || '';
    const kw = formData.primaryKeyword || (formData.tags && formData.tags[0]) || '';

    if (title.trim().length >= 40 && title.trim().length <= 70) score += 30;
    else if (title.trim().length > 0) score += 15;

    if (desc.trim().length >= 100 && desc.trim().length <= 170) score += 30;
    else if (desc.trim().length > 0) score += 15;

    if (kw.trim().length > 0) score += 20;

    if (item.type === 'college') {
      if (formData.aeoFaqs && formData.aeoFaqs.length > 0) score += 10;
      if (formData.h1Title && formData.h1Title.trim().length > 0) score += 10;
    } else if (item.type === 'exam') {
      if (formData.faqs && formData.faqs.length > 0) score += 10;
      if (formData.aboutExam && formData.aboutExam.trim().length > 50) score += 10;
    } else {
      if (formData.ogImage || formData.imageUrl) score += 20;
    }

    return Math.min(score, 100);
  };

  const healthScore = calculateHealth();

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      if (item.type === 'college') {
        const payload = {
          ...item.rawItem,
          seo: {
            ...(item.rawItem?.seo || {}),
            seoTitle: formData.seoTitle,
            metaDescription: formData.metaDescription,
            primaryKeyword: formData.primaryKeyword,
            secondaryKeywords: formData.secondaryKeywords,
            canonicalUrl: formData.canonicalUrl,
            h1Title: formData.h1Title,
            aeoFaqs: formData.aeoFaqs,
            internalLinks: formData.internalLinks,
            cta: formData.cta,
            ogTitle: formData.ogTitle,
            ogDescription: formData.ogDescription,
            images: {
              ...(item.rawItem?.seo?.images || {}),
              ogImage: formData.ogImage,
            },
          },
          sectionHeadings: formData.sectionHeadings,
        };

        const res = await fetch(`/api/admin/colleges/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to save college SEO');
        }

        const data = await res.json();
        setSuccess(true);
        onSaveSuccess(data.college || payload);
      } else if (item.type === 'exam') {
        const payload = {
          ...item.rawItem,
          introduction: formData.introduction,
          aboutExam: formData.aboutExam,
          faqs: formData.faqs,
          seo: {
            ...(item.rawItem?.seo || {}),
            seoTitle: formData.seoTitle,
            metaDescription: formData.metaDescription,
            primaryKeyword: formData.primaryKeyword,
            secondaryKeywords: formData.secondaryKeywords,
            canonicalUrl: formData.canonicalUrl,
            cta: formData.cta,
            ogTitle: formData.ogTitle,
            ogDescription: formData.ogDescription,
          },
        };

        const res = await fetch(`/api/admin/exams/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to save exam SEO');
        }

        const data = await res.json();
        setSuccess(true);
        onSaveSuccess(data.exam || payload);
      } else if (item.type === 'blog') {
        const payload = {
          ...item.rawItem,
          seoTitle: formData.seoTitle,
          metaDescription: formData.metaDescription,
          category: formData.category,
          author: formData.author,
          readTime: formData.readTime,
          tags: formData.tags,
          canonicalUrl: formData.canonicalUrl,
          imageUrl: formData.imageUrl,
          published: formData.published,
          ogTitle: formData.ogTitle,
          ogDescription: formData.ogDescription,
        };

        const res = await fetch(`/api/admin/blogs/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to save blog SEO');
        }

        const data = await res.json();
        setSuccess(true);
        onSaveSuccess(data.blog || payload);
      } else {
        // Core Page
        const payload = {
          ...item.rawItem,
          title: formData.title,
          description: formData.description,
          primaryKeyword: formData.primaryKeyword,
          keywords: formData.keywords,
          canonicalUrl: formData.canonicalUrl,
          ogTitle: formData.ogTitle,
          ogDescription: formData.ogDescription,
          ogImage: formData.ogImage,
        };

        const res = await fetch(`/api/admin/pages/${item.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to save page SEO');
        }

        const data = await res.json();
        setSuccess(true);
        onSaveSuccess(data.page || payload);
      }

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  const previewTitle = formData.seoTitle || formData.title || item.name;
  const previewDesc = formData.metaDescription || formData.description || formData.excerpt || 'Explore complete guide and direct admission details with Direct2Campus.';
  const previewUrl = formData.canonicalUrl || `https://direct2campus.com${item.publicUrl}`;
  const previewImage = formData.ogImage || formData.imageUrl || item.rawItem?.imageUrl || '/logo-footer.png';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="bg-[#faf8ff] w-full max-w-4xl h-full flex flex-col shadow-2xl overflow-hidden font-dm-sans">
        
        {/* Header Bar */}
        <div className="bg-white px-6 py-4 border-b border-gray-200/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              item.type === 'college'
                ? 'bg-blue-50 text-d2c-royal'
                : item.type === 'exam'
                ? 'bg-purple-50 text-purple-700'
                : item.type === 'blog'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-amber-50 text-amber-700'
            }`}>
              {item.type} SEO Form
            </span>

            <div>
              <h2 className="text-lg font-sora font-bold text-d2c-navy leading-tight flex items-center gap-2">
                {item.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono mt-0.5">
                <span>{item.publicUrl}</span>
                <a
                  href={item.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-d2c-royal flex items-center gap-0.5 text-d2c-sky"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Health Meter */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200/80 px-3 py-1.5 rounded-xl">
              <span className="text-[11px] font-semibold text-gray-500">SEO Health:</span>
              <span className={`text-xs font-bold ${
                healthScore >= 70 ? 'text-emerald-600' : healthScore >= 40 ? 'text-amber-600' : 'text-red-500'
              }`}>
                {healthScore}%
              </span>
              <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    healthScore >= 70 ? 'bg-emerald-500' : healthScore >= 40 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${healthScore}%` }}
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-d2c-royal hover:bg-d2c-navy text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-d2c-navy/10 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-d2c-navy hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications */}
        {success && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            SEO settings updated and published successfully!
          </div>
        )}
        {error && (
          <div className="bg-red-50 border-b border-red-200 px-6 py-2.5 flex items-center gap-2 text-xs font-semibold text-red-700">
            <AlertCircle className="w-4 h-4 text-red-600" />
            {error}
          </div>
        )}

        {/* Main Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* Live Preview Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-d2c-royal" />
                <span className="text-xs font-bold text-d2c-navy uppercase tracking-wider">Live SERP & Social Preview</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setPreviewTab('google')}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                      previewTab === 'google' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    Google SERP
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab('social')}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                      previewTab === 'social' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    Social Card
                  </button>
                </div>

                {previewTab === 'google' && (
                  <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-1 rounded-md ${previewDevice === 'desktop' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-400'}`}
                      title="Desktop Preview"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-1 rounded-md ${previewDevice === 'mobile' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-400'}`}
                      title="Mobile Preview"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {previewTab === 'google' ? (
              <div className={`p-4 rounded-xl border border-gray-200/80 bg-white font-sans ${
                previewDevice === 'mobile' ? 'max-w-sm' : 'max-w-2xl'
              }`}>
                <div className="flex items-center gap-2 text-xs text-[#202124] mb-1">
                  <div className="w-4 h-4 rounded-full bg-d2c-navy text-white text-[9px] flex items-center justify-center font-bold">
                    D
                  </div>
                  <div className="truncate">
                    <span className="font-semibold text-gray-800">direct2campus.com</span>
                    <span className="text-gray-400 text-[11px] ml-1.5 font-mono">› {item.slug}</span>
                  </div>
                </div>

                <h4 className="text-base md:text-lg text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug line-clamp-2">
                  {previewTitle}
                </h4>

                <p className="text-xs md:text-sm text-[#4d5156] leading-relaxed line-clamp-3 mt-1">
                  {previewDesc}
                </p>
              </div>
            ) : (
              <div className="max-w-md border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50 shadow-sm">
                <div className="h-44 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={previewImage}
                    alt="Social Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as any).src = '/logo-footer.png';
                    }}
                  />
                </div>
                <div className="p-3 bg-white border-t border-gray-100">
                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">direct2campus.com</div>
                  <div className="font-bold text-xs text-gray-900 truncate mt-0.5">{previewTitle}</div>
                  <div className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">{previewDesc}</div>
                </div>
              </div>
            )}
          </div>

          {/* Form Tailored by Type */}
          {item.type === 'college' && (
            <CollegeSeoForm
              data={formData}
              onChange={setFormData}
              collegeName={item.name}
              collegeSlug={item.slug}
            />
          )}

          {item.type === 'exam' && (
            <ExamSeoForm
              data={formData}
              onChange={setFormData}
              examName={item.name}
              examSlug={item.slug}
            />
          )}

          {item.type === 'blog' && (
            <BlogSeoForm
              data={formData}
              onChange={setFormData}
              blogSlug={item.slug}
            />
          )}

          {item.type === 'page' && (
            <CorePageSeoForm
              data={formData}
              onChange={setFormData}
              pageSlug={item.slug}
              pageName={item.name}
            />
          )}
        </div>

        {/* Footer Bar */}
        <div className="bg-white px-6 py-3.5 border-t border-gray-200/80 flex items-center justify-between shrink-0">
          <div className="text-xs text-gray-400">
            Changes are saved to database and live immediately on direct2campus.com
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-d2c-royal hover:bg-d2c-navy text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-d2c-navy/10 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save & Publish SEO'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
