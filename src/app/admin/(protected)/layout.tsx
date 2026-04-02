import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Users, Image as ImageIcon, FileText, Settings, LogOut, ShieldAlert } from "lucide-react"
import { SignOutButton } from "@/components/auth/SignOutButton"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  // Example subset of permitted links. Only OWNER can see Settings.
  const navLinks = [
    { name: "Live Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, roles: ["OWNER", "ADMIN", "EDITOR"] },
    { name: "Content Submissions", href: "/admin/content", icon: FileText, roles: ["OWNER", "ADMIN", "EDITOR"] },
    { name: "Banners Setup", href: "/admin/banners", icon: ImageIcon, roles: ["OWNER", "ADMIN"] },
    { name: "Manage Staff", href: "/admin/users", icon: Users, roles: ["OWNER"] },
    { name: "Security Sync", href: "/admin/security", icon: Settings, roles: ["OWNER"] },
  ]

  const permittedLinks = navLinks.filter(link => link.roles.includes(session.user.role as string))

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-64 bg-d2c-navy flex flex-col text-white shadow-2xl relative z-20">
        <div className="p-6 border-b border-white/10">
          <div className="font-sora font-bold text-xl tracking-wide flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-d2c-sky" />
            <span className="text-white">Admin</span><span className="text-d2c-sky">Portal</span>
          </div>
          <div className="mt-4 inline-flex px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-widest text-d2c-ice uppercase border border-white/5">
            Role: {session.user.role}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {permittedLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-d2c-ice hover:bg-white/10 hover:text-white transition-colors font-medium"
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="mb-4 px-4">
            <div className="text-sm font-semibold truncate">{session.user.name || "Administrator"}</div>
            <div className="text-xs text-d2c-ice/60 truncate">{session.user.email}</div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <header className="bg-white h-16 border-b border-gray-200 flex items-center px-8 shadow-sm justify-between z-10">
          <h2 className="font-sora font-semibold text-d2c-navy">D2C Management Network</h2>
          <div className="text-sm text-d2c-muted">Server Status: <span className="text-d2c-success font-semibold px-2 py-1 bg-d2c-success/10 rounded-md">Online</span></div>
        </header>
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(27,31,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(27,31,94,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
