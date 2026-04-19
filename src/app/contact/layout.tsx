import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us – Get Expert Admission Guidance",
  description: "Reach out to Direct2Campus for free admission counselling. Call, WhatsApp, or fill our form. Available 24/7 with average 2-minute response time.",
  keywords: ["contact Direct2Campus", "admission counselling", "free college counselling", "direct admission help"],
  alternates: { canonical: "https://direct2campus.com/contact" },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
