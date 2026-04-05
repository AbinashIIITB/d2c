import { Metadata } from "next"
import Link from "next/link"
import { Calendar, User } from "lucide-react"
import blogPosts from "@/data/blog.json"

export const metadata: Metadata = {
  title: "Blog & Admission Insights | Direct2Campus",
  description: "Read latest tips, guides, and updates regarding college admissions and career counseling.",
}

export default function BlogListingPage() {
  return (
    <div className="pt-24 pb-20 bg-d2c-white min-h-screen">
      <div className="content-boundary">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-sora font-bold text-d2c-navy mb-6">Latest Updates & Guides</h1>
          <p className="text-lg text-d2c-muted max-w-2xl mx-auto">
            Stay informed with our expert insights on entrance exams, admission hacks, and college reviews.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-d2c-royal/10 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs font-semibold text-d2c-muted mb-4 uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                </div>
                <h2 className="text-xl font-sora font-bold text-d2c-navy mb-3 line-clamp-2 group-hover:text-d2c-royal transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-d2c-muted line-clamp-3 leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                <div className="text-d2c-royal font-bold text-sm tracking-wide">
                  Read Article →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
