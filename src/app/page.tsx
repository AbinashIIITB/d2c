import { Metadata } from "next"
import { HeroSection } from "@/components/home/HeroSection"
import { TrustFeatures } from "@/components/home/TrustFeatures"
import { BannerSection } from "@/components/home/BannerSection"
import { AdmissionProcedure3D } from "@/components/home/AdmissionProcedure3D"
import { FeaturedColleges } from "@/components/home/FeaturedColleges"
import { MidPageContact } from "@/components/home/MidPageContact"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { CTASection } from "@/components/home/CTASection"
import { AnnouncementTicker } from "@/components/home/AnnouncementTicker"
import { WelcomeLeadModal } from "@/components/home/WelcomeLeadModal"
import { getPageData } from "@/lib/page-service"

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const homeData = await getPageData("home");
  return {
    title: homeData?.title || "Direct2Campus – Your Shortcut to the Right Campus",
    description:
      homeData?.description ||
      "India's most trusted educational consultancy. Get direct admission guidance for B.Tech, MBBS, MBA & BDS. Compare 150+ partner colleges and secure your seat with expert counselling.",
    alternates: { canonical: "https://direct2campus.com" },
  };
}

export default async function Home() {
  const homeData = await getPageData("home");

  return (
    <main className="flex min-h-screen flex-col">
      {/* Top Announcement Bar (Configurable from Admin) */}
      <AnnouncementTicker announcement={homeData?.announcement} />

      {/* Main Home Sections */}
      <HeroSection heroData={homeData?.hero} statsData={homeData?.stats} />
      <TrustFeatures />
      <BannerSection banners={homeData?.banners} />
      <AdmissionProcedure3D />
      <FeaturedColleges />
      <MidPageContact />
      <TestimonialsSection />
      <CTASection />

      {/* Welcome Lead Popup Modal (Configurable with toggle off by default) */}
      <WelcomeLeadModal config={homeData?.welcomeLeadModal} />
    </main>
  );
}
