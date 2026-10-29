'use client';

import React from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Search, 
  Plus, 
  Trash2, 
  FileText, 
  Share2, 
  CheckCircle2 
} from 'lucide-react';
import { JsonArrayEditor } from '../JsonArrayEditor';

export interface ExamSeoFormData {
  seoTitle?: string;
  metaDescription?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  canonicalUrl?: string;
  introduction?: string;
  aboutExam?: string;
  faqs?: {
    question: string;
    answer: string;
  }[];
  cta?: {
    headline: string;
    subtext: string;
    buttonText: string;
  };
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

interface ExamSeoFormProps {
  data: ExamSeoFormData;
  onChange: (updated: ExamSeoFormData) => void;
  examName: string;
  examSlug: string;
}

export function ExamSeoForm({
  data,
  onChange,
  examName,
  examSlug,
}: ExamSeoFormProps) {
  const updateField = (field: keyof ExamSeoFormData, val: any) => {
    onChange({
      ...data,
      [field]: val,
    });
  };

  const addFaq = () => {
    const list = data.faqs || [];
    updateField('faqs', [...list, { question: '', answer: '' }]);
  };

  const updateFaq = (idx: number, key: 'question' | 'answer', val: string) => {
    const list = [...(data.faqs || [])];
    list[idx] = { ...list[idx], [key]: val };
    updateField('faqs', list);
  };

  const removeFaq = (idx: number) => {
    const list = (data.faqs || []).filter((_, i) => i !== idx);
    updateField('faqs', list);
  };

  const titleLength = (data.seoTitle || '').length;
  const descLength = (data.metaDescription || '').length;

  return (
    <div className="space-y-8 font-dm-sans">
      {/* 1. Meta & Target Keywords */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">Meta Tags & Search Intent</h3>
            <p className="text-xs text-gray-500">Configure title tag, meta description, and keywords for entrance exam rankings</p>
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
            placeholder={`e.g. ${examName}: Dates, Pattern, Syllabus & Counselling | Direct2Campus`}
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
            placeholder={`e.g. Complete guide to ${examName} 2027. Check application dates, exam pattern, eligibility rules, cutoff ranks, and direct counseling support from Direct2Campus.`}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
              Primary Target Keyword
            </label>
            <input
              type="text"
              value={data.primaryKeyword || ''}
              onChange={(e) => updateField('primaryKeyword', e.target.value)}
              placeholder={`e.g. ${examName} 2027`}
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
              placeholder={`https://direct2campus.com/exams/${examSlug}`}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none font-mono text-xs"
            />
          </div>
        </div>

        <div>
          <JsonArrayEditor
            label="Secondary Keywords / LSI Search Terms"
            value={data.secondaryKeywords || []}
            onChange={(items) => updateField('secondaryKeywords', items)}
            placeholder={`e.g. ${examName} cutoff, ${examName} registration date`}
          />
        </div>
      </div>

      {/* 2. Content & About Exam Optimizations */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-d2c-royal flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">Search Content Body</h3>
            <p className="text-xs text-gray-500">Key narrative paragraphs evaluated by Google semantic indexing</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
            Exam Introduction Summary
          </label>
          <textarea
            rows={3}
            value={data.introduction || ''}
            onChange={(e) => updateField('introduction', e.target.value)}
            placeholder="Introduction text for searchers looking for exam overview..."
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
            About the Exam (SEO In-Depth Paragraph)
          </label>
          <textarea
            rows={4}
            value={data.aboutExam || ''}
            onChange={(e) => updateField('aboutExam', e.target.value)}
            placeholder="Detailed background on conducting authority, exam history, mode, and counseling support..."
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none resize-none"
          />
        </div>
      </div>

      {/* 3. Exam FAQs Schema */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-sora font-bold text-d2c-navy">Frequently Asked Questions (Schema.org / FAQPage)</h3>
              <p className="text-xs text-gray-500">Creates rich Google FAQ search snippets and answer box eligibility</p>
            </div>
          </div>

          <button
            type="button"
            onClick={addFaq}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-d2c-royal hover:bg-d2c-navy text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add Question
          </button>
        </div>

        {(!data.faqs || data.faqs.length === 0) ? (
          <div className="text-center py-8 bg-gray-50/70 rounded-xl border border-dashed border-gray-200">
            <p className="text-xs text-gray-500 font-medium">No FAQs configured for this entrance exam.</p>
            <button
              type="button"
              onClick={addFaq}
              className="mt-2 text-xs font-bold text-d2c-royal hover:underline"
            >
              + Add First FAQ
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {data.faqs.map((faq, idx) => (
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
                    placeholder="e.g. Can outside state candidates apply?"
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-gray-200 focus:border-d2c-royal bg-white outline-none font-semibold text-d2c-navy"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Accepted Answer
                  </label>
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                    placeholder="Provide authoritative, concise answer..."
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-gray-200 focus:border-d2c-royal bg-white outline-none resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Social OpenGraph */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-sora font-bold text-d2c-navy">Social Sharing & Cards</h3>
            <p className="text-xs text-gray-500">Metadata for Twitter Cards, WhatsApp shares, and Facebook</p>
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
              OG Image URL
            </label>
            <input
              type="text"
              value={data.ogImage || ''}
              onChange={(e) => updateField('ogImage', e.target.value)}
              placeholder="https://.../og-exam.png"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-xs font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
