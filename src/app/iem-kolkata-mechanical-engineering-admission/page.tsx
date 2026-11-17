import type { Metadata } from 'next';
import { getContent } from '@/lib/cms/content';
import { IemBranchLandingTemplate } from '@/components/landing/iem/IemBranchLandingTemplate';
import { buildIemMetadata } from '@/components/landing/iem/iemMetadata';
import type { IemBranchContent } from '@/content/iem-branch.schema';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent<IemBranchContent>('iem-mechanical');
  return buildIemMetadata(content.seo, content.ogImageAlt, '/iem-kolkata-mechanical-engineering-admission');
}

export default async function IemMeLandingPage() {
  const content = await getContent<IemBranchContent>('iem-mechanical');
  return <IemBranchLandingTemplate content={content} />;
}
