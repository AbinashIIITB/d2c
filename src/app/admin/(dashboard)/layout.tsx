import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminLoadingProvider } from '@/components/admin/AdminLoadingProvider';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLoadingProvider>
      <div className="min-h-screen bg-[#faf8ff] flex font-dm-sans">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8 min-h-screen">
          {children}
        </main>
      </div>
    </AdminLoadingProvider>
  );
}
