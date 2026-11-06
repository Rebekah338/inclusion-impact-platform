'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/app/components/BrandIcon';
import PlatformNav from '@/app/components/PlatformNav';
import { addCertificate, openCertificate, getCertificateName, setCertificateName } from '@/lib/certificates';

type ItemStatus = 'available' | 'coming_soon';
type CompletedMap = Record<string, boolean>;
type ReflectionMap = Record<string, string>;
type OpenMap = Record<string, boolean>;

const REQUIRED_PER_SECTION = 4;
const SUPPORT_EMAIL = 'info@theinclusionedit.com';

const SECTIONS = [
  {
    id: 'watch',
    title: 'Watch',
    description: 'Eight short videos. Choose the four most relevant to where you are right now.',
    color: 'var(--coll-green)',
    tint: 'var(--coll-green-tint)',
    mid: 'var(--coll-green-mid)',
    icon: 'video',
    items: [
      { id: 'v1', title: 'What Is Inclusion and Why Does It Matter?', duration: '12 min', status: 'coming_soon' as ItemStatus, recommended: true, thumbnailImage: '/watch-1-team-coffee.jpg', reflection: 'What surprised you most about the distinction between diversity, equity and inclusion? What might you do differently after watching this?' },
      { id: 'v2', title: 'Understanding Your Bias', duration: '18 min', status: 'coming_soon' as ItemStatus, recommended: true, thumbnailImage: '/watch-2-collaboration.jpg', reflection: 'Think of a recent decision at work. Where might bias have played a role, even unintentionally?' },
      { id: 'v3', title: 'What Allyship Actually Looks Like', duration: '15 min', status: 'coming_soon' as ItemStatus, recommended: true, thumbnailImage: '/watch-3-team-review.jpg', reflection: 'What is one specific action you could take in the next week to show up as a better ally for a colleague?' },
      { id: 'v4', title: 'Microaggressions: What They Are and Why They Matter', duration: '14 min', status: 'coming_soon' as ItemStatus, recommended: true, thumbnailImage: '/watch-4-meeting-discussion.jpg', reflection: 'Can you recall a time when you witnessed or experienced a microaggression? What would a good response have looked like?' },
      { id: 'v5', title: 'Cultural Competence at Work', duration: '16 min', status: 'coming_soon' as ItemStatus, recommended: false, thumbnailImage: '/watch-5-team-presentation.jpg', reflection: 'What cultural assumptions do you bring to your workplace? Where might those create blind spots?' },
      { id: 'v6', title: 'Disability Inclusion in Practice', duration: '20 min', status: 'coming_soon' as ItemStatus, recommended: false, thumbnailImage: '/watch-6-strategy.jpg', reflection: 'What barriers to inclusion for disabled colleagues might exist in your current workplace, and what could you do about them?' },
      { id: 'v7', title: 'Inclusive Recruitment: Common Mistakes', duration: '18 min', status: 'coming_soon' as ItemStatus, recommended: false, thumbnailImage: '/watch-7-diverse-meeting.jpg', reflection: "Where in your organisation's recruitment process is bias most likely to creep in? What one change would make the biggest difference?" },
      { id: 'v8', title: 'Psychological Safety and Belonging', duration: '15 min', status: 'coming_soon' as ItemStatus, recommended: false, thumbnailImage: '/watch-8-working-together.jpg', reflection: 'On a scale of 1 to 10, how psychologically safe does your team feel? What would move that number up by one?' },
    ],
  },
  {
    id: 'learn',
    title: 'Learn',
    description: 'Eight interactive lessons. Choose the four that speak most to your role.',
    color: 'var(--coll-purple)',
    tint: 'var(--coll-purple-tint)',
    mid: 'var(--coll-purple-mid)',
    icon: 'book',
    items: [
      { id: 'l1', title: 'Understanding Your Bias: A Self-Reflection Starter', duration: '20 min', status: 'available' as ItemStatus, href: '/dashboard/learn/understanding-your-bias', recommended: true, reflection: 'Think of a recent decision at work. Where might bias have played a role, even unintentionally?' },
      { id: 'l2', title: 'Pronouns and Language: A Practical Workplace Guide', duration: '15 min', status: 'available' as ItemStatus, href: '/dashboard/learn/pronouns-and-language', recommended: true, reflection: 'What is one language change you could make in your daily work communications to be more inclusive?' },
      { id: 'l3', title: 'Active Allyship: Moving from Intention to Impact', duration: '20 min', status: 'available' as ItemStatus, href: '/dashboard/learn/active-allyship', recommended: true, reflection: 'What is one specific action you could take in the next week to show up as a better ally for a colleague?' },
      { id: 'l4', title: 'Communicating Inclusively: Language, Tone, and Boundaries', duration: '20 min', status: 'available' as ItemStatus, href: '/dashboard/learn/communicating-inclusively', recommended: true, reflection: 'Think of a recent conversation where language could have been more inclusive. What would you change?' },
      { id: 'l5', title: 'Speaking Up: Challenging Exclusionary Behaviour at Work', duration: '20 min', status: 'available' as ItemStatus, href: '/dashboard/learn/speaking-up', recommended: false, reflection: 'What has stopped you from intervening in the past when you witnessed something that felt wrong? What would help you act next time?' },
      { id: 'l6', title: 'What Is Intersectionality? A Practical Introduction', duration: '20 min', status: 'available' as ItemStatus, href: '/dashboard/learn/what-is-intersectionality', recommended: false, reflection: "How might intersecting identities shape a colleague's experience of the workplace differently from your own?" },
      { id: 'l7', title: 'Run Meetings That Work for Everyone', duration: '20 min', status: 'available' as ItemStatus, href: '/dashboard/learn/run-meetings-that-work', recommended: false, reflection: 'What is one change you could make to your next meeting to ensure everyone has a voice?' },
      { id: 'l8', title: 'Anti-Racist Practice: A Practical Framework', duration: '25 min', status: 'available' as ItemStatus, href: '/dashboard/learn/anti-racist-practice', recommended: false, reflection: 'What concept from this lesson was new or challenging for you? What do you want to explore further?' },
    ],
  },
  {
    id: 'read',
    title: 'Read and Reflect',
    description: 'Twelve practical resources. Pick the four you will use first.',
    color: 'var(--coll-amber)',
    tint: 'var(--coll-amber-tint)',
    mid: 'var(--coll-amber-mid)',
    icon: 'clipboard',
    items: [
      { id: 'r2', title: 'How to Be an Ally: A Practical Guide', duration: '12 min read', status: 'available' as ItemStatus, href: '/dashboard/apply/how-to-be-an-ally', icon: 'heart', format: 'Guide', desc: 'Concrete actions and language for showing up as an ally to colleagues with marginalised identities.', reflection: 'Which of the actions in this guide feels most accessible to you right now? What might get in the way?' },
      { id: 'r1', title: 'Recognising Bias', duration: '20 min', status: 'available' as ItemStatus, href: '/dashboard/apply/recognising-bias', icon: 'search', format: 'Toolkit', desc: 'Exercises and frameworks to help you identify bias in yourself, your team, and your systems.', reflection: 'What type of bias surprised you most to encounter in yourself or others? What can you do with that awareness?' },
      { id: 'r4', title: 'Cultural Competence Reflection', duration: '15 min', status: 'available' as ItemStatus, href: '/dashboard/apply/cultural-competence-reflection', icon: 'eye', format: 'Reflection', desc: 'A structured self-assessment of your awareness, knowledge, and skills in working across cultures.', reflection: 'Where do you feel most confident in cross-cultural situations? Where do you want to grow?' },
      { id: 'r9', title: 'Inclusive Meeting Checklist', duration: '5 min', status: 'available' as ItemStatus, href: '/dashboard/apply/inclusive-meeting-checklist', icon: 'checklist', format: 'Checklist', desc: 'A quick reference to help you plan and run meetings where everyone can participate fully.', reflection: 'Which checklist item do you most often overlook? What would it take to make it a habit?' },
      { id: 'r10', title: 'Challenging Non-Inclusive Behaviour', duration: '15 min read', status: 'available' as ItemStatus, href: '/dashboard/apply/challenging-non-inclusive-behaviour', icon: 'message', format: 'Guide', desc: 'Practical language and strategies for addressing exclusionary comments and behaviours in the moment.', reflection: 'What has stopped you from speaking up in the past? What phrase or approach from this guide could you try next time?' },
      { id: 's1', title: 'Acknowledging Personal Bias', duration: '20 min', status: 'available' as ItemStatus, href: '/dashboard/apply/acknowledging-personal-bias', icon: 'eye', format: 'Reflection', desc: 'A guided reflection to help you surface and examine the biases you carry into everyday decisions.', reflection: 'What bias did this reflection surface that you find hardest to sit with? What do you want to do with that knowledge?' },
      { id: 's13', title: 'Micro-Affirmation Examples', duration: '10 min', status: 'available' as ItemStatus, href: '/dashboard/apply/micro-affirmation-examples', icon: 'heart', format: 'Toolkit', desc: 'A toolkit of small, everyday actions that signal belonging and respect to colleagues.', reflection: 'Which micro-affirmations do you already practise? Which one could you introduce this week?' },
      { id: 'r5', title: 'Inclusive Leadership Reflection', duration: '15 min', status: 'available' as ItemStatus, href: '/dashboard/apply/inclusive-leadership-reflection', icon: 'leadership', format: 'Reflection', desc: 'A structured reflection on your leadership style and its impact on team inclusion and belonging.', reflection: 'What aspect of your leadership has the biggest impact on whether your team feels included? What would you like to change?' },
      { id: 'r20', title: 'Intersectionality in Practice', duration: '15 min read', status: 'available' as ItemStatus, href: '/dashboard/apply/intersectionality', icon: 'layers', format: 'Guide', desc: 'A practical guide to understanding how overlapping identities shape workplace experience.', reflection: 'Whose intersecting identities have you not fully considered at work? How might that shape their day-to-day experience?' },
      { id: 's11', title: 'Inclusive Leadership Self-Assessment', duration: '15 min', status: 'available' as ItemStatus, href: '/dashboard/apply/inclusive-leadership-self-assessment', icon: 'chart', format: 'Reflection', desc: 'Assess your inclusive leadership behaviours across key dimensions: voice, visibility, belonging, and accountability.', reflection: 'Which dimension of inclusive leadership feels most underdeveloped for you right now? What is one step you could take?' },
      { id: 'r8', title: 'Supporting Neurodivergent Colleagues', duration: '15 min read', status: 'available' as ItemStatus, href: '/dashboard/apply/neurodivergent-support-guide', icon: 'sparkle', format: 'Guide', desc: 'Practical guidance for understanding and supporting colleagues who are neurodivergent.', reflection: 'What adjustment to your working practices would make the biggest difference to a neurodivergent colleague?' },
      { id: 'w6', title: 'Accessible Environments Toolkit', duration: 'Reference', status: 'available' as ItemStatus, href: '/dashboard/apply/accessible-environments-toolkit', icon: 'globe', format: 'Toolkit', desc: 'A reference toolkit covering physical, digital, and communication accessibility in the workplace.', reflection: 'Which type of accessibility barrier is most present in your working environment? What could you advocate for?' },
    ],
  },
];

function generateCertificate(name: string) {
  const cert = { id: 'inclusion-foundations', title: 'Inclusion Foundations Programme', kind: 'programme' as const };
  addCertificate(cert);
  openCertificate({ ...cert, date: new Date().toISOString() }, name);
}

const label: React.CSSProperties = { fontFamily: 'var(--font-heading)', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', margin: '0 0 .6rem' };

function ReflectionBlock({ itemId, prompt, reflections, setReflections }: {
  itemId: string;
  prompt: string;
  reflections: ReflectionMap;
  setReflections: React.Dispatch<React.SetStateAction<ReflectionMap>>;
}) {
  return (
    <div style={{ marginTop: '.85rem', padding: '.85rem', background: 'var(--pale-sage)', borderRadius: '12px' }}>
      <label htmlFor={`refl-${itemId}`} style={{ display: 'block', margin: '0 0 .35rem', fontFamily: 'var(--font-heading)', fontSize: '.8rem', fontWeight: 700, color: 'var(--evergreen)' }}>Your reflection</label>
      <p style={{ margin: '0 0 .6rem', fontSize: '.85rem', color: 'var(--ink)', lineHeight: 1.5 }}>{prompt}</p>
      <textarea
        id={`refl-${itemId}`}
        rows={3}
        placeholder="Write your thoughts here"
        value={reflections[itemId] || ''}
        onChange={e => setReflections(prev => ({ ...prev, [itemId]: e.target.value }))}
        style={{ width: '100%', boxSizing: 'border-box', padding: '.6rem .7rem', borderRadius: '8px', border: '1.5px solid var(--line)', background: 'var(--white)', fontSize: '.9rem', fontFamily: 'var(--font-body)', resize: 'vertical', lineHeight: 1.5, color: 'var(--ink)' }}
      />
      <p style={{ margin: '.35rem 0 0', fontSize: '.75rem', color: 'var(--slate)', display: 'flex', alignItems: 'center', gap: '.3rem' }}><Icon name="lock" size={12} color="var(--slate)" /> Saved on this device; only you can see it</p>
    </div>
  );
}

const MATCHER_QUESTIONS = [
  { q: 'Have you had formal inclusion or diversity training before?', options: ['Yes, quite a bit', 'A little', 'Not really'] },
  { q: 'Which area feels most relevant to you right now?', options: ['Understanding bias and myself', 'Speaking up and allyship', 'Running inclusive meetings and teams', 'Leading more inclusively'] },
  { q: 'How confident do you feel discussing inclusion topics with colleagues?', options: ['Very confident', 'Somewhat confident', 'Not very confident'] },
];

function computeMatcherResults(answers: string[]): string[] {
  const focus = answers[1] || '';
  const confidence = answers[2] || '';
  const experience = answers[0] || '';
  let suggested: string[] = [];
  if (focus.includes('bias') || confidence.includes('Not')) { suggested = ['v2', 'r1', 's1']; }
  else if (focus.includes('Speaking') || focus.includes('allyship')) { suggested = ['v3', 'l3', 'r10']; }
  else if (focus.includes('meetings')) { suggested = ['l7', 'r9', 's13']; }
  else if (focus.includes('Leading')) { suggested = ['r5', 's11', 'l3']; }
  else { suggested = ['v1', 'l1', 'r2']; }
  if ((experience.includes('Not really') || confidence.includes('Not')) && !suggested.includes('v1')) {
    suggested = ['v1', ...suggested.slice(0, 2)];
  }
  return suggested.slice(0, 3);
}

export default function OnboardingPage() {
  const [name, setName] = useState('');
  const [completed, setCompleted] = useState<CompletedMap>({});
  const [reflections, setReflections] = useState<ReflectionMap>({});
  const [openReflection, setOpenReflection] = useState<OpenMap>({});
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [matcherAnswers, setMatcherAnswers] = useState<string[]>([]);
  const [matcherResults, setMatcherResults] = useState<string[] | null>(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('onboarding_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) { setName(parsed.name); }
        if (parsed.completed) setCompleted(parsed.completed);
        if (parsed.reflections) setReflections(parsed.reflections);
      }
      if (!saved || !JSON.parse(saved).name) {
        const certName = getCertificateName();
        if (certName) setName(certName);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('onboarding_state', JSON.stringify({ name, completed, reflections }));
      if (name.trim()) setCertificateName(name.trim());
    } catch {}
  }, [name, completed, reflections]);

  const toggleComplete = (id: string) => setCompleted(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleReflection = (id: string) => setOpenReflection(prev => ({ ...prev, [id]: !prev[id] }));

  const sectionCount = (sectionId: string) => {
    const section = SECTIONS.find(s => s.id === sectionId);
    if (!section) return 0;
    return section.items.filter(i => completed[i.id]).length;
  };

  const allDone = SECTIONS.every(s => sectionCount(s.id) >= REQUIRED_PER_SECTION);
  const totalDone = SECTIONS.reduce((acc, s) => acc + Math.min(sectionCount(s.id), REQUIRED_PER_SECTION), 0);
  const totalRequired = SECTIONS.length * REQUIRED_PER_SECTION;
  const progressPct = Math.round((totalDone / totalRequired) * 100);

  const TOPIC_FILTERS: { label: string; keywords: string[] }[] = [
    { label: 'Bias', keywords: ['bias', 'prejudice'] },
    { label: 'Allyship', keywords: ['ally', 'allyship', 'speaking up', 'challenging'] },
    { label: 'Communication', keywords: ['communicat', 'language', 'pronoun', 'microaggression'] },
    { label: 'Leadership', keywords: ['leadership', 'leader', 'meeting', 'belonging', 'psychological safety'] },
    { label: 'Identity', keywords: ['intersectionality', 'cultural', 'disability', 'neurodivergent', 'accessible', 'anti-racist'] },
  ];

  const filteredSections = SECTIONS.map(section => ({
    ...section,
    items: section.items.filter(item => {
      const titleLower = item.title.toLowerCase();
      const matchesSearch = !search || titleLower.includes(search.toLowerCase());
      const matchesFilter = !activeFilter || (() => {
        const filter = TOPIC_FILTERS.find(f => f.label === activeFilter);
        return filter ? filter.keywords.some(k => titleLower.includes(k)) : true;
      })();
      return matchesSearch && matchesFilter;
    }),
  })).filter(s => s.items.length > 0);

  const resetMatcher = () => { setMatcherAnswers([]); setMatcherResults(null); };

  const getMatcherResultItems = () => {
    if (!matcherResults) return [];
    return matcherResults.flatMap(id => {
      for (const s of SECTIONS) {
        const item = s.items.find(i => i.id === id);
        if (item) return [{ item, section: s }];
      }
      return [];
    });
  };

  const jumpTo = (id: string) => { const el = document.getElementById(`section-${id}`); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  const primaryBtn = (bg: string): React.CSSProperties => ({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '.35rem', minHeight: '44px', padding: '.5rem 1rem', background: bg, color: 'var(--white)', border: 'none', borderRadius: '8px', fontFamily: 'var(--font-heading)', fontSize: '.85rem', fontWeight: 700, textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap', boxSizing: 'border-box' });
  const quietBtn = (active: boolean, color: string): React.CSSProperties => ({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '.3rem', minHeight: '44px', padding: '.5rem .75rem', background: active ? color : 'var(--white)', color: active ? 'var(--white)' : color, borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}`, borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}`, borderRadius: '8px', fontFamily: 'var(--font-heading)', fontSize: '.8rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', boxSizing: 'border-box' });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--mist)' }}>
      <PlatformNav />

      {/* PHOTO HERO (platform page template, full programme hero) */}
      <header style={{ position: 'relative', minHeight: '500px', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--forest)' }}>
        <img src="/onboarding-hero.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--hero-overlay)' }} />
        <div style={{ position: 'absolute', top: '1.5rem', right: '2rem', zIndex: 2 }}>
          <img src="/logo-short.png" alt="The Inclusion Edit" style={{ height: '96px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '2.25rem 1.5rem 2.75rem', width: '100%', boxSizing: 'border-box' }}>
          <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '.85rem', color: 'var(--white)', textDecoration: 'none', background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 'var(--radius-sm)', padding: '.45rem .9rem', backdropFilter: 'blur(4px)' }}>
            <Icon name="back" size={16} /> Back to dashboard
          </Link>
          <div style={{ marginTop: '1.5rem' }}>
            <span style={{ display: 'inline-block', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '.75rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--white)', border: '1.5px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(4px)', borderRadius: '999px', padding: '.4rem 1rem' }}>
              Impact Platform: Inclusion Foundations
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.4rem, 5.5vw, 3.75rem)', lineHeight: 1.05, color: 'var(--white)', margin: '1rem 0 .75rem', letterSpacing: '-0.01em', maxWidth: '720px' }}>
            <span style={{ color: 'var(--hero-cream)' }}>Start With the</span> <span style={{ color: 'var(--hero-mint)' }}>Foundations.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 2vw, 1.15rem)', lineHeight: 1.7, color: 'var(--white)', maxWidth: '580px', margin: '0 0 1.25rem' }}>
            Twelve short pieces, chosen to build your confidence, knowledge and practice. Work through them at your own pace.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '.95rem', color: 'var(--hero-cream)', marginBottom: '1.75rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.45rem' }}><Icon name="clock" color="var(--hero-cream)" /> Around 3 to 4 hours in total</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.45rem' }}><Icon name="layers" color="var(--hero-cream)" /> {totalRequired} items: {REQUIRED_PER_SECTION} from each section</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.45rem' }}><Icon name="award" color="var(--hero-cream)" /> Certificate on completion</span>
          </div>
          <label htmlFor="cert-name" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '.95rem', color: 'var(--white)', margin: '0 0 .45rem' }}>Your name, as it should appear on your certificate</label>
          <input id="cert-name" type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', maxWidth: '340px', minHeight: '48px', padding: '.75rem 1rem', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.6)', fontSize: '1rem', fontFamily: 'var(--font-body)', boxSizing: 'border-box', color: 'var(--ink)', background: 'var(--white)' }} />
        </div>
      </header>

      {/* PROGRESS STRIP */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--line)', padding: '1.1rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem', fontSize: '.88rem', color: 'var(--slate)' }}>
              <span>Your progress: <strong style={{ color: 'var(--ink)' }}>{totalDone} of {totalRequired}</strong> complete</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--evergreen)' }}>{progressPct}%</span>
            </div>
            <div role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100} aria-label="Programme progress" style={{ height: '8px', background: 'var(--line)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progressPct}%`, background: 'var(--evergreen)', borderRadius: '999px', transition: 'width .4s ease' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
            {SECTIONS.map(s => {
              const count = sectionCount(s.id);
              const done = count >= REQUIRED_PER_SECTION;
              return (
                <button key={s.id} onClick={() => jumpTo(s.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', minHeight: '40px', padding: '.4rem .9rem', borderRadius: '999px', borderTop: `1.5px solid ${s.color}`, borderRight: `1.5px solid ${s.color}`, borderBottom: `1.5px solid ${s.color}`, borderLeft: `1.5px solid ${s.color}`, background: done ? s.color : 'var(--white)', color: done ? 'var(--white)' : s.color, fontSize: '.85rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-heading)' }}>
                  <Icon name={done ? 'check' : s.icon} size={15} color={done ? 'var(--white)' : s.color} /> {s.title} <span style={{ fontWeight: 400 }}>{Math.min(count, REQUIRED_PER_SECTION)}/{REQUIRED_PER_SECTION}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.25rem 1.5rem 0' }}>

        {/* ORIENTATION ROW: NOTE + WHAT THIS IS NOT */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ background: 'var(--white)', borderRadius: '14px', padding: '1.5rem 1.75rem', border: '1.5px solid var(--line)' }}>
            <p style={{ ...label, color: 'var(--evergreen)' }}>A note from The Inclusion Edit</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: 'var(--ink)', margin: '0 0 .6rem', lineHeight: 1.2 }}>Inclusion is a practice, not a policy.</h2>
            <p style={{ fontSize: '.95rem', color: 'var(--ink)', lineHeight: 1.65, margin: 0 }}>We built this programme for the moments that matter: the meeting, the conversation, the decision where the right thing to do is not always obvious. Everything here is practical, honest and ready to use.</p>
            <p style={{ fontSize: '.95rem', color: 'var(--ink)', lineHeight: 1.65, margin: '.75rem 0 0' }}>There is no single right way to be inclusive. Treat this as your starting point, and come back to it whenever you need to.</p>
            <p style={{ fontSize: '.9rem', color: 'var(--evergreen)', fontWeight: 700, margin: '.9rem 0 0', fontFamily: 'var(--font-heading)' }}>The Inclusion Edit</p>
          </div>
          <div style={{ background: 'linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)', borderRadius: '14px', padding: '1.5rem 1.75rem' }}>
            <p style={{ ...label, color: 'var(--hero-cream)' }}>What this programme is not</p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
              {([
                ['Not a box to tick', 'Your certificate reflects real engagement with the material, not just clicking through.'],
                ['Not something to rush', 'There is no deadline. The ideas land better when you give them time.'],
                ['Not a substitute for action', 'Use the reflection prompts to connect what you learn to your own work.'],
                ['Not a one-off', 'Inclusion is ongoing. Return to this content whenever you need a refresher.'],
              ] as [string, string][]).map(([title, desc]) => (
                <li key={title} style={{ display: 'flex', gap: '.75rem', alignItems: 'flex-start' }}>
                  <span style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1.5px solid var(--gold-light)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={13} color="var(--gold-light)" strokeWidth={2} /></span>
                  <div>
                    <p style={{ margin: 0, fontSize: '.92rem', fontWeight: 700, color: 'var(--white)', fontFamily: 'var(--font-heading)' }}>{title}</p>
                    <p style={{ margin: '.15rem 0 0', fontSize: '.88rem', color: 'var(--white)', lineHeight: 1.5 }}>{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CALLOUTS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2.25rem' }}>
          <div style={{ background: 'var(--pale-sage)', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '.85rem' }}>
            <Icon name="message" size={22} color="var(--evergreen)" />
            <p style={{ margin: 0, fontSize: '.92rem', color: 'var(--ink)', lineHeight: 1.6 }}><strong>Reflect as you go.</strong> Every item has a Reflect button with a question to connect it to your own work. Your reflections are private: they are saved on this device and only you can see them.</p>
          </div>
          <div style={{ background: 'var(--coll-blue-tint)', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '.85rem' }}>
            <Icon name="check" size={22} color="var(--coll-blue)" strokeWidth={2} />
            <p style={{ margin: 0, fontSize: '.92rem', color: 'var(--ink)', lineHeight: 1.6 }}><strong>Your progress saves automatically.</strong> Mark each item done when you finish it. Complete four from each section and your certificate unlocks, ready to download and saved to your dashboard.</p>
          </div>
        </div>

        {/* STARTING POINT MATCHER */}
        <section style={{ background: 'var(--white)', borderRadius: '16px', border: '1.5px solid var(--line)', overflow: 'hidden', marginBottom: '2.25rem' }}>
          <div style={{ background: 'linear-gradient(160deg, #3D6142 0%, #2C4A31 60%, #1E3624 100%)', padding: '1.5rem 2rem' }}>
            <p style={{ ...label, color: 'var(--hero-cream)', margin: '0 0 .4rem' }}>Find your starting point</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: 'var(--white)', margin: '0 0 .4rem', lineHeight: 1.2 }}>
              Not sure where to begin? <span style={{ color: 'var(--gold-light)' }}>Find out in 60 seconds.</span>
            </h2>
            <p style={{ color: 'var(--white)', margin: 0, fontSize: '.95rem', lineHeight: 1.6 }}>Answer three quick questions and we will suggest where to start.</p>
          </div>
          <div style={{ padding: '1.5rem 2rem' }}>
            {matcherResults === null ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                {MATCHER_QUESTIONS.map((mq, qi) => (
                  <fieldset key={qi} style={{ border: 'none', margin: 0, padding: 0 }}>
                    <legend style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--ink)', fontWeight: 700, margin: '0 0 .7rem', lineHeight: 1.5, padding: 0 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '50%', background: 'var(--pale-sage)', color: 'var(--evergreen)', fontSize: '.8rem', marginRight: '.6rem' }}>{qi + 1}</span>
                      {mq.q}
                    </legend>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                      {mq.options.map(opt => {
                        const isSelected = matcherAnswers[qi] === opt;
                        return (
                          <button key={opt} aria-pressed={isSelected} onClick={() => {
                            const updated = [...matcherAnswers];
                            updated[qi] = opt;
                            setMatcherAnswers(updated);
                            if (updated.filter(Boolean).length === MATCHER_QUESTIONS.length) {
                              setMatcherResults(computeMatcherResults(updated));
                            }
                          }} style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem', minHeight: '44px', padding: '.5rem 1rem', borderTop: `${isSelected ? 2 : 1.5}px solid ${isSelected ? 'var(--evergreen)' : 'var(--line)'}`, borderRight: `${isSelected ? 2 : 1.5}px solid ${isSelected ? 'var(--evergreen)' : 'var(--line)'}`, borderBottom: `${isSelected ? 2 : 1.5}px solid ${isSelected ? 'var(--evergreen)' : 'var(--line)'}`, borderLeft: `${isSelected ? 2 : 1.5}px solid ${isSelected ? 'var(--evergreen)' : 'var(--line)'}`, borderRadius: '999px', background: isSelected ? 'var(--pale-sage)' : 'var(--white)', color: 'var(--ink)', fontSize: '.9rem', fontFamily: 'var(--font-body)', cursor: 'pointer', fontWeight: isSelected ? 700 : 400 }}>
                            {isSelected && <Icon name="check" size={14} color="var(--evergreen)" strokeWidth={2} />}{opt}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>
            ) : (
              <>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: 'var(--ink)', fontWeight: 700, margin: '0 0 .3rem' }}>Start with these three.</p>
                <p style={{ fontSize: '.92rem', color: 'var(--slate)', margin: '0 0 1.1rem' }}>Matched to your experience and focus. Everything else stays open to you.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '.85rem', marginBottom: '1rem' }}>
                  {getMatcherResultItems().map(({ item, section }) => {
                    const href = ('href' in item) ? (item as { href?: string }).href : undefined;
                    return (
                      <div key={item.id} style={{ background: 'var(--white)', borderRadius: '12px', padding: '1rem', borderTop: `4px solid ${section.color}`, borderRight: `1.5px solid ${section.mid}`, borderBottom: `1.5px solid ${section.mid}`, borderLeft: `1.5px solid ${section.mid}`, display: 'flex', flexDirection: 'column' }}>
                        <p style={{ ...label, fontSize: '.7rem', color: section.color, margin: '0 0 .35rem', display: 'flex', alignItems: 'center', gap: '.35rem' }}><Icon name={section.icon} size={13} color={section.color} /> {section.title}</p>
                        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '.95rem', fontWeight: 700, color: 'var(--ink)', margin: '0 0 .7rem', lineHeight: 1.4, flex: 1 }}>{item.title}</p>
                        {href ? (
                          <a href={href} style={{ fontFamily: 'var(--font-heading)', fontSize: '.85rem', color: 'var(--evergreen)', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '.25rem' }}>Open <Icon name="chevron" size={14} color="var(--evergreen)" /></a>
                        ) : (
                          <span style={{ alignSelf: 'flex-start', fontFamily: 'var(--font-heading)', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink)', background: 'var(--gold)', borderRadius: '999px', padding: '.2rem .6rem' }}>Coming soon</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <button onClick={resetMatcher} style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem', minHeight: '44px', fontFamily: 'var(--font-heading)', fontSize: '.85rem', fontWeight: 700, color: 'var(--evergreen)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <Icon name="back" size={15} color="var(--evergreen)" /> Answer Again
                </button>
              </>
            )}
          </div>
        </section>

        {/* SEARCH + TOPIC FILTERS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '.5rem', marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <span style={{ position: 'absolute', left: '.85rem', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}><Icon name="search" size={17} color="var(--slate)" /></span>
            <input type="search" aria-label="Search the programme" placeholder="Search the programme" value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', minHeight: '44px', padding: '.6rem 1rem .6rem 2.5rem', borderRadius: '8px', border: '1.5px solid var(--line)', fontSize: '.95rem', fontFamily: 'var(--font-body)', background: 'var(--white)', color: 'var(--ink)' }} />
          </div>
          {TOPIC_FILTERS.map(f => {
            const active = activeFilter === f.label;
            return (
              <button key={f.label} aria-pressed={active} onClick={() => setActiveFilter(active ? '' : f.label)} style={{ minHeight: '40px', padding: '.4rem .95rem', borderRadius: '999px', borderTop: `1.5px solid ${active ? 'var(--evergreen)' : 'var(--line)'}`, borderRight: `1.5px solid ${active ? 'var(--evergreen)' : 'var(--line)'}`, borderBottom: `1.5px solid ${active ? 'var(--evergreen)' : 'var(--line)'}`, borderLeft: `1.5px solid ${active ? 'var(--evergreen)' : 'var(--line)'}`, background: active ? 'var(--evergreen)' : 'var(--white)', color: active ? 'var(--white)' : 'var(--ink)', fontSize: '.85rem', fontWeight: 700, fontFamily: 'var(--font-heading)', cursor: 'pointer', whiteSpace: 'nowrap' }}>{f.label}</button>
            );
          })}
          {(search || activeFilter) && (
            <button onClick={() => { setSearch(''); setActiveFilter(''); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', minHeight: '40px', padding: '.4rem .8rem', borderRadius: '999px', border: 'none', background: 'transparent', color: 'var(--slate)', fontSize: '.85rem', fontWeight: 700, fontFamily: 'var(--font-heading)', cursor: 'pointer' }}><Icon name="x" size={14} color="var(--slate)" /> Clear</button>
          )}
        </div>

        {filteredSections.length === 0 && (
          <p style={{ fontSize: '.95rem', color: 'var(--slate)', margin: '0 0 2rem' }}>Nothing matches that search. Try another word, or clear the filters.</p>
        )}

        {/* SECTIONS */}
        {filteredSections.map(section => {
          const count = sectionCount(section.id);
          const done = count >= REQUIRED_PER_SECTION;
          return (
            <section key={section.id} id={`section-${section.id}`} style={{ marginBottom: '2.25rem', scrollMarginTop: '1rem' }}>
              <div style={{ background: section.tint, borderRadius: '12px', borderLeft: `4px solid ${section.color}`, padding: '.95rem 1.4rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.75rem' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: section.color, margin: '0 0 .15rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <Icon name={section.icon} size={22} color={section.color} /> {section.title}
                  </h2>
                  <p style={{ color: 'var(--ink)', margin: 0, fontSize: '.92rem' }}>{section.description}</p>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem', fontFamily: 'var(--font-heading)', fontSize: '.95rem', fontWeight: 700, color: section.color }}>
                  {done && <Icon name="check" size={16} color={section.color} strokeWidth={2} />}{Math.min(count, REQUIRED_PER_SECTION)}/{REQUIRED_PER_SECTION} complete
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                {section.items.map((item, idx) => {
                  const isCompleted = !!completed[item.id];
                  const reflOpen = !!openReflection[item.id];
                  const isComingSoon = item.status === 'coming_soon';
                  const itemHref = ('href' in item) ? (item as { href?: string }).href : undefined;
                  const thumb = ('thumbnailImage' in item) ? (item as { thumbnailImage?: string }).thumbnailImage : undefined;
                  const recommended = ('recommended' in item) && (item as { recommended?: boolean }).recommended;
                  const format = ('format' in item) ? (item as { format?: string }).format : undefined;
                  const itemIcon = ('icon' in item) ? (item as { icon?: string }).icon : undefined;
                  const borderColor = isCompleted ? section.color : section.mid;
                  return (
                    <article key={item.id} style={{ background: 'var(--white)', borderRadius: '12px', overflow: 'hidden', borderTop: `${isCompleted ? 2 : 1.5}px solid ${borderColor}`, borderRight: `${isCompleted ? 2 : 1.5}px solid ${borderColor}`, borderBottom: `${isCompleted ? 2 : 1.5}px solid ${borderColor}`, borderLeft: `${isCompleted ? 2 : 1.5}px solid ${borderColor}`, boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ height: '6px', background: section.color, flexShrink: 0 }} />
                      {section.id === 'read' ? (
                        <div style={{ background: section.tint, padding: '.8rem 1rem', display: 'flex', alignItems: 'center', gap: '.7rem' }}>
                          <span style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={itemIcon || 'clipboard'} size={19} color={section.color} /></span>
                          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: section.color }}>{format || 'Resource'}</span>
                          {isCompleted && <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '.25rem', fontFamily: 'var(--font-heading)', fontSize: '.75rem', fontWeight: 700, color: section.color }}><Icon name="check" size={14} color={section.color} strokeWidth={2} /> Done</span>}
                        </div>
                      ) : (
                        <div style={{ height: '96px', background: section.color, position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
                          {thumb ? (
                            <>
                              <img src={thumb} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--photo-tint)' }} />
                            </>
                          ) : (
                            <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={section.icon} size={30} color="var(--white)" /></span>
                          )}
                          <span style={{ position: 'absolute', top: '8px', left: '8px', background: section.tint, color: section.color, borderRadius: '999px', padding: '.2rem .6rem', fontFamily: 'var(--font-heading)', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' }}>
                            {section.title} {String(idx + 1).padStart(2, '0')}
                          </span>
                          {recommended && (
                            <span style={{ position: 'absolute', top: '8px', right: '8px', background: 'var(--gold)', color: 'var(--ink)', borderRadius: '999px', padding: '.2rem .6rem', fontFamily: 'var(--font-heading)', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.04em' }}>Recommended</span>
                          )}
                          {isCompleted && (
                            <span style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'var(--white)', color: section.color, borderRadius: '999px', padding: '.2rem .6rem', display: 'inline-flex', alignItems: 'center', gap: '.25rem', fontFamily: 'var(--font-heading)', fontSize: '.72rem', fontWeight: 700 }}><Icon name="check" size={13} color={section.color} strokeWidth={2} /> Done</span>
                          )}
                        </div>
                      )}
                      <div style={{ padding: '.9rem 1rem 1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '.98rem', color: 'var(--ink)', margin: '0 0 .3rem', lineHeight: 1.4, fontWeight: 700 }}>{item.title}</h3>
                        {section.id === 'read' && ('desc' in item) && (
                          <p style={{ fontSize: '.88rem', color: 'var(--ink)', margin: '0 0 .5rem', lineHeight: 1.5 }}>{(item as { desc?: string }).desc}</p>
                        )}
                        <p style={{ fontSize: '.85rem', color: 'var(--slate)', margin: '0 0 .85rem', display: 'flex', alignItems: 'center', gap: '.35rem' }}><Icon name="clock" size={14} color="var(--slate)" /> {item.duration}</p>
                        <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.45rem' }}>
                          {isComingSoon ? (
                            <button disabled style={{ ...primaryBtn('var(--line)'), gridColumn: '1 / -1', color: 'var(--slate)', cursor: 'not-allowed' }}>Coming soon</button>
                          ) : itemHref ? (
                            <a href={itemHref} style={{ ...primaryBtn('var(--evergreen)'), gridColumn: '1 / -1' }}>
                              {section.id === 'learn' ? 'Start Lesson' : `Open ${format || 'Resource'}`}
                            </a>
                          ) : null}
                          <button aria-pressed={isCompleted} onClick={() => toggleComplete(item.id)} style={quietBtn(isCompleted, section.color)}>
                            <Icon name={isCompleted ? 'check' : 'circle'} size={14} color={isCompleted ? 'var(--white)' : section.color} strokeWidth={2} /> {isCompleted ? 'Done' : 'Mark Done'}
                          </button>
                          <button aria-expanded={reflOpen} onClick={() => toggleReflection(item.id)} style={quietBtn(false, 'var(--evergreen)')}>
                            <Icon name="message" size={14} color="var(--evergreen)" /> Reflect
                          </button>
                        </div>
                        {reflOpen && <ReflectionBlock itemId={item.id} prompt={item.reflection} reflections={reflections} setReflections={setReflections} />}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* COMPLETION */}
        {allDone && (
          <section style={{ background: 'var(--linen)', borderRadius: '16px', padding: '1.75rem 2rem', marginBottom: '2.25rem', borderTop: '3px solid var(--gold)', borderRight: '1.5px solid var(--line)', borderBottom: '1.5px solid var(--line)', borderLeft: '1.5px solid var(--line)', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--pale-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="award" size={32} color="var(--evergreen)" /></span>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--ink)', margin: '0 0 .3rem' }}>Foundations Complete.</h2>
              <p style={{ color: 'var(--ink)', margin: 0, fontSize: '.95rem', lineHeight: 1.6 }}>Well done: you have finished Inclusion Foundations. Download your certificate now; we save a copy to your dashboard too.</p>
              {!name.trim() && (
                <div style={{ marginTop: '.85rem' }}>
                  <label htmlFor="cert-name-end" style={{ display: 'block', fontSize: '.9rem', color: 'var(--ink)', marginBottom: '.35rem' }}>Add your name so it appears on your certificate</label>
                  <input id="cert-name-end" type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={{ minHeight: '44px', padding: '.6rem .9rem', borderRadius: '8px', border: '1.5px solid var(--line)', fontSize: '1rem', fontFamily: 'var(--font-body)', width: '100%', maxWidth: '300px', boxSizing: 'border-box' }} />
                </div>
              )}
            </div>
            <button onClick={() => generateCertificate(name)} disabled={!name.trim()} style={{ ...primaryBtn(name.trim() ? 'var(--evergreen)' : 'var(--line)'), color: name.trim() ? 'var(--white)' : 'var(--slate)', padding: '.75rem 1.6rem', fontSize: '.95rem', cursor: name.trim() ? 'pointer' : 'not-allowed' }}>
              <Icon name="award" size={17} color={name.trim() ? 'var(--white)' : 'var(--slate)'} /> Download Certificate
            </button>
          </section>
        )}
      </main>

      {/* KEEP GOING */}
      <div style={{ background: 'var(--white)', borderTop: '1px solid var(--line)', marginTop: '1.5rem', padding: '2.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>

            <div style={{ background: 'var(--white)', borderRadius: '14px', padding: '1.5rem 1.75rem', border: '1.5px solid var(--line)' }}>
              <p style={{ ...label, color: 'var(--evergreen)' }}>Keep exploring</p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', margin: '0 0 .5rem' }}>Ready to go further?</h3>
              <p style={{ fontSize: '.95rem', color: 'var(--ink)', lineHeight: 1.6, margin: '0 0 .9rem' }}>When you have finished the foundations, the rest of the platform is ready for you.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.15rem' }}>
                {[
                  { label: 'Explore all courses', href: '/dashboard/learn', icon: 'book' },
                  { label: 'Use the Inclusion AI tools', href: '/dashboard/inclusion-ai', icon: 'sparkle' },
                  { label: 'Read the latest on our blog', href: 'https://theinclusionedit.com/blog', icon: 'link', external: true },
                ].map(link => (
                  <a key={link.label} href={link.href} {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', minHeight: '40px', fontSize: '.95rem', color: 'var(--evergreen)', textDecoration: 'none', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                    <Icon name={link.icon} size={16} color="var(--evergreen)" /> {link.label} <Icon name="chevron" size={14} color="var(--evergreen)" />
                  </a>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--pale-sage)', borderRadius: '14px', padding: '1.5rem 1.75rem' }}>
              <p style={{ ...label, color: 'var(--evergreen)' }}>Your voice matters</p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--ink)', margin: '0 0 .5rem' }}>Help us shape what comes next.</h3>
              <label htmlFor="ob-feedback" style={{ display: 'block', fontSize: '.95rem', color: 'var(--ink)', lineHeight: 1.6, margin: '0 0 .7rem' }}>A topic you would like covered, something that helped, or a thought to share: we read every message.</label>
              <textarea
                id="ob-feedback"
                placeholder="Share a thought or suggest a topic"
                rows={3}
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '.7rem .9rem', borderRadius: '8px', border: '1.5px solid var(--line)', background: 'var(--white)', fontSize: '.95rem', fontFamily: 'var(--font-body)', resize: 'vertical', color: 'var(--ink)', marginBottom: '.75rem' }}
              />
              <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Inclusion Foundations feedback')}&body=${encodeURIComponent(feedback)}`} style={primaryBtn('var(--evergreen)')}>
                <Icon name="message" size={16} color="var(--white)" /> Send Feedback
              </a>
              <p style={{ margin: '.5rem 0 0', fontSize: '.8rem', color: 'var(--slate)' }}>Opens your email, addressed to {SUPPORT_EMAIL}</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1.25rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src="/logo-short.png" alt="The Inclusion Edit" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
              <span style={{ fontSize: '.85rem', color: 'var(--slate)', fontFamily: 'var(--font-body)' }}>Capacity. Capability. Change.</span>
            </div>
            <nav aria-label="The Inclusion Edit website" style={{ display: 'flex', gap: '1.5rem' }}>
              {[['Website', 'https://theinclusionedit.com'], ['Blog', 'https://theinclusionedit.com/blog'], ['Contact', 'https://theinclusionedit.com/contact']].map(([l, h]) => (
                <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ fontSize: '.88rem', color: 'var(--slate)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{l}</a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
