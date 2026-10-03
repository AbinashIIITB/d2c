import { Settings as SettingsIcon, Shield, Bell, Key, Save } from "lucide-react";

export default function SettingsPage() {
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
              <span>Authentication is currently enforced via hardcoded environment policies per your strict security requirements. Changes to administrative passwords must be made directly in the secure server repository.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Super Admin Role</div>
              <div className="text-lg font-bold text-d2c-navy mb-2">Username: admin</div>
              <div className="text-sm text-gray-500">Full access to create, edit, and delete Colleges and Exams, plus metadata control.</div>
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
          
          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">Primary Contact Email</label>
                <input 
                  type="email"
                  defaultValue="info@direct2campus.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">Support Phone Number</label>
                <input 
                  type="text"
                  defaultValue="+91-9874878782"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-d2c-navy mb-2">Global Meta Description (Fallback)</label>
              <textarea 
                rows={3}
                defaultValue="Direct2Campus provides expert admission counseling and guidance for top engineering and medical colleges across India."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal outline-none"
              ></textarea>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button type="button" className="bg-d2c-royal hover:bg-d2c-navy text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2">
                <Save className="w-5 h-5" /> Save Preferences
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
