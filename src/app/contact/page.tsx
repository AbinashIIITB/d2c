"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import Image from "next/image"
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg"
import { HeroBackground } from "@/components/ui/HeroBackground"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "Contact Us",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });
      
      if (!response.ok) throw new Error("Submission failed");
      
      setStatus("success")
      setFormData({ name: "", email: "", phone: "", message: "" })
      setTimeout(() => setStatus("idle"), 5000)
    } catch (error) {
      console.error(error);
      setStatus("idle");
    }
  }

  return (
    <div className="pb-20 bg-d2c-white min-h-screen">
      <section className="relative isolate flex flex-col items-center justify-center lg:justify-start min-h-[75vh] lg:min-h-[90vh] text-d2c-white pt-16 pb-12 md:pt-28 md:pb-20 lg:pt-36 overflow-hidden -mb-24 sm:-mb-36 lg:-mb-40">
        {/* ── Split Background Engine ── */}
        <div className="absolute inset-0 bottom-24 sm:bottom-36 lg:bottom-40 bg-d2c-navy z-0 border-b-4 border-d2c-royal" />

        <HeroBackground bottomOffsetClass="bottom-24 sm:bottom-36 lg:bottom-40" />

        <div className="content-boundary relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-5 md:mb-8 rounded-lg">
            <Phone className="w-4 h-4 text-d2c-sky" />
            <span className="text-sm font-medium tracking-wide text-white">24/7 Expert Support</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-sora font-bold tracking-tight mb-5 md:mb-8 text-balance leading-[1.1] text-white">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-d2c-sky to-d2c-ice">
              Touch
            </span>
          </h1>
          <p className="text-base md:text-xl text-d2c-ice/80 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed font-medium">
            Connect with our expert counselors to map out your admission journey securely and transparently.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-14 pt-6 md:pt-10 border-t border-white/10 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <Phone className="w-5 h-5 text-d2c-sky" />
              </div>
              <div className="text-left">
                <div className="text-base md:text-xl font-bold font-sora text-white">2 min</div>
                <div className="text-[10px] md:text-xs text-white/50 font-medium uppercase tracking-wider">Avg Response</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <Clock className="w-5 h-5 text-d2c-gold" />
              </div>
              <div className="text-left">
                <div className="text-base md:text-xl font-bold font-sora text-white">24/7</div>
                <div className="text-[10px] md:text-xs text-white/50 font-medium uppercase tracking-wider">Available</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-d2c-ice">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <Mail className="w-5 h-5 text-d2c-success" />
              </div>
              <div className="text-left">
                <div className="text-base md:text-xl font-bold font-sora text-white">500+</div>
                <div className="text-[10px] md:text-xs text-white/50 font-medium uppercase tracking-wider">Students Helped</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="content-boundary py-16 relative z-20">
        
        {/* Logo Placement in contents */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-sm h-20 sm:h-24 bg-d2c-navy rounded-2xl flex items-center justify-center p-4 sm:p-6 shadow-md border border-gray-100">
            <div className="relative w-full h-full opacity-95">
              <Image
                src="/logo-footer.png"
                alt="Direct2Campus"
                fill
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
            <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-8">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-d2c-navy mb-2">Full Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-d2c-navy mb-2">Phone Number</label>
                  <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-d2c-navy mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
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
                      GN-34/1, Aurora Water Front, Unit 21,<br />
                      11th Floor, Sector V, Salt Lake,<br />
                      Kolkata - 700091
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
                      +91 62003 25137
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
