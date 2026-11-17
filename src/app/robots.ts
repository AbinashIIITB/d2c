import { MetadataRoute } from "next"
import { getContent } from "@/lib/cms/content"
import { siteDefaults, type SiteContent } from "@/content/site"

export const dynamic = "force-dynamic"

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getContent<SiteContent>("site")
  const r = site?.robots ?? siteDefaults.robots
  const allow = (r.allow ?? []).filter(Boolean)
  const disallow = (r.disallow ?? []).filter(Boolean)
  return {
    rules: {
      userAgent: r.userAgent || "*",
      ...(allow.length ? { allow: allow.length === 1 ? allow[0] : allow } : {}),
      ...(disallow.length ? { disallow } : {}),
    },
    ...(r.sitemapUrl ? { sitemap: r.sitemapUrl } : {}),
  }
}
