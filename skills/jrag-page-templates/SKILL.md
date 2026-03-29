# JRAG Page Templates

**Problem this skill solves:** With 60+ pages to build, frontend dev needs reusable patterns to avoid reinventing layouts.

**When to invoke:** Before starting a new page. When designing page templates with design lead.

## Overview

JRAG uses 5 repeating page templates. Every new page fits into one of these patterns.

## The 5 Templates

### Template 1: Story Page

**Used for:** Homepage hero, about pages, origin stories, terroir content

**Pattern:**
```
┌─────────────────────────┐
│   Full-width image      │ (50-100% of viewport height)
│   (parallax optional)   │
└─────────────────────────┘

┌─────────────────────────┐
│ Centered text overlay   │ (Quicksand headline + Lato subhead)
│ or beside image         │
└─────────────────────────┘

┌─────────────────────────┐
│ Spacious white space    │ (80px+ padding)
│ supporting imagery      │
└─────────────────────────┘
```

**Design:**
- Full-width hero image (1200px+ wide, 600-800px tall)
- Centered text overlay OR beside image
- Quicksand headline (48-56px bold)
- Lato subhead (24-32px, 400 weight)
- Parallax or fade-up animation on scroll
- No secondary CTAs, just atmospheric

**Code Pattern (Frontend Dev):**
```typescript
'use client'
import ParallaxIntroSection from '@/components/parallax-intro-section'

export default function StoryPage() {
  return (
    <main>
      <ParallaxIntroSection
        title="Our Origin"
        subtitle="Dakhla, Morocco"
        imagePath="/images/hero-dakhla.jpg"
      />
      {/* Secondary content... */}
    </main>
  )
}
```

**Examples:** Homepage hero, About page, "À Propos" intro

---

### Template 2: Proof Page

**Used for:** Product specs, certifications, logistics, B2B fact sheets

**Pattern:**
```
┌─────────────────────────┐
│ Tight grid of blocks    │ (2-3 columns)
│ Label + Value pairs     │
└─────────────────────────┘
```

**Design:**
- 2-3 equal columns on desktop, 1 column on mobile
- Each block: label (Roboto Condensed 12px) + value (Roboto Condensed 16px bold)
- No images (or minimal background images)
- High contrast, industrial clarity
- Tight spacing (12-20px gap between blocks)
- No animation (boring is the point)

**Content Examples:**
```
ORIGIN              | GRADE    | SALINITY
Dakhla, Morocco     | T4       | 34.5 ppt
─────────────────────────────────────────
HARVEST DATE        | SHELF    | STORAGE
Feb 15, 2026        | 14 days  | 4°C only
```

**Code Pattern:**
```typescript
interface SpecBlock {
  label: string
  value: string | number
}

export default function SpecGrid({ specs }: { specs: SpecBlock[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {specs.map(({ label, value }) => (
        <div key={label}>
          <div className="text-xs font-bold text-ink uppercase">{label}</div>
          <div className="text-lg font-bold text-sand">{value}</div>
        </div>
      ))}
    </div>
  )
}
```

**Examples:** Professionnels Produits page, Certifications page, Logistics info

---

### Template 3: Route Page

**Used for:** Navigation waypoints, audience choice, next steps

**Pattern:**
```
┌──────────┐  ┌──────────┐  ┌──────────┐
│  Card 1  │  │  Card 2  │  │  Card 3  │
│  CTA     │  │  CTA     │  │  CTA     │
└──────────┘  └──────────┘  └──────────┘
```

**Design:**
- 2-3 equal-width cards or buttons
- Large, tappable (min 48px height on mobile)
- Clear CTA copy per option (not "Option 1", but "Explore Professionnels")
- High contrast background (sand or orange)
- Text centered
- No secondary content

**Code Pattern:**
```typescript
interface RouteCard {
  label: string
  href: string
  color: 'orange' | 'sand'
}

export default function RouteGrid({ routes }: { routes: RouteCard[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
      {routes.map(({ label, href, color }) => (
        <Link
          key={href}
          href={href}
          className={`py-12 px-6 text-center text-xl font-bold
            ${color === 'orange' ? 'bg-orange text-ink' : 'bg-sand text-ink'}
          `}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}
```

**Examples:** Homepage "Choose Your Journey", Professionnels nav

---

### Template 4: Metric Page

**Used for:** Stats, counts, operational data, proof numbers

**Pattern:**
```
┌───────┐  ┌───────┐  ┌───────┐
│ 250   │  │  15   │  │   5   │
│ Tons  │  │ Years │  │Certs  │
└───────┘  └───────┘  └───────┘
```

**Design:**
- 4-6 metrics per section, arranged horizontally
- Large bold number (Quicksand 48-64px bold)
- Supportive label below (Roboto Condensed 14px)
- Counter animation on scroll (optional, nice-to-have)
- Minimal visual decoration

**Code Pattern:**
```typescript
interface Metric {
  number: number | string
  label: string
}

export default function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-6 gap-8 text-center">
      {metrics.map(({ number, label }) => (
        <div key={label}>
          <div className="font-quicksand text-5xl font-bold text-orange">
            {number}
          </div>
          <div className="mt-2 font-roboto-condensed text-sm text-sand">
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}
```

**Examples:** Homepage "Our Stats", B2B capability page

---

### Template 5: Editorial Page

**Used for:** Blog, recipes, guides, long-form content

**Pattern:**
```
┌──────────────────────────┐
│                          │ (600-750px max width)
│  Long-form text column   │ (Readable line-height 1.7+)
│                          │ (Inline images, pull-quotes)
│                          │
└──────────────────────────┘
```

**Design:**
- Single column, 600-750px max width (readability)
- Large line-height (1.7-2.0)
- Roboto Condensed 16px for body text
- Inline images (50-100% of column width)
- Pull-quotes in italics, indented
- Simple, clean, focused on text

**Code Pattern:**
```typescript
export default function RecipePage() {
  return (
    <article className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-quicksand text-4xl font-bold">Recipe Title</h1>
      
      <img src="/recipe.jpg" alt="Recipe" className="w-full" />
      
      <section>
        <h2 className="font-lato text-2xl font-bold">Ingredients</h2>
        <ul className="ml-4 space-y-1 list-disc">
          {/* Ingredients */}
        </ul>
      </section>
      
      <section>
        <h2 className="font-lato text-2xl font-bold">Instructions</h2>
        <ol className="ml-4 space-y-3 list-decimal">
          {/* Steps */}
        </ol>
      </section>
    </article>
  )
}
```

**Examples:** Recipe pages, Blog posts, "Recettes & Conseils"

---

## Template Selection Matrix

| Page | Archetype | Template | Why |
|------|-----------|----------|-----|
| Homepage hero | Noble | Story | Image-led, emotional |
| Professionnels landing | Rigorous | Proof | Specs, certifications, facts |
| Particuliers landing | Noble | Story | Inspiration, product beauty |
| Audience choice | Route | Route | Clear next step |
| Product specs (B2B) | Rigorous | Proof | Structured data |
| Product showcase (B2C) | Noble | Story | Beautiful images |
| Our stats | Metric | Metric | Numbers, proof |
| Recipe | Editorial | Editorial | Long-form, instructional |

---

## Component Reusability

### Shared Components (Use These)

All components in `components/` are reusable. When frontend dev builds a new page, they should:

1. Check if a component already exists in `components/`
2. Reuse if it fits (ParallaxIntroSection, MetricGrid, etc.)
3. Only build new if the page genuinely needs something custom

### Create New Component When:

- Page needs a component that will be used 2+ times (across pages)
- Existing components don't fit the layout
- Design lead specifically requests a custom layout

### Document When Creating New Component:

```typescript
/**
 * HeroBlock — Full-width hero with image and overlay text
 * 
 * Used on: Product pages, landing pages
 * Archetypes: Noble (story, emotional)
 * Props: title, subtitle, imageUrl, animationType
 */
export default function HeroBlock({ ... }) { ... }
```

---

## When Selecting a Template

Ask design lead + CEO:

1. **What archetype is this page?** (Noble? Rigorous? Both?)
2. **What's the primary content?** (Image? Facts? Story? Numbers?)
3. **What does the user do next?** (CTA determines template choice)
4. **Do we reuse this layout elsewhere?** (If yes, make it a template component)

---

**Invoke with:** "What template should I use for [page name]?"  
**Owned by:** Frontend Dev + Design Lead  
**Affects:** All pages and their implementation
