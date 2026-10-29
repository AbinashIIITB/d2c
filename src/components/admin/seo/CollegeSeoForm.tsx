'use client';

import React from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Link as LinkIcon, 
  Heading, 
  Layers, 
  Plus, 
  Trash2, 
  Search, 
  Globe, 
  Share2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { JsonArrayEditor } from '../JsonArrayEditor';

export interface CollegeSeoFormData {
  seoTitle?: string;
  metaDescription?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  canonicalUrl?: string;
  h1Title?: string;
  sectionHeadings?: {
    admissions?: string;
    coursesFees?: string;
    coursesFeesSubtitle?: string;
    btechFeesEligibility?: string;
    placements?: string;
    overview?: string;
    faqs?: string;
  };
  aeoFaqs?: {
    question: string;
    answer: string;
    targetQuery?: string;
  }[];
  internalLinks?: {
    anchorText: string;
    targetUrl: string;
    context?: string;
  }[];
  cta?: {
    headline: string;
    subtext: string;
    buttonText: string;
  };
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

interface CollegeSeoFormProps {
  data: CollegeSeoFormData;
  onChange: (updated: CollegeSeoFormData) => void;
  collegeName: string;
  collegeSlug: string;
}

export function CollegeSeoForm({
  data,
  onChange,
  collegeName,
  collegeSlug,
}: CollegeSeoFormProps) {
  const updateField = (field: keyof CollegeSeoFormData, val: any) => {
    onChange({
      ...data,
      [field]: val,
    });
  };

  const updateHeading = (key: string, val: string) => {
    onChange({
      ...data,
      sectionHeadings: {
        ...(data.sectionHeadings || {}),
        [key]: val,
      },
    });
  };

  // FAQ Helpers
  const addFaq = () => {
    const list = data.aeoFaqs || [];
    updateField('aeoFaqs', [...list, { question: '', answer: '', targetQuery: '' }]);
  };

  const updateFaq = (idx: number, key: 'question' | 'answer' | 'targetQuery', val: string) => {
    const list = [...(data.aeoFaqs || [])];
    list[idx] = { ...list[idx], [key]: val };
    updateField('aeoFaqs', list);
  };

  const removeFaq = (idx: number) => {
    const list = (data.aeoFaqs || []).filter((_, i) => i !== idx);
    updateField('aeoFaqs', list);
  };

  // Internal Links Helpers
  const addLink = () => {
    const list = data.internalLinks || [];
    updateField('internalLinks', [...list, { anchorText: '', targetUrl: '', context: '' }]);
  };

  const updateLink = (idx: number, key: 'anchorText' | 'targetUrl' | 'context', val: string) => {
    const list = [...(data.internalLinks || [])];
    list[idx] = { ...list[idx], [key]: val };
    updateField('internalLinks', list);
  };

  const removeLink = (idx: number) => {
    const list = (data.internalLinks || []).filter((_, i) => i !== idx);
    updateField('internalLinks', list);
  };

  const titleLength = (data.seoTitle || '').length;
  const descLength = (data.metaDescription || '').length;

  return (
    <div className="space-y-8 font-dm-sans">
      {/* 1. Core Meta & Keywords */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-d2c-royal flex items-center justify-center">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">Meta Tags & Target Keywords</h3>
            <p className="text-xs text-gray-500">Essential search engine title, description, and keyword metadata</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-d2c-navy uppercase tracking-wider">
              SEO Title Tag (Title)
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
            placeholder={`e.g. ${collegeName}: Admission 2026-27, Fees, Courses & Placements | Direct2Campus`}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none transition-colors"
          />
          <p className="text-[11px] text-gray-400 mt-1">Recommended length: 50-60 characters for high click-through rate.</p>
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
            placeholder={`e.g. Explore ${collegeName} admission 2026, B.Tech courses, fees structure, eligibility criteria, placements and management quota counseling by Direct2Campus.`}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none transition-colors resize-none"
          />
          <p className="text-[11px] text-gray-400 mt-1">Displays below title in Google search results. Keep between 140–160 characters.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
              Primary Target Keyword
            </label>
            <input
              type="text"
              value={data.primaryKeyword || ''}
              onChange={(e) => updateField('primaryKeyword', e.target.value)}
              placeholder={`e.g. ${collegeName} admission`}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none transition-colors"
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
              placeholder={`https://direct2campus.com/colleges/${collegeSlug}`}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none transition-colors font-mono text-xs"
            />
          </div>
        </div>

        <div>
          <JsonArrayEditor
            label="Secondary Keywords / Semantic Search Tags"
            value={data.secondaryKeywords || []}
            onChange={(items) => updateField('secondaryKeywords', items)}
            placeholder={`e.g. ${collegeName} fees, ${collegeName} placement`}
          />
        </div>
      </div>

      {/* 2. Page Headings & H1 Hierarchy */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Heading className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">Headings & Content Hierarchy</h3>
            <p className="text-xs text-gray-500">Configure H1 main page heading and SEO section subheadings</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
            Main Page H1 Heading
          </label>
          <input
            type="text"
            value={data.h1Title || ''}
            onChange={(e) => updateField('h1Title', e.target.value)}
            placeholder={`e.g. ${collegeName} Admission, Courses, Fees and Placements`}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none font-semibold text-d2c-navy"
          />
          <p className="text-[11px] text-gray-400 mt-1">Rendered as the single primary &lt;h1&gt; tag on the landing page hero.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Admission Section (H2)
            </label>
            <input
              type="text"
              value={data.sectionHeadings?.admissions || ''}
              onChange={(e) => updateHeading('admissions', e.target.value)}
              placeholder={`${collegeName} Admission Process`}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Courses & Fees Section (H2)
            </label>
            <input
              type="text"
              value={data.sectionHeadings?.coursesFees || ''}
              onChange={(e) => updateHeading('coursesFees', e.target.value)}
              placeholder={`${collegeName} Courses and Fee Structure`}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              B.Tech Fees & Eligibility (H2)
            </label>
            <input
              type="text"
              value={data.sectionHeadings?.btechFeesEligibility || ''}
              onChange={(e) => updateHeading('btechFeesEligibility', e.target.value)}
              placeholder={`${collegeName} B.Tech Fees and Eligibility`}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Placements & Package Section (H2)
            </label>
            <input
              type="text"
              value={data.sectionHeadings?.placements || ''}
              onChange={(e) => updateHeading('placements', e.target.value)}
              placeholder={`${collegeName} Placements and Average Package`}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Campus & Location Section (H2)
            </label>
            <input
              type="text"
              value={data.sectionHeadings?.overview || ''}
              onChange={(e) => updateHeading('overview', e.target.value)}
              placeholder={`${collegeName} Campus and Location`}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Frequently Asked Questions (H2)
            </label>
            <input
              type="text"
              value={data.sectionHeadings?.faqs || ''}
              onChange={(e) => updateHeading('faqs', e.target.value)}
              placeholder={`Frequently Asked Questions About ${collegeName}`}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            />
          </div>
        </div>
      </div>

      {/* 3. AEO FAQs & Schema.org FAQPage */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-sora font-bold text-d2c-navy">AEO FAQ Engine (Schema.org / Voice Search)</h3>
              <p className="text-xs text-gray-500">Indexed for Google Answer Boxes and AI Overview engines (ChatGPT, Perplexity)</p>
            </div>
          </div>

          <button
            type="button"
            onClick={addFaq}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-d2c-royal hover:bg-d2c-navy text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add FAQ
          </button>
        </div>

        {(!data.aeoFaqs || data.aeoFaqs.length === 0) ? (
          <div className="text-center py-8 bg-gray-50/70 rounded-xl border border-dashed border-gray-200">
            <p className="text-xs text-gray-500 font-medium">No custom AEO FAQs added yet.</p>
            <button
              type="button"
              onClick={addFaq}
              className="mt-2 text-xs font-bold text-d2c-royal hover:underline"
            >
              + Add First High-Intent Question
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {data.aeoFaqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/40 space-y-3 relative group">
                <button
                  type="button"
                  onClick={() => removeFaq(idx)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1"
                  title="Remove FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Question #{idx + 1}
                  </label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFaq(idx, 'question', e.target.value)}
                    placeholder="e.g. What is the fee structure for B.Tech in CSE?"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-gray-200 focus:border-d2c-royal bg-white outline-none font-semibold text-d2c-navy"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Direct Verified Answer
                  </label>
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                    placeholder="Provide clear, concise answer matching search intent..."
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-gray-200 focus:border-d2c-royal bg-white outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 mb-0.5">
                    Target Voice / Natural Query (Optional)
                  </label>
                  <input
                    type="text"
                    value={faq.targetQuery || ''}
                    onChange={(e) => updateFaq(idx, 'targetQuery', e.target.value)}
                    placeholder="e.g. how much is IEM kolkata btech fees"
                    className="w-full px-3 py-1.5 text-[11px] rounded-lg border border-gray-200 bg-white font-mono text-gray-600 outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Social OpenGraph & Twitter */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">Social Sharing (OpenGraph & Twitter)</h3>
            <p className="text-xs text-gray-500">Previews when shared on WhatsApp, LinkedIn, Facebook, and Twitter</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
              OG Social Title Override
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
              OG Share Image URL
            </label>
            <input
              type="text"
              value={data.ogImage || ''}
              onChange={(e) => updateField('ogImage', e.target.value)}
              placeholder="https://.../og-image.jpg"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-xs font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
            OG Social Description Override
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

      {/* 5. Internal Links Matrix */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <LinkIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-sora font-bold text-d2c-navy">Internal Links Matrix</h3>
              <p className="text-xs text-gray-500">Strategic contextual links to pass PageRank to related colleges and exams</p>
            </div>
          </div>

          <button
            type="button"
            onClick={addLink}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-d2c-navy text-xs font-bold rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add Link
          </button>
        </div>

        {(!data.internalLinks || data.internalLinks.length === 0) ? (
          <p className="text-xs text-gray-400 italic">No contextual internal links configured.</p>
        ) : (
          <div className="space-y-3">
            {data.internalLinks.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50/50">
                <input
                  type="text"
                  value={item.anchorText}
                  onChange={(e) => updateLink(idx, 'anchorText', e.target.value)}
                  placeholder="Anchor Text (e.g. WBJEE 2027 Cutoffs)"
                  className="w-full sm:w-1/3 px-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white"
                />
                <input
                  type="text"
                  value={item.targetUrl}
                  onChange={(e) => updateLink(idx, 'targetUrl', e.target.value)}
                  placeholder="URL (/exams/wbjee-2027)"
                  className="w-full sm:w-1/3 px-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white font-mono"
                />
                <input
                  type="text"
                  value={item.context || ''}
                  onChange={(e) => updateLink(idx, 'context', e.target.value)}
                  placeholder="Context / Note"
                  className="w-full sm:flex-1 px-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white"
                />
                <button
                  type="button"
                  onClick={() => removeLink(idx)}
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Support & Conversion CTA Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">Page Support & Conversion Banner</h3>
            <p className="text-xs text-gray-500">CTA card rendered above the footer to convert organic searchers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">CTA Headline</label>
            <input
              type="text"
              value={data.cta?.headline || ''}
              onChange={(e) => updateField('cta', { ...(data.cta || {}), headline: e.target.value })}
              placeholder="Need Help with Admission?"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Button Text</label>
            <input
              type="text"
              value={data.cta?.buttonText || ''}
              onChange={(e) => updateField('cta', { ...(data.cta || {}), buttonText: e.target.value })}
              placeholder="Talk to Expert"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Subtext</label>
            <input
              type="text"
              value={data.cta?.subtext || ''}
              onChange={(e) => updateField('cta', { ...(data.cta || {}), subtext: e.target.value })}
              placeholder="Our counselors guide you end-to-end."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
