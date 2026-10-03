"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ApplyModal } from "@/components/layout/ApplyModal";

export function ExamApplyButton({ examName }: { examName: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="font-sora font-bold text-d2c-royal text-xl leading-tight hover:underline flex items-center gap-2 text-left"
      >
        Apply Here <ArrowRight className="w-4 h-4" />
      </button>

      <ApplyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        context={`Exam: ${examName}`} 
      />
    </>
  );
}
