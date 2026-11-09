"use client";

import { useState, useRef, useEffect } from "react";
import Footer from "../components/Footer";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

const episodes = [
  { num: "01", title: "Who We Are: The Power of Identity, Culture and Experience", guest: "Jasmine Fluker", img: "/podcast-ep01.png", episodeId: "0w3t9zJ4Epus7De7f2qaEL" },
  { num: "02", title: "Rest as Resistance: Addressing Women of Colour's Mental Health in the Workplace", guest: "Rachel Woodley", img: "/podcast-ep02.png", episodeId: "1Ao9VHC2nZNTlovV0aFR7F" },
  { num: "03", title: "To Be Audacious: Women of Colour Moving Through Systems That Were Built Against Us", guest: "Mikaela Ian", img: "/podcast-ep03.png", episodeId: "2EtDVK3bk2Pe0DZ5KLEs0Q" },
  { num: "04", title: "Inclusive Leadership and Accountability: Beyond Guilt and Fragility", guest: "Audrey Pantelis", img: "/podcast-ep04.png", episodeId: "4FzxntJ6f6ETuJOcDCN6bW" },
  { num: "05", title: "Listening to the Often Unheard: Introversion, Intersectionality and Inclusion", guest: "Richard Etienne", img: "/podcast-ep05.png", episodeId: "10V3WmyfGoOXyYjGAwPKjv" },
  { num: "06", title: "Beyond Diversity: Uprooting Anti-Blackness in Our Systems", guest: "Vanity Jenkins", img: "/podcast-ep06.png", episodeId: "3qvYKEi9PzSneZLvO90JWz" },
  { num: "07", title: "The Business Case for Inclusion: Leading with Courage and Compassion", guest: "Aggie Mutuma", img: "/podcast-ep07.jpg", episodeId: "3N9ln1rl5mcyRpA0ftVxNR" },
];

const blogs = [
  {
    title: "Autism Acceptance Month: intersectionality and the workplace",
    date: "April 2025",
    tag: "Neurodiversity",
    excerpt: "Black children are 2.6 times more likely to be misdiagnosed before receiving an autism diagnosis. Celebrating autism while ignoring racism and ableism isn't real acceptance.",
    body: [
      "April marks Autism Acceptance Month, a time to celebrate neurodivergent voices and push for real inclusion beyond awareness. But while conversations around autism have grown, they still often leave out a crucial factor: intersectionality.",
      "The experiences of autistic people aren't one size fits all. Race, gender, and class all shape how autism is understood, diagnosed, and supported. Black children are 2.6 times more likely to receive a misdiagnosis; often for behavioural disorders; before getting an autism diagnosis, compared to their white peers. Latinx and Black children are diagnosed later than white children, meaning they miss out on early interventions that can be life-changing. These disparities are rooted in systemic biases that infiltrate the medical and educational sectors.",
      "For Black autistic women and girls, the challenges multiply. Historically, autism research and diagnostic criteria were based on white, cisgender boys, which meant that women and non-binary people have often been overlooked. Girls are diagnosed later than boys on average, often masking their traits due to societal expectations of behaviour. Black girls are especially underdiagnosed because their traits may be misunderstood as defiance rather than neurodivergence.",
      "Intersectionality also means we can't talk about autism without talking about race. Research shows that Black and brown autistic people are more likely to be excluded from autism spaces, misrepresented in research, and face compounded discrimination in employment, healthcare and education. The model of autism that dominates public understanding is still largely based on white male presentations; and that matters, because it shapes who gets diagnosed, who gets support, and who gets left behind.",
      "Real autism acceptance means tackling the barriers that marginalised autistic people face. Here are three edits you can make in your workplace.",
      "First: ditch 'culture fit' and focus on 'culture add'. Place job adverts in a variety of diverse job pools and networks to attract neurodivergent candidates, women and people of colour. Ensure your company's messaging is welcoming, diverse, and inclusive. Use interview formats that don't rely on small talk and unwritten social rules, as autistic people may find that difficult, putting them at a disadvantage. Instead offer written assessments, structured interviews, or work trials to create a fairer process for those who are neurodivergent. Remember: it's about removing the barriers in the areas we have control over.",
      "Second: review your workplace policies for hidden barriers. Ensure policies take an intersectional approach and support the needs of autistic LGBTQ+ employees, employees of colour, female employees and those from working-class backgrounds. Examine the overlaps between multiple protected characteristics. Many workplace policies are neurodivergent-exclusionary by default. Conduct EDI audits to spot where neurodivergent employees face disproportionate challenges. Involve autistic employees from a range of backgrounds in shaping realistic, flexible policies that work for different ways of thinking and working. Their voices must be heard if they wish to share their experiences. Go away and do your own research too, so that you have a good knowledge and understanding of the varied issues faced by those who are neurodivergent.",
      "Third: recognise autism as a spectrum and reject harmful stereotypes that assume all autistic people present the same way. Actively work to break down racial and gender stereotypes and recognise that autism presents differently in women. Trans and non-binary autistic people are also often erased from both gender inclusion and neurodiversity conversations. Traditional autism research and workplace accommodations are often based on male-centred stereotypes. Many autistic women and non-binary people mask their traits to fit in, leading to burnout, anxiety, and late diagnoses. Employers must educate themselves on gendered differences in autism to avoid misinterpretation and bias, and take an intersectional approach to supporting the needs of all autistic individuals.",
      "As we move forward, we must ensure that marginalised, intersectional autistic voices aren't just included, but centred. Autistic people of all genders, races and marginalised identities deserve workplaces that understand, respect, and accommodate their needs. Real inclusion means making space for the voices that have been left out for too long. So how are you going to challenge and change a structure or barrier in your workplace?",
    ],
  },
  {
    title: "Why inclusion training alone won't change your culture",
    date: "2025",
    tag: "Training",
    excerpt: "Training alone will not change your culture. When the session ends and people go back to their desks, the conditions that created the problem remain unchanged.",
    body: [
      "Let me start by saying something that might seem counterintuitive coming from someone who delivers inclusion training: training alone will not change your culture. That's not an argument against training; done well, it raises awareness, builds knowledge, challenges assumptions, and gives people a shared language. It can be a genuinely powerful catalyst for change.",
      "But a catalyst is only useful if there's something for it to react with. And in too many organisations, the training session ends, people go back to their desks, and the conditions that created the problem in the first place remain completely unchanged.",
      "Here's a pattern that plays out repeatedly across organisations of all sizes and sectors. A concern is raised; perhaps around retention of underrepresented staff, a discrimination complaint, or a poor engagement survey result. Leadership responds by commissioning inclusion training. The training happens. It might even be genuinely good. And then not much else. Six months later, little has changed; the same voices dominate meetings, the same promotion decisions get made in the same ways, and the same people feel unseen. Leadership is left wondering why the training didn't work. The training wasn't the problem; the assumption that training alone would be sufficient was.",
      "Lasting inclusion isn't an event. It lives in how meetings are run: who gets airtime, whose ideas get credited, who tends to be interrupted, who does the interrupting. Meeting culture is inclusion culture made visible. It lives in how feedback is given; research consistently shows that women and people of colour are more likely to receive vague, personality-focused feedback rather than specific, skills-based feedback, and that gap directly impacts progression. It lives in how decisions are made around hiring, promotion, and project allocation; structured processes, diverse panels, and explicit criteria don't eliminate bias, but they make it harder for bias to go unnoticed. And it lives in what gets measured; you cannot improve what you don't track. Inclusion data broken down by role level, team, and demographic tells you where the gaps actually are, rather than where you assume them to be.",
      "This is where ongoing training; the right kind, delivered consistently over time; becomes genuinely powerful. Not as a tick-box event, but as a regular part of how your organisation learns and grows. When training is connected to real scenarios, revisited and built upon, and tied to behavioural accountability, it compounds; and that's when it changes things.",
      "The organisations that make the most meaningful progress treat training as one consistent thread in a much larger piece of work. They invest in understanding their current culture before designing interventions. They build internal capacity and outsource support where they lack it. They revisit, reflect, and adjust. And they're honest when things aren't working. That kind of work takes time, commitment, and genuine leadership.",
      "Inclusion isn't something you add into your organisation one time. It's something you build consistently, over time.",
    ],
  },
  {
    title: "Inclusion isn't failing; it's under-resourced",
    date: "2025",
    tag: "Strategy",
    excerpt: "Intent makes people try, but good intentions without structure are useless. Lean teams stretched across HR, compliance, and inclusion need frameworks and tools; not just hope and heroics.",
    body: [
      "You know the feeling. You're full of intention, you've been working on a few inclusion initiatives at work, but things don't seem to be changing. There's staff turnover whispers, morale dips, and small incidents are escalating. Your inclusion strategy is under-resourced.",
      "Intent is great. Intent makes people try. It sparks curiosity, gets them to sign up for inclusion training sessions, but here's the catch: good intentions and initiatives without structure are useless. You can want inclusion all you like, but if your team doesn't have the time, guidance, and tools to act on that intent, things slip through the cracks. And when things slip, inclusion fails.",
      "This is not a lack of intention; it's a lack of capacity, framework, and actionable practices. The good news? It's fixable, once we stop confusing hope with strategy. Mid-sized organisations and schools often care deeply about inclusion, but they're stretched thin. They're small enough to care personally, big enough to have layers of responsibility, and too lean to do everything alone.",
      "Often, one person is tasked with HR, compliance, staff wellbeing, and inclusion. They end up responding to fires and checking boxes rather than taking a bird's-eye view, developing a strategy, and allocating resources to inclusion. When your inclusion lead is stretched this thin, it's hard to get inclusion right. The intention is there, but the capacity isn't, and that's when inequities creep in. Informal inclusion practices; those things you hope people just get; often backfire. Assumptions are made, staff feel unsupported, microaggressions go unnoticed, and organisational risk grows.",
      "Shared tools and systems are your secret weapon. Frameworks, toolkits, and repeatable processes create consistency so everyone is on the same page. They reduce burnout so inclusion doesn't rest on one heroic individual. They mitigate risk so policies are backed up by action and guidance. They build capability so staff have a point of reference and know what to do without guessing.",
      "When everyone has access to practical, actionable guidance; checklists, conversation prompts, mini-frameworks; teams stop relying on heroics or goodwill and inclusion becomes woven into everyday working practices. Inclusion is a tool for retention and morale. It protects against reputational and operational risk and drives sustainable culture change.",
      "We have to approach inclusion smarter and give our teams the clarity and confidence to act, rather than relying on intention alone. With practical tools and resources, inclusion becomes a natural part of everyday decisions.",
    ],
  },
  {
    title: "Positive discrimination vs positive action: know the difference",
    date: "February 2025",
    tag: "Law & Practice",
    excerpt: "Confusing the two can land your business in hot water fast. Positive discrimination is legally risky and rarely sustainable; positive action removes barriers and creates equitable opportunities that actually stick.",
    body: [
      "When it comes to inclusion, there's one myth that keeps popping up: positive discrimination and positive action are the same thing. They are not. And confusing the two can land your business in hot water faster than someone forgetting to mute themselves on a Zoom call.",
      "Some people think you can fix inclusion gaps simply by setting quotas or filling seats with underrepresented groups. This is positive discrimination: rigid numerical targets that dictate who you hire, promote, or invite to the table. In practice, it can create resentment among staff who feel like roles are handed out based on numbers rather than merit. It doesn't tackle the real barriers preventing people from thriving. And it carries legal risks; in many countries, explicitly favouring someone because of a protected characteristic can breach employment or equality law, even if your intentions are good. While it might boost diversity numbers temporarily, it's rarely sustainable and legally it's a minefield.",
      "Positive action is different, and infinitely smarter. Instead of obsessing over numbers, it's about removing barriers and creating equitable opportunities so underrepresented groups can genuinely succeed. Think of it this way: positive discrimination is like handing someone a life jacket and saying here, float. Positive action is like fixing the holes in the boat, teaching everyone how to swim, and making sure the life jackets are available to anyone who needs them.",
      "Positive action gives you a practical, sustainable way to nurture talent and build a workplace where everyone feels valued; not just counted. Unlike quotas, which focus on numbers, positive action focuses on people and opportunity. It means identifying the barriers that hold talented individuals back and creating the conditions for them to thrive. This could mean offering targeted development programmes for underrepresented employees, reviewing recruitment and promotion processes to eliminate hidden bias, mentoring or sponsoring employees to ensure they have access to meaningful growth opportunities, and ensuring that everyone has a voice in decision-making and is recognised for their contributions.",
      "If you're running a business, the stakes are real: your culture matters more than ever, people talk. Quotas can backfire, creating disengagement or even legal risk. Positive action gives you a practical, sustainable way to nurture talent and build a workplace where everyone feels valued.",
      "Here's the secret sauce: trust is the currency of inclusion. Without it, even the best policies fall flat. Positive action builds trust because it's transparent, fair, and focused on real development; not just ticking boxes. The result is a workplace where people feel seen, supported, and empowered. Inclusion is a journey, not a checkbox.",
    ],
  },
  {
    title: "Psychological safety: the foundation your inclusion strategy is missing",
    date: "2025",
    tag: "Leadership",
    excerpt: "You've updated policies, run training, and put values on the wall. And yet people still aren't speaking up. Psychological safety is the missing piece; and it is not the same as making everyone comfortable.",
    body: [
      "You've updated your policies. You've run the training. You've got the values on the wall. And yet people still aren't speaking up. Ideas from underrepresented team members still go unheard. People are still leaving. If this sounds familiar, psychological safety might be the missing piece. Not as a buzzword but as a practical, measurable foundation that determines whether all of your other inclusion efforts actually land.",
      "The term was developed by Harvard Business School professor Amy Edmondson, who defines it as: a belief that one will not be punished or humiliated for speaking up with ideas, questions, concerns, or mistakes. In plain terms, it's the difference between a team where people say what they actually think, and a team where people say what they think is safe to say. And those two teams perform very differently. Google's landmark Project Aristotle; a study of over 180 teams; found that psychological safety was the single most important factor in team effectiveness.",
      "Psychological safety and inclusion are deeply connected but they're not the same thing, and it's worth being clear on the distinction. Inclusion is about whether people genuinely belong, contribute, and thrive in an organisation. Psychological safety is one of the conditions that makes that possible. Without it, inclusion becomes performative: people are present, but they're not really participating.",
      "Consider this: if a Black woman in a leadership team meeting raises a concern about a policy's impact on underrepresented staff, what happens next? In a psychologically safe environment, her contribution is taken seriously, explored, and acted on. In an unsafe one, it's minimised or she never raises it at all, because experience has taught her it isn't worth the risk. Unfortunately, that second scenario is more common than most organisations would like to admit.",
      "Psychological safety is not the same as comfort. This is one of the most important distinctions to make, particularly for leaders. Psychological safety doesn't mean avoiding difficult conversations or protecting people from challenge. In fact, Edmondson's research shows that psychologically safe teams tend to report more errors; not because they make more, but because people feel safe enough to name them. A truly safe environment is one where challenge is welcomed, disagreement is heard, and accountability is possible without threat.",
      "It's also important to name that psychological safety is not equally distributed across teams. The experience of speaking up is shaped by identity: race, gender, disability, sexuality, seniority; all of these intersect to determine how risky it feels to raise your hand, challenge a decision, or flag a concern. A white male senior leader might experience the same team meeting very differently to a junior woman of colour. Building psychological safety means actively addressing those inequalities, not assuming safety exists because no one is visibly struggling.",
      "Building psychological safety isn't a one-off exercise; it's a leadership practice. Model fallibility by sharing when you don't know something or got something wrong; it gives others permission to do the same. Invite dissent deliberately; in meetings, actively ask what am I missing or who disagrees and why. Respond visibly when someone speaks up; whether you agree or not, acknowledge the contribution, because the response is what others are watching. Pay attention to whose ideas get heard, who tends to stay silent, where the energy in a room changes. Address exclusion when you see it; not later, not privately; in the moment. Silence signals acceptance.",
      "If this resonated with you, let's talk. We'd love to hear what it's bringing up for you. Or share it with your network or someone who'd find this useful.",
    ],
  },
  {
    title: "Intersectionality, Pride and allyship: why accompliceship is the real call to action",
    date: "2025",
    tag: "Intersectionality",
    excerpt: "Allyship can become a label you adopt once and move on. Accompliceship asks what you're actually willing to risk; your comfort, your social capital, your standing in a room.",
    body: [
      "Pride and social justice are deeply interconnected. You can't pull them apart if you're serious about change, because Pride didn't emerge from nowhere. It emerged from people fighting systems that excluded them. When we talk about LGBTQ+ inclusion as if it's a single, neat category, we miss something important: identity doesn't work in isolated layers.",
      "Black and brown LGBTQ+ people often experience several forms of marginalisation at once; not one identity stacked neatly on top of another, but overlapping pressures that show up differently depending on context. This is what intersectionality actually means in practice: the way race, sexuality, gender, religion, class and other characteristics overlap to shape a person's experience of discrimination, rather than acting as separate, isolated categories. One useful way to think about this: identity is like a pie. Different slices can be more raised than others depending on the room you're in, the system you're navigating, or the history behind it.",
      "One of the more uncomfortable threads in this conversation is religion; specifically how belief systems can be used to justify both racial and sexual oppression. A theology that doesn't side with the oppressed isn't really living up to its own values. That's not an attack on faith. It's a challenge to anyone, religious or not, to ask whether the systems they're part of are actually doing what they claim to do. Safe spaces are fragile when the systems around them haven't changed. You can build a sanctuary inside a structure that's still doing harm.",
      "It's tempting to treat visibility as the goal: more representation, more seats at the table, more faces that look different in leadership. That matters. But it's not enough on its own. Real progress means dismantling the structural barriers that kept people excluded in the first place; not just inviting people into rooms that weren't built with them in mind. Inclusion has to be structural, intentional, intersectional, equitable, and ongoing.",
      "One word keeps coming up in inclusion forums: accomplice. Allyship can sometimes get treated as a label; something you adopt once and call yourself. Accompliceship is different. It asks what you're actually willing to risk; not just what you're willing to say. Being an ally is a starting point. Being an accomplice means putting something on the line; your comfort, your social capital, your standing in a room; to actually move the needle. It's the difference between agreeing privately and acting publicly.",
    ],
  },
  {
    title: "Intersectionality: why one size never fits all in inclusion",
    date: "2025",
    tag: "Intersectionality",
    excerpt: "Race, gender, class, disability, sexuality; people don't experience just one of these at a time. If your inclusion strategy ignores how these identities overlap, it's leaving people behind.",
    body: [
      "Here's the thing about inclusion: it's not a one-size-fits-all proposition. And yet so many inclusion strategies are built as if it is. They focus on one characteristic at a time; a gender initiative here, a race equity programme there; without ever asking how those identities overlap in a single person's experience. That's where intersectionality comes in.",
      "The term was coined by legal scholar Kimberlé Crenshaw in 1989 to describe how race and gender combined to shape the specific discrimination Black women faced in ways that neither race frameworks nor gender frameworks alone could capture. It's since become one of the most important concepts in EDI; and one of the most misunderstood. Intersectionality isn't a synonym for 'diversity.' It's a framework for understanding how different aspects of a person's identity interact to create unique experiences of privilege and oppression.",
      "In practice, this means a Black woman in the workplace isn't just navigating racism, and she's not just navigating sexism; she's navigating both at the same time, and the combination creates something distinct. The same logic applies across any combination of identities: a disabled Latinx employee, a working-class LGBTQ+ person, an older woman of colour. Each experiences the workplace differently, and those differences matter.",
      "So what does this mean for your inclusion strategy? It means single-axis approaches have limits. Training that focuses only on gender misses the experience of women of colour. Initiatives that centre race without considering disability, class, or sexuality will leave gaps. Inclusion data that isn't broken down intersectionally will show you an averaged picture that may not reflect anyone's actual experience.",
      "Building an intersectional approach means asking deeper questions at every stage: who is affected by this policy, and in what ways? Whose experience is centred in this programme? Who is likely to be left out? It means collecting and disaggregating data, involving the people most affected in the design process, and being willing to revisit initiatives that looked good on paper but didn't account for complexity. Inclusion that only works for some people isn't really inclusion.",
    ],
  },
];
const tagColours: Record<string, string> = {
  "EDI & Politics": "#f0e8e8",
  Neurodiversity: "#e8eef0",
  Training: "#e8f0e8",
  Strategy: "#f0ede8",
  "Law & Practice": "#eee8f0",
  Leadership: "#e8f0ec",
  Intersectionality: "#f0e8f4",
};

type Blog = typeof blogs[0];

function BlogModal({ post, onClose }: { post: Blog; onClose: () => void }) {
  const linkedInUrl = "https://www.linkedin.com/company/the-inclusion-edit";
  const pageUrl = typeof window !== "undefined" ? window.location.href : "https://www.theinclusionedit.com/listen-and-read";
  const shareText = encodeURIComponent(`"${post.title}" via The Inclusion Edit`);
  const shareUrl = encodeURIComponent(pageUrl);
  const emailSubject = encodeURIComponent(`Thought you'd find this useful: ${post.title}`);
  const emailBody = encodeURIComponent(`Hi,\n\nI came across this article from The Inclusion Edit and thought you might find it interesting.\n\n"${post.title}"\n\nRead it here: ${pageUrl}\n\nHope it's useful!`);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "var(--white)", borderRadius: "16px", width: "100%", maxWidth: "860px", maxHeight: "88vh", display: "flex", flexDirection: "column", boxShadow: "0 24px 64px rgba(0,0,0,0.22)", overflow: "hidden" }}
      >
        {/* Modal header */}
        <div style={{ padding: "1.25rem 1.5rem 1rem", borderBottom: "1px solid rgba(0,0,0,0.07)", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sage-dark)", background: tagColours[post.tag] || "#e8f0e8", borderRadius: "4px", padding: "0.2rem 0.6rem", marginBottom: "0.5rem" }}>{post.tag}</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "var(--charcoal)", margin: 0, lineHeight: 1.3 }}>{post.title}</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(0,0,0,0.4)", margin: "0.3rem 0 0" }}>Written by Rebekah Hayward, The Inclusion Editor</p>
            </div>
            <button onClick={onClose} aria-label="Close" style={{ background: "rgba(0,0,0,0.06)", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: "var(--charcoal)", flexShrink: 0 }}>✕</button>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: "auto", padding: "1.25rem 1.5rem", flex: 1 }}>
          {post.body.map((para, i) => (
            <p key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(0,0,0,0.78)", lineHeight: 1.75, margin: "0 0 1rem" }}>{para}</p>
          ))}

          {/* CTA block */}
          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "rgba(74,99,71,0.07)", borderRadius: "10px", borderLeft: "3px solid var(--sage-dark)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(0,0,0,0.7)", lineHeight: 1.65, margin: "0 0 0.875rem" }}>
              If this resonated with you, let's talk. We'd love to hear what it's bringing up for you. Or share it with your network or someone who'd find this useful.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/contact" onClick={onClose} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.55rem 1.1rem", borderRadius: "7px", textDecoration: "none" }}>Let's talk</Link>
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "var(--white)", background: "#0A66C2", padding: "0.55rem 1.1rem", borderRadius: "7px", textDecoration: "none" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                Share on LinkedIn
              </a>
              <a href={`mailto:?subject=${emailSubject}&body=${emailBody}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "var(--charcoal)", background: "rgba(0,0,0,0.07)", padding: "0.55rem 1.1rem", borderRadius: "7px", textDecoration: "none" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                Share via email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ListenAndReadClient() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [openBlog, setOpenBlog] = useState<Blog | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const activeEpisode = episodes[activeIndex];

  const scrollStrip = (direction: "left" | "right") => {
    if (!stripRef.current) return;
    const cardWidth = stripRef.current.scrollWidth / episodes.length;
    stripRef.current.scrollBy({ left: direction === "right" ? cardWidth * 2 : -cardWidth * 2, behavior: "smooth" });
  };

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>
      <SiteNav />

      {openBlog && <BlogModal post={openBlog} onClose={() => setOpenBlog(null)} />}

      <main>
        {/* HERO */}
        <section style={{ position: "relative", minHeight: "600px", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #1A3220 0%, #243D28 40%, #2E5235 65%, rgba(46,82,53,0.4) 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/listen%20and%20read%201.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 1 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(20,40,25,0.95) 0%, rgba(20,40,25,0.85) 38%, rgba(20,40,25,0.3) 70%, rgba(20,40,25,0.05) 100%)", zIndex: 2 }} />
          <div style={{ position: "relative", zIndex: 3, maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "5rem 2rem" }}>
            <div style={{ maxWidth: "560px" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "1.75rem", backdropFilter: "blur(4px)" }}>Podcast and blog</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.2rem)", color: "var(--white)", lineHeight: 1.08, marginBottom: "1.25rem" }}>Listen &amp; Read</h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.8, marginBottom: "2rem" }}>Honest conversations, practical thinking and real insight on equity, diversity and inclusion; from The Inclusion Edit.</p>
              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                <a href="#podcast" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sage-dark)", background: "var(--white)", padding: "0.75rem 1.75rem", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Listen to the podcast</a>
                <a href="#blogs" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", background: "rgba(255,255,255,0.12)", padding: "0.75rem 1.75rem", borderRadius: "8px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)", whiteSpace: "nowrap", backdropFilter: "blur(4px)" }}>Read the blog</a>
              </div>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section style={{ padding: "0.6rem 1.5rem", background: "#f4f7f4" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
            {[
              { label: "Honest", sub: "Conversations, no jargon" },
              { label: "UK · Bermuda · US", sub: "Listeners worldwide" },
              { label: "100+", sub: "Newsletter subscribers" },
              { label: "Spotify", sub: "Free to listen" },
              { label: "LinkedIn", sub: "New articles monthly" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.75rem 1rem", flex: "1", textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--sage-dark)" }}>{item.label}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "#4a6a4a", marginTop: "0.2rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PODCAST */}
        <section id="podcast" style={{ background: "var(--white)", padding: "2.5rem 1.5rem 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ marginBottom: "1.25rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(74,99,71,0.1)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "0.5rem" }}>The podcast</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: "var(--charcoal)", margin: "0 0 0.35rem" }}>Honest conversations about inclusion</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(0,0,0,0.6)", margin: 0, lineHeight: 1.6 }}>Real talk with practitioners, leaders and thinkers doing the work; not just talking about it. Available on Spotify.</p>
            </div>
            <div style={{ background: "var(--forest)", borderRadius: "16px", padding: "1.25rem", boxShadow: "0 6px 32px rgba(26,50,32,0.18)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: "#6dbf7e", boxShadow: "0 0 6px #6dbf7e" }} />
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>Now playing</span>
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>Episode {activeEpisode.num} of {episodes.length}</span>
              </div>
              <div style={{ marginBottom: "0.75rem" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", margin: "0 0 0.2rem", lineHeight: 1.35 }}>{activeEpisode.title}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", margin: 0 }}>with {activeEpisode.guest}</p>
              </div>
              <div style={{ borderRadius: "10px", overflow: "hidden" }}>
                <iframe key={activeEpisode.episodeId} src={`https://open.spotify.com/embed/episode/${activeEpisode.episodeId}?utm_source=generator&theme=0`} width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{ display: "block" }} />
              </div>
            </div>
            <div style={{ marginTop: "0.875rem", background: "var(--forest)", borderRadius: "14px", padding: "0.875rem 1rem 0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.65rem" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>All episodes — tap to switch</span>
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  <button onClick={() => scrollStrip("left")} aria-label="Scroll left" style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.08)", color: "var(--white)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>‹</button>
                  <button onClick={() => scrollStrip("right")} aria-label="Scroll right" style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.08)", color: "var(--white)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>›</button>
                </div>
              </div>
              <div ref={stripRef} style={{ display: "flex", overflowX: "auto", gap: "0.6rem", paddingBottom: "0.65rem", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}>
                {episodes.map((ep, i) => (
                  <button key={ep.num} onClick={() => setActiveIndex(i)} title={`Ep ${ep.num}: ${ep.title} with ${ep.guest}`} style={{ padding: 0, border: activeIndex === i ? "2.5px solid var(--white)" : "2.5px solid rgba(255,255,255,0.15)", flex: "0 0 calc(25% - 0.45rem)", scrollSnapAlign: "start", borderRadius: "8px", overflow: "hidden", boxShadow: activeIndex === i ? "0 0 0 3px rgba(255,255,255,0.15)" : "none", display: "block", cursor: "pointer", background: "none", opacity: activeIndex === i ? 1 : 0.65, transition: "opacity 0.15s, border 0.15s" }}>
                    <img src={ep.img} alt={`Episode ${ep.num}: ${ep.title}`} style={{ width: "100%", display: "block", aspectRatio: "1 / 1", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                {episodes.map((_, i) => (
                  <div key={i} style={{ width: activeIndex === i ? "18px" : "6px", height: "6px", borderRadius: "3px", background: activeIndex === i ? "var(--white)" : "rgba(255,255,255,0.3)", transition: "width 0.2s, background 0.2s" }} />
                ))}
              </div>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(0,0,0,0.45)", marginTop: "0.875rem", textAlign: "center" }}>
              Listen directly above or{" "}
              <a href="https://open.spotify.com/show/3CgmJvGUkTUOiKQN0UmJWM" target="_blank" rel="noopener noreferrer" style={{ color: "var(--sage-dark)", fontWeight: 600 }}>open in Spotify</a>.
            </p>
            {/* Share bar */}
            <div style={{ marginTop: "0.75rem", padding: "0.875rem 1rem", background: "rgba(74,99,71,0.07)", borderRadius: "12px", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.45)", margin: "0 0 0.65rem" }}>Love this episode? Share it</p>
              <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://open.spotify.com/episode/${activeEpisode.episodeId}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", color: "var(--white)", background: "#0A66C2", padding: "0.5rem 1rem", borderRadius: "7px", textDecoration: "none" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                  Share on LinkedIn
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(`Podcast episode: ${activeEpisode.title}`)}&body=${encodeURIComponent(`Hi,\n\nI thought you might enjoy this episode of The Inclusion Edit podcast.\n\n"${activeEpisode.title}" with ${activeEpisode.guest}\n\nListen here: https://open.spotify.com/episode/${activeEpisode.episodeId}\n\nHope you find it useful!`)}`}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", color: "var(--charcoal)", background: "rgba(0,0,0,0.08)", padding: "0.5rem 1rem", borderRadius: "7px", textDecoration: "none" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  Share via email
                </a>
                <a
                  href={typeof window !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
                    ? `instagram://library?AssetPath=${encodeURIComponent(`https://open.spotify.com/episode/${activeEpisode.episodeId}`)}`
                    : "https://www.instagram.com/theinclusionedit/"}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", color: "var(--white)", background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", padding: "0.5rem 1rem", borderRadius: "7px", textDecoration: "none" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  Share to Instagram
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* BLOG */}
        <section id="blogs" style={{ position: "relative", padding: "2.5rem 1.5rem 3rem", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/team-meeting.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(244,247,244,0.92)", zIndex: 1 }} />
          <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ marginBottom: "1.25rem" }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", background: "rgba(74,99,71,0.12)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "0.5rem" }}>The blog</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: "var(--charcoal)", margin: "0 0 0.35rem" }}>Practical thinking on inclusion</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "rgba(0,0,0,0.6)", margin: 0, lineHeight: 1.6 }}>Articles for HR professionals, people managers and leaders who want to do this well. Click any card to read in full.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {blogs.map((post) => (
                <div key={post.title} style={{ display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.92)", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "12px", padding: "1.25rem", backdropFilter: "blur(4px)" }}>
                  <span style={{ display: "inline-block", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sage-dark)", background: tagColours[post.tag] || "#e8f0e8", borderRadius: "4px", padding: "0.2rem 0.6rem", marginBottom: "0.65rem", alignSelf: "flex-start" }}>{post.tag}</span>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "var(--charcoal)", margin: "0 0 0.4rem", lineHeight: 1.35, flexGrow: 1 }}>{post.title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(0,0,0,0.6)", margin: "0 0 0.875rem", lineHeight: 1.55 }}>{post.excerpt}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                    
                    <button onClick={() => setOpenBlog(post)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.76rem", color: "var(--sage-dark)", padding: 0 }}>Read more →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "var(--white)", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", textAlign: "center", marginBottom: "0.5rem" }}>Enjoyed what you found here?</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", color: "var(--charcoal)", textAlign: "center", marginBottom: "2.25rem", lineHeight: 1.2 }}>There's more where that came from</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
              {/* Newsletter card */}
              <div style={{ background: "rgba(74,99,71,0.05)", borderRadius: "16px", padding: "2rem", border: "1.5px solid rgba(74,99,71,0.15)", display: "flex", flexDirection: "column", boxShadow: "0 4px 24px rgba(74,99,71,0.08)" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem", display: "block" }}>Newsletter</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "var(--charcoal)", margin: "0 0 0.65rem", lineHeight: 1.25 }}>Get more like this</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(0,0,0,0.6)", lineHeight: 1.7, margin: "0 0 1.5rem", flex: 1 }}>Fresh thinking on inclusion, straight to your inbox. New episodes, articles and resources; no noise, just value.</p>
                <Link href="/subscribe" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--white)", background: "var(--sage-dark)", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none", display: "inline-block", textAlign: "center" }}>Sign up free →</Link>
              </div>
              {/* Platform card */}
              <div style={{ background: "rgba(74,99,71,0.05)", borderRadius: "16px", padding: "2rem", border: "1.5px solid rgba(74,99,71,0.15)", display: "flex", flexDirection: "column", boxShadow: "0 4px 24px rgba(74,99,71,0.08)" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem", display: "block" }}>Impact Platform</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "var(--charcoal)", margin: "0 0 0.65rem", lineHeight: 1.25 }}>Ready to go deeper?</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "rgba(0,0,0,0.6)", lineHeight: 1.7, margin: "0 0 1.5rem", flex: 1 }}>The Impact Platform gives you tools, resources and community to put inclusion into practice; not just think about it.</p>
                <Link href="/about-our-impact-platform" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--sage-dark)", background: "var(--white)", border: "1.5px solid var(--sage-dark)", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none", display: "inline-block", textAlign: "center" }}>Learn more →</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
