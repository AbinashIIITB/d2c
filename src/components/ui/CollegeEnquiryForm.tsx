"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle } from 'lucide-react';

interface CollegeEnquiryFormProps {
    collegeName: string;
}

export function CollegeEnquiryForm({ collegeName }: CollegeEnquiryFormProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Split full name into first and last
            const nameParts = formData.fullName.trim().split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    phone: formData.phone,
                    email: formData.email,
                    message: `Interested in admission at ${collegeName}`,
                    leadType: 'College Query',
                    interestedCollege: collegeName,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit');
            }

            setIsSuccess(true);
            setFormData({ fullName: '', phone: '', email: '' });
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
                <p className="text-sm text-muted-foreground">We&apos;ll contact you shortly about {collegeName}.</p>
                <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsSuccess(false)}
                >
                    Submit Another Enquiry
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Input
                    placeholder="Full Name"
                    className="bg-white text-gray-900 border-gray-200 placeholder:text-gray-500 focus-visible:ring-[#3B4CC0]/20 focus-visible:border-[#3B4CC0]"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                />
            </div>
            <div className="space-y-2">
                <Input
                    type="tel"
                    placeholder="+91 Phone Number"
                    className="bg-white text-gray-900 border-gray-200 placeholder:text-gray-500 focus-visible:ring-[#3B4CC0]/20 focus-visible:border-[#3B4CC0]"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                />
            </div>
            <div className="space-y-2">
                <Input
                    type="email"
                    placeholder="Email Address"
                    className="bg-white text-gray-900 border-gray-200 placeholder:text-gray-500 focus-visible:ring-[#3B4CC0]/20 focus-visible:border-[#3B4CC0]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
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
                        Submitting...
                    </>
                ) : (
                    'Apply Now'
                )}
            </Button>
        </form>
    );
}
