import { HeroSection } from "@/components/home/HeroSection"
import { AdmissionProcedure3D } from "@/components/home/AdmissionProcedure3D"
import { WhyChooseUs } from "@/components/home/WhyChooseUs"
import { FeaturedColleges } from "@/components/home/FeaturedColleges"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { StatesCoverage } from "@/components/home/StatesCoverage"
import { CTASection } from "@/components/home/CTASection"


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />


      <WhyChooseUs />
      <AdmissionProcedure3D />

      <FeaturedColleges />
      <TestimonialsSection />
      <StatesCoverage />
      <CTASection />
    </main>
  )
}
