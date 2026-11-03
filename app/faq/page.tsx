import FaqClient from "./FaqClient";

export const metadata = {
  title: "FAQs | The Inclusion Edit",
  description: "Answers to common questions about The Inclusion Edit platform, membership, training, and consultancy.",
};

const faqData = [
  {
    category: "The Impact Platform",
    items: [
      { q: "What is the Impact Platform?", a: "The Impact Platform is our digital learning and tools hub; built for HR professionals, people managers, and EDI leads who want practical, evidence-based support." },
      { q: "How do I access the platform?", a: "You can join as a member via the Join Now button at the top of the page. Once signed up, you will have immediate access to your dashboard." },
      { q: "What is included in a membership?", a: "Membership includes access to CPD-accredited learning modules, downloadable resources, AI-powered tools, and our growing evidence library." },
    ],
  },
  {
    category: "Training and Consultancy",
    items: [
      { q: "Do you deliver training in-person or online?", a: "We deliver both; online via video platform and in-person across the UK and Bermuda. All programmes are bespoke to your organisation." },
      { q: "How do I book a consultation?", a: "Use the Book a consultation button on any page, or visit our Contact page to get in touch directly." },
      { q: "Do you work with small organisations?", a: "Yes. We work with organisations of all sizes; from SMEs to large corporates and public sector bodies." },
    ],
  },
  {
    category: "Membership and Billing",
    items: [
      { q: "Can I cancel my membership?", a: "Yes. You can cancel at any time from your account settings. Your access continues until the end of your billing period." },
      { q: "Do you offer team or organisation plans?", a: "Yes. Contact us for a bespoke team licence that suits your organisation's size and needs." },
    ],
  },
];

export default function FaqPage() {
  return <FaqClient grouped={faqData} />;
}
