"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, PhoneCall } from "lucide-react"

export function CallbackModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [formData, setFormData] = useState({ name: "", phone: "", course: "Engineering" })
  const [status, setStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("SUBMITTING")
    // Simulation of API request to backend which will be built in Phase 7
    setTimeout(() => {
      setStatus("SUCCESS")
      setTimeout(() => {
        setStatus("IDLE")
        onClose()
      }, 3000)
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-d2c-navy/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 w-full max-w-md"
        >
          {/* Header */}
          <div className="bg-d2c-navy p-6 md:p-8 text-center relative border-b-4 border-d2c-royal">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 mx-auto bg-d2c-royal/20 rounded-full flex items-center justify-center mb-4">
              <PhoneCall className="w-8 h-8 text-d2c-royal animate-pulse" />
            </div>
            <h3 className="text-2xl font-sora font-bold text-white mb-2">Request Callback</h3>
            <p className="text-d2c-sky text-sm">Our expert counsellors will contact you within 24 hours.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-6">
            {status === "SUCCESS" ? (
              <div className="py-12 text-center text-d2c-success flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-d2c-success/10 rounded-full flex items-center justify-center text-3xl font-bold">✓</div>
                <h4 className="font-sora font-bold text-xl text-d2c-navy">Request Received!</h4>
                <p className="text-d2c-muted">We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-d2c-navy mb-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-d2c-navy mb-2">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-d2c-navy mb-2">Interested Course</label>
                  <select 
                    value={formData.course}
                    onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all bg-white"
                  >
                    <option value="Engineering">Engineering (B.Tech)</option>
                    <option value="Medical">Medical (MBBS, BDS)</option>
                    <option value="Management">Management (BBA, MBA)</option>
                    <option value="Law">Law</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  disabled={status === "SUBMITTING"}
                  className="w-full mt-2 py-4 bg-d2c-royal text-white font-semibold text-lg hover:bg-d2c-navy transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-d2c-royal/20"
                >
                  {status === "SUBMITTING" ? "Submitting..." : "Submit Request"}
                </button>
              </>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
