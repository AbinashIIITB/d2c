import { Metadata } from "next";
import { getContent } from "@/lib/cms/content";
import { buildMetadata } from "@/lib/cms/seo";
import type { PrivacyContent } from "@/content/privacy";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContent<PrivacyContent>("privacy");
  return buildMetadata(page.seo, { path: "/privacy" });
}

export default async function PrivacyPage() {
  const page = await getContent<PrivacyContent>("privacy");

  const title = page.heading;
  const lastUpdated = page.lastUpdated;
  const content = page.content ?? "";
  const isHtml = /<\/?(p|h[1-6]|ul|ol|li|br|div|strong|em|a|blockquote)\b/i.test(content);

  return (
    <div className="pt-28 pb-20 bg-d2c-white min-h-screen font-dm-sans">
      <div className="content-boundary max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-gray-200/80 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-sora font-bold text-d2c-navy mb-2">{title}</h1>
        <p className="text-xs text-d2c-muted mb-8 pb-4 border-b border-gray-100">Last updated: {lastUpdated}</p>

        {isHtml ? (
          <div
            className="prose prose-slate max-w-none space-y-4 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
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
        )}
      </div>
    </div>
  );
}
