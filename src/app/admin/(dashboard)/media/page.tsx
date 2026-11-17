'use client';

import { MediaLibrary } from '@/components/admin/cms/MediaLibrary';

export default function MediaPage() {
  return (
    <div className="w-full font-dm-sans pb-20 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-sora font-bold text-d2c-navy">Media library</h1>
        <p className="text-xs text-gray-500 mt-1">Upload, search and reuse images across the website. Click the copy icon to grab a URL.</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
        <MediaLibrary />
      </div>
    </div>
  );
}
