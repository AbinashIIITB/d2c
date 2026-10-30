// Google Analytics 4 (GA4) Utility Functions for Direct2Campus

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-67Y37C17GC';

// Declare global gtag function on window
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Check if Google Analytics is available in the current window
 */
export const isGAAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Track a page view across client-side route changes
 */
export const pageview = (url: string, title?: string) => {
  if (!isGAAvailable()) return;
  
  // Never track internal admin routes
  if (url.startsWith('/admin')) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    page_title: title || (typeof document !== 'undefined' ? document.title : ''),
  });
};

/**
 * Generic event tracker
 */
export const event = (action: string, params: Record<string, any> = {}) => {
  if (!isGAAvailable()) return;

  // Never track admin events
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
    return;
  }

  window.gtag('event', action, params);
};

/* ══════════════════════════════════════════════════════════════
   HIGH-VALUE CONVERSION & KEY EVENT TRACKERS
══════════════════════════════════════════════════════════════ */

export interface LeadEventParams {
  formType: 'College Enquiry Form' | 'Welcome Lead Modal' | 'Callback Request' | 'Apply Now Modal' | 'General Query' | 'Contact Us' | 'Exam Query' | 'Free Counselling' | string;
  collegeName?: string;
  course?: string;
  preferredLocation?: string;
  sourceUrl?: string;
}

/**
 * Standard GA4 Lead Generation Event
 * Corresponds to standard `generate_lead` in Google Analytics
 */
export const trackLeadSubmission = ({
  formType,
  collegeName,
  course,
  preferredLocation,
  sourceUrl,
}: LeadEventParams) => {
  const currentUrl = sourceUrl || (typeof window !== 'undefined' ? window.location.href : '');

  event('generate_lead', {
    event_category: 'Leads & Inquiries',
    event_label: collegeName || formType,
    form_type: formType,
    college_name: collegeName || 'General',
    target_course: course || 'N/A',
    preferred_location: preferredLocation || 'N/A',
    page_url: currentUrl,
    value: 1, // Standard conversion unit
  });
};

/**
 * Track student clicks on WhatsApp counseling buttons
 */
export const trackWhatsAppClick = ({
  location,
  collegeName,
}: {
  location: string;
  collegeName?: string;
}) => {
  event('click_whatsapp', {
    event_category: 'Direct Contact',
    event_label: collegeName ? `WhatsApp - ${collegeName}` : `WhatsApp - ${location}`,
    button_location: location,
    college_name: collegeName || 'General',
  });
};

/**
 * Track phone call clicks (`tel:` or callback button clicks)
 */
export const trackPhoneCall = ({
  location,
  collegeName,
  phoneNumber = '+916200325137',
}: {
  location: string;
  collegeName?: string;
  phoneNumber?: string;
}) => {
  event('click_to_call', {
    event_category: 'Direct Contact',
    event_label: `Call - ${location}`,
    button_location: location,
    college_name: collegeName || 'General',
    phone_number: phoneNumber,
  });
};

/**
 * Track college / exam brochure or syllabus downloads
 */
export const trackBrochureDownload = ({
  collegeName,
  course,
}: {
  collegeName: string;
  course?: string;
}) => {
  event('download_brochure', {
    event_category: 'Downloads',
    event_label: `Brochure - ${collegeName}`,
    college_name: collegeName,
    course: course || 'General',
  });
};

/**
 * Track clicks on "Apply Now" triggers
 */
export const trackApplyClick = ({
  collegeName,
  location = 'General',
}: {
  collegeName?: string;
  location?: string;
}) => {
  event('click_apply_now', {
    event_category: 'Application Flow',
    event_label: collegeName ? `Apply Now - ${collegeName}` : `Apply Now - ${location}`,
    college_name: collegeName || 'General',
    button_location: location,
  });
};

/**
 * Track internal site searches for colleges and exams
 */
export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  event('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};
