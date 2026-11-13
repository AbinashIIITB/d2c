import { Metadata } from "next";
import { getPageData } from "@/lib/page-service";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("privacy");
  return {
    title: page?.seoTitle || page?.title || "Privacy Policy",
    description: page?.metaDescription || page?.description || "Read the Direct2Campus privacy policy. Learn how we collect, use, and protect your personal data when using our educational consultancy services.",
    alternates: { canonical: "https://direct2campus.com/privacy" },
  };
}

export default async function PrivacyPage() {
  const page = await getPageData("privacy");

  const title = page?.h1 || page?.heading || "Privacy Policy";
  const lastUpdated = page?.lastUpdated || "October 2026";
  const content = page?.content || `Your privacy is important to us. It is Direct2Campus's policy to respect your privacy regarding any information we may collect from you across our website, https://direct2campus.com, and other sites we own and operate.

### Information we collect
We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we are collecting it and how it will be used.

### How we use your data
We use your contact details exclusively to provide educational counseling, updates on college criteria, and for lead management internally (via our CMS database). We do not share your information publicly or with third-parties, except when required to by law.`;

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
