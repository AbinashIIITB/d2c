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
  Plus,
  Image as ImageIcon,
  Trash2,
  Megaphone,
  BellRing,
  FormInput,
  Sparkles,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Globe,
  SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypographyToolbar } from "./TypographyToolbar";
import { ImagePickerModal } from "./ImagePickerModal";
import { AddSectionModal } from "./AddSectionModal";
import { BannerSection } from "@/components/home/BannerSection";
import { ResponsiveCanvasWrapper } from "./ResponsiveCanvasWrapper";

interface VisualStaticPageEditorProps {
  slug: string;
  initialData: any;
}

export function VisualStaticPageEditor({ slug, initialData }: VisualStaticPageEditorProps) {
  const router = useRouter();

  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [pageData, setPageData] = useState<any>(initialData || {});

  // Test modal preview state
  const [showLeadModalPreview, setShowLeadModalPreview] = useState(false);

  // Typography toolbar state
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

  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const updateField = (field: string, value: any) => {
    setPageData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageData)
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to save page contents");
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

  const publicUrl = slug === "home" ? "/" : `/${slug}`;
  const pageTitleDisplay = {
    home: "Homepage Live Preview & Banner Editor",
    about: "About Us Live Canvas",
    contact: "Contact Us Live Canvas"
  }[slug] || `${slug.toUpperCase()} Page Editor`;

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
            href="/admin/pages"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-base font-bold text-white font-sora truncate max-w-xs md:max-w-md">
                {pageTitleDisplay}
              </h1>
              <span className="text-[10px] bg-d2c-royal/80 px-2 py-0.5 rounded-full text-white font-semibold uppercase tracking-wider">
                Static Page CMS
              </span>
            </div>
            <p className="text-[11px] text-white/50">Edit text, banners, forms and modules in real-time</p>
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

          {slug === "home" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLeadModalPreview(!showLeadModalPreview)}
              className={`${
                showLeadModalPreview ? "bg-d2c-gold text-slate-900 border-none font-bold" : "bg-white/5 hover:bg-white/10 text-white border-white/15"
              } gap-1.5 text-xs font-medium`}
            >
              <FormInput className="w-3.5 h-3.5" />
              {showLeadModalPreview ? "Close Lead Form" : "Test Lead Form Modal"}
            </Button>
          )}

          <Link
            href={publicUrl}
            target="_blank"
            className="text-xs text-white/70 hover:text-white flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10"
          >
            <ExternalLink className="w-3.5 h-3.5 text-d2c-gold" />
            Live Page
          </Link>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-d2c-royal to-blue-600 hover:from-blue-600 hover:to-d2c-royal text-white text-xs font-bold gap-2 px-5 py-2 rounded-xl shadow-lg"
          >
            {saving ? "Publishing..." : "Publish Page"}
          </Button>
        </div>
      </header>

      {/* Floating Notifications */}
      {saveSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <p className="text-sm font-bold">Page Content Updated & Revalidated!</p>
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

      {/* Main Canvas with Real Viewport Support */}
      <ResponsiveCanvasWrapper deviceMode={deviceMode} desktopMaxWidthClass="w-full max-w-5xl">
        <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/80 relative">

          {/* ══════════════════════════════════════════════════════════════
              HOME PAGE EDITING EXPERIENCE
          ══════════════════════════════════════════════════════════════ */}
          {slug === "home" && (
            <div className="space-y-8">
              
              {/* 1. WELCOME LEAD FORM CONTROL CARD */}
              <div className="mx-6 p-6 rounded-2xl bg-gradient-to-r from-blue-900/10 via-amber-500/10 to-blue-900/10 border-2 border-d2c-royal/30 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-d2c-royal text-white">
                      <FormInput className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 font-sora">
                        Welcome Lead Form Modal (Pop-up on Visit)
                      </h3>
                      <p className="text-xs text-gray-500">
                        Default luxury glassmorphic design matching website theme with blur backdrop
                      </p>
                    </div>
                  </div>

                  {/* Toggle ON/OFF Switch */}
                  <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                    <span className={`text-xs font-bold ${pageData.welcomeLeadModal?.enabled ? "text-emerald-600" : "text-gray-400"}`}>
                      {pageData.welcomeLeadModal?.enabled ? "Status: ON (Active)" : "Status: OFF (Disabled)"}
                    </span>
                    <input
                      type="checkbox"
                      checked={pageData.welcomeLeadModal?.enabled ?? false}
                      onChange={(e) => {
                        updateField("welcomeLeadModal", {
                          ...(pageData.welcomeLeadModal || {}),
                          enabled: e.target.checked
                        });
                      }}
                      className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                      Modal Title
                    </label>
                    <input
                      type="text"
                      value={pageData.welcomeLeadModal?.title || ""}
                      onChange={(e) => {
                        updateField("welcomeLeadModal", {
                          ...(pageData.welcomeLeadModal || {}),
                          title: e.target.value
                        });
                      }}
                      className="w-full p-2 rounded-xl bg-white border border-gray-200 font-bold text-gray-800 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                      Modal Badge / Tag
                    </label>
                    <input
                      type="text"
                      value={pageData.welcomeLeadModal?.badge || ""}
                      onChange={(e) => {
                        updateField("welcomeLeadModal", {
                          ...(pageData.welcomeLeadModal || {}),
                          badge: e.target.value
                        });
                      }}
                      className="w-full p-2 rounded-xl bg-white border border-gray-200 font-bold text-d2c-royal outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                      Subtitle / Offer Description
                    </label>
                    <input
                      type="text"
                      value={pageData.welcomeLeadModal?.subtitle || ""}
                      onChange={(e) => {
                        updateField("welcomeLeadModal", {
                          ...(pageData.welcomeLeadModal || {}),
                          subtitle: e.target.value
                        });
                      }}
                      className="w-full p-2 rounded-xl bg-white border border-gray-200 text-gray-700 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                      Button Call To Action Text
                    </label>
                    <input
                      type="text"
                      value={pageData.welcomeLeadModal?.buttonText || ""}
                      onChange={(e) => {
                        updateField("welcomeLeadModal", {
                          ...(pageData.welcomeLeadModal || {}),
                          buttonText: e.target.value
                        });
                      }}
                      className="w-full p-2 rounded-xl bg-white border border-gray-200 font-semibold text-gray-800 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                      Auto Open Delay (seconds after page load)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={pageData.welcomeLeadModal?.autoOpenDelaySeconds ?? 3}
                      onChange={(e) => {
                        updateField("welcomeLeadModal", {
                          ...(pageData.welcomeLeadModal || {}),
                          autoOpenDelaySeconds: parseInt(e.target.value) || 3
                        });
                      }}
                      className="w-full p-2 rounded-xl bg-white border border-gray-200 text-gray-800 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 3. HERO SECTION LIVE PREVIEW & EDIT */}
              <div className="p-8 md:p-12 bg-gradient-to-br from-[#0B1120] via-[#101a36] to-[#0B1120] text-white rounded-3xl mx-6 shadow-xl relative overflow-hidden">
                <div className="max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-d2c-gold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <input
                      type="text"
                      value={pageData.hero?.badge || "Trusted by 12,000+ Students"}
                      onChange={(e) => updateField("hero", { ...(pageData.hero || {}), badge: e.target.value })}
                      className="bg-transparent outline-none font-bold text-xs text-d2c-gold w-48"
                    />
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={pageData.hero?.titlePrefix || "Your Shortcut to the"}
                      onChange={(e) => updateField("hero", { ...(pageData.hero || {}), titlePrefix: e.target.value })}
                      className="text-2xl md:text-4xl font-sora font-extrabold text-white bg-transparent outline-none w-full"
                    />
                    <input
                      type="text"
                      value={pageData.hero?.titleHighlight || "Right Campus"}
                      onChange={(e) => updateField("hero", { ...(pageData.hero || {}), titleHighlight: e.target.value })}
                      className="text-2xl md:text-4xl font-sora font-extrabold text-d2c-gold bg-transparent outline-none w-full"
                    />
                  </div>

                  <textarea
                    rows={3}
                    value={pageData.hero?.description || ""}
                    onChange={(e) => updateField("hero", { ...(pageData.hero || {}), description: e.target.value })}
                    className="w-full text-xs text-white/80 bg-white/5 p-3 rounded-xl border border-white/10 outline-none leading-relaxed"
                  />
                </div>
              </div>

              {/* 3. ANNOUNCEMENT / BANNERS / ADS SLIDER MANAGEMENT */}
              <div className="mx-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-d2c-royal text-white">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 font-sora">
                        Announcement / Banners / Ads Section (Campus Carousel)
                      </h3>
                      <p className="text-xs text-gray-500">
                        High-definition college banners & partner institution ads with tags, titles, and links
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-gray-200">
                    <span className={`text-xs font-bold ${pageData.bannerSection?.enabled !== false ? "text-emerald-600" : "text-gray-400"}`}>
                      {pageData.bannerSection?.enabled !== false ? "Section: Visible on Site" : "Section: Hidden"}
                    </span>
                    <input
                      type="checkbox"
                      checked={pageData.bannerSection?.enabled ?? true}
                      onChange={(e) => updateField("bannerSection", {
                        ...(pageData.bannerSection || {}),
                        enabled: e.target.checked
                      })}
                      className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                    />
                  </div>
                </div>

                {/* Live Interactive Carousel Preview */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Carousel Preview
                    </span>
                    <span className="text-[11px] text-gray-400">
                      Auto-rotates every 5s • Interactive controls
                    </span>
                  </div>
                  {pageData.bannerSection?.enabled === false ? (
                    <div className="p-8 text-center text-xs text-gray-400 bg-slate-50 rounded-xl border border-dashed border-gray-200">
                      This section is currently toggled OFF and will not show on the public homepage.
                    </div>
                  ) : (
                    <BannerSection banners={pageData.banners} />
                  )}
                </div>

                {/* Banner Controls & Slide Editor */}
                <div className="p-6 bg-white rounded-2xl border border-gray-200 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-d2c-royal" />
                      <h3 className="text-sm font-bold text-gray-900 font-sora">
                        Manage Banners & Ads Slides ({pageData.banners?.length || 0} active)
                      </h3>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        const newId = Date.now();
                        const updated = [
                          ...(pageData.banners || []),
                          {
                            id: newId,
                            image: "/images/colleges/iem-saltlake.jpg",
                            title: "New Featured College Banner",
                            subtitle: "Direct Admission & Counseling Window Active",
                            link: "/colleges",
                            badge: "Featured 2026"
                          }
                        ];
                        updateField("banners", updated);
                      }}
                      className="bg-d2c-royal hover:bg-blue-700 text-white text-xs gap-1.5 h-8 font-semibold shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Banner Slide
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(pageData.banners || []).map((banner: any, idx: number) => (
                      <div key={banner.id || idx} className="rounded-2xl border border-gray-200 overflow-hidden bg-gray-50 flex flex-col shadow-sm">
                        <div className="relative aspect-[16/9] w-full bg-gray-300">
                          <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                          <button
                            onClick={() => {
                              setImagePicker({
                                isOpen: true,
                                title: `Change Banner #${idx + 1} Image`,
                                currentUrl: banner.image,
                                onSelect: (url) => {
                                  const updated = [...(pageData.banners || [])];
                                  updated[idx] = { ...updated[idx], image: url };
                                  updateField("banners", updated);
                                }
                              });
                            }}
                            className="absolute bottom-2 right-2 bg-black/70 hover:bg-black text-white text-[10px] px-2 py-1 rounded-lg flex items-center gap-1 shadow backdrop-blur-sm"
                          >
                            <ImageIcon className="w-3 h-3 text-d2c-gold" />
                            Change Image
                          </button>
                        </div>

                        <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between text-xs">
                          <div className="space-y-1.5">
                            <div>
                              <label className="text-[9px] font-bold text-gray-400 uppercase block">Badge Tag</label>
                              <input
                                type="text"
                                value={banner.badge || ""}
                                onChange={(e) => {
                                  const updated = [...(pageData.banners || [])];
                                  updated[idx] = { ...updated[idx], badge: e.target.value };
                                  updateField("banners", updated);
                                }}
                                className="text-[10px] font-bold text-d2c-royal uppercase bg-white px-2 py-1 rounded border border-gray-200 outline-none w-full"
                                placeholder="e.g. TOP MEDICAL"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-gray-400 uppercase block">Slide Title</label>
                              <input
                                type="text"
                                value={banner.title || ""}
                                onChange={(e) => {
                                  const updated = [...(pageData.banners || [])];
                                  updated[idx] = { ...updated[idx], title: e.target.value };
                                  updateField("banners", updated);
                                }}
                                className="font-bold text-gray-900 bg-white px-2 py-1 rounded border border-gray-200 outline-none w-full"
                                placeholder="Banner Title"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-gray-400 uppercase block">Subtitle</label>
                              <textarea
                                rows={2}
                                value={banner.subtitle || ""}
                                onChange={(e) => {
                                  const updated = [...(pageData.banners || [])];
                                  updated[idx] = { ...updated[idx], subtitle: e.target.value };
                                  updateField("banners", updated);
                                }}
                                className="text-gray-600 bg-white px-2 py-1 rounded border border-gray-200 outline-none w-full text-xs"
                                placeholder="Subtitle description..."
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-gray-200 mt-2">
                            <input
                              type="text"
                              value={banner.link || ""}
                              onChange={(e) => {
                                const updated = [...(pageData.banners || [])];
                                updated[idx] = { ...updated[idx], link: e.target.value };
                                updateField("banners", updated);
                              }}
                              className="text-[10px] text-gray-500 bg-white px-2 py-1 rounded border border-gray-200 outline-none w-28 truncate"
                              placeholder="/colleges"
                            />
                            <div className="flex items-center gap-1">
                              <button
                                disabled={idx === 0}
                                onClick={() => {
                                  const list = [...(pageData.banners || [])];
                                  const temp = list[idx - 1];
                                  list[idx - 1] = list[idx];
                                  list[idx] = temp;
                                  updateField("banners", list);
                                }}
                                className="p-1 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-20"
                                title="Move Slide Left"
                              >
                                <MoveUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                disabled={idx === (pageData.banners || []).length - 1}
                                onClick={() => {
                                  const list = [...(pageData.banners || [])];
                                  const temp = list[idx + 1];
                                  list[idx + 1] = list[idx];
                                  list[idx] = temp;
                                  updateField("banners", list);
                                }}
                                className="p-1 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-20"
                                title="Move Slide Right"
                              >
                                <MoveDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  const updated = (pageData.banners || []).filter((_: any, i: number) => i !== idx);
                                  updateField("banners", updated);
                                }}
                                className="p-1 text-red-500 hover:text-red-700"
                                title="Delete Banner"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. STATS COUNTERS */}
              <div className="p-6 mx-6 bg-white rounded-2xl border border-gray-200">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Key Statistics Counters
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  {(pageData.stats || []).map((st: any, i: number) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-center">
                      <input
                        type="text"
                        value={st.value || ""}
                        onChange={(e) => {
                          const updated = [...(pageData.stats || [])];
                          updated[i] = { ...updated[i], value: e.target.value };
                          updateField("stats", updated);
                        }}
                        className="text-xl font-bold font-sora text-d2c-navy bg-transparent text-center w-full outline-none"
                      />
                      <input
                        type="text"
                        value={st.label || ""}
                        onChange={(e) => {
                          const updated = [...(pageData.stats || [])];
                          updated[i] = { ...updated[i], label: e.target.value };
                          updateField("stats", updated);
                        }}
                        className="text-[10px] text-gray-500 bg-transparent text-center w-full outline-none mt-1"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              ABOUT US PAGE EDITING EXPERIENCE
          ══════════════════════════════════════════════════════════════ */}
          {slug === "about" && (
            <div className="p-8 md:p-12 space-y-8">
              <div className="space-y-4">
                <input
                  type="text"
                  value={pageData.badge || "India's Trusted Education Partner"}
                  onChange={(e) => updateField("badge", e.target.value)}
                  className="text-xs font-bold uppercase tracking-wider text-d2c-royal bg-blue-50 px-3 py-1 rounded-full outline-none w-64"
                />
                <input
                  type="text"
                  value={pageData.heading || "Bridging Dreams to Reality"}
                  onChange={(e) => updateField("heading", e.target.value)}
                  className="text-3xl md:text-4xl font-sora font-extrabold text-gray-900 bg-transparent outline-none w-full"
                />
                <input
                  type="text"
                  value={pageData.subheading || ""}
                  onChange={(e) => updateField("subheading", e.target.value)}
                  className="text-sm text-gray-600 bg-transparent outline-none w-full"
                />
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Founding Story Paragraph 1
                </label>
                <textarea
                  rows={4}
                  value={pageData.storyParagraph1 || ""}
                  onChange={(e) => updateField("storyParagraph1", e.target.value)}
                  className="w-full text-xs text-gray-800 bg-gray-50 p-3 rounded-xl border border-gray-200 outline-none focus:border-d2c-royal leading-relaxed"
                />

                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Founding Story Paragraph 2
                </label>
                <textarea
                  rows={4}
                  value={pageData.storyParagraph2 || ""}
                  onChange={(e) => updateField("storyParagraph2", e.target.value)}
                  className="w-full text-xs text-gray-800 bg-gray-50 p-3 rounded-xl border border-gray-200 outline-none focus:border-d2c-royal leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              CONTACT US PAGE EDITING EXPERIENCE
          ══════════════════════════════════════════════════════════════ */}
          {slug === "contact" && (
            <div className="p-8 md:p-12 space-y-8">
              <div className="space-y-3">
                <input
                  type="text"
                  value={pageData.badge || "24/7 Expert Support"}
                  onChange={(e) => updateField("badge", e.target.value)}
                  className="text-xs font-bold uppercase tracking-wider text-d2c-royal bg-blue-50 px-3 py-1 rounded-full outline-none w-48"
                />
                <input
                  type="text"
                  value={pageData.heading || "Get In Touch"}
                  onChange={(e) => updateField("heading", e.target.value)}
                  className="text-3xl md:text-4xl font-sora font-extrabold text-gray-900 bg-transparent outline-none w-full"
                />
                <input
                  type="text"
                  value={pageData.subheading || ""}
                  onChange={(e) => updateField("subheading", e.target.value)}
                  className="text-sm text-gray-600 bg-transparent outline-none w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-4 border-t border-gray-100">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <div className="flex items-center gap-2 text-d2c-royal font-bold">
                    <PhoneCall className="w-4 h-4" /> Official Phone Number
                  </div>
                  <input
                    type="text"
                    value={pageData.phone || ""}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full p-2 rounded-lg bg-white border border-gray-200 text-gray-900 font-semibold"
                  />
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <div className="flex items-center gap-2 text-d2c-royal font-bold">
                    <Mail className="w-4 h-4" /> Official Inquiries Email
                  </div>
                  <input
                    type="text"
                    value={pageData.email || ""}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full p-2 rounded-lg bg-white border border-gray-200 text-gray-900 font-semibold"
                  />
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold">
                    <PhoneCall className="w-4 h-4" /> WhatsApp Counselor Line
                  </div>
                  <input
                    type="text"
                    value={pageData.whatsapp || ""}
                    onChange={(e) => updateField("whatsapp", e.target.value)}
                    className="w-full p-2 rounded-lg bg-white border border-gray-200 text-gray-900 font-semibold"
                  />
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <div className="flex items-center gap-2 text-amber-600 font-bold">
                    <Clock className="w-4 h-4" /> Working & Counseling Hours
                  </div>
                  <input
                    type="text"
                    value={pageData.workingHours || ""}
                    onChange={(e) => updateField("workingHours", e.target.value)}
                    className="w-full p-2 rounded-lg bg-white border border-gray-200 text-gray-900 font-semibold"
                  />
                </div>

                <div className="md:col-span-2 p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <div className="flex items-center gap-2 text-blue-600 font-bold">
                    <MapPin className="w-4 h-4" /> Physical Office Address
                  </div>
                  <textarea
                    rows={2}
                    value={pageData.address || ""}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="w-full p-2 rounded-lg bg-white border border-gray-200 text-gray-900 text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              SIMULATED LEAD MODAL PREVIEW OVERLAY
          ══════════════════════════════════════════════════════════════ */}
          {showLeadModalPreview && (
            <div className="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
              <div className="w-full max-w-lg bg-[#0B1120]/95 border border-white/20 rounded-3xl p-6 text-white shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-bold text-d2c-gold uppercase tracking-wider">
                    {pageData.welcomeLeadModal?.badge || "SESSION 2026-27"}
                  </span>
                  <button
                    onClick={() => setShowLeadModalPreview(false)}
                    className="text-white/60 hover:text-white text-xs px-2 py-1 bg-white/10 rounded-lg"
                  >
                    Close Preview
                  </button>
                </div>
                <h3 className="text-xl font-bold font-sora text-white">
                  {pageData.welcomeLeadModal?.title || "Get 1-on-1 Direct Admission Guidance"}
                </h3>
                <p className="text-xs text-white/70">
                  {pageData.welcomeLeadModal?.subtitle || "Speak directly with senior counselors."}
                </p>
                <div className="space-y-2 text-xs">
                  <input disabled placeholder="Student Full Name" className="w-full p-2.5 rounded-xl bg-white/10 border border-white/10 text-white" />
                  <input disabled placeholder="Phone Number (WhatsApp Preferred)" className="w-full p-2.5 rounded-xl bg-white/10 border border-white/10 text-white" />
                  <input disabled placeholder="Target Course (e.g. B.Tech Computer Science)" className="w-full p-2.5 rounded-xl bg-white/10 border border-white/10 text-white" />
                </div>
                <button disabled className="w-full py-3 rounded-xl bg-gradient-to-r from-d2c-royal to-blue-600 text-white font-bold text-xs shadow-lg">
                  {pageData.welcomeLeadModal?.buttonText || "Request Free Counseling Call"}
                </button>
                <p className="text-[10px] text-center text-white/40">
                  Lead Modal Simulator • Matches public design with backdrop blur
                </p>
              </div>
            </div>
          )}

        </div>
      </ResponsiveCanvasWrapper>

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
    </div>
  );
}
