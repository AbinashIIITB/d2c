"use client";

import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Video, File, X, CheckCircle, Search, Trash2, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AssetManager() {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [assets, setAssets] = useState([
    { id: 1, name: 'college-campus-1.jpg', size: '1.2 MB', type: 'image/jpeg', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800' },
    { id: 2, name: 'exam-banner-2027.png', size: '850 KB', type: 'image/png', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800' },
    { id: 3, name: 'student-testimonial.mp4', size: '12.4 MB', type: 'video/mp4', url: '' },
    { id: 4, name: 'about-us-hero.jpg', size: '2.1 MB', type: 'image/jpeg', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    setUploading(true);
    
    // Simulate upload process to CDN/Supabase Storage
    setTimeout(() => {
      const newAssets = Array.from(files).map((f, i) => ({
        id: Date.now() + i,
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(1) + ' MB',
        type: f.type,
        // Mock URL, in reality this would be the CDN URL returned by Supabase
        url: f.type.startsWith('image/') ? URL.createObjectURL(f) : ''
      }));
      
      setAssets(prev => [...newAssets, ...prev]);
      setUploading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-sora font-bold text-d2c-navy">Dynamic Asset Manager</h1>
          <p className="text-gray-500 mt-1">Upload and manage media for your colleges, exams, and blog posts with CDN support.</p>
        </div>
      </div>

      {/* Upload Zone */}
      <div 
        className={`relative w-full h-64 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-6 transition-all ${
          dragActive ? 'border-d2c-royal bg-d2c-royal/5' : 'border-gray-300 bg-white hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleChange}
          accept="image/*,video/*"
        />
        
        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-d2c-royal border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-d2c-navy font-semibold">Uploading to CDN...</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-d2c-royal/10 text-d2c-royal rounded-full flex items-center justify-center mb-4">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-d2c-navy mb-2">Drag & Drop files here</h3>
            <p className="text-gray-500 mb-6 text-sm">Supported formats: JPG, PNG, WEBP, MP4 (Max 50MB)</p>
            <button 
              onClick={() => inputRef.current?.click()}
              className="px-6 py-2.5 bg-d2c-navy text-white font-medium rounded-xl hover:bg-d2c-navy/90 transition-colors"
            >
              Browse Files
            </button>
          </>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mt-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative w-full max-w-sm">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-d2c-royal focus:ring-1 focus:ring-d2c-royal transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-gray-50 border border-gray-200 text-sm px-3 py-2 rounded-xl outline-none">
            <option>All Types</option>
            <option>Images</option>
            <option>Videos</option>
          </select>
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {assets.map((asset) => (
            <motion.div 
              key={asset.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group relative"
            >
              {/* Asset Preview */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                {asset.url && asset.type.startsWith('image/') ? (
                  <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400">
                    {asset.type.startsWith('video/') ? <Video className="w-12 h-12" /> : <File className="w-12 h-12" />}
                  </div>
                )}
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-d2c-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(asset.url || 'https://cdn.example.com/' + asset.name);
                      alert('CDN Link copied to clipboard!');
                    }}
                    className="w-10 h-10 bg-white text-d2c-navy rounded-full flex items-center justify-center hover:bg-d2c-sky transition-colors tooltip"
                    title="Copy CDN Link"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setAssets(assets.filter(a => a.id !== asset.id))}
                    className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Asset Details */}
              <div className="p-4">
                <p className="font-semibold text-d2c-navy truncate text-sm mb-1" title={asset.name}>{asset.name}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span className="uppercase">{asset.type.split('/')[1] || 'FILE'}</span>
                  <span>{asset.size}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
