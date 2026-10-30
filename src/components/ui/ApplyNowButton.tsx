"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, ChevronRight } from "lucide-react";
import { ApplyModal } from "@/components/layout/ApplyModal";
import { trackApplyClick } from "@/lib/gtag";

export function ApplyNowButton({ collegeName }: { collegeName: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    trackApplyClick({ collegeName, location: "College Hero" });
    setIsModalOpen(true);
  };

  return (
    <>
      <Button 
        onClick={handleClick}
        className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold h-12 px-8 rounded-xl shadow-[0_8px_24px_-4px_rgba(34,197,94,0.4)] hover:shadow-[0_12px_32px_-4px_rgba(34,197,94,0.5)] transition-all duration-300 hover:-translate-y-0.5"
      >
        <GraduationCap className="w-5 h-5 mr-2" /> Apply Now
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>

      <ApplyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        context={`College: ${collegeName}`} 
      />
    </>
  );
}
