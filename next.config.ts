import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/waitlist", destination: "/early-access", permanent: false },
      // Until member sign up is built, sign up links go to the early access list (?tier= is kept)
      { source: "/sign-up", destination: "/early-access", permanent: false },
      { source: "/sign-up/:path*", destination: "/early-access", permanent: false },
      // Old Wix addresses, so links in past emails, social posts and Google still work
      { source: "/book-online", destination: "/contact-us", permanent: true },
      { source: "/book-online/:path*", destination: "/contact-us", permanent: true },
      { source: "/service-page/:path*", destination: "/contact-us", permanent: true },
      { source: "/inclusion-insights", destination: "/listen-and-read#blogs", permanent: true },
      { source: "/blog", destination: "/listen-and-read#blogs", permanent: true },
      { source: "/blog/:path*", destination: "/listen-and-read#blogs", permanent: true },
      { source: "/post/:path*", destination: "/listen-and-read#blogs", permanent: true },
      { source: "/podcast", destination: "/listen-and-read#podcast", permanent: true },
      { source: "/members-platform", destination: "/about-our-impact-platform", permanent: true },
      { source: "/membership", destination: "/pricing", permanent: true },
      { source: "/pricing-plans", destination: "/pricing", permanent: true },
      { source: "/pricing-plans/:path*", destination: "/pricing", permanent: true },
      { source: "/plans-pricing", destination: "/pricing", permanent: true },
      // Old Wix member area: members are told about the new platform by email; everyone else lands on early access
      { source: "/profile/:path*", destination: "/early-access", permanent: false },
      { source: "/account/:path*", destination: "/early-access", permanent: false },
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
