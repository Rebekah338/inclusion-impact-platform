// The Inclusion Edit policies. Drafted November 2026 for review by a solicitor before launch.
// Words in [square brackets] are details still to confirm. Each policy has its own page at /legal/<slug>.

export type Block = string | { list: string[] };
export type Section = { id: string; heading: string; body: Block[] };
export type Policy = {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  glance: string[];
  sections: Section[];
};

export const LEGAL_UPDATED = "19 November 2026";
export const CONTACT_EMAIL = "info@theinclusionedit.com";

const WHO_WE_ARE =
  "The Inclusion Edit is a trading name of [legal business name], [registered address], [company or registration number]. In these policies, \"we\", \"us\" and \"our\" mean The Inclusion Edit.";

export const POLICIES: Policy[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary: "What information we collect, why we collect it, who we share it with and your rights.",
    updated: LEGAL_UPDATED,
    glance: [
      "We only collect what we need to reply to you, send what you asked for and run our services.",
      "We never sell your information.",
      "You can unsubscribe from emails at any time, using the link in every email.",
      "You can ask to see, correct or delete your information by emailing " + CONTACT_EMAIL + ".",
    ],
    sections: [
      { id: "who-we-are", heading: "Who we are", body: [
        WHO_WE_ARE,
        "We are the controller of the personal information described in this policy. Our data protection registration number with the Information Commissioner's Office (ICO) is [ICO registration number].",
        "If you have any questions about this policy or your information, email " + CONTACT_EMAIL + ".",
      ] },
      { id: "what-we-collect", heading: "What we collect and why", body: [
        "We collect information when you choose to give it to us:",
        { list: [
          "Newsletter sign up: your name, email address and, if you choose to tell us, your job title, sector, role and how you heard about us. We use this to send you our newsletter and to understand who reads it.",
          "Early access list: your name, email address, organisation size and the membership you are interested in. We use this to contact you when the Impact Platform opens to your group, and to plan places.",
          "Contact form: your name, email address, organisation, what you are interested in and your message. We use this to reply to you.",
          "Free tools (Starting Point Finder, See What's Inside and Programme Finder): your email address and the answers you give, if you ask us to email your results. We use this to send your results and, only if you ask, our newsletter.",
          "Booking a call: our booking page is run by Calendly. The details you give there are used to arrange and hold the call.",
          "Consultancy and training clients: contact and billing details, and the information you share with us to deliver the work you have asked for.",
          "Impact Platform members: your account details, membership and payment records, your progress, and anything you choose to save or post on the platform.",
        ] },
        "We also keep anonymous counts of which options people choose in our free tools, so we can improve them. These counts do not identify you.",
      ] },
      { id: "lawful-bases", heading: "Our lawful reasons for using your information", body: [
        { list: [
          "Consent: for our newsletter and any marketing emails. You can withdraw consent at any time.",
          "Contract: to provide a membership, consultancy or training you have bought or asked us to quote for.",
          "Legitimate interests: to reply to enquiries, keep our services secure and improve them, in ways you would reasonably expect.",
          "Legal obligation: to keep financial records and meet other legal duties.",
        ] },
      ] },
      { id: "who-we-share-with", heading: "Who we share it with", body: [
        "We use trusted service providers to run our website and services. They may only use your information to provide their service to us:",
        { list: [
          "Mailchimp (Intuit): our newsletter and early access emails.",
          "Supabase: a secure backup of form sign ups.",
          "Resend: sending emails from our website, such as contact form messages and tool results.",
          "Vercel: hosting our website.",
          "Stripe: taking membership payments. We never see or store your full card details.",
          "Calendly: booking calls.",
          "Anthropic: powering the Inclusion AI tools on the Impact Platform. See our Inclusion AI Statement.",
          "Spotify: playing our podcast on the Listen and Read page.",
        ] },
        "We never sell your information, and we will only share it with anyone else if the law requires us to.",
      ] },
      { id: "international-transfers", heading: "International transfers", body: [
        "Some of our providers store or process information outside the UK, including in the United States. Where they do, we rely on safeguards recognised under UK data protection law, such as the UK Extension to the EU US Data Privacy Framework or the International Data Transfer Agreement.",
      ] },
      { id: "how-long", heading: "How long we keep it", body: [
        { list: [
          "Newsletter: until you unsubscribe.",
          "Early access list: until the platform opens to you, or for up to two years if you do not join.",
          "Enquiries: up to two years after our last contact, unless you become a client.",
          "Clients and members: for the length of our relationship, then six years for financial and legal records.",
        ] },
      ] },
      { id: "your-rights", heading: "Your rights", body: [
        "You have the right to:",
        { list: [
          "ask for a copy of the information we hold about you",
          "ask us to correct anything that is wrong",
          "ask us to delete your information",
          "object to, or ask us to limit, how we use it",
          "ask us to move it to another organisation",
          "withdraw your consent at any time, where we rely on consent",
        ] },
        "To use any of these rights, email " + CONTACT_EMAIL + ". We will reply within one month.",
        "If you are unhappy with how we have handled your information, please tell us first so we can put it right. You can also complain to the Information Commissioner's Office at ico.org.uk or on 0303 123 1113.",
      ] },
      { id: "security", heading: "Keeping it safe", body: [
        "We use secure, reputable providers, encrypted connections and access controls to protect your information. Only the people who need it to do their work can see it.",
      ] },
      { id: "changes", heading: "Changes to this policy", body: [
        "We will update this page if anything changes and show the date of the latest version at the top. If a change affects you significantly, we will tell you by email.",
      ] },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    summary: "The small files and settings our website stores on your device, and how to control them.",
    updated: LEGAL_UPDATED,
    glance: [
      "Our own website does not use advertising or tracking cookies.",
      "Your accessibility choices are saved on your device so you only set them once.",
      "Some pages include content from other services, such as our Spotify podcast player, which may set their own cookies.",
    ],
    sections: [
      { id: "what-are-cookies", heading: "What cookies are", body: [
        "Cookies are small files a website saves on your device. Similar technologies, such as your browser's local storage, work in the same way. We call them all cookies in this policy.",
      ] },
      { id: "what-we-use", heading: "What we use", body: [
        { list: [
          "Strictly necessary: what the website needs to work and stay secure. These cannot be switched off.",
          "Your preferences: your accessibility settings, such as text size, contrast and the easy to read font, are saved in your browser's local storage on your device. They are never sent to us. Use Reset All in the Accessibility panel, or clear your browser's site data, to remove them.",
        ] },
        "We do not currently use analytics, advertising or tracking cookies. If we add any in future, we will ask for your permission first and update this policy.",
      ] },
      { id: "other-services", heading: "Content from other services", body: [
        "Some pages show content from other services, and those services may set their own cookies:",
        { list: [
          "Spotify, for the podcast player on our Listen and Read page.",
          "Calendly, if you open our booking page.",
          "Stripe, when you pay for a membership, to keep payments secure and prevent fraud.",
        ] },
        "Their own cookie policies explain how they use them.",
      ] },
      { id: "control", heading: "How to control cookies", body: [
        "You can block or delete cookies in your browser settings. Blocking strictly necessary cookies may stop parts of the site from working.",
      ] },
    ],
  },
  {
    slug: "terms",
    title: "Website Terms of Use",
    summary: "The rules for using our website and free tools.",
    updated: LEGAL_UPDATED,
    glance: [
      "You are welcome to use our website and free tools for your own work and learning.",
      "Our content is general guidance, not legal advice for your situation.",
      "Please do not copy or resell our content without permission.",
    ],
    sections: [
      { id: "about", heading: "About these terms", body: [
        WHO_WE_ARE,
        "By using theinclusionedit.com you agree to these terms. If you buy a membership, our Membership Terms also apply. If you work with us on consultancy or training, the terms in your proposal or contract apply.",
      ] },
      { id: "using-our-content", heading: "Using our content", body: [
        "Everything on this website, including text, tools, images, guides and our brand, belongs to us or the people who have licensed it to us.",
        "You may view, print and share our pages for your own work and learning, as long as you credit The Inclusion Edit. You may not copy, adapt, sell or republish our content, or use it to train AI tools, without our written permission.",
      ] },
      { id: "guidance", heading: "Guidance, not legal advice", body: [
        "Our articles, tools and resources give general information about inclusion, equity and the law. They are not legal advice for your situation. Where we refer to the law, we say which country or jurisdiction it applies to. For decisions with legal consequences, please take professional advice.",
      ] },
      { id: "free-tools", heading: "Our free tools", body: [
        "Our free tools give suggestions based on the answers you provide. Please use your own judgement when acting on them. We may change or withdraw a tool at any time.",
      ] },
      { id: "acceptable-use", heading: "Using the website responsibly", body: [
        "Please do not misuse our website, for example by trying to access it without permission, introducing anything harmful, sending spam through our forms or collecting information about other people.",
      ] },
      { id: "links", heading: "Links to other websites", body: [
        "We link to other websites, such as research sources and partners. We are not responsible for their content or how they handle your information.",
      ] },
      { id: "liability", heading: "Our responsibility to you", body: [
        "We work hard to keep our website accurate and available, but we cannot promise it will always be error free or uninterrupted. Nothing in these terms limits our responsibility where the law does not allow us to.",
      ] },
      { id: "law", heading: "The law that applies", body: [
        "These terms are governed by the laws of [England and Wales or Bermuda: to confirm], and its courts will deal with any dispute.",
      ] },
    ],
  },
  {
    slug: "membership-terms",
    title: "Membership Terms",
    summary: "Billing, cancellation and what is included in your Impact Platform membership.",
    updated: LEGAL_UPDATED,
    glance: [
      "Memberships are billed yearly, or monthly for Individual and Practitioner Plus, and renew unless you cancel.",
      "Yearly memberships: cancel any time before your renewal date. Monthly memberships: cancel any time, and your access continues until the end of the month you’ve paid for.",
      "If you are buying as an individual consumer, you can cancel within 14 days of joining. See section 5.",
      "We will remind you before your membership renews.",
    ],
    sections: [
      { id: "about", heading: "1. About these terms", body: [
        WHO_WE_ARE,
        "These terms apply when you or your organisation buy a membership of the Impact Platform. Please read them before joining. When you join, we will ask you to confirm that you agree to them.",
      ] },
      { id: "memberships", heading: "2. Memberships and what is included", body: [
        "What each membership includes is set out on our Pricing page at the time you join. In summary:",
        { list: [
          "Individual: one named account with the resource library, all lessons, templates, guides, progress tracking and the Inclusion Editors community.",
          "Practitioner Plus: everything in Individual, plus the Inclusion AI tools, advanced resources and the full inclusion health check and action plan.",
          "The Expert Track: everything in Practitioner Plus, plus a guaranteed monthly 1:1 with Rebekah throughout the year. Places are limited.",
          "Organisation memberships (Small Teams, Growing Teams, Established Teams and Enterprise): the number of named full seats in your pack (5, 10, 25, or 50 or more), plus onboarding access for new starters: up to 25 a year on Small Teams, 50 on Growing Teams, 200 on Established Teams, and unlimited on Enterprise.",
        ] },
        "We add new content regularly and may update or replace content to keep it accurate. We will not remove the main features of your membership during your membership year.",
      ] },
      { id: "accounts-and-seats", heading: "3. Accounts and seats", body: [
        "Each named seat is for one person and must not be shared. An organisation can move a seat to a new person when someone leaves. New starter access gives the onboarding module only, unless the person is added as a named seat.",
        "Your organisation's administrator is responsible for who has a seat and for keeping the list up to date.",
        "Organisation memberships are chosen by the number of full seats you need, not by the size of your organisation. Each pack includes a set number of full seats and new starter onboarding places each year.",
        "If you need more, you can add full seats at any time at your pack's price per seat (£350 a seat a year on Small Teams, £295 on Growing Teams and £220 on Established Teams), or move up to a larger pack at renewal. If you need more new starter places than your pack includes, we will talk with you about moving up a pack.",
      ] },
      { id: "price-and-payment", heading: "4. Price and payment", body: [
        "The price is shown on our Pricing page and confirmed before you pay. We are not currently registered for VAT, so no VAT is added. If we register in future, VAT may be added from your next renewal, and we will tell you in your renewal reminder.",
        "Memberships are paid yearly in advance by card through Stripe. Individual and Practitioner Plus can also be paid monthly by card. If you pay monthly, you can cancel any time. Your access continues until the end of the month you’ve paid for, and you won’t be charged again. Organisations can ask to pay by invoice; invoices are due within [30] days.",
        "Your membership renews automatically at the end of each year. We will email you at least [30] days before it renews, with the renewal price. We may change prices for future years; any change will be in that reminder. If you joined through early access, your price will not change at your first two renewals.",
      ] },
      { id: "cooling-off", heading: "5. Your 14 day right to cancel (individual consumers)", body: [
        "If you are buying as an individual consumer rather than for a business, you have the right to cancel within 14 days of joining and receive a refund.",
        "When you join, you can choose to start using the platform straight away. If you do, we will ask you to confirm that you understand you will lose this right to cancel once you start accessing the platform's content. If you do not start using it, you can still cancel within the 14 days for a full refund.",
        "To cancel, email " + CONTACT_EMAIL + ".",
      ] },
      { id: "cancelling", heading: "6. Cancelling your membership", body: [
        "If you pay monthly, you can cancel any time. Your access continues until the end of the month you’ve paid for, and you won’t be charged again.",
        "You can cancel at any time before your renewal date by emailing " + CONTACT_EMAIL + ". Your membership then ends at the end of your current year, and you keep full access until then. We do not refund part years, except as set out in section 5 or where the law requires.",
      ] },
      { id: "using-the-platform", heading: "7. Using the platform", body: [
        "You may use the platform's content and downloads within your own organisation for training and development. You may not share your login, resell or republish our content, or use it to train AI tools. Please follow our Community Guidelines when posting in Inclusion Editors.",
        "We may suspend or end a membership if these terms are seriously broken, after telling you why where we can.",
      ] },
      { id: "guidance", heading: "8. Guidance, not legal advice", body: [
        "Our content, tools and expert sessions give guidance to support your work. They are not legal advice for your situation. Outputs from the Inclusion AI tools should be reviewed by a person before you use them; see our Inclusion AI Statement.",
      ] },
      { id: "availability", heading: "9. Availability", body: [
        "We aim to keep the platform available at all times, but there may be short breaks for maintenance or reasons outside our control. If the platform is unavailable for a long period, please contact us and we will put it right.",
      ] },
      { id: "liability", heading: "10. Our responsibility to you", body: [
        "If we fail to meet these terms, we are responsible for loss you suffer that was a foreseeable result. For business customers, our total responsibility is limited to the fees paid for the current membership year. Nothing in these terms limits responsibility that cannot be limited by law, or your rights as a consumer.",
      ] },
      { id: "law", heading: "11. The law that applies", body: [
        "These terms are governed by the laws of [England and Wales or Bermuda: to confirm]. If you are a consumer living elsewhere in the UK, you can also bring proceedings in your local courts.",
      ] },
    ],
  },
  {
    slug: "community-guidelines",
    title: "Community Guidelines",
    summary: "How we keep the Inclusion Editors community respectful, useful and safe.",
    updated: LEGAL_UPDATED,
    glance: [
      "Be respectful: disagree with ideas, never with people's identities.",
      "Keep confidences: do not share details that could identify a colleague or case.",
      "Share generously, and credit others' work.",
    ],
    sections: [
      { id: "purpose", heading: "Why we have these guidelines", body: [
        "Inclusion Editors is a space for the people leading inclusion to learn from each other. These guidelines keep it a place where everyone can take part honestly and safely.",
      ] },
      { id: "expect", heading: "What we ask of everyone", body: [
        { list: [
          "Be respectful and assume good intent. Challenge ideas, not people.",
          "Never post anything discriminatory, harassing or offensive.",
          "Protect confidentiality: remove names and details that could identify a colleague, client or case.",
          "Do not share anyone's personal information without their permission.",
          "Credit other people's work, and only share material you have the right to share.",
          "No advertising or selling, unless it has been agreed with us first.",
        ] },
      ] },
      { id: "moderation", heading: "How we moderate", body: [
        "Posts may be reviewed before they appear. We may edit or remove posts that do not follow these guidelines, and may suspend access for serious or repeated breaches. If you see something that concerns you, please report it or email " + CONTACT_EMAIL + ".",
      ] },
    ],
  },
  {
    slug: "inclusion-ai",
    title: "Inclusion AI Statement",
    summary: "How our AI tools work, what happens to what you type into them and how to use them well.",
    updated: LEGAL_UPDATED,
    glance: [
      "Our AI tools support your judgement; they never replace it.",
      "Please do not enter personal or sensitive information about real people.",
      "What you type is not used to train AI models.",
      "Always review AI outputs before you use them.",
    ],
    sections: [
      { id: "our-approach", heading: "Our approach", body: [
        "We are a human led, technology enabled organisation. Our Inclusion AI tools are designed by inclusion experts to save you time and help you get started, for example by reviewing a job description or drafting a policy statement. They support your expertise and judgement; they do not replace them, or the lived experience of the people affected.",
      ] },
      { id: "how-they-work", heading: "How the tools work", body: [
        "The tools use AI models provided by Anthropic. When you submit text, it is sent securely to Anthropic to produce a response. Under Anthropic's commercial terms, what you submit is not used to train its models. [Confirm Anthropic's current data retention period before launch.]",
      ] },
      { id: "what-to-enter", heading: "What to enter, and what not to", body: [
        "Please do not enter names or details that could identify a real person, or sensitive information such as health, ethnicity, religion or sexual orientation about anyone. Remove these details from documents before you upload or paste them.",
      ] },
      { id: "reviewing-outputs", heading: "Reviewing what the tools produce", body: [
        "AI can make mistakes, miss context or reflect bias. Please read every output carefully, check it against your own knowledge and policies, and adapt it before you use it. AI outputs are not legal advice. Where an output refers to the law, check which jurisdiction applies.",
      ] },
      { id: "fair-use", heading: "Fair use", body: [
        "To keep the tools fast and available for everyone, there is a fair use limit on how often each member can use them each day.",
      ] },
      { id: "questions", heading: "Questions", body: [
        "If you have a question or concern about our AI tools, email " + CONTACT_EMAIL + ".",
      ] },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    summary: "How we make our website and platform work for everyone, and how to tell us if something does not.",
    updated: LEGAL_UPDATED,
    glance: [
      "We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.",
      "Use the Accessibility button on every page to change text size, contrast, font and more, or to listen to the page.",
      "If anything is hard to use, email " + CONTACT_EMAIL + " and we will help.",
    ],
    sections: [
      { id: "commitment", heading: "Our commitment", body: [
        "As an inclusion consultancy, we want everyone to be able to use our website and the Impact Platform, whatever their needs. We design and test against the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.",
      ] },
      { id: "toolbar", heading: "The Accessibility button", body: [
        "Every page of our website has an Accessibility button in the bottom right corner. It lets you:",
        { list: [
          "listen to the page read aloud, with pause and speed controls",
          "make text larger",
          "switch to high contrast or a soft cream tint",
          "use an easy to read font",
          "add more space between lines and words",
          "underline all links",
          "reduce motion",
          "use a reading guide that follows your pointer",
        ] },
        "Your choices are saved on your device. The site also follows the settings on your own device, such as reduced motion.",
      ] },
      { id: "what-we-do", heading: "What else we do", body: [
        { list: [
          "Every page can be used with a keyboard alone, with a clear focus outline and a Skip to main content link.",
          "Pages work with screen readers, with descriptive headings, labelled forms and image descriptions.",
          "Text meets contrast standards, and pages reflow on phones and when zoomed in, without scrolling sideways.",
          "Content is written in plain English.",
        ] },
      ] },
      { id: "known-issues", heading: "Known limitations", body: [
        "Some content from other services, such as the Spotify podcast player and our Calendly booking page, is outside our control and may not fully meet the standard. Some older downloadable documents may not be fully accessible; contact us and we will provide an accessible version.",
      ] },
      { id: "feedback", heading: "Tell us about a problem", body: [
        "If you find anything difficult to use, or need content in another format, email " + CONTACT_EMAIL + ". We aim to reply within two working days.",
      ] },
      { id: "testing", heading: "How we test", body: [
        "This statement was prepared on " + LEGAL_UPDATED + ". We tested every page with automated accessibility checks, with a keyboard alone and at phone and zoomed in sizes. We are also testing with disabled users and will update this statement as we learn.",
      ] },
    ],
  },
];

export function getPolicy(slug: string) {
  return POLICIES.find((p) => p.slug === slug);
}
