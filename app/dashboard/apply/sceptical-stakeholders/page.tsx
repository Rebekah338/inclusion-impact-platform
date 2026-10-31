"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const OBJECTIONS = [
  {
    id: "divisive",
    icon: "🔥",
    label: "This is divisive",
    short: "\"This is creating division, not resolving it.\"",
    whatTheyMean: "They often mean: this makes people uncomfortable, it highlights differences rather than common ground, and it feels like it is pulling the team apart rather than together.",
    reframe: "Inclusion work does not create division: it names divisions that already exist but have been invisible or ignored. When people from underrepresented groups share their experience and are believed, that feels uncomfortable to those who have not been aware of it. That discomfort is not division: it is awareness.",
    scripts: [
      {
        scenario: "Leadership meeting",
        text: "I understand this feels divisive, and I want to acknowledge that it can bring uncomfortable conversations into the open. But the evidence is consistent: when people are not able to bring their whole selves to work, or when bias operates unchecked in decisions, the divisions already exist. What we are doing is making them visible so we can address them. Research from McKinsey, Deloitte, and our own engagement data all point to inclusion as a driver of retention and performance, not a source of friction.",
      },
      {
        scenario: "One-to-one conversation",
        text: "I hear that this feels like it is creating tension. Can I ask what specifically feels divisive to you? Because often what I find is that the discomfort is coming from conversations that were not happening before, not from new divisions being created. I would rather understand what is driving that feeling for you so we can address it directly.",
      },
    ],
  },
  {
    id: "merit",
    icon: "⚖️",
    label: "We hire on merit",
    short: "\"We already hire the best person: we do not need to change anything.\"",
    whatTheyMean: "They often mean: I believe our processes are fair, I do not think I have bias, and I am worried that EDI means appointing less qualified people.",
    reframe: "Merit is real and important. The question is whether our current processes reliably identify it. Decades of research show that identical CVs with different names receive different call-back rates, that interview panels consistently overestimate confidence as competence, and that referral-heavy recruitment reproduces existing networks. Improving our processes is not a compromise of merit: it is a better way of finding it.",
    scripts: [
      {
        scenario: "Board or leadership level",
        text: "I want to be clear that what we are proposing is not about lowering the bar. It is about raising our confidence that our current bar is applied consistently. We know from audit research that identical qualifications produce different outcomes depending on the name on the application. Structured interviews, diverse panels, and blind shortlisting are not quotas: they are techniques for reducing the noise in our decision-making so that merit is what actually determines the outcome.",
      },
      {
        scenario: "Hiring manager",
        text: "You are absolutely right that we want the best person. What I want to ask is: are we confident that our current process is the best way of finding them? Do we know whether our interview questions assess what actually predicts performance in the role? Do we know whether our shortlisting is consistent? Because if we are missing great candidates because of how we have structured the process, that is a problem for performance, not just for EDI.",
      },
    ],
  },
  {
    id: "data",
    icon: "📊",
    label: "The data does not show a problem",
    short: "\"Our numbers look fine. Why is this a priority?\"",
    whatTheyMean: "They often mean: I can not see a problem, so I am not convinced one exists. Or: the data I have been shown does not tell a compelling story.",
    reframe: "Diversity data is a starting point, not a complete picture. Representation at entry level can look healthy while progression rates and pay tell a very different story. And data about belonging and psychological safety is almost never collected, which means the most important dimension of inclusion is also the most invisible. The absence of evidence of a problem is not evidence of absence.",
    scripts: [
      {
        scenario: "Finance or operations leader",
        text: "I want to look at the data more carefully with you, because I think there is more here than the headline numbers suggest. What I would like us to look at together is not just who is here, but who is progressing, who is leaving, and what our engagement scores show for different groups. In most organisations I work with, the first two numbers look fine and the second two tell a very different story. Can we set aside some time to go through the full picture?",
      },
      {
        scenario: "Sceptical peer",
        text: "The diversity figures are one part of the picture. What they do not tell us is whether people from different backgrounds feel equally able to contribute, raise concerns, or progress. We do not collect that data at the moment, which means we are navigating blind. I am not claiming we definitely have a problem: I am saying we do not yet know, and I think we should find out before we assume everything is fine.",
      },
    ],
  },
  {
    id: "cost",
    icon: "💰",
    label: "We cannot afford it",
    short: "\"This is the wrong time. We need to focus on the business.\"",
    whatTheyMean: "They often mean: this is not a priority for me, the investment case is not clear, or I have genuine resource constraints that make this feel like a luxury.",
    reframe: "The cost of not investing in inclusion is real and ongoing: higher turnover, lower engagement, missed talent, reduced innovation, and increasing legal and reputational risk. The question is not whether we can afford to invest in inclusion, but whether we can afford not to. Many of the highest-impact interventions cost almost nothing.",
    scripts: [
      {
        scenario: "CFO or finance discussion",
        text: "I want to make the business case as concrete as I can. Our current turnover in [area] costs us roughly [£x] per leaver when you factor in recruitment and lost productivity. Our engagement data suggests that employees who do not feel included are significantly more likely to leave within 18 months. If we can move those numbers by even a small margin, the ROI on inclusion investment is significant. I have built a model I would like to walk you through.",
      },
      {
        scenario: "Time-pressured leader",
        text: "I hear that resource is tight. What I want to do is focus on the highest-impact, lowest-cost actions first so that we are not asking for a big investment before we have demonstrated value. The three things I would propose for the next quarter cost almost nothing in budget but will begin to shift our data. Can I show you what I have in mind?",
      },
    ],
  },
  {
    id: "box-ticking",
    icon: "☑️",
    label: "This is just box-ticking",
    short: "\"We are only doing this because we have to.\"",
    whatTheyMean: "They often mean: I am cynical about whether this will make a difference, I have seen EDI initiatives come and go, or I think this is compliance theatre rather than genuine change.",
    reframe: "They are not wrong about the risk. A lot of EDI activity is box-ticking: training that does not change behaviour, surveys that get filed and forgotten, statements that do not translate into action. The answer to that cynicism is not to defend the activity: it is to commit to a different approach that is grounded in evidence, focused on outcomes, and honest about what is working.",
    scripts: [
      {
        scenario: "Cynical senior colleague",
        text: "You are making a fair point, and I share the frustration with EDI activity that does not deliver change. That is exactly why I want to approach this differently. What I am proposing is not a programme of events and awareness days. It is a small number of commitments, with named owners and measurable outcomes, reviewed quarterly. If it is not working, we will say so and adjust. I would rather be honest about the challenge than defend activity that does not produce results.",
      },
      {
        scenario: "Resistive team member",
        text: "I understand the scepticism: a lot of EDI work has been tokenistic and has not delivered real change. I want to be honest with you about that. What I am trying to do here is different, and I am happy to be held accountable for the outcomes, not just the activities. But I also want to understand your experience: what would it look like to you if this was working?",
      },
    ],
  },
];

const PREP_STEPS = [
  {
    icon: "🔍",
    title: "Know what they actually care about",
    desc: "Before the conversation, find out what this person is responsible for, what pressures they are under, and what success looks like in their role. Your argument will land better if it connects to what they are already trying to achieve.",
  },
  {
    icon: "📊",
    title: "Bring evidence relevant to them",
    desc: "Generic data rarely moves people. Where possible, bring data about your own organisation, your sector, or your specific context. A business case framed in their language and linked to their priorities is more persuasive than external research.",
  },
  {
    icon: "👂",
    title: "Ask before you argue",
    desc: "Resistance is rarely just one thing. Before you deploy your arguments, ask questions: what specifically concerns you? What would it take to convince you? What would success look like to you? Listening first changes the dynamic and gives you better information.",
  },
  {
    icon: "🤝",
    title: "Find common ground first",
    desc: "Almost all stakeholders share some version of: we want people to perform at their best, we want to retain our best people, we want to make good decisions. Start there. Build your case from the ground you share before moving to where you differ.",
  },
  {
    icon: "🎯",
    title: "Ask for something small and specific",
    desc: "The goal of a conversation with a sceptic is usually not full buy-in: it is the next step. Ask for something small and concrete rather than asking for commitment to the whole agenda. A small yes builds towards a bigger one.",
  },
];

export default function ScepticalStakeholdersPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  const toggle = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const copyScript = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedScript(id);
      setTimeout(() => setCopiedScript(null), 2000);
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight)" }}>
      <PlatformNav />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>
            Practical Toolkit
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Talking to Sceptical Stakeholders
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Every EDI practitioner faces resistance. This toolkit gives you the reframes, conversation scripts, and preparation tools to navigate scepticism constructively; whether you are presenting to a board, talking to a resistant line manager, or handling pushback in a team meeting.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {["Stakeholder Management", "Communication", "EDI Leadership"].map((tag) => (
            <span key={tag} style={{ background: "var(--white)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Framing callout */}
        <div style={{ background: "var(--sage-dark)", borderRadius: 14, padding: "24px 28px", marginBottom: 32, color: "var(--white)" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, marginBottom: 10 }}>
            Before you respond to the objection, understand it
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.75, opacity: 0.92, margin: 0 }}>
            Most resistance to EDI is not bad faith. It is often a combination of unfamiliarity, concern about unintended consequences, a different set of mental models about how organisations work, or previous experience of EDI activity that felt performative. Understanding which of these is driving the resistance will help you respond more effectively than having a pre-prepared rebuttal.
          </p>
        </div>

        {/* Preparation checklist */}
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 17, fontWeight: 800, color: "var(--charcoal)", margin: "0 0 14px" }}>
          Before the Conversation: Five Preparation Steps
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
          {PREP_STEPS.map((step, idx) => (
            <div key={idx} style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: 10, padding: "16px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: "var(--sage-dark)", color: "var(--white)", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {idx + 1}
              </span>
              <span style={{ fontSize: 18, flexShrink: 0, marginTop: 6 }}>{step.icon}</span>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "var(--charcoal)", marginBottom: 6 }}>{step.title}</div>
                <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.65 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Objections */}
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 17, fontWeight: 800, color: "var(--charcoal)", margin: "0 0 6px" }}>
          Common Objections and How to Respond
        </h2>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>
          Open each objection for the reframe and conversation scripts. Scripts are editable: copy them and adapt to your context.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {OBJECTIONS.map((obj, idx) => {
            const isOpen = expanded[obj.id];
            const borderColors = ["#DC2626", "#D97706", "#2563EB", "#7C3AED", "#065F46"];
            const bc = borderColors[idx % borderColors.length];
            return (
              <div key={obj.id} style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderLeft: `4px solid ${bc}`, borderRadius: 12, overflow: "hidden", boxShadow: isOpen ? "0 2px 12px rgba(0,0,0,0.07)" : "0 1px 4px rgba(0,0,0,0.04)", transition: "box-shadow 0.15s" }}>
                <button onClick={() => toggle(obj.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}>
                  <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: bc, color: "var(--white)", fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {obj.icon}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "var(--charcoal)", marginBottom: isOpen ? 0 : 3 }}>{obj.label}</div>
                    {!isOpen && <div style={{ fontSize: 12, color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{obj.short}</div>}
                  </div>
                  <span style={{ color: "var(--sage-dark)", fontSize: 11, flexShrink: 0, fontWeight: 700 }}>{isOpen ? "▲ Close" : "▼ Open"}</span>
                </button>

                {isOpen && (
                  <div style={{ borderTop: "1px solid var(--gray-border)", padding: "20px" }}>
                    {/* What they mean */}
                    <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--gray-border)", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
                      <p style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--sage-dark)", marginBottom: 6 }}>What they often really mean</p>
                      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.65, margin: 0 }}>{obj.whatTheyMean}</p>
                    </div>

                    {/* Reframe */}
                    <div style={{ marginBottom: 20 }}>
                      <p style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--charcoal)", marginBottom: 8 }}>The reframe</p>
                      <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.75, margin: 0 }}>{obj.reframe}</p>
                    </div>

                    {/* Scripts */}
                    <p style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--charcoal)", marginBottom: 12 }}>Conversation scripts</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      {obj.scripts.map((script, i) => {
                        const scriptId = `${obj.id}-${i}`;
                        return (
                          <div key={i} style={{ background: "var(--sage-xlight)", border: "1px solid var(--gray-border)", borderRadius: 10, padding: "16px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                              <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--sage-dark)", background: "#fff", padding: "3px 10px", borderRadius: 10, border: "1px solid var(--gray-border)" }}>
                                {script.scenario}
                              </span>
                              <button onClick={() => copyScript(script.text, scriptId)}
                                style={{ fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 8, border: "1px solid var(--gray-border)", background: copiedScript === scriptId ? "#D1FAE5" : "var(--white)", color: copiedScript === scriptId ? "#065F46" : "var(--sage-dark)", cursor: "pointer", transition: "background 0.2s" }}>
                                {copiedScript === scriptId ? "✓ Copied" : "Copy"}
                              </button>
                            </div>
                            <p style={{ fontSize: 13, color: "var(--charcoal)", lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>
                              &ldquo;{script.text}&rdquo;
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* About section */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>About this toolkit</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>On navigating resistance</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
            Resistance to EDI is not a sign that your work has failed. It is an expected feature of change work in any organisation where the status quo has benefited some people and disadvantaged others. The goal is not to eliminate resistance but to engage it productively.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            The most effective EDI practitioners are not those who never face pushback: they are those who have developed the skill of listening to objections, understanding what is underneath them, and responding in a way that opens dialogue rather than closes it.
          </p>
        </div>
      </div>

      {/* Related resources */}
      <div style={{ background: "var(--sage-xlight)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href="/dashboard/apply/edi-strategy-guide" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Strategy Guide</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Getting Started with EDI Strategy</span>
            </Link>
            <Link href="/dashboard/make-the-case" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Section</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Make the Case resources</span>
            </Link>
          </div>
        </div>
      </div>
      <BottomBanner />
    </div>
  );
}
