import { Metadata } from "next"

export const metadata: Metadata = { title: "Privacy Policy | Direct2Campus" }

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20 bg-d2c-white min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl prose prose-lg">
        <h1 className="text-4xl font-sora font-bold text-d2c-navy mb-8">Privacy Policy</h1>
        <p className="text-d2c-muted">Last updated: October 2025</p>
        <p>Your privacy is important to us. It is Direct2Campus' policy to respect your privacy regarding any information we may collect from you across our website, http://direct2campus.com, and other sites we own and operate.</p>
        <h2 className="text-2xl font-sora font-bold text-d2c-navy mt-8 mb-4">Information we collect</h2>
        <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.</p>
        <h2 className="text-2xl font-sora font-bold text-d2c-navy mt-8 mb-4">How we use your data</h2>
        <p>We use your contact details exclusively to provide educational counseling, updates on college criteria, and for lead management internally (via our CMS database). We do not share your information publicly or with third-parties, except when required to by law.</p>
      </div>
    </div>
  )
}
