import IemBtechLandingPage, { metadata as btechMetadata } from '../btech-direct-admission-in-iem-kolkata/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...btechMetadata,
  alternates: {
    canonical: 'https://direct2campus.com/iem-kolkata-btech-admission'
  }
};

export default IemBtechLandingPage;
