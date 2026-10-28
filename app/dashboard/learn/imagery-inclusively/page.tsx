"use client";
import React, { useState } from "react";
import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import { markCompleted } from "@/lib/completionStore";

type QuizAnswers = Record<number, string>;

function SlideShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1rem" }}>
      {children}
    </div>
  );
}

function SlideHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h1 style={{ fontFamily: "var(--font-display)", color: "var(--sage-dark)", fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 700, margin: 0 }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", opacity: 0.6, fontSize: "1rem", marginTop: "0.35rem" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: "1.25rem", margin: "0.75rem 0" }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "0.4rem" }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ReflectionBox({ prompt, subPrompts }: { prompt?: string; subPrompts?: string[] }) {
  return (
    <div style={{
      background: "var(--sage-xlight)", borderLeft: "4px solid var(--sage-dark)",
      borderRadius: "0 0.5rem 0.5rem 0", padding: "1rem 1.25rem", margin: "1.5rem 0",
    }}>
      <p style={{ fontFamily: "var(--font-heading)", color: "var(--sage-dark)", fontWeight: 600, fontSize: "0.9rem", margin: "0 0 0.5rem 0" }}>
        💭 Reflect (write down on your paper):
      </p>
      {prompt && (
        <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: "0.25rem 0" }}>
          {prompt}
        </p>
      )}
      {subPrompts && subPrompts.map((sp, i) => (
        <p key={i} style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: "0.4rem 0" }}>
          ✏️ {sp}
        </p>
      ))}
    </div>
  );
}

function KeyReminder({ text }: { text: string }) {
  return (
    <div style={{
      background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
      borderRadius: "0.5rem", padding: "0.9rem 1.1rem", margin: "1.25rem 0",
    }}>
      <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: 0 }}>
        📌 {text}
      </p>
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--sage-dark)", fontSize: "1rem", margin: "1.25rem 0 0.4rem 0" }}>
      {text}
    </p>
  );
}

function BodyText({ children, italic, small }: { children: React.ReactNode; italic?: boolean; small?: boolean }) {
  return (
    <p style={{
      fontFamily: "var(--font-body)", color: "var(--charcoal)",
      fontSize: small ? "0.9rem" : "1rem", lineHeight: 1.75,
      fontStyle: italic ? "italic" : "normal", margin: "0.6rem 0",
    }}>
      {children}
    </p>
  );
}

function MoveOnNote() {
  return (
    <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", opacity: 0.55, fontSize: "0.85rem", fontStyle: "italic", marginTop: "0.75rem" }}>
      Once you have written down your answers, you can move to the next slide.
    </p>
  );
}

function Slide1() {
  return (
    <SlideShell>
      <SlideHeading title="Representation Matters" subtitle="Using Imagery Inclusively" />
      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--sage-dark)", fontSize: "0.9rem", margin: "0 0 0.4rem 0" }}>
          💭 Opening thought:
        </p>
        <BodyText italic>
          The images we choose tell a story about who belongs. Every visual decision is a statement about who your organisation sees, values, and includes.
        </BodyText>
      </div>

      <SectionLabel text="🎯 Learning Objective:" />
      <BodyText>
        This lesson will help you understand how to select and use imagery that reflects the full diversity of human experience, avoids harmful stereotypes, and builds a culture of dignity and belonging.
      </BodyText>

      <SectionLabel text="📖 Learning Outcomes: by the end of this lesson you will be able to:" />
      <BulletList items={[
        "Explain why imagery choices matter for inclusion and belonging",
        "Identify common visual stereotypes and tokenistic practices, and describe what authentic representation looks like instead",
        "Apply a practical framework for auditing and improving the imagery your organisation uses",
      ]} />

      <SectionLabel text="📋 Guidelines:" />
      <BulletList items={[
        "Find a quiet space and give yourself around 15 minutes",
        "Use headphones if you would like the lesson read aloud",
        "Have a pen and paper ready: there are reflection prompts throughout",
        "There is a short quiz at the end. Complete it to mark this lesson as done and add it to your learning record on your dashboard.",
      ]} />
    </SlideShell>
  );
}

function Slide2() {
  return (
    <SlideShell>
      <SlideHeading title="Why Imagery Matters" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/representation-matters/slide2-diverse-imagery.jpg" alt="A diverse group of people featured across different workplace and community contexts" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Images shape perception before a single word is read. Research in cognitive psychology consistently shows that visual representation affects whether people see themselves as belonging in a space, whether that is a workplace, a school, a charity, or a public service.
      </BodyText>

      <SectionLabel text="The signal imagery sends:" />
      <BodyText>
        Every image your organisation publishes communicates something to potential employees, service users, and communities. It signals who is welcome, who is valued, and whose presence is expected. When the people shown do not reflect the full diversity of the people you serve or employ, the message is clear even if unintentional: some people belong here more than others.
      </BodyText>

      <SectionLabel text="Tokenism versus authentic representation:" />
      <BodyText>
        Tokenism in imagery occurs when diversity is added superficially, as a visual afterthought. A single non-white face in a group shot, a wheelchair user placed prominently on a homepage but absent everywhere else; these choices signal that diversity is a performance rather than a reality.
      </BodyText>
      <BodyText>
        Authentic representation goes deeper. It reflects the actual diversity of your community, including dimensions of identity that are often invisible in corporate imagery: neurodiversity, socioeconomic background, LGBTQ+ identities, religious and cultural practices, and the intersections between them.
      </BodyText>

      <KeyReminder text="The gap between surface-level diversity and genuine inclusion in visuals is often visible to the very communities you are trying to include. They have seen it before." />
    </SlideShell>
  );
}

function Slide3() {
  return (
    <SlideShell>
      <SlideHeading title="Centre Lived Experience" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/representation-matters/slide3-authentic-community.jpg" alt="People from diverse backgrounds engaged authentically in a community or workplace setting" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Centring lived experience in imagery means choosing visuals that authentically reflect real communities, not curated versions of them. It means going beyond surface-level diversity to include the full spectrum of human identity and experience.
      </BodyText>

      <SectionLabel text="Surface-level versus authentic diversity:" />
      <BodyText>
        Stock photo diversity often features people of different apparent ethnicities arranged in a professional setting, smiling in roughly equal measure. It rarely reflects neurodiversity, disability, socioeconomic background, LGBTQ+ identities, or the intersectional realities of people who hold multiple marginalised identities at once.
      </BodyText>
      <BodyText>
        Authentic representation includes people in roles, spaces, and narratives that reflect their actual contributions and experiences. A disabled employee shown as a competent, senior decision-maker. A Muslim woman in hijab leading a client presentation. An older worker mentoring a younger colleague. These are not token gestures; they are honest reflections of the diversity that exists in well-run, inclusive organisations.
      </BodyText>

      <SectionLabel text="Letting people guide their own representation:" />
      <BodyText>
        One of the most powerful things you can do is involve employees in decisions about how they are shown. Ask rather than assume. Give people agency over whether and how they appear in organisational communications. This is not just good practice; it is a fundamental expression of respect.
      </BodyText>

      <KeyReminder text="Tokenism is when diversity is added superficially, as a visual afterthought rather than a genuine reflection of your culture and community." />
    </SlideShell>
  );
}

function Slide4() {
  return (
    <SlideShell>
      <SlideHeading title="Challenge Stereotypes and Represent Power Equitably" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/representation-matters/slide4-leadership-diversity.jpg" alt="Diverse individuals in leadership and decision-making roles" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Harmful visual stereotypes are often so embedded in our culture that we do not notice them until they are pointed out. Certain groups are consistently shown in supporting, service, or victim roles. Others are positioned as leaders, experts, and authorities. This is not neutral; it reinforces the very hierarchies that inclusive practice is trying to dismantle.
      </BodyText>

      <SectionLabel text="Common harmful tropes to watch for:" />
      <BulletList items={[
        "Disabled people shown as objects of inspiration or pity rather than as competent professionals",
        "People of colour shown predominantly in service or manual roles, or as the single diverse person in a group",
        "Women, particularly women of colour, shown as support staff rather than in leadership positions",
        "Older workers absent from imagery entirely, or shown as technologically incompetent",
        "LGBTQ+ identities made invisible by defaulting to heteronormative couple and family imagery",
      ]} />

      <SectionLabel text="Representing power equitably:" />
      <BodyText>
        Ask yourself who is centred in the image and who holds authority. Ensure that underrepresented groups are shown as decision-makers, experts, and leaders; not only as participants or observers. Leadership imagery in particular sends a powerful signal about who is expected to lead.
      </BodyText>

      <ReflectionBox
        prompt="Think about the last set of images your organisation used in a communication, a presentation, or on your website."
        subPrompts={[
          "Who was centred in those images?",
          "Who was shown in leadership or decision-making roles?",
          "Who was absent?",
        ]}
      />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide5() {
  return (
    <SlideShell>
      <SlideHeading title="Accessibility in Imagery" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/representation-matters/slide5-accessibility.jpg" alt="A person using assistive technology to access digital content" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Inclusive imagery is not only about who is shown; it is also about how your images can be accessed. For people using assistive technology, an image without proper accessibility support is simply invisible.
      </BodyText>

      <SectionLabel text="Alt text that describes meaning:" />
      <BodyText>
        Alt text should communicate what an image conveys, not just what it contains. Compare these two descriptions of the same image: "group photo" versus "a diverse team of employees collaborating around a table in a problem-solving workshop." The second tells the story the image is meant to tell. It communicates meaning, not just appearance.
      </BodyText>

      <SectionLabel text="Practical accessibility requirements:" />
      <BulletList items={[
        "Use high-contrast visuals and clear, readable elements so images are legible for people with low vision",
        "Ensure images are compatible with screen readers and other assistive technology",
        "Provide captions or transcripts for images that contain text or convey information through visual detail",
        "Consider audio descriptions for complex infographics or images used in training contexts",
        "For decorative images that add no informational value, use empty alt text (alt=\"\") so screen readers skip them",
      ]} />

      <KeyReminder text="Accessibility in imagery is not optional. If someone using assistive technology cannot access your visual content, that content excludes them. This is a legal obligation as well as an ethical one." />
    </SlideShell>
  );
}

function Slide6() {
  return (
    <SlideShell>
      <SlideHeading title="Authenticity and the Diversity Stock Photo Problem" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/representation-matters/slide6-authentic-workplace.jpg" alt="Real colleagues in a natural, unposed workplace interaction" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Many organisations default to stock photography that shows a narrow, often performative version of diversity. Smiling faces arranged in careful demographic balance are not the same as authentic representation, and the people you most want to reach can usually tell the difference.
      </BodyText>

      <SectionLabel text="What authentic imagery looks like:" />
      <BulletList items={[
        "Natural, unstaged moments rather than posed group photographs",
        "Real settings that reflect your actual workplace or community",
        "Real people from your organisation or community, with their consent",
        "Imagery that reflects the full range of human experience, including difference, complexity, and joy",
      ]} />

      <SectionLabel text="The psychological safety effect:" />
      <BodyText>
        When people see themselves reflected authentically in an organisation's imagery, it signals that they will be seen and valued if they join. When the imagery is performative, it signals the opposite: that diversity is a PR exercise rather than a genuine commitment. This matters at every stage of the employment relationship, from the first moment a candidate looks at your website to the day-to-day experience of existing employees.
      </BodyText>

      <SectionLabel text="Illustrations versus photography:" />
      <BodyText>
        Illustrated imagery can be a powerful tool for representation, particularly for identities that are difficult to represent through photography without tokenism. However, illustrations carry their own risks: defaulting to a narrow, stylised aesthetic can still erase diversity. Ensure that illustrated characters reflect the same breadth of identity you would aim for in photography.
      </BodyText>
    </SlideShell>
  );
}

function Slide7() {
  return (
    <SlideShell>
      <SlideHeading title="Trauma-Informed and Intersectional Imagery" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/representation-matters/slide7-community.jpg" alt="A diverse group of people showing resilience, agency, and connection in their community" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <SectionLabel text="Trauma-informed imagery:" />
      <BodyText>
        Being trauma-informed in imagery choices means asking whether an image exploits pain, marginalisation, or conflict for visual effect. Images of suffering, poverty, or crisis are sometimes used with the intention of raising awareness, but when they reduce people to their hardship, they strip away agency and dignity.
      </BodyText>
      <BulletList items={[
        "Show resilience, agency, and empowerment rather than suffering as spectacle",
        "Avoid using traumatic imagery casually or decoratively",
        "Ask: does this image re-traumatise or sensationalise? If so, do not use it",
        "Centre dignity: every person shown in your imagery deserves to be shown with the same respect you would show any colleague",
      ]} />

      <SectionLabel text="Intersectional imagery:" />
      <BodyText>
        Intersectionality recognises that people hold multiple identities at once, and that the combination of those identities shapes their experiences in ways that cannot be reduced to any single dimension. Inclusive imagery must reflect this. Representing a disabled woman of colour as a competent senior leader is not just good diversity practice; it is an accurate reflection of who exists in our world and our workplaces.
      </BodyText>
      <BulletList items={[
        "Represent the overlapping experiences of race, gender, ability, age, sexuality, and culture",
        "Never show one group of people as a monolith: no one group is one-dimensional",
        "Show how systemic barriers affect real people without reducing people to those barriers",
      ]} />
    </SlideShell>
  );
}

function Slide8() {
  return (
    <SlideShell>
      <SlideHeading title="Real World Scenario" subtitle="What would you choose?" />

      <div style={{
        background: "var(--sage-xlight)", border: "1px solid var(--sage-light)",
        borderRadius: "0.75rem", padding: "1.25rem 1.5rem", margin: "0 0 1.5rem 0",
      }}>
        <BodyText>
          A UK charity is redesigning its website. They want to feature imagery that genuinely reflects their diverse community. Their current website uses stock photos showing mostly white, non-disabled adults in professional settings. They are choosing between three approaches.
        </BodyText>
      </div>

      <SectionLabel text="Option A:" />
      <BodyText>
        Replace all stock photos with new stock photos featuring a more demographically mixed set of people.
      </BodyText>

      <SectionLabel text="Option B:" />
      <BodyText>
        Commission a professional photographer to spend a day at their services, taking photos of actual service users and staff, with full consent and the ability for individuals to review how they are represented before publication.
      </BodyText>

      <SectionLabel text="Option C:" />
      <BodyText>
        Use AI-generated images of diverse people in workplace settings to avoid the time and cost of photography.
      </BodyText>

      <ReflectionBox
        prompt="Before reading further, which approach do you think best reflects the principles covered in this lesson, and why?"
        subPrompts={[
          "What are the strengths and limitations of each option?",
          "What principles from this lesson does each one honour or fail?",
        ]}
      />

      <SectionLabel text="The analysis:" />
      <BodyText>
        <strong>Option A</strong> is better than the status quo, but it remains potentially tokenistic. New stock photos featuring a more diverse set of faces do not reflect the actual community the charity serves. The imagery is still performative rather than authentic.
      </BodyText>
      <BodyText>
        <strong>Option B</strong> is the gold standard. It is authentic, consent-based, and centres lived experience. It shows real people in real settings, gives them agency over their own representation, and builds a visual identity that genuinely reflects the organisation.
      </BodyText>
      <BodyText>
        <strong>Option C</strong> raises significant ethical concerns. AI-generated imagery is not real representation; it is a simulation of it. It cannot centre lived experience because it has no lived experience to draw on. It also risks perpetuating AI-generated bias, since the models that produce these images are trained on data that reflects existing inequalities.
      </BodyText>

      <KeyReminder text="Always obtain explicit, informed consent before using anyone's image. Give people the ability to withdraw consent and to review how they are represented before publication." />
    </SlideShell>
  );
}

function Slide9() {
  return (
    <SlideShell>
      <SlideHeading title="Aligning Imagery with Organisational Action" />
      <div style={{ borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--gray-border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/representation-matters/slide9-alignment.jpg" alt="An organisation's visual communications reflecting its inclusive culture and practice" style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} />
      </div>

      <BodyText>
        Of all the principles in this lesson, this one may be the most consequential. Imagery that does not match the reality of your organisation does not just fail to include; it actively damages trust.
      </BodyText>

      <SectionLabel text="The credibility gap:" />
      <BodyText>
        When an organisation shows diverse leadership in its imagery but has no diversity at senior levels, people notice. Current employees, job candidates, service users, and communities all read the gap between visual claims and lived reality. That gap communicates that inclusion is a brand strategy rather than a genuine commitment.
      </BodyText>
      <BodyText>
        This is particularly damaging for the communities the imagery purports to represent. Being used as a symbol of inclusion while experiencing exclusion in practice is not a neutral experience.
      </BodyText>

      <SectionLabel text="Auditing your imagery against your culture:" />
      <BulletList items={[
        "Review your current imagery across all channels: website, social media, internal communications, recruitment materials, training resources",
        "Ask: does this imagery accurately reflect our actual workforce, leadership, and community?",
        "Identify gaps between what your imagery claims and what your data, culture, and employee experience show",
        "Develop a plan to close those gaps over time, both in your imagery and in your practice",
      ]} />

      <KeyReminder text="Imagery is a promise. Make sure you can keep it." />
    </SlideShell>
  );
}

function Slide10() {
  return (
    <SlideShell>
      <SlideHeading title="Building a Regular Review Practice" />

      <BodyText>
        Inclusive imagery is not a one-time project. It requires ongoing attention because your organisation changes, understanding of inclusion evolves, and new research and community feedback will shift what good looks like over time.
      </BodyText>

      <SectionLabel text="Questions for your regular imagery review:" />
      <BulletList items={[
        "Are all communities represented fairly across all our channels?",
        "Are stereotypes creeping in unnoticed, particularly in less prominent materials?",
        "Does our imagery centre dignity and equity, or does it reduce people to their difference?",
        "Who is centred in our imagery, and who holds authority in the images we use?",
        "Has our community or workforce changed in ways our imagery does not yet reflect?",
      ]} />

      <SectionLabel text="Involving diverse voices in the review:" />
      <BodyText>
        A review conducted only by people who are not represented in the imagery will miss things. Involve employees from across the organisation, including those from underrepresented groups, in your imagery review process. Their feedback is not optional context; it is essential expertise.
      </BodyText>
      <BodyText>
        Consider establishing a small imagery working group that includes diverse perspectives and meets regularly to assess new and existing visual content before it is published.
      </BodyText>

      <ReflectionBox
        prompt="Think about your own organisation's current imagery across its communications."
        subPrompts={[
          "What does it say about who belongs here?",
          "What would you want to change?",
          "Who should be involved in making those decisions?",
        ]}
      />
      <MoveOnNote />
    </SlideShell>
  );
}

function Slide11() {
  return (
    <SlideShell>
      <SlideHeading title="Lesson Roundup" />

      <BodyText>
        You have covered ten principles for inclusive imagery. Here is what to take away.
      </BodyText>

      <SectionLabel text="Key principles:" />
      <BulletList items={[
        "Imagery is not decoration; it is communication. Every visual choice sends a message about who belongs.",
        "Authentic representation goes beyond surface-level diversity to include lived experience, intersectionality, and genuine agency.",
        "Tokenism performs inclusion without delivering it; communities can tell the difference.",
        "Accessibility in imagery is a legal and ethical requirement, not an optional enhancement.",
        "Power representation matters: underrepresented groups must be shown as leaders and decision-makers, not only as participants.",
        "Trauma-informed imagery centres agency, resilience, and dignity rather than suffering as spectacle.",
        "Imagery must align with actual organisational practice; misalignment damages trust.",
        "Regular review, involving diverse voices, keeps your visual identity honest and evolving.",
      ]} />

      <KeyReminder text="The images you choose tell people who belongs in your organisation. Choose them with intention, honesty, and care." />
    </SlideShell>
  );
}

function Slide12Quiz({ onComplete }: { onComplete: (score: number) => void }) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      q: "What is tokenism in imagery?",
      options: [
        { id: "a", text: "Using images from diverse stock photo libraries" },
        { id: "b", text: "Adding diversity superficially as a visual afterthought rather than reflecting genuine inclusion" },
        { id: "c", text: "Including disabled people in workplace photography" },
        { id: "d", text: "Using natural, unstaged photography" },
      ],
      correct: "b",
      explanation: "Tokenism occurs when diversity is performed visually without reflecting genuine inclusion in culture or practice. It often manifests as a carefully arranged set of demographically mixed stock photos that bear no resemblance to the actual organisation or community.",
    },
    {
      q: "What should alt text for an image do?",
      options: [
        { id: "a", text: "Simply name the objects in the image" },
        { id: "b", text: "Describe the meaning and context of the image, not just its appearance" },
        { id: "c", text: "Be as short as possible to avoid slowing down screen readers" },
        { id: "d", text: "Match the caption exactly" },
      ],
      correct: "b",
      explanation: "Alt text should communicate what the image conveys, not just what it contains. A diverse team of employees in a problem-solving workshop is more meaningful than four people at a table.",
    },
    {
      q: "Which of the following best illustrates a trauma-informed approach to imagery?",
      options: [
        { id: "a", text: "Using powerful images of hardship to raise awareness and funds" },
        { id: "b", text: "Showing marginalised communities only in contexts of struggle to highlight systemic inequality" },
        { id: "c", text: "Depicting people with agency, resilience, and dignity rather than as subjects of suffering" },
        { id: "d", text: "Avoiding all imagery of marginalised communities" },
      ],
      correct: "c",
      explanation: "Trauma-informed imagery centres agency and dignity. It avoids exploiting pain or marginalisation for visual effect, and does not re-traumatise people by presenting suffering as spectacle.",
    },
    {
      q: "Why can misalignment between imagery and organisational practice be damaging?",
      options: [
        { id: "a", text: "It makes marketing materials look inconsistent" },
        { id: "b", text: "It may breach copyright law" },
        { id: "c", text: "It undermines trust and credibility when the visual message does not match the lived reality of employees and service users" },
        { id: "d", text: "It has no real impact as long as the images are technically accurate" },
      ],
      correct: "c",
      explanation: "When an organisation portrays diverse leadership in its communications but has no diversity in its actual leadership, people notice. That gap between image and reality actively damages trust, particularly among the communities the imagery purports to represent.",
    },
  ];

  const score = submitted ? questions.filter((q, i) => answers[i] === q.correct).length : 0;

  const handleSubmit = () => {
    const finalScore = questions.filter((q, i) => answers[i] === q.correct).length;
    setSubmitted(true);
    markCompleted("imagery-inclusively");
    onComplete(finalScore);
  };

  return (
    <SlideShell>
      <SlideHeading title="Quiz" subtitle="Test what you have learned" />
      {questions.map((q, qi) => (
        <div key={qi} style={{ marginBottom: "1.75rem", padding: "1.25rem", background: "var(--sage-xlight)", borderRadius: "0.75rem", border: "1px solid var(--sage-light)" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--charcoal)", fontSize: "1rem", margin: "0 0 0.75rem 0" }}>
            {qi + 1}. {q.q}
          </p>
          {q.options.map((opt) => {
            const chosen = answers[qi] === opt.id;
            const isCorrect = opt.id === q.correct;
            let bg = "var(--white)";
            let border = "1px solid var(--gray-border)";
            if (submitted && chosen && isCorrect) { bg = "#d4edda"; border = "1px solid #28a745"; }
            else if (submitted && chosen && !isCorrect) { bg = "#f8d7da"; border = "1px solid #dc3545"; }
            else if (submitted && isCorrect) { bg = "#d4edda"; border = "1px solid #28a745"; }
            return (
              <label key={opt.id} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", cursor: submitted ? "default" : "pointer", background: bg, border, borderRadius: "0.4rem", padding: "0.6rem 0.75rem", marginBottom: "0.5rem" }}>
                <input
                  type="radio"
                  name={`q${qi}`}
                  value={opt.id}
                  checked={chosen}
                  disabled={submitted}
                  onChange={() => setAnswers({ ...answers, [qi]: opt.id })}
                  style={{ marginTop: "0.15rem", flexShrink: 0 }}
                />
                <span style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem" }}>{opt.text}</span>
              </label>
            );
          })}
          {submitted && (
            <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.875rem", margin: "0.5rem 0 0 0", fontStyle: "italic" }}>
              {q.explanation}
            </p>
          )}
        </div>
      ))}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
          style={{
            background: Object.keys(answers).length < questions.length ? "var(--sage-light)" : "var(--sage-dark)",
            color: "var(--white)", border: "none", borderRadius: "0.5rem",
            padding: "0.75rem 2rem", fontFamily: "var(--font-heading)", fontWeight: 700,
            fontSize: "1rem", cursor: Object.keys(answers).length < questions.length ? "not-allowed" : "pointer",
          }}
        >
          Submit answers
        </button>
      )}
      {submitted && (
        <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem", marginTop: "0.5rem", textAlign: "center" as const }}>
          <p style={{ fontFamily: "var(--font-display)", color: "var(--sage-dark)", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.25rem 0" }}>
            You scored {score} out of {questions.length}
          </p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", fontSize: "0.95rem", margin: 0 }}>
            Your result has been saved to your learning record.
          </p>
        </div>
      )}
    </SlideShell>
  );
}

function Slide13({ score }: { score: number }) {
  return (
    <SlideShell>
      <SlideHeading title="How You Did and Your Takeaways" />

      <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "0.75rem", padding: "1.25rem", marginBottom: "1.5rem", textAlign: "center" as const }}>
        <p style={{ fontFamily: "var(--font-display)", color: "var(--sage-dark)", fontSize: "2rem", fontWeight: 700, margin: 0 }}>
          {score} / 4
        </p>
      </div>

      <SectionLabel text="Your takeaways from this lesson:" />
      <BulletList items={[
        "Imagery is communication: every visual choice sends a message about who belongs in your organisation",
        "Authentic representation requires lived experience, intersectionality, and genuine agency; not stock photo diversity",
        "Tokenism performs inclusion without delivering it; the communities you most want to reach will notice",
        "Accessibility in imagery is non-negotiable: alt text, contrast, and assistive technology compatibility are legal and ethical requirements",
        "There must be alignment between your visual identity and your organisational reality; the gap between them damages trust",
        "Regular review, involving diverse voices, keeps your imagery honest and evolving as your organisation does",
      ]} />
    </SlideShell>
  );
}

const SLIDE_TITLES = [
  "Welcome and Guidelines",
  "Why Imagery Matters",
  "Centre Lived Experience",
  "Challenge Stereotypes and Represent Power Equitably",
  "Accessibility in Imagery",
  "Authenticity and the Diversity Stock Photo Problem",
  "Trauma-Informed and Intersectional Imagery",
  "Real World Scenario",
  "Aligning Imagery with Organisational Action",
  "Building a Regular Review Practice",
  "Lesson Roundup",
  "Quiz",
  "How You Did and Your Takeaways",
];

export default function RepresentationMattersPage() {
  const [slide, setSlide] = useState(0);
  const [ttsActive, setTtsActive] = React.useState(false);

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setTtsActive(false);
  };

  const readSlide = () => {
    if (ttsActive) { stopSpeech(); return; }
    const el = document.getElementById("slide-content-area");
    if (!el) return;
    const text = el.innerText || el.textContent || "";
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.95;
    utt.onend = () => setTtsActive(false);
    utt.onerror = () => setTtsActive(false);
    setTtsActive(true);
    window.speechSynthesis.speak(utt);
  };

  React.useEffect(() => { stopSpeech(); }, [slide]);

  const [quizScore, setQuizScore] = useState(0);
  const totalSlides = SLIDE_TITLES.length;

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
  };

  const goNext = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSlide((s) => Math.min(s + 1, totalSlides - 1));
  };
  const goPrev = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSlide((s) => Math.max(s - 1, 0));
  };

  const slides = [
    <Slide1 key={0} />,
    <Slide2 key={1} />,
    <Slide3 key={2} />,
    <Slide4 key={3} />,
    <Slide5 key={4} />,
    <Slide6 key={5} />,
    <Slide7 key={6} />,
    <Slide8 key={7} />,
    <Slide9 key={8} />,
    <Slide10 key={9} />,
    <Slide11 key={10} />,
    <Slide12Quiz key={11} onComplete={handleQuizComplete} />,
    <Slide13 key={12} score={quizScore} />,
  ];

  const total = SLIDE_TITLES.length;
  const progress = ((slide + 1) / total) * 100;

  return (
    <>
      <PlatformNav />
      <main style={{
        minHeight: "100vh",
        background: "var(--white)",
        paddingTop: "5rem",
        paddingBottom: "6rem",
      }}>
        {/* Progress bar */}
        <div style={{ position: "sticky", top: "3.5rem", zIndex: 10, background: "var(--white)", borderBottom: "1px solid var(--gray-border)", paddingTop: "0.75rem", paddingBottom: "0.75rem" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
              <span style={{ fontFamily: "var(--font-heading)", color: "var(--sage-dark)", fontWeight: 600, fontSize: "0.8rem" }}>
                Slide {slide + 1} of {total}
              </span>
              <span style={{ fontFamily: "var(--font-body)", color: "var(--charcoal)", opacity: 0.5, fontSize: "0.8rem" }}>
                {SLIDE_TITLES[slide]}
              </span>
            </div>
            <div style={{ height: "4px", background: "var(--sage-xlight)", borderRadius: "99px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "var(--sage-dark)", borderRadius: "99px", transition: "width 0.3s ease" }} />
            </div>
          </div>
        </div>

        {/* Slide area */}
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1rem" }}>
          <div style={{
            background: "var(--white)",
            border: "1.5px solid var(--gray-border)",
            borderRadius: "1.25rem",
            padding: "2.5rem 2rem",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}>
            {/* TTS button */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.75rem" }}>
              <button
                onClick={readSlide}
                title={ttsActive ? "Stop reading" : "Read slide aloud"}
                style={{
                  background: ttsActive ? "var(--sage-dark)" : "none",
                  border: "1.5px solid var(--sage-dark)",
                  borderRadius: "99px",
                  padding: "0.35rem 0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  color: ttsActive ? "var(--white)" : "var(--sage-dark)",
                  transition: "all 0.2s",
                }}
              >
                {ttsActive ? "⏹ Stop" : "🔊 Listen"}
              </button>
            </div>
            <div id="slide-content-area">
              {slides[slide]}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "var(--white)", borderTop: "1.5px solid var(--gray-border)",
          padding: "0.75rem 1rem",
          zIndex: 20,
        }}>
          <div style={{
            maxWidth: "680px", margin: "0 auto",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <button
              onClick={goPrev}
              disabled={slide === 0}
              style={{
                background: "none", border: "1px solid var(--gray-border)",
                borderRadius: "0.5rem", padding: "0.55rem 1.25rem",
                fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem",
                color: slide === 0 ? "var(--gray-border)" : "var(--charcoal)",
                cursor: slide === 0 ? "not-allowed" : "pointer",
              }}
            >
              ← Previous
            </button>

            <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
              {SLIDE_TITLES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setSlide(i); window.scrollTo({ top: 0, behavior: "instant" }); }}
                  style={{
                    width: i === slide ? "20px" : "8px",
                    height: "8px",
                    borderRadius: "99px",
                    background: i === slide ? "var(--sage-dark)" : "var(--gray-border)",
                    border: "none", padding: 0, cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>

            {slide < total - 1 ? (
              <button
                onClick={goNext}
                style={{
                  background: "var(--sage-dark)", border: "none",
                  borderRadius: "0.5rem", padding: "0.55rem 1.25rem",
                  fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem",
                  color: "var(--white)", cursor: "pointer",
                }}
              >
                Next →
              </button>
            ) : (
              <Link href="/dashboard/learn" style={{
                background: "var(--sage-dark)", border: "none",
                borderRadius: "0.5rem", padding: "0.55rem 1.25rem",
                fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.9rem",
                color: "var(--white)", textDecoration: "none",
              }}>
                Finish lesson
              </Link>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
