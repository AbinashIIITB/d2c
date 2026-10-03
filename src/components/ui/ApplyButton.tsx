"use client";

import { useState } from "react";
import { ApplyModal } from "@/components/layout/ApplyModal";

export function ApplyButton({ children, className, context = "Apply Now" }: { children: React.ReactNode, className?: string, context?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={(e) => {
          e.preventDefault();
          setIsModalOpen(true);
        }}
        className={className}
      >
        {children}
      </button>

      <ApplyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        context={context} 
      />
    </>
  );
}
