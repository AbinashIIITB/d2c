'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, Link as LinkIcon, Check } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  hint?: string;
  aspect?: 'square' | 'video' | 'wide' | 'auto';
}

export function ImageUploader({
  label,
  value = '',
  onChange,
  folder = 'colleges',
  hint,
  aspect = 'auto'
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [isManualUrl, setIsManualUrl] = useState(false);
  const [urlInput, setUrlInput] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setError('File is too large. Max size is 8MB.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload image');
      }

      onChange(data.url);
      setUrlInput(data.url);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleApplyUrl = () => {
    onChange(urlInput.trim());
    setIsManualUrl(false);
  };

  const handleRemove = () => {
    onChange('');
    setUrlInput('');
  };

  const getAspectClass = () => {
    switch (aspect) {
      case 'square': return 'aspect-square max-w-[140px]';
      case 'video': return 'aspect-video max-w-sm';
      case 'wide': return 'aspect-[21/9] max-w-md';
      default: return 'max-h-48 max-w-xs';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-d2c-navy">{label}</label>
        <button
          type="button"
          onClick={() => setIsManualUrl(!isManualUrl)}
          className="text-xs text-d2c-royal hover:underline flex items-center gap-1 font-medium"
        >
          <LinkIcon className="w-3 h-3" />
          {isManualUrl ? 'Upload file instead' : 'Enter URL manually'}
        </button>
      </div>

      {isManualUrl ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-1 focus:ring-d2c-royal outline-none"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-4 py-2 bg-d2c-royal hover:bg-d2c-navy text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" /> Apply
          </button>
        </div>
      ) : null}

      {value ? (
        <div className="relative group inline-block border border-gray-200 rounded-2xl overflow-hidden bg-gray-50 shadow-sm">
          <div className={`${getAspectClass()} overflow-hidden flex items-center justify-center p-2`}>
            <img
              src={value}
              alt={label}
              className="max-w-full max-h-full object-contain rounded-xl"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-white rounded-lg text-gray-700 hover:text-d2c-royal shadow-sm transition-colors text-xs font-medium flex items-center gap-1"
              title="Replace image"
            >
              <Upload className="w-3.5 h-3.5" /> Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-red-600 rounded-lg text-white hover:bg-red-700 shadow-sm transition-colors text-xs font-medium flex items-center gap-1"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 hover:border-d2c-royal/50 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-white hover:bg-gray-50/50 flex flex-col items-center justify-center group"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-d2c-royal animate-spin" />
              <p className="text-xs text-gray-500 font-medium">Uploading image to cloud storage...</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-d2c-royal/10 text-d2c-royal flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-d2c-navy">Click to upload {label.toLowerCase()}</p>
              <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP or SVG up to 8MB</p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
