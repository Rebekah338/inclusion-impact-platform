"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Demo module content — replaced per module when PDFs are uploaded
const demoModule = {
  id: "psychological-safety",
  title: "Psychological Safety",
  pathway: "People & Culture",
  cpd: "0.75 hrs",
  duration: "45 min",
  nextModule: { id: "belonging", title: "Belonging at Work" },
  lessons: [
    {
      id: "lesson-1",
      title: "What is Psychological Safety?",
      slides: [
        {
          id: "s1",
          type: "text" as const,
          heading: "What is Psychological Safety?",
          body: "Psychological safety is the belief that you won't be punished or humiliated for speaking up with ideas, questions, concerns, or mistakes. It was identified by Harvard professor Amy Edmondson as the single biggest predictor of high-performing teams.",
          image: null,
        },
        {
          id: "s2",
          type: "scenario" as const,
          heading: "Real-world scenario",
          scenario: "Marcus has noticed a pattern in his team meetings — the same three people always speak, and the rest stay quiet. A junior colleague, Priya, started to raise a concern last week but stopped mid-sentence when the team lead glanced at his watch. Marcus wonders: is this a psychological safety issue?",
          question: "What might this tell us about the team's psychological safety?",
          body: "This is a classic sign of low psychological safety. When people self-censor — especially junior team members — it's often because they've learned, through subtle signals, that speaking up carries social risk.",
        },
        {
          id: "s3",
          type: "text" as const,
          heading: "The four stages of psychological safety",
          body: "Timothy Clark identified four progressive stages: (1) Inclusion Safety — feeling safe to belong, (2) Learner Safety — safe to ask questions and make mistakes, (3) Contributor Safety — safe to use your skills and make a difference, (4) Challenger Safety — safe to challenge the status quo.",
          image: null,
        },
      ],
      quiz: [
        {
          id: "q1",
          question: "Which researcher first identified psychological safety as a predictor of team performance?",
          options: ["Timothy Clark", "Amy Edmondson", "Brené Brown", "Daniel Goleman"],
          correct: 1,
          explanation: "Amy Edmondson, Professor at Harvard Business School, coined the term and established its link to team performance through her research in the 1990s.",
        },
        {
          id: "q2",
          question: "Which of the following is a sign of LOW psychological safety?",
          options: [
            "Team members ask questions openly",
            "People admit mistakes without fear",
            "A junior employee stops speaking mid-sentence when the manager looks away",
            "Disagreements are raised and discussed",
          ],
          correct: 2,
          explanation: "Self-censoring — especially by junior team members — is one of the clearest signs that people don't feel safe to speak up. The other options are signs of HIGH psychological safety.",
        },
      ],
    },
    {
      id: "lesson-2",
      title: "Building Psychological Safety as a Leader",
      slides: [
        {
          id: "s4",
          type: "text" as const,
          heading: "The leader's role",
          body: "Psychological safety starts at the top. Leaders set the tone — consciously or not. Research shows that how a leader responds to the first person who raises a difficult issue sets the expectation for everyone else.",
          image: null,
        },
        {
          id: "s5",
          type: "scenario" as const,
          heading: "Real-world scenario",
          scenario: "Adeola is a team leader who has started saying 'What am I missing?' at the end of every team meeting. Within three weeks, two people who never spoke in meetings have started contributing ideas. Her colleague asks what changed.",
          question: "Why might this simple question have such a big impact?",
          body: "Asking 'What am I missing?' signals intellectual humility and genuine curiosity. It communicates that the leader doesn't have all the answers — and that it's safe to fill in the gaps. Small, consistent signals like this build psychological safety over time.",
        },
        {
          id: "s6",
          type: "text" as const,
          heading: "Practical actions for leaders",
          body: "1. Model vulnerability — share your own mistakes openly. 2. Ask before telling — 'What do you think?' before 'Here's what I think.' 3. Respond to concerns with curiosity, not defensiveness. 4. Create structured opportunities to speak (e.g. round-robins, anonymous input). 5. Follow up — when someone speaks up, acknowledge it publicly.",
          image: null,
        },
      ],
      quiz: [
        {
          id: "q3",
          question: "What does 'modelling vulnerability' look like in practice?",
          options: [
            "Sharing personal struggles unrelated to work",
            "Openly acknowledging your own mistakes and uncertainties at work",
            "Avoiding giving critical feedback",
            "Asking junior staff to solve senior-level problems",
          ],
          correct: 1,
          explanation: "Modelling vulnerability means being open about your own mistakes, gaps in knowledge, and uncertainties in a work context. This signals to others that it's safe for them to do the same.",
        },
      ],
    },
  ],
  finalQuiz: [
    {
      id: "fq1",
      question: "Psychological safety is most accurately described as:",
      options: [
        "Feeling emotionally comfortable at all times",
        "The belief that you won't be punished for speaking up",
        "Having no conflict in a team",
        "Being liked by your colleagues",
      ],
      correct: 1,
      explanation: "Psychological safety is specifically about the belief that interpersonal risk-taking — asking questions, raising concerns, admitting mistakes — won't result in punishment or humiliation.",
    },
    {
      id: "fq2",
      question: "Which stage of Timothy Clark's model involves feeling safe to challenge the status quo?",
      options: ["Inclusion Safety", "Learner Safety", "Contributor Safety", "Challenger Safety"],
      correct: 3,
      explanation: "Challenger Safety is the fourth and most advanced stage — it's where people feel safe to question existing processes, raise difficult issues, and propose change.",
    },
    {
      id: "fq3",
      question: "A team member stays silent in meetings even though they have relevant expertise. The most likely cause is:",
      options: [
        "They don't care about the outcomes",
        "They have low psychological safety",
        "They need more training",
        "They are naturally introverted",
      ],
      correct: 1,
      explanation: "Silence from competent team members is a classic indicator of low psychological safety — not lack of expertise or engagement. Introversion alone doesn't prevent people from contributing when they feel safe.",
    },
    {
      id: "fq4",
      question: "Which action most effectively builds psychological safety as a leader?",
      options: [
        "Telling the team there will be no consequences for mistakes",
        "Consistently responding to concerns with curiosity rather than defensiveness",
        "Reducing the number of team meetings",
        "Praising only the highest-performing team members",
      ],
      correct: 1,
      explanation: "Consistent behaviour matters far more than one-off declarations. When leaders repeatedly respond to concerns with genuine curiosity, people learn through experience that it's safe to speak up.",
    },
    {
      id: "fq5",
      question: "What is the most important thing a leader can do after someone speaks up with a concern?",
      options: [
        "Investigate it privately",
        "Acknowledge it — ideally publicly — and follow up",
        "Thank them in a private email",
        "Add it to the next meeting agenda",
      ],
      correct: 1,
      explanation: "Public acknowledgement signals to the whole team that speaking up is valued and safe. Following up shows that voices are actually heard — not just noted and forgotten.",
    },
    {
      id: "fq6",
      question: "Psychological safety is the same as being nice to your colleagues.",
      options: ["True", "False"],
      correct: 1,
      explanation: "False. Psychological safety is about the conditions for candour and risk-taking, not niceness. A team can be pleasant but still have low psychological safety — and sometimes high psychological safety involves productive challenge and difficult conversations.",
    },
  ],
  keyLearnings: [
    "Psychological safety is the belief that speaking up won't result in punishment or humiliation",
    "Amy Edmondson identified it as the single biggest predictor of team performance",
    "There are four stages: Inclusion, Learner, Contributor, and Challenger Safety",
    "Leaders set the tone — small, consistent signals matter most",
    "Self-censoring from team members is a key warning sign",
    "Responding to concerns with curiosity (not defensiveness) is one of the most powerful things a leader can do",
  ],
};

type SlideType = { id: string; type: "text" | "scenario"; heading: string; body: string; image?: null; scenario?: string; question?: string };
type QuizQuestion = { id: string; question: string; options: string[]; correct: number; explanation: string };

export default function ModulePage() {
  const [phase, setPhase] = useState<"lesson" | "lesson-quiz" | "final-quiz" | "certificate" | "summary">("lesson");
  const [lessonIdx, setLessonIdx] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [finalAnswers, setFinalAnswers] = useState<Record<string, number | null>>({});
  const [finalSubmitted, setFinalSubmitted] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const module = demoModule;
  const currentLesson = module.lessons[lessonIdx];
  const currentSlide: SlideType = currentLesson?.slides[slideIdx];
  const lessonQuiz = currentLesson?.quiz || [];

  // Total slides for progress calculation
  const totalSlides = module.lessons.reduce((acc, l) => acc + l.slides.length, 0);
  const completedSlides = module.lessons.slice(0, lessonIdx).reduce((acc, l) => acc + l.slides.length, 0) + slideIdx;
  const overallProgress = Math.round((completedSlides / totalSlides) * 80); // 80% for lessons, 20% for final quiz

  // Text to speech
  const speak = (text: string) => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    u.onend = () => setSpeaking(false);
    utteranceRef.current = u;
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  };

  const getSpeakText = () => {
    if (phase === "lesson" && currentSlide) {
      const parts = [currentSlide.heading];
      if (currentSlide.type === "scenario" && currentSlide.scenario) parts.push("Scenario: " + currentSlide.scenario);
      if (currentSlide.type === "scenario" && currentSlide.question) parts.push("Reflection question: " + currentSlide.question);
      parts.push(currentSlide.body);
      return parts.join(". ");
    }
    return "";
  };

  const allLessonQuestionsAnswered = lessonQuiz.every((q) => quizSubmitted[q.id]);
  const allLessonQuestionsCorrect = lessonQuiz.every((q) => quizAnswers[q.id] === q.correct);

  const nextSlide = () => {
    stopSpeaking();
    if (slideIdx < currentLesson.slides.length - 1) {
      setSlideIdx(slideIdx + 1);
    } else {
      // Move to lesson quiz
      setPhase("lesson-quiz");
    }
  };

  const finishLessonQuiz = () => {
    if (lessonIdx < module.lessons.length - 1) {
      setLessonIdx(lessonIdx + 1);
      setSlideIdx(0);
      setPhase("lesson");
    } else {
      setPhase("final-quiz");
    }
  };

  const finalScore = module.finalQuiz.filter((q) => finalAnswers[q.id] === q.correct).length;
  const finalPassed = finalSubmitted && finalScore >= Math.ceil(module.finalQuiz.length * 0.7);

  // Clean up speech on unmount
  useEffect(() => () => { window.speechSynthesis?.cancel(); }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>

      {/* Top bar */}
      <nav style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/dashboard/learn" style={{ fontSize: "0.875rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)", textDecoration: "none" }}>
          ← All modules
        </Link>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)" }}>
          {module.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span className="badge badge-sage" style={{ fontSize: "0.65rem" }}>{module.cpd} CPD</span>
        </div>
      </nav>

      {/* Progress bar */}
      <div style={{ background: "var(--white)", padding: "0.75rem 1.5rem", borderBottom: "1px solid var(--gray-border)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
            <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)" }}>
              {phase === "certificate" || phase === "summary" ? "Complete" : `Lesson ${lessonIdx + 1} of ${module.lessons.length}`}
            </span>
            <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-heading)", color: "var(--sage-dark)", fontWeight: 600 }}>
              {phase === "certificate" || phase === "summary" ? "100%" : `${overallProgress}%`}
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: phase === "certificate" || phase === "summary" ? "100%" : `${overallProgress}%` }} />
          </div>
        </div>
      </div>

      <main id="main-content" style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>

        {/* ===== LESSON SLIDES ===== */}
        {phase === "lesson" && currentSlide && (
          <div>
            {/* Lesson header */}
            <div style={{ marginBottom: "1.5rem" }}>
              <span className="badge badge-sage" style={{ marginBottom: "0.625rem" }}>{currentLesson.title}</span>
              <div style={{ fontSize: "0.8rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>
                Slide {slideIdx + 1} of {currentLesson.slides.length}
              </div>
            </div>

            {/* Slide card */}
            <div className="card" style={{ marginBottom: "1.5rem", padding: "2rem" }}>
              {/* TTS button */}
              <button
                onClick={() => speaking ? stopSpeaking() : speak(getSpeakText())}
                aria-label={speaking ? "Stop reading aloud" : "Read this slide aloud"}
                style={{ float: "right", background: "var(--sage-light)", border: "none", borderRadius: "8px", padding: "0.5rem 0.875rem", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.75rem", color: "var(--sage-dark)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.375rem" }}
              >
                {speaking ? "⏹ Stop" : "🔊 Read aloud"}
              </button>

              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.375rem", color: "var(--charcoal)", marginBottom: "1.25rem", paddingRight: "7rem" }}>
                {currentSlide.heading}
              </h2>

              {currentSlide.type === "scenario" && (
                <div style={{ background: "var(--cream)", borderLeft: "4px solid var(--sage)", padding: "1.25rem 1.5rem", borderRadius: "0 8px 8px 0", marginBottom: "1.25rem" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--sage-dark)", marginBottom: "0.5rem" }}>
                    Workplace scenario
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "var(--charcoal-mid)", lineHeight: 1.7, margin: "0 0 0.75rem 0" }}>
                    {currentSlide.scenario}
                  </p>
                  {currentSlide.question && (
                    <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "0.9375rem", color: "var(--charcoal)", margin: 0 }}>
                      💭 {currentSlide.question}
                    </p>
                  )}
                </div>
              )}

              <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--charcoal-mid)", lineHeight: 1.75, margin: 0 }}>
                {currentSlide.body}
              </p>
            </div>

            {/* Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={() => {
                  stopSpeaking();
                  if (slideIdx > 0) setSlideIdx(slideIdx - 1);
                  else if (lessonIdx > 0) {
                    setLessonIdx(lessonIdx - 1);
                    setSlideIdx(module.lessons[lessonIdx - 1].slides.length - 1);
                    setPhase("lesson");
                  }
                }}
                disabled={lessonIdx === 0 && slideIdx === 0}
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "0.875rem", color: "var(--gray-soft)", background: "none", border: "none", cursor: "pointer", opacity: lessonIdx === 0 && slideIdx === 0 ? 0.3 : 1 }}
              >
                ← Previous
              </button>
              <span style={{ fontSize: "0.75rem", color: "var(--gray-soft)", fontFamily: "var(--font-body)" }}>
                {slideIdx + 1} / {currentLesson.slides.length}
              </span>
              <button onClick={nextSlide} className="btn-primary" style={{ fontSize: "0.875rem", padding: "0.625rem 1.5rem" }}>
                {slideIdx < currentLesson.slides.length - 1 ? "Next →" : "Check your learning →"}
              </button>
            </div>
          </div>
        )}

        {/* ===== LESSON QUIZ ===== */}
        {phase === "lesson-quiz" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <span className="badge badge-sage" style={{ marginBottom: "0.625rem" }}>Quick check — {currentLesson.title}</span>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem", color: "var(--charcoal)" }}>
                Answer these questions to continue
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.875rem" }}>
                You need to get these right before moving on. Take your time.
              </p>
            </div>

            {lessonQuiz.map((q: QuizQuestion) => (
              <div key={q.id} className="card" style={{ marginBottom: "1.25rem", padding: "1.75rem" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "1rem" }}>
                  {q.question}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {q.options.map((opt, i) => {
                    const selected = quizAnswers[q.id] === i;
                    const submitted = quizSubmitted[q.id];
                    const isCorrect = i === q.correct;
                    let bg = "var(--white)";
                    let border = "var(--gray-border)";
                    let color = "var(--charcoal)";
                    if (submitted) {
                      if (isCorrect) { bg = "#e8f5e9"; border = "var(--sage)"; }
                      else if (selected) { bg = "#fce4e4"; border = "#e57373"; color = "#c62828"; }
                    } else if (selected) {
                      bg = "var(--sage-light)"; border = "var(--sage)";
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => !submitted && setQuizAnswers((a) => ({ ...a, [q.id]: i }))}
                        disabled={submitted}
                        aria-pressed={selected}
                        style={{ background: bg, border: `2px solid ${border}`, borderRadius: "8px", padding: "0.875rem 1rem", textAlign: "left", fontFamily: "var(--font-body)", fontSize: "0.9375rem", color, cursor: submitted ? "default" : "pointer", transition: "all 0.15s" }}
                      >
                        {opt}
                        {submitted && isCorrect && " ✓"}
                        {submitted && selected && !isCorrect && " ✗"}
                      </button>
                    );
                  })}
                </div>
                {!quizSubmitted[q.id] && quizAnswers[q.id] !== null && quizAnswers[q.id] !== undefined && (
                  <button
                    onClick={() => setQuizSubmitted((s) => ({ ...s, [q.id]: true }))}
                    className="btn-primary"
                    style={{ marginTop: "1rem", fontSize: "0.875rem", padding: "0.625rem 1.25rem" }}
                  >
                    Submit answer
                  </button>
                )}
                {quizSubmitted[q.id] && (
                  <div style={{ marginTop: "1rem", padding: "1rem", background: quizAnswers[q.id] === q.correct ? "#e8f5e9" : "#fff3e0", borderRadius: "8px" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal-mid)", margin: 0, lineHeight: 1.6 }}>
                      <strong>{quizAnswers[q.id] === q.correct ? "Correct! " : "Not quite — "}</strong>
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {allLessonQuestionsAnswered && (
              <div style={{ marginTop: "1rem" }}>
                {allLessonQuestionsCorrect ? (
                  <button onClick={finishLessonQuiz} className="btn-primary" style={{ width: "100%", textAlign: "center" }}>
                    {lessonIdx < module.lessons.length - 1 ? "Continue to next lesson →" : "Take the final assessment →"}
                  </button>
                ) : (
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", color: "var(--charcoal-mid)", fontSize: "0.875rem", marginBottom: "0.75rem" }}>
                      Review the slides and try again — you need all correct to continue.
                    </p>
                    <button
                      onClick={() => {
                        setQuizAnswers({});
                        setQuizSubmitted({});
                        setSlideIdx(0);
                        setPhase("lesson");
                      }}
                      className="btn-secondary"
                    >
                      ← Review lesson
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ===== FINAL QUIZ ===== */}
        {phase === "final-quiz" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <span className="badge badge-sage" style={{ marginBottom: "0.625rem" }}>Final Assessment</span>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.375rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
                {module.title} — Final Assessment
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.875rem" }}>
                {module.finalQuiz.length} questions · Pass mark 70% · You can retake if needed
              </p>
            </div>

            {module.finalQuiz.map((q: QuizQuestion, idx: number) => (
              <div key={q.id} className="card" style={{ marginBottom: "1.25rem", padding: "1.75rem" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1rem", color: "var(--charcoal)", marginBottom: "1rem" }}>
                  {idx + 1}. {q.question}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {q.options.map((opt, i) => {
                    const selected = finalAnswers[q.id] === i;
                    const isCorrect = i === q.correct;
                    let bg = "var(--white)";
                    let border = "var(--gray-border)";
                    let color = "var(--charcoal)";
                    if (finalSubmitted) {
                      if (isCorrect) { bg = "#e8f5e9"; border = "var(--sage)"; }
                      else if (selected) { bg = "#fce4e4"; border = "#e57373"; color = "#c62828"; }
                    } else if (selected) {
                      bg = "var(--sage-light)"; border = "var(--sage)";
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => !finalSubmitted && setFinalAnswers((a) => ({ ...a, [q.id]: i }))}
                        disabled={finalSubmitted}
                        aria-pressed={selected}
                        style={{ background: bg, border: `2px solid ${border}`, borderRadius: "8px", padding: "0.875rem 1rem", textAlign: "left", fontFamily: "var(--font-body)", fontSize: "0.9375rem", color, cursor: finalSubmitted ? "default" : "pointer", transition: "all 0.15s" }}
                      >
                        {opt}
                        {finalSubmitted && isCorrect && " ✓"}
                        {finalSubmitted && selected && !isCorrect && " ✗"}
                      </button>
                    );
                  })}
                </div>
                {finalSubmitted && (
                  <div style={{ marginTop: "1rem", padding: "1rem", background: finalAnswers[q.id] === q.correct ? "#e8f5e9" : "#fff3e0", borderRadius: "8px" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal-mid)", margin: 0, lineHeight: 1.6 }}>
                      <strong>{finalAnswers[q.id] === q.correct ? "Correct. " : "Incorrect — "}</strong>
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {!finalSubmitted ? (
              <button
                onClick={() => setFinalSubmitted(true)}
                disabled={Object.keys(finalAnswers).length < module.finalQuiz.length}
                className="btn-primary"
                style={{ width: "100%", textAlign: "center", opacity: Object.keys(finalAnswers).length < module.finalQuiz.length ? 0.5 : 1 }}
              >
                Submit assessment
              </button>
            ) : (
              <div className="card" style={{ padding: "2rem", textAlign: "center", marginTop: "1rem", background: finalPassed ? "var(--sage-light)" : "var(--cream)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{finalPassed ? "🎉" : "📖"}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
                  {finalPassed ? `You passed! ${finalScore}/${module.finalQuiz.length} correct` : `${finalScore}/${module.finalQuiz.length} correct — almost there`}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
                  {finalPassed ? "Excellent work. Your certificate is ready." : "Review the explanations above and retake when ready."}
                </p>
                {finalPassed ? (
                  <button onClick={() => setPhase("certificate")} className="btn-primary">
                    Get your certificate →
                  </button>
                ) : (
                  <button
                    onClick={() => { setFinalAnswers({}); setFinalSubmitted(false); }}
                    className="btn-secondary"
                  >
                    Retake assessment
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ===== CERTIFICATE ===== */}
        {phase === "certificate" && (
          <div style={{ textAlign: "center" }}>
            <div
              className="card"
              style={{
                padding: "3rem 2.5rem",
                border: "3px solid var(--sage)",
                background: "linear-gradient(135deg, var(--white) 0%, var(--cream) 100%)",
                marginBottom: "1.5rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative corners */}
              <div style={{ position: "absolute", top: 0, left: 0, width: "60px", height: "60px", borderRight: "none", borderBottom: "none", border: "3px solid var(--sage-light)" }} aria-hidden="true" />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "60px", height: "60px", borderLeft: "none", borderTop: "none", border: "3px solid var(--sage-light)" }} aria-hidden="true" />

              <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--sage-dark)", marginBottom: "1rem" }}>
                THE INCLUSION EDIT · IMPACT PLATFORM
              </div>

              <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }} aria-hidden="true">🎓</div>

              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.75rem", color: "var(--charcoal)", marginBottom: "0.5rem" }}>
                Certificate of Completion
              </h2>

              <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.1rem", color: "var(--gray-soft)", marginBottom: "1.25rem" }}>
                This certifies that you have successfully completed
              </p>

              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: "var(--sage-dark)", marginBottom: "1.25rem", padding: "0.75rem 1.5rem", border: "2px solid var(--sage-light)", borderRadius: "8px", display: "inline-block" }}>
                {module.title}
              </div>

              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", marginBottom: "0.5rem" }}>
                {module.pathway} Pathway · {module.cpd} CPD
              </p>

              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--gray-soft)" }}>
                Completed: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>

              <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--sage-light)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1rem", color: "var(--charcoal)" }}>
                  Rebekah Hayward
                </div>
                <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-heading)", color: "var(--gray-soft)", marginTop: "0.25rem" }}>
                  Founder, The Inclusion Edit
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "1.5rem" }}>
              <button
                onClick={() => window.print()}
                className="btn-primary"
              >
                ⬇ Download certificate
              </button>
              <button onClick={() => setPhase("summary")} className="btn-secondary">
                View key learnings →
              </button>
            </div>
          </div>
        )}

        {/* ===== MODULE SUMMARY ===== */}
        {phase === "summary" && (
          <div>
            <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }} aria-hidden="true">📌</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: "var(--charcoal)", marginBottom: "0.375rem" }}>
                Key Learnings
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.875rem" }}>
                {module.title} · {module.pathway}
              </p>
            </div>

            <div className="card" style={{ marginBottom: "1.5rem", padding: "1.75rem" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {module.keyLearnings.map((kl, i) => (
                  <li key={i} style={{ padding: "0.75rem 0", borderBottom: i < module.keyLearnings.length - 1 ? "1px solid var(--gray-border)" : "none", paddingLeft: "1.75rem", position: "relative", fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "var(--charcoal-mid)", lineHeight: 1.6 }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--sage)", fontWeight: 700, fontFamily: "var(--font-heading)" }} aria-hidden="true">✓</span>
                    {kl}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
              <button
                onClick={() => { setPinned(true); }}
                className={pinned ? "btn-secondary" : "btn-primary"}
                style={{ flex: 1 }}
                disabled={pinned}
              >
                {pinned ? "✓ Pinned to dashboard" : "📌 Pin to my dashboard"}
              </button>
              <button onClick={() => setPhase("certificate")} className="btn-secondary" style={{ flex: 1 }}>
                ← Back to certificate
              </button>
            </div>

            {/* What next */}
            <div style={{ padding: "1.5rem", background: "var(--cream)", borderRadius: "12px", border: "1px solid var(--sand)" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--sage-dark)", marginBottom: "0.75rem" }}>
                What next?
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal-mid)", marginBottom: "1rem" }}>
                Now you&apos;ve completed <strong>Psychological Safety</strong>, a natural next step is understanding how it connects to belonging — how people need to feel safe <em>and</em> valued to truly thrive.
              </p>
              <Link href={`/dashboard/learn/${module.nextModule.id}`} className="btn-primary" style={{ fontSize: "0.875rem" }}>
                Next: {module.nextModule.title} →
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
