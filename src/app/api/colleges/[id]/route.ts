import { NextResponse } from "next/server";
import { getCollegeByIdOrSlug } from "@/lib/data-service";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Params = Promise<{ id: string }>;

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const college = await getCollegeByIdOrSlug(id);

    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    return NextResponse.json(college);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
