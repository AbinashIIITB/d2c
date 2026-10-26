import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { checkAdminAuth } from '@/lib/auth';
import { fetchFromGoogleSheet, fetchFromAppsScript } from '@/lib/google-sheets';
import blogPosts from '@/data/blog.json';

export async function GET() {
  try {
    const session = await checkAdminAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Fetch live colleges and exams
    const { data: colleges } = await supabaseAdmin
      .from('colleges')
      .select('id, name, slug, state, location, tags, image_url, description, about');

    const { data: exams } = await supabaseAdmin
      .from('exams')
      .select('id, name, slug, tags, logo_url');

    // 2. Fetch live leads (Google Sheets or Apps Script)
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || '';
    const sheetId = process.env.GOOGLE_SHEET_ID || '';
    let leads: any[] = [];

    if (webhookUrl) {
      leads = await fetchFromAppsScript(webhookUrl);
    }
    if (leads.length === 0 && sheetId) {
      leads = await fetchFromGoogleSheet(sheetId);
    }

    // 3. Compute Real GEO Distribution
    const stateCounts: Record<string, number> = {};
    (colleges || []).forEach((c) => {
      let state = (c.state || '').trim();
      if (!state && c.location) {
        const parts = c.location.split(',');
        state = parts[parts.length - 1].trim();
      }
      if (!state) state = 'Other Regions';
      stateCounts[state] = (stateCounts[state] || 0) + 1;
    });

    const totalColleges = (colleges || []).length || 1;
    const geoDistribution = Object.entries(stateCounts)
      .map(([region, count]) => ({
        region,
        count,
        percentage: Math.round((count / totalColleges) * 100)
      }))
      .sort((a, b) => b.count - a.count);

    // 4. Compute Real SEO Keywords from live tags
    const keywordCounts: Record<string, number> = {};
    (colleges || []).forEach((c) => {
      (c.tags || []).forEach((t: string) => {
        const clean = t.trim().toLowerCase();
        if (clean) keywordCounts[clean] = (keywordCounts[clean] || 0) + 1;
      });
    });
    (exams || []).forEach((e) => {
      (e.tags || []).forEach((t: string) => {
        const clean = t.trim().toLowerCase();
        if (clean) keywordCounts[clean] = (keywordCounts[clean] || 0) + 1;
      });
    });

    const seoKeywords = Object.entries(keywordCounts)
      .map(([keyword, count]) => ({
        keyword,
        count,
        coverage: `${Math.round((count / totalColleges) * 100)}%`
      }))
      .sort((a, b) => b.count - a.count);

    // 5. Compute SEO Health Metrics
    const collegesWithTags = (colleges || []).filter(c => (c.tags || []).length > 0).length;
    const collegesWithImages = (colleges || []).filter(c => Boolean(c.image_url)).length;
    const collegesWithAbout = (colleges || []).filter(c => Boolean(c.about || c.description)).length;

    const staticRoutesCount = 9;
    const totalBlogs = (blogPosts || []).length;
    const totalExams = (exams || []).length;
    const totalIndexedUrls = staticRoutesCount + totalColleges + totalExams + totalBlogs;

    // 6. Lead Distribution by Target College
    const collegeDemandMap: Record<string, number> = {};
    leads.forEach((l) => {
      const target = l.interestedCollege || 'General Counseling';
      collegeDemandMap[target] = (collegeDemandMap[target] || 0) + 1;
    });

    const topDemandedColleges = Object.entries(collegeDemandMap)
      .map(([name, inquiries]) => ({ name, inquiries }))
      .sort((a, b) => b.inquiries - a.inquiries)
      .slice(0, 5);

    // 7. GA4 / Search Console Configuration Status
    const gaId = process.env.NEXT_PUBLIC_GA_ID || null;
    const gaConfigured = Boolean(gaId && gaId.startsWith('G-'));

    return NextResponse.json({
      success: true,
      kpis: {
        totalIndexedUrls,
        totalColleges,
        totalExams,
        totalBlogs,
        uniqueKeywords: seoKeywords.length,
        totalLeads: leads.length,
        gaConfigured,
        gaId,
        activeStatesCount: geoDistribution.length
      },
      geoDistribution,
      seoKeywords: seoKeywords.slice(0, 20),
      topDemandedColleges,
      health: {
        collegesWithTags,
        collegesWithImages,
        collegesWithAbout,
        tagsHealthPct: Math.round((collegesWithTags / totalColleges) * 100),
        imagesHealthPct: Math.round((collegesWithImages / totalColleges) * 100),
        contentHealthPct: Math.round((collegesWithAbout / totalColleges) * 100),
      }
    });
  } catch (error: any) {
    console.error('Error generating analytics:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
