import { Metadata } from "next"
import { LoginForm } from "@/components/auth/LoginForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg"

export const metadata: Metadata = {
  title: "Admin Portal | Direct2Campus",
  description: "Secure workspace for D2C administration.",
}

export default async function AdminLoginPage() {
  const session = await auth()
  
  if (session?.user) {
    redirect("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-d2c-navy flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-d2c-navy/90 backdrop-blur-sm"></div>
      <AnimatedPatternBg opacity={0.08} speed={180} />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center text-d2c-sky hover:text-white transition-colors text-sm mb-6 border border-white/10 px-4 py-2 rounded-full bg-white/5">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Website
          </Link>
          <img src="https://placehold.co/100x100/1B1F5E/ffffff?text=D2C" alt="D2C Logo" className="w-20 h-20 rounded-2xl mx-auto shadow-2xl shadow-d2c-navy/50 mb-4 border border-d2c-royal/30" />
          <h1 className="text-3xl font-sora font-bold text-white mb-2">Workspace Login</h1>
          <p className="text-d2c-ice/70 text-sm">Authorized D2C Personnel Only</p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
