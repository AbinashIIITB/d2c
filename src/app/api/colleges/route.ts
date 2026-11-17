import { NextResponse } from "next/server";
import { getAllColleges } from "@/lib/data-service";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const colleges = await getAllColleges();
    return NextResponse.json(colleges);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
