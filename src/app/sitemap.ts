import { MetadataRoute } from "next";
import { getAllColleges, getAllExams, getAllBlogs } from "@/lib/data-service";
import { getAllPages } from "@/lib/page-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://direct2campus.com";
  
  const [colleges, exams, blogs, pages] = await Promise.all([
    getAllColleges(),
    getAllExams(),
    getAllBlogs(),
    getAllPages()
  ]);

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
  }));

  // Dynamic College Routes
  const collegeRoutes = (colleges || []).map((college) => ({
    url: `${baseUrl}/colleges/${college.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic Exam Routes
  const examRoutes = (exams || []).map((exam) => ({
    url: `${baseUrl}/exams/${exam.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic Blog Routes (from CMS & database)
  const blogRoutes = (blogs || [])
    .filter(b => b.published !== false && b.slug)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.date || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  // Custom SEO Pages created by SEO Analyst
  const reservedSlugs = ['home', 'about', 'contact', 'mba', 'privacy', 'terms'];
  const customPageRoutes = (pages || [])
    .filter((p: any) => p.slug && !reservedSlugs.includes(p.slug.toLowerCase()) && p.published !== false && p.includeInSitemap !== false)
    .map((p: any) => ({
      url: `${baseUrl}/${p.slug}`,
      lastModified: new Date(p.updatedAt || Date.now()),
      changeFrequency: (p.changeFrequency as any) || "weekly",
      priority: Number(p.sitemapPriority || 0.8),
    }));

  return [...staticRoutes, ...collegeRoutes, ...examRoutes, ...blogRoutes, ...customPageRoutes];
}
