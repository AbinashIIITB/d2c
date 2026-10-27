'use client';

import { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { CircleLoader } from './CircleLoader';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title: string;
  itemName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export function ConfirmDeleteModal({
  isOpen,
  title,
  itemName,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    setError('');
    try {
      await onConfirm();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to delete');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-150 space-y-5">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="text-xl font-sora font-bold text-d2c-navy">{title}</h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Are you sure you want to permanently delete <span className="font-bold text-d2c-navy">&ldquo;{itemName}&rdquo;</span>? This action cannot be undone and will remove the public page immediately.
          </p>
        </div>

        {error && (
          <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 font-medium">
            {error}
          </p>
        )}

        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 font-bold text-xs transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-md shadow-red-600/20 disabled:opacity-50"
          >
            {loading ? (
              <>
                <CircleLoader size="xs" color="white" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" /> Delete Permanently
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
