'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  Image as ImageIcon, 
  Calendar, 
  HelpCircle, 
  CheckCircle2, 
  Shield, 
  ArrowLeft,
  Plus,
  Trash2,
  Sparkles,
  Megaphone,
  Link2
} from 'lucide-react';
import Link from 'next/link';
import { ImageField } from './cms/ImageField';
import { SeoField } from './cms/SeoField';
import type { SeoFields } from '@/lib/cms/types';
import { examSeo, examDerivedSeo, seoOverrides } from '@/lib/record-seo';
import { JsonArrayEditor } from './JsonArrayEditor';
import { KeyValueEditor } from './KeyValueEditor';
import { RichTextArea } from './RichTextArea';
import { SlugInput } from './SlugInput';
import { SectionCard } from './SectionCard';
import { AdminFormSaveBar } from './AdminFormSaveBar';

interface ExamEditFormProps {
  initialData?: any;
  isNew?: boolean;
}

const TABS = [
  { id: 'basic', label: 'Basic Info', icon: FileText },
  { id: 'images', label: 'Logo & Branding', icon: ImageIcon },
  { id: 'pattern', label: 'Exam Pattern', icon: CheckCircle2 },
  { id: 'dates-process', label: 'Timeline & Process', icon: Calendar },
  { id: 'eligibility', label: 'Eligibility & Documents', icon: Shield },
  { id: 'faqs', label: 'FAQs & Counselling', icon: HelpCircle },
  { id: 'extras', label: 'Help Card & Guides', icon: Megaphone },
  { id: 'seo-suite', label: 'SEO', icon: Sparkles },
];

export function ExamEditForm({ initialData = {}, isNew = false }: ExamEditFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<any>({
    id: initialData.id || '',
    name: initialData.name || '',
    slug: initialData.slug || '',
    fullName: initialData.fullName || initialData.full_name || '',
    logoUrl: initialData.logoUrl || initialData.logo_url || '',
    description: initialData.description || '',
    date: initialData.date || '',
    applicationLink: initialData.applicationLink || initialData.application_link || '',
    introduction: initialData.introduction || '',
    overview: initialData.overview || '',
    aboutExam: initialData.aboutExam || initialData.about_exam || '',
    importantDates: initialData.importantDates || initialData.important_dates || [],
    applicationProcess: initialData.applicationProcess || initialData.application_process || [],
    documents: initialData.documents || [],
    eligibility: initialData.eligibility || [],
    examPattern: initialData.examPattern || initialData.exam_pattern || {
      mode: '',
      duration: '',
      totalMarks: '',
      markingScheme: '',
      subjects: []
    },
    counselling: initialData.counselling || '',
    faqs: initialData.faqs || [],
    seo: initialData.seo || {}
  });

  // SEO: what the site emits today (legacy fields) overlaid with the stored new-style fields.
  // `seoEdit` is what the editor shows; only fields that differ from the derived values are stored.
  const [derivedSeo] = useState<SeoFields>(() => (isNew ? {} : examDerivedSeo(initialData)));
  const [seoEdit, setSeoEdit] = useState<SeoFields>(() => (isNew ? {} : examSeo(initialData)));

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const updatePattern = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      examPattern: { ...prev.examPattern, [field]: value }
    }));
  };

  const updateSeoLegacy = (patch: Record<string, any>) => {
    setFormData((prev: any) => ({ ...prev, seo: { ...(prev.seo || {}), ...patch } }));
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) {
      setActiveTab('basic');
      setErrorMessage('Please enter an Exam Name');
      return;
    }
    if (!formData.slug?.trim()) {
      setActiveTab('basic');
      setErrorMessage('Please enter a URL Slug');
      return;
    }

    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const buildPayload = () => {
        const { meta: _oldMeta, ...legacySeo } = formData.seo || {};
        const overrides = seoOverrides(seoEdit, derivedSeo);
        const seo = Object.keys(overrides).length ? { ...legacySeo, meta: overrides } : legacySeo;
        return { ...formData, seo };
      };
      const url = isNew ? '/api/admin/exams' : `/api/admin/exams/${formData.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload()),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save exam');
      }

      setSuccessMessage(isNew ? 'Exam created successfully!' : 'All changes saved successfully!');

      if (isNew && data.id) {
        setTimeout(() => {
          router.push(`/admin/exams/${data.id}`);
        }, 800);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  const addFaq = () => {
    const list = formData.faqs || [];
    updateField('faqs', [...list, { question: '', answer: '' }]);
  };

  const updateFaq = (idx: number, key: 'question' | 'answer', val: string) => {
    const list = [...(formData.faqs || [])];
    list[idx] = { ...list[idx], [key]: val };
    updateField('faqs', list);
  };

  const removeFaq = (idx: number) => {
    const list = (formData.faqs || []).filter((_: any, i: number) => i !== idx);
    updateField('faqs', list);
  };

  return (
    <div className="max-w-6xl pb-20">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/exams"
            className="w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-d2c-navy hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">
              {isNew ? 'Create New Entrance Exam' : `Edit: ${formData.name || 'Exam'}`}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {isNew ? 'Configure exam pattern, dates and syllabus guide' : `Slug: /exams/${formData.slug}`}
            </p>
          </div>
        </div>

        {!isNew && formData.slug && (
          <Link
            href={`/exams/${formData.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-d2c-navy rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            Preview Public Page
          </Link>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-gray-200">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 ${
                active
                  ? 'bg-d2c-royal text-white shadow-md shadow-d2c-royal/20'
                  : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-d2c-sky'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Basic Info */}
      {activeTab === 'basic' && (
        <div className="space-y-6">
          <SectionCard title="Exam Identification" icon={FileText} description="Names, dates and external application link">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">
                  Exam Short Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. JEE Main"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-1 focus:ring-d2c-royal outline-none"
                />
              </div>

              <SlugInput
                label="URL Slug"
                value={formData.slug}
                sourceText={formData.name}
                prefix="exams"
                onChange={(slug) => updateField('slug', slug)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-d2c-navy mb-1.5">
                Full Official Examination Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                placeholder="e.g. Joint Entrance Examination (Main) 2027"
                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Important Date (Hero Card)</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => updateField('date', e.target.value)}
                  placeholder="e.g. January 24 – February 1, 2027"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Official Application Portal Link</label>
                <input
                  type="text"
                  value={formData.applicationLink}
                  onChange={(e) => updateField('applicationLink', e.target.value)}
                  placeholder="e.g. https://jeemain.nta.ac.in"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>
            </div>

            <RichTextArea
              label="Brief Introduction (Hero & Preview)"
              value={formData.introduction}
              rows={3}
              onChange={(val) => updateField('introduction', val)}
              placeholder="e.g. National level computer-based entrance examination conducted by NTA for admission to NITs, IIITs and GFTIs..."
            />

            <RichTextArea
              label="Detailed About The Exam"
              value={formData.aboutExam}
              rows={6}
              onChange={(val) => updateField('aboutExam', val)}
              placeholder="Full comprehensive details, eligibility summary, conducting authority, and quota details..."
            />
          </SectionCard>
        </div>
      )}

      {/* Tab 2: Logo & Media */}
      {activeTab === 'images' && (
        <div className="space-y-6">
          <SectionCard title="Exam Logo & Authority Crest" icon={ImageIcon} description="Square logo displayed in exam cards and hero banner">
      <div className="max-w-xl space-y-4">
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Exam Conducting Authority Logo</label>
                <ImageField value={formData.logoUrl} folder="exams/logos" label="Exam logo" onChange={(url) => updateField('logoUrl', url)} />
                <p className="text-xs text-gray-500 mt-1.5">Used prominently on the exam page and listing cards (1:1 square)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Logo alt text (exam page)</label>
                <input
                  type="text"
                  value={formData.seo?.images?.pageLogoAlt || ''}
                  onChange={(e) => updateSeoLegacy({ images: { ...(formData.seo?.images || {}), pageLogoAlt: e.target.value } })}
                  placeholder={formData.name || 'Describe the logo'}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to use the exam name.</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Logo alt text (social share image)</label>
                <input
                  type="text"
                  value={formData.seo?.images?.logoAlt || ''}
                  onChange={(e) => updateSeoLegacy({ images: { ...(formData.seo?.images || {}), logoAlt: e.target.value } })}
                  placeholder={`${formData.name || 'Exam'} Logo`}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {/* Tab 3: Exam Pattern */}
      {activeTab === 'pattern' && (
        <div className="space-y-6">
          <SectionCard title="Question Paper Pattern" icon={CheckCircle2} description="Structure, marks distribution, and testing format">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Examination Mode</label>
                <input
                  type="text"
                  value={formData.examPattern?.mode || ''}
                  onChange={(e) => updatePattern('mode', e.target.value)}
                  placeholder="e.g. Online (Computer Based Test - CBT)"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Duration</label>
                <input
                  type="text"
                  value={formData.examPattern?.duration || ''}
                  onChange={(e) => updatePattern('duration', e.target.value)}
                  placeholder="e.g. 3 Hours (180 Minutes)"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Total Marks</label>
                <input
                  type="text"
                  value={formData.examPattern?.totalMarks || ''}
                  onChange={(e) => updatePattern('totalMarks', e.target.value)}
                  placeholder="e.g. 300 Marks (75 Questions)"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Marking Scheme</label>
                <input
                  type="text"
                  value={formData.examPattern?.markingScheme || ''}
                  onChange={(e) => updatePattern('markingScheme', e.target.value)}
                  placeholder="e.g. +4 for correct answer, -1 negative mark"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-150">
              <JsonArrayEditor
                label="Subjects Covered"
                value={formData.examPattern?.subjects || []}
                asPills
                onChange={(subjects) => updatePattern('subjects', subjects)}
                placeholder="e.g. Physics, Chemistry, Mathematics"
                hint="Displayed as green checkmark subject badges on the exam pattern card"
              />
            </div>
          </SectionCard>
        </div>
      )}

      {/* Tab 4: Timeline & Dates */}
      {activeTab === 'dates-process' && (
        <div className="space-y-6">
          <SectionCard title="Application Timeline & Key Milestones" icon={Calendar} description="Exam calendar shown in the right sidebar timeline">
            <KeyValueEditor
              label="Application & Examination Schedule"
              items={formData.importantDates || []}
              keyName="event"
              valueName="date"
              keyHeader="Milestone / Event"
              valueHeader="Date / Window"
              keyPlaceholder="e.g. Admit Card Release"
              valuePlaceholder="e.g. 3 days before exam"
              onChange={(importantDates) => updateField('importantDates', importantDates)}
            />

            <div className="pt-6 border-t border-gray-150">
              <JsonArrayEditor
                label="Application Process Steps"
                value={formData.applicationProcess || []}
                onChange={(applicationProcess) => updateField('applicationProcess', applicationProcess)}
                placeholder="e.g. Step 1: Online Registration at official portal with personal details"
                hint="Numbered step-by-step instructions for filling the exam form"
              />
            </div>
          </SectionCard>
        </div>
      )}

      {/* Tab 5: Eligibility & Documents */}
      {activeTab === 'eligibility' && (
        <div className="space-y-6">
          <SectionCard title="Candidate Eligibility & Required Papers" icon={Shield} description="Academic criteria, age limits and paperwork">
            <JsonArrayEditor
              label="Eligibility Conditions"
              value={formData.eligibility || []}
              onChange={(eligibility) => updateField('eligibility', eligibility)}
              placeholder="e.g. Passed 10+2 examination with minimum 75% marks (or top 20 percentile)"
              hint="Rendered in the Eligibility Criteria grid"
            />

            <div className="pt-6 border-t border-gray-150">
              <JsonArrayEditor
                label="Documents Checklist for Application"
                value={formData.documents || []}
                asPills
                onChange={(documents) => updateField('documents', documents)}
                placeholder="e.g. Scanned Passport Photo, Class 10 Certificate, Category Certificate"
              />
            </div>
          </SectionCard>
        </div>
      )}

      {/* Tab 6: FAQs & Counselling */}
      {activeTab === 'faqs' && (
        <div className="space-y-6">
          <SectionCard title="Counselling & Quota Guidance" icon={HelpCircle} description="Counselling and quota guidance information">
            <RichTextArea
              label="Counselling & Seat Allocation Process"
              value={formData.counselling}
              rows={4}
              onChange={(val) => updateField('counselling', val)}
              placeholder="Details about JoSAA / CSAB counselling, state level quotas, and management quota counselling support..."
            />
          </SectionCard>

          <SectionCard title="Frequently Asked Questions (FAQs)" icon={HelpCircle} description="Q&A items for students preparing for this exam">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-gray-500">Provide direct answers to high-intent questions</span>
              <button
                type="button"
                onClick={addFaq}
                className="text-xs bg-d2c-royal/10 text-d2c-royal hover:bg-d2c-royal hover:text-white px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add FAQ
              </button>
            </div>

            {(formData.faqs || []).length === 0 ? (
              <div className="p-6 rounded-2xl border border-dashed border-gray-200 text-center text-xs text-gray-400 bg-gray-50/50">
                No FAQs added yet.
              </div>
            ) : (
              <div className="space-y-4">
                {formData.faqs.map((faq: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="w-6 h-6 rounded-full bg-d2c-royal/15 text-d2c-royal font-bold text-xs flex items-center justify-center shrink-0">
                        Q{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={faq.question || ''}
                        onChange={(e) => updateFaq(idx, 'question', e.target.value)}
                        placeholder="e.g. Can I appear in both session 1 and session 2?"
                        className="flex-1 text-xs font-bold px-3 py-2 rounded-lg border border-gray-200 bg-white outline-none focus:border-d2c-royal"
                      />
                      <button
                        type="button"
                        onClick={() => removeFaq(idx)}
                        className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={faq.answer || ''}
                      onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                      placeholder="Answer details..."
                      className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white outline-none focus:border-d2c-royal ml-9"
                    />
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      )}

      {/* Tab: Help card, extra FAQs, guides */}
      {activeTab === 'extras' && (
        <div className="space-y-6">
          <SectionCard title="Help Card (right sidebar)" icon={Megaphone} description="Leave a field empty to use the default text from Content > Exam detail pages">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Headline</label>
                <input
                  type="text"
                  value={formData.seo?.cta?.headline || ''}
                  onChange={(e) => updateSeoLegacy({ cta: { ...(formData.seo?.cta || {}), headline: e.target.value } })}
                  placeholder="Need Admission Help?"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Text</label>
                <textarea
                  rows={3}
                  value={formData.seo?.cta?.subtext || ''}
                  onChange={(e) => updateSeoLegacy({ cta: { ...(formData.seo?.cta || {}), subtext: e.target.value } })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Button label</label>
                <input
                  type="text"
                  value={formData.seo?.cta?.buttonText || ''}
                  onChange={(e) => updateSeoLegacy({ cta: { ...(formData.seo?.cta || {}), buttonText: e.target.value } })}
                  placeholder="Get Free Counseling"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Additional FAQs (shown after the FAQs, also added to search engine FAQ data)" icon={HelpCircle}>
            <div className="flex justify-end mb-3">
              <button
                type="button"
                onClick={() => updateSeoLegacy({ aeoFaqs: [...(formData.seo?.aeoFaqs || []), { question: '', answer: '' }] })}
                className="text-xs bg-d2c-royal/10 text-d2c-royal hover:bg-d2c-royal hover:text-white px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add FAQ
              </button>
            </div>
            {(formData.seo?.aeoFaqs || []).length === 0 ? (
              <div className="p-6 rounded-2xl border border-dashed border-gray-200 text-center text-xs text-gray-400 bg-gray-50/50">No additional FAQs.</div>
            ) : (
              <div className="space-y-3">
                {(formData.seo.aeoFaqs as any[]).map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={faq.question || ''}
                        onChange={(e) => {
                          const list = [...formData.seo.aeoFaqs];
                          list[idx] = { ...list[idx], question: e.target.value };
                          updateSeoLegacy({ aeoFaqs: list });
                        }}
                        placeholder="Question"
                        className="flex-1 text-xs font-bold px-3 py-2 rounded-lg border border-gray-200 bg-white outline-none focus:border-d2c-royal"
                      />
                      <button
                        type="button"
                        onClick={() => updateSeoLegacy({ aeoFaqs: formData.seo.aeoFaqs.filter((_: any, i: number) => i !== idx) })}
                        className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                        aria-label="Remove FAQ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={faq.answer || ''}
                      onChange={(e) => {
                        const list = [...formData.seo.aeoFaqs];
                        list[idx] = { ...list[idx], answer: e.target.value };
                        updateSeoLegacy({ aeoFaqs: list });
                      }}
                      placeholder="Answer"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white outline-none focus:border-d2c-royal"
                    />
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard title="Recommended guides (links)" icon={Link2} description="Shown as link cards below the FAQs">
            <div className="flex justify-end mb-3">
              <button
                type="button"
                onClick={() => updateSeoLegacy({ internalLinks: [...(formData.seo?.internalLinks || []), { targetUrl: '', anchorText: '', context: '' }] })}
                className="text-xs bg-d2c-royal/10 text-d2c-royal hover:bg-d2c-royal hover:text-white px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add link
              </button>
            </div>
            {(formData.seo?.internalLinks || []).length === 0 ? (
              <div className="p-6 rounded-2xl border border-dashed border-gray-200 text-center text-xs text-gray-400 bg-gray-50/50">No links.</div>
            ) : (
              <div className="space-y-3">
                {(formData.seo.internalLinks as any[]).map((link, idx) => {
                  const setLink = (patch: Record<string, string>) => {
                    const list = [...formData.seo.internalLinks];
                    list[idx] = { ...list[idx], ...patch };
                    updateSeoLegacy({ internalLinks: list });
                  };
                  return (
                    <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center">
                      <input type="text" value={link.anchorText || ''} onChange={(e) => setLink({ anchorText: e.target.value })} placeholder="Link text" className="text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white outline-none focus:border-d2c-royal" />
                      <input type="text" value={link.targetUrl || ''} onChange={(e) => setLink({ targetUrl: e.target.value })} placeholder="/colleges/..." className="text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white outline-none focus:border-d2c-royal font-mono" />
                      <input type="text" value={link.context || ''} onChange={(e) => setLink({ context: e.target.value })} placeholder="Short note (optional)" className="text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white outline-none focus:border-d2c-royal" />
                      <button
                        type="button"
                        onClick={() => updateSeoLegacy({ internalLinks: formData.seo.internalLinks.filter((_: any, i: number) => i !== idx) })}
                        className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                        aria-label="Remove link"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </SectionCard>
        </div>
      )}

      {/* Tab: SEO */}
      {activeTab === 'seo-suite' && (
        <SectionCard title="Search & social (SEO)" icon={Sparkles} description="Shows what the page emits today. Only fields you change are stored.">
          <SeoField value={seoEdit} onChange={setSeoEdit} />
        </SectionCard>
      )}

      {/* Save Bar */}
      <AdminFormSaveBar
        saving={saving}
        onSave={handleSave}
        previewUrl={formData.slug ? `/exams/${formData.slug}` : undefined}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
}
