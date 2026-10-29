'use client';

import React from 'react';
import { 
  Search, 
  Globe, 
  Share2, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import { JsonArrayEditor } from '../JsonArrayEditor';

export interface CorePageSeoFormData {
  title?: string;
  description?: string;
  primaryKeyword?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
}

interface CorePageSeoFormProps {
  data: CorePageSeoFormData;
  onChange: (updated: CorePageSeoFormData) => void;
  pageSlug: string;
  pageName: string;
}

export function CorePageSeoForm({
  data,
  onChange,
  pageSlug,
  pageName,
}: CorePageSeoFormProps) {
  const updateField = (field: keyof CorePageSeoFormData, val: any) => {
    onChange({
      ...data,
      [field]: val,
    });
  };

  const titleLength = (data.title || '').length;
  const descLength = (data.description || '').length;

  return (
    <div className="space-y-8 font-dm-sans">
      {/* 1. Meta Tags */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-d2c-royal flex items-center justify-center">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">Meta Tags & Search Identity</h3>
            <p className="text-xs text-gray-500">Configure global metadata for this core site page</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-d2c-navy uppercase tracking-wider">
              Page Title Tag (Title)
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
            value={data.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder={`e.g. ${pageName} – Direct2Campus`}
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
            value={data.description || ''}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Concise page meta description for search engines and social cards..."
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
              Primary Focus Keyword
            </label>
            <input
              type="text"
              value={data.primaryKeyword || ''}
              onChange={(e) => updateField('primaryKeyword', e.target.value)}
              placeholder="e.g. college admission consultancy India"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
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
              placeholder={`https://direct2campus.com${pageSlug === 'home' ? '' : `/${pageSlug}`}`}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none font-mono text-xs"
            />
          </div>
        </div>

        <div>
          <JsonArrayEditor
            label="Meta Keywords"
            value={data.keywords || []}
            onChange={(items) => updateField('keywords', items)}
            placeholder="e.g. direct admission, btech admission, mbbs admission"
          />
        </div>
      </div>

      {/* 2. OpenGraph & Social Cards */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">Social Sharing & OpenGraph</h3>
            <p className="text-xs text-gray-500">Metadata rendered when shared on social networks and chat platforms</p>
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
              placeholder="Leave blank to use main page title"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
              OG Share Image URL
            </label>
            <input
              type="text"
              value={data.ogImage || ''}
              onChange={(e) => updateField('ogImage', e.target.value)}
              placeholder="https://.../og-banner.png"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none font-mono text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
            OG Description Override
          </label>
          <input
            type="text"
            value={data.ogDescription || ''}
            onChange={(e) => updateField('ogDescription', e.target.value)}
            placeholder="Leave blank to use meta description"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
          />
        </div>
      </div>
    </div>
  );
}
