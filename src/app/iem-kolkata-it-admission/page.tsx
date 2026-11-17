import type { Metadata } from 'next';
import { getContent } from '@/lib/cms/content';
import { IemBranchLandingTemplate } from '@/components/landing/iem/IemBranchLandingTemplate';
import { buildIemMetadata } from '@/components/landing/iem/iemMetadata';
import type { IemBranchContent } from '@/content/iem-branch.schema';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent<IemBranchContent>('iem-it');
  return buildIemMetadata(content.seo, content.ogImageAlt, '/iem-kolkata-it-admission');
}

export default async function IemItLandingPage() {
  const content = await getContent<IemBranchContent>('iem-it');
  return <IemBranchLandingTemplate content={content} />;
}
