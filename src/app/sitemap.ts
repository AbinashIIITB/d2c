import { MetadataRoute } from "next"

// Data imports for dynamic routing
import { colleges, exams } from "@/lib/data"
import blogPosts from "@/data/blog.json"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://direct2campus.com"

  // Standard static routes
  const staticRoutes = [
    "",
    "/colleges",
    "/exams",
    "/mba",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Dynamic College Routes
  const collegeRoutes = colleges.map((college) => ({
    url: `${baseUrl}/colleges/${college.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  // Dynamic Exam Routes
  const examRoutes = exams.map((exam) => ({
    url: `${baseUrl}/exams/${exam.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  // Dynamic Blog Routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...collegeRoutes, ...examRoutes, ...blogRoutes]
}
