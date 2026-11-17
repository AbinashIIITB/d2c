"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle } from 'lucide-react';
import { trackLeadSubmission } from '@/lib/gtag';
import { useSiteContent, fillTemplate } from '@/components/cms/SiteContentProvider';

interface ExamEnquiryFormProps {
    examName: string;
}

export function ExamEnquiryForm({ examName }: ExamEnquiryFormProps) {
    const { modals } = useSiteContent();
    const m = modals.examEnquiry;
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        course: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.fullName,
                    phone: formData.phone,
                    email: formData.email,
                    course: formData.course,
                    exam: examName,
                    formType: 'Exam Counseling Form',
                    leadType: formData.course ? `${formData.course} Exam Query` : 'Exam Query',
                    message: `Interested in applying for ${examName}. Target Course: ${formData.course}`,
                    interestedCollege: examName,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit');
            }

            trackLeadSubmission({
                formType: 'Exam Query',
                collegeName: examName,
                course: formData.course,
            });

            setIsSuccess(true);
            setFormData({ fullName: '', phone: '', email: '', course: '' });
        } catch {
            setError(m.errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">{m.successTitle}</h3>
                <p className="text-sm text-white/70">{fillTemplate(m.successText, examName)}</p>
                <Button
                    variant="outline"
                    className="mt-4 border-white/20 text-white hover:bg-white/10"
                    onClick={() => setIsSuccess(false)}
                >
                    {m.anotherLabel}
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Input
                        placeholder={m.namePlaceholder}
                        className="bg-white text-gray-900 border-gray-200 placeholder:text-gray-500 focus-visible:ring-[#3B4CC0]/20 focus-visible:border-[#3B4CC0]"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Input
                        type="tel"
                        placeholder={m.phonePlaceholder}
                        className="bg-white text-gray-900 border-gray-200 placeholder:text-gray-500 focus-visible:ring-[#3B4CC0]/20 focus-visible:border-[#3B4CC0]"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                    />
                </div>
                <div className="space-y-2 sm:col-span-2">
                    <Input
                        type="email"
                        placeholder={m.emailPlaceholder}
                        className="bg-white text-gray-900 border-gray-200 placeholder:text-gray-500 focus-visible:ring-[#3B4CC0]/20 focus-visible:border-[#3B4CC0]"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="space-y-2 sm:col-span-2">
                    <Input
                        type="text"
                        placeholder={m.coursePlaceholder}
                        className="bg-white text-gray-900 border-gray-200 placeholder:text-gray-500 focus-visible:ring-[#3B4CC0]/20 focus-visible:border-[#3B4CC0]"
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        required
                    />
                </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#f6c804] hover:bg-[#e5b703] text-black font-bold"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {m.submittingLabel}
                    </>
                ) : (
                    m.submitLabel
                )}
            </Button>
        </form>
    );
}
