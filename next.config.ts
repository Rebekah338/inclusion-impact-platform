import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/waitlist", destination: "/early-access", permanent: false },
      // Until member sign up is built, sign up links go to the early access list (?tier= is kept)
      { source: "/sign-up", destination: "/early-access", permanent: false },
      { source: "/sign-up/:path*", destination: "/early-access", permanent: false },
      // Old Wix addresses, so links in past emails, social posts and Google still work
      { source: "/subscribe-here", destination: "/subscribe", permanent: true },
      { source: "/faq", destination: "/faqs", permanent: true },
      // Policies now live under /legal
      { source: "/privacy", destination: "/legal/privacy", permanent: true },
      { source: "/privacy-policy", destination: "/legal/privacy", permanent: true },
      { source: "/accessibility", destination: "/legal/accessibility", permanent: true },
      { source: "/terms", destination: "/legal/terms", permanent: true },
      { source: "/cookies", destination: "/legal/cookies", permanent: true },
    ];
  },
};

export default nextConfig;
