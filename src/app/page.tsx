import { HeroSection } from "@/components/home/HeroSection"
import { BannerSection } from "@/components/home/BannerSection"
import { AdmissionProcedure3D } from "@/components/home/AdmissionProcedure3D"
import { FeaturedColleges } from "@/components/home/FeaturedColleges"
import { MidPageContact } from "@/components/home/MidPageContact"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { StatesCoverage } from "@/components/home/StatesCoverage"
import { CTASection } from "@/components/home/CTASection"
import { LogoShowcase } from "@/components/home/LogoShowcase"


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <BannerSection />
      <AdmissionProcedure3D />

      <FeaturedColleges />
      <MidPageContact />
      <TestimonialsSection />
      <StatesCoverage />
      <LogoShowcase />
      <CTASection />
    </main>
  )
}
