import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Live Dashboard | D2C Workspace",
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 border-t-4 border-t-d2c-royal">
          <div className="text-d2c-muted text-sm font-semibold mb-2">Total Callbacks</div>
          <div className="text-3xl font-sora font-bold text-d2c-navy">1,204</div>
          <div className="text-d2c-success text-sm mt-2 font-medium">+14% vs last week</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 border-t-4 border-t-d2c-success">
          <div className="text-d2c-muted text-sm font-semibold mb-2">Active Content Pages</div>
          <div className="text-3xl font-sora font-bold text-d2c-navy">83</div>
          <div className="text-d2c-muted text-sm mt-2">Colleges & Exams</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 border-t-4 border-t-d2c-gold">
          <div className="text-d2c-muted text-sm font-semibold mb-2">System Health</div>
          <div className="text-3xl font-sora font-bold text-d2c-navy">99.9%</div>
          <div className="text-d2c-muted text-sm mt-2">All DB Nodes synced</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-sora font-bold text-d2c-navy mb-4">Welcome to D2C Workspace</h2>
        <p className="text-d2c-muted mb-6 leading-relaxed">
          Select an action from the sidebar to manage your website content. Phase 6 implementation tasks will construct the specific data table views inside these components.
        </p>
        <div className="bg-d2c-ice rounded-xl p-4 border border-d2c-sky/20">
          <p className="text-sm text-d2c-navy"><span className="font-bold">Notice:</span> Only OWNER roles can access the Security Sync and Staff Management panels.</p>
        </div>
      </div>
    </div>
  )
}
