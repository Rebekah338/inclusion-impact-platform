import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Impact Platform The Inclusion Edit",
  description: "Your members-only EDI learning and resource hub. Build capacity, grow capability, and create lasting change.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload hero images so they start fetching before CSS is parsed */}
        <link rel="preload" as="image" href="/homepage-hero.jpg" />
        <link rel="preload" as="image" href="/team-meeting.jpg" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
