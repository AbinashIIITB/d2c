'use client';

import { Save, Loader2, RotateCcw, ExternalLink, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface AdminFormSaveBarProps {
  saving: boolean;
  isDirty?: boolean;
  onSave: () => void;
  onReset?: () => void;
  previewUrl?: string;
  successMessage?: string;
  errorMessage?: string;
}

export function AdminFormSaveBar({
  saving,
  isDirty = true,
  onSave,
  onReset,
  previewUrl,
  successMessage,
  errorMessage,
}: AdminFormSaveBarProps) {
  return (
    <div className="sticky bottom-6 z-40 mt-10">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-gray-200/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {successMessage && (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle className="w-4 h-4" />
              <span>{successMessage}</span>
            </div>
          )}
          {errorMessage && (
            <div className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
              {errorMessage}
            </div>
          )}
          {!successMessage && !errorMessage && (
            <p className="text-xs text-gray-400">
              {isDirty ? 'Unsaved modifications pending' : 'All modifications saved'}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {previewUrl && (
            <Link
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-d2c-navy text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-d2c-royal" /> View Page
            </Link>
          )}

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              disabled={saving}
              className="px-4 py-2.5 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 text-xs font-bold transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Discard
            </button>
          )}

          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="bg-d2c-royal hover:bg-d2c-navy text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 shadow-md shadow-d2c-royal/20 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
