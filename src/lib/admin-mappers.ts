export function mapCollegeToDb(c: any) {
  return {
    ...(c.id ? { id: String(c.id) } : {}),
    slug: String(c.slug || '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-'),
    name: String(c.name || '').trim(),
    location: c.location || '',
    state: c.state || '',
    rating: Number(c.rating) || 0,
    reviews: Number(c.reviews) || 0,
    fees: c.fees || '',
    courses: Array.isArray(c.courses) ? c.courses : [],
    type: c.type || 'Private',
    description: c.description || '',
    image_url: c.imageUrl || c.image_url || '',
    logo_url: c.logoUrl || c.logo_url || '',
    cover_url: c.coverUrl || c.cover_url || '',
    tags: Array.isArray(c.tags) ? c.tags : [],
    established: c.established ? String(c.established) : '',
    about: c.about || '',
    highlights: Array.isArray(c.highlights) ? c.highlights : [],
    infrastructure: Array.isArray(c.infrastructure) ? c.infrastructure : [],
    cutoffs: c.cutoffs || [],
    courses_details: c.coursesDetails || c.courses_details || [],
    fees_details: c.feesDetails || c.fees_details || [],
    placements: c.placements || { stats: [], highlights: [], topRecruiters: [] },
    scholarships: c.scholarships || [],
    faqs: c.faqs || [],
    admissions: c.admissions || { process: [], eligibility: [], documents: [] },
    key_dates: c.keyDates || c.key_dates || [],
    why_choose: Array.isArray(c.whyChoose ?? c.why_choose) ? (c.whyChoose ?? c.why_choose) : [],
    alumni: c.alumni || { description: '', companies: [], achievements: [] },
    compare: c.compare || [],
    contact: c.contact || {},
    gallery_images: c.galleryImages || c.gallery_images || [],
    why_choose_akash_talks: c.whyChooseAkashTalks || c.why_choose_akash_talks || [],
    neet_cutoffs: c.neetCutoffs || c.neet_cutoffs || [],
    mq_fees: c.mqFees || c.mq_fees || {},
    hostel_fees: c.hostelFees || c.hostel_fees || [],
    misc_fees: c.miscFees || c.misc_fees || [],
    security_deposit: c.securityDeposit || c.security_deposit || '',
    courses_seats: c.coursesSeats || c.courses_seats || [],
    hospital: c.hospital || {},
    internship: c.internship || {},
    faculty_departments: c.facultyDepartments || c.faculty_departments || [],
    admission_process: c.admissionProcess || c.admission_process || [],
    updated_at: new Date().toISOString()
  };
}

export function mapDbToCollege(raw: any) {
  if (!raw) return null;
  return {
    ...raw,
    courses: Array.isArray(raw.courses) ? raw.courses : [],
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    highlights: Array.isArray(raw.highlights) ? raw.highlights : [],
    infrastructure: Array.isArray(raw.infrastructure) ? raw.infrastructure : [],
    imageUrl: raw.image_url || '',
    logoUrl: raw.logo_url || '',
    coverUrl: raw.cover_url || '',
    coursesDetails: raw.courses_details || [],
    feesDetails: raw.fees_details || [],
    placements: raw.placements || { stats: [], highlights: [], topRecruiters: [] },
    admissions: raw.admissions || { process: [], eligibility: [], documents: [] },
    scholarships: raw.scholarships || [],
    faqs: raw.faqs || [],
    keyDates: raw.key_dates || [],
    whyChoose: raw.why_choose || [],
    alumni: raw.alumni || { description: '', companies: [] },
    contact: raw.contact || {},
    galleryImages: raw.gallery_images || [],
    whyChooseAkashTalks: raw.why_choose_akash_talks || [],
    neetCutoffs: raw.neet_cutoffs || [],
    mqFees: raw.mq_fees || {},
    hostelFees: raw.hostel_fees || [],
    miscFees: raw.misc_fees || [],
    securityDeposit: raw.security_deposit || '',
    coursesSeats: raw.courses_seats || [],
    hospital: raw.hospital || {},
    internship: raw.internship || {},
    facultyDepartments: raw.faculty_departments || [],
    admissionProcess: raw.admission_process || []
  };
}

export function mapExamToDb(e: any) {
  return {
    ...(e.id ? { id: String(e.id) } : {}),
    slug: String(e.slug || '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-'),
    name: String(e.name || '').trim(),
    full_name: e.fullName || e.full_name || '',
    logo_url: e.logoUrl || e.logo_url || '',
    description: e.description || '',
    date: e.date || '',
    application_link: e.applicationLink || e.application_link || '',
    introduction: e.introduction || '',
    overview: e.overview || '',
    about_exam: e.aboutExam || e.about_exam || '',
    important_dates: e.importantDates || e.important_dates || [],
    application_process: e.applicationProcess || e.application_process || [],
    documents: Array.isArray(e.documents) ? e.documents : [],
    eligibility: Array.isArray(e.eligibility) ? e.eligibility : [],
    exam_pattern: e.examPattern || e.exam_pattern || {
      mode: '',
      duration: '',
      totalMarks: '',
      markingScheme: '',
      subjects: []
    },
    counselling: e.counselling || '',
    faqs: e.faqs || [],
    updated_at: new Date().toISOString()
  };
}

export function mapDbToExam(raw: any) {
  if (!raw) return null;
  return {
    ...raw,
    fullName: raw.full_name || '',
    logoUrl: raw.logo_url || '',
    applicationLink: raw.application_link || '',
    aboutExam: raw.about_exam || '',
    importantDates: raw.important_dates || [],
    applicationProcess: raw.application_process || [],
    documents: Array.isArray(raw.documents) ? raw.documents : [],
    eligibility: Array.isArray(raw.eligibility) ? raw.eligibility : [],
    examPattern: raw.exam_pattern || {
      mode: '',
      duration: '',
      totalMarks: '',
      markingScheme: '',
      subjects: []
    },
    faqs: raw.faqs || []
  };
}
