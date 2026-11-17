import type { Metadata } from 'next';
import { getContent } from '@/lib/cms/content';
import { IemHubLanding } from '@/components/landing/iem/IemHubLanding';
import { buildIemMetadata } from '@/components/landing/iem/iemMetadata';
import type { IemHubContent } from '@/content/iem-hub.defaults';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent<IemHubContent>('iem-hub');
  return buildIemMetadata(content.seo, content.ogImageAlt, '/admission-in-iem-kolkata');
}

export default async function IemGeneralLandingPage() {
  const content = await getContent<IemHubContent>('iem-hub');
  return <IemHubLanding content={content} />;
}
