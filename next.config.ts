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
    ];
  },
};

export default nextConfig;
