import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { colleges, exams } from "@/lib/data";

export async function POST(req: Request) {
  try {
    // 1. Migrate Colleges
    const formattedColleges = colleges.map(c => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      location: c.location,
      state: c.state,
      rating: c.rating,
      reviews: c.reviews,
      fees: c.fees,
      courses: c.courses,
      type: c.type,
      description: c.description,
      image_url: c.imageUrl,
      logo_url: c.logoUrl,
      cover_url: c.coverUrl,
      tags: c.tags,
      established: c.established,
      about: c.about,
      highlights: c.highlights,
      infrastructure: c.infrastructure,
      cutoffs: c.cutoffs,
      courses_details: c.coursesDetails,
      fees_details: c.feesDetails,
      placements: c.placements,
      scholarships: c.scholarships,
      faqs: c.faqs,
      admissions: c.admissions,
      key_dates: c.keyDates,
      why_choose: c.whyChoose,
      alumni: c.alumni,
      compare: c.compare,
      contact: c.contact,
      gallery_images: c.galleryImages,
      why_choose_akash_talks: c.whyChooseAkashTalks,
      
      neet_cutoffs: c.neetCutoffs,
      mq_fees: c.mqFees,
      hostel_fees: c.hostelFees,
      misc_fees: c.miscFees,
      security_deposit: c.securityDeposit,
      courses_seats: c.coursesSeats,
      hospital: c.hospital,
      internship: c.internship,
      faculty_departments: c.facultyDepartments,
      admission_process: c.admissionProcess,
    }));

    const { error: collegesError } = await supabaseAdmin
      .from('colleges')
      .upsert(formattedColleges, { onConflict: 'id' });

    if (collegesError) throw collegesError;

    // 2. Migrate Exams
    const formattedExams = exams.map(e => ({
      id: e.id,
      slug: e.slug,
      name: e.name,
      full_name: e.fullName,
      logo_url: e.logoUrl,
      description: e.description,
      date: e.date,
      application_link: e.applicationLink,
      introduction: e.introduction,
      overview: e.overview,
      about_exam: e.aboutExam,
      important_dates: e.importantDates,
      application_process: e.applicationProcess,
      documents: e.documents,
      eligibility: e.eligibility,
      exam_pattern: e.examPattern,
      counselling: e.counselling,
      faqs: e.faqs,
    }));

    const { error: examsError } = await supabaseAdmin
      .from('exams')
      .upsert(formattedExams, { onConflict: 'id' });

    if (examsError) throw examsError;

    return NextResponse.json({ success: true, message: "Migration completed successfully!" });
  } catch (error: any) {
    console.error("Migration failed:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
