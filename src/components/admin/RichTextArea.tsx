'use client';

interface RichTextAreaProps {
  label: string;
  value?: string;
  onChange: (val: string) => void;
  rows?: number;
  placeholder?: string;
  hint?: string;
  required?: boolean;
}

export function RichTextArea({
  label,
  value = '',
  onChange,
  rows = 4,
  placeholder = 'Write content here...',
  hint,
  required = false
}: RichTextAreaProps) {
  const charCount = (value || '').length;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-d2c-navy">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <span className="text-[11px] text-gray-400 font-mono">
          {charCount} characters
        </span>
      </div>

      <textarea
        rows={rows}
        value={value || ''}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-1 focus:ring-d2c-royal outline-none leading-relaxed transition-colors"
      />

      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
