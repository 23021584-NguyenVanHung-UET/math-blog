---
name: Math Blog
description: Blog toán học cá nhân — Bài tập, Lý thuyết, và AI & ML
colors:
  indigo-primary: "#4f46e5"
  violet-accent: "#7c3aed"
  emerald-baitap: "#10b981"
  orange-aiml: "#f97316"
  light-bg: "#ffffff"
  light-surface: "#f9fafb"
  light-text: "#111827"
  light-text-muted: "#6b7280"
  light-border: "#e5e7eb"
  dark-bg: "#0b1120"
  dark-surface: "#111827"
  dark-text: "#f9fafb"
  dark-text-muted: "#9ca3af"
  dark-border: "#1f2937"
  dark-card: "#1f2937"
typography:
  display:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  code:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.indigo-primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "6px 16px"
  card-post:
    backgroundColor: "{colors.light-bg}"
    textColor: "{colors.light-text}"
    rounded: "{rounded.lg}"
    padding: "20px"
  chip-tag:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-text-muted}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
---

# Design System: Math Blog

## 1. Overview

**Creative North Star: "The Clear Blackboard"**

A well-organized blackboard where every formula is written neatly, every proof follows a logical structure, and nothing distracts from understanding. The interface serves the mathematics — clean, structured, and confident. It rejects visual noise in favor of typographic clarity and deliberate use of color.

The system is built on restraint: indigo as the single accent, category colors as functional identifiers (not decoration), and generous whitespace that lets complex mathematical formulas breathe. Dark mode is a first-class citizen because students and developers read at night.

**Key Characteristics:**
- Typography-first: math formulas (KaTeX) and prose must be supremely readable
- Category color-coding is functional, not decorative (emerald = exercises, violet = theory, orange = AI/ML)
- Indigo accent used sparingly — links, active states, the ∑ logo
- No shadows at rest; surfaces separated by subtle borders and background tints

## 2. Colors

A restrained palette: indigo primary with three functional category colors. Neutral backgrounds shift between pure white and deep navy for light/dark modes.

### Primary
- **Indigo Core** (#4f46e5): The single accent. Navigation highlights, links, active states, the ∑ logo mark, reading progress gradient start. Used on less than 10% of any screen.

### Secondary
- **Violet Accent** (#7c3aed): Reading progress gradient midpoint. Theory category accent on card left borders. Secondary to indigo, never standalone.

### Tertiary
- **Emerald Exercise** (#10b981): Left-border accent on exercise (bài-tập) post cards. Category badge tint.
- **Orange AI/ML** (#f97316): Left-border accent on AI & ML post cards. Category badge tint.

### Neutral
- **Paper White** (#ffffff): Light mode body and card background. Clean, no warmth.
- **Cool Gray Surface** (#f9fafb): Light mode secondary surface — tag chips, input backgrounds, alternate rows.
- **Ink Black** (#111827): Light mode primary text. Strong contrast for formula readability.
- **Muted Gray** (#6b7280): Light mode secondary text — dates, metadata, tag labels.
- **Deep Navy** (#0b1120): Dark mode body background. Not pure black; enough warmth to reduce eye strain.
- **Slate Card** (#1f2937): Dark mode card and surface background.

**The One Accent Rule.** Indigo is the only color that carries meaning beyond category identification. If a new element needs color, it gets indigo or it gets no color at all.

## 3. Typography

**Display/Body Font:** Geist (with system sans-serif fallback)
**Code Font:** Geist Mono (with system monospace fallback)

**Character:** A technical sans-serif pairing that feels modern and engineering-grade. The geometric clarity of Geist pairs naturally with mathematical notation. Mono variant handles code blocks and inline code with consistent metrics.

### Hierarchy
- **Display** (700, clamp(1.75rem, 4vw, 2.5rem), 1.2): Post titles, hero headings. Bold enough to anchor the page.
- **Title** (700, 1.125rem / text-lg, 1.4): Post card headings, section titles.
- **Body** (400, 1rem, 1.75): Article prose. Line height of 1.75 for comfortable long-form reading. Max width capped at 65ch via the prose container.
- **Label** (500, 0.75rem, tracking-wide): Category badges, tag chips, metadata. Uppercase only in badges.
- **Code** (400, 0.875rem, 1.6): Shiki-highlighted code blocks with github-dark theme. Inline code inherits body size.

**The Readability Rule.** KaTeX formulas must maintain ≥4.5:1 contrast in both modes. The `.dark .katex { color: #e5e7eb; }` override exists for this reason. Never remove it.

## 4. Elevation

This system is flat by default. Depth is conveyed through background tinting and subtle borders, not shadows.

Cards use a 1px border in `var(--border)` to define edges. Hover state adds a soft shadow (`shadow-lg shadow-indigo-500/5`) as the only elevation change — shadows appear only as response to interaction, never at rest.

**The Flat-By-Default Rule.** No element has a shadow at rest. Shadows are earned through interaction (hover, focus). If something needs visual separation from its background, use a border or a background tint.

## 5. Components

### Buttons
- **Shape:** Rounded corners (0.5rem / rounded-lg)
- **Primary:** Indigo background (#4f46e5), white text, 6px 16px padding. Used for auth, submit, and CTA actions.
- **Hover:** Opacity reduction (hover:opacity-90). No transform, no shadow.
- **Ghost/Outline:** Border in --border color, transparent background. Used for secondary actions (share, bookmark when inactive).

### Chips (Tags)
- **Style:** Cool gray surface background, muted text, rounded-md. Compact padding (2px 8px).
- **Hover:** Text shifts to indigo. No background change.
- **Selected (bookmark active):** Indigo border, indigo-50 background tint.

### Cards (Post Cards)
- **Corner Style:** Rounded-xl (1rem)
- **Background:** var(--card-bg)
- **Border:** 1px solid var(--border), with 4px left border in category color (emerald/violet/orange)
- **Hover:** translateY(-0.5px) + shadow-lg with indigo-500/5 tint. Heading text shifts to indigo.
- **Internal Padding:** 20px (p-5)

### Inputs
- **Style:** 1px border in --border, card-bg background, rounded-lg
- **Focus:** Border shifts to indigo-500, 1px ring in indigo-500. No glow, no animation.

### Navigation (Header)
- **Style:** Sticky top-0, blurred backdrop (backdrop-blur-md), 95% opacity background
- **Links:** Text-sm font-medium. Active state: indigo-50 bg tint + indigo-700 text (light) or indigo-900/30 bg + indigo-300 text (dark).
- **Mobile:** Full-width dropdown below header with same link styles. Hamburger toggle.
- **Logo:** 32px indigo square with ∑ symbol, shadow-sm with indigo tint.

### Reading Progress Bar
- **Style:** Fixed top-0, 3px height, gradient from indigo → violet → pink (#4f46e5 → #7c3aed → #ec4899)
- **z-index:** 100, above header

## 6. Do's and Don'ts

### Do:
- **Do** maintain ≥4.5:1 contrast on all text, including KaTeX formulas in dark mode
- **Do** use left-border color on post cards as the only category color indicator
- **Do** use indigo as the single interactive accent color throughout
- **Do** cap article prose width at 65ch for comfortable reading
- **Do** test all changes in both light and dark mode

### Don't:
- **Don't** use animations or transitions that distract from reading mathematical content
- **Don't** add shadows to resting elements — flat surfaces with borders only
- **Don't** create cheat-sheet-style layouts with dense grids of formulas and no explanation
- **Don't** use flashy gradients, neon colors, or glassmorphism effects
- **Don't** use meme-style imagery or overly casual copy — this is an academic resource
- **Don't** nest cards inside cards
- **Don't** add more than one accent color family beyond the category identifiers
