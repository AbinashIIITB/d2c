import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { AnimatedPatternBg } from "@/components/ui/AnimatedPatternBg"

export function Footer() {
  return (
    <footer className="bg-d2c-navy text-white pt-24 pb-24 md:pb-12 border-t-4 border-d2c-royal relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 mb-20">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link href="/" className="inline-block block w-full">
              <img 
                src="/logo-footer.png" 
                alt="Direct2Campus Logo" 
                className="h-20 md:h-24 w-auto object-contain object-left drop-shadow-lg -ml-2"
              />
            </Link>
            <p className="text-d2c-ice/80 text-sm leading-relaxed max-w-sm mt-2">
              Premium educational consultancy facilitating direct admissions into India&apos;s top Engineering, Medical, and Management institutions.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-d2c-royal hover:border-d2c-royal hover:scale-110 transition-all duration-300" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-d2c-royal hover:border-d2c-royal hover:scale-110 transition-all duration-300" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-d2c-royal hover:border-d2c-royal hover:scale-110 transition-all duration-300" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:ml-12">
            <h4 className="font-sora font-bold text-lg mb-6 relative pb-2 inline-block text-white after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-d2c-gold">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-4 text-d2c-ice/80 text-sm font-medium">
              <li><Link href="/about" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><span className="text-d2c-royal text-[10px]">▶</span> About Us</Link></li>
              <li><Link href="/colleges" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><span className="text-d2c-royal text-[10px]">▶</span> Partner Colleges</Link></li>
              <li><Link href="/exams" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><span className="text-d2c-royal text-[10px]">▶</span> Exam Guides</Link></li>
              <li><Link href="/mba" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><span className="text-d2c-royal text-[10px]">▶</span> MBA Admissions</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><span className="text-d2c-royal text-[10px]">▶</span> Contact Us</Link></li>
            </ul>
          </div>

          {/* Specializations */}
          <div>
            <h4 className="font-sora font-bold text-lg mb-6 relative pb-2 inline-block text-white after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-d2c-gold">
              Admissions
            </h4>
            <ul className="flex flex-col gap-4 text-d2c-ice/80 text-sm font-medium">
              <li><Link href="/colleges?type=engineering" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><span className="text-d2c-royal text-[10px]">▶</span> Engineering (B.Tech)</Link></li>
              <li><Link href="/colleges?type=medical" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><span className="text-d2c-royal text-[10px]">▶</span> Medical (MBBS, BDS)</Link></li>
              <li><Link href="/colleges?type=management" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><span className="text-d2c-royal text-[10px]">▶</span> Management (BBA, MBA)</Link></li>
              <li><Link href="/colleges?type=law" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><span className="text-d2c-royal text-[10px]">▶</span> Law (BA LLB)</Link></li>
              <li><Link href="/colleges?type=design" className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"><span className="text-d2c-royal text-[10px]">▶</span> Design & Architecture</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sora font-bold text-lg mb-6 relative pb-2 inline-block text-white after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-d2c-gold">
              Head Office
            </h4>
            <ul className="flex flex-col gap-5 text-d2c-ice/80 text-sm">
              <li className="flex flex-col gap-1">
                <span className="font-bold text-white text-xs uppercase tracking-wider text-d2c-sky">Address</span>
                <span className="leading-relaxed">Sector 5, Salt Lake City,<br />Kolkata, West Bengal 700091</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-bold text-white text-xs uppercase tracking-wider text-d2c-sky">Phone</span>
                <a href="tel:+919876543210" className="hover:text-white font-medium transition-colors text-lg">+91 98765 43210</a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-bold text-white text-xs uppercase tracking-wider text-d2c-sky">Email</span>
                <a href="mailto:info@direct2campus.com" className="hover:text-white font-medium transition-colors">info@direct2campus.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Office Location Map */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-white/5 w-full h-[250px] md:h-[300px] relative mix-blend-luminosity hover:mix-blend-normal transition-all duration-700">
          <div className="absolute inset-0 bg-d2c-navy/20 pointer-events-none z-10" />
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1444155160533!2d88.42635097607733!3d22.570063032930263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02750044088917%3A0x92751991b84ceab5!2sAurora%20Waterfront!5e0!3m2!1sen!2sin!4v1711847119!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Direct2Campus Head Office Location"
            className="filter grayscale-[50%] contrast-125"
          ></iframe>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-d2c-muted">
          <p className="font-medium tracking-wide">© {new Date().getFullYear()} Direct<span className="text-d2c-royal font-bold">2</span>Campus. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            
            {/* Admin Dashboard Entry Point */}
            <Link 
              href="/admin/login" 
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors ml-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="font-medium text-xs tracking-wider uppercase">Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

