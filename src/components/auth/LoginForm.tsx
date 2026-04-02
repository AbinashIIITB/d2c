"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, Mail, AlertCircle, Loader2 } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError("Invalid credentials. Please contact OWNER if you lost access.")
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 flex items-start gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-d2c-ice mb-2">Work Email</label>
          <div className="relative">
            <input 
              type="email" 
              required 
              disabled={isLoading}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/50 outline-none transition-all disabled:opacity-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@direct2campus.com"
            />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-d2c-ice mb-2">Password</label>
          <div className="relative">
            <input 
              type="password" 
              required 
              disabled={isLoading}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/50 outline-none transition-all disabled:opacity-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-d2c-sky hover:bg-white text-d2c-navy transition-all shadow-xl shadow-d2c-sky/20 mt-4 disabled:opacity-70"
        >
          {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</> : "Secure Login"}
        </button>
      </form>
      
      <div className="mt-6 text-center text-d2c-ice/50 text-xs">
        System monitored by <span className="font-semibold text-d2c-sky">D2C Security Center</span>
      </div>
    </div>
  )
}
