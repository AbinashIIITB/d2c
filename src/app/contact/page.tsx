import { Metadata } from "next";
import { getContent } from "@/lib/cms/content";
import { buildMetadata } from "@/lib/cms/seo";
import { ContactClientView } from "@/components/contact/ContactClientView";
import type { ContactContent } from "@/content/contact";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent<ContactContent>("contact");
  return buildMetadata(content.seo, { path: "/contact" });
}

export default async function ContactPage() {
  const content = await getContent<ContactContent>("contact");

  return <ContactClientView content={content} />;
}
