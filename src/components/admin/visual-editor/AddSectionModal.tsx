"use client";

import { useState } from "react";
import { 
  X, 
  Plus, 
  Sparkles, 
  FileText, 
  DollarSign, 
  Calendar, 
  HelpCircle, 
  Video, 
  LayoutGrid, 
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSection: (section: {
    id: string;
    label: string;
    type: string;
    title: string;
    content: any;
  }) => void;
}

const SECTION_TEMPLATES = [
  {
    type: "announcement",
    label: "Announcement / Alert Banner",
    icon: Bell,
    description: "Prominent notice card for urgent admissions, counseling dates, or notices.",
    defaultTitle: "Important Admission Notice",
    defaultContent: "Registrations for next counseling round are now open. Verified seats are filling quickly.",
  },
  {
    type: "richtext",
    label: "Custom Story / Editorial Block",
    icon: FileText,
    description: "Detailed narrative text with formatting, quotes, and accreditation details.",
    defaultTitle: "Academic Legacy & Accreditation",
    defaultContent: "The institution maintains industry-standard laboratories and global academic affiliations.",
  },
  {
    type: "highlights",
    label: "Feature Cards Grid (4-Col)",
    icon: LayoutGrid,
    description: "Modern grid with icons showcasing special facilities or rankings.",
    defaultTitle: "Campus Highlights",
    defaultContent: ["AI & Robotics Innovation Lab", "100% Placement Assistance", "Central Digital Library", "Modern Hostels"],
  },
  {
    type: "dates",
    label: "Key Dates Timeline",
    icon: Calendar,
    description: "Chronological schedule of counseling, exams, and class commencement.",
    defaultTitle: "Key Admission Dates 2026-27",
    defaultContent: [
      { event: "Application Registration", date: "Ongoing" },
      { event: "Counseling Allotment Round 1", date: "June 2026" },
      { event: "Document Verification", date: "July 2026" },
    ],
  },
  {
    type: "faqs",
    label: "Custom FAQ Accordion",
    icon: HelpCircle,
    description: "Targeted question-and-answer section with Google Schema generation.",
    defaultTitle: "Frequently Asked Questions",
    defaultContent: [
      { question: "What documents are required during reporting?", answer: "Original 10th and 12th marksheet, rank scorecard, category certificate, and 6 passport size photos." },
      { question: "Are hostel accommodations guaranteed?", answer: "Hostel rooms are allotted on a first-come, first-served basis with separate facilities for boys and girls." }
    ],
  },
  {
    type: "video",
    label: "Video Tour / Showcase",
    icon: Video,
    description: "Embed virtual campus tour or alumni testimonial video.",
    defaultTitle: "Virtual Campus Tour",
    defaultContent: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export function AddSectionModal({ isOpen, onClose, onAddSection }: AddSectionModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(SECTION_TEMPLATES[0]);
  const [customTitle, setCustomTitle] = useState(SECTION_TEMPLATES[0].defaultTitle);

  if (!isOpen) return null;

  const handleSelect = (tmpl: typeof SECTION_TEMPLATES[0]) => {
    setSelectedTemplate(tmpl);
    setCustomTitle(tmpl.defaultTitle);
  };

  const handleConfirm = () => {
    const id = `custom-section-${Date.now()}`;
    onAddSection({
      id,
      label: customTitle || selectedTemplate.label,
      type: selectedTemplate.type,
      title: customTitle || selectedTemplate.defaultTitle,
      content: selectedTemplate.defaultContent,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#0B1120] text-white rounded-3xl border border-white/[0.12] shadow-2xl w-full max-w-2xl overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f6c804]/15 flex items-center justify-center text-[#f6c804]">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-sora font-bold text-white">Add New Page Section</h3>
              <p className="text-xs text-white/50">Choose a section type to insert into your page preview</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SECTION_TEMPLATES.map((tmpl) => {
              const Icon = tmpl.icon;
              const isSelected = selectedTemplate.type === tmpl.type;
              return (
                <div
                  key={tmpl.type}
                  onClick={() => handleSelect(tmpl)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#3B4CC0]/20 border-[#3B4CC0] shadow-md ring-1 ring-[#3B4CC0]"
                      : "bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${isSelected ? "bg-[#3B4CC0] text-white" : "bg-white/[0.08] text-white/70"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{tmpl.label}</h4>
                      <p className="text-xs text-white/50 mt-1 leading-snug">{tmpl.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section Title Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
              Section Title (H2 Heading)
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="e.g. Campus Highlights & Infrastructure"
              className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#3B4CC0]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex items-center justify-end gap-3 bg-black/20">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="text-white/60 hover:text-white hover:bg-white/[0.06]"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="bg-[#f6c804] hover:bg-[#e5b703] text-[#0B1120] font-bold px-6"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Insert Section
          </Button>
        </div>
      </div>
    </div>
  );
}
