import type { Metadata } from 'next';
import { getContent } from '@/lib/cms/content';
import { IemBranchLandingTemplate } from '@/components/landing/iem/IemBranchLandingTemplate';
import { buildIemMetadata } from '@/components/landing/iem/iemMetadata';
import type { IemBranchContent } from '@/content/iem-branch.schema';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent<IemBranchContent>('iem-electrical');
  return buildIemMetadata(content.seo, content.ogImageAlt, '/iem-kolkata-electrical-engineering-admission');
}

export default async function IemEeLandingPage() {
  const content = await getContent<IemBranchContent>('iem-electrical');
  return <IemBranchLandingTemplate content={content} />;
}
