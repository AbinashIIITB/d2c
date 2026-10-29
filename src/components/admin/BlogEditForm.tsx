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
  Eye
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
    readTime: initialData.readTime || '5 min read',
    imageUrl: initialData.imageUrl || initialData.image_url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    tags: initialData.tags || ['Admission Guidance', 'Direct Admission', 'Direct2Campus'],
    published: initialData.published ?? true,
    seoTitle: initialData.seoTitle || '',
    metaDescription: initialData.metaDescription || ''
  });

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
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
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const url = isNew ? '/api/admin/blogs' : `/api/admin/blogs/${formData.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json.error || 'Failed to save blog post');
      }

      setSuccessMessage('Article published and saved successfully!');
      
      if (isNew && json.blog?.id) {
        setTimeout(() => {
          router.push(`/admin/blogs/${json.blog.id}`);
        }, 800);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl pb-24 font-dm-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blogs"
            className="w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-d2c-navy hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">
              {isNew ? 'Write New Blog Article' : `Edit: ${formData.title || 'Article'}`}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {isNew ? 'Compose and publish insights for students and parents' : `Slug: /blog/${formData.slug}`}
            </p>
          </div>
        </div>

        {!isNew && formData.slug && (
          <Link
            href={`/blog/${formData.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-d2c-navy rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public Post</span>
          </Link>
        )}
      </div>

      <div className="space-y-8">
        {/* Section 1: Basic Metadata */}
        <SectionCard 
          title="Article Details & Metadata" 
          icon={FileText} 
          description="Main headline, category classification, author attribution, and publication details"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-d2c-navy mb-1.5">
                Article Title <span className="text-red-500">*</span>
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
                <div className="text-sm font-bold text-d2c-navy">Publish Status</div>
                <div className="text-xs text-gray-500">Make this article immediately visible to visitors on /blog</div>
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
            label="Upload Article Cover"
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
                placeholder="2-3 sentence overview highlighting what the reader will learn in this article..."
                className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none leading-relaxed"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-d2c-navy">
                  Full Article Body (Markdown / Text) <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-gray-400 font-mono">
                  {(formData.content || '').length} characters
                </span>
              </div>
              <div className="mb-2 p-2.5 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-800 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Supports headings with <code>### Section Title</code>, bullet lists with <code>* Item</code>, and numbered steps with <code>1. Step</code>.</span>
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
              <label className="block text-sm font-semibold text-d2c-navy mb-1.5">SEO Title Tag</label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => updateField('seoTitle', e.target.value)}
                placeholder={formData.title || 'Custom search engine title...'}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-d2c-navy mb-1.5">Meta Description</label>
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

      {/* Save Bar */}
      <AdminFormSaveBar
        saving={saving}
        onSave={handleSave}
        previewUrl={formData.slug ? `/blog/${formData.slug}` : undefined}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
}
