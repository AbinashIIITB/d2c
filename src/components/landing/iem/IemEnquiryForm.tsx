'use client';

import { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  GraduationCap, 
  ShieldCheck,
  Building2,
  FileCheck2
} from 'lucide-react';
import Link from 'next/link';
import { iemFormDefaults, type IemFormContent } from '@/content/iem-branch.schema';

interface IemEnquiryFormProps {
  sectionId?: string;
  defaultBranch?: string;
  defaultCourse?: string;
  defaultCampus?: string;
  /** Editable text, labels and dropdown options (see src/content/iem-branch.schema.ts). */
  content?: IemFormContent;
  showCourseSelector?: boolean;
}

export function IemEnquiryForm({
  sectionId = 'btech-enquiry',
  defaultBranch = 'Computer Science & Engineering (CSE)',
  defaultCourse = 'B.Tech',
  defaultCampus = 'Salt Lake',
  content = iemFormDefaults,
  showCourseSelector = false
}: IemEnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: defaultCourse,
    status: 'Class 12 Appearing',
    stream: 'PCM',
    campus: defaultCampus,
    specialisation: defaultBranch,
    examStatus: 'IEMJEE applied',
    city: '',
    consent: true
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Update preselected branch when prop changes (e.g. user clicked Enquire for Branch)
  useEffect(() => {
    if (defaultBranch) {
      setFormData(prev => ({ ...prev, specialisation: defaultBranch }));
    }
  }, [defaultBranch]);

  useEffect(() => {
    if (defaultCourse) {
      setFormData(prev => ({ ...prev, course: defaultCourse }));
    }
  }, [defaultCourse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Basic validation
    if (!formData.name.trim()) {
      setErrorMsg(content.errors.name);
      return;
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg(content.errors.phone);
      return;
    }
    if (!formData.consent) {
      setErrorMsg(content.errors.consent);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        course: formData.course,
        targetCourse: formData.course,
        category: formData.course.includes('B.Tech') ? 'B.Tech' : formData.course,
        formType: 'IEM Kolkata Admission Enquiry',
        college: 'Institute of Engineering & Management (IEM), Kolkata',
        interestedCollege: `IEM Kolkata (${formData.campus} Campus)`,
        message: `Branch Preference: ${formData.specialisation} | Campus: ${formData.campus} | Status: ${formData.status} (${formData.stream}) | IEMJEE Status: ${formData.examStatus} | City: ${formData.city || 'Not specified'}`,
        landingPageUrl: typeof window !== 'undefined' ? window.location.href : '',
        submittedAt: new Date().toISOString()
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to record enquiry. Please try again or call us directly.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error while submitting enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id={sectionId} className="scroll-mt-28 my-12">
      <div className="bg-gradient-to-br from-white via-blue-50/40 to-white rounded-3xl p-6 md:p-10 border-2 border-d2c-royal/20 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-d2c-royal/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-d2c-royal/10 text-d2c-royal border border-d2c-royal/20">
              <Sparkles className="w-3.5 h-3.5 text-d2c-gold" />
              {content.badge}
            </span>
            <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy">
              {content.title}
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          {/* Success State */}
          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-sora font-bold text-emerald-950">
                {content.successTitle}
              </h3>
              <p className="text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                {content.successBody}
              </p>
              <div className="pt-3 flex flex-wrap justify-center gap-3">
                <a
                  href={content.callHref}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{content.callLabel}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-800 text-xs font-bold transition-all"
                >
                  {content.submitAnotherLabel}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Banner */}
              {errorMsg && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-sm flex items-center gap-3 animate-in shake duration-200">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Grid: Name & Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
                    {content.labels.name} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={content.placeholders.name}
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
                    {content.labels.phone} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-xs font-bold text-gray-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder={content.placeholders.phone}
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Grid: Email & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
                    {content.labels.email} <span className="text-gray-400 font-normal lowercase">{content.labels.emailHint}</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      name="email"
                      placeholder={content.placeholders.email}
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
                    {content.labels.city}
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="city"
                      placeholder={content.placeholders.city}
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Course Selector if active */}
              {showCourseSelector && (
                <div>
                  <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
                    {content.labels.course} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all bg-white font-medium text-gray-800"
                  >
                    {content.courseOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Specialisation & Campus */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
                    {content.labels.specialisation} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="specialisation"
                    value={formData.specialisation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all bg-white font-medium text-gray-800"
                  >
                    {content.specialisationOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
                    {content.labels.campus}
                  </label>
                  <select
                    name="campus"
                    value={formData.campus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all bg-white font-medium text-gray-800"
                  >
                    {content.campusOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status, Stream, and Entrance Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
                    {content.labels.status}
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 rounded-xl border border-gray-200 text-xs focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all bg-white"
                  >
                    {content.statusOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
                    {content.labels.stream}
                  </label>
                  <select
                    name="stream"
                    value={formData.stream}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 rounded-xl border border-gray-200 text-xs focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all bg-white"
                  >
                    {content.streamOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-d2c-navy uppercase tracking-wider mb-1.5">
                    {content.labels.exam}
                  </label>
                  <select
                    name="examStatus"
                    value={formData.examStatus}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 rounded-xl border border-gray-200 text-xs focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all bg-white"
                  >
                    {content.examOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-d2c-royal focus:ring-d2c-royal shrink-0"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    {content.consentBefore}{' '}
                    <Link href={content.privacyHref} className="text-d2c-royal underline font-medium hover:text-blue-700">
                      {content.privacyLabel}
                    </Link>
                    {content.consentAfter}
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-d2c-navy via-d2c-royal to-blue-700 hover:from-blue-900 hover:to-d2c-navy text-white font-sora font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{content.submittingLabel}</span>
                    </>
                  ) : (
                    <>
                      <span>{content.submitLabel}</span>
                      <Send className="w-4 h-4 text-d2c-gold group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Security & trust footnote */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{content.trustNote1}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-d2c-royal" />
                  <span>{content.trustNote2}</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
