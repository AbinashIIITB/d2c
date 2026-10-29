import { Metadata } from "next";
import { getPageData } from "@/lib/page-service";
import { ContactClientView } from "@/components/contact/ContactClientView";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const contactData = await getPageData("contact");
  return {
    title: contactData?.title || "Contact Us – 24/7 Expert Admission Support",
    description:
      contactData?.description ||
      "Have questions about admission cutoffs, fee structures, or campus selection? Get in touch with our team for 24/7 expert counseling.",
    alternates: { canonical: "https://direct2campus.com/contact" },
  };
}

export default async function ContactPage() {
  const contactData = await getPageData("contact");

  return <ContactClientView contactData={contactData} />;
}
