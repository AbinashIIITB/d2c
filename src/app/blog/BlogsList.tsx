"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Calendar, User, Clock, ArrowRight, BookOpen, Tag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface BlogItem {
  id: string | number
  title: string
  slug: string
  excerpt: string
  category?: string
  author?: string
  date?: string
  readTime?: string
  imageUrl?: string
  tags?: string[]
}

const CATEGORY_COLORS: Record<string, { bg: string, text: string }> = {
  "Admission Guide": { bg: "bg-blue-50", text: "text-d2c-royal" },
  "Entrance Exams": { bg: "bg-emerald-50", text: "text-emerald-700" },
  "College Reviews": { bg: "bg-purple-50", text: "text-purple-700" },
  "Engineering": { bg: "bg-amber-50", text: "text-amber-800" },
  "Medical": { bg: "bg-rose-50", text: "text-rose-700" },
}

export function BlogsList({ initialBlogs }: { initialBlogs: BlogItem[] }) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(initialBlogs.map(b => b.category).filter(Boolean)))]

  const filteredBlogs = initialBlogs.filter(blog => {
    const matchesSearch = 
      (blog.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (blog.excerpt || "").toLowerCase().includes(search.toLowerCase()) ||
      (blog.author || "").toLowerCase().includes(search.toLowerCase()) ||
      (blog.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      {/* Search and Category Filter Controls */}
      <div className="max-w-4xl mx-auto mb-14 flex flex-col md:flex-row items-center gap-4 relative z-40">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title, topic, or keyword..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 focus:border-d2c-royal focus:ring-2 focus:ring-d2c-royal/20 outline-none text-sm shadow-sm transition-all text-gray-800"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => {
            const active = selectedCategory === cat
            return (
              <button
                key={cat as string}
                onClick={() => setSelectedCategory(cat as string)}
                className={`px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  active
                    ? "bg-d2c-royal text-white shadow-md shadow-d2c-royal/25"
                    : "bg-white text-gray-600 hover:text-d2c-navy border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-150 p-10 max-w-xl mx-auto shadow-sm">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-sora font-bold text-d2c-navy mb-2">No Articles Found</h3>
          <p className="text-sm text-gray-400">
            No articles match &ldquo;{search}&rdquo;. Try another search term or reset filters.
          </p>
          <button
            onClick={() => { setSearch(""); setSelectedCategory("All"); }}
            className="mt-6 px-5 py-2.5 bg-d2c-royal text-white rounded-xl text-xs font-bold hover:bg-d2c-navy transition-colors shadow-sm"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredBlogs.map((blog, idx) => {
              const categoryColor = (blog.category && CATEGORY_COLORS[blog.category]) || {
                bg: "bg-blue-50",
                text: "text-d2c-royal"
              }

              return (
                <motion.article
                  key={blog.id || blog.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full card-ring"
                >
                  {/* Cover Image */}
                  <Link href={`/blog/${blog.slug}`} prefetch={true} className="block relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={blog.imageUrl || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    {blog.category && (
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm ${categoryColor.bg} ${categoryColor.text}`}>
                        {blog.category}
                      </span>
                    )}
                  </Link>

                  {/* Body Content */}
                  <div className="p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta info */}
                      <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-400 mb-3.5 uppercase tracking-wider">
                        {blog.date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {blog.date}
                          </span>
                        )}
                        {blog.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            {blog.readTime}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-sora font-bold text-d2c-navy mb-3 line-clamp-2 group-hover:text-d2c-royal transition-colors leading-snug">
                        <Link href={`/blog/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm text-d2c-muted line-clamp-3 leading-relaxed mb-6 font-normal">
                        {blog.excerpt}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-d2c-ice text-d2c-navy flex items-center justify-center font-bold text-xs">
                          <User className="w-3.5 h-3.5 text-d2c-royal" />
                        </div>
                        <span className="text-xs font-semibold text-gray-700 truncate max-w-[130px]">
                          {blog.author || "Akash Talks Team"}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${blog.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-d2c-royal group-hover:text-d2c-navy group-hover:translate-x-1 transition-all"
                      >
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
