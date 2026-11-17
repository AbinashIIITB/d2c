import { Metadata } from "next"
import { HeroSection } from "@/components/home/HeroSection"
import { TrustFeatures } from "@/components/home/TrustFeatures"
import { BannerSection } from "@/components/home/BannerSection"
import { AdmissionProcedure3D } from "@/components/home/AdmissionProcedure3D"
import { FeaturedColleges } from "@/components/home/FeaturedColleges"
import { MidPageContact } from "@/components/home/MidPageContact"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { CTASection } from "@/components/home/CTASection"
import { WelcomeLeadModal } from "@/components/home/WelcomeLeadModal"
import { AnnouncementTicker } from "@/components/home/AnnouncementTicker"
import { getContent } from "@/lib/cms/content"
import { buildMetadata, JsonLd } from "@/lib/cms/seo"
import type { HomeContent } from "@/content/home.defaults"
import type { TestimonialsContent } from "@/content/testimonials.defaults"

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const home = await getContent<HomeContent>("home");
  return buildMetadata(home.seo, { path: "/" });
}

export default async function Home() {
  const [home, testimonials] = await Promise.all([
    getContent<HomeContent>("home"),
    getContent<TestimonialsContent>("testimonials"),
  ]);

  return (
    <main className="flex min-h-screen flex-col">
      <JsonLd seo={home.seo} />

      {/* Optional announcement bar (hidden unless enabled in the admin) */}
      {home.announcement?.enabled && <AnnouncementTicker announcement={home.announcement} />}

      {/* Main Home Sections */}
      <HeroSection content={home.hero} />
      <TrustFeatures content={home.trust} />
      <BannerSection banners={home.banners.slides} enabled={home.banners.enabled ?? true} />
      <AdmissionProcedure3D content={home.procedure} />
      <FeaturedColleges content={home.featuredColleges} />
      <MidPageContact content={home.contact} />
      <TestimonialsSection content={testimonials} />
      <CTASection content={home.cta} />

      {/* Welcome Lead Popup Modal (configurable, off by default) */}
      <WelcomeLeadModal config={home.welcomeModal} />
    </main>
  );
}
