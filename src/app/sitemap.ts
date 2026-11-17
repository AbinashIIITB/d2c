import { MetadataRoute } from "next";
import { getAllColleges, getAllExams, getAllBlogs } from "@/lib/data-service";
import { getAllPages } from "@/lib/page-service";
import { getContent } from "@/lib/cms/content";
import { siteDefaults, type SiteContent } from "@/content/site";

export const dynamic = "force-dynamic";

// IEM landing pages moved to new URLs: old slug -> new slug (the old paths 301 to the new ones).
const IEM_SLUG_MAP: Record<string, string> = {
  "direct-admission-in-iem-kolkata": "admission-in-iem-kolkata",
  "direct-admission-in-iem-2027": "admission-in-iem-kolkata",
  "btech-direct-admission-in-iem-kolkata": "btech-admission-in-iem-kolkata",
  "iem-kolkata-cse-direct-admission": "iem-kolkata-cse-admission",
  "iem-kolkata-cse-ai-ml-direct-admission": "iem-kolkata-cse-ai-ml-admission",
  "iem-kolkata-ece-direct-admission": "iem-kolkata-ece-admission",
  "iem-kolkata-it-direct-admission": "iem-kolkata-it-admission",
  "iem-kolkata-electrical-engineering-direct-admission": "iem-kolkata-electrical-engineering-admission",
  "iem-kolkata-mechanical-engineering-direct-admission": "iem-kolkata-mechanical-engineering-admission",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getContent<SiteContent>("site");
  const baseUrl = (site?.sitemap?.baseUrl || siteDefaults.sitemap.baseUrl).replace(/\/+$/, "");

  const [colleges, exams, blogs, pages] = await Promise.all([
    getAllColleges(),
    getAllExams(),
    getAllBlogs(),
    getAllPages()
  ]);

  // Standard static routes
  const staticRoutes = (site?.sitemap?.staticRoutes ?? siteDefaults.sitemap.staticRoutes).map((route) => ({
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
      url: `${baseUrl}/${IEM_SLUG_MAP[String(p.slug).toLowerCase()] ?? p.slug}`,
      lastModified: new Date(p.updatedAt || Date.now()),
      changeFrequency: (p.changeFrequency as any) || "weekly",
      priority: Number(p.sitemapPriority || 0.8),
    }));

  // Several old IEM slugs can map to one new URL: keep the first entry only.
  const seen = new Set<string>();
  const uniqueCustomRoutes = customPageRoutes.filter((r) => (seen.has(r.url) ? false : (seen.add(r.url), true)));

  return [...staticRoutes, ...collegeRoutes, ...examRoutes, ...blogRoutes, ...uniqueCustomRoutes];
}
