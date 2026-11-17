import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Award,
  Bot,
  Briefcase,
  Building2,
  CheckCircle2,
  CreditCard,
  Cpu,
  ExternalLink,
  FileCheck2,
  GraduationCap,
  HelpCircle,
  Laptop,
  MessageSquare,
  Network,
  PhoneCall,
  Radio,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react';
import { CmsIcon } from '@/components/cms/CmsIcon';
import { JsonLd } from '@/lib/cms/seo';
import type { SeoFields } from '@/lib/cms/types';
import type { IemFaqContent } from '@/content/iem-branch.schema';

/** Icons the IEM landing pages import statically (kebab-case keys). Other names an admin picks load dynamically. */
export const IEM_ICONS: Record<string, LucideIcon> = {
  'arrow-right': ArrowRight,
  award: Award,
  bot: Bot,
  briefcase: Briefcase,
  'building-2': Building2,
  'check-circle-2': CheckCircle2,
  'credit-card': CreditCard,
  cpu: Cpu,
  'external-link': ExternalLink,
  'file-check-2': FileCheck2,
  'graduation-cap': GraduationCap,
  'help-circle': HelpCircle,
  laptop: Laptop,
  'message-square': MessageSquare,
  network: Network,
  'phone-call': PhoneCall,
  radio: Radio,
  sparkles: Sparkles,
  wrench: Wrench,
  zap: Zap,
};

/** Editable icon: renders the content icon name, falling back to the icon used today. */
export function I({ n, f, c }: { n?: string; f: LucideIcon; c?: string }) {
  return <CmsIcon name={n} known={IEM_ICONS} fallback={f} className={c} />;
}

export function IemJsonLd({
  seo,
  faqs,
  breadcrumb,
}: {
  seo?: SeoFields;
  faqs: { q: string; a: string }[];
  breadcrumb: { name: string; url: string }[];
}) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumb.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: b.url,
    })),
  };
  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd seo={seo} />
    </>
  );
}

export function IemFaqs({ content }: { content: IemFaqContent }) {
  return (
    <section className="space-y-6 pt-4">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-d2c-royal">{content.eyebrow}</span>
        <h2 className="text-2xl md:text-4xl font-sora font-bold text-d2c-navy flex items-center gap-2.5">
          <I n={content.icon} f={HelpCircle} c="w-7 h-7 text-d2c-royal" />
          <span>{content.heading}</span>
        </h2>
      </div>

      <div className="space-y-4">
        {content.items.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white rounded-2xl p-5 border border-gray-200 transition-all open:bg-blue-50/40 open:border-blue-200 shadow-sm"
          >
            <summary className="font-sora font-bold text-d2c-navy cursor-pointer flex items-center justify-between text-base list-none">
              <span>{faq.q}</span>
              <span className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 group-open:rotate-180 transition-transform text-xs">
                ▼
              </span>
            </summary>
            <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed border-t border-gray-200/60 pt-3">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
