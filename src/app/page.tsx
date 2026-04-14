import { HeroSection } from "@/components/home/HeroSection"
import { TrustFeatures } from "@/components/home/TrustFeatures"
import { BannerSection } from "@/components/home/BannerSection"
import { AdmissionProcedure3D } from "@/components/home/AdmissionProcedure3D"
import { FeaturedColleges } from "@/components/home/FeaturedColleges"
import { MidPageContact } from "@/components/home/MidPageContact"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { CTASection } from "@/components/home/CTASection"


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <TrustFeatures />
      <BannerSection />
      <AdmissionProcedure3D />

      <FeaturedColleges />
      <MidPageContact />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}
