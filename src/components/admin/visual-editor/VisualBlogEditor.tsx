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
  Plus,
  Image as ImageIcon,
  Calendar,
  User,
  Clock,
  Tag,
  Trash2,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypographyToolbar } from "./TypographyToolbar";
import { ImagePickerModal } from "./ImagePickerModal";
import { AddSectionModal } from "./AddSectionModal";
import { BlogEditForm } from "../BlogEditForm";
import { ResponsiveCanvasWrapper } from "./ResponsiveCanvasWrapper";

interface VisualBlogEditorProps {
  initialData: any;
  isNew?: boolean;
}

export function VisualBlogEditor({ initialData, isNew = false }: VisualBlogEditorProps) {
  const router = useRouter();

  const [editorMode, setEditorMode] = useState<"visual" | "form">("visual");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const [blogData, setBlogData] = useState<any>({
    ...initialData,
    customSections: initialData.customSections || [],
    tags: initialData.tags || ["Admission Guidance", "Direct Admission"]
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
    title: "Change Blog Featured Image",
    currentUrl: "",
    onSelect: () => {}
  });

  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const updateField = (field: string, value: any) => {
    setBlogData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleAddSection = (sectionTemplate: any) => {
    const newSection = {
      id: `custom-${Date.now()}`,
      ...sectionTemplate
    };
    setBlogData((prev: any) => ({
      ...prev,
      customSections: [...(prev.customSections || []), newSection]
    }));
  };

  const removeCustomSection = (id: string) => {
    setBlogData((prev: any) => ({
      ...prev,
      customSections: (prev.customSections || []).filter((s: any) => s.id !== id)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      const url = `/api/admin/blogs/${blogData.id}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData)
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to save blog post");
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
          {blogData.slug && (
            <Link
              href={`/blog/${blogData.slug}`}
              target="_blank"
              className="text-xs text-white/70 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
            >
              <ExternalLink className="w-3.5 h-3.5 text-d2c-gold" />
              View Public Page
            </Link>
          )}
        </div>
        <BlogEditForm initialData={blogData} isNew={isNew} />
      </div>
    );
  }

  const canvasWidthClass = {
    desktop: "w-full max-w-4xl",
    tablet: "w-[768px] max-w-full shadow-2xl border-x-4 border-gray-800 rounded-3xl overflow-hidden my-4",
    mobile: "w-[390px] max-w-full shadow-2xl border-x-4 border-y-8 border-gray-800 rounded-[2.5rem] overflow-hidden my-4"
  }[deviceMode];

  return (
    <div className="min-h-screen pb-24 font-dm-sans bg-slate-100/70 -m-6 p-6">
      {/* Top Floating Bar */}
      <header className="sticky top-0 z-40 bg-[#0B1120] text-white border-b border-white/10 px-6 py-3.5 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4 mb-6 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blogs"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-base font-bold text-white font-sora truncate max-w-xs md:max-w-md">
                {blogData.title || "Untitled Blog Post"}
              </h1>
              <span className="text-[10px] bg-d2c-royal/80 px-2 py-0.5 rounded-full text-white font-semibold uppercase tracking-wider">
                Live Article Canvas
              </span>
            </div>
            <p className="text-[11px] text-white/50">Edit content directly in article preview</p>
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

          {blogData.slug && (
            <Link
              href={`/blog/${blogData.slug}`}
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
            {saving ? "Saving..." : "Save Blog"}
          </Button>
        </div>
      </header>

      {/* Floating Notifications */}
      {saveSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <p className="text-sm font-bold">Blog Post Published Successfully!</p>
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
      <ResponsiveCanvasWrapper deviceMode={deviceMode} desktopMaxWidthClass="w-full max-w-4xl">
        <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/80">
          
          {/* Article Header */}
          <div className="p-8 md:p-12 border-b border-gray-100 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-d2c-royal px-3 py-1 bg-blue-50 rounded-full">
                <input
                  type="text"
                  value={blogData.category || "Admission Guide"}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="bg-transparent outline-none font-bold text-d2c-royal w-32"
                />
              </span>
              <span className="text-xs text-gray-400">•</span>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  value={blogData.readTime || "5 min read"}
                  onChange={(e) => updateField("readTime", e.target.value)}
                  className="bg-transparent outline-none text-xs text-gray-500 w-24"
                />
              </div>
            </div>

            {/* Editable Title */}
            <input
              type="text"
              value={blogData.title || ""}
              onChange={(e) => updateField("title", e.target.value)}
              onFocus={() => {
                setSelectedElement({
                  id: "blog-title",
                  label: "Article Title",
                  styles: { fontSize: "text-3xl", fontWeight: "font-bold", color: "#131b2e" }
                });
              }}
              className="w-full text-2xl md:text-3xl font-sora font-extrabold text-gray-900 bg-transparent hover:bg-gray-50 focus:bg-blue-50/50 p-2 rounded-xl border border-transparent hover:border-gray-300 focus:border-d2c-royal outline-none"
              placeholder="Article Title..."
            />

            {/* Editable Excerpt */}
            <textarea
              rows={2}
              value={blogData.excerpt || ""}
              onChange={(e) => updateField("excerpt", e.target.value)}
              className="w-full text-sm text-gray-600 bg-transparent hover:bg-gray-50 p-2 rounded-xl border border-transparent hover:border-gray-300 focus:border-d2c-royal outline-none leading-relaxed"
              placeholder="Short lead excerpt..."
            />

            {/* Author info */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100 text-xs text-gray-500">
              <div className="w-8 h-8 rounded-full bg-d2c-navy text-white flex items-center justify-center font-bold">
                D2C
              </div>
              <div>
                <input
                  type="text"
                  value={blogData.author || "Direct2Campus Editorial Team"}
                  onChange={(e) => updateField("author", e.target.value)}
                  className="font-bold text-gray-800 bg-transparent outline-none block"
                />
                <input
                  type="text"
                  value={blogData.date || ""}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="text-[11px] text-gray-400 bg-transparent outline-none block"
                  placeholder="Publication Date"
                />
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative group p-6 bg-slate-50 border-b border-gray-100">
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gray-200 relative shadow-inner">
              <img
                src={blogData.imageUrl || blogData.image_url || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"}
                alt="Featured"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => {
                  setImagePicker({
                    isOpen: true,
                    title: "Change Blog Image",
                    currentUrl: blogData.imageUrl || blogData.image_url || "",
                    onSelect: (url) => updateField("imageUrl", url)
                  });
                }}
                className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg backdrop-blur-md"
              >
                <ImageIcon className="w-3.5 h-3.5 text-d2c-gold" />
                Change Featured Image
              </button>
            </div>
          </div>

          {/* Article Main Content (Editable) */}
          <div className="p-8 md:p-12 space-y-6">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Article Body Content (Markdown / HTML supported)
              </label>
              <textarea
                rows={12}
                value={blogData.content || ""}
                onChange={(e) => updateField("content", e.target.value)}
                className="w-full text-sm text-gray-800 bg-gray-50/70 p-4 rounded-2xl border border-gray-200 outline-none focus:border-d2c-royal leading-relaxed font-mono text-xs"
                placeholder="Write article content here..."
              />
            </div>

            {/* Custom Added Sections */}
            {(blogData.customSections || []).map((sec: any) => (
              <div key={sec.id} className="p-4 rounded-2xl bg-blue-50/40 border border-blue-200/60 relative">
                <button
                  onClick={() => removeCustomSection(sec.id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <input
                  type="text"
                  value={sec.title || ""}
                  onChange={(e) => {
                    const updated = (blogData.customSections || []).map((s: any) =>
                      s.id === sec.id ? { ...s, title: e.target.value } : s
                    );
                    updateField("customSections", updated);
                  }}
                  className="font-bold text-sm text-gray-900 bg-transparent outline-none w-full mb-1"
                />
                <textarea
                  rows={3}
                  value={sec.content || ""}
                  onChange={(e) => {
                    const updated = (blogData.customSections || []).map((s: any) =>
                      s.id === sec.id ? { ...s, content: e.target.value } : s
                    );
                    updateField("customSections", updated);
                  }}
                  className="w-full text-xs text-gray-700 bg-white p-2 rounded-lg border border-blue-100 outline-none"
                />
              </div>
            ))}
          </div>

          {/* Add Section */}
          <div className="p-6 bg-slate-50 border-t border-gray-200 text-center">
            <Button
              onClick={() => setIsAddSectionOpen(true)}
              className="bg-d2c-royal hover:bg-blue-700 text-white gap-2 text-xs font-semibold px-6 py-2 rounded-xl"
            >
              <Plus className="w-4 h-4" />
              Add Extra Section / Highlight Block
            </Button>
          </div>

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

      <AddSectionModal
        isOpen={isAddSectionOpen}
        onClose={() => setIsAddSectionOpen(false)}
        onAddSection={handleAddSection}
      />
    </div>
  );
}
