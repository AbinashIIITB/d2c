"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, PhoneCall, MessageCircle, GraduationCap, ChevronDown } from "lucide-react"

export function ApplyModal({ isOpen, onClose, context = "General" }: { isOpen: boolean, onClose: () => void, context?: string }) {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", selection: "", course: "" })
  const [status, setStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE")
  const [mounted, setMounted] = useState(false)
  const [dbColleges, setDbColleges] = useState<{ id: string, name: string }[]>([])
  const [dbExams, setDbExams] = useState<{ id: string, name: string }[]>([])

  useEffect(() => {
    fetch("/api/colleges").then(res => res.json()).then(data => setDbColleges(data || []));
    fetch("/api/exams").then(res => res.json()).then(data => setDbExams(data || []));
  }, []);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      let defaultSelection = "";
      if (context.startsWith("College: ")) {
        defaultSelection = context.replace("College: ", "");
      } else if (context.startsWith("Exam Counseling: ")) {
        defaultSelection = context.replace("Exam Counseling: ", "");
      } else if (context.startsWith("Exam: ")) {
        defaultSelection = context.replace("Exam: ", "");
      }
      setFormData({ name: "", phone: "", email: "", selection: defaultSelection, course: "" });
      setStatus("IDLE");
    }
  }, [isOpen, context]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("SUBMITTING")
    
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "Application Form",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: `Application context: ${context}. Course: ${formData.course}`,
          interestedCollege: formData.selection || context
        }),
      });
      
      if (!response.ok) throw new Error("Submission failed");
      
      setStatus("SUCCESS")
      setTimeout(() => {
        setStatus("IDLE")
        setFormData({ name: "", phone: "", email: "", selection: "", course: "" })
        onClose()
      }, 3000)
    } catch (error) {
      console.error(error);
      setStatus("ERROR");
      setTimeout(() => setStatus("IDLE"), 3000);
    }
  }

  if (!isOpen || !mounted) return null

  const isExamMode = context.startsWith("Exam")

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-auto overflow-y-auto">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-d2c-navy/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 w-full max-w-2xl my-8"
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
              <GraduationCap className="w-8 h-8 text-d2c-royal animate-pulse" />
            </div>
            <h3 className="text-2xl font-sora font-bold text-white mb-2">Apply Now</h3>
            <p className="text-d2c-sky text-sm">Fill details below and we will get back to you.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-5">
            {status === "SUCCESS" ? (
              <div className="py-12 text-center text-d2c-success flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-d2c-success/10 rounded-full flex items-center justify-center text-3xl font-bold">✓</div>
                <h4 className="font-sora font-bold text-xl text-d2c-navy">Application Received!</h4>
                <p className="text-d2c-muted">We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                  <div>
                    <label className="block text-sm font-semibold text-d2c-navy mb-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 text-d2c-navy focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all rounded-lg"
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
                      className="w-full px-4 py-3 border border-gray-200 text-d2c-navy focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all rounded-lg"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-d2c-navy mb-2">Course/Branch</label>
                    <input 
                      required
                      type="text" 
                      value={formData.course}
                      onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 text-d2c-navy focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all rounded-lg"
                      placeholder="Select Course/Branch (eg B Tech, M Tech, etc)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-d2c-navy mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 text-d2c-navy focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all rounded-lg"
                      placeholder="Email (Optional)"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-d2c-navy mb-2">
                      {isExamMode ? "Interested Exam (Optional)" : "Interested College (Optional)"}
                    </label>
                    <select 
                      value={formData.selection}
                      onChange={(e) => setFormData(prev => ({ ...prev, selection: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 text-d2c-navy focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all rounded-lg appearance-none bg-white pr-10"
                    >
                      <option value="">{isExamMode ? "Select an exam" : "Select a college"}</option>
                      {isExamMode ? dbExams.map((exam) => (
                        <option key={exam.id} value={exam.name}>{exam.name}</option>
                      )) : dbColleges.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-[38px] w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={status === "SUBMITTING"}
                  className="w-full mt-2 py-4 bg-d2c-royal text-white font-semibold text-lg hover:bg-d2c-navy transition-colors rounded-xl disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-d2c-royal/20"
                >
                  {status === "SUBMITTING" ? "Submitting..." : "Submit Application"}
                </button>

                <div className="relative flex items-center pt-2">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink-0 mx-4 text-d2c-muted text-sm font-semibold">OR</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <a
                    href="tel:+916200325137"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-d2c-navy text-white rounded-lg font-semibold hover:bg-d2c-navy/90 transition-colors"
                  >
                    <PhoneCall className="w-5 h-5" />
                    Call Us
                  </a>
                  <a
                    href="https://wa.me/916200325137"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-[#25D366]/90 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    WhatsApp
                  </a>
                </div>
              </>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}
