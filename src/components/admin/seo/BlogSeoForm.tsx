'use client';

import React from 'react';
import { 
  Search, 
  User, 
  Clock, 
  Tag, 
  Image as ImageIcon, 
  Share2, 
  Eye, 
  EyeOff, 
  CheckCircle2 
} from 'lucide-react';
import { JsonArrayEditor } from '../JsonArrayEditor';

export interface BlogSeoFormData {
  seoTitle?: string;
  metaDescription?: string;
  title?: string;
  excerpt?: string;
  category?: string;
  author?: string;
  readTime?: string;
  tags?: string[];
  canonicalUrl?: string;
  imageUrl?: string;
  published?: boolean;
  ogTitle?: string;
  ogDescription?: string;
}

interface BlogSeoFormProps {
  data: BlogSeoFormData;
  onChange: (updated: BlogSeoFormData) => void;
  blogSlug: string;
}

export function BlogSeoForm({
  data,
  onChange,
  blogSlug,
}: BlogSeoFormProps) {
  const updateField = (field: keyof BlogSeoFormData, val: any) => {
    onChange({
      ...data,
      [field]: val,
    });
  };

  const titleLength = (data.seoTitle || data.title || '').length;
  const descLength = (data.metaDescription || data.excerpt || '').length;

  return (
    <div className="space-y-8 font-dm-sans">
      {/* 1. Meta Tags & SERP Identity */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-d2c-royal flex items-center justify-center">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">Meta Tags & Search Snippet</h3>
            <p className="text-xs text-gray-500">Configure title tag, meta description, and canonical URL for blog articles</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-d2c-navy uppercase tracking-wider">
              SEO Title Tag
            </label>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${
              titleLength >= 45 && titleLength <= 65
                ? 'bg-emerald-100 text-emerald-800'
                : titleLength === 0
                ? 'bg-gray-100 text-gray-500'
                : 'bg-amber-100 text-amber-800'
            }`}>
              {titleLength} / 60 chars {titleLength >= 45 && titleLength <= 65 ? '✓ Optimal' : ''}
            </span>
          </div>
          <input
            type="text"
            value={data.seoTitle || ''}
            onChange={(e) => updateField('seoTitle', e.target.value)}
            placeholder={data.title ? `${data.title} | Direct2Campus` : 'e.g. WBJEE Counselling Blueprint 2026 | Direct2Campus'}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none transition-colors"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-d2c-navy uppercase tracking-wider">
              Meta Description
            </label>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${
              descLength >= 120 && descLength <= 160
                ? 'bg-emerald-100 text-emerald-800'
                : descLength === 0
                ? 'bg-gray-100 text-gray-500'
                : 'bg-amber-100 text-amber-800'
            }`}>
              {descLength} / 160 chars {descLength >= 120 && descLength <= 160 ? '✓ Optimal' : ''}
            </span>
          </div>
          <textarea
            rows={3}
            value={data.metaDescription || ''}
            onChange={(e) => updateField('metaDescription', e.target.value)}
            placeholder={data.excerpt || 'Concise article meta description for Google search snippet...'}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
            Canonical URL Override
          </label>
          <input
            type="text"
            value={data.canonicalUrl || ''}
            onChange={(e) => updateField('canonicalUrl', e.target.value)}
            placeholder={`https://direct2campus.com/blog/${blogSlug}`}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none font-mono text-xs"
          />
        </div>
      </div>

      {/* 2. Indexing, Author & Taxonomy */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">Taxonomy, Author & Indexing</h3>
            <p className="text-xs text-gray-500">Google E-E-A-T authorship attribution and indexing controls</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
              Author
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={data.author || 'Direct2Campus Editorial Team'}
                onChange={(e) => updateField('author', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
              Category
            </label>
            <input
              type="text"
              value={data.category || 'Admission Guide'}
              onChange={(e) => updateField('category', e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
              Reading Time
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={data.readTime || '5 min read'}
                onChange={(e) => updateField('readTime', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <JsonArrayEditor
            label="Article Tags / Keywords"
            value={data.tags || []}
            onChange={(items) => updateField('tags', items)}
            placeholder="e.g. Admission Guidance, Management Quota, Direct Admission"
          />
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-d2c-navy">Search Indexing Status (Robots Directive)</div>
            <p className="text-[11px] text-gray-400">Controls whether Google and Bing are allowed to index this article</p>
          </div>
          <button
            type="button"
            onClick={() => updateField('published', !(data.published ?? true))}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              data.published !== false
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {data.published !== false ? (
              <>
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                <span>Index (Published)</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-amber-600" />
                <span>NoIndex (Draft / Hidden)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Social Media Sharing */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">Social Sharing & OpenGraph</h3>
            <p className="text-xs text-gray-500">Preview image and card metadata when shared on social media</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
              OG Title Override
            </label>
            <input
              type="text"
              value={data.ogTitle || ''}
              onChange={(e) => updateField('ogTitle', e.target.value)}
              placeholder="Leave blank to use main SEO title"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
              Social Image URL (Article Cover)
            </label>
            <input
              type="text"
              value={data.imageUrl || ''}
              onChange={(e) => updateField('imageUrl', e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none font-mono text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
