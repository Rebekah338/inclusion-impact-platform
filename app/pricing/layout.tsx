import type { ReactNode } from "react";

export const metadata = {
  title: "Membership Pricing | The Inclusion Edit",
  description: "Individual memberships from £34 a month, and organisation seat packs from £1,750 a year. Choose by the people who will use it. No VAT is added.",
};

const PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "The Impact Platform",
  "brand": {
    "@type": "Organization",
    "name": "The Inclusion Edit"
  },
  "description": "Inclusion learning, practical tools, research, Inclusion AI and expert support for individuals and organisations.",
  "offers": [
    {
      "@type": "Offer",
      "name": "Individual (yearly)",
      "price": "345",
      "priceCurrency": "GBP",
      "url": "https://theinclusionedit.com/pricing"
    },
    {
      "@type": "Offer",
      "name": "Practitioner Plus (yearly)",
      "price": "495",
      "priceCurrency": "GBP",
      "url": "https://theinclusionedit.com/pricing"
    },
    {
      "@type": "Offer",
      "name": "The Expert Track (yearly)",
      "price": "1800",
      "priceCurrency": "GBP",
      "url": "https://theinclusionedit.com/pricing"
    },
    {
      "@type": "Offer",
      "name": "Small Teams, 5 seats (yearly)",
      "price": "1750",
      "priceCurrency": "GBP",
      "url": "https://theinclusionedit.com/pricing"
    },
    {
      "@type": "Offer",
      "name": "Growing Teams, 10 seats (yearly)",
      "price": "2950",
      "priceCurrency": "GBP",
      "url": "https://theinclusionedit.com/pricing"
    },
    {
      "@type": "Offer",
      "name": "Established Teams, 25 seats (yearly)",
      "price": "5500",
      "priceCurrency": "GBP",
      "url": "https://theinclusionedit.com/pricing"
    }
  ]
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_SCHEMA) }} />
      {children}
    </>
  );
}
