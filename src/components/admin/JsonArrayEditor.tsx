'use client';

import { useState } from 'react';
import { Plus, X, ListPlus } from 'lucide-react';

interface JsonArrayEditorProps {
  label: string;
  value?: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  hint?: string;
  asPills?: boolean;
}

export function JsonArrayEditor({
  label,
  value = [],
  onChange,
  placeholder = 'Add new item...',
  hint,
  asPills = false,
}: JsonArrayEditorProps) {
  const [inputValue, setInputValue] = useState('');
  const [showBulk, setShowBulk] = useState(false);
  const [bulkText, setBulkText] = useState('');

  const items = Array.isArray(value) ? value : [];

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (!items.includes(trimmed)) {
      onChange([...items, trimmed]);
    }
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleBulkAdd = () => {
    const lines = bulkText
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const merged = Array.from(new Set([...items, ...lines]));
    onChange(merged);
    setBulkText('');
    setShowBulk(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-d2c-navy">
          {label} <span className="text-xs font-normal text-gray-400">({items.length} items)</span>
        </label>
        <button
          type="button"
          onClick={() => setShowBulk(!showBulk)}
          className="text-xs text-d2c-royal hover:underline flex items-center gap-1 font-medium"
        >
          <ListPlus className="w-3 h-3" />
          {showBulk ? 'Single item input' : 'Paste multiple items'}
        </button>
      </div>

      {showBulk ? (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
          <textarea
            rows={3}
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            placeholder="Paste items separated by commas or line breaks..."
            className="w-full text-sm p-2.5 rounded-lg border border-gray-200 focus:border-d2c-royal outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowBulk(false)}
              className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-200 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleBulkAdd}
              className="px-3 py-1.5 bg-d2c-royal hover:bg-d2c-navy text-white text-xs font-bold rounded-lg transition-colors"
            >
              Add All
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-1 focus:ring-d2c-royal outline-none"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="px-4 py-2 bg-d2c-royal hover:bg-d2c-navy text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      )}

      {/* Render Items */}
      {items.length > 0 && (
        asPills ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {items.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-d2c-ice/40 border border-d2c-royal/15 rounded-lg text-xs font-medium text-d2c-navy"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="hover:text-red-500 rounded p-0.5 transition-colors"
                  title="Remove"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100/70 border border-gray-150 rounded-xl text-xs transition-colors"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="w-4 h-4 rounded-full bg-d2c-royal/10 text-d2c-royal flex items-center justify-center font-bold text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-d2c-navy font-medium truncate">{item}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="text-gray-400 hover:text-red-500 p-1 rounded-md transition-colors shrink-0"
                  title="Remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )
      )}

      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
