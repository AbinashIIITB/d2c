import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import blogPosts from "@/data/blog.json"

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  
  if (!post) {
    return { title: "Post Not Found" }
  }
  
  return {
    title: `${post.title} | D2C Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="pt-24 pb-20 bg-d2c-white min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-d2c-muted hover:text-d2c-royal transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm font-semibold text-d2c-muted mb-6 uppercase tracking-wider">
            <span className="flex items-center gap-1 bg-d2c-ice px-3 py-1 rounded-full text-d2c-navy"><Calendar className="w-4 h-4" /> {post.date}</span>
            <span className="flex items-center gap-1 bg-d2c-ice px-3 py-1 rounded-full text-d2c-navy"><User className="w-4 h-4" /> {post.author}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-sora font-bold text-d2c-navy leading-tight mb-8">
            {post.title}
          </h1>
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-auto rounded-3xl shadow-xl shadow-d2c-navy/5"
          />
        </header>

        <article className="prose prose-lg prose-d2c max-w-none text-d2c-text">
          <p className="text-xl leading-relaxed text-d2c-muted border-l-4 border-d2c-royal pl-6 italic mb-8">
            {post.excerpt}
          </p>
          
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-sora font-bold text-d2c-navy mb-4">Introduction</h2>
            <p className="mb-6 leading-relaxed">
              This is standard placeholder content replicating a rich text structure retrieved from a CMS. In production, this data block will be parsed from the Next.js API integrated with Prisma's <code>BlogPost</code> model configured earlier.
            </p>
            <p className="mb-6 leading-relaxed">
              Direct2Campus aims to scale this system such that 'Editors' (RBAC roles) can push these articles from the Admin dashboard directly into the Postgres DB.
            </p>
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-gray-100 text-center">
          <h3 className="text-xl font-sora font-bold text-d2c-navy mb-6">Share this article</h3>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 border border-gray-200 rounded-full font-semibold hover:border-d2c-royal hover:text-d2c-royal transition-colors bg-white">Twitter</button>
            <button className="px-6 py-2 border border-gray-200 rounded-full font-semibold hover:border-d2c-royal hover:text-d2c-royal transition-colors bg-white">LinkedIn</button>
          </div>
        </div>
      </div>
    </div>
  )
}
