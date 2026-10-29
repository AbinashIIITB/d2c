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
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MoveUp,
  MoveDown,
  EyeOff,
  Plus,
  Image as ImageIcon,
  Type,
  Building2,
  DollarSign,
  TrendingUp,
  ClipboardList,
  Award,
  Users,
  HelpCircle,
  Shield,
  MapPin,
  Trash2,
  Calendar,
  Layers,
  PhoneCall,
  ChevronRight,
  Star,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypographyToolbar } from "./TypographyToolbar";
import { ImagePickerModal } from "./ImagePickerModal";
import { AddSectionModal } from "./AddSectionModal";
import { CollegeEditForm } from "../CollegeEditForm";
import { ResponsiveCanvasWrapper } from "./ResponsiveCanvasWrapper";
import { isIEMCollege } from "@/lib/iem-priority";
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg";

interface VisualCollegeEditorProps {
  initialData: any;
  isNew?: boolean;
}

export function VisualCollegeEditor({ initialData, isNew = false }: VisualCollegeEditorProps) {
  const router = useRouter();

  // Mode: "visual" | "form"
  const [editorMode, setEditorMode] = useState<"visual" | "form">("visual");

  // Device canvas: "desktop" | "tablet" | "mobile"
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // College Data State
  const [collegeData, setCollegeData] = useState<any>({
    ...initialData,
    customSections: initialData.customSections || [],
    sectionOrder: initialData.sectionOrder || [
      "admissions",
      "courses-fees",
      "btech-fees",
      "placements",
      "overview",
      "infrastructure",
      "scholarships",
      "alumni",
      "faqs"
    ],
    hiddenSections: initialData.hiddenSections || []
  });

  // Active element selection for typography
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

  // Image Picker Modal State
  const [imagePicker, setImagePicker] = useState<{
    isOpen: boolean;
    title: string;
    currentUrl: string;
    onSelect: (url: string) => void;
  }>({
    isOpen: false,
    title: "Change Image",
    currentUrl: "",
    onSelect: () => {}
  });

  // Add Section Modal State
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);

  // Save State
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Update deep field
  const updateField = (field: string, value: any) => {
    setCollegeData((prev: any) => ({ ...prev, [field]: value }));
  };

  // Update Section Headings
  const updateHeading = (key: string, value: string) => {
    setCollegeData((prev: any) => {
      const headings = { ...(prev.sectionHeadings || prev.seo?.sectionHeadings || {}) };
      headings[key] = value;
      return {
        ...prev,
        sectionHeadings: headings,
        seo: {
          ...(prev.seo || {}),
          sectionHeadings: headings
        }
      };
    });
  };

  // Section Reordering
  const moveSection = (sectionId: string, direction: "up" | "down") => {
    const order = [...(collegeData.sectionOrder || [])];
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

  // Section Visibility Toggle
  const toggleSectionVisibility = (sectionId: string) => {
    const hidden = new Set(collegeData.hiddenSections || []);
    if (hidden.has(sectionId)) {
      hidden.delete(sectionId);
    } else {
      hidden.add(sectionId);
    }
    updateField("hiddenSections", Array.from(hidden));
  };

  // Add Custom Section
  const handleAddSection = (sectionTemplate: any) => {
    const newSectionId = `custom-${Date.now()}`;
    const newSection = {
      id: newSectionId,
      ...sectionTemplate
    };
    const updatedCustom = [...(collegeData.customSections || []), newSection];
    const updatedOrder = [...(collegeData.sectionOrder || []), newSectionId];
    setCollegeData((prev: any) => ({
      ...prev,
      customSections: updatedCustom,
      sectionOrder: updatedOrder
    }));
  };

  // Remove Custom Section
  const removeCustomSection = (id: string) => {
    const updatedCustom = (collegeData.customSections || []).filter((s: any) => s.id !== id);
    const updatedOrder = (collegeData.sectionOrder || []).filter((sId: string) => sId !== id);
    setCollegeData((prev: any) => ({
      ...prev,
      customSections: updatedCustom,
      sectionOrder: updatedOrder
    }));
  };

  // Save handler
  const handleSave = async () => {
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      const url = isNew ? "/api/admin/colleges" : `/api/admin/colleges/${collegeData.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collegeData)
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to save college details");
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

  // If user switches to full structured form view
  if (editorMode === "form") {
    return (
      <div className="space-y-4">
        <div className="bg-[#0B1120] text-white p-4 rounded-2xl flex items-center justify-between border border-white/10 shadow-lg">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditorMode("visual")}
              className="bg-d2c-royal hover:bg-blue-600 text-white border-none gap-2 font-semibold shadow-sm"
            >
              <Eye className="w-4 h-4" />
              Switch to Live Visual Canvas
            </Button>
            <span className="text-xs text-white/60">
              Editing mode: <strong className="text-d2c-gold">Structured Form View</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            {collegeData.slug && (
              <Link
                href={`/colleges/${collegeData.slug}`}
                target="_blank"
                className="text-xs text-white/70 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
              >
                <ExternalLink className="w-3.5 h-3.5 text-d2c-gold" />
                View Public Page
              </Link>
            )}
          </div>
        </div>
        <CollegeEditForm initialData={collegeData} isNew={isNew} />
      </div>
    );
  }

  // Visual Editor Live Canvas View
  const headings = collegeData.sectionHeadings || collegeData.seo?.sectionHeadings || {};
  const isHidden = (id: string) => (collegeData.hiddenSections || []).includes(id);

  // Device width class
  const canvasWidthClass = {
    desktop: "w-full max-w-6xl",
    tablet: "w-[768px] max-w-full shadow-2xl border-x-4 border-gray-800 rounded-3xl overflow-hidden my-4",
    mobile: "w-[390px] max-w-full shadow-2xl border-x-4 border-y-8 border-gray-800 rounded-[2.5rem] overflow-hidden my-4"
  }[deviceMode];

  return (
    <div className="min-h-screen pb-24 font-dm-sans bg-slate-100/70 -m-6 p-6">
      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-40 bg-[#0B1120] text-white border-b border-white/10 px-6 py-3.5 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4 mb-6 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/colleges"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            title="Back to Colleges"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-base font-bold text-white font-sora truncate max-w-xs md:max-w-md">
                {collegeData.name || "Untitled College"}
              </h1>
              <span className="text-[10px] bg-d2c-royal/80 px-2 py-0.5 rounded-full text-white font-semibold uppercase tracking-wider">
                Live Preview Editor
              </span>
            </div>
            <p className="text-[11px] text-white/50">
              Click any text to edit inline • Hover sections for reorder & visibility
            </p>
          </div>
        </div>

        {/* Center: Device Switcher & Form Mode */}
        <div className="flex items-center gap-3">
          <div className="bg-black/30 p-1 rounded-xl flex items-center gap-1 border border-white/10">
            <button
              onClick={() => setDeviceMode("desktop")}
              className={`p-2 rounded-lg text-xs font-medium transition-all ${
                deviceMode === "desktop" ? "bg-d2c-royal text-white shadow" : "text-white/60 hover:text-white"
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode("tablet")}
              className={`p-2 rounded-lg text-xs font-medium transition-all ${
                deviceMode === "tablet" ? "bg-d2c-royal text-white shadow" : "text-white/60 hover:text-white"
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode("mobile")}
              className={`p-2 rounded-lg text-xs font-medium transition-all ${
                deviceMode === "mobile" ? "bg-d2c-royal text-white shadow" : "text-white/60 hover:text-white"
              }`}
              title="Mobile View (390px)"
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
        </div>

        {/* Right: Actions & Save */}
        <div className="flex items-center gap-3">
          {collegeData.slug && (
            <Link
              href={`/colleges/${collegeData.slug}`}
              target="_blank"
              className="text-xs text-white/70 hover:text-white flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10"
              title="Open public page in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-d2c-gold" />
              Public Link
            </Link>
          )}

          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-d2c-royal to-blue-600 hover:from-blue-600 hover:to-d2c-royal text-white text-xs font-bold gap-2 px-5 py-2 rounded-xl shadow-lg shadow-blue-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {saving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Floating Alerts */}
      {saveSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <div>
            <p className="text-sm font-bold">Changes Published Successfully!</p>
            <p className="text-xs text-emerald-100">Live college page preview and database updated.</p>
          </div>
        </div>
      )}

      {saveError && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <AlertCircle className="w-5 h-5 text-red-200" />
          <div>
            <p className="text-sm font-bold">Failed to Save Changes</p>
            <p className="text-xs text-red-100">{saveError}</p>
          </div>
        </div>
      )}

      {/* Floating Typography Toolbar */}
      {selectedElement && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 shadow-2xl">
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

      {/* Main Canvas Container with Real Viewport Support */}
      <ResponsiveCanvasWrapper deviceMode={deviceMode} desktopMaxWidthClass="w-full max-w-6xl">
        <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/80 transition-all duration-300">

          {/* ═══════════════════════════════════════════
              1. HERO PREVIEW SECTION — Exact replica of CollegeHero
          ═══════════════════════════════════════════ */}
          {(() => {
            const isIem = isIEMCollege(collegeData);
            const defaultH1 = isIem
              ? "IEM Kolkata Admission, Courses, Fees and Placements"
              : `${collegeData.name || "College"} Admission, Courses, Fees and Placements`;

            const heroH1 = collegeData.seo?.h1Title || collegeData.h1 || collegeData.seo?.heroH1 || defaultH1;

            const displayHeroImage =
              collegeData.imageUrl ||
              collegeData.image_url ||
              collegeData.logoUrl ||
              (isIem
                ? "/images/colleges/iem-saltlake.jpg"
                : collegeData.slug
                ? `/images/colleges/${collegeData.slug}.jpg`
                : "/images/colleges/iem-saltlake.jpg");

            return (
              <div className="relative overflow-hidden bg-[#0B1120] text-white border-b border-white/[0.12]">
                {/* Dark overlays, gradients, and pattern matching actual public CollegeHero design */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,76,192,0.25),transparent)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(96,165,250,0.06),transparent_50%)] pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 border-b border-white/[0.12] shadow-[0_4px_12px_rgba(0,0,0,0.1)] pointer-events-none" />
                <AnimatedPatternBg opacity={0.02} speed={200} />

                <div className="relative z-10 px-6 md:px-10 pt-10 pb-8">
                  {/* Breadcrumbs Row */}
                  <nav className="flex items-center gap-2 text-xs md:text-sm mb-6 text-white/40">
                    <span>Home</span>
                    <ChevronRight className="w-3.5 h-3.5 text-white/20" />
                    <span>Colleges</span>
                    <ChevronRight className="w-3.5 h-3.5 text-white/20" />
                    <span className="text-[#f6c804]/80 font-medium truncate max-w-[200px] md:max-w-none">
                      {collegeData.name}
                    </span>
                  </nav>

                  {/* Hero Content Two-Column Flex Layout matching actual CollegeHero */}
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
                    
                    {/* ── Left Column: Glassmorphic College Image Card ── */}
                    <div className="relative group shrink-0 w-full lg:w-auto">
                      <div className="absolute -inset-1 bg-gradient-to-br from-[#3B4CC0]/40 to-[#f6c804]/20 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-full aspect-video lg:aspect-auto lg:h-64 lg:w-96 bg-white/[0.08] backdrop-blur-2xl rounded-2xl p-2 border border-white/[0.15] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={displayHeroImage}
                          alt={`${collegeData.name} Visual`}
                          className="w-full h-full object-cover rounded-xl"
                        />

                        {/* Change College Photo Button */}
                        <button
                          onClick={() => {
                            setImagePicker({
                              isOpen: true,
                              title: "Change College Hero Image",
                              currentUrl: displayHeroImage,
                              onSelect: (url) => {
                                updateField("imageUrl", url);
                                updateField("image_url", url);
                              }
                            });
                          }}
                          className="absolute bottom-3 right-3 bg-[#0B1120]/90 hover:bg-[#0B1120] text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/20 shadow-xl flex items-center gap-1.5 backdrop-blur-md transition-all hover:scale-105"
                          title="Click to select or upload a new college photo"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-[#f6c804]" />
                          Change Photo
                        </button>
                      </div>
                    </div>

                    {/* ── Right Column: Badges, H1, Name, Location & Actions ── */}
                    <div className="flex-1 min-w-0 space-y-4">
                      {/* Badges Row */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        {/* Institute Type */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/[0.06] backdrop-blur-sm text-white/90 rounded-lg text-[11px] font-bold tracking-[0.08em] uppercase border border-white/[0.08]">
                          <Shield className="w-3 h-3 text-[#60A5FA]" />
                          <input
                            type="text"
                            value={collegeData.type || "Private"}
                            onChange={(e) => updateField("type", e.target.value)}
                            className="bg-transparent outline-none w-20 uppercase font-bold text-white text-[11px]"
                            title="Institute Type"
                          />
                        </div>

                        {/* Established Year */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f6c804]/[0.08] backdrop-blur-sm text-[#f6c804] rounded-lg text-[11px] font-bold tracking-[0.08em] uppercase border border-[#f6c804]/[0.15]">
                          <Sparkles className="w-3 h-3" />
                          <span>EST.</span>
                          <input
                            type="text"
                            value={collegeData.established || "1989"}
                            onChange={(e) => updateField("established", e.target.value)}
                            className="bg-transparent outline-none w-14 font-bold text-[#f6c804] text-[11px]"
                            title="Established Year"
                          />
                        </div>

                        {/* Rating & Reviews */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/[0.06] backdrop-blur-sm text-white/90 rounded-lg text-[11px] font-bold tracking-[0.08em] uppercase border border-white/[0.08]">
                          <Star className="w-3 h-3 fill-[#f6c804] text-[#f6c804]" />
                          <input
                            type="number"
                            step="0.1"
                            min="1"
                            max="5"
                            value={collegeData.rating ?? 4.5}
                            onChange={(e) => updateField("rating", parseFloat(e.target.value))}
                            className="bg-transparent outline-none w-10 font-bold text-white text-[11px]"
                            title="Rating"
                          />
                          <span className="text-white/60">
                            ({collegeData.reviews || "1,850"} Reviews)
                          </span>
                        </div>
                      </div>

                      {/* Main Page Heading (H1) — Editable */}
                      <div className="group relative">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] uppercase tracking-wider text-[#f6c804] font-bold flex items-center gap-1">
                            Main Page Heading (H1) • Click to edit
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const resetH1 = isIem
                                ? "IEM Kolkata Admission, Courses, Fees and Placements"
                                : `${collegeData.name} Admission, Courses, Fees and Placements`;
                              setCollegeData((prev: any) => ({
                                ...prev,
                                h1: resetH1,
                                seo: { ...(prev.seo || {}), h1Title: resetH1, heroH1: resetH1 }
                              }));
                            }}
                            className="text-[10px] text-white/40 hover:text-[#f6c804] transition-colors"
                            title="Reset to standard template"
                          >
                            Reset to Template
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={heroH1}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCollegeData((prev: any) => ({
                              ...prev,
                              h1: val,
                              seo: {
                                ...(prev.seo || {}),
                                h1Title: val,
                                heroH1: val
                              }
                            }));
                          }}
                          onFocus={() => {
                            setSelectedElement({
                              id: "h1",
                              label: "H1 Main Heading",
                              styles: { fontSize: "text-3xl", fontWeight: "font-bold", color: "#ffffff" }
                            });
                          }}
                          className="w-full text-2xl sm:text-3xl md:text-[2.5rem] font-sora font-bold text-white leading-[1.15] tracking-[-0.02em] bg-transparent hover:bg-white/5 focus:bg-white/10 p-2 rounded-xl border border-transparent hover:border-white/20 focus:border-[#f6c804] outline-none transition-all resize-none"
                          placeholder="e.g. IEM Kolkata Admission, Courses, Fees and Placements"
                        />
                      </div>

                      {/* College Official Sub-name */}
                      <div>
                        <input
                          type="text"
                          value={collegeData.name || ""}
                          onChange={(e) => updateField("name", e.target.value)}
                          className="w-full text-base md:text-lg font-medium text-white/70 bg-transparent hover:bg-white/5 focus:bg-white/10 px-2 py-0.5 rounded-lg border border-transparent hover:border-white/20 focus:border-[#f6c804] outline-none"
                          placeholder="Official College Name"
                        />
                      </div>

                      {/* Location Row */}
                      <div className="flex items-center gap-2 text-[#60A5FA]">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <input
                          type="text"
                          value={collegeData.location || ""}
                          onChange={(e) => updateField("location", e.target.value)}
                          placeholder="Campus Location"
                          className="bg-transparent hover:bg-white/10 focus:bg-white/20 px-2 py-0.5 rounded text-[#60A5FA] font-medium outline-none text-sm md:text-base w-48"
                        />
                        <span className="text-white/40">,</span>
                        <input
                          type="text"
                          value={collegeData.state || ""}
                          onChange={(e) => updateField("state", e.target.value)}
                          placeholder="State"
                          className="bg-transparent hover:bg-white/10 focus:bg-white/20 px-2 py-0.5 rounded text-[#60A5FA] font-medium outline-none text-sm md:text-base w-32"
                        />
                      </div>

                      {/* Action Buttons Mockup matching live site */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          type="button"
                          className="bg-gradient-to-r from-[#f6c804] to-[#e5b703] text-[#0B1120] font-bold text-sm h-11 px-6 rounded-xl shadow-[0_8px_20px_-4px_rgba(246,200,4,0.4)] cursor-default"
                        >
                          Apply Now 2026
                        </button>
                        <button
                          type="button"
                          className="bg-white/[0.04] border border-white/[0.1] text-white hover:bg-white/[0.08] text-sm font-semibold h-11 px-6 rounded-xl backdrop-blur-sm cursor-default flex items-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4 text-emerald-400" />
                          WhatsApp Us
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ── Stats Dashboard Bar matching live CollegeHero ── */}
                  <div className="mt-8 pt-6 border-t border-white/[0.08]">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.08] backdrop-blur-xl">
                      {/* Stat 1: Highest Package */}
                      <div className="flex flex-col items-center justify-center py-5 px-3 bg-[#0B1120]/70 text-center">
                        <input
                          type="text"
                          value={collegeData.placements?.stats?.[0]?.value || "₹32 LPA"}
                          onChange={(e) => {
                            const stats = [...(collegeData.placements?.stats || [])];
                            if (!stats[0]) stats[0] = { label: "Highest Package", value: "" };
                            stats[0].value = e.target.value;
                            updateField("placements", { ...(collegeData.placements || {}), stats });
                          }}
                          className="w-full text-center text-xl md:text-2xl font-bold font-sora text-[#f6c804] bg-transparent outline-none"
                        />
                        <input
                          type="text"
                          value={collegeData.placements?.stats?.[0]?.label || "Highest Package"}
                          onChange={(e) => {
                            const stats = [...(collegeData.placements?.stats || [])];
                            if (!stats[0]) stats[0] = { label: "", value: "" };
                            stats[0].label = e.target.value;
                            updateField("placements", { ...(collegeData.placements || {}), stats });
                          }}
                          className="w-full text-center text-[10px] font-bold uppercase tracking-[0.1em] text-white/50 bg-transparent outline-none mt-1"
                        />
                      </div>

                      {/* Stat 2: Average Package */}
                      <div className="flex flex-col items-center justify-center py-5 px-3 bg-[#0B1120]/70 text-center">
                        <input
                          type="text"
                          value={collegeData.placements?.stats?.[1]?.value || "₹6.5 LPA"}
                          onChange={(e) => {
                            const stats = [...(collegeData.placements?.stats || [])];
                            if (!stats[1]) stats[1] = { label: "Average Package", value: "" };
                            stats[1].value = e.target.value;
                            updateField("placements", { ...(collegeData.placements || {}), stats });
                          }}
                          className="w-full text-center text-xl md:text-2xl font-bold font-sora text-[#22c55e] bg-transparent outline-none"
                        />
                        <input
                          type="text"
                          value={collegeData.placements?.stats?.[1]?.label || "Average Package"}
                          onChange={(e) => {
                            const stats = [...(collegeData.placements?.stats || [])];
                            if (!stats[1]) stats[1] = { label: "", value: "" };
                            stats[1].label = e.target.value;
                            updateField("placements", { ...(collegeData.placements || {}), stats });
                          }}
                          className="w-full text-center text-[10px] font-bold uppercase tracking-[0.1em] text-white/50 bg-transparent outline-none mt-1"
                        />
                      </div>

                      {/* Stat 3: Programs / Courses */}
                      <div className="flex flex-col items-center justify-center py-5 px-3 bg-[#0B1120]/70 text-center">
                        <p className="text-xl md:text-2xl font-bold font-sora text-white">
                          {collegeData.courses?.length || 9}+
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/50 mt-1">
                          Academic Programs
                        </p>
                      </div>

                      {/* Stat 4: Starting Fee */}
                      <div className="flex flex-col items-center justify-center py-5 px-3 bg-[#0B1120]/70 text-center">
                        <input
                          type="text"
                          value={collegeData.fees || "₹7.65L Total"}
                          onChange={(e) => updateField("fees", e.target.value)}
                          className="w-full text-center text-xl md:text-2xl font-bold font-sora text-[#60A5FA] bg-transparent outline-none"
                        />
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/50 mt-1 block">
                          Starting Fees
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 2. ORDERED SECTIONS CONTAINER */}
          <div className="p-6 md:p-8 space-y-10">
            {(collegeData.sectionOrder || []).map((sectionId: string, idx: number) => {
              if (isHidden(sectionId)) {
                return (
                  <div
                    key={sectionId}
                    className="p-4 rounded-2xl bg-gray-100 border border-dashed border-gray-300 flex items-center justify-between text-xs text-gray-500"
                  >
                    <span className="font-semibold uppercase tracking-wider flex items-center gap-2">
                      <EyeOff className="w-4 h-4 text-gray-400" />
                      Section: {sectionId} (Hidden on public page)
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleSectionVisibility(sectionId)}
                      className="text-xs h-7 gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Unhide Section
                    </Button>
                  </div>
                );
              }

              // Common Section Wrapper with Floating Controls
              const renderSectionControls = (title: string) => (
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-d2c-royal" />
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      {title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
                    <button
                      onClick={() => moveSection(sectionId, "up")}
                      disabled={idx === 0}
                      className="p-1 rounded text-gray-500 hover:text-gray-900 hover:bg-white disabled:opacity-30"
                      title="Move Up"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveSection(sectionId, "down")}
                      disabled={idx === (collegeData.sectionOrder || []).length - 1}
                      className="p-1 rounded text-gray-500 hover:text-gray-900 hover:bg-white disabled:opacity-30"
                      title="Move Down"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleSectionVisibility(sectionId)}
                      className="p-1 rounded text-gray-500 hover:text-amber-600 hover:bg-white"
                      title="Hide from public page"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                    </button>
                    {sectionId.startsWith("custom-") && (
                      <button
                        onClick={() => removeCustomSection(sectionId)}
                        className="p-1 rounded text-red-500 hover:text-red-700 hover:bg-red-50"
                        title="Delete Section"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );

              // 2.1 ADMISSION PROCESS SECTION
              if (sectionId === "admissions") {
                return (
                  <section key={sectionId} className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm">
                    {renderSectionControls("Admission Process Section")}

                    {/* H2 Heading */}
                    <div className="mb-6">
                      <div>
                        <input
                          type="text"
                          value={headings.admissions || `${collegeData.name} Admission Process`}
                          onChange={(e) => updateHeading("admissions", e.target.value)}
                          onFocus={() => {
                            setSelectedElement({
                              id: "h2-admissions",
                              label: "Admissions H2",
                              styles: { fontSize: "text-2xl", fontWeight: "font-bold", color: "#131b2e" }
                            });
                          }}
                          className="w-full text-xl font-sora font-bold text-gray-900 bg-transparent hover:bg-gray-50 focus:bg-blue-50/50 px-2 py-1 rounded-lg border border-transparent hover:border-gray-300 focus:border-d2c-royal outline-none"
                        />
                        <p className="text-xs text-gray-500 px-2">Step-by-step guidance for 2026-27 admission session</p>
                      </div>
                    </div>

                    {/* Eligibility List */}
                    <div className="mb-6">
                      <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-d2c-royal" /> Eligibility Criteria Points
                      </h3>
                      <div className="space-y-2">
                        {(collegeData.admissions?.eligibility || []).map((item: string, i: number) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-d2c-royal" />
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const updated = [...(collegeData.admissions?.eligibility || [])];
                                updated[i] = e.target.value;
                                updateField("admissions", { ...(collegeData.admissions || {}), eligibility: updated });
                              }}
                              className="flex-1 text-xs text-gray-800 bg-gray-50 hover:bg-white focus:bg-white p-2 rounded-lg border border-gray-200 outline-none focus:border-d2c-royal"
                            />
                            <button
                              onClick={() => {
                                const updated = (collegeData.admissions?.eligibility || []).filter((_: any, idx: number) => idx !== i);
                                updateField("admissions", { ...(collegeData.admissions || {}), eligibility: updated });
                              }}
                              className="p-1 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updated = [...(collegeData.admissions?.eligibility || []), "New eligibility requirement point"];
                            updateField("admissions", { ...(collegeData.admissions || {}), eligibility: updated });
                          }}
                          className="text-xs h-7 mt-2"
                        >
                          + Add Eligibility Point
                        </Button>
                      </div>
                    </div>

                    {/* Process Steps */}
                    <div>
                      <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">
                        Application Steps Timeline
                      </h3>
                      <div className="space-y-3">
                        {(collegeData.admissions?.process || []).map((step: string, i: number) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-d2c-gold text-[#0B1120] font-bold text-xs flex items-center justify-center shrink-0">
                              {i + 1}
                            </div>
                            <input
                              type="text"
                              value={step}
                              onChange={(e) => {
                                const updated = [...(collegeData.admissions?.process || [])];
                                updated[i] = e.target.value;
                                updateField("admissions", { ...(collegeData.admissions || {}), process: updated });
                              }}
                              className="flex-1 text-xs text-gray-800 bg-gray-50 hover:bg-white focus:bg-white p-2 rounded-lg border border-gray-200 outline-none focus:border-d2c-royal"
                            />
                            <button
                              onClick={() => {
                                const updated = (collegeData.admissions?.process || []).filter((_: any, idx: number) => idx !== i);
                                updateField("admissions", { ...(collegeData.admissions || {}), process: updated });
                              }}
                              className="p-1 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updated = [...(collegeData.admissions?.process || []), "Fill admission registration form and submit documents"];
                            updateField("admissions", { ...(collegeData.admissions || {}), process: updated });
                          }}
                          className="text-xs h-7 mt-2"
                        >
                          + Add Timeline Step
                        </Button>
                      </div>
                    </div>
                  </section>
                );
              }

              // 2.2 COURSES & FEES SECTION
              if (sectionId === "courses-fees") {
                return (
                  <section key={sectionId} className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm">
                    {renderSectionControls("Courses & Fee Structure Section")}

                    {/* H2 Heading */}
                    <div className="mb-6">
                      <div>
                        <input
                          type="text"
                          value={headings.coursesFees || `${collegeData.name} Courses and Fee Structure`}
                          onChange={(e) => updateHeading("coursesFees", e.target.value)}
                          className="w-full text-xl font-sora font-bold text-gray-900 bg-transparent hover:bg-gray-50 focus:bg-blue-50/50 px-2 py-1 rounded-lg border border-transparent hover:border-gray-300 focus:border-d2c-royal outline-none"
                        />
                        <input
                          type="text"
                          value={headings.coursesFeesSubtitle || `${collegeData.name} Admission Fees and Course Fee Structure`}
                          onChange={(e) => updateHeading("coursesFeesSubtitle", e.target.value)}
                          className="w-full text-xs text-gray-500 px-2 bg-transparent hover:bg-gray-50 border-b border-transparent focus:border-d2c-royal outline-none"
                          placeholder="Subtitle for courses section"
                        />
                      </div>
                    </div>

                    {/* Course Cards / Table */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(collegeData.coursesDetails || collegeData.courses_details || []).map((c: any, i: number) => (
                        <div key={i} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={c.name || ""}
                              onChange={(e) => {
                                const updated = [...(collegeData.coursesDetails || collegeData.courses_details || [])];
                                updated[i] = { ...updated[i], name: e.target.value };
                                updateField("coursesDetails", updated);
                              }}
                              className="font-bold text-sm text-gray-900 bg-transparent outline-none border-b border-transparent focus:border-d2c-royal flex-1"
                              placeholder="Course Name (e.g. B.Tech Computer Science)"
                            />
                            <button
                              onClick={() => {
                                const updated = (collegeData.coursesDetails || collegeData.courses_details || []).filter((_: any, idx: number) => idx !== i);
                                updateField("coursesDetails", updated);
                              }}
                              className="p-1 text-gray-400 hover:text-red-500 ml-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-[10px] text-gray-500 block">Total Fees</span>
                              <input
                                type="text"
                                value={c.fees || ""}
                                onChange={(e) => {
                                  const updated = [...(collegeData.coursesDetails || collegeData.courses_details || [])];
                                  updated[i] = { ...updated[i], fees: e.target.value };
                                  updateField("coursesDetails", updated);
                                }}
                                className="w-full bg-white p-1 rounded border border-gray-200 text-gray-900 font-semibold"
                                placeholder="₹6.50 Lakhs"
                              />
                            </div>
                            <div>
                              <span className="text-[10px] text-gray-500 block">Duration</span>
                              <input
                                type="text"
                                value={c.duration || ""}
                                onChange={(e) => {
                                  const updated = [...(collegeData.coursesDetails || collegeData.courses_details || [])];
                                  updated[i] = { ...updated[i], duration: e.target.value };
                                  updateField("coursesDetails", updated);
                                }}
                                className="w-full bg-white p-1 rounded border border-gray-200 text-gray-900 font-semibold"
                                placeholder="4 Years"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const updated = [
                          ...(collegeData.coursesDetails || collegeData.courses_details || []),
                          { name: "New Programme", duration: "4 Years", fees: "₹5.0 Lakhs", seats: "120" }
                        ];
                        updateField("coursesDetails", updated);
                      }}
                      className="text-xs h-8 mt-4"
                    >
                      + Add Course Offering
                    </Button>
                  </section>
                );
              }

              // 2.3 PLACEMENTS & PACKAGES SECTION
              if (sectionId === "placements") {
                return (
                  <section key={sectionId} className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm">
                    {renderSectionControls("Placements & Average Package Section")}

                    {/* H2 Heading */}
                    <div className="mb-6">
                      <div>
                        <input
                          type="text"
                          value={headings.placements || `${collegeData.name} Placements and Average Package`}
                          onChange={(e) => updateHeading("placements", e.target.value)}
                          className="w-full text-xl font-sora font-bold text-gray-900 bg-transparent hover:bg-gray-50 focus:bg-blue-50/50 px-2 py-1 rounded-lg border border-transparent hover:border-gray-300 focus:border-d2c-royal outline-none"
                        />
                        <p className="text-xs text-gray-500 px-2">Verified placement records and top recruiters</p>
                      </div>
                    </div>

                    {/* Placement Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {(collegeData.placements?.stats || [
                        { label: "Highest Package", value: "₹44 LPA" },
                        { label: "Average Package", value: "₹8.5 LPA" },
                        { label: "Placement Rate", value: "92%" }
                      ]).map((stat: any, i: number) => (
                        <div key={i} className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/60 text-center">
                          <input
                            type="text"
                            value={stat.label || ""}
                            onChange={(e) => {
                              const stats = [...(collegeData.placements?.stats || [])];
                              stats[i] = { ...stats[i], label: e.target.value };
                              updateField("placements", { ...(collegeData.placements || {}), stats });
                            }}
                            className="text-xs font-medium text-gray-600 bg-transparent text-center w-full outline-none"
                            placeholder="Highest Package"
                          />
                          <input
                            type="text"
                            value={stat.value || ""}
                            onChange={(e) => {
                              const stats = [...(collegeData.placements?.stats || [])];
                              stats[i] = { ...stats[i], value: e.target.value };
                              updateField("placements", { ...(collegeData.placements || {}), stats });
                            }}
                            className="text-2xl font-bold font-sora text-gray-900 bg-transparent text-center w-full outline-none mt-1"
                            placeholder="₹44 LPA"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Top Recruiters */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                        Top Recruiter Companies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(collegeData.placements?.topRecruiters || []).map((rec: string, i: number) => (
                          <div key={i} className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-800">
                            <input
                              type="text"
                              value={rec}
                              onChange={(e) => {
                                const recs = [...(collegeData.placements?.topRecruiters || [])];
                                recs[i] = e.target.value;
                                updateField("placements", { ...(collegeData.placements || {}), topRecruiters: recs });
                              }}
                              className="bg-transparent text-xs outline-none"
                            />
                            <button
                              onClick={() => {
                                const recs = (collegeData.placements?.topRecruiters || []).filter((_: any, idx: number) => idx !== i);
                                updateField("placements", { ...(collegeData.placements || {}), topRecruiters: recs });
                              }}
                              className="text-gray-400 hover:text-red-500"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const recs = [...(collegeData.placements?.topRecruiters || []), "Amazon"];
                            updateField("placements", { ...(collegeData.placements || {}), topRecruiters: recs });
                          }}
                          className="px-3 py-1 bg-blue-50 text-d2c-royal hover:bg-blue-100 rounded-full text-xs font-semibold"
                        >
                          + Add Recruiter
                        </button>
                      </div>
                    </div>
                  </section>
                );
              }

              // 2.4 CAMPUS & LOCATION / OVERVIEW
              if (sectionId === "overview") {
                return (
                  <section key={sectionId} className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm">
                    {renderSectionControls("Campus & Location Section")}

                    {/* H2 Heading */}
                    <div className="mb-6">
                      <div>
                        <input
                          type="text"
                          value={headings.overview || `${collegeData.name} Campus and Location`}
                          onChange={(e) => updateHeading("overview", e.target.value)}
                          className="w-full text-xl font-sora font-bold text-gray-900 bg-transparent hover:bg-gray-50 focus:bg-blue-50/50 px-2 py-1 rounded-lg border border-transparent hover:border-gray-300 focus:border-d2c-royal outline-none"
                        />
                        <p className="text-xs text-gray-500 px-2">Campus facilities, address, and connectivity</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
                          Campus Address
                        </label>
                        <textarea
                          rows={2}
                          value={collegeData.contact?.address || ""}
                          onChange={(e) => updateField("contact", { ...(collegeData.contact || {}), address: e.target.value })}
                          className="w-full text-xs text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-gray-200 outline-none focus:border-d2c-royal"
                          placeholder="e.g. Ashram Building, GN-34/2, Sector V, Salt Lake, Kolkata – 700091"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
                          Campus Overview & About Text
                        </label>
                        <textarea
                          rows={4}
                          value={collegeData.about || collegeData.description || ""}
                          onChange={(e) => {
                            updateField("about", e.target.value);
                            updateField("description", e.target.value);
                          }}
                          className="w-full text-xs text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-gray-200 outline-none focus:border-d2c-royal leading-relaxed"
                          placeholder="Write comprehensive overview about campus, academic excellence..."
                        />
                      </div>
                    </div>
                  </section>
                );
              }

              // 2.5 FAQS SECTION
              if (sectionId === "faqs") {
                return (
                  <section key={sectionId} className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm">
                    {renderSectionControls("Frequently Asked Questions Section")}

                    {/* H2 Heading */}
                    <div className="mb-6">
                      <div>
                        <input
                          type="text"
                          value={headings.faqs || `Frequently Asked Questions About ${collegeData.name}`}
                          onChange={(e) => updateHeading("faqs", e.target.value)}
                          className="w-full text-xl font-sora font-bold text-gray-900 bg-transparent hover:bg-gray-50 focus:bg-blue-50/50 px-2 py-1 rounded-lg border border-transparent hover:border-gray-300 focus:border-d2c-royal outline-none"
                        />
                        <p className="text-xs text-gray-500 px-2">Official admissions, fees, hostel and cutoff answers</p>
                      </div>
                    </div>

                    {/* FAQs list */}
                    <div className="space-y-4">
                      {(collegeData.faqs || []).map((faq: any, i: number) => (
                        <div key={i} className="p-4 rounded-xl bg-gray-50/70 border border-gray-200 space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <span className="text-xs font-bold text-d2c-royal shrink-0 mt-1">Q{i + 1}.</span>
                            <input
                              type="text"
                              value={faq.question || ""}
                              onChange={(e) => {
                                const updated = [...(collegeData.faqs || [])];
                                updated[i] = { ...updated[i], question: e.target.value };
                                updateField("faqs", updated);
                              }}
                              className="font-bold text-xs text-gray-900 bg-transparent outline-none flex-1 border-b border-transparent focus:border-d2c-royal"
                              placeholder="Enter FAQ Question..."
                            />
                            <button
                              onClick={() => {
                                const updated = (collegeData.faqs || []).filter((_: any, idx: number) => idx !== i);
                                updateField("faqs", updated);
                              }}
                              className="p-1 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <textarea
                            rows={3}
                            value={faq.answer || ""}
                            onChange={(e) => {
                              const updated = [...(collegeData.faqs || [])];
                              updated[i] = { ...updated[i], answer: e.target.value };
                              updateField("faqs", updated);
                            }}
                            className="w-full text-xs text-gray-700 bg-white p-2 rounded-lg border border-gray-200 outline-none focus:border-d2c-royal leading-relaxed"
                            placeholder="Enter detailed FAQ answer..."
                          />
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const updated = [
                          ...(collegeData.faqs || []),
                          {
                            question: `What are the eligibility criteria for admission in 2026?`,
                            answer: `Students should meet the minimum percentage criteria and qualify the entrance examination.`
                          }
                        ];
                        updateField("faqs", updated);
                      }}
                      className="text-xs h-8 mt-4"
                    >
                      + Add New FAQ Question
                    </Button>
                  </section>
                );
              }

              // 2.6 CUSTOM SECTION (Added dynamically)
              const customSection = (collegeData.customSections || []).find((s: any) => s.id === sectionId);
              if (customSection) {
                return (
                  <section key={sectionId} className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm">
                    {renderSectionControls(`Custom Section: ${customSection.title || "Custom"}`)}

                    <div className="space-y-4">
                      <input
                        type="text"
                        value={customSection.title || ""}
                        onChange={(e) => {
                          const updated = (collegeData.customSections || []).map((s: any) =>
                            s.id === sectionId ? { ...s, title: e.target.value } : s
                          );
                          updateField("customSections", updated);
                        }}
                        className="w-full text-xl font-sora font-bold text-gray-900 bg-transparent hover:bg-gray-50 px-2 py-1 rounded-lg border border-transparent hover:border-gray-300 focus:border-d2c-royal outline-none"
                        placeholder="Section Title"
                      />

                      <textarea
                        rows={4}
                        value={customSection.content || ""}
                        onChange={(e) => {
                          const updated = (collegeData.customSections || []).map((s: any) =>
                            s.id === sectionId ? { ...s, content: e.target.value } : s
                          );
                          updateField("customSections", updated);
                        }}
                        className="w-full text-xs text-gray-800 bg-gray-50 p-3 rounded-xl border border-gray-200 outline-none focus:border-d2c-royal leading-relaxed"
                        placeholder="Section content or description..."
                      />
                    </div>
                  </section>
                );
              }

              // Other sections (infrastructure, scholarships, alumni fallback)
              return (
                <section key={sectionId} className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm">
                  {renderSectionControls(`Section: ${sectionId}`)}
                  <p className="text-xs text-gray-500">
                    Section {sectionId} active. Use Form Tabs for comprehensive database properties or edit headings above.
                  </p>
                </section>
              );
            })}
          </div>

          {/* Add Section Bottom Button */}
          <div className="p-8 bg-slate-50 border-t border-gray-200 text-center">
            <Button
              onClick={() => setIsAddSectionOpen(true)}
              className="bg-d2c-royal hover:bg-blue-700 text-white gap-2 text-xs font-semibold px-6 py-2.5 rounded-xl shadow-md"
            >
              <Plus className="w-4 h-4" />
              Add New Section to this College Page
            </Button>
          </div>

        </div>
      </ResponsiveCanvasWrapper>

      {/* Modals */}
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
