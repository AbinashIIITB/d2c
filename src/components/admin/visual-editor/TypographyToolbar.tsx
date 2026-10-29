"use client";

import { 
  Type, 
  Bold, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Palette, 
  Sparkles,
  Check
} from "lucide-react";

interface TypographyToolbarProps {
  currentStyles?: {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    textAlign?: string;
  };
  onStyleChange: (styleKey: string, value: string) => void;
  activeElementLabel?: string;
  onClose?: () => void;
}

const COLOR_PRESETS = [
  { label: "Navy", value: "#0B1120" },
  { label: "Royal Blue", value: "#3B4CC0" },
  { label: "Gold", value: "#f6c804" },
  { label: "Dark Gray", value: "#131b2e" },
  { label: "Muted Gray", value: "#45464d" },
  { label: "Emerald Green", value: "#22c55e" },
  { label: "Pure White", value: "#ffffff" },
];

const FONT_SIZES = [
  { label: "SM", value: "text-sm" },
  { label: "Base", value: "text-base" },
  { label: "LG", value: "text-lg" },
  { label: "XL", value: "text-xl" },
  { label: "2XL", value: "text-2xl" },
  { label: "3XL", value: "text-3xl" },
  { label: "4XL", value: "text-4xl" },
];

const FONT_WEIGHTS = [
  { label: "Regular", value: "font-normal" },
  { label: "Medium", value: "font-medium" },
  { label: "Semibold", value: "font-semibold" },
  { label: "Bold", value: "font-bold" },
  { label: "ExtraBold", value: "font-extrabold" },
];

export function TypographyToolbar({
  currentStyles = {},
  onStyleChange,
  activeElementLabel = "Selected Element",
  onClose,
}: TypographyToolbarProps) {
  return (
    <div className="bg-[#0B1120] text-white rounded-2xl border border-white/[0.12] shadow-2xl p-4 flex flex-wrap items-center gap-4 text-xs font-dm-sans z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
      <div className="flex items-center gap-2 border-r border-white/10 pr-3">
        <span className="w-2 h-2 rounded-full bg-[#f6c804] animate-pulse" />
        <span className="font-bold text-[#f6c804] uppercase tracking-wider text-[10px] truncate max-w-[140px]">
          {activeElementLabel}
        </span>
      </div>

      {/* Font Size Selector */}
      <div className="flex items-center gap-1.5">
        <span className="text-white/40 uppercase tracking-wider text-[9px] font-semibold">Size:</span>
        <div className="flex bg-white/[0.06] rounded-lg p-0.5 border border-white/[0.08]">
          {FONT_SIZES.map((sz) => (
            <button
              key={sz.value}
              type="button"
              onClick={() => onStyleChange("fontSize", sz.value)}
              className={`px-2 py-1 rounded text-[10px] font-semibold transition-all ${
                currentStyles.fontSize === sz.value
                  ? "bg-[#3B4CC0] text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {sz.label}
            </button>
          ))}
        </div>
      </div>

      {/* Font Weight Selector */}
      <div className="flex items-center gap-1.5">
        <span className="text-white/40 uppercase tracking-wider text-[9px] font-semibold">Weight:</span>
        <div className="flex bg-white/[0.06] rounded-lg p-0.5 border border-white/[0.08]">
          {FONT_WEIGHTS.map((wt) => (
            <button
              key={wt.value}
              type="button"
              onClick={() => onStyleChange("fontWeight", wt.value)}
              className={`px-2 py-1 rounded text-[10px] font-semibold transition-all ${
                currentStyles.fontWeight === wt.value
                  ? "bg-[#3B4CC0] text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {wt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Color Presets */}
      <div className="flex items-center gap-1.5">
        <span className="text-white/40 uppercase tracking-wider text-[9px] font-semibold">Color:</span>
        <div className="flex items-center gap-1.5 bg-white/[0.06] rounded-lg p-1 border border-white/[0.08]">
          {COLOR_PRESETS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => onStyleChange("color", c.value)}
              className="w-5 h-5 rounded-full border border-white/20 transition-transform hover:scale-110 flex items-center justify-center relative"
              style={{ backgroundColor: c.value }}
              title={c.label}
            >
              {currentStyles.color === c.value && (
                <Check className={`w-3 h-3 ${c.value === "#ffffff" ? "text-black" : "text-white"}`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Text Alignment */}
      <div className="flex items-center gap-1 bg-white/[0.06] rounded-lg p-0.5 border border-white/[0.08]">
        <button
          type="button"
          onClick={() => onStyleChange("textAlign", "text-left")}
          className={`p-1.5 rounded transition-colors ${
            currentStyles.textAlign === "text-left" ? "bg-[#3B4CC0] text-white" : "text-white/60 hover:text-white"
          }`}
          title="Align Left"
        >
          <AlignLeft className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onStyleChange("textAlign", "text-center")}
          className={`p-1.5 rounded transition-colors ${
            currentStyles.textAlign === "text-center" ? "bg-[#3B4CC0] text-white" : "text-white/60 hover:text-white"
          }`}
          title="Align Center"
        >
          <AlignCenter className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onStyleChange("textAlign", "text-right")}
          className={`p-1.5 rounded transition-colors ${
            currentStyles.textAlign === "text-right" ? "bg-[#3B4CC0] text-white" : "text-white/60 hover:text-white"
          }`}
          title="Align Right"
        >
          <AlignRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-auto text-white/40 hover:text-white text-xs px-2 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08]"
        >
          Done
        </button>
      )}
    </div>
  );
}
