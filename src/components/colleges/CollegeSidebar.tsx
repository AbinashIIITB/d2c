import Link from "next/link"
import { PhoneCall, Zap } from "lucide-react"
import { CollegeEnquiryForm } from "@/components/ui/CollegeEnquiryForm"
import { ScrollSpyTOC } from "@/components/ui/ScrollSpyTOC"

interface CollegeSidebarProps {
  collegeName: string;
  sections: Array<{ id: string; label: string; iconName: string }>;
}

export function CollegeSidebar({ collegeName, sections }: CollegeSidebarProps) {
  return (
    <div className="lg:col-span-4 h-full">
      <div className="hidden lg:block sticky top-24 pb-8 space-y-5 mb-8">
        
        {/* Enquiry Form — Premium Glassmorphic */}
        <div id="enquiry-form" className="bg-[#0B1120] rounded-[1.25rem] p-6 relative overflow-hidden shadow-[0_24px_48px_-12px_rgba(11,17,32,0.5)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(246,200,4,0.06),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,76,192,0.1),transparent_50%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f6c804]/30 to-transparent" />
          
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#22c55e]/10 text-[#22c55e] rounded-lg text-[10px] font-bold tracking-[0.1em] uppercase border border-[#22c55e]/20 mb-3">
              <Zap className="w-3 h-3" /> Admission Open
            </span>
            <h3 className="text-lg font-sora font-bold text-white mb-1.5">Apply for Admission</h3>
            <p className="text-white/30 text-xs mb-5 leading-relaxed">
              Enter your details. Our admission counselor will reach out within 24 hours.
            </p>
            <CollegeEnquiryForm collegeName={collegeName} />
            
            <div className="mt-5 pt-5 border-t border-white/[0.06] flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <PhoneCall className="w-4 h-4 text-[#f6c804]" />
              </div>
              <div>
                <p className="text-[9px] text-white/30 uppercase tracking-[0.1em] font-bold">Urgent?</p>
                <Link href="tel:+916200325137" className="text-sm font-bold text-white hover:text-[#f6c804] transition-colors">
                  +91 62003 25137
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Table of Contents - Compressed to fit below Form */}
        <ScrollSpyTOC sections={sections} className="!max-h-[35vh] lg:!max-h-[35vh]" />
        
      </div>

      {/* Mobile Enquiry */}
      <div className="lg:hidden mt-8">
        <div className="bg-[#0B1120] rounded-[1.25rem] p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,76,192,0.1),transparent_60%)]" />
          <div className="relative z-10">
            <h3 className="text-xl font-sora font-bold text-white mb-6">Enquire Now</h3>
            <CollegeEnquiryForm collegeName={collegeName} />
          </div>
        </div>
      </div>
    </div>
  )
}
