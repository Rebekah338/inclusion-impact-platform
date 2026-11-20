import type { Metadata } from "next";
import "./globals.css";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://theinclusionedit.com"),
  title: "The Inclusion Edit | Impact Platform, Inclusion Consultancy and Training",
  description: "Practical tools, evidence and expert support for the person carrying inclusion at work. The Impact Platform from award-winning consultancy The Inclusion Edit.",
  openGraph: {
    type: "website",
    siteName: "The Inclusion Edit",
    locale: "en_GB",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Inclusion Edit: Capacity. Capability. Change." }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://theinclusionedit.com/#organisation",
      "name": "The Inclusion Edit",
      "url": "https://theinclusionedit.com",
      "logo": "https://theinclusionedit.com/logo-short.png",
      "slogan": "Capacity. Capability. Change.",
      "description": "Award-winning inclusion consultancy and the Impact Platform: practical tools, learning, evidence and expert support for the people carrying inclusion in organisations worldwide.",
      "founder": {
        "@type": "Person",
        "name": "Rebekah Hayward"
      },
      "award": "Best EDI Consultancy, Corporate Vision HR and Employment Awards 2026",
      "areaServed": "Worldwide",
      "knowsAbout": [
        "Equity, diversity and inclusion",
        "Inclusive leadership",
        "Inclusive recruitment",
        "Inclusion strategy",
        "EDI training"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer enquiries",
        "url": "https://theinclusionedit.com/contact-us"
      },
      "sameAs": [
        "https://www.linkedin.com/company/the-inclusion-edit",
        "https://www.instagram.com/theinclusionedit",
        "https://www.tiktok.com/@theinclusionedit",
        "https://open.spotify.com/show/3CgmJvGUkTUOiKQN0UmJWM"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://theinclusionedit.com/#website",
      "url": "https://theinclusionedit.com",
      "name": "The Inclusion Edit",
      "inLanguage": "en-GB",
      "publisher": {
        "@id": "https://theinclusionedit.com/#organisation"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <AccessibilityToolbar />
      </body>
    </html>
  );
}
