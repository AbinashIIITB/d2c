'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Image as ImageIcon, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  ClipboardList, 
  Award, 
  Globe,
  Plus,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { ImageUploader } from './ImageUploader';
import { JsonArrayEditor } from './JsonArrayEditor';
import { KeyValueEditor } from './KeyValueEditor';
import { RichTextArea } from './RichTextArea';
import { SlugInput } from './SlugInput';
import { SectionCard } from './SectionCard';
import { AdminFormSaveBar } from './AdminFormSaveBar';

interface CollegeEditFormProps {
  initialData?: any;
  isNew?: boolean;
}

const TABS = [
  { id: 'basic', label: 'Basic Info', icon: Building2 },
  { id: 'images', label: 'Images & Media', icon: ImageIcon },
  { id: 'overview', label: 'Overview & Highlights', icon: FileText },
  { id: 'courses-fees', label: 'Courses & Fees', icon: DollarSign },
  { id: 'placements', label: 'Placements', icon: TrendingUp },
  { id: 'admissions', label: 'Admissions & Dates', icon: ClipboardList },
  { id: 'more', label: 'Scholarships, Alumni & FAQs', icon: Award },
  { id: 'contact', label: 'Contact Details', icon: Globe },
];

export function CollegeEditForm({ initialData = {}, isNew = false }: CollegeEditFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<any>({
    id: initialData.id || '',
    name: initialData.name || '',
    slug: initialData.slug || '',
    location: initialData.location || '',
    state: initialData.state || '',
    type: initialData.type || 'Private',
    established: initialData.established || '',
    rating: initialData.rating ?? 4.5,
    reviews: initialData.reviews ?? 150,
    fees: initialData.fees || '',
    courses: initialData.courses || [],
    tags: initialData.tags || [],
    imageUrl: initialData.imageUrl || initialData.image_url || '',
    logoUrl: initialData.logoUrl || initialData.logo_url || '',
    coverUrl: initialData.coverUrl || initialData.cover_url || '',
    galleryImages: initialData.galleryImages || initialData.gallery_images || [],
    about: initialData.about || '',
    description: initialData.description || '',
    highlights: initialData.highlights || [],
    infrastructure: initialData.infrastructure || [],
    whyChoose: initialData.whyChoose || initialData.why_choose || [],
    whyChooseAkashTalks: initialData.whyChooseAkashTalks || initialData.why_choose_akash_talks || [],
    coursesDetails: initialData.coursesDetails || initialData.courses_details || [],
    feesDetails: initialData.feesDetails || initialData.fees_details || [],
    placements: initialData.placements || {
      stats: [
        { label: 'Highest Package', value: '₹44 LPA' },
        { label: 'Average Package', value: '₹8.5 LPA' },
        { label: 'Placement Rate', value: '92%' }
      ],
      highlights: [],
      topRecruiters: []
    },
    admissions: initialData.admissions || {
      eligibility: [],
      process: [],
      documents: []
    },
    keyDates: initialData.keyDates || initialData.key_dates || [],
    scholarships: initialData.scholarships || [],
    alumni: initialData.alumni || {
      description: '',
      companies: []
    },
    faqs: initialData.faqs || [],
    contact: initialData.contact || {
      phone: '',
      email: '',
      website: '',
      address: '',
      whatsapp: ''
    }
  });

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) {
      setActiveTab('basic');
      setErrorMessage('Please enter a College Name');
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
      const url = isNew ? '/api/admin/colleges' : `/api/admin/colleges/${formData.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save college');
      }

      setSuccessMessage(isNew ? 'College created successfully!' : 'All changes saved successfully!');

      if (isNew && data.id) {
        setTimeout(() => {
          router.push(`/admin/colleges/${data.id}`);
        }, 800);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  /* Helper methods for nested arrays */
  const addCourseDetail = () => {
    const list = formData.coursesDetails || [];
    updateField('coursesDetails', [...list, { name: '', duration: '4 Years', type: 'Full Time' }]);
  };

  const updateCourseDetail = (idx: number, key: string, val: string) => {
    const list = [...(formData.coursesDetails || [])];
    list[idx] = { ...list[idx], [key]: val };
    updateField('coursesDetails', list);
  };

  const removeCourseDetail = (idx: number) => {
    const list = (formData.coursesDetails || []).filter((_: any, i: number) => i !== idx);
    updateField('coursesDetails', list);
  };

  const addFeeCategory = () => {
    const list = formData.feesDetails || [];
    updateField('feesDetails', [
      ...list, 
      { title: 'Program Fees', items: [{ label: 'Tuition Fee (Per Year)', value: '₹1,50,000' }], note: '' }
    ]);
  };

  const updateFeeCategoryTitle = (idx: number, title: string) => {
    const list = [...(formData.feesDetails || [])];
    list[idx] = { ...list[idx], title };
    updateField('feesDetails', list);
  };

  const updateFeeCategoryNote = (idx: number, note: string) => {
    const list = [...(formData.feesDetails || [])];
    list[idx] = { ...list[idx], note };
    updateField('feesDetails', list);
  };

  const updateFeeCategoryItems = (idx: number, items: any[]) => {
    const list = [...(formData.feesDetails || [])];
    list[idx] = { ...list[idx], items };
    updateField('feesDetails', list);
  };

  const removeFeeCategory = (idx: number) => {
    const list = (formData.feesDetails || []).filter((_: any, i: number) => i !== idx);
    updateField('feesDetails', list);
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
            href="/admin/colleges"
            className="w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-d2c-navy hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">
              {isNew ? 'Create New College' : `Edit: ${formData.name || 'College'}`}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {isNew ? 'Fill in details to publish a new college page' : `Slug: /colleges/${formData.slug}`}
            </p>
          </div>
        </div>

        {!isNew && formData.slug && (
          <Link
            href={`/colleges/${formData.slug}`}
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
          <SectionCard title="Essential College Information" icon={Building2} description="Core identification and category metadata">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">
                  College Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. Indian Institute of Technology Bombay"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-1 focus:ring-d2c-royal outline-none"
                />
              </div>

              <SlugInput
                label="URL Slug"
                value={formData.slug}
                sourceText={formData.name}
                prefix="colleges"
                onChange={(slug) => updateField('slug', slug)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">City / Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="e.g. Mumbai, Maharashtra"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  placeholder="e.g. Maharashtra"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Institution Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => updateField('type', e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none bg-white"
                >
                  <option value="Government">Government / Autonomous</option>
                  <option value="Private">Private</option>
                  <option value="Deemed">Deemed University</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Established Year</label>
                <input
                  type="text"
                  value={formData.established}
                  onChange={(e) => updateField('established', e.target.value)}
                  placeholder="e.g. 1958"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Rating (0 - 5)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => updateField('rating', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Reviews Count</label>
                <input
                  type="number"
                  value={formData.reviews}
                  onChange={(e) => updateField('reviews', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Fees Display Text</label>
                <input
                  type="text"
                  value={formData.fees}
                  onChange={(e) => updateField('fees', e.target.value)}
                  placeholder="e.g. ₹2.2L - ₹8.5L / year"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>
            </div>

            <JsonArrayEditor
              label="Offered Degrees / Programs (Short Chips)"
              value={formData.courses}
              onChange={(items) => updateField('courses', items)}
              asPills
              placeholder="e.g. B.Tech, M.Tech, MBA, Ph.D"
              hint="Shown as quick filter tags on college search cards"
            />

            <JsonArrayEditor
              label="SEO Keywords & Tags"
              value={formData.tags}
              onChange={(items) => updateField('tags', items)}
              asPills
              placeholder="e.g. direct admission, btech fees, ranking, placement 2027"
              hint="Injected into page metadata keywords and search indexing"
            />
          </SectionCard>
        </div>
      )}

      {/* Tab 2: Images & Media */}
      {activeTab === 'images' && (
        <div className="space-y-6">
          <SectionCard title="Visual Assets & Campus Imagery" icon={ImageIcon} description="Upload or link high resolution photos for college hero, logo and galleries">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ImageUploader
                label="College Logo / Crest"
                value={formData.logoUrl}
                aspect="square"
                folder="colleges/logos"
                hint="Used in headers, search cards, and comparison tools (1:1 square)"
                onChange={(url) => updateField('logoUrl', url)}
              />

              <ImageUploader
                label="Main Featured Image"
                value={formData.imageUrl}
                aspect="video"
                folder="colleges/featured"
                hint="Used as card thumbnail and OpenGraph social share card (16:9)"
                onChange={(url) => updateField('imageUrl', url)}
              />

              <ImageUploader
                label="Cover / Banner Image"
                value={formData.coverUrl}
                aspect="wide"
                folder="colleges/covers"
                hint="Hero backdrop at the top of the college page"
                onChange={(url) => updateField('coverUrl', url)}
              />
            </div>

            {/* Gallery Images */}
            <div className="pt-6 border-t border-gray-150 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-d2c-navy">Campus Gallery Images</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Showcase campus infrastructure, labs, hostels, and auditorium</p>
                </div>
                <button
                  type="button"
                  onClick={() => updateField('galleryImages', [...(formData.galleryImages || []), { url: '', alt: 'Campus photo' }])}
                  className="text-xs bg-d2c-royal/10 text-d2c-royal hover:bg-d2c-royal hover:text-white px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Gallery Photo
                </button>
              </div>

              {(formData.galleryImages || []).length === 0 ? (
                <div className="p-6 rounded-2xl border border-dashed border-gray-200 text-center text-xs text-gray-400 bg-gray-50/50">
                  No campus gallery photos added yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(formData.galleryImages || []).map((img: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500">Photo #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const list = formData.galleryImages.filter((_: any, i: number) => i !== idx);
                            updateField('galleryImages', list);
                          }}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <ImageUploader
                        label=""
                        value={img.url}
                        folder="colleges/gallery"
                        onChange={(url) => {
                          const list = [...formData.galleryImages];
                          list[idx] = { ...list[idx], url };
                          updateField('galleryImages', list);
                        }}
                      />
                      <input
                        type="text"
                        value={img.alt || ''}
                        onChange={(e) => {
                          const list = [...formData.galleryImages];
                          list[idx] = { ...list[idx], alt: e.target.value };
                          updateField('galleryImages', list);
                        }}
                        placeholder="Caption / Description (e.g. Central Library)"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:border-d2c-royal outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SectionCard>
        </div>
      )}

      {/* Tab 3: Overview & Highlights */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <SectionCard title="Textual Descriptions & Bullet Points" icon={FileText} description="Key content read by prospective students and indexed by search engines">
            <RichTextArea
              label="Detailed About / Overview"
              value={formData.about}
              rows={8}
              onChange={(val) => updateField('about', val)}
              placeholder="Provide a comprehensive introduction to the college, history, accreditations, ranking, and culture..."
              hint="Shown in the College Overview section on the public page."
            />

            <RichTextArea
              label="Short Summary / Card Description"
              value={formData.description}
              rows={3}
              onChange={(val) => updateField('description', val)}
              placeholder="Brief 2-3 sentence overview..."
              hint="Used in search result snippets and meta description fallback."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-150">
              <JsonArrayEditor
                label="College Highlights (Green Checkmarks)"
                value={formData.highlights}
                onChange={(items) => updateField('highlights', items)}
                placeholder="e.g. NAAC A++ Grade Accreditation"
                hint="Displayed in the overview cards with checkmarks"
              />

              <JsonArrayEditor
                label="Campus Facilities & Infrastructure"
                value={formData.infrastructure}
                onChange={(items) => updateField('infrastructure', items)}
                placeholder="e.g. Smart Classrooms, AC Hostels, Olympic Pool"
                hint="Displayed in the Facilities & Infrastructure grid"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-150">
              <JsonArrayEditor
                label="Why Choose This College"
                value={formData.whyChoose}
                onChange={(items) => updateField('whyChoose', items)}
                placeholder="e.g. 100% placement track record for CSE"
              />

              <JsonArrayEditor
                label="Why Choose Akash Talks / Direct2Campus"
                value={formData.whyChooseAkashTalks}
                onChange={(items) => updateField('whyChooseAkashTalks', items)}
                placeholder="e.g. Direct management quota seat booking support"
              />
            </div>
          </SectionCard>
        </div>
      )}

      {/* Tab 4: Courses & Fees */}
      {activeTab === 'courses-fees' && (
        <div className="space-y-6">
          <SectionCard title="Specializations & Courses Details" icon={DollarSign} description="Specify exact courses, degrees, and durations">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-sm font-bold text-d2c-navy">Program Specializations</h4>
                <p className="text-xs text-gray-400">Listed in the Available Specializations grid</p>
              </div>
              <button
                type="button"
                onClick={addCourseDetail}
                className="text-xs bg-d2c-royal/10 text-d2c-royal hover:bg-d2c-royal hover:text-white px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Course
              </button>
            </div>

            {(formData.coursesDetails || []).length === 0 ? (
              <div className="p-6 rounded-2xl border border-dashed border-gray-200 text-center text-xs text-gray-400 bg-gray-50/50">
                No specializations added. Click &quot;Add Course&quot; to configure degrees like B.Tech CSE, MBA, etc.
              </div>
            ) : (
              <div className="space-y-3">
                {formData.coursesDetails.map((course: any, idx: number) => (
                  <div key={idx} className="flex flex-col md:flex-row items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <input
                      type="text"
                      value={course.name || ''}
                      onChange={(e) => updateCourseDetail(idx, 'name', e.target.value)}
                      placeholder="Course Name (e.g. B.Tech Computer Science)"
                      className="flex-1 w-full text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white outline-none focus:border-d2c-royal"
                    />
                    <input
                      type="text"
                      value={course.duration || ''}
                      onChange={(e) => updateCourseDetail(idx, 'duration', e.target.value)}
                      placeholder="Duration (e.g. 4 Years)"
                      className="w-full md:w-36 text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white outline-none focus:border-d2c-royal"
                    />
                    <input
                      type="text"
                      value={course.type || ''}
                      onChange={(e) => updateCourseDetail(idx, 'type', e.target.value)}
                      placeholder="Type (e.g. Full Time)"
                      className="w-full md:w-36 text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white outline-none focus:border-d2c-royal"
                    />
                    <button
                      type="button"
                      onClick={() => removeCourseDetail(idx)}
                      className="text-gray-400 hover:text-red-500 p-2 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard title="Fee Structure Tables" icon={DollarSign} description="Create structured fee breakdowns by program or quota">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-sm font-bold text-d2c-navy">Fee Breakdown Categories</h4>
                <p className="text-xs text-gray-400">Renders full fee tables with fee component and amounts</p>
              </div>
              <button
                type="button"
                onClick={addFeeCategory}
                className="text-xs bg-d2c-royal/10 text-d2c-royal hover:bg-d2c-royal hover:text-white px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Fee Table Category
              </button>
            </div>

            {(formData.feesDetails || []).length === 0 ? (
              <div className="p-6 rounded-2xl border border-dashed border-gray-200 text-center text-xs text-gray-400 bg-gray-50/50">
                No fee categories added.
              </div>
            ) : (
              <div className="space-y-6">
                {formData.feesDetails.map((cat: any, idx: number) => (
                  <div key={idx} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/40 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-gray-500 mb-1">Category Title</label>
                        <input
                          type="text"
                          value={cat.title || ''}
                          onChange={(e) => updateFeeCategoryTitle(idx, e.target.value)}
                          placeholder="e.g. B.Tech Tuition & Hostel Fees"
                          className="w-full text-sm font-bold px-3 py-2 rounded-xl border border-gray-200 bg-white outline-none focus:border-d2c-royal"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFeeCategory(idx)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors mt-5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <KeyValueEditor
                      label="Fee Components"
                      items={cat.items || []}
                      onChange={(items) => updateFeeCategoryItems(idx, items)}
                      keyHeader="Fee Component"
                      valueHeader="Amount"
                      keyPlaceholder="e.g. Semester 1 Tuition"
                      valuePlaceholder="e.g. ₹85,000"
                    />

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Additional Note (Optional)</label>
                      <input
                        type="text"
                        value={cat.note || ''}
                        onChange={(e) => updateFeeCategoryNote(idx, e.target.value)}
                        placeholder="e.g. One-time refundable security deposit of ₹10,000 applicable at admission"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white outline-none focus:border-d2c-royal"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      )}

      {/* Tab 5: Placements */}
      {activeTab === 'placements' && (
        <div className="space-y-6">
          <SectionCard title="Placement Records & Corporate Partners" icon={TrendingUp} description="Statistics, salary packages and top recruiting companies">
            <KeyValueEditor
              label="Key Placement Figures (Cards)"
              items={formData.placements?.stats || []}
              onChange={(stats) => updateField('placements', { ...formData.placements, stats })}
              keyHeader="Metric / Label"
              valueHeader="Package / Number"
              keyPlaceholder="e.g. Highest Domestic CTC"
              valuePlaceholder="e.g. ₹58 LPA"
              hint="Rendered as large highlighted numbers on dark card"
            />

            <JsonArrayEditor
              label="Placement Highlights & Milestones"
              value={formData.placements?.highlights || []}
              onChange={(highlights) => updateField('placements', { ...formData.placements, highlights })}
              placeholder="e.g. Over 300+ Fortune 500 companies visited campus"
            />

            {/* Top Recruiters */}
            <div className="pt-6 border-t border-gray-150 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-d2c-navy">Top Corporate Recruiters by Sector</h4>
                  <p className="text-xs text-gray-400">Group recruiting companies by industry or category</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const list = formData.placements?.topRecruiters || [];
                    updateField('placements', {
                      ...formData.placements,
                      topRecruiters: [...list, { category: 'Tech & IT', companies: ['Google', 'Microsoft', 'Amazon'] }]
                    });
                  }}
                  className="text-xs bg-d2c-royal/10 text-d2c-royal hover:bg-d2c-royal hover:text-white px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Sector Group
                </button>
              </div>

              {(formData.placements?.topRecruiters || []).length === 0 ? (
                <div className="p-6 rounded-2xl border border-dashed border-gray-200 text-center text-xs text-gray-400 bg-gray-50/50">
                  No recruiter categories added.
                </div>
              ) : (
                <div className="space-y-4">
                  {(formData.placements?.topRecruiters || []).map((group: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/40 space-y-3">
                      <div className="flex items-center justify-between gap-4">
                        <input
                          type="text"
                          value={group.category || ''}
                          onChange={(e) => {
                            const list = [...formData.placements.topRecruiters];
                            list[idx] = { ...list[idx], category: e.target.value };
                            updateField('placements', { ...formData.placements, topRecruiters: list });
                          }}
                          placeholder="Category (e.g. Product Engineering / Consulting)"
                          className="flex-1 text-xs font-bold px-3 py-2 rounded-lg border border-gray-200 bg-white outline-none focus:border-d2c-royal"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const list = formData.placements.topRecruiters.filter((_: any, i: number) => i !== idx);
                            updateField('placements', { ...formData.placements, topRecruiters: list });
                          }}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <JsonArrayEditor
                        label="Company Names"
                        value={group.companies || []}
                        asPills
                        onChange={(companies) => {
                          const list = [...formData.placements.topRecruiters];
                          list[idx] = { ...list[idx], companies };
                          updateField('placements', { ...formData.placements, topRecruiters: list });
                        }}
                        placeholder="e.g. Adobe, Cisco, TCS"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SectionCard>
        </div>
      )}

      {/* Tab 6: Admissions & Dates */}
      {activeTab === 'admissions' && (
        <div className="space-y-6">
          <SectionCard title="Admission Process & Eligibility" icon={ClipboardList} description="Criteria, how to apply step-by-step, and documents needed">
            <JsonArrayEditor
              label="Eligibility Criteria"
              value={formData.admissions?.eligibility || []}
              onChange={(eligibility) => updateField('admissions', { ...formData.admissions, eligibility })}
              placeholder="e.g. Minimum 60% aggregate in 10+2 with Physics & Math"
              hint="Shown in the Admission Eligibility section"
            />

            <JsonArrayEditor
              label="Application Steps (Timeline)"
              value={formData.admissions?.process || []}
              onChange={(process) => updateField('admissions', { ...formData.admissions, process })}
              placeholder="e.g. Step 1: Submit entrance exam scorecard / Direct enquiry"
              hint="Numbered sequential steps displayed on the timeline"
            />

            <JsonArrayEditor
              label="Required Documents"
              value={formData.admissions?.documents || []}
              asPills
              onChange={(documents) => updateField('admissions', { ...formData.admissions, documents })}
              placeholder="e.g. 10th & 12th Marksheets, Transfer Certificate, Aadhaar"
            />

            <div className="pt-6 border-t border-gray-150">
              <KeyValueEditor
                label="Important Admission Dates"
                items={formData.keyDates || []}
                keyName="event"
                valueName="date"
                keyHeader="Admission Event"
                valueHeader="Date / Deadline"
                keyPlaceholder="e.g. Application Window Closes"
                valuePlaceholder="e.g. July 15, 2027"
                onChange={(keyDates) => updateField('keyDates', keyDates)}
              />
            </div>
          </SectionCard>
        </div>
      )}

      {/* Tab 7: More Sections (Scholarships, Alumni, FAQs) */}
      {activeTab === 'more' && (
        <div className="space-y-6">
          <SectionCard title="Scholarships & Financial Aid" icon={Award} description="Merit-based waivers and quota concessions" collapsible defaultOpen={false}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-gray-500">Configure scholarship schemes and eligibility terms</span>
              <button
                type="button"
                onClick={() => {
                  const list = formData.scholarships || [];
                  updateField('scholarships', [
                    ...list,
                    { title: 'Merit Scholarship', items: [{ label: '>90% in 12th Boards', value: '50% Tuition Waiver' }] }
                  ]);
                }}
                className="text-xs bg-d2c-royal/10 text-d2c-royal hover:bg-d2c-royal hover:text-white px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Scholarship Program
              </button>
            </div>

            {(formData.scholarships || []).map((sch: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={sch.title || ''}
                    onChange={(e) => {
                      const list = [...formData.scholarships];
                      list[idx] = { ...list[idx], title: e.target.value };
                      updateField('scholarships', list);
                    }}
                    placeholder="Scholarship Title (e.g. Sports Concession)"
                    className="flex-1 text-xs font-bold px-3 py-2 rounded-lg border border-gray-200 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const list = formData.scholarships.filter((_: any, i: number) => i !== idx);
                      updateField('scholarships', list);
                    }}
                    className="text-red-500 p-2 ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <KeyValueEditor
                  label="Concession Breakdown"
                  items={sch.items || []}
                  onChange={(items) => {
                    const list = [...formData.scholarships];
                    list[idx] = { ...list[idx], items };
                    updateField('scholarships', list);
                  }}
                  keyHeader="Criteria"
                  valueHeader="Benefit"
                  keyPlaceholder="e.g. State rank < 500"
                  valuePlaceholder="e.g. 100% Free Tuition"
                />
              </div>
            ))}
          </SectionCard>

          <SectionCard title="Alumni Network" icon={Award} description="Notable alumni and companies where graduates work" collapsible defaultOpen={false}>
            <RichTextArea
              label="Alumni Network Overview"
              value={formData.alumni?.description || ''}
              rows={3}
              onChange={(desc) => updateField('alumni', { ...formData.alumni, description: desc })}
              placeholder="e.g. Our alumni hold leadership roles globally across Silicon Valley, Wall Street, and top Indian unicorns..."
            />

            <JsonArrayEditor
              label="Alumni Work At (Company Names)"
              value={formData.alumni?.companies || []}
              asPills
              onChange={(companies) => updateField('alumni', { ...formData.alumni, companies })}
              placeholder="e.g. Google, Apple, Tesla, McKinsey, Zomato"
            />
          </SectionCard>

          <SectionCard title="Frequently Asked Questions (FAQs)" icon={Award} description="Direct answers to frequent admission and campus queries" collapsible defaultOpen={true}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-gray-500">Provide Q&A pairs for student guidance and SEO FAQ rich snippets</span>
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
                No FAQs added yet. Click &quot;Add FAQ&quot; to answer direct questions.
              </div>
            ) : (
              <div className="space-y-4">
                {formData.faqs.map((faq: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="w-6 h-6 rounded-full bg-d2c-gold/20 text-[#9e7604] font-bold text-xs flex items-center justify-center shrink-0">
                        Q{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={faq.question || ''}
                        onChange={(e) => updateFaq(idx, 'question', e.target.value)}
                        placeholder="Question (e.g. Is direct admission through management quota available?)"
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

      {/* Tab 8: Contact Details */}
      {activeTab === 'contact' && (
        <div className="space-y-6">
          <SectionCard title="Official Contact & Inquiries" icon={Globe} description="Office contact channels and campus address">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Official Phone</label>
                <input
                  type="text"
                  value={formData.contact?.phone || ''}
                  onChange={(e) => updateField('contact', { ...formData.contact, phone: e.target.value })}
                  placeholder="e.g. +91 62003 25137"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={formData.contact?.email || ''}
                  onChange={(e) => updateField('contact', { ...formData.contact, email: e.target.value })}
                  placeholder="e.g. admissions@college.edu"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Website URL</label>
                <input
                  type="text"
                  value={formData.contact?.website || ''}
                  onChange={(e) => updateField('contact', { ...formData.contact, website: e.target.value })}
                  placeholder="e.g. https://www.college.edu"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-1.5">WhatsApp Counselor Link / Number</label>
                <input
                  type="text"
                  value={formData.contact?.whatsapp || ''}
                  onChange={(e) => updateField('contact', { ...formData.contact, whatsapp: e.target.value })}
                  placeholder="e.g. 916200325137"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Campus Physical Address</label>
              <textarea
                rows={3}
                value={formData.contact?.address || ''}
                onChange={(e) => updateField('contact', { ...formData.contact, address: e.target.value })}
                placeholder="Full address with pin code..."
                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
              />
            </div>
          </SectionCard>
        </div>
      )}

      {/* Save Bar */}
      <AdminFormSaveBar
        saving={saving}
        onSave={handleSave}
        previewUrl={formData.slug ? `/colleges/${formData.slug}` : undefined}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
}
