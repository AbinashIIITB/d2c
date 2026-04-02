"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors w-full px-4 mt-2 font-medium"
    >
      <LogOut className="w-4 h-4" />
      Secure Logout
    </button>
  )
}
