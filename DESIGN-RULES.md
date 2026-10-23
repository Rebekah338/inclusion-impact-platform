# The Inclusion Edit — Impact Platform Design Rules

These rules must be preserved across ALL edits. Check this file before changing any of the items below.

---

## Typography

### Font variables (defined in globals.css — do not change)
| Variable | Used for |
|---|---|
| `var(--font-display)` | Hero headings, section titles |
| `var(--font-heading)` | Subheadings, labels, buttons, nav |
| `var(--font-body)` | Body copy, descriptions, paragraphs |

### Capitalisation rules
- **Hero main heading**: Title Case — `Your EDI Practice` / `Built To Last.`
- **Section headings (h2)**: Title Case — e.g. "Get Coaching From a Real Inclusion Expert"
- **Pill/badge labels**: ALL CAPS with letter-spacing — e.g. "MEMBERS ONLY", "REAL-LIFE EXPERT SUPPORT"
- **Button text**: Title Case — e.g. "Join Now", "Start Your Membership"
- **Nav links**: Title Case — e.g. "Watch Library", "Apply It"
- **Body copy**: Sentence case only

---

## Images

### Section-to-image mapping (DO NOT change these)
| Section | Image file | Path |
|---|---|---|
| Hero background | hero-people.jpg | `/hero-people.jpg` |
| Coaching section | coaching-people.jpg | `/coaching-people.jpg` |
| Watch library thumbnails | workshop.jpg, team-meeting.jpg, collaboration.jpg | `/workshop.jpg` etc. |
| Other section images | coaching.jpg, hero.jpg, hero-people.jpg | as needed |

All images live in `/public/` — paths are `/filename.jpg` (no `/images/` subfolder ever).

---

## Colours (CSS custom properties — defined in globals.css)
| Variable | Hex | Used for |
|---|---|---|
| `var(--sage-dark)` | #2A4A30 | Primary buttons, active states, borders |
| `var(--sage)` | #5C8360 | Secondary accents |
| `var(--sage-light)` | #A8D4B0 | Borders, highlights |
| `var(--sage-xlight)` | #F2F7F3 | Section backgrounds |
| `var(--charcoal)` | #1C2B1E | Headings, primary text |
| `var(--white)` | #FFFFFF | Backgrounds, reversed text |
| `var(--gray-border)` | #E2E8E4 | Borders, dividers |
| `var(--gray-soft)` | #6B7D6E | Body copy, secondary text |

---

## Search bar
- Border: `2px solid var(--sage-dark)`
- Box shadow: `0 4px 24px rgba(42,74,48,0.18)`
- Do not change to a lighter border colour

---

## Punctuation rules
- **NO em dashes (—) anywhere on the platform** — use a comma, colon, or rewrite the sentence
- En dashes (–) are allowed in number ranges only — e.g. "30–45 minutes"
- Hyphens (-) in compound words are fine — e.g. "award-winning"

---

## Mobile / responsive
- Hamburger menu appears at max-width 767px
- Nav links hide at max-width 767px (`className="hidden md:flex"`)
- All grids collapse to 1 or 2 columns below 900px (see media queries in page.tsx style block)
- Do not remove the `className` props from grid divs — they are needed for responsive CSS targeting

---

## Do not change without discussion
- Font variables in globals.css
- The hero image (`hero-people.jpg`)
- The coaching section image (`coaching-people.jpg`)
- The main hero heading text and capitalisation
- The colour palette variables
- The `<style>` block at the bottom of page.tsx (contains all responsive rules)
