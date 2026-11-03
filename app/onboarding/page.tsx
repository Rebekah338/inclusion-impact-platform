'use client';
import { useState, useEffect } from 'react';

type ItemStatus = 'available' | 'coming_soon';
type CompletedMap = Record<string, boolean>;
type ReflectionMap = Record<string, string>;
type OpenMap = Record<string, boolean>;

const REQUIRED_PER_SECTION = 4;

const SECTIONS = [
  {
    id: 'watch',
    title: 'Watch',
    description: 'Eight training videos. Choose the four that are most relevant to where you are right now.',
    color: '#2A6B3A',
    bg: 'var(--sage-light)',
    thumbnailBg: 'linear-gradient(135deg, #2A6B3A 0%, #4A8F5A 100%)',
    icon: '▶️',
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
    description: 'Eight interactive lessons. Choose the four that speak most to your role and experience.',
    color: '#5a4a7a',
    bg: '#f0eef8',
    thumbnailBg: 'linear-gradient(135deg, #2A6B3A 0%, #4A8F5A 100%)',
    icon: '📖',
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
    description: 'Twelve resources to choose from. Pick four that feel most relevant to you right now.',
    color: '#8a5a28',
    bg: '#fdf3e8',
    thumbnailBg: 'linear-gradient(135deg, #c8c8c8 0%, #e0e0e0 100%)',
    icon: '📄',
    items: [
      { id: 'r2', title: 'How to Be an Ally: A Practical Guide', duration: '12 min read', status: 'available' as ItemStatus, href: '/dashboard/apply/how-to-be-an-ally', icon: '🤝🏾', format: 'Guide', desc: 'Concrete actions and language for showing up as an ally to colleagues with marginalised identities.', reflection: 'Which of the actions in this guide feels most accessible to you right now? What might get in the way?' },
      { id: 'r1', title: 'Recognising Bias', duration: '20 min', status: 'available' as ItemStatus, href: '/dashboard/apply/recognising-bias', icon: '🔍', format: 'Toolkit', desc: 'Exercises and frameworks to help you identify bias in yourself, your team, and your systems.', reflection: 'What type of bias surprised you most to encounter in yourself or others? What can you do with that awareness?' },
      { id: 'r4', title: 'Cultural Competence Reflection', duration: '15 min', status: 'available' as ItemStatus, href: '/dashboard/apply/cultural-competence-reflection', icon: '🪞', format: 'Reflection', desc: 'A structured self-assessment of your awareness, knowledge, and skills in working across cultures.', reflection: 'Where do you feel most confident in cross-cultural situations? Where do you want to grow?' },
      { id: 'r9', title: 'Inclusive Meeting Checklist', duration: '5 min', status: 'available' as ItemStatus, href: '/dashboard/apply/inclusive-meeting-checklist', icon: '✅', format: 'Checklist', desc: 'A quick reference to help you plan and run meetings where everyone can participate fully.', reflection: 'Which checklist item do you most often overlook? What would it take to make it a habit?' },
      { id: 'r10', title: 'Challenging Non-Inclusive Behaviour', duration: '15 min read', status: 'available' as ItemStatus, href: '/dashboard/apply/challenging-non-inclusive-behaviour', icon: '💬', format: 'Guide', desc: 'Practical language and strategies for addressing exclusionary comments and behaviours in the moment.', reflection: 'What has stopped you from speaking up in the past? What phrase or approach from this guide could you try next time?' },
      { id: 's1', title: 'Acknowledging Personal Bias', duration: '20 min', status: 'available' as ItemStatus, href: '/dashboard/apply/acknowledging-personal-bias', icon: '🪞', format: 'Reflection', desc: 'A guided reflection to help you surface and examine the biases you carry into everyday decisions.', reflection: 'What bias did this reflection surface that you find hardest to sit with? What do you want to do with that knowledge?' },
      { id: 's13', title: 'Micro-Affirmation Examples', duration: '10 min', status: 'available' as ItemStatus, href: '/dashboard/apply/micro-affirmation-examples', icon: '💛', format: 'Toolkit', desc: 'A toolkit of small, everyday actions that signal belonging and respect to colleagues.', reflection: 'Which micro-affirmations do you already practise? Which one could you introduce this week?' },
      { id: 'r5', title: 'Inclusive Leadership Reflection', duration: '15 min', status: 'available' as ItemStatus, href: '/dashboard/apply/inclusive-leadership-reflection', icon: '🌿', format: 'Reflection', desc: 'A structured reflection on your leadership style and its impact on team inclusion and belonging.', reflection: 'What aspect of your leadership has the biggest impact on whether your team feels included? What would you like to change?' },
      { id: 'r20', title: 'Intersectionality in Practice', duration: '15 min read', status: 'available' as ItemStatus, href: '/dashboard/apply/intersectionality', icon: '🧩', format: 'Guide', desc: 'A practical guide to understanding how overlapping identities shape workplace experience.', reflection: 'Whose intersecting identities have you not fully considered at work? How might that shape their day-to-day experience?' },
      { id: 's11', title: 'Inclusive Leadership Self-Assessment', duration: '15 min', status: 'available' as ItemStatus, href: '/dashboard/apply/inclusive-leadership-self-assessment', icon: '🌿', format: 'Reflection', desc: 'Assess your inclusive leadership behaviours across key dimensions: voice, visibility, belonging, and accountability.', reflection: 'Which dimension of inclusive leadership feels most underdeveloped for you right now? What is one step you could take?' },
      { id: 'r8', title: 'Supporting Neurodivergent Colleagues', duration: '15 min read', status: 'available' as ItemStatus, href: '/dashboard/apply/neurodivergent-support-guide', icon: '🧠', format: 'Guide', desc: 'Practical guidance for understanding and supporting colleagues who are neurodivergent.', reflection: 'What adjustment to your working practices would make the biggest difference to a neurodivergent colleague?' },
      { id: 'w6', title: 'Accessible Environments Toolkit', duration: 'Reference', status: 'available' as ItemStatus, href: '/dashboard/apply/accessible-environments-toolkit', icon: '♿', format: 'Toolkit', desc: 'A reference toolkit covering physical, digital, and communication accessibility in the workplace.', reflection: 'Which type of accessibility barrier is most present in your working environment? What could you advocate for?' },
    ],
  },
];

function generateCertificate(name: string) {
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Inclusion Foundations Certificate</title><style>@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap');body{margin:0;background:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Inter',sans-serif;}.cert{width:800px;padding:60px;border:3px solid #C9A84C;text-align:center;position:relative;}.cert::before{content:'';position:absolute;inset:8px;border:1px solid #C9A84C;opacity:.4;pointer-events:none;}.logo{font-family:'Playfair Display',serif;font-size:1.1rem;color:#2A6B3A;letter-spacing:.15em;text-transform:uppercase;margin-bottom:2rem;}h1{font-family:'Playfair Display',serif;font-size:2.4rem;color:#1a1a1a;margin:0 0 .5rem;}.sub{font-size:.9rem;color:#666;letter-spacing:.08em;text-transform:uppercase;margin-bottom:2.5rem;}.awarded{font-size:.95rem;color:#555;margin-bottom:.5rem;}.name{font-family:'Playfair Display',serif;font-size:2rem;color:#2A6B3A;margin:.5rem 0 2rem;border-bottom:1px solid #C9A84C;padding-bottom:1rem;display:inline-block;}.desc{font-size:.9rem;color:#555;line-height:1.7;max-width:520px;margin:0 auto 2.5rem;}.date{font-size:.85rem;color:#888;margin-top:2rem;}</style></head><body><div class="cert"><div class="logo">The Inclusion Edit</div><h1>Certificate of Completion</h1><div class="sub">Inclusion Foundations Programme</div><div class="awarded">This certificate is awarded to</div><div class="name">${name}</div><div class="desc">For the successful completion of the Inclusion Foundations Programme, demonstrating commitment to inclusive workplace practice through engagement with video content, interactive lessons and reflective resources.</div><div class="date">Completed: ${date}</div></div></body></html>`;
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const w = window.open(url, '_blank');
  if (w) setTimeout(() => { w.print(); }, 800);
}

function ReflectionBlock({ itemId, prompt, reflections, setReflections }: {
  itemId: string;
  prompt: string;
  reflections: ReflectionMap;
  setReflections: React.Dispatch<React.SetStateAction<ReflectionMap>>;
}) {
  return (
    <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)' }}>
      <p style={{ margin: '0 0 .5rem', fontSize: '.85rem', fontWeight: 600, color: '#444' }}>Reflection</p>
      <p style={{ margin: '0 0 .75rem', fontSize: '.85rem', color: '#555', lineHeight: 1.5 }}>{prompt}</p>
      <textarea
        rows={3}
        placeholder="Type your reflection here..."
        value={reflections[itemId] || ''}
        onChange={e => setReflections(prev => ({ ...prev, [itemId]: e.target.value }))}
        style={{ width: '100%', boxSizing: 'border-box', padding: '.6rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '.85rem', fontFamily: 'var(--font-body)', resize: 'vertical', lineHeight: 1.5 }}
      />
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

  useEffect(() => {
    try {
      const saved = localStorage.getItem('onboarding_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) { setName(parsed.name); }
        if (parsed.completed) setCompleted(parsed.completed);
        if (parsed.reflections) setReflections(parsed.reflections);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('onboarding_state', JSON.stringify({ name, completed, reflections }));
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

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sage-xlight)' }}>

      {/* HERO */}
      <div style={{ position: 'relative', minHeight: '480px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img src="/onboarding-hero.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(30,60,35,0.88) 0%, rgba(42,107,58,0.78) 60%, rgba(30,60,35,0.70) 100%)' }} />
        <div style={{ position: 'absolute', top: '1.75rem', right: '2rem', zIndex: 3 }}>
          <img src="/logo-short.png" alt="The Inclusion Edit" style={{ height: '110px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <div style={{ position: 'absolute', top: '1.5rem', left: '2rem', zIndex: 3 }}>
          <a href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: '.9rem', fontFamily: 'var(--font-body)', fontWeight: 500, background: 'rgba(255,255,255,0.12)', borderRadius: '8px', padding: '.5rem 1rem', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', transition: 'background .2s' }}>← Back to dashboard</a>
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '.75rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.3)', padding: '.3rem .8rem', borderRadius: '20px' }}>The Inclusion Edit: Inclusion Foundations</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#fff', margin: '0 0 1rem', lineHeight: 1.15, maxWidth: '680px' }}>Begin your inclusion journey.</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(.95rem, 2vw, 1.1rem)', lineHeight: 1.7, maxWidth: '560px', margin: '0 0 2rem' }}>Your onboarding programme has been curated to build your confidence, knowledge and practice. Work through each section at your own pace.</p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.9rem', display: 'flex', alignItems: 'center', gap: '.4rem' }}>🕐 Around 3 to 4 hours total</span>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.9rem', display: 'flex', alignItems: 'center', gap: '.4rem' }}>📋 12 items to complete</span>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.9rem', display: 'flex', alignItems: 'center', gap: '.4rem' }}>🏆 Certificate on completion</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', maxWidth: '480px' }}>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.9rem', margin: 0 }}>Enter your name below; it will appear on your certificate when you complete the programme.</p>
            <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={{ padding: '.875rem 1rem', borderRadius: '8px', border: 'none', fontSize: '1rem', fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box', maxWidth: '320px' }} />
          </div>
        </div>
      </div>

      <>
          {/* PROGRESS BAR */}
          <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--gray-border)', padding: '1.25rem 1.5rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem', fontSize: '.82rem', color: '#666' }}>
                    <span>Your progress: {totalDone} of {totalRequired} items complete</span>
                    <span style={{ fontWeight: 700, color: '#2A6B3A' }}>{progressPct}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--gray-border)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(90deg, #2A6B3A, #4A8F5A)', borderRadius: '4px', transition: 'width .4s ease' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
                  {SECTIONS.map(s => {
                    const count = sectionCount(s.id);
                    const done = count >= REQUIRED_PER_SECTION;
                    return (
                      <button key={s.id} onClick={() => { const el = document.getElementById(`section-${s.id}`); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} style={{ display: 'flex', alignItems: 'center', gap: '.35rem', padding: '.35rem .8rem', borderRadius: '20px', border: `1.5px solid ${s.color}`, background: done ? s.color : 'transparent', color: done ? '#fff' : s.color, fontSize: '.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                        {s.icon} {s.title} {done ? '✓' : `${count}/${REQUIRED_PER_SECTION}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem 0' }}>

            {/* WELCOME + WHAT THIS IS NOT */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'var(--white)', borderRadius: '14px', padding: '1.75rem', border: '1px solid var(--gray-border)' }}>
                <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#2A6B3A', margin: '0 0 .75rem' }}>A note from The Inclusion Edit</p>
                <p style={{ fontSize: '.95rem', color: '#444', lineHeight: 1.75, margin: 0 }}>This programme was built because we believe inclusion is a practice, not a policy. Everything here is designed to be practical, honest, and genuinely useful in the moments that matter most: when you are in a meeting, a conversation, or a situation where doing the right thing is not always obvious.</p>
                <p style={{ fontSize: '.95rem', color: '#444', lineHeight: 1.75, margin: '1rem 0 0' }}>There is no single right way to be inclusive. This is a starting point, not a destination. We hope it serves you well.</p>
                <p style={{ fontSize: '.9rem', color: '#2A6B3A', fontWeight: 600, margin: '1.25rem 0 0', fontFamily: 'var(--font-heading)' }}>The Inclusion Edit</p>
              </div>
              <div style={{ background: '#1e3c23', borderRadius: '14px', padding: '1.75rem' }}>
                <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', margin: '0 0 .75rem' }}>What this programme is not</p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
                  {([
                    ['Not just a box to tick', 'The certificate you earn here reflects genuine engagement with the material, not just completion.'],
                    ['Not something to rush', 'There is no deadline and no race to the finish. The insights land better when you take your time with them.'],
                    ['Not a substitute for action', 'Use the reflection prompts to connect what you learn to your actual work.'],
                    ['Not a one-time event', 'Inclusion is ongoing. Return to this content whenever you need a reminder or a refresh.'],
                  ] as [string, string][]).map(([title, desc]) => (
                    <li key={title} style={{ display: 'flex', gap: '.75rem', alignItems: 'flex-start' }}>
                      <span style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1.5px solid #C9A84C', flexShrink: 0, marginTop: '.15rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', color: '#C9A84C' }}>✕</span>
                      <div>
                        <p style={{ margin: 0, fontSize: '.88rem', fontWeight: 600, color: '#fff' }}>{title}</p>
                        <p style={{ margin: '.2rem 0 0', fontSize: '.82rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* REFLECTION TIP + MANAGER NOTE */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ background: '#fffbf0', border: '1px solid #f0e0b0', borderRadius: '10px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '.1rem' }}>💭</span>
                <p style={{ margin: 0, fontSize: '.88rem', color: '#7a5a1a', lineHeight: 1.6 }}><strong>Reflection prompts:</strong> Look for the 💭 button on each card. Every piece of content has a personal reflection question to help you connect it to your own work. Your manager will not see these; they are for you.</p>
              </div>
              <div style={{ background: '#f0f4ff', border: '1px solid #c8d4f0', borderRadius: '10px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '.1rem' }}>👁</span>
                <p style={{ margin: 0, fontSize: '.88rem', color: '#3a4a7a', lineHeight: 1.6 }}><strong>Visibility:</strong> Your manager can see which items you have marked as complete and your overall progress percentage. Your written reflections are private and visible to you only.</p>
              </div>
            </div>

            {/* AI STARTING POINT MATCHER */}
            <div style={{ background: 'var(--white)', borderRadius: '16px', border: '1px solid var(--gray-border)', overflow: 'hidden', marginBottom: '2.5rem', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
              <div style={{ background: 'linear-gradient(135deg, #1e3c23 0%, #2A6B3A 100%)', padding: '2rem 2.5rem' }}>
                <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', margin: '0 0 .5rem' }}>Find your starting point</p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: '#fff', margin: '0 0 .5rem', lineHeight: 1.2 }}>
                  Not sure where to begin? <span style={{ color: '#C9A84C' }}>Find out in 60 seconds.</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.75)', margin: 0, fontSize: '.95rem', lineHeight: 1.6 }}>Answer three quick questions and we will suggest where to start based on your experience and focus.</p>
              </div>
              <div style={{ padding: '2rem 2.5rem' }}>
                {matcherResults === null ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {MATCHER_QUESTIONS.map((mq, qi) => (
                      <div key={qi}>
                        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '.98rem', color: 'var(--charcoal)', fontWeight: 600, margin: '0 0 .85rem', lineHeight: 1.5 }}>
                          <span style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#2A6B3A', background: 'rgba(42,107,58,0.1)', borderRadius: '4px', padding: '.1rem .45rem', marginRight: '.6rem', verticalAlign: 'middle' }}>Q{qi + 1}</span>
                          {mq.q}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                          {mq.options.map(opt => {
                            const isSelected = matcherAnswers[qi] === opt;
                            return (
                              <button key={opt} onClick={() => {
                                const updated = [...matcherAnswers];
                                updated[qi] = opt;
                                setMatcherAnswers(updated);
                                if (updated.filter(Boolean).length === MATCHER_QUESTIONS.length) {
                                  setMatcherResults(computeMatcherResults(updated));
                                }
                              }} style={{ padding: '.5rem 1rem', border: isSelected ? '2px solid #2A6B3A' : '1.5px solid var(--gray-border)', borderRadius: '20px', background: isSelected ? 'rgba(42,107,58,0.07)' : 'var(--white)', color: isSelected ? '#2A6B3A' : 'var(--charcoal)', fontSize: '.85rem', fontFamily: 'var(--font-body)', cursor: 'pointer', fontWeight: isSelected ? 600 : 400, transition: 'all .15s', whiteSpace: 'nowrap' }}>{opt}</button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: '#2A6B3A', fontWeight: 700, margin: '0 0 .4rem' }}>Based on your answers, we suggest starting here:</p>
                    <p style={{ fontSize: '.85rem', color: '#666', margin: '0 0 1.5rem' }}>These three items are matched to your experience and focus area. You can still explore everything; these are just your on-ramp.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                      {getMatcherResultItems().map(({ item, section }) => (
                        <div key={item.id} style={{ background: 'var(--sage-xlight)', borderRadius: '10px', padding: '1rem', border: `1.5px solid ${section.color}30` }}>
                          <p style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: section.color, margin: '0 0 .4rem' }}>{section.title}</p>
                          <p style={{ fontSize: '.88rem', fontWeight: 600, color: 'var(--charcoal)', margin: '0 0 .75rem', lineHeight: 1.45 }}>{item.title}</p>
                          {('href' in item) && (item as { href?: string }).href && (
                            <a href={(item as { href?: string }).href} style={{ fontSize: '.8rem', color: section.color, fontWeight: 600, textDecoration: 'none' }}>Open →</a>
                          )}
                        </div>
                      ))}
                    </div>
                    <button onClick={resetMatcher} style={{ fontSize: '.82rem', color: '#999', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-body)', textDecoration: 'underline' }}>Retake the quiz</button>
                  </>
                )}
              </div>
            </div>

            {/* SEARCH + TOPIC FILTERS */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '.6rem' }}>
                <input type="text" placeholder="Search content..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '400px', boxSizing: 'border-box', padding: '.6rem 1rem', borderRadius: '8px', border: '1.5px solid var(--gray-border)', fontSize: '.9rem', fontFamily: 'var(--font-body)', background: 'var(--white)', outline: 'none' }} />
                {TOPIC_FILTERS.map(f => {
                  const active = activeFilter === f.label;
                  return (
                    <button key={f.label} onClick={() => setActiveFilter(active ? '' : f.label)} style={{ padding: '.45rem .9rem', borderRadius: '20px', border: active ? '2px solid #2A6B3A' : '1.5px solid var(--gray-border)', background: active ? 'rgba(42,107,58,0.08)' : 'var(--white)', color: active ? '#2A6B3A' : '#555', fontSize: '.82rem', fontWeight: active ? 700 : 400, fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all .15s', whiteSpace: 'nowrap' }}>{f.label}</button>
                  );
                })}
                {(search || activeFilter) && (
                  <button onClick={() => { setSearch(''); setActiveFilter(''); }} style={{ padding: '.45rem .75rem', borderRadius: '20px', border: '1.5px solid #e8e8e8', background: 'transparent', color: '#aaa', fontSize: '.8rem', fontFamily: 'var(--font-body)', cursor: 'pointer' }}>Clear ✕</button>
                )}
              </div>
            </div>

            {/* SECTIONS GRID */}
            {filteredSections.map(section => {
              const count = sectionCount(section.id);
              const done = count >= REQUIRED_PER_SECTION;
              return (
                <div key={section.id} id={`section-${section.id}`} style={{ marginBottom: '2.5rem' }}>
                  <div style={{ background: section.bg, borderRadius: '12px', borderLeft: `4px solid ${section.color}`, padding: '1.25rem 1.5rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: section.color, margin: '0 0 .25rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                        {section.icon} {section.title}
                        {done && <span style={{ fontSize: '.8rem', background: section.color, color: '#fff', padding: '.15rem .5rem', borderRadius: '10px' }}>Complete</span>}
                      </h2>
                      <p style={{ color: '#666', margin: 0, fontSize: '.9rem' }}>{section.description}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: section.color }}>{Math.min(count, REQUIRED_PER_SECTION)}/{REQUIRED_PER_SECTION}</div>
                      <div style={{ fontSize: '.8rem', color: '#888' }}>complete</div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                    {section.items.map((item, idx) => {
                      const isCompleted = !!completed[item.id];
                      const reflOpen = !!openReflection[item.id];
                      const isComingSoon = item.status === 'coming_soon';
                      const itemHref = ('href' in item) ? (item as { href?: string }).href : undefined;
                      return (
                        <div key={item.id} style={{ background: 'var(--white)', borderRadius: '12px', overflow: 'hidden', border: isCompleted ? `2px solid ${section.color}` : '1.5px solid #e8e8e8', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }}>
                          {section.id !== 'read' && (
                            <div style={{ height: '80px', background: section.thumbnailBg, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                              {('thumbnailImage' in item && (item as { thumbnailImage?: string }).thumbnailImage) ? (
                                <img src={(item as { thumbnailImage?: string }).thumbnailImage} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                              ) : (
                                <span style={{ fontSize: '1.6rem', opacity: .65 }}>{section.icon}</span>
                              )}
                              <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(255,255,255,0.18)', color: '#fff', borderRadius: '4px', padding: '.15rem .45rem', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.03em' }}>
                                {section.title.toUpperCase()} {idx + 1}
                              </div>
                              {('recommended' in item && (item as { recommended?: boolean }).recommended) && (
                                <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#C9A84C', color: '#fff', borderRadius: '4px', padding: '.15rem .45rem', fontSize: '.65rem', fontWeight: 700, letterSpacing: '.05em' }}>
                                  Recommended
                                </div>
                              )}
                              {isCompleted && (
                                <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: '#fff', color: section.color, borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.8rem', fontWeight: 700 }}>✓</div>
                              )}
                            </div>
                          )}
                          {section.id === 'read' ? (
                            <div style={{ padding: '1rem 1.1rem 1.1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.65rem', marginBottom: '.6rem' }}>
                                <span style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0 }}>{('icon' in item) ? (item as { icon?: string }).icon : '📄'}</span>
                                <div style={{ flex: 1 }}>
                                  <span style={{ display: 'inline-block', fontSize: '.65rem', fontWeight: 700, letterSpacing: '.06em', color: section.color, background: `${section.color}18`, borderRadius: '4px', padding: '.1rem .45rem', marginBottom: '.35rem', textTransform: 'uppercase' }}>
                                    {('format' in item) ? (item as { format?: string }).format : 'Resource'}
                                  </span>
                                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '.92rem', color: 'var(--charcoal)', margin: 0, lineHeight: 1.4, fontWeight: 600 }}>{item.title}</h3>
                                </div>
                              </div>
                              <p style={{ fontSize: '.8rem', color: '#666', margin: '0 0 .75rem', lineHeight: 1.5, flex: 1 }}>{('desc' in item) ? (item as { desc?: string }).desc : ''}</p>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.5rem', marginTop: 'auto' }}>
                                <span style={{ fontSize: '.75rem', color: '#999' }}>🕐 {item.duration}</span>
                                <div style={{ display: 'flex', gap: '.4rem', alignItems: 'center' }}>
                                  {itemHref && (
                                    <a href={itemHref} style={{ padding: '.45rem .85rem', background: section.color, color: '#fff', borderRadius: '6px', fontSize: '.78rem', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                                      Open {('format' in item) ? (item as { format?: string }).format : 'Resource'} →
                                    </a>
                                  )}
                                  <button onClick={() => toggleComplete(item.id)} style={{ padding: '.45rem .6rem', background: isCompleted ? section.color : '#f5f5f5', color: isCompleted ? '#fff' : '#666', border: 'none', borderRadius: '6px', fontSize: '.78rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                                    {isCompleted ? '✓' : '○'}
                                  </button>
                                  <button onClick={() => toggleReflection(item.id)} style={{ padding: '.45rem .5rem', background: 'transparent', color: '#aaa', border: '1.5px solid #e8e8e8', borderRadius: '6px', fontSize: '.78rem', cursor: 'pointer', fontFamily: 'var(--font-body)', lineHeight: 1 }} title="Reflection prompt">💭</button>
                                </div>
                              </div>
                              {reflOpen && <ReflectionBlock itemId={item.id} prompt={item.reflection} reflections={reflections} setReflections={setReflections} />}
                            </div>
                          ) : (
                            <div style={{ padding: '1rem 1.1rem 1.1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '.95rem', color: 'var(--charcoal)', margin: '0 0 .35rem', lineHeight: 1.45, fontWeight: 600 }}>{item.title}</h3>
                              <p style={{ fontSize: '.8rem', color: '#999', margin: '0 0 .9rem' }}>🕐 {item.duration}</p>
                              <div style={{ marginTop: 'auto', display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                                {isComingSoon ? (
                                  <button disabled style={{ flex: 1, padding: '.55rem', background: '#f0f0f0', color: '#aaa', border: 'none', borderRadius: '6px', fontSize: '.8rem', fontWeight: 600, cursor: 'not-allowed', fontFamily: 'var(--font-body)' }}>▶ Coming Soon</button>
                                ) : itemHref ? (
                                  <a href={itemHref} style={{ flex: 1, padding: '.55rem', background: section.color, color: '#fff', borderRadius: '6px', fontSize: '.8rem', fontWeight: 600, textAlign: 'center', textDecoration: 'none', display: 'block' }}>
                                    {section.id === 'learn' ? 'Start Lesson' : 'Open Resource'}
                                  </a>
                                ) : null}
                                <button onClick={() => toggleComplete(item.id)} style={{ padding: '.55rem .75rem', background: isCompleted ? section.color : '#f5f5f5', color: isCompleted ? '#fff' : '#666', border: 'none', borderRadius: '6px', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                                  {isCompleted ? '✓ Done' : 'Mark Done'}
                                </button>
                                <button onClick={() => toggleReflection(item.id)} style={{ padding: '.55rem .65rem', background: 'transparent', color: '#aaa', border: '1.5px solid #e8e8e8', borderRadius: '6px', fontSize: '.8rem', cursor: 'pointer', fontFamily: 'var(--font-body)', lineHeight: 1 }} title="Reflection prompt">💭</button>
                              </div>
                              {reflOpen && <ReflectionBlock itemId={item.id} prompt={item.reflection} reflections={reflections} setReflections={setReflections} />}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {allDone && (
            <div style={{ maxWidth: '1200px', margin: '0 auto 3rem', padding: '0 1.5rem' }}>
              <div style={{ background: 'var(--white)', borderRadius: '16px', padding: '2rem', textAlign: 'center', border: '2px solid #C9A84C', boxShadow: '0 4px 24px rgba(201,168,76,0.15)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
                <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)', marginBottom: '.5rem' }}>Foundations Complete</h2>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>You have completed your Inclusion Foundations programme. Download your certificate below.</p>
                {!name.trim() && (
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ color: '#666', fontSize: '.9rem', marginBottom: '.5rem' }}>Please enter your name so it appears on your certificate:</p>
                    <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={{ padding: '.75rem 1rem', borderRadius: '8px', border: '1px solid var(--gray-border)', fontSize: '1rem', fontFamily: 'var(--font-body)', outline: 'none', width: '280px', boxSizing: 'border-box' }} />
                  </div>
                )}
                <button onClick={() => generateCertificate(name)} disabled={!name.trim()} style={{ padding: '.875rem 2rem', background: name.trim() ? '#C9A84C' : '#ccc', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 700, cursor: name.trim() ? 'pointer' : 'default', fontFamily: 'var(--font-body)' }}>Download Certificate</button>
              </div>
            </div>
          )}
      </>

          {/* FOOTER */}
          <div style={{ background: 'linear-gradient(180deg, var(--sage-xlight) 0%, #f0ede6 100%)', marginTop: '4rem', padding: '3.5rem 1.5rem 2.5rem', borderTop: '1px solid var(--gray-border)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

              {/* Two boxes */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>

                {/* Box 1: Go deeper */}
                <div style={{ background: 'linear-gradient(135deg, rgba(42,107,58,0.07) 0%, rgba(30,60,35,0.04) 100%)', borderRadius: '16px', padding: '2rem', border: '1.5px solid rgba(42,107,58,0.45)', boxShadow: '0 6px 24px rgba(30,60,35,0.15), 0 1px 4px rgba(0,0,0,0.08)' }}>
                  <p style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#2A6B3A', margin: '0 0 .75rem' }}>Keep exploring</p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--charcoal)', margin: '0 0 .75rem' }}>Curious to go further?</h3>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, margin: '0 0 1.5rem' }}>The Inclusion Edit publishes research, insights and practical tools to help you keep building. Browse the latest thinking on our website.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem', marginBottom: '1.5rem' }}>
                    {[
                      { label: 'Why Inclusion Training Fails', href: 'https://theinclusionedit.com/blog' },
                      { label: 'The Business Case for Belonging', href: 'https://theinclusionedit.com/blog' },
                      { label: 'Allyship in Practice: A Research Summary', href: 'https://theinclusionedit.com/blog' },
                    ].map(link => (
                      <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.875rem', color: '#2A6B3A', textDecoration: 'none', fontWeight: 500 }}>
                        <span style={{ fontSize: '.7rem' }}>→</span>{link.label}
                      </a>
                    ))}
                  </div>
                  <a href="https://theinclusionedit.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '.6rem 1.25rem', background: '#2A6B3A', color: '#fff', borderRadius: '8px', fontSize: '.875rem', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>Visit our website</a>
                </div>

                {/* Box 2: Feedback */}
                <div style={{ background: 'linear-gradient(135deg, rgba(42,107,58,0.07) 0%, rgba(30,60,35,0.04) 100%)', borderRadius: '16px', padding: '2rem', border: '1.5px solid rgba(42,107,58,0.45)', boxShadow: '0 6px 24px rgba(30,60,35,0.15), 0 1px 4px rgba(0,0,0,0.08)' }}>
                  <p style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#5a4a7a', margin: '0 0 .75rem' }}>Your voice matters</p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--charcoal)', margin: '0 0 .75rem' }}>Help us shape what comes next</h3>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, margin: '0 0 1.25rem' }}>Is there a topic you would like to see covered, something you found particularly useful, or a thought you want to share? We read every response.</p>
                  <textarea
                    placeholder="Share a thought, suggest a topic, or tell us what landed..."
                    rows={4}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '.75rem 1rem', borderRadius: '8px', border: '1.5px solid var(--gray-border)', fontSize: '.875rem', fontFamily: 'var(--font-body)', resize: 'vertical', outline: 'none', color: 'var(--charcoal)', marginBottom: '1rem' }}
                  />
                  <button style={{ padding: '.6rem 1.25rem', background: '#5a4a7a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Send feedback</button>
                </div>

              </div>

              {/* Footer strip */}
              <div style={{ borderTop: '1px solid var(--gray-border)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src="/logo-short.png" alt="The Inclusion Edit" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
                  <span style={{ fontSize: '.8rem', color: '#999', fontFamily: 'var(--font-body)' }}>Capacity. Capability. Change.</span>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <a href="https://theinclusionedit.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.8rem', color: '#666', textDecoration: 'none' }}>Website</a>
                  <a href="https://theinclusionedit.com/blog" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.8rem', color: '#666', textDecoration: 'none' }}>Blog</a>
                  <a href="https://theinclusionedit.com/contact" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.8rem', color: '#666', textDecoration: 'none' }}>Contact</a>
                </div>
              </div>

            </div>
          </div>

    </div>
  );
}
