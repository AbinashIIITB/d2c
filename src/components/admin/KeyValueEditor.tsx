'use client';

import { Plus, Trash2 } from 'lucide-react';

interface KeyValueItem {
  [key: string]: any;
}

interface KeyValueEditorProps {
  label: string;
  items?: KeyValueItem[];
  onChange: (items: KeyValueItem[]) => void;
  keyName?: string;
  valueName?: string;
  keyHeader?: string;
  valueHeader?: string;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  hint?: string;
}

export function KeyValueEditor({
  label,
  items = [],
  onChange,
  keyName = 'label',
  valueName = 'value',
  keyHeader = 'Label',
  valueHeader = 'Value',
  keyPlaceholder = 'e.g. Highest Package',
  valuePlaceholder = 'e.g. ₹44 LPA',
  hint,
}: KeyValueEditorProps) {
  const list = Array.isArray(items) ? items : [];

  const handleAdd = () => {
    onChange([...list, { [keyName]: '', [valueName]: '' }]);
  };

  const handleUpdate = (index: number, field: string, val: string) => {
    const updated = list.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: val };
      }
      return item;
    });
    onChange(updated);
  };

  const handleRemove = (index: number) => {
    onChange(list.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-d2c-navy">
          {label} <span className="text-xs font-normal text-gray-400">({list.length} rows)</span>
        </label>
        <button
          type="button"
          onClick={handleAdd}
          className="text-xs bg-d2c-royal/10 text-d2c-royal hover:bg-d2c-royal hover:text-white px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> Add Row
        </button>
      </div>

      {list.length === 0 ? (
        <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400 bg-gray-50/50">
          No entries yet. Click &quot;Add Row&quot; above to create one.
        </div>
      ) : (
        <div className="border border-gray-150 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-150 text-[11px] font-bold text-gray-500 uppercase tracking-wider px-3 py-2">
            <div className="col-span-6">{keyHeader}</div>
            <div className="col-span-5">{valueHeader}</div>
            <div className="col-span-1 text-center">Action</div>
          </div>
          <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
            {list.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 px-3 py-2 items-center hover:bg-gray-50/40">
                <div className="col-span-6">
                  <input
                    type="text"
                    value={item[keyName] || ''}
                    onChange={(e) => handleUpdate(idx, keyName, e.target.value)}
                    placeholder={keyPlaceholder}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 focus:border-d2c-royal outline-none"
                  />
                </div>
                <div className="col-span-5">
                  <input
                    type="text"
                    value={item[valueName] || ''}
                    onChange={(e) => handleUpdate(idx, valueName, e.target.value)}
                    placeholder={valuePlaceholder}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 focus:border-d2c-royal outline-none"
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="text-gray-400 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                    title="Delete row"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
