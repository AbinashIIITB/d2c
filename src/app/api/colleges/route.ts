import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: colleges, error } = await supabaseAdmin
      .from('colleges')
      .select('*')
      .order('name');

    if (error) throw error;
    
    // Map snake_case back to camelCase for the frontend if needed
    const mapped = colleges.map(c => ({
      ...c,
      imageUrl: c.image_url,
      logoUrl: c.logo_url,
      coverUrl: c.cover_url,
      coursesDetails: c.courses_details,
      feesDetails: c.fees_details,
      keyDates: c.key_dates,
      whyChoose: c.why_choose,
      galleryImages: c.gallery_images,
      whyChooseAkashTalks: c.why_choose_akash_talks,
      neetCutoffs: c.neet_cutoffs,
      mqFees: c.mq_fees,
      hostelFees: c.hostel_fees,
      miscFees: c.misc_fees,
      securityDeposit: c.security_deposit,
      coursesSeats: c.courses_seats,
      facultyDepartments: c.faculty_departments,
      admissionProcess: c.admission_process
    }));

    return NextResponse.json(mapped);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
