import type { Metadata } from 'next';
import IemBtechLandingPage, { generateMetadata as generateBtechMetadata } from '../btech-admission-in-iem-kolkata/page';

export const dynamic = 'force-dynamic';

// Alias of the B.Tech page with its own canonical (the og:url stays the B.Tech page, as before).
export async function generateMetadata(): Promise<Metadata> {
  const base = await generateBtechMetadata();
  return {
    ...base,
    alternates: {
      canonical: 'https://direct2campus.com/iem-kolkata-btech-admission',
    },
  };
}

export default IemBtechLandingPage;
