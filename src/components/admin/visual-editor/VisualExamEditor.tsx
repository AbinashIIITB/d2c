"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Smartphone,
  Tablet,
  Monitor,
  Eye,
  Sliders,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MoveUp,
  MoveDown,
  EyeOff,
  Plus,
  Image as ImageIcon,
  BookOpen,
  Calendar,
  HelpCircle,
  Shield,
  Trash2,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypographyToolbar } from "./TypographyToolbar";
import { ImagePickerModal } from "./ImagePickerModal";
import { AddSectionModal } from "./AddSectionModal";
import { ExamEditForm } from "../ExamEditForm";

interface VisualExamEditorProps {
  initialData: any;
  isNew?: boolean;
}

export function VisualExamEditor({ initialData, isNew = false }: VisualExamEditorProps) {
  const router = useRouter();

  const [editorMode, setEditorMode] = useState<"visual" | "form">("visual");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const [examData, setExamData] = useState<any>({
    ...initialData,
    customSections: initialData.customSections || [],
    sectionOrder: initialData.sectionOrder || [
      "overview",
      "pattern",
      "dates",
      "eligibility",
      "faqs"
    ],
    hiddenSections: initialData.hiddenSections || []
  });

  const [selectedElement, setSelectedElement] = useState<{
    id: string;
    label: string;
    styles: {
      fontSize?: string;
      fontWeight?: string;
      color?: string;
      textAlign?: string;
    };
  } | null>(null);

  const [imagePicker, setImagePicker] = useState<{
    isOpen: boolean;
    title: string;
    currentUrl: string;
    onSelect: (url: string) => void;
  }>({
    isOpen: false,
    title: "Change Exam Logo",
    currentUrl: "",
    onSelect: () => {}
  });

  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const updateField = (field: string, value: any) => {
    setExamData((prev: any) => ({ ...prev, [field]: value }));
  };

  const moveSection = (sectionId: string, direction: "up" | "down") => {
    const order = [...(examData.sectionOrder || [])];
    const currentIndex = order.indexOf(sectionId);
    if (currentIndex === -1) return;

    if (direction === "up" && currentIndex > 0) {
      const temp = order[currentIndex - 1];
      order[currentIndex - 1] = order[currentIndex];
      order[currentIndex] = temp;
    } else if (direction === "down" && currentIndex < order.length - 1) {
      const temp = order[currentIndex + 1];
      order[currentIndex + 1] = order[currentIndex];
      order[currentIndex] = temp;
    }
    updateField("sectionOrder", order);
  };

  const toggleSectionVisibility = (sectionId: string) => {
    const hidden = new Set(examData.hiddenSections || []);
    if (hidden.has(sectionId)) {
      hidden.delete(sectionId);
    } else {
      hidden.add(sectionId);
    }
    updateField("hiddenSections", Array.from(hidden));
  };

  const handleAddSection = (sectionTemplate: any) => {
    const newSectionId = `custom-${Date.now()}`;
    const newSection = { id: newSectionId, ...sectionTemplate };
    setExamData((prev: any) => ({
      ...prev,
      customSections: [...(prev.customSections || []), newSection],
      sectionOrder: [...(prev.sectionOrder || []), newSectionId]
    }));
  };

  const removeCustomSection = (id: string) => {
    setExamData((prev: any) => ({
      ...prev,
      customSections: (prev.customSections || []).filter((s: any) => s.id !== id),
      sectionOrder: (prev.sectionOrder || []).filter((sId: string) => sId !== id)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      const url = isNew ? "/api/admin/exams" : `/api/admin/exams/${examData.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(examData)
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to save exam details");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
      router.refresh();
    } catch (err: any) {
      setSaveError(err.message || "An unexpected error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (editorMode === "form") {
    return (
      <div className="space-y-4">
        <div className="bg-[#0B1120] text-white p-4 rounded-2xl flex items-center justify-between border border-white/10 shadow-lg">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditorMode("visual")}
            className="bg-d2c-royal hover:bg-blue-600 text-white border-none gap-2 font-semibold shadow-sm"
          >
            <Eye className="w-4 h-4" />
            Switch to Live Visual Canvas
          </Button>
          {examData.slug && (
            <Link
              href={`/exams/${examData.slug}`}
              target="_blank"
              className="text-xs text-white/70 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
            >
              <ExternalLink className="w-3.5 h-3.5 text-d2c-gold" />
              View Public Page
            </Link>
          )}
        </div>
        <ExamEditForm initialData={examData} isNew={isNew} />
      </div>
    );
  }

  const isHidden = (id: string) => (examData.hiddenSections || []).includes(id);

  const canvasWidthClass = {
    desktop: "w-full max-w-5xl",
    tablet: "w-[768px] max-w-full shadow-2xl border-x-4 border-gray-800 rounded-3xl overflow-hidden my-4",
    mobile: "w-[390px] max-w-full shadow-2xl border-x-4 border-y-8 border-gray-800 rounded-[2.5rem] overflow-hidden my-4"
  }[deviceMode];

  return (
    <div className="min-h-screen pb-24 font-dm-sans bg-slate-100/70 -m-6 p-6">
      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-40 bg-[#0B1120] text-white border-b border-white/10 px-6 py-3.5 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4 mb-6 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/exams"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-base font-bold text-white font-sora truncate max-w-xs md:max-w-md">
                {examData.name || "Untitled Exam"}
              </h1>
              <span className="text-[10px] bg-d2c-royal/80 px-2 py-0.5 rounded-full text-white font-semibold uppercase tracking-wider">
                Live Exam Canvas
              </span>
            </div>
            <p className="text-[11px] text-white/50">Click any text to edit inline</p>
          </div>
        </div>

        {/* Device Switcher & Actions */}
        <div className="flex items-center gap-3">
          <div className="bg-black/30 p-1 rounded-xl flex items-center gap-1 border border-white/10">
            <button
              onClick={() => setDeviceMode("desktop")}
              className={`p-2 rounded-lg text-xs ${deviceMode === "desktop" ? "bg-d2c-royal text-white" : "text-white/60 hover:text-white"}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode("tablet")}
              className={`p-2 rounded-lg text-xs ${deviceMode === "tablet" ? "bg-d2c-royal text-white" : "text-white/60 hover:text-white"}`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode("mobile")}
              className={`p-2 rounded-lg text-xs ${deviceMode === "mobile" ? "bg-d2c-royal text-white" : "text-white/60 hover:text-white"}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditorMode("form")}
            className="bg-white/5 hover:bg-white/10 text-white border-white/15 gap-1.5 text-xs font-medium"
          >
            <Sliders className="w-3.5 h-3.5 text-d2c-gold" />
            Form Tabs
          </Button>

          <Button
            size="sm"
            onClick={() => setIsAddSectionOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 text-xs font-semibold shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Section
          </Button>

          {examData.slug && (
            <Link
              href={`/exams/${examData.slug}`}
              target="_blank"
              className="text-xs text-white/70 hover:text-white flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10"
            >
              <ExternalLink className="w-3.5 h-3.5 text-d2c-gold" />
              Public Link
            </Link>
          )}

          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-d2c-royal to-blue-600 hover:from-blue-600 hover:to-d2c-royal text-white text-xs font-bold gap-2 px-5 py-2 rounded-xl shadow-lg"
          >
            {saving ? "Saving..." : "Save Exam"}
          </Button>
        </div>
      </header>

      {/* Floating Notifications */}
      {saveSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <p className="text-sm font-bold">Exam Updated Successfully!</p>
        </div>
      )}
      {saveError && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-200" />
          <p className="text-sm font-bold">{saveError}</p>
        </div>
      )}

      {/* Typography Toolbar */}
      {selectedElement && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <TypographyToolbar
            activeElementLabel={selectedElement.label}
            currentStyles={selectedElement.styles}
            onStyleChange={(prop, val) => {
              setSelectedElement((prev) => prev ? {
                ...prev,
                styles: { ...prev.styles, [prop]: val }
              } : null);
            }}
            onClose={() => setSelectedElement(null)}
          />
        </div>
      )}

      {/* Canvas */}
      <div className="flex justify-center transition-all duration-300">
        <div className={`${canvasWidthClass} bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/80`}>
          
          {/* Hero Banner */}
          <div className="bg-[#0B1120] text-white p-8 md:p-10 border-b border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div
                onClick={() => {
                  setImagePicker({
                    isOpen: true,
                    title: "Change Exam Logo",
                    currentUrl: examData.logoUrl || examData.logo_url || "",
                    onSelect: (url) => updateField("logoUrl", url)
                  });
                }}
                className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 p-2 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all overflow-hidden"
              >
                {examData.logoUrl || examData.logo_url ? (
                  <img src={examData.logoUrl || examData.logo_url} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-d2c-gold" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={examData.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="text-2xl md:text-3xl font-sora font-extrabold text-white bg-transparent border-b border-transparent focus:border-d2c-gold outline-none w-full"
                  placeholder="Exam Name (e.g. WBJEE 2027)"
                />
                <input
                  type="text"
                  value={examData.fullName || examData.full_name || ""}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="text-xs text-d2c-gold bg-transparent border-b border-transparent focus:border-d2c-gold outline-none w-full mt-1"
                  placeholder="Full Exam Name (e.g. West Bengal Joint Entrance Examination)"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
              <div className="p-3 rounded-xl bg-white/5">
                <span className="text-[10px] text-white/50 block uppercase">Exam Date</span>
                <input
                  type="text"
                  value={examData.date || ""}
                  onChange={(e) => updateField("date", e.target.value)}
                  placeholder="e.g. April 2027"
                  className="w-full bg-transparent font-bold text-white outline-none"
                />
              </div>
              <div className="p-3 rounded-xl bg-white/5">
                <span className="text-[10px] text-white/50 block uppercase">Application Link</span>
                <input
                  type="text"
                  value={examData.applicationLink || examData.application_link || ""}
                  onChange={(e) => updateField("applicationLink", e.target.value)}
                  placeholder="Official URL"
                  className="w-full bg-transparent font-bold text-d2c-gold outline-none truncate"
                />
              </div>
            </div>
          </div>

          {/* Ordered Sections */}
          <div className="p-6 md:p-8 space-y-8">
            {(examData.sectionOrder || []).map((sectionId: string, idx: number) => {
              if (isHidden(sectionId)) return null;

              const renderControls = (title: string) => (
                <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-100">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{title}</span>
                  <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
                    <button onClick={() => moveSection(sectionId, "up")} disabled={idx === 0} className="p-1 text-gray-500 hover:text-gray-900">
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => moveSection(sectionId, "down")} disabled={idx === (examData.sectionOrder || []).length - 1} className="p-1 text-gray-500 hover:text-gray-900">
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => toggleSectionVisibility(sectionId)} className="p-1 text-gray-500 hover:text-amber-600">
                      <EyeOff className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );

              if (sectionId === "overview") {
                return (
                  <section key={sectionId} className="bg-white p-6 rounded-2xl border border-gray-200">
                    {renderControls("Overview & About Exam")}
                    <textarea
                      rows={4}
                      value={examData.aboutExam || examData.about_exam || examData.description || ""}
                      onChange={(e) => {
                        updateField("aboutExam", e.target.value);
                        updateField("description", e.target.value);
                      }}
                      className="w-full text-xs text-gray-800 bg-gray-50 p-3 rounded-xl border border-gray-200 outline-none focus:border-d2c-royal leading-relaxed"
                      placeholder="Comprehensive overview of the exam..."
                    />
                  </section>
                );
              }

              if (sectionId === "pattern") {
                const pattern = examData.examPattern || examData.exam_pattern || {};
                return (
                  <section key={sectionId} className="bg-white p-6 rounded-2xl border border-gray-200">
                    {renderControls("Exam Pattern & Structure")}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-[10px] text-gray-500 block">Exam Mode</span>
                        <input
                          type="text"
                          value={pattern.mode || "Offline (OMR Based)"}
                          onChange={(e) => updateField("examPattern", { ...pattern, mode: e.target.value })}
                          className="font-bold text-gray-900 bg-transparent outline-none w-full"
                        />
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-[10px] text-gray-500 block">Duration</span>
                        <input
                          type="text"
                          value={pattern.duration || "4 Hours"}
                          onChange={(e) => updateField("examPattern", { ...pattern, duration: e.target.value })}
                          className="font-bold text-gray-900 bg-transparent outline-none w-full"
                        />
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-[10px] text-gray-500 block">Total Questions</span>
                        <input
                          type="text"
                          value={pattern.totalQuestions || "155"}
                          onChange={(e) => updateField("examPattern", { ...pattern, totalQuestions: e.target.value })}
                          className="font-bold text-gray-900 bg-transparent outline-none w-full"
                        />
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-[10px] text-gray-500 block">Total Marks</span>
                        <input
                          type="text"
                          value={pattern.totalMarks || "200"}
                          onChange={(e) => updateField("examPattern", { ...pattern, totalMarks: e.target.value })}
                          className="font-bold text-gray-900 bg-transparent outline-none w-full"
                        />
                      </div>
                    </div>
                  </section>
                );
              }

              if (sectionId === "dates") {
                return (
                  <section key={sectionId} className="bg-white p-6 rounded-2xl border border-gray-200">
                    {renderControls("Important Exam Timeline & Dates")}
                    <div className="space-y-2">
                      {(examData.importantDates || examData.important_dates || []).map((d: any, i: number) => (
                        <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-200">
                          <input
                            type="text"
                            value={d.event || ""}
                            onChange={(e) => {
                              const updated = [...(examData.importantDates || examData.important_dates || [])];
                              updated[i] = { ...updated[i], event: e.target.value };
                              updateField("importantDates", updated);
                            }}
                            className="flex-1 font-semibold text-xs text-gray-800 bg-transparent outline-none"
                            placeholder="Event description"
                          />
                          <input
                            type="text"
                            value={d.date || ""}
                            onChange={(e) => {
                              const updated = [...(examData.importantDates || examData.important_dates || [])];
                              updated[i] = { ...updated[i], date: e.target.value };
                              updateField("importantDates", updated);
                            }}
                            className="w-36 text-xs text-d2c-royal font-bold bg-white p-1 rounded border border-gray-200"
                            placeholder="Date / Month"
                          />
                          <button
                            onClick={() => {
                              const updated = (examData.importantDates || examData.important_dates || []).filter((_: any, idx: number) => idx !== i);
                              updateField("importantDates", updated);
                            }}
                            className="text-gray-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const updated = [...(examData.importantDates || examData.important_dates || []), { event: "Result Announcement", date: "May 2027" }];
                          updateField("importantDates", updated);
                        }}
                        className="text-xs h-7 mt-2"
                      >
                        + Add Timeline Date
                      </Button>
                    </div>
                  </section>
                );
              }

              if (sectionId === "faqs") {
                return (
                  <section key={sectionId} className="bg-white p-6 rounded-2xl border border-gray-200">
                    {renderControls("Frequently Asked Questions")}
                    <div className="space-y-3">
                      {(examData.faqs || []).map((faq: any, i: number) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={faq.question || ""}
                              onChange={(e) => {
                                const faqs = [...(examData.faqs || [])];
                                faqs[i] = { ...faqs[i], question: e.target.value };
                                updateField("faqs", faqs);
                              }}
                              className="w-full font-bold text-xs text-gray-900 bg-transparent outline-none"
                              placeholder="FAQ Question"
                            />
                            <button
                              onClick={() => {
                                const faqs = (examData.faqs || []).filter((_: any, idx: number) => idx !== i);
                                updateField("faqs", faqs);
                              }}
                              className="text-gray-400 hover:text-red-500 p-1 ml-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            value={faq.answer || ""}
                            onChange={(e) => {
                              const faqs = [...(examData.faqs || [])];
                              faqs[i] = { ...faqs[i], answer: e.target.value };
                              updateField("faqs", faqs);
                            }}
                            className="w-full text-xs text-gray-700 bg-white p-2 rounded border border-gray-200 outline-none"
                            placeholder="FAQ Answer"
                          />
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const faqs = [...(examData.faqs || []), { question: "What is the eligibility for this exam?", answer: "Candidates must have passed 10+2 with minimum 45% marks in Physics, Chemistry and Mathematics." }];
                          updateField("faqs", faqs);
                        }}
                        className="text-xs h-7"
                      >
                        + Add FAQ
                      </Button>
                    </div>
                  </section>
                );
              }

              return null;
            })}
          </div>

          <div className="p-6 bg-slate-50 border-t border-gray-200 text-center">
            <Button
              onClick={() => setIsAddSectionOpen(true)}
              className="bg-d2c-royal hover:bg-blue-700 text-white gap-2 text-xs font-semibold px-6 py-2 rounded-xl"
            >
              <Plus className="w-4 h-4" />
              Add Section to Exam Page
            </Button>
          </div>

        </div>
      </div>

      <ImagePickerModal
        isOpen={imagePicker.isOpen}
        title={imagePicker.title}
        currentUrl={imagePicker.currentUrl}
        onClose={() => setImagePicker((prev) => ({ ...prev, isOpen: false }))}
        onSelectImage={(url) => {
          imagePicker.onSelect(url);
          setImagePicker((prev) => ({ ...prev, isOpen: false }));
        }}
      />

      <AddSectionModal
        isOpen={isAddSectionOpen}
        onClose={() => setIsAddSectionOpen(false)}
        onAddSection={handleAddSection}
      />
    </div>
  );
}
