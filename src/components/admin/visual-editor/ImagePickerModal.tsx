"use client";

import { useState } from "react";
import { X, Image as ImageIcon, Upload, Check, Link as LinkIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (url: string, altText?: string) => void;
  currentUrl?: string;
  currentAlt?: string;
  title?: string;
}

const PRESET_IMAGES = [
  { label: "Modern Campus Exterior", url: "/images/colleges/iem-saltlake.jpg" },
  { label: "Graduation Celebration", url: "/images/hero-graduation-bg.png" },
  { label: "Medical Sciences Campus", url: "/images/banners/heritage_enhanced.png" },
  { label: "Technology Innovation Park", url: "/images/banners/jis_enhanced.png" },
  { label: "Campus Main Building", url: "/images/banners/ncr_enhanced.png" },
];

export function ImagePickerModal({
  isOpen,
  onClose,
  onSelectImage,
  currentUrl = "",
  currentAlt = "",
  title = "Change Image",
}: ImagePickerModalProps) {
  const [imageUrl, setImageUrl] = useState(currentUrl);
  const [altText, setAltText] = useState(currentAlt);
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleApply = () => {
    if (imageUrl) {
      onSelectImage(imageUrl, altText);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#0B1120] text-white rounded-3xl border border-white/[0.12] shadow-2xl w-full max-w-xl overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3B4CC0]/15 flex items-center justify-center text-[#3B4CC0]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-sora font-bold text-white">{title}</h3>
              <p className="text-xs text-white/50">Replace image URL or upload a new asset</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Live Preview */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
              Image Preview
            </span>
            <div className="w-full h-44 rounded-2xl bg-black/40 border border-white/[0.08] overflow-hidden relative flex items-center justify-center">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={altText || "Preview"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-white/30 text-xs">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  No image selected
                </div>
              )}
            </div>
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-[#f6c804]" />
              Image URL or Local Path
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://... or /images/..."
              className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#3B4CC0]"
            />
          </div>

          {/* Upload Button */}
          <div className="flex items-center gap-3">
            <label className="flex-1 cursor-pointer">
              <div className="w-full h-11 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] flex items-center justify-center gap-2 text-sm font-semibold text-white/80 transition-colors">
                <Upload className="w-4 h-4 text-[#60A5FA]" />
                {uploading ? "Uploading..." : "Upload Local Image"}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {/* SEO Alt Text */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
              Image Alt Text (SEO)
            </label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Descriptive image label for search engines"
              className="w-full h-10 px-4 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#3B4CC0]"
            />
          </div>

          {/* Presets */}
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#f6c804] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Quick Presets
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_IMAGES.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setImageUrl(p.url);
                    setAltText(p.label);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    imageUrl === p.url
                      ? "bg-[#3B4CC0] border-[#3B4CC0] text-white font-bold"
                      : "bg-white/[0.04] border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
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
            onClick={handleApply}
            className="bg-[#3B4CC0] hover:bg-[#2e3ba0] text-white font-bold px-6"
          >
            <Check className="w-4 h-4 mr-1.5" />
            Apply Image
          </Button>
        </div>
      </div>
    </div>
  );
}
