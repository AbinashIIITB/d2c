import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Quote, Star, ArrowLeft, GraduationCap, MessageCircle } from "lucide-react"
import testimonialsData from "@/data/testimonials.json"

type Params = Promise<{ slug: string }>

interface Testimonial {
  id: number
  name: string
  slug?: string
  role: string
  message: string
  avatarUrl: string
  fullStory?: {
    headline: string
    college: string
    branch: string
    year: string
    examScore: string
    body: string[]
  }
}

const testimonials = testimonialsData as Testimonial[]

export async function generateStaticParams() {
  return testimonials
    .filter((t) => t.slug)
    .map((t) => ({ slug: t.slug! }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const testimonial = testimonials.find((t) => t.slug === slug)

  if (!testimonial || !testimonial.fullStory) {
    return { title: "Story Not Found" }
  }

  return {
    title: `${testimonial.name}'s Story — ${testimonial.fullStory.headline} | Direct2Campus`,
    description: `Read how ${testimonial.name} secured admission at ${testimonial.fullStory.college} through Direct2Campus.`,
  }
}

export default async function StoryPage({ params }: { params: Params }) {
  const { slug } = await params
  const testimonial = testimonials.find((t) => t.slug === slug)

  if (!testimonial || !testimonial.fullStory) {
    notFound()
  }

  const story = testimonial.fullStory

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ HERO ═══ */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0B1120]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,76,192,0.3),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(96,165,250,0.08),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B4CC0]/30 to-transparent" />

        <div className="content-boundary relative z-10 pt-28 pb-16 md:pt-32 md:pb-20">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm mb-10">
            <Link href="/" className="text-white/40 hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <span className="text-white/40">Success Stories</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <span className="text-[#f6c804]/80 font-medium truncate">{testimonial.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
            {/* Avatar */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#3B4CC0]/40 to-[#f6c804]/20 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)]">
                <img
                  src={testimonial.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=3B4CC0&color=fff&size=128`}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              {/* Name & Role */}
              <div className="flex flex-wrap gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#22c55e]/10 text-[#22c55e] rounded-lg text-[11px] font-bold tracking-[0.08em] uppercase border border-[#22c55e]/20">
                  <GraduationCap className="w-3 h-3" />
                  {story.branch}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#f6c804]/[0.08] text-[#f6c804] rounded-lg text-[11px] font-bold tracking-[0.08em] uppercase border border-[#f6c804]/[0.12]">
                  Batch {story.year}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-sora font-bold text-white leading-[1.15] tracking-[-0.02em] mb-4">
                {story.headline}
              </h1>

              <p className="text-lg text-[#60A5FA] font-medium mb-2">
                {testimonial.name} — {testimonial.role}
              </p>
              <p className="text-sm text-white/40">
                {story.examScore} • {story.college}
              </p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10">
          <div className="content-boundary">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06] backdrop-blur-xl">
              <div className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center">
                <p className="text-2xl font-bold font-sora text-[#f6c804] mb-1">{story.college.split(" ")[0]}</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">College</p>
              </div>
              <div className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center">
                <p className="text-2xl font-bold font-sora text-[#22c55e] mb-1">{story.branch}</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">Branch Secured</p>
              </div>
              <div className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center">
                <p className="text-2xl font-bold font-sora text-white mb-1">{story.examScore}</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">Exam Score</p>
              </div>
              <div className="flex flex-col items-center justify-center py-6 px-4 bg-[#0B1120]/60 backdrop-blur-sm text-center">
                <p className="text-2xl font-bold font-sora text-[#60A5FA] mb-1">{story.year}</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">Admission Year</p>
              </div>
            </div>
          </div>
          <div className="h-12 bg-gradient-to-b from-[#0B1120] to-white" />
        </div>
      </div>

      {/* ═══ STORY BODY ═══ */}
      <div className="content-boundary">
        <div className="max-w-3xl mx-auto">
          {/* Pull quote */}
          <div className="relative mb-16 px-2">
            <Quote className="absolute -top-4 -left-4 w-16 h-16 text-d2c-royal/10" />
            <blockquote className="relative z-10 text-2xl md:text-3xl font-sora font-bold text-d2c-navy leading-snug italic pl-8 border-l-4 border-d2c-gold">
              &ldquo;{testimonial.message}&rdquo;
            </blockquote>
            <div className="flex gap-1 mt-4 pl-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-d2c-gold text-d2c-gold" />
              ))}
            </div>
          </div>

          {/* Story paragraphs */}
          <article className="prose prose-lg max-w-none">
            {story.body.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-[#45464d] text-[1.1rem] leading-[1.9] mb-8 font-inter"
              >
                {paragraph}
              </p>
            ))}
          </article>

          {/* ── CTA Block ── */}
          <div className="mt-16 mb-20 bg-[#0B1120] rounded-[1.25rem] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,76,192,0.15),transparent_60%)]" />
            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-sora font-bold text-white mb-3">
                Want a Similar Success Story?
              </h3>
              <p className="text-white/50 text-base mb-8 max-w-lg mx-auto">
                Our expert counselors have helped hundreds of students get into their dream colleges. Your turn is next.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://wa.me/916200325137"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-xl transition-all duration-300 shadow-[0_12px_24px_-6px_rgba(37,211,102,0.3)] hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  WhatsApp Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/[0.06] hover:bg-white/[0.1] text-white font-semibold rounded-xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  Request Free Counselling
                </Link>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="pb-16">
            <Link
              href="/#testimonials"
              className="inline-flex items-center gap-2 text-d2c-royal font-semibold hover:text-d2c-navy transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all stories
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
