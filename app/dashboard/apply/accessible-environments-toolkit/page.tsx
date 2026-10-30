"use client";

import Link from "next/link";
import PlatformNav from "@/app/components/PlatformNav";
import BottomBanner from "@/app/components/BottomBanner";
import { useState, useMemo } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Category = "diverse-needs" | "physical" | "digital" | "communication" | "policies" | "feedback" | "culture";
type Priority = "quick win" | "planned" | "ongoing";
type Owner = "HR" | "Facilities" | "IT" | "Line managers" | "Communications";
type ActionStatus = "not started" | "in progress" | "done";
type AssessmentRating = "not started" | "partial" | "in place";
type Tab = "assess" | "browse" | "tracker";

// ── Category metadata ──────────────────────────────────────────────────────────
const CATEGORIES: { key: Category; label: string; icon: string; desc: string; scenario: string }[] = [
  {
    key: "diverse-needs", label: "Recognise diverse needs", icon: "🧩",
    desc: "Visible and non-visible disabilities, chronic illness, mental health conditions, and neurodivergence: and the flexibility systems people need around them.",
    scenario: "An employee with fibromyalgia has good days and difficult ones. On a difficult day, their pain levels, cognitive load, and fatigue mean that the tasks they completed easily yesterday are genuinely inaccessible today. If your adjustments process requires them to re-justify their needs every time they have a flare-up, or to choose between disclosing details to a manager who is not trained to receive them and simply struggling through, your organisation has not built flexibility into its systems: it has built a formal barrier dressed as a process.",
  },
  {
    key: "physical", label: "Physical accessibility", icon: "🏢",
    desc: "The built environment: offices, meeting rooms, kitchens, entrances, shared spaces, and any area employees are expected to use.",
    scenario: "Think about the route from your building entrance to every space an employee is expected to use. Not the main entrance on a good day: the entrance when the automatic door is broken, when the accessible toilet is out of order, when the lift is under maintenance. A disabled employee has already made that calculation before they accept a job offer. If the answer they arrive at is 'I am not sure I can do this', the organisation has already lost them.",
  },
  {
    key: "digital", label: "Digital accessibility", icon: "💻",
    desc: "Documents, websites, software, and meeting technology: whether they work for employees using assistive technologies or needing alternative formats.",
    scenario: "Your HR system works fine for most people. But for a blind employee using a screen reader, a form that requires a mouse click to submit is not an inconvenience: it is a locked door. They cannot submit their expenses, book their leave, or access their payslip without asking a sighted colleague for help. That colleague becomes their proxy for basic employment administration. That is not inclusion: it is managed dependency.",
  },
  {
    key: "communication", label: "Communication practices", icon: "📢",
    desc: "How information is shared and received: plain language, multiple formats, asynchronous options, and employee-led communication preferences.",
    scenario: "A new policy goes out to all staff as a scanned PDF with no heading structure and insufficient contrast. For most employees, this is a minor formatting irritation. For a blind employee, an employee with low vision, or an employee with dyslexia, it may be entirely inaccessible. For an employee who needs processing time before a meeting, an agenda shared two hours beforehand is not preparation: it is a notification. The organisation has communicated, just not to everyone.",
  },
  {
    key: "policies", label: "Policies and work practices", icon: "📋",
    desc: "Flexible working, onboarding, performance management, professional development, and whether every policy has been checked for the barriers it may create.",
    scenario: "An employee with a chronic health condition needs to occasionally start at 10am instead of 9am. Their manager says this needs to go through HR as a formal flexible working request, which takes six weeks to process. The employee has to choose between disclosing a diagnosis or working through symptoms. The policy said flexibility was available. What the culture said was: only if you can prove you need it. Policies that have not been through an accessibility impact check often work exactly this way.",
  },
  {
    key: "feedback", label: "Continuous feedback", icon: "🔄",
    desc: "How the organisation listens to disabled and neurodiverse employees, audits its own systems, and adjusts based on what it finds.",
    scenario: "An organisation conducts an accessibility audit. The audit is led by a non-disabled facilities manager and a non-disabled HR officer. They identify seventeen barriers and resolve fourteen of them. The three they miss are the three that most affect the employees who use wheelchairs, communicate through AAC devices, and manage sensory processing differences. The audit was well-intentioned. It just did not include the people who could have told them what they missed.",
  },
  {
    key: "culture", label: "Foster an inclusive culture", icon: "🌱",
    desc: "Staff training, everyday inclusive behaviours, celebrating accessibility improvements, and using data to track participation by disability and neurodivergence.",
    scenario: "An employee with a visual impairment joins a team where no one has had any training on visible or invisible disabilities. A colleague accidentally blocks their route to their desk with a delivery. Another reads a document aloud at speed without being asked. Another asks, in front of the team, what their condition 'actually is'. None of this is malicious. All of it is exhausting. Culture is not the policy on the intranet: it is what happens in the room when no one is thinking about it.",
  },
];

// ── Owner colours ──────────────────────────────────────────────────────────────
const OWNER_STYLE: Record<Owner, { bg: string; color: string; border: string }> = {
  "HR":              { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  "Facilities":      { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  "IT":              { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  "Line managers":   { bg: "#fdf4ff", color: "#7e22ce", border: "#e9d5ff" },
  "Communications":  { bg: "#fefce8", color: "#a16207", border: "#fde68a" },
};

// ── Toolkit items ──────────────────────────────────────────────────────────────
type ToolkitItem = {
  id: string;
  category: Category;
  title: string;
  what: string;
  why: string;
  how: string;
  priority: Priority;
  owners: Owner[];
};

const ITEMS: ToolkitItem[] = [
  // Recognise diverse needs
  { id: "dn1", category: "diverse-needs", priority: "quick win", owners: ["HR", "Line managers"],
    title: "Audit your adjustments process for visible and non-visible disabilities",
    what: "Review how employees request and receive reasonable adjustments, and check that the process works equally well for non-visible conditions such as chronic illness, mental health conditions, ADHD, autism, and dyslexia.",
    why: "Non-visible disabilities are significantly underrepresented in workplace adjustments data: not because people do not need adjustments, but because the process of requesting them requires disclosure, justification, and evidence that many people are not willing or able to provide. A process that works only for visible conditions is a process that excludes a large proportion of disabled employees.",
    how: "Map every step a disabled employee takes to get an adjustment. At each step, ask: does this require medical evidence? Does this require disclosure to someone the employee may not trust? How long does it take? Is there a manager who can approve or block it? Remove every step that is not strictly necessary and replace formal evidence requirements with self-referral for standard adjustments." },
  { id: "dn2", category: "diverse-needs", priority: "planned", owners: ["HR", "Line managers"],
    title: "Include neurodiverse employees in space, communication, and workflow planning",
    what: "When designing or reviewing workspaces, communication norms, and workflow processes, explicitly consider the needs of employees with ADHD, autism, and dyslexia, not as an afterthought but as part of the design brief.",
    why: "Neurodiverse employees are often expected to adapt entirely to environments designed without them in mind. Open-plan offices, verbal-first communication, ad hoc meeting formats, and dense written documents are all barriers that can be designed out: but only if they are identified at the design stage, not added to a list of accommodations afterwards.",
    how: "Add neurodiverse employees or an occupational therapist with neurodiversity expertise to any working group reviewing space or workflow. Ask specifically: where does this environment create additional cognitive load? Where does this process require sustained focus without support? Where does this communication format disadvantage someone who processes information differently?" },
  { id: "dn3", category: "diverse-needs", priority: "ongoing", owners: ["HR", "Line managers"],
    title: "Build flexibility for flare-ups and fluctuating conditions into standard practice",
    what: "Ensure that employees with fluctuating conditions can adjust their working arrangements during difficult periods without going through a formal process each time.",
    why: "Many disabilities and chronic conditions fluctuate. An employee may need additional adjustments during a flare-up, a high-stress period, or a period of sensory overwhelm that they did not need last week. A process that treats each variation as a new request requiring fresh justification places the administrative burden on the person least able to carry it at that moment.",
    how: "Establish a standing arrangement for employees with fluctuating conditions: a brief check-in with their line manager when they need to vary their adjustments, with no requirement for medical evidence on each occasion. Document this as a named practice, not an informal favour, so it survives a change of manager." },

  // Physical
  { id: "ph1", category: "physical", priority: "quick win", owners: ["Facilities"],
    title: "Check that ramps, lifts, and wide doorways are operational and accessible",
    what: "Walk the route from the building entrance to every space employees are expected to use and verify that every access feature (ramps, automatic doors, wide doorways, lifts) is working and genuinely usable.",
    why: "Many organisations have accessible infrastructure that is not reliably available: a lift that is frequently out of service, an automatic door that requires the right-hand button and is too slow to hold for a wheelchair user, a ramp that is blocked by deliveries three days a week. The infrastructure exists on paper; the access does not exist in practice.",
    how: "Do the route check at least quarterly and after any building works. Use a checklist that includes: signage to accessible entrances, lighting levels, surface conditions, availability of lifts, operational status of automatic doors, and clear routes through shared spaces. Where something is not working, set a maximum repair time of five working days and a temporary alternative while repair is pending." },
  { id: "ph2", category: "physical", priority: "quick win", owners: ["Facilities"],
    title: "Provide quiet, low-stimulation spaces available without booking",
    what: "Designate at least one quiet, low-stimulation space that employees can use without booking, without having to explain why, and without any expectation of productivity performance inside it.",
    why: "Neurodiverse employees, employees managing anxiety or chronic pain, and employees who need focus time require environments that most open-plan offices do not provide. A space that can be booked but requires justification is not the same as a space that is simply available. Employees who most need it are often least able to navigate a booking process during the moment they need it most.",
    how: "The space should have: reduced or controllable lighting, minimal noise (soundproofing or location away from open-plan areas), a door that closes, and a clear signal to others that it is a quiet space. It does not need to be large. It does need to be step-free and accessible by the same route available to everyone." },
  { id: "ph3", category: "physical", priority: "planned", owners: ["Facilities", "HR"],
    title: "Ensure adjustable desks and ergonomic furniture are available without a formal request process",
    what: "Make a range of adjustable and ergonomic furniture available for employees to use or request without completing a formal occupational health referral as a first step.",
    why: "The process of requesting adaptive equipment is itself a barrier. An employee with a musculoskeletal condition who needs a height-adjustable desk should not have to wait six to eight weeks for an occupational health assessment before one is provided. By the time the assessment is complete, they may have been managing pain or reduced mobility for two months.",
    how: "Hold a small stock of adjustable desks, ergonomic chairs, footrests, and monitor stands. Allow employees to request one through their line manager with a maximum response time of five working days, no occupational health referral required. Reserve formal assessment for cases where the need is complex or where specific specialist equipment is required." },
  { id: "ph4", category: "physical", priority: "ongoing", owners: ["Facilities"],
    title: "Use clear signage, good lighting, and consistent layouts throughout the workplace",
    what: "Review signage, lighting levels, and the consistency of layouts across all areas employees use, to support safe and accessible navigation for people with visual impairments, mobility aids, or sensory processing needs.",
    why: "Workplaces that are frequently reorganised, poorly lit in transition areas, or reliant on staff knowing the layout informally are not accessible to employees with visual impairments or those who rely on predictability to navigate safely. Sensory overload from unpredictable environments is a real barrier for many neurodiverse employees.",
    how: "Signage should be at consistent heights, in high-contrast formats, and with tactile elements where required. Lighting in corridors and transition spaces should be reviewed against recommended lux levels for accessibility. Changes to office layouts should be communicated in advance to all staff, with a map provided and a period of adjustment before the new layout becomes standard." },

  // Digital
  { id: "di1", category: "digital", priority: "quick win", owners: ["IT", "Communications"],
    title: "Make documents, websites, and software compatible with screen readers",
    what: "Check that your main internal documents, intranet pages, and the software platforms employees are required to use can be navigated using a screen reader and keyboard-only navigation.",
    why: "Screen reader compatibility is a basic requirement, not a specialist feature. Documents that are scanned images, websites built without semantic HTML, and software that requires mouse interaction to complete essential tasks are inaccessible to blind employees and many employees with motor impairments. Most of these barriers are inexpensive to fix and expensive to leave in place.",
    how: "Run the accessibility checker in Word, PowerPoint, and Adobe Acrobat on any widely shared document before distributing. Test your intranet with a free screen reader (NVDA for Windows, VoiceOver for Mac). For software procurement, add screen reader compatibility to your evaluation criteria. Where existing tools fail, raise accessibility as a support ticket with the vendor." },
  { id: "di2", category: "digital", priority: "quick win", owners: ["IT"],
    title: "Enable live captions and transcript downloads in meeting platforms as default",
    what: "Set live captions to on by default in your video conferencing platform, and ensure transcript downloads are available to all participants.",
    why: "Live captions are not a specialist accessibility feature: they are used by employees with hearing impairments, employees working in noisy environments, employees for whom English is an additional language, and employees with processing or attention difficulties who benefit from a visual reinforcement of spoken content. Requiring individuals to request them separately marks those employees out and reduces uptake.",
    how: "In Microsoft Teams: go to Settings, then Captions and transcripts, and enable live captions for the organisation. In Zoom: enable auto-generated captions under Account Settings. Both platforms allow transcripts to be downloaded after meetings. Communicate this change to all staff and include it in your new-starter IT setup checklist." },
  { id: "di3", category: "digital", priority: "planned", owners: ["Communications", "IT"],
    title: "Offer captioned videos and alternative formats for all learning and communication materials",
    what: "Ensure that all videos used in training, onboarding, or communications have captions, and that all written materials are available in accessible digital formats as well as in alternative formats on request.",
    why: "A training video without captions excludes employees who are deaf or hard of hearing, employees working in environments where audio is not possible, and employees who process information more effectively through reading than listening. A document available only as a printed handout excludes anyone who needs a screen reader or a larger font.",
    how: "Add closed captions to all new video content before publishing: most video platforms (YouTube, Vimeo, Microsoft Stream) generate automatic captions that need reviewing before use. For existing video libraries, prioritise mandatory training content first. For documents: use accessible Word or PDF formats with proper heading structure, alt text on images, and a named contact for alternative format requests." },

  // Communication
  { id: "co1", category: "communication", priority: "quick win", owners: ["Line managers", "HR"],
    title: "Share meeting agendas in advance and summarise key points afterwards",
    what: "Set a standard expectation that agendas are shared at least 48 hours before any meeting, and that a brief written summary of key decisions and actions is shared with all attendees afterwards.",
    why: "Many accessibility needs are served by preparation time that is not available in real-time meetings: neurodiverse employees who process information more effectively when they have advance sight of it; employees who use communication aids that take time to prepare; employees with anxiety who benefit from knowing what to expect; employees with hearing loss who want to read materials before a discussion they may struggle to follow.",
    how: "Make advance agendas a standard expectation in your meeting guidance and in any facilitation training for managers. For recurring meetings, set a norm that agendas go out at the start of the week for a mid-week meeting. For the post-meeting summary: it does not need to be long; three to five bullet points covering decisions made, actions agreed, and the next meeting date is sufficient." },
  { id: "co2", category: "communication", priority: "quick win", owners: ["Communications", "HR"],
    title: "Use clear, plain language and offer multiple formats",
    what: "Review your standard communication templates and policy documents for plain language, and offer key documents in more than one format: written, visual summary, and verbal option.",
    why: "Plain language is not a concession to lower literacy: it is better communication for everyone. Documents that are clear, structured, and free of jargon are more likely to be read, understood, and acted on. For people with cognitive disabilities, literacy difficulties, or English as an additional language, plain language versions may be the only version they can meaningfully access.",
    how: "Aim for a reading age of approximately 9 (equivalent to clear newspaper writing). Use short sentences, active voice, clear headings, and bullet points for lists of conditions or steps. For complex policy documents, produce a one-page plain language summary alongside the full version. Test summaries with a representative group before distributing." },
  { id: "co3", category: "communication", priority: "planned", owners: ["HR", "Line managers"],
    title: "Allow employees to set their preferred communication methods",
    what: "Create a simple mechanism for employees to record and share their preferred communication methods, such as email over calls, visual agendas before meetings, or camera-off options in video calls.",
    why: "Communication preferences are not preferences in the decorative sense: for many disabled and neurodiverse employees, being contacted by phone without notice, being expected to have their camera on, or receiving information only verbally in a fast-paced meeting represents a genuine access barrier. Normalising the recording of communication preferences reduces the need for individual disclosure of the reason behind them.",
    how: "Add a communication preferences field to your HR system or onboarding form. Include prompts: how do you prefer to receive urgent information? Do you need advance notice before phone calls? Are there meeting formats or tools that work better for you? Make clear that preferences are shared with the employee's immediate team and line manager, and that no explanation is required." },
  { id: "co4", category: "communication", priority: "planned", owners: ["HR"],
    title: "Provide asynchronous communication options and interpreter services where needed",
    what: "Offer asynchronous alternatives to real-time communication for employees who need processing time or experience fatigue, and have a clear process for requesting interpreters or translation services.",
    why: "For employees with chronic fatigue, processing differences, or communication-related disabilities, the expectation of real-time participation in meetings and instant responses to messages is a structural barrier. Asynchronous options (recorded briefings, shared documents, response windows of 24 to 48 hours) allow the same participation with appropriate adjustment.",
    how: "Review which processes currently require synchronous communication and identify where an asynchronous alternative would work equally well. For interpreter and translation services: identify your process in advance rather than at the point of need, agree a budget, and brief line managers on how to request a service. Do not wait until an employee discloses a need before establishing the process." },

  // Policies
  { id: "po1", category: "policies", priority: "quick win", owners: ["HR"],
    title: "Include flexible hours, hybrid working, and rest breaks as standard options",
    what: "Make flexible working hours, hybrid arrangements, and scheduled rest breaks available to all employees as standard options, not as adjustments that require a formal request or justification.",
    why: "Flexibility is one of the most significant accessibility adjustments for disabled employees, employees with chronic illness, neurodiverse employees, and employees with caring responsibilities. When it is available in principle but requires a formal process to access in practice, the burden falls on the people who most need it.",
    how: "Set a clear policy: flexibility is available unless there is a specific operational reason it cannot be accommodated. Train managers to respond to flexibility requests with 'how can we make this work?' rather than 'why do you need this?'. Monitor uptake by role and demographic: if flexibility is used only by certain groups or only in certain teams, it may not be as available in practice as it appears on paper." },
  { id: "po2", category: "policies", priority: "planned", owners: ["HR", "Line managers"],
    title: "Integrate accessibility into onboarding, performance management, and professional development",
    what: "Review your onboarding process, performance management frameworks, and professional development programmes to ensure they work for disabled and neurodiverse employees without requiring individual accommodation as an afterthought.",
    why: "Accessibility that is built in from the start requires less individual advocacy than accessibility that is added on request. An onboarding process that asks about access needs before day one, a performance management framework that does not penalise employees for different working patterns, and professional development that is available in accessible formats: these are structural changes that reduce the need for individual disclosure.",
    how: "Add an access needs question to pre-start onboarding communications. Review performance management criteria for any that inadvertently disadvantage employees with disabilities or neurodiverse employees (for example, attendance-based metrics that penalise medical appointments). Audit professional development events and materials for accessibility before they are offered to staff." },
  { id: "po3", category: "policies", priority: "ongoing", owners: ["HR"],
    title: "Put every policy through an accessibility impact check before approval",
    what: "Before any new or revised policy is approved, check whether it creates unintended barriers for people with disabilities or neurodiverse colleagues, and ensure reasonable adjustments are explicitly built in.",
    why: "Policies create the conditions for everyday practice. A policy that does not account for disabled employees' needs will produce practice that excludes them, regardless of how good the intention behind it was. An accessibility impact check at the policy stage is faster and cheaper than identifying and fixing the impact on people after the policy is in force.",
    how: "Add an accessibility impact question to your policy approval template: 'Does this policy create any additional burden or barrier for employees with disabilities or neurodiverse employees? If so, what adjustments are built in?' Require a named reviewer with accessibility knowledge to sign off on each response. Where a policy does create a barrier that cannot be designed out, explicitly name the adjustment available to address it." },

  // Feedback
  { id: "fb1", category: "feedback", priority: "quick win", owners: ["HR"],
    title: "Regularly ask employees about their accessibility needs and experiences",
    what: "Build regular, low-threshold opportunities for employees to share their accessibility needs and experiences, separate from performance conversations and without requiring disclosure of a diagnosis.",
    why: "Accessibility needs change. An employee who needed no adjustments when they joined may develop a condition three years later. An employee whose adjustments were working may find they stop working after an office move. Organisations that only ask about access needs at the point of hire and then wait for employees to raise issues are not monitoring accessibility: they are waiting for problems to escalate.",
    how: "Include one or two accessibility-focused questions in your annual employee survey, and in any pulse surveys you run. Questions might include: 'Are there any barriers that affect your ability to do your job?' and 'Do you feel confident requesting adjustments if you need them?' Report on the results by team and seniority, not just overall, so patterns that apply to specific groups are visible." },
  { id: "fb2", category: "feedback", priority: "planned", owners: ["HR"],
    title: "Involve disabled and neurodiverse employees in accessibility design and decision-making",
    what: "Create formal mechanisms for disabled and neurodiverse employees to participate in designing and reviewing accessibility policies, workplace changes, and digital tools, not only in responding to completed decisions.",
    why: "Organisations frequently consult disabled employees after decisions have been made, asking for feedback on solutions that were designed without them. Participation at the design stage produces better outcomes and communicates something different: that the experience of disabled employees is relevant information, not an afterthought. It also means fewer costly iterations after implementation.",
    how: "Establish a standing accessibility advisory group with at least half its membership drawn from disabled and neurodiverse employees. Give it a defined scope: it reviews proposed workplace changes, new digital tools, policy drafts, and the results of accessibility audits before final decisions are made. Pay members for their time: participation in this group is work, not volunteering." },
  { id: "fb3", category: "feedback", priority: "ongoing", owners: ["Facilities", "IT", "HR"],
    title: "Audit workspaces and digital tools regularly and act on findings",
    what: "Conduct annual accessibility audits of your physical spaces and digital tools, and publish the findings and actions taken in response.",
    why: "Audits that produce findings and no action communicate clearly that the process was compliance theatre, not genuine commitment to change. Audits that are not published allow the same barriers to persist invisibly across cycles. Publishing findings and actions taken builds accountability and trust with disabled employees.",
    how: "Physical audit: use a structured checklist covering entrances, routes, toilets, meeting rooms, workstations, signage, and emergency evacuation procedures for disabled employees. Digital audit: run an automated accessibility scan on your intranet and key internal tools, then test manually with a screen reader. Publish a summary of findings and a timeline for addressing each one. Review at the following audit whether actions were completed." },

  // Culture
  { id: "cu1", category: "culture", priority: "quick win", owners: ["HR", "Line managers"],
    title: "Train all staff on visible and invisible disabilities and neurodiversity",
    what: "Include basic disability and neurodiversity awareness in all-staff training, not only in management development or HR upskilling.",
    why: "Colleagues make environments more or less accessible every day: in how they set up meetings, how they communicate, how they respond when a colleague uses a mobility aid or requests adjustments. Awareness training does not replace structural change but it shapes the everyday experience of disabled employees in ways that structural change alone cannot. Staff who have had no training cannot be expected to respond appropriately.",
    how: "Cover: what accessibility means across visible and non-visible disabilities and neurodivergence; why it matters beyond compliance; what adjustments look like in practice; and what to do if you notice an accessibility barrier. Keep it under 90 minutes. Make it practical, with real scenarios, not theoretical. Include it in induction for all new starters and refresh it every two years for existing staff." },
  { id: "cu2", category: "culture", priority: "planned", owners: ["HR", "Line managers"],
    title: "Encourage everyday inclusive behaviours and active allyship",
    what: "Build practical, everyday inclusive behaviours into your team norms: not blocking accessible routes, checking before reading documents aloud, asking about communication preferences, and speaking up when accessibility barriers are noticed.",
    why: "Formal training creates awareness; everyday behaviour is what disabled employees actually experience. An employee who has done disability awareness training but still takes the last remaining accessible parking space, or speaks over a colleague using an AAC device, has not yet changed how they behave. Inclusive culture requires the translation of awareness into habit.",
    how: "Include inclusive behaviours in your competency frameworks and performance conversations, not as a separate inclusion metric but as part of how people are expected to work. Create a simple, jargon-free guide to everyday accessibility behaviours for teams. When managers observe an accessibility barrier or an exclusive behaviour, address it promptly and directly: normalise the correction, not the silence." },
  { id: "cu3", category: "culture", priority: "planned", owners: ["HR"],
    title: "Celebrate accessibility improvements and use data to track progress",
    what: "Publicly celebrate accessibility improvements your organisation makes, and collect and publish data on participation and experience by disability and neurodivergence across roles and seniority levels.",
    why: "Organisations that communicate their accessibility improvements signal to current and prospective disabled employees that accessibility is taken seriously. Data by disability and neurodivergence makes invisible patterns visible: an organisation where disabled employees are clustered in lower-paid roles, or where their retention is lower than average, has information it needs to act on. Without data, the pattern remains invisible.",
    how: "Include accessibility milestones in your internal communications and in your external employer brand. Build voluntary disclosure of disability and neurodivergence into your HR data collection, with clear communication about how the data is used and who can see it. Report disaggregated data in your annual EDI report: representation by seniority, retention rates, and promotion rates by disability status." },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const PRIORITY_STYLE: Record<Priority, { bg: string; color: string; border: string }> = {
  "quick win": { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  "planned":   { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  "ongoing":   { bg: "#fdf4ff", color: "#7e22ce", border: "#e9d5ff" },
};
const PRIORITY_ICON: Record<Priority, string> = { "quick win": "⚡", "planned": "📅", "ongoing": "🔄" };

const STATUS_STYLE: Record<ActionStatus, { bg: string; color: string; border: string; label: string }> = {
  "not started": { bg: "#f9fafb", color: "#6b7280", border: "#e5e7eb", label: "Not started" },
  "in progress": { bg: "#fefce8", color: "#a16207", border: "#fde68a", label: "In progress" },
  "done":        { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0", label: "Done" },
};

const ASSESSMENT_OPTIONS: { value: AssessmentRating; label: string; color: string }[] = [
  { value: "not started", label: "Not started", color: "#dc2626" },
  { value: "partial",     label: "Partial",     color: "#d97706" },
  { value: "in place",    label: "In place",    color: "#16a34a" },
];

// ── Main component ─────────────────────────────────────────────────────────────
export default function AccessibleEnvironmentsToolkitPage() {
  const [tab, setTab] = useState<Tab>("assess");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [activePriority, setActivePriority] = useState<Priority | "all">("all");
  const [activeOwner, setActiveOwner] = useState<Owner | "all">("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState<Record<string, ActionStatus>>({});
  const [assessment, setAssessment] = useState<Record<Category, AssessmentRating>>({
    "diverse-needs": "not started", physical: "not started", digital: "not started",
    communication: "not started", policies: "not started", feedback: "not started", culture: "not started",
  });
  const [openScenario, setOpenScenario] = useState<Category | null>(null);
  const [showQuickWinsOnly, setShowQuickWinsOnly] = useState(false);

  const assessmentComplete = Object.values(assessment).every((v) => v !== "not started");

  const visible = useMemo(() => {
    let pool = ITEMS;
    if (activeCategory !== "all") pool = pool.filter((i) => i.category === activeCategory);
    if (activePriority !== "all") pool = pool.filter((i) => i.priority === activePriority);
    if (activeOwner !== "all") pool = pool.filter((i) => i.owners.includes(activeOwner as Owner));
    if (showQuickWinsOnly) pool = pool.filter((i) => i.priority === "quick win");
    const s = search.toLowerCase();
    if (s) pool = pool.filter((i) => i.title.toLowerCase().includes(s) || i.what.toLowerCase().includes(s) || i.why.toLowerCase().includes(s));
    return pool;
  }, [activeCategory, activePriority, activeOwner, search, showQuickWinsOnly]);

  const prioritisedItems = useMemo(() => {
    const gapCategories = (Object.entries(assessment) as [Category, AssessmentRating][])
      .filter(([, v]) => v === "not started").map(([k]) => k);
    const partialCategories = (Object.entries(assessment) as [Category, AssessmentRating][])
      .filter(([, v]) => v === "partial").map(([k]) => k);
    return ITEMS.filter((i) => gapCategories.includes(i.category) || partialCategories.includes(i.category))
      .sort((a, b) => {
        const pOrder = { "quick win": 0, "planned": 1, "ongoing": 2 };
        const catOrderA = gapCategories.includes(a.category) ? 0 : 1;
        const catOrderB = gapCategories.includes(b.category) ? 0 : 1;
        return catOrderA - catOrderB || pOrder[a.priority] - pOrder[b.priority];
      });
  }, [assessment]);

  const doneCount = Object.values(actionStatus).filter((s) => s === "done").length;
  const inProgressCount = Object.values(actionStatus).filter((s) => s === "in progress").length;
  const progressPct = ITEMS.length > 0 ? Math.round((doneCount / ITEMS.length) * 100) : 0;

  const catProgress = (cat: Category) => {
    const items = ITEMS.filter((i) => i.category === cat);
    const done = items.filter((i) => actionStatus[i.id] === "done").length;
    return { done, total: items.length };
  };

  const totalTracked = ITEMS.filter((i) => actionStatus[i.id]).length;

  const cycleStatus = (id: string) => setActionStatus((prev) => {
    const cur = prev[id] || "not started";
    const next: ActionStatus = cur === "not started" ? "in progress" : cur === "in progress" ? "done" : "not started";
    return { ...prev, [id]: next };
  });

  const chipStyle = (active: boolean, small = false): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: "0.3rem",
    padding: small ? "0.3rem 0.65rem" : "0.4rem 0.85rem", borderRadius: "999px",
    border: active ? "1.5px solid var(--sage-dark)" : "1.5px solid var(--gray-border)",
    background: active ? "var(--sage-dark)" : "var(--white)",
    color: active ? "var(--white)" : "var(--charcoal)",
    fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: small ? "0.72rem" : "0.78rem",
    cursor: "pointer", whiteSpace: "nowrap" as const, transition: "all 0.15s ease",
    userSelect: "none" as const,
  });

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "0.5rem 1.1rem", borderRadius: "8px",
    border: active ? "2px solid var(--sage-dark)" : "2px solid transparent",
    background: active ? "var(--sage-dark)" : "transparent",
    color: active ? "var(--white)" : "var(--charcoal)",
    fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem",
    cursor: "pointer", transition: "all 0.15s",
  });

  const badgeStyle = (p: Priority): React.CSSProperties => {
    const c = PRIORITY_STYLE[p];
    return { display: "inline-flex", alignItems: "center", gap: "0.25rem", background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "0.15rem 0.5rem", borderRadius: "999px" };
  };

  const StatusBtn = ({ id }: { id: string }) => {
    const status = actionStatus[id];
    const s = STATUS_STYLE[status || "not started"];
    return (
      <button onClick={() => cycleStatus(id)} title="Cycle status"
        style={{ flexShrink: 0, width: "22px", height: "22px", borderRadius: "6px", border: `2px solid ${s.border}`, background: s.bg, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.7rem", fontWeight: 800, transition: "all 0.15s", marginTop: "0.15rem" }}>
        {status === "done" ? "✓" : status === "in progress" ? "→" : ""}
      </button>
    );
  };

  const ItemCard = ({ item, showCat = true }: { item: ToolkitItem; showCat?: boolean }) => {
    const isOpen = expanded === item.id;
    const cat = CATEGORIES.find((c) => c.key === item.category)!;
    const status = actionStatus[item.id];
    return (
      <div style={{ background: status === "done" ? "#f9fafb" : "var(--white)", border: "1.5px solid var(--gray-border)", borderRadius: "12px", overflow: "hidden", opacity: status === "done" ? 0.7 : 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", padding: "0.875rem 1rem", gap: "0.75rem" }}>
          <StatusBtn id={item.id} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "0.3rem", alignItems: "center" }}>
              <span style={badgeStyle(item.priority)}>{PRIORITY_ICON[item.priority]} {item.priority}</span>
              {showCat && <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "0.12rem 0.45rem", borderRadius: "999px" }}>{cat.icon} {cat.label}</span>}
              {status && <span style={{ display: "inline-flex", alignItems: "center", background: STATUS_STYLE[status].bg, border: `1px solid ${STATUS_STYLE[status].border}`, color: STATUS_STYLE[status].color, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "0.12rem 0.45rem", borderRadius: "999px" }}>{STATUS_STYLE[status].label}</span>}
            </div>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.875rem", color: "var(--charcoal)", margin: "0 0 0.15rem", lineHeight: 1.45, textDecoration: status === "done" ? "line-through" : "none" }}>{item.title}</p>
            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
              {item.owners.map((o) => {
                const oc = OWNER_STYLE[o];
                return <span key={o} style={{ display: "inline-flex", alignItems: "center", background: oc.bg, border: `1px solid ${oc.border}`, color: oc.color, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.58rem", letterSpacing: "0.06em", textTransform: "uppercase" as const, padding: "0.1rem 0.4rem", borderRadius: "999px" }}>{o}</span>;
              })}
            </div>
          </div>
          <button onClick={() => setExpanded(isOpen ? null : item.id)} style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", color: "var(--sage-dark)", fontSize: "0.65rem", fontWeight: 700, padding: "0.1rem 0 0 0.5rem", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</button>
        </div>
        {isOpen && (
          <div style={{ padding: "0 1rem 1rem", borderTop: "1px solid var(--gray-border)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ marginTop: "0.875rem" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--charcoal)", margin: "0 0 0.3rem" }}>What to do</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--charcoal)", lineHeight: 1.7, margin: 0 }}>{item.what}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
              <div style={{ background: "#fef9c3", border: "1px solid #fde047", borderRadius: "8px", padding: "0.7rem 0.875rem" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#713f12", margin: "0 0 0.3rem" }}>Why it matters</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#374151", lineHeight: 1.65, margin: 0 }}>{item.why}</p>
              </div>
              <div style={{ background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", borderRadius: "8px", padding: "0.7rem 0.875rem" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--sage-dark)", margin: "0 0 0.3rem" }}>How to start</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#374151", lineHeight: 1.65, margin: 0 }}>{item.how}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handlePrintQuickWins = () => {
    const qwItems = ITEMS.filter((i) => i.priority === "quick win");
    const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const rows = qwItems.map((item, idx) => {
      const cat = CATEGORIES.find((c) => c.key === item.category)!;
      return `<div style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #f3f4f6">
        <div style="display:flex;align-items:flex-start;gap:12px">
          <span style="flex-shrink:0;font-size:22px;font-weight:800;color:#d1d5db;font-family:serif;width:28px;line-height:1">${idx + 1}</span>
          <div style="flex:1">
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px">
              <span style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#15803d;background:#f0fdf4;border:1px solid #bbf7d0">⚡ Quick win</span>
              <span style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#374151;background:#f9fafb;border:1px solid #e5e7eb">${cat.icon} ${cat.label}</span>
            </div>
            <p style="font-size:14px;font-weight:700;color:#111827;margin:0 0 6px;line-height:1.45">${item.title}</p>
            <p style="font-size:12px;color:#374151;line-height:1.65;margin:0 0 6px">${item.what}</p>
            <div style="background:#f9fafb;border-left:3px solid #2D5A3C;padding:8px 12px;margin-top:8px;border-radius:0 6px 6px 0">
              <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#2D5A3C;margin:0 0 3px">How to start</p>
              <p style="font-size:12px;color:#374151;line-height:1.6;margin:0">${item.how}</p>
            </div>
            <p style="font-size:11px;color:#9ca3af;margin:8px 0 0">Owner${item.owners.length > 1 ? "s" : ""}: ${item.owners.join(", ")}</p>
          </div>
        </div>
      </div>`;
    }).join("");
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Accessible Environments: Quick Wins</title>
    <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#111827;background:#fff;padding:40px}@media print{body{padding:0}.no-print{display:none!important}}</style></head>
    <body><button class="no-print" onclick="window.print()" style="display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:#2D5A3C;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;margin-bottom:24px">🖨️ Print or save as PDF</button>
    <div style="padding-bottom:20px;border-bottom:3px solid #2D5A3C;margin-bottom:24px">
      <h1 style="font-size:20px;font-weight:800;color:#2D5A3C;margin-bottom:4px">Accessible Environments: Quick Wins</h1>
      <p style="font-size:12px;color:#6b7280">The Inclusion Edit · theinclusionedit.com · Generated ${date}</p>
      <p style="font-size:12px;color:#6b7280;margin-top:2px">${qwItems.length} actions you can start this week</p>
    </div>${rows}
    <div style="margin-top:24px;padding:12px 16px;background:#f0fdf4;border:1px solid #86efac;border-radius:8px;font-size:11px;color:#166534;line-height:1.6">
      Quick wins are starting points, not endpoints. Pair them with longer-term structural change. The best accessibility work is done with disabled employees, not for them.
    </div></body></html>`;
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); }
  };

  const handlePrintActionPlan = () => {
    const inProgressItems = ITEMS.filter((i) => actionStatus[i.id] === "in progress");
    const notStartedItems = ITEMS.filter((i) => !actionStatus[i.id] || actionStatus[i.id] === "not started");
    const doneItems = ITEMS.filter((i) => actionStatus[i.id] === "done");
    const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const renderSection = (title: string, items: ToolkitItem[], accent: string) => items.length === 0 ? "" : `
      <h2 style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;margin:24px 0 12px">${title}</h2>
      ${items.map((item) => {
        const cat = CATEGORIES.find((c) => c.key === item.category)!;
        return `<div style="margin-bottom:12px;padding:12px 14px;background:#f9fafb;border-left:3px solid ${accent};border-radius:0 8px 8px 0">
          <p style="font-size:13px;font-weight:700;color:#111827;margin:0 0 3px">${item.title}</p>
          <p style="font-size:11px;color:#6b7280;margin:0">${cat.icon} ${cat.label} · Owner${item.owners.length > 1 ? "s" : ""}: ${item.owners.join(", ")}</p>
        </div>`;
      }).join("")}`;
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Accessibility Action Plan</title>
    <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#111827;background:#fff;padding:40px}@media print{body{padding:0}.no-print{display:none!important}}</style></head>
    <body><button class="no-print" onclick="window.print()" style="display:inline-flex;align-items:center;gap:6px;padding:10px 20px;background:#2D5A3C;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;margin-bottom:24px">🖨️ Print or save as PDF</button>
    <div style="padding-bottom:20px;border-bottom:3px solid #2D5A3C;margin-bottom:8px">
      <h1 style="font-size:20px;font-weight:800;color:#2D5A3C;margin-bottom:4px">Accessibility Action Plan</h1>
      <p style="font-size:12px;color:#6b7280">The Inclusion Edit · theinclusionedit.com · Generated ${date}</p>
      <p style="font-size:12px;color:#6b7280;margin-top:2px">${doneCount} of ${ITEMS.length} actions complete (${progressPct}%)</p>
    </div>
    ${renderSection("In progress", inProgressItems, "#d97706")}
    ${renderSection("Not yet started", notStartedItems, "#9ca3af")}
    ${renderSection("Completed", doneItems, "#16a34a")}
    </body></html>`;
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); }
  };

  const OWNERS_LIST: Owner[] = ["HR", "Facilities", "IT", "Line managers", "Communications"];

  return (
    <div className="min-h-screen" style={{ background: "var(--sage-xlight)" }}>
      <PlatformNav />

      <nav style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "0 1.5rem", height: "64px", display: "flex", alignItems: "center", gap: "1.5rem", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/dashboard/apply" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none" }}>← Apply</Link>
        <span style={{ color: "var(--gray-border)" }}>|</span>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)" }}>Accessible Environments Toolkit</span>
      </nav>

      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--gray-border)", padding: "2rem 1.5rem 1.5rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.75rem" }}>♿</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", background: "var(--sage-xlight)", border: "1px solid var(--sage-light)", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>🛠️ Toolkit</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>Accessible Environments Toolkit</h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "640px", margin: "0 0 0.4rem" }}>
            Practical actions for making your physical, digital, and cultural environment more accessible. Designed to support organisations, schools, and charities in removing physical, digital, and cultural barriers across seven areas.
          </p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", fontSize: "0.85rem", lineHeight: 1.6, maxWidth: "640px", margin: "0 0 1.25rem" }}>
            Start with the self-assessment to identify your gaps, build your action plan, and track progress over time.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button onClick={() => setTab("assess")} style={tabStyle(tab === "assess")}>🔍 Self-assessment</button>
            <button onClick={() => setTab("browse")} style={tabStyle(tab === "browse")}>📚 Action library</button>
            <button onClick={() => setTab("tracker")} style={tabStyle(tab === "tracker")}>
              ✅ Progress tracker {doneCount > 0 && <span style={{ marginLeft: "0.35rem", background: "rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0 5px", fontSize: "0.7rem" }}>{doneCount}/{ITEMS.length}</span>}
            </button>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>

        {/* ── SELF-ASSESSMENT TAB ── */}
        {tab === "assess" && (
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--gray-soft)", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: "600px" }}>
              Rate your organisation's current state across all seven areas. Your ratings generate a prioritised action plan tailored to your gaps.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
              {CATEGORIES.map((cat) => {
                const rating = assessment[cat.key];
                const isOpen = openScenario === cat.key;
                const progress = catProgress(cat.key);
                return (
                  <div key={cat.key} style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "14px", overflow: "hidden" }}>
                    <div style={{ padding: "1.125rem 1.25rem" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "0.875rem" }}>
                        <span style={{ fontSize: "1.3rem", flexShrink: 0, lineHeight: 1, marginTop: "0.1rem" }}>{cat.icon}</span>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", margin: "0 0 0.2rem" }}>{cat.label}</p>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", margin: 0, lineHeight: 1.55 }}>{cat.desc}</p>
                        </div>
                        {progress.done > 0 && (
                          <span style={{ flexShrink: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.7rem", color: "#15803d", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "999px", padding: "0.2rem 0.55rem" }}>
                            {progress.done}/{progress.total} done
                          </span>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                        {ASSESSMENT_OPTIONS.map((opt) => {
                          const active = rating === opt.value;
                          return (
                            <button key={opt.value} onClick={() => setAssessment((prev) => ({ ...prev, [cat.key]: opt.value }))}
                              style={{ padding: "0.4rem 0.9rem", borderRadius: "8px", border: active ? `2px solid ${opt.color}` : "1.5px solid var(--gray-border)", background: active ? `${opt.color}18` : "var(--white)", color: active ? opt.color : "var(--gray-soft)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.75rem", cursor: "pointer", transition: "all 0.15s" }}>
                              {opt.value === "not started" ? "⬜ Not started" : opt.value === "partial" ? "🟡 Partial" : "✅ In place"}
                            </button>
                          );
                        })}
                      </div>
                      <button onClick={() => setOpenScenario(isOpen ? null : cat.key)}
                        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--sage-dark)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.72rem", padding: 0 }}>
                        <span style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", fontSize: "0.6rem" }}>▼</span>
                        {isOpen ? "Hide context" : "Why this area matters"}
                      </button>
                    </div>
                    {isOpen && (
                      <div style={{ padding: "0 1.25rem 1.125rem", borderTop: "1px solid var(--gray-border)" }}>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--charcoal)", lineHeight: 1.75, margin: "1rem 0 0", fontStyle: "italic" }}>{cat.scenario}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {assessmentComplete && (
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--charcoal)", margin: 0 }}>
                    Your prioritised action plan
                    <span style={{ marginLeft: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--gray-soft)", fontWeight: 400 }}>
                      {prioritisedItems.length} actions based on your ratings
                    </span>
                  </h2>
                </div>
                {prioritisedItems.length === 0 ? (
                  <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "14px", padding: "2rem", textAlign: "center" }}>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", marginBottom: "0.4rem" }}>Everything is in place</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--gray-soft)", margin: 0 }}>You have rated all areas as in place. Use the action library and tracker tabs to maintain and evidence your progress.</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    {prioritisedItems.map((item) => <ItemCard key={item.id} item={item} />)}
                  </div>
                )}
              </div>
            )}
            {!assessmentComplete && (
              <div style={{ background: "var(--white)", border: "1.5px dashed var(--gray-border)", borderRadius: "14px", padding: "2rem", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--gray-soft)", margin: 0 }}>Rate all seven areas above to generate your prioritised action plan.</p>
              </div>
            )}
          </div>
        )}

        {/* ── BROWSE TAB ── */}
        {tab === "browse" && (
          <div>
            <div style={{ background: showQuickWinsOnly ? "var(--sage-dark)" : "var(--white)", border: showQuickWinsOnly ? "none" : "1px solid var(--gray-border)", borderRadius: "12px", padding: "0.875rem 1.125rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" as const }}>
              <div>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: showQuickWinsOnly ? "var(--white)" : "var(--charcoal)", margin: "0 0 0.2rem" }}>⚡ {ITEMS.filter(i => i.priority === "quick win").length} quick wins available</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: showQuickWinsOnly ? "rgba(255,255,255,0.75)" : "var(--gray-soft)", margin: 0 }}>Actions you can start this week. Printable as a one-page handout for HR leads or management teams.</p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                <button onClick={() => setShowQuickWinsOnly(!showQuickWinsOnly)} style={{ padding: "0.45rem 1rem", borderRadius: "8px", border: showQuickWinsOnly ? "2px solid rgba(255,255,255,0.4)" : "1.5px solid var(--gray-border)", background: showQuickWinsOnly ? "rgba(255,255,255,0.15)" : "var(--white)", color: showQuickWinsOnly ? "var(--white)" : "var(--charcoal)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer" }}>
                  {showQuickWinsOnly ? "Show all" : "Filter to quick wins"}
                </button>
                <button onClick={handlePrintQuickWins} style={{ padding: "0.45rem 1rem", borderRadius: "8px", border: "none", background: showQuickWinsOnly ? "rgba(255,255,255,0.2)" : "var(--sage-dark)", color: "var(--white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer" }}>
                  🖨️ Print handout
                </button>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.5rem" }}>
              <button onClick={() => setActiveCategory("all")} style={chipStyle(activeCategory === "all", true)}>All areas</button>
              {CATEGORIES.map((c) => <button key={c.key} onClick={() => setActiveCategory(c.key)} style={chipStyle(activeCategory === c.key, true)}>{c.icon} {c.label}</button>)}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.5rem" }}>
              <button onClick={() => setActivePriority("all")} style={chipStyle(activePriority === "all", true)}>All priorities</button>
              {(["quick win", "planned", "ongoing"] as Priority[]).map((p) => <button key={p} onClick={() => setActivePriority(p)} style={chipStyle(activePriority === p, true)}>{PRIORITY_ICON[p]} {p}</button>)}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
              <button onClick={() => setActiveOwner("all")} style={chipStyle(activeOwner === "all", true)}>All owners</button>
              {OWNERS_LIST.map((o) => <button key={o} onClick={() => setActiveOwner(o)} style={chipStyle(activeOwner === o, true)}>{o}</button>)}
            </div>

            <div style={{ position: "relative", maxWidth: "480px", marginBottom: "1rem" }}>
              <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--gray-soft)", fontSize: "0.9rem" }}>🔍</span>
              <input type="search" placeholder="Search actions…" value={search} onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", padding: "0.65rem 2.2rem 0.65rem 2.4rem", borderRadius: "10px", border: "1.5px solid var(--gray-border)", fontFamily: "var(--font-body)", fontSize: "0.875rem", background: "var(--white)", color: "var(--charcoal)", outline: "none", boxSizing: "border-box" as const }} />
              {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray-soft)" }}>✕</button>}
            </div>

            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", marginBottom: "0.875rem" }}>
              {visible.length} action{visible.length !== 1 ? "s" : ""}{showQuickWinsOnly ? " (quick wins only)" : ""}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {visible.map((item) => <ItemCard key={item.id} item={item} showCat={activeCategory === "all"} />)}
              {visible.length === 0 && (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <p style={{ fontFamily: "var(--font-body)", color: "var(--gray-soft)", marginBottom: "1rem" }}>No actions match your current filters.</p>
                  <button onClick={() => { setSearch(""); setActiveCategory("all"); setActivePriority("all"); setActiveOwner("all"); setShowQuickWinsOnly(false); }}
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "var(--sage-dark)", background: "var(--sage-xlight)", border: "1.5px solid var(--sage-light)", borderRadius: "999px", padding: "0.55rem 1.25rem", cursor: "pointer" }}>
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TRACKER TAB ── */}
        {tab === "tracker" && (
          <div>
            <div style={{ background: "var(--white)", border: "1px solid var(--gray-border)", borderRadius: "14px", padding: "1.25rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "0.875rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--charcoal)", margin: "0 0 0.15rem" }}>Overall progress</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-soft)", margin: 0 }}>{doneCount} of {ITEMS.length} actions complete · {inProgressCount} in progress</p>
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.75rem", color: progressPct === 100 ? "#15803d" : "var(--charcoal)", lineHeight: 1 }}>{progressPct}%</span>
              </div>
              <div style={{ height: "8px", background: "var(--gray-border)", borderRadius: "999px", overflow: "hidden", marginBottom: "1.25rem" }}>
                <div style={{ height: "100%", width: `${progressPct}%`, background: progressPct === 100 ? "#16a34a" : "var(--sage-dark)", borderRadius: "999px", transition: "width 0.4s ease" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "0.625rem" }}>
                {CATEGORIES.map((cat) => {
                  const p = catProgress(cat.key);
                  const pct = Math.round((p.done / p.total) * 100);
                  return (
                    <div key={cat.key} style={{ background: "var(--sage-xlight)", borderRadius: "10px", padding: "0.75rem 0.875rem" }}>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--gray-soft)", margin: "0 0 0.25rem" }}>{cat.icon} {cat.label}</p>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: pct === 100 ? "#15803d" : "var(--charcoal)", margin: "0 0 0.4rem" }}>{p.done}/{p.total}</p>
                      <div style={{ height: "4px", background: "var(--gray-border)", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#16a34a" : "var(--sage-dark)", borderRadius: "999px" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {(["in progress", "not started", "done"] as ActionStatus[]).map((status) => {
              const sItems = ITEMS.filter((i) => (actionStatus[i.id] || "not started") === status);
              if (status === "not started" && sItems.length === ITEMS.length) return null;
              return (
                <div key={status} style={{ marginBottom: "1.5rem" }}>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.08em", color: STATUS_STYLE[status].color, margin: "0 0 0.75rem" }}>
                    {status === "in progress" ? `→ In progress (${sItems.length})` : status === "done" ? `✓ Completed (${sItems.length})` : `◯ Not yet started (${sItems.length})`}
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {sItems.map((item) => {
                      const cat = CATEGORIES.find((c) => c.key === item.category)!;
                      return (
                        <div key={item.id} style={{ background: "var(--white)", border: `1.5px solid ${STATUS_STYLE[status].border}`, borderRadius: "10px", padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <StatusBtn id={item.id} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.84rem", color: "var(--charcoal)", margin: "0 0 0.15rem", textDecoration: status === "done" ? "line-through" : "none", opacity: status === "done" ? 0.5 : 1 }}>{item.title}</p>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "var(--gray-soft)", margin: 0 }}>{cat.icon} {cat.label} · {PRIORITY_ICON[item.priority]} {item.priority} · {item.owners.join(", ")}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {totalTracked === 0 && (
              <div style={{ background: "var(--white)", border: "1.5px dashed var(--gray-border)", borderRadius: "14px", padding: "2.5rem", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)", margin: "0 0 0.5rem" }}>Nothing tracked yet</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--gray-soft)", margin: "0 0 1.25rem" }}>Use the status button on any action in the library or your action plan to mark it as in progress or done.</p>
                <button onClick={() => setTab("browse")} style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", color: "var(--sage-dark)", background: "var(--sage-xlight)", border: "1.5px solid var(--sage-light)", borderRadius: "999px", padding: "0.55rem 1.25rem", cursor: "pointer" }}>Browse action library →</button>
              </div>
            )}

            {totalTracked > 0 && (
              <button onClick={handlePrintActionPlan} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1.25rem", borderRadius: "10px", border: "none", background: "var(--sage-dark)", color: "var(--white)", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", marginTop: "0.5rem" }}>
                🖨️ Export action plan
              </button>
            )}
          </div>
        )}
      </main>
      <BottomBanner />
    </div>
  );
}
