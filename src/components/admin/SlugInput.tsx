'use client';

import { Sparkles } from 'lucide-react';

interface SlugInputProps {
  label?: string;
  value: string;
  onChange: (slug: string) => void;
  sourceText?: string;
  prefix?: string;
  hint?: string;
}

export function SlugInput({
  label = 'URL Slug',
  value,
  onChange,
  sourceText = '',
  prefix = 'colleges',
  hint,
}: SlugInputProps) {
  const sanitize = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleGenerate = () => {
    if (!sourceText) return;
    onChange(sanitize(sourceText));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(sanitize(e.target.value));
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-d2c-navy">
          {label} <span className="text-red-500">*</span>
        </label>
        {sourceText && (
          <button
            type="button"
            onClick={handleGenerate}
            className="text-xs text-d2c-royal hover:underline flex items-center gap-1 font-medium"
          >
            <Sparkles className="w-3 h-3 text-d2c-gold" /> Auto-generate
          </button>
        )}
      </div>

      <div className="flex rounded-xl border border-gray-200 overflow-hidden focus-within:border-d2c-royal focus-within:ring-1 focus-within:ring-d2c-royal transition-all">
        <span className="bg-gray-100 text-gray-500 text-xs px-3.5 py-3 flex items-center select-none border-r border-gray-200 font-mono">
          /{prefix}/
        </span>
        <input
          type="text"
          required
          value={value}
          onChange={handleChange}
          placeholder="e.g. iit-bombay"
          className="flex-1 px-3.5 py-3 text-sm outline-none font-mono text-d2c-navy"
        />
      </div>

      <p className="text-[11px] text-gray-400">
        Live URL: <span className="text-d2c-royal font-mono font-medium">https://direct2campus.com/{prefix}/{value || '[slug]'}</span>
      </p>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
