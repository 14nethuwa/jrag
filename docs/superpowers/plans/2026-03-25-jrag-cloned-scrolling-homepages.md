# JRAG Cloned Scrolling Homepages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder `Professionnels` and `Particuliers` pages with one shared close clone of the referenced scrolling homepage while leaving the split landing page untouched.

**Architecture:** Build one reusable cloned-homepage feature module that owns media, section composition, and scroll behavior, then render it from both audience routes. Keep the visible experience close to the reference, but rebuild interactions with lightweight Next.js, CSS, and targeted client scroll logic instead of porting the original legacy theme stack.

**Tech Stack:** Next.js App Router, React, TypeScript, global CSS, native HTML video, minimal client-side scroll hooks, ESLint, Next production build

---

## File map

### Existing files to modify

- Modify: `app/(public)/professionnels/page.tsx` - replace placeholder with cloned homepage wrapper
- Modify: `app/(public)/particuliers/page.tsx` - replace placeholder with cloned homepage wrapper
- Modify: `app/(public)/layout.tsx` - remove boxed placeholder chrome only if it blocks the full-bleed clone pages
- Modify: `app/globals.css` - add shared tokens, base resets, and clone-specific global support styles only if they belong at app-wide level

### New files to create

- Create: `public/media/scrollytelling.mp4` - runtime video asset copied from `C:\Users\Sami\Downloads\scrollytelling.mp4`
- Create: `docs/superpowers/notes/2026-03-25-jrag-clone-target.md` - locked chapter mapping and asset inventory for the clone target
- Create: `components/cloned-homepage/cloned-homepage.tsx` - shared page entry component
- Create: `components/cloned-homepage/cloned-homepage-shell.tsx` - overall layout shell, overlays, and full-screen sections
- Create: `components/cloned-homepage/cloned-homepage-video.tsx` - background video and fallback handling
- Create: `components/cloned-homepage/cloned-homepage-sections.tsx` - ordered section composition for the clone
- Create: `components/cloned-homepage/use-cloned-homepage-scroll.ts` - minimal client scroll behavior for pinned/reveal effects that CSS alone cannot cover
- Create: `components/cloned-homepage/cloned-homepage.css` - isolated styles for the clone

### Optional files to create if verification needs stronger coverage

- Create: `components/cloned-homepage/cloned-homepage.test.tsx` - render smoke test if a lightweight React test setup is added during implementation

## Reference material to keep open while implementing

- Spec: `docs/superpowers/specs/2026-03-25-jrag-cloned-scrolling-homepages-design.md`
- Source bundle: `C:\Users\Sami\Downloads\Code`
- Motion/video reference: `C:\Users\Sami\Downloads\scrollytelling.mp4`

## Clone chapter inventory

Do not assume a fixed number of chapters before the source audit is complete.

The exact chapter count, labels, source beats, text positions, and required assets must be derived during Task 0 from:

- `C:\Users\Sami\Downloads\Code`
- `C:\Users\Sami\Downloads\scrollytelling.mp4`

That audited chapter list becomes the source of truth for all later implementation tasks.

## Task 0: Audit source assets and lock the clone target

**Files:**
- Create: `public/media/scrollytelling.mp4`
- Create: `public/cloned-homepage/` directory as needed for copied source assets
- Create: `docs/superpowers/notes/2026-03-25-jrag-clone-target.md`
- Modify: `docs/superpowers/plans/2026-03-25-jrag-cloned-scrolling-homepages.md` only if the asset inventory reveals a hard blocker that must be recorded before proceeding

- [ ] **Step 1: Inventory the reference assets actually needed for visual parity**

Inspect `C:\Users\Sami\Downloads\Code` for homepage assets referenced by the source, including:
- images
- logos
- masks
- decorative SVGs
- fonts if the clone depends on bundled local font files
- scripts only if a visible effect cannot be rebuilt without understanding the source markup

Run one inventory command such as:

```bash
rg --no-heading --line-number "\.webp|\.png|\.jpg|\.jpeg|\.svg|\.woff|\.woff2|\.mp4" "C:\Users\Sami\Downloads\Code"
```

Expected: you know exactly which non-video assets are required before coding the page.

- [ ] **Step 2: Copy required runtime assets into `public/cloned-homepage/`**

Create a destination folder and copy only the assets the clone actually needs.

Example:

```bash
mkdir "C:\Users\Sami\Website\JRAG\public\cloned-homepage"
copy "C:\Users\Sami\Downloads\Code\some-required-asset.webp" "C:\Users\Sami\Website\JRAG\public\cloned-homepage\some-required-asset.webp"
```

Expected: the app can render from repo-local assets only.

- [ ] **Step 3: Freeze the chapter-to-reference mapping before writing JSX**

Using the source HTML and the MP4, write the locked mapping to `docs/superpowers/notes/2026-03-25-jrag-clone-target.md`.

Use this structure:

```md
# JRAG clone target

## Asset inventory
- `public/cloned-homepage/...`

## Chapter mapping
[ordered list based on the audited source]
- `chapter-slug` - [source beat], [text position], [asset filenames]
```

Expected: no JSX is written until the section order and asset list are explicit and persisted in a checked-in note.

- [ ] **Step 4: Copy the reference MP4 into the runtime path**

Run:

```bash
copy "C:\Users\Sami\Downloads\scrollytelling.mp4" "C:\Users\Sami\Website\JRAG\public\media\scrollytelling.mp4"
```

Expected: the main background media exists in the repo.

- [ ] **Step 5: Stop and surface blockers if the source depends on missing assets**

If the source clone requires assets that are not present in `C:\Users\Sami\Downloads\Code` or cannot be copied into the app, stop and document that blocker before moving on.

- [ ] **Step 6: Commit the runtime asset import pass**

```bash
git add public/media/scrollytelling.mp4 public/cloned-homepage docs/superpowers/notes/2026-03-25-jrag-clone-target.md
git commit -m "chore: import cloned homepage source assets"
```

## Task 1: Replace placeholders with route wrappers

**Files:**
- Modify: `app/(public)/professionnels/page.tsx`
- Modify: `app/(public)/particuliers/page.tsx`
- Create: `components/cloned-homepage/cloned-homepage.tsx`

- [ ] **Step 1: Read the current route placeholders and confirm the split landing is out of scope**

Read:
- `app/(public)/page.tsx`
- `app/(public)/professionnels/page.tsx`
- `app/(public)/particuliers/page.tsx`

Expected: `app/(public)/page.tsx` stays unchanged; both audience pages are simple placeholders.

- [ ] **Step 2: Write the shared cloned homepage entry component**

Create `components/cloned-homepage/cloned-homepage.tsx`:

```tsx
import { ClonedHomepageShell } from '@/components/cloned-homepage/cloned-homepage-shell'

type ClonedHomepageProps = {
  audience: 'professionnels' | 'particuliers'
}

export function ClonedHomepage({ audience }: ClonedHomepageProps) {
  return <ClonedHomepageShell audience={audience} />
}
```

- [ ] **Step 3: Replace the `Professionnels` placeholder**

Update `app/(public)/professionnels/page.tsx`:

```tsx
import { ClonedHomepage } from '@/components/cloned-homepage/cloned-homepage'

export default function ProfessionnelsPage() {
  return <ClonedHomepage audience="professionnels" />
}
```

- [ ] **Step 4: Replace the `Particuliers` placeholder**

Update `app/(public)/particuliers/page.tsx`:

```tsx
import { ClonedHomepage } from '@/components/cloned-homepage/cloned-homepage'

export default function ParticuliersPage() {
  return <ClonedHomepage audience="particuliers" />
}
```

- [ ] **Step 5: Verify both route files type-check conceptually**

Run: `npm run lint`

Expected: route imports resolve or only fail on not-yet-created files from later tasks.

- [ ] **Step 6: Commit the route-wrapper scaffold**

```bash
git add app/(public)/professionnels/page.tsx app/(public)/particuliers/page.tsx components/cloned-homepage/cloned-homepage.tsx
git commit -m "feat: scaffold cloned public homepage routes"
```

## Task 2: Build the shared shell and media layer

**Files:**
- Create: `components/cloned-homepage/cloned-homepage-shell.tsx`
- Create: `components/cloned-homepage/cloned-homepage-video.tsx`
- Create: `components/cloned-homepage/cloned-homepage.css`

- [ ] **Step 1: Create the video component with a safe fallback**

Create `components/cloned-homepage/cloned-homepage-video.tsx`:

```tsx
'use client'

import { useState } from 'react'

export function ClonedHomepageVideo() {
  const [videoReady, setVideoReady] = useState(false)

  return (
    <div className="cloned-homepage__media" aria-hidden="true">
      <video
        className="cloned-homepage__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setVideoReady(true)}
        onError={() => setVideoReady(false)}
      >
        <source src="/media/scrollytelling.mp4" type="video/mp4" />
      </video>
      <div className="cloned-homepage__media-fallback" data-visible={!videoReady} />
    </div>
  )
}
```

- [ ] **Step 2: Create the full-page shell**

Create `components/cloned-homepage/cloned-homepage-shell.tsx`:

```tsx
import { ClonedHomepageVideo } from '@/components/cloned-homepage/cloned-homepage-video'
import { ClonedHomepageSections } from '@/components/cloned-homepage/cloned-homepage-sections'
import '@/components/cloned-homepage/cloned-homepage.css'

type ClonedHomepageShellProps = {
  audience: 'professionnels' | 'particuliers'
}

export function ClonedHomepageShell({ audience }: ClonedHomepageShellProps) {
  return (
    <main className="cloned-homepage">
      <ClonedHomepageVideo />
      <ClonedHomepageSections audience={audience} />
    </main>
  )
}
```

- [ ] **Step 3: Add first-pass full-bleed styling**

Create `components/cloned-homepage/cloned-homepage.css` with the basic shell, for example:

```css
.cloned-homepage {
  position: relative;
  min-height: 100vh;
  color: #fff;
  background: #050505;
  overflow: clip;
}

.cloned-homepage__media {
  position: fixed;
  inset: 0;
  z-index: 0;
}

.cloned-homepage__video,
.cloned-homepage__media-fallback {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cloned-homepage__media-fallback {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(5, 5, 5, 0.18), rgba(5, 5, 5, 0.82)),
    radial-gradient(circle at top, rgba(255, 255, 255, 0.14), transparent 42%),
    #0b0b0b;
  opacity: 0;
  transition: opacity 180ms ease;
}

.cloned-homepage__media-fallback[data-visible='true'] {
  opacity: 1;
}
```

- [ ] **Step 4: Run lint to catch structural issues before section work**

Run: `npm run lint`

Expected: only section import gaps remain, or lint passes if stubs already exist.

- [ ] **Step 5: Commit the shell and media layer**

```bash
git add components/cloned-homepage/cloned-homepage-shell.tsx components/cloned-homepage/cloned-homepage-video.tsx components/cloned-homepage/cloned-homepage.css
git commit -m "feat: add cloned homepage shell and video layer"
```

## Task 3: Recreate the long-scroll section structure

**Files:**
- Create: `components/cloned-homepage/cloned-homepage-sections.tsx`
- Modify: `components/cloned-homepage/cloned-homepage.css`
- Modify: `components/cloned-homepage/cloned-homepage-shell.tsx`

- [ ] **Step 1: Outline the source page into visible chapters before coding**

Use the local reference sources to enumerate the visible beats that must appear in order, using the audited chapter inventory recorded in `docs/superpowers/notes/2026-03-25-jrag-clone-target.md`.

Read `docs/superpowers/notes/2026-03-25-jrag-clone-target.md` and use that checked-in chapter mapping as the source of truth.

Expected: the sequence is derived from the reference, not invented from scratch, and later implementers can follow the same frozen map.

- [ ] **Step 2: Create the section composition component**

Create `components/cloned-homepage/cloned-homepage-sections.tsx`:

```tsx
type ClonedHomepageSectionsProps = {
  audience: 'professionnels' | 'particuliers'
}

const sections = chapterDefinitions.map((chapter) => chapter.slug)

export function ClonedHomepageSections({ audience }: ClonedHomepageSectionsProps) {
  return (
    <div className="cloned-homepage__content" data-audience={audience}>
      {sections.map((section) => (
        <section key={section} className={`cloned-homepage__section cloned-homepage__section--${section}`}>
          <div className="cloned-homepage__inner">{section}</div>
        </section>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Replace placeholder labels with reference-driven content blocks**

Expand each section from plain text into the actual clone composition: layered headings, supporting copy, overlay labels, image/video masks, and CTA positions that match the source page's rhythm. Use assets copied into `public/cloned-homepage/` wherever the source requires non-video visuals.

Every section must trace back to an audited chapter in `docs/superpowers/notes/2026-03-25-jrag-clone-target.md`; do not invent, merge, or omit chapters unless that note is updated first.

Use a repeated section shape where possible:

```tsx
<section className="cloned-homepage__section cloned-homepage__section--hero">
  <div className="cloned-homepage__eyebrow">...</div>
  <h1 className="cloned-homepage__title">...</h1>
  <p className="cloned-homepage__lede">...</p>
</section>
```

- [ ] **Step 4: Add section-by-section spacing and layering styles**

Extend `components/cloned-homepage/cloned-homepage.css` so each chapter has:
- viewport-based min heights
- controlled text widths
- z-index layering above the video
- desktop and mobile variants

Expected: scrolling through the page already resembles the source page structurally even before advanced motion.

- [ ] **Step 5: Run the app and compare the static structure against the source**

Run: `npm run dev`

Manual check:
- open `/professionnels`
- open `/particuliers`
- confirm both pages share the same structure
- confirm `/` still shows the untouched split landing placeholder

- [ ] **Step 6: Commit the cloned section structure**

```bash
git add components/cloned-homepage/cloned-homepage-sections.tsx components/cloned-homepage/cloned-homepage-shell.tsx components/cloned-homepage/cloned-homepage.css
git commit -m "feat: recreate cloned scrolling homepage structure"
```

## Task 4: Add targeted scroll behavior for the defining moments

**Files:**
- Create: `components/cloned-homepage/use-cloned-homepage-scroll.ts`
- Modify: `components/cloned-homepage/cloned-homepage-shell.tsx`
- Modify: `components/cloned-homepage/cloned-homepage-sections.tsx`
- Modify: `components/cloned-homepage/cloned-homepage.css`

- [ ] **Step 1: Identify only the effects that require JavaScript**

From the reference, write down which moments truly need scroll state, such as:
- pinned title hold
- opacity reveal on entering a chapter
- slight translate/parallax for a layered block

Expected: do not re-implement the entire legacy script bundle.

- [ ] **Step 2: Create a minimal scroll hook**

Create `components/cloned-homepage/use-cloned-homepage-scroll.ts`:

```tsx
'use client'

import { useEffect } from 'react'

export function useClonedHomepageScroll() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-clone-section]'))

    const onScroll = () => {
      const viewportHeight = window.innerHeight

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const progress = 1 - Math.min(Math.max(rect.top / viewportHeight, 0), 1)
        section.style.setProperty('--section-progress', progress.toFixed(3))
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
}
```

- [ ] **Step 3: Wire the hook into a small client boundary**

If `cloned-homepage-shell.tsx` remains server-rendered, add a small client wrapper or convert only the minimal shell layer that needs the hook.

Expected pattern:

```tsx
'use client'

useClonedHomepageScroll()
```

- [ ] **Step 4: Attach scroll-driven CSS transforms to the marked sections**

Update the section markup to include `data-clone-section` and add CSS using `--section-progress`, for example:

```css
.cloned-homepage__section {
  opacity: calc(0.35 + (var(--section-progress, 0) * 0.65));
  transform: translate3d(0, calc(40px - (var(--section-progress, 0) * 40px)), 0);
}
```

- [ ] **Step 5: Verify the motion remains smooth on desktop and acceptable on mobile**

Manual check in browser devtools:
- desktop viewport
- mobile viewport
- confirm no section jitter, unreadable overlap, or scroll lock issues

- [ ] **Step 6: Commit the motion pass**

```bash
git add components/cloned-homepage/use-cloned-homepage-scroll.ts components/cloned-homepage/cloned-homepage-shell.tsx components/cloned-homepage/cloned-homepage-sections.tsx components/cloned-homepage/cloned-homepage.css
git commit -m "feat: add cloned homepage scroll interactions"
```

## Task 5: Remove layout blockers and finish verification

**Files:**
- Modify: `app/(public)/layout.tsx`
- Modify: `app/globals.css`
- Modify: `components/cloned-homepage/cloned-homepage.css`

- [ ] **Step 1: Check whether the shared public layout blocks the full-bleed clone**

Read `app/(public)/layout.tsx` and compare it against the rendered result.

If the current header, footer, or centered wrapper compresses the clone, replace that layout with a minimal public shell that allows route content to own the viewport while keeping the split landing working.

Do not remove the landing page shell for `/`.

- [ ] **Step 2: Apply the smallest layout change that frees the clone pages**

Target shape:

```tsx
// Preserve the current shell for '/'
// Bypass the centered wrapper and placeholder chrome only for
// '/professionnels' and '/particuliers'
```

Implementation options, in order:
- route-aware public layout logic that keeps `/` unchanged and renders clone routes full-bleed
- clone-route-specific class hooks that allow the clone to break out without visually changing `/`
- route-group or layout-boundary restructuring only if the first two options cannot preserve `/` while freeing the clone routes

Only use a blanket bare-children layout if you separately preserve the current landing-page presentation for `/`.

- [ ] **Step 3: Add any final global resets required for the clone pages**

Use `app/globals.css` only for truly app-wide concerns, such as:

```css
html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
}

body {
  background: #000;
}
```

- [ ] **Step 4: Run final verification commands**

Run:
- `npm run lint`
- `npm run build`

Expected: both commands pass.

- [ ] **Step 5: Manually verify the user-facing acceptance criteria and fallback paths**

Check all of the following:
- `/` is unchanged
- `/professionnels` renders the clone
- `/particuliers` renders the same clone
- video loads from `/media/scrollytelling.mp4`
- desktop layout feels close to the reference
- mobile layout remains readable and usable
- when the MP4 is temporarily unavailable or autoplay is blocked, the fallback background still leaves text readable
- when JS-driven motion is unavailable, the page still scrolls and reads in document order

- [ ] **Step 6: Commit the final integration pass**

```bash
git add app/(public)/layout.tsx app/globals.css components/cloned-homepage/cloned-homepage.css
git commit -m "feat: finalize cloned scrolling public homepages"
```

## Notes for the implementer

- Keep `app/(public)/page.tsx` unchanged.
- Favor visible parity over internal parity with the WordPress source.
- Do not introduce brand adaptation in this pass.
- If the video file is too large for the repo or causes playback issues, stop and surface that as a constraint instead of silently changing to image sequences.
- If a lightweight test runner already exists by implementation time, add a smoke test for the shared clone component; otherwise rely on lint, build, and manual route verification for this pass.
