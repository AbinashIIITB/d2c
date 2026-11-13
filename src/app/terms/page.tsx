import { Metadata } from "next";
import { getPageData } from "@/lib/page-service";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("terms");
  return {
    title: page?.seoTitle || page?.title || "Terms and Conditions",
    description: page?.metaDescription || page?.description || "Review the terms and conditions for using Direct2Campus educational consultancy services, including admission facilitation disclaimers.",
    alternates: { canonical: "https://direct2campus.com/terms" },
  };
}

export default async function TermsPage() {
  const page = await getPageData("terms");

  const title = page?.h1 || page?.heading || "Terms of Service";
  const lastUpdated = page?.lastUpdated || "October 2026";
  const content = page?.content || `By accessing the website at https://direct2campus.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.

### Disclaimer
The materials on Direct2Campus's website are provided on an 'as is' basis. Direct2Campus makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

### Admissions Facilitation
We facilitate counseling and management quota admissions. However, final admission grants are subject to the college's administrative discretion and the student's passing of the required background/academic checks.`;

  return (
    <div className="pt-28 pb-20 bg-d2c-white min-h-screen font-dm-sans">
      <div className="content-boundary max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-gray-200/80 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-sora font-bold text-d2c-navy mb-2">{title}</h1>
        <p className="text-xs text-d2c-muted mb-8 pb-4 border-b border-gray-100">Last updated: {lastUpdated}</p>

        <div className="prose prose-slate max-w-none space-y-4 text-gray-700 leading-relaxed">
          {content.split("\n\n").map((chunk: string, idx: number) => {
            const trimmed = chunk.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-xl font-sora font-bold text-d2c-navy mt-6 mb-2">
                  {trimmed.replace(/^###\s+/, "")}
                </h3>
              );
            }

            if (trimmed.startsWith("## ")) {
              return (
                <h2 key={idx} className="text-2xl font-sora font-bold text-d2c-navy mt-8 mb-3">
                  {trimmed.replace(/^##\s+/, "")}
                </h2>
              );
            }

            return <p key={idx}>{trimmed}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
