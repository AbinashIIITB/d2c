'use client';

import { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { iemChecklistDefaults, type IemChecklistContent } from '@/content/iem-btech.defaults';

export function DownloadChecklistButton({
  className,
  content = iemChecklistDefaults,
}: {
  className?: string;
  content?: IemChecklistContent;
}) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const checklistContent = content.fileText;

    const blob = new Blob([checklistContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = content.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={className || "px-6 py-3.5 rounded-xl bg-white border border-gray-200 hover:border-d2c-royal hover:bg-blue-50/50 text-d2c-navy font-bold text-xs md:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer group"}
    >
      {downloaded ? (
        <>
          <Check className="w-4 h-4 text-emerald-600" />
          <span className="text-emerald-700">{content.downloadedLabel}</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4 text-d2c-royal group-hover:translate-y-0.5 transition-transform" />
          <span>{content.buttonLabel}</span>
        </>
      )}
    </button>
  );
}
