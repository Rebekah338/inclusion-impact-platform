"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useRef } from "react";

const TERMS = [
  {
    term: "Accessibility",
    definition:
      "The design of spaces, systems, communications, and experiences so that everyone, including disabled and neurodivergent people, can participate fully and independently. Accessibility spans physical access, digital access, communication access, and the removal of attitudinal barriers. It is not an afterthought; it is a baseline requirement.",
  },
  {
    term: "Allyship",
    definition:
      "A continuous, intentional practice of using one's privilege, voice, and influence to challenge inequity and support marginalised groups. True allyship is active, not passive: it shows up in everyday decisions, in the courage to challenge harmful behaviour, and in the consistent amplification of voices that are too often ignored.",
  },
  {
    term: "Anti-racism",
    definition:
      "The active commitment to identifying, challenging, and dismantling racism at interpersonal, organisational, and systemic levels. Anti-racism goes beyond not being racist; it requires intentional policies, cultures, and behaviours that promote racial equity and justice, and a continuous process of learning, unlearning, and accountability.",
  },
  {
    term: "Belonging",
    definition:
      "The feeling of safety, acceptance, and being genuinely valued for who you are. Inclusion creates the conditions for belonging; belonging cannot be forced or assumed. An organisation can be diverse without its people feeling they belong, which is why belonging must be actively cultivated rather than presumed.",
  },
  {
    term: "Bias (Conscious)",
    definition:
      "Attitudes or beliefs we are aware of that can influence our behaviour and decision-making if not actively challenged. Conscious bias can show up in hiring decisions, performance reviews, and everyday interactions. Awareness alone is insufficient; action to counteract it is required.",
  },
  {
    term: "Bias (Unconscious)",
    definition:
      "Automatic assumptions or judgements that occur without conscious awareness, shaped by upbringing, socialisation, culture, and lived experience. Unconscious bias influences everyday interactions and workplace decisions, often in ways the person is entirely unaware of. Common types include affinity bias, confirmation bias, halo effect, and recency bias.",
  },
  {
    term: "BAME / BME",
    definition:
      "Acronyms standing for Black, Asian, and Minority Ethnic (BAME) and Black and Minority Ethnic (BME), historically used in UK policy and workplace contexts. These terms are increasingly recognised as problematic because they group together vastly different communities and experiences, and can obscure the specific barriers faced by distinct groups. Many organisations and communities now prefer more specific language.",
  },
  {
    term: "Cisgender",
    definition:
      "A term describing a person whose gender identity aligns with the sex they were assigned at birth. Often abbreviated to 'cis'. Understanding this term supports more precise and inclusive conversations about gender identity and transgender experiences.",
  },
  {
    term: "Cultural Competence",
    definition:
      "The ability to understand, respect, and effectively interact with people from different cultural backgrounds and identities. Cultural competence is not a fixed destination but an ongoing practice of learning, reflection, and adaptation. It requires curiosity, humility, and a genuine commitment to understanding perspectives beyond your own.",
  },
  {
    term: "Diversity",
    definition:
      "The presence of differences within a team, organisation, space, or society. This includes race, gender, age, disability, class, sexual orientation, religion, language, educational background, neurodiversity, and much more. Diversity describes who is in the room; inclusion describes whether they are heard, valued, and able to thrive once there.",
  },
  {
    term: "EDI",
    definition:
      "An abbreviation for Equity, Diversity, and Inclusion: the three interconnected principles that guide fair, representative, and inclusive organisations. Sometimes also written as DEI (Diversity, Equity, and Inclusion) or DEIB (Diversity, Equity, Inclusion, and Belonging). The ordering of the terms reflects different organisational priorities and approaches.",
  },
  {
    term: "Equality",
    definition:
      "Giving everyone the same resources or opportunities, regardless of their starting point. Equality treats everyone the same; equity recognises that people start from different places due to systemic barriers and provides what is needed to achieve fair outcomes. Equality alone is insufficient in an unequal world.",
  },
  {
    term: "Equity",
    definition:
      "Ensuring people have access to the resources, support, and opportunities they need to thrive, recognising that people start from different places due to historical and structural disadvantage. Equity is not about giving everyone the same thing; it is about giving people what they specifically need to reach the same outcomes.",
  },
  {
    term: "Ethnicity",
    definition:
      "A shared cultural identity based on factors such as language, history, ancestry, cultural practices, and heritage. Ethnicity is distinct from race, which is a social construct based on physical characteristics. People of the same racial group may belong to different ethnic groups, and vice versa.",
  },
  {
    term: "Exclusion",
    definition:
      "When individuals or groups are denied access, opportunities, or the ability to participate fully due to organisational culture, policies, or bias, whether intentional or not. Exclusion is often structural: it does not require deliberate discrimination to cause real harm.",
  },
  {
    term: "Gender Identity",
    definition:
      "A person's internal, deeply held sense of their own gender, which may or may not align with the sex they were assigned at birth. Gender identity is distinct from biological sex, gender expression, and sexual orientation. Common gender identities include man, woman, non-binary, genderqueer, and agender, among many others.",
  },
  {
    term: "Inclusion",
    definition:
      "The active, intentional practice of ensuring that all people, regardless of their identity or background, feel welcomed, respected, valued, and able to participate fully. Inclusion is not a passive state: it requires deliberate effort at individual, team, and organisational levels. A diverse organisation without inclusion is simply a diverse space where not everyone thrives.",
  },
  {
    term: "Intersectionality",
    definition:
      "A framework, coined by legal scholar Kimberle Crenshaw, that explains how overlapping systems of oppression (such as racism, sexism, ableism, and classism) interact to produce distinct experiences of discrimination and privilege. Intersectionality teaches us that we cannot understand someone's experience by looking at one aspect of their identity in isolation; the combination of identities shapes outcomes in unique ways.",
  },
  {
    term: "Marginalisation",
    definition:
      "The process by which certain individuals or groups are pushed to the edges of society, denied power, voice, and access to resources and opportunities. Marginalisation is usually structural and systemic rather than the result of individual actions alone.",
  },
  {
    term: "Microaggressions",
    definition:
      "Brief, commonplace verbal, behavioural, or environmental indignities, whether intentional or unintentional, that communicate hostile, derogatory, or negative messages to members of marginalised groups. While each individual incident may seem minor, the cumulative effect of repeated microaggressions causes significant harm to wellbeing, confidence, and sense of belonging.",
  },
  {
    term: "Micro-affirmations",
    definition:
      "Small, intentional acts of acknowledgement, inclusion, and validation that signal to someone that they are seen, valued, and respected. Micro-affirmations are the positive counterpart to microaggressions: tiny moments of recognition that, accumulated over time, build belonging, trust, and psychological safety.",
  },
  {
    term: "Neurodiversity",
    definition:
      "The natural variation in human brain function and behavioural traits. Neurodivergent individuals process, learn, and experience the world in ways that differ from what is considered neurotypical. This includes ADHD, autism, dyslexia, dyspraxia, dyscalculia, and more. Neurodiversity is not a deficit; it is a form of human difference that brings distinct strengths alongside specific support needs.",
  },
  {
    term: "Positive Action",
    definition:
      "Lawful measures, permitted under the Equality Act 2010, taken to help underrepresented groups access opportunities and address structural barriers. Positive action does not give any individual an unfair advantage; it levels the playing field by removing barriers. It is distinct from, and often confused with, positive discrimination.",
  },
  {
    term: "Positive Discrimination",
    definition:
      "Giving preferential treatment to a person solely because of a protected characteristic, regardless of merit. Positive discrimination is generally unlawful in the UK. It is important to distinguish positive discrimination clearly from positive action, which is lawful and encouraged.",
  },
  {
    term: "Privilege",
    definition:
      "Unearned advantages that individuals hold based on aspects of their identity, such as race, gender, class, or ability. Privilege does not mean a person's life has been easy; it means that certain aspects of their identity have not created the same barriers that others face. Recognising privilege is the starting point for using it responsibly.",
  },
  {
    term: "Protected Characteristics",
    definition:
      "The nine characteristics protected under the Equality Act 2010 in the UK: age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation. Discrimination on the basis of any protected characteristic is unlawful.",
  },
  {
    term: "Psychological Safety",
    definition:
      "The belief that one will not be punished or humiliated for speaking up, asking questions, making mistakes, or sharing ideas. Psychological safety is a foundational condition for inclusive teams: without it, people self-censor, disengage, and are unable to bring their full capabilities to their work.",
  },
  {
    term: "Race",
    definition:
      "A social and political construct used to categorise people based on perceived physical characteristics such as skin colour. Race is not a biological reality; it is a system created and sustained by society that has real consequences for people's lives, opportunities, and experiences of discrimination and privilege.",
  },
  {
    term: "Racism",
    definition:
      "Prejudice, discrimination, or antagonism directed against a person or people based on their membership of a particular racial group. Racism operates at multiple levels: individual (interpersonal attitudes and behaviours), institutional (policies and practices that produce racial inequity), and structural (the way institutions and systems interact to produce and reproduce racial inequality).",
  },
  {
    term: "Reasonable Adjustments",
    definition:
      "Changes an employer or service provider is legally required to make under the Equality Act 2010 to remove or reduce the disadvantage experienced by a disabled person. Reasonable adjustments can include changes to physical environments, working arrangements, policies, or the provision of equipment or support. The test of reasonableness considers factors such as effectiveness, cost, and practicality.",
  },
  {
    term: "Representation",
    definition:
      "The presence of people from diverse backgrounds across all levels of an organisation, particularly in positions of power, leadership, and decision-making. Representation matters because who is in the room shapes what decisions are made and whose experiences are considered. Representation without inclusion risks tokenism.",
  },
  {
    term: "Sexism",
    definition:
      "Prejudice, stereotyping, or discrimination on the basis of sex, typically against women and girls. Sexism operates at individual, institutional, and structural levels, and intersects with other forms of discrimination including racism, ableism, and classism. It can be overt or subtle, intentional or unintentional.",
  },
  {
    term: "Systemic Racism",
    definition:
      "Racism embedded within the policies, practices, and procedures of systems and institutions, producing racially inequitable outcomes regardless of the intentions of individuals within those systems. Systemic racism is distinct from individual racist acts: it operates through the normal functioning of organisations and institutions.",
  },
  {
    term: "Tokenism",
    definition:
      "The practice of making only a symbolic effort to include members of underrepresented groups, without giving them genuine power, voice, or belonging. Tokenism treats diversity as a box to tick rather than a value to embed. It places an unfair burden on individuals to represent their entire community and often results in those individuals feeling isolated and unsupported.",
  },
  {
    term: "Transgender",
    definition:
      "An umbrella term for people whose gender identity differs from the sex they were assigned at birth. Transgender people may identify as a man, a woman, non-binary, or another gender identity. Being transgender is not contingent on any medical procedure or legal recognition.",
  },
  {
    term: "Unconscious Bias Training",
    definition:
      "Training designed to help individuals become aware of their unconscious biases and understand how those biases affect their decisions and behaviour. While awareness is a valuable starting point, unconscious bias training alone is insufficient to drive systemic change: it must be combined with structural interventions, accountability measures, and ongoing practice.",
  },
];

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function EDIGlossaryPage() {
  const termsRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const filtered = TERMS.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch = t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q);
    const matchLetter = activeLetter ? t.term.toUpperCase().startsWith(activeLetter) : true;
    return matchSearch && matchLetter;
  });

  const usedLetters = new Set(TERMS.map((t) => t.term[0].toUpperCase()));

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight, #f4f8f5)", fontFamily: "Lato, sans-serif" }}>
      <PlatformNav />

      {/* Back nav */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link
          href="/dashboard/apply"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "var(--sage-dark, #2D5A3C)",
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
          }}
        >
          &larr; Back to Resources
        </Link>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span
            style={{
              background: "var(--sage-dark, #2D5A3C)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              padding: "4px 12px",
              borderRadius: 20,
            }}
          >
            Glossary
          </span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Reference resource &middot; Updated October 2026</span>
        </div>

        <h1
          style={{
            fontFamily: "Raleway, sans-serif",
            fontSize: "clamp(26px, 4vw, 38px)",
            fontWeight: 800,
            color: "var(--charcoal, #2C2C2C)",
            margin: "0 0 16px",
            lineHeight: 1.2,
          }}
        >
          EDI Glossary
        </h1>

        <p
          style={{
            fontSize: 17,
            color: "#374151",
            lineHeight: 1.75,
            maxWidth: 720,
            margin: "0 0 32px",
          }}
        >
          A shared vocabulary is one of the most important foundations of effective EDI work. This glossary defines key
          terms clearly and accurately, supporting individuals and organisations to build common understanding, communicate
          with confidence, and engage in inclusion conversations with precision and care.
        </p>

        {/* Topic tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Inclusion Practices"].map((tag) => (
            <span
              key={tag}
              style={{
                background: "var(--sage-xlight, #EFF5F0)",
                color: "var(--sage-dark, #2D5A3C)",
                border: "1px solid #c6dbc9",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                padding: "4px 12px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Search + A to Z filter */}
      <div
        style={{
          background: "#fff",
          borderTop: "1px solid #e5e7eb",
          borderBottom: "1px solid #e5e7eb",
          padding: "20px 24px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <input
            type="text"
            placeholder="Search terms or definitions..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveLetter(null);
            }}
            style={{
              width: "100%",
              maxWidth: 480,
              padding: "10px 16px",
              border: "1.5px solid #d1d5db",
              borderRadius: 8,
              fontSize: 15,
              outline: "none",
              marginBottom: 16,
              boxSizing: "border-box",
            }}
          />

          {/* A to Z nav */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {LETTERS.map((l) => (
              <button
                key={l}
                onClick={() => { setActiveLetter(activeLetter === l ? null : l); (() => { const el = termsRef.current; if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 120; window.scrollTo({ top, behavior: "smooth" }); } })(); }}
                disabled={!usedLetters.has(l)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 6,
                  border: "1.5px solid",
                  borderColor:
                    activeLetter === l
                      ? "var(--sage-dark, #2D5A3C)"
                      : usedLetters.has(l)
                      ? "#d1d5db"
                      : "transparent",
                  background: activeLetter === l ? "var(--sage-dark, #2D5A3C)" : "transparent",
                  color:
                    activeLetter === l
                      ? "#fff"
                      : usedLetters.has(l)
                      ? "var(--charcoal, #2C2C2C)"
                      : "#d1d5db",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: usedLetters.has(l) ? "pointer" : "default",
                }}
              >
                {l}
              </button>
            ))}
            {activeLetter && (
              <button
                onClick={() => { setActiveLetter(null); (() => { const el = termsRef.current; if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 120; window.scrollTo({ top, behavior: "smooth" }); } })(); }}
                style={{
                  padding: "0 12px",
                  height: 30,
                  borderRadius: 6,
                  border: "1.5px solid #d1d5db",
                  background: "transparent",
                  color: "#6b7280",
                  fontSize: 12,
                  cursor: "pointer",
                  marginLeft: 4,
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Terms */}
      <div id="terms-list" ref={termsRef} style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        {filtered.length === 0 ? (
          <p style={{ color: "#6b7280", fontSize: 15 }}>No terms match your search. Try different keywords.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {filtered.map((item, i) => (
              <TermRow key={i} term={item.term} definition={item.definition} />
            ))}
          </div>
        )}

        <p style={{ color: "#9ca3af", fontSize: 13, marginTop: 40 }}>
          {filtered.length} {filtered.length === 1 ? "term" : "terms"} shown &middot; {TERMS.length} total
        </p>
      </div>

      {/* About this topic */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "var(--sage-dark, #2D5A3C)",
              marginBottom: 16,
            }}
          >
            About this topic
          </p>
          <h2
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: "var(--charcoal, #2C2C2C)",
              marginBottom: 20,
            }}
          >
            Why language matters in EDI
          </h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Language is not neutral. The words we use to talk about equity, diversity, and inclusion shape how we
            understand the issues, how we respond to them, and how included or excluded people feel in those
            conversations. When terminology is unclear or inconsistently used, it creates barriers: people disengage,
            misunderstand one another, or avoid conversations altogether for fear of saying the wrong thing.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Building a shared vocabulary does not mean policing language or demanding perfection. It means creating a
            common foundation from which genuine, informed conversations can happen. When teams understand what terms
            like intersectionality, equity, and psychological safety actually mean and why they matter, they are
            better equipped to recognise the issues those terms describe in their own environments and to take
            meaningful action in response.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            EDI language also evolves. Terms that were once widely used are now understood to be limiting or harmful;
            new frameworks emerge as our collective understanding deepens. Staying current with language is part of the
            ongoing commitment to inclusion: not because words alone create change, but because the right words help
            us see what we might otherwise miss, and name what we need to address.
          </p>
        </div>
      </div>

      {/* Related resources */}
      <div style={{ background: "var(--sage-xlight, #f4f8f5)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "var(--sage-dark, #2D5A3C)",
              marginBottom: 20,
            }}
          >
            Related resources
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { title: "Recognising Bias: Common Types at Work", slug: "recognising-bias", format: "Tool" },
              { title: "How to Be an Ally: Step-by-Step Guide", slug: "how-to-be-an-ally", format: "Guide" },
              { title: "Intersectional Gender Pay Gap Framework", slug: "gender-pay-gap-framework", format: "Framework" },
            ].map((r) => (
              <Link
                key={r.slug}
                href={`/dashboard/apply/${r.slug}`}
                style={{
                  display: "block",
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  padding: "16px 20px",
                  textDecoration: "none",
                  flex: "1 1 220px",
                  minWidth: 200,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--sage-dark, #2D5A3C)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  {r.format}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal, #2C2C2C)", lineHeight: 1.4 }}>
                  {r.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

            {/* Share / Download bar */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "32px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--charcoal, #2C2C2C)", margin: "0 0 4px" }}>Useful?</p>
            <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>Share it with a colleague, or save a copy for your records. Print-friendly version included.</p>
          </div>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--sage-dark, #2D5A3C)", color: "#fff", border: "none", borderRadius: 8, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Raleway, sans-serif" }}
            >
              <span>↗</span> Share or download
            </button>
            {showShareMenu && (
              <div style={{ position: "absolute", right: 0, bottom: "calc(100% + 8px)", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.10)", minWidth: 220, zIndex: 50, overflow: "hidden" }}>
                <button
                  onClick={() => { navigator.clipboard.writeText(window.location.href); setShowShareMenu(false); }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 18px", fontSize: 14, color: "#374151", background: "none", border: "none", cursor: "pointer", borderBottom: "1px solid #f3f4f6" }}
                >
                  🔗 Copy link
                </button>
                <button
                  onClick={() => { window.open(window.location.href, "_blank"); setShowShareMenu(false); }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 18px", fontSize: 14, color: "#374151", background: "none", border: "none", cursor: "pointer" }}
                >
                  🖨️ Print or save as PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomBanner />
    </div>
  );
}

function TermRow({ term, definition }: { term: string; definition: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 8,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "18px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: "var(--charcoal, #2C2C2C)",
          }}
        >
          {term}
        </span>
        <span
          style={{
            color: "var(--sage-dark, #2D5A3C)",
            fontSize: 20,
            fontWeight: 300,
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          style={{
            padding: "0 24px 20px",
            fontSize: 15,
            color: "#374151",
            lineHeight: 1.75,
            borderTop: "1px solid #f3f4f6",
          }}
        >
          <div style={{ height: 12 }} />
          {definition}
        </div>
      )}
    </div>
  );
}
