import type { ContentDefinition, Field } from '@/lib/cms/types';

export const modalsDefaults = {
  apply: {
    title: 'Apply Now',
    subtitle: 'Fill details below and we will get back to you.',
    successTitle: 'Application Received!',
    successText: "We'll be in touch shortly.",
    nameLabel: 'Full Name',
    namePlaceholder: 'Enter your name',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '10-digit mobile number',
    courseLabel: 'Course/Branch',
    coursePlaceholder: 'Select Course/Branch (eg B Tech, M Tech, etc)',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Email (Optional)',
    collegeLabel: 'Interested College (Optional)',
    collegePlaceholder: 'Select a college',
    examLabel: 'Interested Exam (Optional)',
    examPlaceholder: 'Select an exam',
    submitLabel: 'Submit Application',
    submittingLabel: 'Submitting...',
    orLabel: 'OR',
    callLabel: 'Call Us',
    whatsappLabel: 'WhatsApp',
  },
  callback: {
    title: 'Request Callback',
    subtitle: 'Our expert counsellors will contact you within 24 hours.',
    successTitle: 'Request Received!',
    successText: "We'll be in touch shortly.",
    nameLabel: 'Full Name',
    namePlaceholder: 'Enter your name',
    courseLabel: 'Course/Branch',
    coursePlaceholder: 'Select Course/Branch (eg B Tech, M Tech, etc)',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '10-digit mobile number',
    submitLabel: 'Submit Request',
    submittingLabel: 'Submitting...',
    orLabel: 'OR',
    callLabel: 'Call Us',
    whatsappLabel: 'WhatsApp',
  },
  collegeAdmission: {
    badge: 'Admission Open',
    title: 'Apply for {name}',
    description:
      'Enter your details. Our admission counselor will reach out within 24 hours to help you secure a seat.',
    orLabel: 'OR',
    callLabel: 'Call Us',
    whatsappLabel: 'WhatsApp',
  },
  examAdmission: {
    badge: 'Application Open',
    title: 'Apply for {name}',
    description:
      'Enter your details. Our admission counselor will reach out within 24 hours to help you secure a seat.',
    orLabel: 'OR',
    callLabel: 'Call Us',
    whatsappLabel: 'WhatsApp',
  },
  collegeEnquiry: {
    namePlaceholder: 'Full Name',
    phonePlaceholder: '+91 Phone Number',
    emailPlaceholder: 'Email Address',
    coursePlaceholder: 'Select Course/Branch (eg B Tech, M Tech, etc)',
    submitLabel: 'Apply Now',
    submittingLabel: 'Submitting...',
    errorMessage: 'Something went wrong. Please try again.',
    successTitle: 'Thank You!',
    successText: "We'll contact you shortly about {name}.",
    anotherLabel: 'Submit Another Enquiry',
  },
  examEnquiry: {
    namePlaceholder: 'Full Name',
    phonePlaceholder: '+91 Phone Number',
    emailPlaceholder: 'Email Address',
    coursePlaceholder: 'Select Course/Branch (eg B Tech, M Tech, etc)',
    submitLabel: 'Apply Now',
    submittingLabel: 'Submitting...',
    errorMessage: 'Something went wrong. Please try again.',
    successTitle: 'Thank You!',
    successText: "We'll contact you shortly about {name}.",
    anotherLabel: 'Submit Another Enquiry',
  },
  applyButtons: {
    examApplyLabel: 'Apply Here',
    collegeApplyLabel: 'Apply Now',
  },
  search: {
    defaultPlaceholder: 'Search...',
    collegesHeading: 'Colleges',
    examsHeading: 'Exams',
    collegeFallbackSubtitle: 'College',
    examFallbackSubtitle: 'Entrance Exam',
  },
};

export type ModalsContent = typeof modalsDefaults;

const t = (key: string, label: string, help?: string): Field => ({ key, type: 'text', label, ...(help ? { help } : {}) });
const NAME_HELP = 'Use {name} where the college or exam name should appear.';

export const definition: ContentDefinition<ModalsContent> = {
  key: 'modals',
  title: 'Popups, forms and search',
  group: 'Site',
  previewPath: null,
  sections: [
    {
      id: 'apply',
      title: 'Apply Now popup',
      fields: [
        {
          key: 'apply', type: 'group', label: 'Apply Now popup',
          fields: [
            t('title', 'Title'), { key: 'subtitle', type: 'textarea', label: 'Subtitle' },
            t('successTitle', 'Success title'), t('successText', 'Success text'),
            t('nameLabel', 'Name label'), t('namePlaceholder', 'Name placeholder'),
            t('phoneLabel', 'Phone label'), t('phonePlaceholder', 'Phone placeholder'),
            t('courseLabel', 'Course label'), t('coursePlaceholder', 'Course placeholder'),
            t('emailLabel', 'Email label'), t('emailPlaceholder', 'Email placeholder'),
            t('collegeLabel', 'College dropdown label'), t('collegePlaceholder', 'College dropdown placeholder'),
            t('examLabel', 'Exam dropdown label'), t('examPlaceholder', 'Exam dropdown placeholder'),
            t('submitLabel', 'Submit button'), t('submittingLabel', 'Submitting text'),
            t('orLabel', 'Divider text'), t('callLabel', 'Call button'), t('whatsappLabel', 'WhatsApp button'),
          ],
        },
      ],
    },
    {
      id: 'callback',
      title: 'Request Callback popup',
      fields: [
        {
          key: 'callback', type: 'group', label: 'Request Callback popup',
          fields: [
            t('title', 'Title'), { key: 'subtitle', type: 'textarea', label: 'Subtitle' },
            t('successTitle', 'Success title'), t('successText', 'Success text'),
            t('nameLabel', 'Name label'), t('namePlaceholder', 'Name placeholder'),
            t('courseLabel', 'Course label'), t('coursePlaceholder', 'Course placeholder'),
            t('phoneLabel', 'Phone label'), t('phonePlaceholder', 'Phone placeholder'),
            t('submitLabel', 'Submit button'), t('submittingLabel', 'Submitting text'),
            t('orLabel', 'Divider text'), t('callLabel', 'Call button'), t('whatsappLabel', 'WhatsApp button'),
          ],
        },
      ],
    },
    {
      id: 'college',
      title: 'College admission popup and form',
      fields: [
        {
          key: 'collegeAdmission', type: 'group', label: 'Popup',
          fields: [
            t('badge', 'Badge'), t('title', 'Title', NAME_HELP), { key: 'description', type: 'textarea', label: 'Description' },
            t('orLabel', 'Divider text'), t('callLabel', 'Call button'), t('whatsappLabel', 'WhatsApp button'),
          ],
        },
        {
          key: 'collegeEnquiry', type: 'group', label: 'Enquiry form',
          fields: [
            t('namePlaceholder', 'Name placeholder'), t('phonePlaceholder', 'Phone placeholder'),
            t('emailPlaceholder', 'Email placeholder'), t('coursePlaceholder', 'Course placeholder'),
            t('submitLabel', 'Submit button'), t('submittingLabel', 'Submitting text'),
            t('errorMessage', 'Error message'), t('successTitle', 'Success title'),
            t('successText', 'Success text', NAME_HELP), t('anotherLabel', '"Submit another" button'),
          ],
        },
      ],
    },
    {
      id: 'exam',
      title: 'Exam application popup and form',
      fields: [
        {
          key: 'examAdmission', type: 'group', label: 'Popup',
          fields: [
            t('badge', 'Badge'), t('title', 'Title', NAME_HELP), { key: 'description', type: 'textarea', label: 'Description' },
            t('orLabel', 'Divider text'), t('callLabel', 'Call button'), t('whatsappLabel', 'WhatsApp button'),
          ],
        },
        {
          key: 'examEnquiry', type: 'group', label: 'Enquiry form',
          fields: [
            t('namePlaceholder', 'Name placeholder'), t('phonePlaceholder', 'Phone placeholder'),
            t('emailPlaceholder', 'Email placeholder'), t('coursePlaceholder', 'Course placeholder'),
            t('submitLabel', 'Submit button'), t('submittingLabel', 'Submitting text'),
            t('errorMessage', 'Error message'), t('successTitle', 'Success title'),
            t('successText', 'Success text', NAME_HELP), t('anotherLabel', '"Submit another" button'),
          ],
        },
      ],
    },
    {
      id: 'buttons',
      title: 'Apply buttons and search',
      fields: [
        {
          key: 'applyButtons', type: 'group', label: 'Apply buttons',
          fields: [t('collegeApplyLabel', 'College "Apply Now" button'), t('examApplyLabel', 'Exam "Apply Here" button')],
        },
        {
          key: 'search', type: 'group', label: 'Search suggestions',
          fields: [
            t('defaultPlaceholder', 'Default placeholder'), t('collegesHeading', 'Colleges heading'),
            t('examsHeading', 'Exams heading'), t('collegeFallbackSubtitle', 'College fallback subtitle'),
            t('examFallbackSubtitle', 'Exam fallback subtitle'),
          ],
        },
      ],
    },
  ],
  defaults: modalsDefaults,
};
