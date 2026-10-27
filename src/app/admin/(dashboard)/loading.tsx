import { CircleLoader } from '@/components/admin/CircleLoader';

export default function AdminDashboardLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 animate-in fade-in duration-200">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-gray-150 flex flex-col items-center max-w-sm w-full mx-auto text-center space-y-4">
        <CircleLoader
          size="lg"
          color="royal"
          text="Loading Content..."
          subtext="Direct2Campus Admin Console"
        />
        <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-d2c-royal to-d2c-sky animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  );
}
