import type { Metadata } from 'next';
import { getContent } from '@/lib/cms/content';
import { IemBtechLanding } from '@/components/landing/iem/IemBtechLanding';
import { buildIemMetadata } from '@/components/landing/iem/iemMetadata';
import type { IemBtechContent } from '@/content/iem-btech.defaults';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent<IemBtechContent>('iem-btech');
  return buildIemMetadata(content.seo, content.ogImageAlt, '/btech-admission-in-iem-kolkata');
}

export default async function IemBtechLandingPage() {
  const content = await getContent<IemBtechContent>('iem-btech');
  return <IemBtechLanding content={content} />;
}
