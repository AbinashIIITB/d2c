'use client';

import { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  Link as LinkIcon, 
  MousePointerClick, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Eye, 
  Globe, 
  Code2, 
  Copy, 
  Check, 
  Smartphone, 
  Monitor,
  Heading,
  CheckCircle2
} from 'lucide-react';
import { JsonArrayEditor } from './JsonArrayEditor';

export interface PageSeoData {
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  seoTitle?: string;
  metaDescription?: string;
  h1Title?: string;
  headingStructure?: {
    level: 'h2' | 'h3';
    text: string;
  }[];
  contentStructure?: {
    sectionTitle: string;
    topicsCovered: string[];
  }[];
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
  canonicalUrl?: string;
  cta?: {
    headline: string;
    subtext: string;
    buttonText: string;
    actionType: 'modal' | 'call' | 'whatsapp';
  };
  images?: {
    heroAlt?: string;
    logoAlt?: string;
    coverAlt?: string;
  };
}

interface SeoSuiteEditorProps {
  value: PageSeoData;
  onChange: (val: PageSeoData) => void;
  pageName: string;
  pageSlug: string;
  prefix?: string;
  defaultDescription?: string;
}

export function SeoSuiteEditor({
  value = {},
  onChange,
  pageName,
  pageSlug,
  prefix = 'colleges',
  defaultDescription = '',
}: SeoSuiteEditorProps) {
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [showSchemaPreview, setShowSchemaPreview] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const seo = value || {};

  const updateField = (field: keyof PageSeoData, val: any) => {
    onChange({
      ...seo,
      [field]: val
    });
  };

  const currentTitle = seo.seoTitle || `${pageName} – Direct Admission, Fees & Placement 2027`;
  const currentDesc = seo.metaDescription || (defaultDescription ? defaultDescription.slice(0, 155) + '…' : `Complete guide for ${pageName} admission, fee structure, placement packages, cutoffs, and direct quota.`);
  const currentUrl = seo.canonicalUrl || `https://direct2campus.com/${prefix}/${pageSlug || 'slug'}`;

  // Heading Structure Helpers
  const addHeading = () => {
    const list = seo.headingStructure || [];
    updateField('headingStructure', [...list, { level: 'h2', text: '' }]);
  };

  const updateHeading = (idx: number, key: 'level' | 'text', val: any) => {
    const list = [...(seo.headingStructure || [])];
    list[idx] = { ...list[idx], [key]: val };
    updateField('headingStructure', list);
  };

  const removeHeading = (idx: number) => {
    const list = (seo.headingStructure || []).filter((_, i) => i !== idx);
    updateField('headingStructure', list);
  };

  // Content Structure Helpers
  const addContentSection = () => {
    const list = seo.contentStructure || [];
    updateField('contentStructure', [...list, { sectionTitle: '', topicsCovered: [] }]);
  };

  const updateContentSection = (idx: number, key: 'sectionTitle' | 'topicsCovered', val: any) => {
    const list = [...(seo.contentStructure || [])];
    list[idx] = { ...list[idx], [key]: val };
    updateField('contentStructure', list);
  };

  const removeContentSection = (idx: number) => {
    const list = (seo.contentStructure || []).filter((_, i) => i !== idx);
    updateField('contentStructure', list);
  };

  // AEO / FAQ Helpers
  const addAeoFaq = () => {
    const list = seo.aeoFaqs || [];
    updateField('aeoFaqs', [...list, { question: '', answer: '', targetQuery: '' }]);
  };

  const updateAeoFaq = (idx: number, key: 'question' | 'answer' | 'targetQuery', val: string) => {
    const list = [...(seo.aeoFaqs || [])];
    list[idx] = { ...list[idx], [key]: val };
    updateField('aeoFaqs', list);
  };

  const removeAeoFaq = (idx: number) => {
    const list = (seo.aeoFaqs || []).filter((_, i) => i !== idx);
    updateField('aeoFaqs', list);
  };

  // Internal Links Helpers
  const addInternalLink = () => {
    const list = seo.internalLinks || [];
    updateField('internalLinks', [...list, { anchorText: '', targetUrl: '', context: '' }]);
  };

  const updateInternalLink = (idx: number, key: 'anchorText' | 'targetUrl' | 'context', val: string) => {
    const list = [...(seo.internalLinks || [])];
    list[idx] = { ...list[idx], [key]: val };
    updateField('internalLinks', list);
  };

  const removeInternalLink = (idx: number) => {
    const list = (seo.internalLinks || []).filter((_, i) => i !== idx);
    updateField('internalLinks', list);
  };

  // Generate FAQPage JSON-LD
  const generateFaqSchema = () => {
    const faqs = (seo.aeoFaqs || []).filter(f => f.question && f.answer);
    if (faqs.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    };
  };

  const schemaJson = JSON.stringify(generateFaqSchema(), null, 2);

  return (
    <div className="space-y-8 font-dm-sans">
      {/* 1. Live Google Search Result (SERP) Preview */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-d2c-royal" />
            <h3 className="text-base font-sora font-bold text-d2c-navy">Google SERP Live Preview</h3>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setPreviewDevice('desktop')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                previewDevice === 'desktop' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-500 hover:text-d2c-navy'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('mobile')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                previewDevice === 'mobile' ? 'bg-white text-d2c-navy shadow-sm' : 'text-gray-500 hover:text-d2c-navy'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </button>
          </div>
        </div>

        {/* Realistic Google Search Card */}
        <div className={`p-4 md:p-5 rounded-2xl border border-gray-200/80 bg-white shadow-sm space-y-1.5 font-sans ${
          previewDevice === 'mobile' ? 'max-w-sm' : 'max-w-2xl'
        }`}>
          <div className="flex items-center gap-2 text-xs text-[#202124]">
            <div className="w-4 h-4 rounded-full bg-d2c-navy text-white text-[9px] flex items-center justify-center font-bold">
              D
            </div>
            <div className="truncate">
              <span className="font-semibold text-gray-800">direct2campus.com</span>
              <span className="text-gray-400 text-[11px] ml-1.5 font-mono">
                › {prefix} › {pageSlug || 'slug'}
              </span>
            </div>
          </div>

          <h4 className="text-lg md:text-xl text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug line-clamp-2">
            {currentTitle}
          </h4>

          <p className="text-xs md:text-sm text-[#4d5156] leading-relaxed line-clamp-3">
            {currentDesc}
          </p>

          {seo.primaryKeyword && (
            <div className="pt-2 flex items-center gap-1.5 text-[11px] text-gray-500">
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Primary: {seo.primaryKeyword}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Target Keywords (Primary and Secondary) */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-d2c-gold" />
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">1. Primary & Secondary Keywords</h3>
            <p className="text-xs text-gray-400">Target search queries identified through keyword and competitor research</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
              Primary Focus Keyword <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={seo.primaryKeyword || ''}
              onChange={(e) => updateField('primaryKeyword', e.target.value)}
              placeholder="e.g. Direct Admission in IEM Kolkata 2027"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-1 focus:ring-d2c-royal outline-none font-medium"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              The exact high-intent search query this landing page is optimized to rank #1 for.
            </p>
          </div>

          <div>
            <JsonArrayEditor
              label="Secondary & Competitor Keywords"
              value={seo.secondaryKeywords || []}
              asPills
              placeholder="e.g. IEM Kolkata management quota fees, IEM cutoffs 2027, btech admission west bengal"
              onChange={(items) => updateField('secondaryKeywords', items)}
              hint="Related search phrases, long-tail variations, and competitor terms targeted in content."
            />
          </div>
        </div>
      </div>

      {/* 3 & 4. SEO Title & Meta Description */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-d2c-royal" />
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">2. SEO Title & Meta Description</h3>
            <p className="text-xs text-gray-400">Optimized search snippets designed to improve click-through-rates (CTR)</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-d2c-navy uppercase tracking-wider">
                SEO Title Tag
              </label>
              <span className={`text-[11px] font-mono font-bold ${
                (seo.seoTitle || '').length > 65 ? 'text-red-500' : (seo.seoTitle || '').length >= 45 ? 'text-emerald-600' : 'text-gray-400'
              }`}>
                {(seo.seoTitle || '').length} / 60 characters
              </span>
            </div>
            <input
              type="text"
              value={seo.seoTitle || ''}
              onChange={(e) => updateField('seoTitle', e.target.value)}
              placeholder={`${pageName} – Direct Admission, Fees & Placement 2027`}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Include primary keyword near the beginning. Recommended length: 50–60 characters.
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-d2c-navy uppercase tracking-wider">
                Meta Description
              </label>
              <span className={`text-[11px] font-mono font-bold ${
                (seo.metaDescription || '').length > 165 ? 'text-red-500' : (seo.metaDescription || '').length >= 130 ? 'text-emerald-600' : 'text-gray-400'
              }`}>
                {(seo.metaDescription || '').length} / 160 characters
              </span>
            </div>
            <textarea
              rows={3}
              value={seo.metaDescription || ''}
              onChange={(e) => updateField('metaDescription', e.target.value)}
              placeholder="Provide a compelling summary with primary keyword, eligibility, fee range, and clear call-to-action..."
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none leading-relaxed"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Recommended length: 140–160 characters. Shows as snippet text in Google results.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Heading Structure (H1, H2, H3) */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heading className="w-5 h-5 text-purple-600" />
            <div>
              <h3 className="text-base font-sora font-bold text-d2c-navy">3. Heading Hierarchy (H1, H2, H3 Structure)</h3>
              <p className="text-xs text-gray-400">Recommended semantic heading outline to guide crawlers and readers</p>
            </div>
          </div>
          <button
            type="button"
            onClick={addHeading}
            className="text-xs bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Subheading
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1">
              H1 Tag Override (Main Page Heading)
            </label>
            <input
              type="text"
              value={seo.h1Title || ''}
              onChange={(e) => updateField('h1Title', e.target.value)}
              placeholder={pageName}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-purple-600 outline-none font-semibold text-d2c-navy"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Single H1 tag for the page. Leave blank to default to the official college/exam name.
            </p>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Recommended Subheadings (H2 & H3 Outline)
            </label>
            {(seo.headingStructure || []).length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400 bg-gray-50/50">
                No custom subheadings configured. Click &quot;Add Subheading&quot; to outline H2/H3 hierarchy.
              </div>
            ) : (
              <div className="space-y-2">
                {(seo.headingStructure || []).map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-200">
                    <select
                      value={h.level}
                      onChange={(e) => updateHeading(idx, 'level', e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-bold text-d2c-navy"
                    >
                      <option value="h2">H2</option>
                      <option value="h3">H3</option>
                    </select>
                    <input
                      type="text"
                      value={h.text}
                      onChange={(e) => updateHeading(idx, 'text', e.target.value)}
                      placeholder={`e.g. ${h.level.toUpperCase()} Heading Text`}
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white outline-none focus:border-purple-600 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => removeHeading(idx)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6. Recommended Content Structure Blueprint */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-d2c-royal" />
            <div>
              <h3 className="text-base font-sora font-bold text-d2c-navy">4. Recommended Content Structure</h3>
              <p className="text-xs text-gray-400">Mandatory sections and topics that must be covered on this landing page</p>
            </div>
          </div>
          <button
            type="button"
            onClick={addContentSection}
            className="text-xs bg-d2c-royal/10 text-d2c-royal hover:bg-d2c-royal hover:text-white font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Content Section
          </button>
        </div>

        {(seo.contentStructure || []).length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400 bg-gray-50/50">
            No content sections specified. Click &quot;Add Content Section&quot; to define mandatory topics.
          </div>
        ) : (
          <div className="space-y-3">
            {(seo.contentStructure || []).map((sec, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={sec.sectionTitle}
                    onChange={(e) => updateContentSection(idx, 'sectionTitle', e.target.value)}
                    placeholder="Section Title (e.g. 2027 Placement Highlights & Salary Statistics)"
                    className="flex-1 px-3 py-1.5 text-xs font-bold rounded-lg border border-gray-200 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeContentSection(idx)}
                    className="text-gray-400 hover:text-red-500 p-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <JsonArrayEditor
                  label="Topics & Key Points to Cover"
                  value={sec.topicsCovered || []}
                  asPills
                  placeholder="e.g. Highest CTC, Average Package, Top Corporate Partners, Internship stipends"
                  onChange={(topics) => updateContentSection(idx, 'topicsCovered', topics)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 7. FAQ / AEO Questions (Answer Engine Optimization) */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="text-base font-sora font-bold text-d2c-navy">5. FAQ & AEO (Answer Engine Optimization)</h3>
              <p className="text-xs text-gray-400">Direct conversational answers formatted for Google AI Overviews & Perplexity</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSchemaPreview(!showSchemaPreview)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-d2c-navy font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
            >
              <Code2 className="w-3.5 h-3.5" /> {showSchemaPreview ? 'Hide JSON-LD' : 'View Schema'}
            </button>
            <button
              type="button"
              onClick={addAeoFaq}
              className="text-xs bg-amber-50 text-amber-800 hover:bg-amber-100 font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add AEO Q&A
            </button>
          </div>
        </div>

        {/* Schema.org FAQPage preview */}
        {showSchemaPreview && (
          <div className="p-4 rounded-xl bg-gray-900 text-gray-100 font-mono text-[11px] space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span>Automatic schema.org/FAQPage JSON-LD</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(schemaJson || '');
                  setCopiedSchema(true);
                  setTimeout(() => setCopiedSchema(false), 2000);
                }}
                className="hover:text-white flex items-center gap-1 text-xs"
              >
                {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSchema ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="overflow-x-auto max-h-48 text-emerald-300">
              {schemaJson || '// Add at least 1 FAQ below to generate schema markup'}
            </pre>
          </div>
        )}

        {(seo.aeoFaqs || []).length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400 bg-gray-50/50">
            No AEO questions added. Click &quot;Add AEO Q&A&quot; to optimize for AI answer engines.
          </div>
        ) : (
          <div className="space-y-4">
            {(seo.aeoFaqs || []).map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0">
                    Q{idx + 1}
                  </span>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateAeoFaq(idx, 'question', e.target.value)}
                    placeholder="Question (e.g. What is the management quota fee for B.Tech in IEM Kolkata?)"
                    className="flex-1 px-3 py-2 text-xs font-bold rounded-lg border border-gray-200 bg-white outline-none focus:border-amber-600"
                  />
                  <button
                    type="button"
                    onClick={() => removeAeoFaq(idx)}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => updateAeoFaq(idx, 'answer', e.target.value)}
                  placeholder="Direct, concise answer (40-60 words optimized for AI featured snippets)..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-white outline-none focus:border-amber-600 ml-9"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 8. Internal Linking Strategy */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-base font-sora font-bold text-d2c-navy">6. Internal Linking Recommendations</h3>
              <p className="text-xs text-gray-400">Anchor texts and target links to distribute PageRank across clusters</p>
            </div>
          </div>
          <button
            type="button"
            onClick={addInternalLink}
            className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Internal Link
          </button>
        </div>

        {(seo.internalLinks || []).length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400 bg-gray-50/50">
            No internal links configured yet.
          </div>
        ) : (
          <div className="space-y-2">
            {(seo.internalLinks || []).map((link, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200">
                <input
                  type="text"
                  value={link.anchorText}
                  onChange={(e) => updateInternalLink(idx, 'anchorText', e.target.value)}
                  placeholder="Anchor Text (e.g. WBJEE Cutoffs 2027)"
                  className="flex-1 w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-gray-200 bg-white"
                />
                <input
                  type="text"
                  value={link.targetUrl}
                  onChange={(e) => updateInternalLink(idx, 'targetUrl', e.target.value)}
                  placeholder="Target URL (e.g. /exams/wbjee-2027)"
                  className="w-full sm:w-56 px-3 py-1.5 text-xs font-mono rounded-lg border border-gray-200 bg-white"
                />
                <input
                  type="text"
                  value={link.context || ''}
                  onChange={(e) => updateInternalLink(idx, 'context', e.target.value)}
                  placeholder="Context / Placement note"
                  className="w-full sm:w-48 px-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white"
                />
                <button
                  type="button"
                  onClick={() => removeInternalLink(idx)}
                  className="text-gray-400 hover:text-red-500 p-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 9. URL Structure & Canonical Tag */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-600" />
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">7. URL Structure & Canonical URL</h3>
            <p className="text-xs text-gray-400">Avoid duplicate content and define the definitive indexing URL</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1">
              Live Permalink
            </label>
            <input
              type="text"
              disabled
              value={`https://direct2campus.com/${prefix}/${pageSlug || 'slug'}`}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-gray-50 font-mono text-gray-600"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1">
              Custom Canonical Tag Override (Optional)
            </label>
            <input
              type="text"
              value={seo.canonicalUrl || ''}
              onChange={(e) => updateField('canonicalUrl', e.target.value)}
              placeholder={`https://direct2campus.com/${prefix}/${pageSlug || 'slug'}`}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-emerald-600 outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* 10. Admission CTA Recommendations */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <MousePointerClick className="w-5 h-5 text-d2c-royal" />
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">8. Conversion & CTA Recommendation</h3>
            <p className="text-xs text-gray-400">Recommended admission enquiry and counselling calls-to-action</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                CTA Headline
              </label>
              <input
                type="text"
                value={seo.cta?.headline || ''}
                onChange={(e) => updateField('cta', { ...seo.cta, headline: e.target.value })}
                placeholder={`Need Admission Guidance for ${pageName}?`}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Subtext Value Proposition
              </label>
              <input
                type="text"
                value={seo.cta?.subtext || ''}
                onChange={(e) => updateField('cta', { ...seo.cta, subtext: e.target.value })}
                placeholder="Get 1-on-1 counselor guidance on fees, direct quota seats and eligibility."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={seo.cta?.buttonText || ''}
                onChange={(e) => updateField('cta', { ...seo.cta, buttonText: e.target.value })}
                placeholder="Talk to Expert"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Action Trigger
              </label>
              <select
                value={seo.cta?.actionType || 'call'}
                onChange={(e) => updateField('cta', { ...seo.cta, actionType: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-white font-medium"
              >
                <option value="call">Direct Phone Call</option>
                <option value="whatsapp">WhatsApp Counselor</option>
                <option value="modal">Enquiry Modal Form</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 11. Image & ALT-Text Recommendations */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-pink-600" />
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">9. Image & Descriptive ALT-Text Recommendations</h3>
            <p className="text-xs text-gray-400">Suggestions for relevant imagery and keyword-rich ALT descriptions for Google Images</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Hero / Featured Image ALT Text
            </label>
            <input
              type="text"
              value={seo.images?.heroAlt || ''}
              onChange={(e) => updateField('images', { ...seo.images, heroAlt: e.target.value })}
              placeholder={`${pageName} Campus Building & Entrance`}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-pink-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Logo / Crest ALT Text
            </label>
            <input
              type="text"
              value={seo.images?.logoAlt || ''}
              onChange={(e) => updateField('images', { ...seo.images, logoAlt: e.target.value })}
              placeholder={`${pageName} Official Emblem & Logo`}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-pink-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Cover Banner ALT Text
            </label>
            <input
              type="text"
              value={seo.images?.coverAlt || ''}
              onChange={(e) => updateField('images', { ...seo.images, coverAlt: e.target.value })}
              placeholder={`${pageName} Aerial Campus View`}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-pink-600 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
