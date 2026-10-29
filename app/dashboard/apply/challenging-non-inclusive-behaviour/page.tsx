"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState } from "react";

const SCENARIOS = [
  {
    id: "interrupt",
    title: "Someone is repeatedly interrupted",
    context: "In a meeting, a colleague (particularly one from an underrepresented group) is cut off or talked over before they finish their point.",
    responses: [
      { label: "In the moment", text: "'I want to make sure we hear what [name] was saying. [Name], please go ahead.'" },
      { label: "After the meeting", text: "'I noticed you were cut off a few times in there. I'm sorry I didn't step in sooner. Is there anything I can do to support you?'" },
      { label: "With the interrupter (privately)", text: "'Can I give you some feedback? I noticed [name] got interrupted a few times today, including by you. It might not have been intentional, but it had an impact on the discussion. Something to be aware of.'" },
    ],
  },
  {
    id: "credit",
    title: "An idea is credited to the wrong person",
    context: "Someone shares an idea that was clearly first raised by someone else; often by a person with less power or visibility in the room.",
    responses: [
      { label: "In the moment", text: "'I think [original person] raised that point earlier; it's great that it's getting traction. [Name], do you want to add anything to it?'" },
      { label: "If you missed it", text: "'I just want to flag that [name] raised a similar idea earlier in the meeting. I don't want it to get lost.'" },
    ],
  },
  {
    id: "joke",
    title: "A discriminatory joke or comment",
    context: "A colleague makes a comment or joke that relies on a stereotype or denigrates a particular group; perhaps framed as banter or harmless fun.",
    responses: [
      { label: "In the moment (direct)", text: "'I'm not comfortable with that. Can we move on?'" },
      { label: "In the moment (questioning)", text: "'I'm not sure I understood that; what did you mean?' (This invites the person to reconsider without direct confrontation.)" },
      { label: "Afterwards (one-to-one)", text: "'I wanted to follow up on what was said earlier. I don't think it was intended to cause harm, but that kind of comment can have a real impact on people. I'd find it helpful if we could avoid that kind of humour in future.'" },
    ],
  },
  {
    id: "excluded",
    title: "Someone is excluded from an event or activity",
    context: "A team social activity, networking event, or informal meeting is organised in a way that excludes people based on disability, religion, caring responsibilities, or other characteristics.",
    responses: [
      { label: "To the organiser (privately)", text: "'I wanted to raise something about the plan for [event]. I don't think it will work for everyone in the team; for example, [barrier]. Could we look at alternatives that would include more people?'" },
      { label: "If the event has already happened", text: "'I noticed [name] wasn't able to join [event]. I think it's worth us thinking about how we plan these so everyone can participate. Can we build that into how we do it next time?'" },
    ],
  },
  {
    id: "name",
    title: "Someone's name is mispronounced or altered",
    context: "A colleague's name is repeatedly mispronounced, shortened without consent, or replaced with a nickname, and they appear uncomfortable but do not challenge it themselves.",
    responses: [
      { label: "In the moment (on behalf of the person)", text: "'I think it's actually pronounced [correct pronunciation]; is that right, [name]?'" },
      { label: "Privately to the person", text: "'I noticed your name was being mispronounced. Would it be helpful if I said something next time, or would you prefer to handle it yourself?'" },
      { label: "To the person mispronouncing", text: "'Can I help you with [name]'s name? It's [pronunciation]. It's worth getting right; names matter.'" },
    ],
  },
  {
    id: "assumption",
    title: "An assumption is made about someone's identity or role",
    context: "Someone is assumed to be in a particular role, or to have particular views or experiences, based on their apparent identity; for example, assuming the only woman in a meeting will take notes, or asking a person of colour to speak on behalf of their community.",
    responses: [
      { label: "In the moment", text: "'I want to check that assumption: [name], what do you actually do here? / Do you want to answer for the group, or would you prefer we asked more broadly?'" },
      { label: "After the fact", text: "'I wanted to flag something I noticed in the meeting earlier. [Name] seemed to be being asked to represent [group] rather than being seen as an individual. That's something I think is worth us being careful about.'" },
    ],
  },
];

export default function ChallengingNonInclusiveBehaviourPage() {
  const [openScenario, setOpenScenario] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const downloadAsWord = () => {
    const css = 'body{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#2C2C2C;margin:2cm}h1{font-family:Calibri,Arial,sans-serif;font-size:20pt;color:#2D5A3C;margin-bottom:4pt}h2{font-family:Calibri,Arial,sans-serif;font-size:13pt;color:#2D5A3C;margin-top:18pt;margin-bottom:6pt;border-bottom:1pt solid #e5e7eb;padding-bottom:4pt}h3{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#2D5A3C;margin-top:12pt;margin-bottom:4pt}p{font-size:11pt;line-height:1.5;margin:4pt 0}ul{margin:6pt 0 12pt 20pt}li{margin-bottom:6pt;line-height:1.5}.meta{color:#6b7280;font-size:10pt;margin-bottom:16pt}.footer{font-size:9pt;color:#6b7280;margin-top:24pt;border-top:1pt solid #e5e7eb;padding-top:8pt}.reflection{background:#f4f8f5;border-left:3pt solid #2D5A3C;padding:8pt 12pt;margin:12pt 0}';
    const body = SCENARIOS.map((s) => "<h2>" + s.title + "</h2><p>" + (Array.isArray(s.content) ? (s.content as string[]).join(" ") : (s.content as string)) + "</p>").join("");
    const html =
      "<html xmlns:o=\'urn:schemas-microsoft-com:office:office\'" +
      " xmlns:w=\'urn:schemas-microsoft-com:office:word\'" +
      " xmlns=\'http://www.w3.org/TR/REC-html40\'>" +
      "<head><meta charset=\'utf-8\'><title>Challenging Non-Inclusive Behaviour</title><style>" + css + "</style></head>" +
      "<body>" +
      "<h1>Challenging Non-Inclusive Behaviour</h1>" +
      "<p class=\'meta\'>The Inclusion Edit &middot; theinclusionedit.com</p>" +
      body +
      "<p class=\'footer\'>This resource was created by The Inclusion Edit. theinclusionedit.com</p>" +
      "</body></html>";
    const blob = new Blob(["\uFEFF", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "challenging-non-inclusive-behaviour.doc";
    a.click();
    URL.revokeObjectURL(url);
    setShowShareMenu(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--sage-xlight, #f4f8f5)", fontFamily: "Lato, sans-serif" }}>
      <PlatformNav />

      <div data-noprint="true" style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <Link href="/dashboard/apply" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--sage-dark, #2D5A3C)", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
          &larr; Back to Resources
        </Link>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ background: "var(--sage-dark, #2D5A3C)", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>Guide</span>
          <span style={{ color: "#6b7280", fontSize: 13 }}>Practical guide &middot; Updated October 2026</span>
        </div>
        <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "var(--charcoal, #2C2C2C)", margin: "0 0 16px", lineHeight: 1.2 }}>
          Challenging Non-Inclusive Behaviour
        </h1>
        <p style={{ fontSize: 17, color: "#374151", lineHeight: 1.75, maxWidth: 720, margin: "0 0 24px" }}>
          Knowing that something is wrong and knowing what to say in the moment are two different things. This guide provides real language for real situations; common non-inclusive behaviours and practical responses for bystanders, managers, and colleagues.
        </p>
        <div data-noprint="true" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {["Allyship", "Bystander Intervention", "Inclusion Practices"].map((tag) => (
            <span key={tag} style={{ background: "#EFF5F0", color: "var(--sage-dark, #2D5A3C)", border: "1px solid #c6dbc9", borderRadius: 20, fontSize: 12, fontWeight: 600, padding: "4px 12px" }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Intro principles */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "24px 28px", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 17, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 14 }}>Before you respond: a few principles</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { point: "You do not have to be perfect to step in.", detail: "An imperfect challenge is almost always better than silence. Say something, even if you are not sure you have the exact right words." },
              { point: "Calm is more effective than confrontation.", detail: "The goal is to change behaviour, not to win an argument. A quiet, direct observation lands better than an aggressive public challenge." },
              { point: "You can act in the moment or afterwards.", detail: "If the moment passes, a private follow-up with the person affected, or with the person who caused harm, is still valuable." },
              { point: "You are not responsible for solving everything.", detail: "Challenging a behaviour once is a contribution. If it continues, escalate to a manager or HR. You do not have to carry this alone." },
            ].map((item) => (
              <div key={item.point} style={{ display: "flex", gap: 14, padding: "12px 14px", background: "var(--sage-xlight, #f4f8f5)", borderRadius: 8 }}>
                <span style={{ color: "var(--sage-dark, #2D5A3C)", fontSize: 18, flexShrink: 0, marginTop: 1 }}>›</span>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "var(--charcoal, #2C2C2C)" }}>{item.point} </span>
                  <span style={{ fontSize: 14, color: "#6b7280" }}>{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scenarios */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 40px" }}>
        <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 16 }}>Common scenarios and what to say</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SCENARIOS.map((scenario) => {
            const isOpen = openScenario === scenario.id;
            return (
              <div key={scenario.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
                <button onClick={() => setOpenScenario(isOpen ? null : scenario.id)} style={{ width: "100%", textAlign: "left", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <div>
                    <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: 16, color: "var(--charcoal, #2C2C2C)", margin: "0 0 6px" }}>{scenario.title}</p>
                    <p style={{ fontSize: 13, color: "#6b7280", margin: 0, lineHeight: 1.6 }}>{scenario.context}</p>
                  </div>
                  <span style={{ color: "var(--sage-dark, #2D5A3C)", fontSize: 20, fontWeight: 300, flexShrink: 0, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s", marginTop: 2 }}>+</span>
                </button>
                {isOpen && (
                  <div style={{ borderTop: "1px solid #f3f4f6", padding: "20px 24px 24px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {scenario.responses.map((r) => (
                        <div key={r.label} style={{ background: "var(--sage-xlight, #EFF5F0)", borderRadius: 10, padding: "16px 18px", borderLeft: "3px solid var(--sage-dark, #2D5A3C)" }}>
                          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", margin: "0 0 8px" }}>{r.label}</p>
                          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>{r.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "56px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 16 }}>About this topic</p>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: 24, fontWeight: 800, color: "var(--charcoal, #2C2C2C)", marginBottom: 20 }}>Why bystander action matters</h2>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
            Research consistently shows that bystander intervention (someone other than the person directly affected speaking up) is one of the most effective ways to change exclusionary behaviour. It signals that the behaviour is not acceptable to the broader group, and it reduces the burden on the person who has been harmed.
          </p>
          <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8 }}>
            The most common reason people do not intervene is not that they do not care; it is that they do not know what to say. This guide is built on the premise that having the words ready makes intervention much more likely.
          </p>
        </div>
      </div>

      <div data-noprint="true" style={{ background: "var(--sage-xlight, #f4f8f5)", borderTop: "1px solid #e5e7eb", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: "Raleway, sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage-dark, #2D5A3C)", marginBottom: 20 }}>Related resources</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { title: "How to Be an Ally: A Practical Guide", slug: "how-to-be-an-ally", format: "Guide" },
              { title: "Inclusive Meeting Checklist", slug: "inclusive-meeting-checklist", format: "Checklist" },
              { title: "Anti-Racist Practice Guide", slug: "anti-racist-practice-guide", format: "Guide" },
            ].map((r) => (
              <Link key={r.slug} href={`/dashboard/apply/${r.slug}`} style={{ display: "block", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 20px", textDecoration: "none", flex: "1 1 220px", minWidth: 200 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sage-dark, #2D5A3C)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6 }}>{r.format}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal, #2C2C2C)", lineHeight: 1.4 }}>{r.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
            {/* Share / Download bar */}
      <div data-noprint="true" style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "32px 24px" }}>
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
                  onClick={() => { setShowShareMenu(false); window.print(); }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 18px", fontSize: 14, color: "#374151", background: "none", border: "none", cursor: "pointer" }}
                >
                  🖨️ Print or save as PDF
                </button>
                <button
                  onClick={downloadAsWord}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 18px", fontSize: 14, color: "#374151", background: "none", border: "none", cursor: "pointer" }}
                >
                  📄 Download as Word doc
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
