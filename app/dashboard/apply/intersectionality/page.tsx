"use client";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const PRACTICE_AREAS = [
  {
    id: "data",
    icon: "📊",
    title: "Data and Measurement",
    preview: "Single-characteristic data hides the people most affected by overlapping disadvantage.",
    content: `Most organisations collect diversity data one characteristic at a time: gender, ethnicity, disability, age. This makes the data easier to collect and easier to report. It also makes the people most affected by overlapping disadvantage invisible.

A Black woman's experience in your organisation is not the sum of the experience of Black employees plus the experience of women. It is a distinct experience, shaped by the intersection of both identities and often characterised by pressures and barriers that neither group alone faces.

Cross-tabulated data: breaking down one characteristic by another, can begin to reveal these patterns. You do not need perfect data to start: you need the willingness to ask more specific questions and to report what you find honestly.`,
    actions: [
      "Review whether your diversity data collection allows for cross-tabulation by two or more characteristics",
      "Where sample sizes allow, analyse pay, progression, and retention data by intersecting characteristics",
      "In your next engagement survey, include questions about belonging and psychological safety analysed by intersecting identity groups",
      "Report intersectional findings internally, with appropriate anonymisation where sample sizes are small",
    ],
    example: {
      title: "What intersectional data can reveal",
      text: "An organisation finds that its gender pay gap is 12% and its ethnicity pay gap is 9%. Breaking the data down further reveals that Black women earn 27% less than white men: a gap far larger than either single-characteristic analysis suggested. Neither the gender analysis nor the ethnicity analysis alone would have identified this. The organisation redesigns its pay review process with this specific population explicitly in view.",
    },
  },
  {
    id: "recruitment",
    icon: "👥",
    title: "Recruitment and Selection",
    preview: "Inclusive recruitment that addresses gender or ethnicity separately will still miss candidates who sit at their intersection.",
    content: `Inclusive recruitment practices often address protected characteristics one at a time: blind CVs to address name-based bias, diverse interview panels to address gender representation. These are valuable. But they do not automatically address the distinct barriers faced by people with overlapping marginalised identities.

Research shows that candidates from multiply marginalised backgrounds are often more likely to self-select out of processes they perceive as not designed for them; long before any selection decision is made. Job descriptions, the composition of panels, the implicit signals in how organisations present themselves, all of these communicate who is welcome here.

Applying an intersectional lens to recruitment means asking: which candidates are we systematically not reaching, and why? It often requires looking beyond the standard inclusive hiring checklist.`,
    actions: [
      "Audit your current applicant pipeline by intersecting characteristics where data allows",
      "Review job descriptions and person specifications with an intersectional lens: which language or requirements systematically exclude?",
      "Ensure interview panel composition reflects intersectional diversity, not just single-characteristic inclusion",
      "Track drop-off rates at each stage of the process by candidate characteristics to identify where barriers are operating",
    ],
    example: {
      title: "What this looks like in practice",
      text: "An organisation introduces structured interviews to reduce gender bias in selection. A review of the data six months later shows that women's success rates have improved but that the success rate for disabled women of colour has not shifted. Closer analysis reveals that the competency framework used in interviews implicitly favours candidates with experience in specific networking environments that are less accessible to this group. The framework is redesigned with this specifically in view.",
    },
  },
  {
    id: "development",
    icon: "📚",
    title: "Learning and Development",
    preview: "EDI learning that treats protected characteristics as separate topics will produce practitioners who cannot work effectively with lived complexity.",
    content: `EDI training programmes often address race, gender, disability, and sexuality as sequential modules. This approach can produce practitioners and managers who are aware of individual characteristics but unprepared for the complexity of real experience, where people do not inhabit one identity at a time.

Including intersectionality in learning does not require a separate module on the topic. It requires weaving it into how every existing topic is taught. When discussing gender bias, case studies should include women of colour, disabled women, and working-class women. When discussing race, they should include people of colour who are also disabled, LGBTQ+, or from working-class backgrounds.

Effective intersectional learning also means moving beyond awareness to behaviour: what do I do differently, right now, as a result of this?`,
    actions: [
      "Audit your current EDI learning materials for intersectional representation in case studies and examples",
      "Introduce a lens exercise in existing training: ask participants to consider how the scenarios change when multiple characteristics are in play",
      "For leadership and management development, include explicit content on navigating intersectional complexity in performance, feedback, and progression decisions",
      "Ensure your facilitators and guest speakers themselves reflect intersectional diversity, not just single-characteristic inclusion",
    ],
    example: {
      title: "What this looks like in practice",
      text: "An organisation runs unconscious bias training that is well-regarded by participants. A post-programme survey reveals that line managers report feeling confident about addressing gender bias and racial bias separately, but significantly less confident when the scenario involves a candidate or employee whose experience involves both. Additional facilitated case study content is introduced that specifically presents intersectional scenarios, including examples where the bias operates differently than it would for either characteristic alone.",
    },
  },
  {
    id: "policy",
    icon: "📋",
    title: "Policy and Process",
    preview: "Policies designed around single characteristics often create inadvertent barriers for people navigating multiple identities simultaneously.",
    content: `Most EDI policies are written with a single protected characteristic in mind: a flexible working policy to support carers (often implicitly gendered), a reasonable adjustments policy to support disabled employees, a menopause policy to support women at a specific life stage. These policies are valuable. But they can also create gaps and inadvertent barriers for people whose needs sit at the intersection of multiple categories.

An intersectional policy review asks: for each policy, who is this designed for? Who might it inadvertently exclude or disadvantage? Where are the assumptions baked in, and whose experience do those assumptions not reflect?

This is not about rewriting every policy from scratch: it is about adding an intersectional question to your standard policy review cycle.`,
    actions: [
      "Add an intersectionality impact assessment to your policy review template",
      "Identify your top three policies that are most likely to affect multiply marginalised employees and review them with an intersectional lens",
      "In your next consultation with employee networks, explicitly ask for feedback on where policies create unintended barriers for people with overlapping identities",
      "Review your reasonable adjustments and flexible working processes to ensure they are genuinely accessible to people navigating multiple support needs",
    ],
    example: {
      title: "What this looks like in practice",
      text: "An organisation has a strong parental leave policy and a well-used reasonable adjustments process. A listening exercise with disabled employees who are also parents reveals that the handover process between the two, for employees who become disabled during a period of parental leave, is poorly designed and requires them to navigate multiple HR processes that do not communicate with each other. A small process change, integrating the two journeys for employees in this situation, removes a significant administrative burden.",
    },
  },
  {
    id: "voice",
    icon: "🎤",
    title: "Employee Voice and Listening",
    preview: "Standard listening exercises often amplify the voices of those who are already most visible and confident, and systematically miss those at the intersection.",
    content: `All-staff surveys, open consultations, and anonymous feedback tools tend to amplify the voices of employees who feel most confident and most included. The employees whose experience most needs to be heard are often the least likely to respond to a generic survey or speak up in an open forum.

Intersectional listening means designing your engagement activity specifically to reach the people most likely to be missed. This often means smaller, facilitated conversations with specific groups rather than large-scale open consultation. It means creating conditions where people feel safe to share experience that cuts across multiple aspects of their identity without having to choose which one to foreground.

It also means listening for what is not being said: if certain groups are consistently absent from your feedback data, that absence is itself information.`,
    actions: [
      "Review your current engagement and listening activity: which employee groups are consistently underrepresented in your data?",
      "Design specific listening exercises for groups at the intersection of multiple marginalised identities, with appropriate facilitation and psychological safety",
      "Analyse your survey non-response data by employee characteristics to understand who is not participating and why",
      "Create specific channels or touchpoints for employees with overlapping support needs to share feedback on the intersection of those needs",
    ],
    example: {
      title: "What this looks like in practice",
      text: "An organisation runs a well-designed annual engagement survey with a 78% response rate. Analysis of the non-respondents reveals that the lowest response rates are among part-time employees who are also from ethnic minority backgrounds. A small-group listening exercise with this population reveals that many feel their experience is not captured by the survey's framing, which assumes a full-time, office-based working pattern. The survey is revised and the non-response follow-up process is redesigned with this group explicitly in mind.",
    },
  },
];

const REFLECTION_QUESTIONS = [
  { id: "rq1", text: "In your current work, which groups of employees are most visible in your data and most frequently included in your EDI narrative?" },
  { id: "rq2", text: "Which groups are least visible? What might be making their experience harder to see?" },
  { id: "rq3", text: "Where in your strategy or programme have you made assumptions about what it means to be a woman, to be disabled, or to be from an ethnic minority background? Whose experience does that assumption not reflect?" },
  { id: "rq4", text: "When you think about the last three EDI initiatives you have run or planned: who were they designed for? Who might they have inadvertently excluded?" },
  { id: "rq5", text: "In your own work and interactions: when did you last encounter someone navigating overlapping sources of disadvantage? How did you respond?" },
  { id: "rq6", text: "What would it take for your organisation to begin collecting and reporting intersectional data? What is the most significant obstacle?" },
];

export default function IntersectionalityPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState("");

  const toggle = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));
  const toggleQ = (id: string) => setCheckedQuestions((p) => ({ ...p, [id]: !p[id] }));

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
            Advanced Practice
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Intersectionality in Practice
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          People hold multiple identities simultaneously: race, gender, disability, class, sexuality, and more. An EDI approach that treats these as separate will miss the people most affected by their intersection. This resource gives you the practical tools to apply an intersectional lens across five key practice areas.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {["Intersectionality", "Advanced Practice", "Strategy"].map((tag) => (
            <span key={tag} style={{ background: "var(--white)", color: "var(--sage-dark)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* What is intersectionality */}
        <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: 14, padding: "24px 28px", marginBottom: 32 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 17, fontWeight: 800, color: "var(--charcoal)", margin: "0 0 14px" }}>
            What is intersectionality?
          </h2>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, marginBottom: 14 }}>
            The term intersectionality was coined by legal scholar Kimberlé Crenshaw in 1989, originally to describe how Black women in the US faced forms of discrimination that neither race discrimination law nor sex discrimination law alone could capture. The concept has since become a foundational framework in EDI practice.
          </p>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, marginBottom: 14 }}>
            In organisational practice, applying an intersectional lens means recognising that employees do not experience the world through a single identity. A disabled Sikh woman, a working-class gay man, a Black neurodivergent employee: each person's experience is shaped by the combination of their identities in ways that single-characteristic analysis will not capture.
          </p>
          <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--gray-border)", borderRadius: 10, padding: "16px 20px" }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "var(--sage-dark)", margin: "0 0 8px" }}>The practical implication</p>
            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>
              Intersectionality does not mean you need to analyse every possible combination of characteristics before you can act. It means you build the habit of asking: whose experience are we not capturing here? Who sits at the intersection of the groups we are describing, and is their experience visible in what we are saying and doing?
            </p>
          </div>
        </div>

        {/* Practice areas */}
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 17, fontWeight: 800, color: "var(--charcoal)", margin: "0 0 6px" }}>
          Five Practice Areas
        </h2>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>
          Open each area for practical guidance, actions, and a real-world example.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
          {PRACTICE_AREAS.map((area, idx) => {
            const isOpen = expanded[area.id];
            const leftColors = ["var(--sage-dark)", "#2563EB", "#7C3AED", "#D97706", "#DC2626"];
            const lc = leftColors[idx % leftColors.length];
            return (
              <div key={area.id} style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderLeft: `4px solid ${lc}`, borderRadius: 12, overflow: "hidden", boxShadow: isOpen ? "0 2px 12px rgba(0,0,0,0.07)" : "0 1px 4px rgba(0,0,0,0.04)", transition: "box-shadow 0.15s" }}>
                <button onClick={() => toggle(area.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}>
                  <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: lc, color: "var(--white)", fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {idx + 1}
                  </span>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{area.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "var(--charcoal)", marginBottom: isOpen ? 0 : 3 }}>{area.title}</div>
                    {!isOpen && <div style={{ fontSize: 12, color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{area.preview}</div>}
                  </div>
                  <span style={{ color: "var(--sage-dark)", fontSize: 11, flexShrink: 0, fontWeight: 700 }}>{isOpen ? "▲ Close" : "▼ Open"}</span>
                </button>

                {isOpen && (
                  <div style={{ borderTop: "1px solid var(--gray-border)", padding: "20px" }}>
                    {area.content.split("\n\n").map((para, i) => (
                      <p key={i} style={{ fontSize: 14, color: "#374151", lineHeight: 1.75, marginBottom: 14 }}>{para}</p>
                    ))}

                    <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--gray-border)", borderRadius: 10, padding: "16px", marginBottom: 16 }}>
                      <p style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--sage-dark)", marginBottom: 10 }}>Actions to take</p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                        {area.actions.map((action, i) => (
                          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "var(--charcoal)", lineHeight: 1.65 }}>
                            <span style={{ marginTop: 7, flexShrink: 0, width: 6, height: 6, borderRadius: "50%", background: "var(--sage-dark)", display: "inline-block" }} />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ background: "#EDE9FE", border: "1px solid #7C3AED", borderRadius: 10, padding: "16px" }}>
                      <p style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "#7C3AED", marginBottom: 6 }}>📖 {area.example.title}</p>
                      <p style={{ fontSize: 13, color: "#3730a3", lineHeight: 1.7, margin: 0 }}>{area.example.text}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Reflection questions */}
        <div style={{ background: "var(--white)", border: "2px solid var(--sage-dark)", borderRadius: 14, padding: "28px", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 17, fontWeight: 800, color: "var(--charcoal)", margin: "0 0 6px" }}>
            Reflection Questions
          </h2>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
            Tick the questions you have reflected on. Use the notes space at the bottom to record your thinking.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {REFLECTION_QUESTIONS.map((q, idx) => {
              const checked = checkedQuestions[q.id];
              return (
                <button key={q.id} onClick={() => toggleQ(q.id)}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", textAlign: "left", background: checked ? "#D1FAE5" : "var(--sage-xlight)", border: `1.5px solid ${checked ? "#059669" : "var(--gray-border)"}`, borderRadius: 10, cursor: "pointer", transition: "all 0.15s" }}>
                  <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 4, border: `2px solid ${checked ? "#059669" : "#d1d5db"}`, background: checked ? "#059669" : "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                    {checked && <span style={{ color: "var(--white)", fontSize: 12, fontWeight: 800 }}>✓</span>}
                  </span>
                  <span style={{ fontSize: 14, color: checked ? "#065F46" : "var(--charcoal)", lineHeight: 1.65, fontWeight: checked ? 600 : 400 }}>
                    {idx + 1}. {q.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Notes toggle */}
          <button onClick={() => setNotesOpen((p) => !p)}
            style={{ width: "100%", padding: "12px 16px", background: "var(--sage-xlight)", border: "1px solid var(--gray-border)", borderRadius: 10, fontSize: 13, fontWeight: 700, color: "var(--sage-dark)", cursor: "pointer", textAlign: "left" }}>
            {notesOpen ? "▲ Hide notes space" : "▼ Open notes space"}
          </button>
          {notesOpen && (
            <div style={{ marginTop: 10 }}>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={6}
                placeholder="Use this space to record your reflections on the questions above. Your notes are private and stay on this page."
                style={{ width: "100%", padding: "14px", border: "1px solid var(--gray-border)", borderRadius: 10, fontSize: 14, color: "var(--charcoal)", background: "var(--sage-xlight)", resize: "vertical", boxSizing: "border-box", lineHeight: 1.7 }} />
            </div>
          )}
        </div>
      </div>

      {/* About section */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 16 }}>About this resource</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 800, color: "var(--charcoal)", marginBottom: 20 }}>Why intersectionality is not optional</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
            Intersectionality is sometimes positioned as an advanced or aspirational dimension of EDI practice: something to tackle once the basics are in place. This framing is mistaken. The people most affected by the absence of an intersectional approach are often those who experience the deepest disadvantage. Treating intersectionality as optional means systematically missing the people most in need of change.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            That does not mean you need perfect intersectional data before you can act. It means building the habit of asking, in every piece of work: whose experience are we not capturing? Who sits at the intersection of the groups we are describing? And what would we need to do to make their experience visible and central to what we are designing?
          </p>
        </div>
      </div>

      {/* Related resources */}
      <div style={{ background: "var(--sage-xlight)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href="/dashboard/apply/inclusive-data-collection" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Guide</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Inclusive Data Collection</span>
            </Link>
            <Link href="/dashboard/apply/inclusion-maturity-framework" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Self-Assessment</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Inclusion Maturity Framework</span>
            </Link>
            <Link href="/dashboard/apply/edi-strategy-guide" style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>Strategy Guide</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.4 }}>Getting Started with EDI Strategy</span>
            </Link>
          </div>
        </div>
      </div>
      <BottomBanner />
    </div>
  );
}
