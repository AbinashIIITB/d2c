"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", course: "", message: "" })
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    // Simulate API form submission via server actions handling later in Phase 7
    setTimeout(() => {
      setStatus("success")
      setFormData({ name: "", email: "", phone: "", course: "", message: "" })
      setTimeout(() => setStatus("idle"), 5000)
    }, 1500)
  }

  return (
    <div className="pt-24 pb-20 bg-d2c-white min-h-screen">
      <div className="content-boundary">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-sora font-bold text-d2c-navy mb-6">Let's shape your future</h1>
          <p className="text-lg text-d2c-muted max-w-2xl mx-auto">
            Get in touch with our expert counselors to map out your admission journey securely and transparently.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
            <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-8">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-d2c-navy mb-2">Full Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-d2c-navy mb-2">Phone Number</label>
                  <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-d2c-navy mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-d2c-navy mb-2">Target Course</label>
                  <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all bg-white" value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})}>
                    <option value="">Select Course</option>
                    <option value="BTech">B.Tech / B.E.</option>
                    <option value="MBA">MBA / PGDM</option>
                    <option value="Medical">MBBS / BDS</option>
                    <option value="Law">Law (LLB / LLM)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">Your Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Tell us about your requirements..."></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === "submitting" || status === "success"}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  status === "success" 
                    ? "bg-d2c-success text-white" 
                    : "bg-d2c-navy hover:bg-d2c-royal text-white shadow-lg focus:ring-4 focus:ring-d2c-royal/30"
                }`}
              >
                {status === "submitting" ? (
                  <span className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</span>
                ) : status === "success" ? (
                  "Message Sent successfully!"
                ) : (
                  <><Send className="w-5 h-5" /> Send Message</>
                )}
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-d2c-navy text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <AnimatedPatternBg opacity={0.1} speed={170} />
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl font-bold"></div>
              <h3 className="text-xl font-sora font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-d2c-sky" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-d2c-ice mb-1">Our Office</h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      123 Business Avenue, Tech Park Building<br />
                      Block C, 4th Floor<br />
                      Bangalore, Karnataka 560001
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-d2c-sky" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-d2c-ice mb-1">Phone</h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      +91 98765 43210<br />
                      +91 87654 32109
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-d2c-sky" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-d2c-ice mb-1">Email</h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      admissions@direct2campus.com<br />
                      support@direct2campus.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-d2c-sky" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-d2c-ice mb-1">Working Hours</h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Mon - Sat: 9:00 AM - 7:00 PM<br />
                      Sunday: Closed (Available for emergencies)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
