import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { MapPin, Info, ArrowLeft, PhoneCall, CheckCircle2 } from "lucide-react"
import collegesData from "@/data/colleges.json"
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg"

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const college = collegesData.find(c => c.link === `/colleges/${slug}`)
  
  if (!college) {
    return { title: "College Not Found" }
  }
  
  return {
    title: `${college.name} Direct Admission | Direct2Campus`,
    description: college.description,
  }
}

export default async function CollegeDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const college = collegesData.find(c => c.link === `/colleges/${slug}`)

  if (!college) {
    notFound()
  }

  return (
    <div className="pt-24 pb-20 bg-d2c-white min-h-screen">
      {/* College Hero Header */}
      <div className="container mx-auto px-4 mb-8">
        <Link href="/colleges" className="inline-flex items-center gap-2 text-d2c-muted hover:text-d2c-royal transition-colors mb-6 text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Colleges
        </Link>
        
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-d2c-navy/5 border border-gray-100">
          <div className="h-64 md:h-96 w-full relative bg-d2c-navy overflow-hidden">
            <AnimatedPatternBg opacity={0.08} speed={170} />
            <img 
              src={college.imageUrl} 
              alt={college.name}
              className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-d2c-navy via-d2c-navy/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
              <div className="flex items-center gap-2 text-d2c-sky mb-4 text-sm font-semibold tracking-wider uppercase">
                <MapPin className="w-4 h-4" /> {college.location}
              </div>
              <h1 className="text-3xl md:text-5xl font-sora font-bold text-white max-w-4xl leading-tight">
                {college.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-d2c-royal" />
                About College
              </h2>
              <p className="text-d2c-muted leading-relaxed text-lg">
                {college.description}
              </p>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-d2c-ice rounded-xl p-4 border border-blue-50">
                  <div className="text-sm text-d2c-muted mb-1 font-semibold text-transform uppercase">Accreditation</div>
                  <div className="text-d2c-navy font-bold">UGC, AICTE</div>
                </div>
                <div className="bg-d2c-ice rounded-xl p-4 border border-blue-50">
                  <div className="text-sm text-d2c-muted mb-1 font-semibold text-transform uppercase">Established</div>
                  <div className="text-d2c-navy font-bold">Check official portal</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-4">Admissions & Eligibility</h2>
              <p className="text-d2c-muted leading-relaxed mb-6">
                Admission into {college.name} via the management quota requires minimum eligibility standards to be met. Connect with our expert counselors to get precise details.
              </p>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-3 text-d2c-text">
                  <CheckCircle2 className="w-5 h-5 text-d2c-success shrink-0" />
                  <span>50% aggregate in 10+2 (Physics, Chemistry, Maths)</span>
                </li>
                <li className="flex items-center gap-3 text-d2c-text">
                  <CheckCircle2 className="w-5 h-5 text-d2c-success shrink-0" />
                  <span>A valid rank in respective entrance examinations (or equivalent eligibility constraint)</span>
                </li>
                <li className="flex items-center gap-3 text-d2c-text">
                  <CheckCircle2 className="w-5 h-5 text-d2c-success shrink-0" />
                  <span>Confirmed direct admission availability per branch</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-[400px]">
            <div className="bg-d2c-navy rounded-3xl p-8 sticky top-28 shadow-xl shadow-d2c-navy/20 border-4 border-d2c-royal/30 relative overflow-hidden">
              <AnimatedPatternBg opacity={0.08} speed={180} />
              <div className="inline-block px-3 py-1 bg-d2c-success/20 text-d2c-success font-semibold text-xs rounded-full uppercase tracking-wider mb-4 border border-d2c-success/30">
                Seats Filling Fast
              </div>
              <h3 className="text-2xl font-sora font-bold text-white mb-2">Book Your Seat</h3>
              <p className="text-d2c-ice/80 text-sm mb-6">
                Get guaranteed admission via management quota securely. Schedule your counseling call today.
              </p>
              
              <Link 
                href="/contact"
                className="w-full flex items-center justify-center gap-2 bg-d2c-success hover:bg-[#1DA84B] text-white py-4 rounded-xl font-bold transition-colors shadow-lg shadow-d2c-success/30 mb-4"
              >
                <PhoneCall className="w-5 h-5" /> Consult Counsellor
              </Link>
              
              <Link 
                href="https://wa.me/919876543210"
                className="w-full flex items-center justify-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-bold transition-colors"
                target="_blank"
              >
                Message on WhatsApp
              </Link>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full p-2 flex shrink-0">
                  <img src="https://ui-avatars.com/api/?name=Support&background=3B4CC0&color=fff" alt="Support Agent" className="rounded-full" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Need help?</div>
                  <div className="text-xs text-d2c-sky/80">Our advisors are available 24/7</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
