"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ApplyModal } from "@/components/layout/ApplyModal";
import { useSiteContent } from "@/components/cms/SiteContentProvider";

export function ExamApplyButton({ examName }: { examName: string }) {
  const { modals } = useSiteContent();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="font-sora font-bold text-d2c-royal text-xl leading-tight hover:underline flex items-center gap-2 text-left"
      >
        {modals.applyButtons.examApplyLabel} <ArrowRight className="w-4 h-4" />
      </button>

      <ApplyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        context={`Exam: ${examName}`} 
      />
    </>
  );
}
