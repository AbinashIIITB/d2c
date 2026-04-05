import { Metadata } from "next"

export const metadata: Metadata = { title: "Terms and Conditions | Direct2Campus" }

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20 bg-d2c-white min-h-screen">
      <div className="content-boundary prose prose-lg">
        <h1 className="text-4xl font-sora font-bold text-d2c-navy mb-8">Terms of Service</h1>
        <p className="text-d2c-muted">Last updated: October 2025</p>
        <p>By accessing the website at http://direct2campus.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
        <h2 className="text-2xl font-sora font-bold text-d2c-navy mt-8 mb-4">Disclaimer</h2>
        <p>The materials on Direct2Campus' website are provided on an 'as is' basis. Direct2Campus makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        <h2 className="text-2xl font-sora font-bold text-d2c-navy mt-8 mb-4">Admissions</h2>
        <p>We facilitate counseling and management quota admissions. However, final admission grants are subject to the college's administrative discretion and the student's passing of the required background/academic checks.</p>
      </div>
    </div>
  )
}
