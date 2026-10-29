import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminLoadingProvider } from '@/components/admin/AdminLoadingProvider';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLoadingProvider>
      <div className="min-h-screen bg-[#faf8ff] font-dm-sans">
        <AdminSidebar />
        <div className="pl-64 min-h-screen flex flex-col">
          <main className="flex-1 min-w-0 p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminLoadingProvider>
  );
}
