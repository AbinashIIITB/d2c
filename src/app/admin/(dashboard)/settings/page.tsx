"use client";

import { useState, useEffect } from "react";
import { Settings as SettingsIcon, Shield, Bell, Key, Save, CheckCircle, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [email, setEmail] = useState("info@direct2campus.com");
  const [phone, setPhone] = useState("+91-6200325137");
  const [metaDesc, setMetaDesc] = useState(
    "Direct2Campus provides expert admission counseling and guidance for top engineering and medical colleges across India."
  );
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("d2c_platform_settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        /* eslint-disable react-hooks/set-state-in-effect */
        if (parsed.email) setEmail(parsed.email);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.metaDesc) setMetaDesc(parsed.metaDesc);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      localStorage.setItem(
        "d2c_platform_settings",
        JSON.stringify({ email, phone, metaDesc, updatedAt: new Date().toISOString() })
      );
      setTimeout(() => {
        setSaving(false);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }, 400);
    } catch {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gray-200/50 rounded-2xl flex items-center justify-center">
          <SettingsIcon className="w-6 h-6 text-gray-500" />
        </div>
        <div>
          <h1 className="text-3xl font-sora font-bold text-d2c-navy">Platform Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage global preferences and access</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 flex items-center gap-3 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
          <p className="font-bold text-sm">Site preferences updated and saved successfully!</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Security & Access */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-d2c-royal" />
            <h2 className="text-xl font-sora font-bold text-d2c-navy">Security & Roles</h2>
          </div>
          
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 mb-6">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Key className="w-4 h-4 text-d2c-gold" />
              <span>Authentication is currently enforced via environment policies. Administrative passwords and JWT secrets are managed via server environment keys.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Super Admin Role</div>
              <div className="text-lg font-bold text-d2c-navy mb-2">Username: admin</div>
              <div className="text-sm text-gray-500">Full access to create, update, and delete Colleges and Exams, plus metadata control.</div>
            </div>
            <div className="p-5 rounded-2xl border border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Editor Role</div>
              <div className="text-lg font-bold text-d2c-navy mb-2">Username: editor</div>
              <div className="text-sm text-gray-500">Restricted access intended for content editors.</div>
            </div>
          </div>
        </div>

        {/* Global SEO Settings */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-d2c-success" />
            <h2 className="text-xl font-sora font-bold text-d2c-navy">Global Site Preferences</h2>
          </div>
          
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">Primary Contact Email</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">Support Phone Number</label>
                <input 
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-d2c-navy mb-2">Global Meta Description (Fallback)</label>
              <textarea 
                rows={3}
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none text-d2c-navy"
              ></textarea>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button 
                type="submit" 
                disabled={saving}
                className="bg-d2c-royal hover:bg-d2c-navy text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" /> Save Preferences
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
