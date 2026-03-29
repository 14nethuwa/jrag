# JRAG Home Oyster Scrollytelling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a true frame-sequence oyster scrollytelling experience at `/home` while keeping `/` as the split landing page and restoring `/professionnels` and `/particuliers` to simple placeholders.

**Architecture:** Create one dedicated scrollytelling feature module for `/home` with a data-driven chapter timeline, canvas-based frame renderer, pinned scroll progress engine, overlay layer, and development counter. Keep the rendering logic separate from narrative configuration so sequence assets, chapter timing, and overlay copy can evolve without rewriting the engine.

**Tech Stack:** Next.js App Router, React, TypeScript, canvas rendering, native browser scroll APIs, global CSS, feature-scoped CSS module(s), Node smoke scripts, ESLint, Next production build

---

## File map

### Existing files to modify

- Modify: `app/(public)/page.tsx` - keep split landing page unchanged and verify it stays untouched
- Modify: `app/(public)/professionnels/page.tsx` - keep as simple placeholder route
- Modify: `app/(public)/particuliers/page.tsx` - keep as simple placeholder route
- Modify: `app/(public)/layout.tsx` - only if `/home` needs route-safe full-bleed treatment without changing `/`
- Modify: `app/globals.css` - add only truly global resets needed by the scrollytelling route

### New files to create

- Create: `app/(public)/home/page.tsx` - route entry for `/home`
- Create: `components/home-scrollytelling/home-scrollytelling.tsx` - top-level page component for the `/home` experience
- Create: `components/home-scrollytelling/home-scrollytelling.module.css` - scoped styles for the route
- Create: `components/home-scrollytelling/home-sequence-canvas.tsx` - canvas renderer wrapper
- Create: `components/home-scrollytelling/home-timeline.ts` - chapter definitions, progress ranges, hold windows, labels, and overlay mapping
- Create: `components/home-scrollytelling/use-home-scroll-timeline.ts` - scroll progress normalization and pinned section math
- Create: `components/home-scrollytelling/use-sequence-preloader.ts` - controlled frame loading logic
- Create: `components/home-scrollytelling/home-overlay-layer.tsx` - editorial explanation boxes keyed to timeline progress
- Create: `components/home-scrollytelling/home-dev-counter.tsx` - dev-only progress/frame/chapter counter
- Create: `components/home-scrollytelling/home-fallback-poster.tsx` - static poster fallback scene
- Create: `public/home-scrollytelling/README.md` - expected asset layout for sequence frames and poster assets
- Create: `docs/superpowers/notes/2026-03-26-home-scrollytelling-asset-map.md` - implementation-time asset manifest, chapter ranges, and fallback trigger assumptions
- Create: `scripts/home-scrollytelling.test.mjs` - smoke checks for route wiring, timeline config, and asset assumptions

### Optional files if complexity grows during implementation

- Create: `components/home-scrollytelling/home-sequence-types.ts` - extracted types if timeline and renderer props become too large
- Create: `public/home-scrollytelling/poster.jpg` - fallback poster asset if a static scene is generated before the full sequence

## Reference material to keep open while implementing

- Spec: `docs/superpowers/specs/2026-03-26-jrag-oyster-scrollytelling-design.md`
- The seven required chapter ids from the spec:
  - `naissain`
  - `eclosion`
  - `croissance`
  - `purification`
  - `conditionnement`
  - `chaine-du-froid`
  - `a-table`
- Existing placeholder routes:
  - `app/(public)/page.tsx`
  - `app/(public)/professionnels/page.tsx`
  - `app/(public)/particuliers/page.tsx`

## Task 1: Set up `/home` route and preserve the split landing

**Files:**
- Create: `app/(public)/home/page.tsx`
- Modify: `app/(public)/page.tsx`
- Modify: `app/(public)/professionnels/page.tsx`
- Modify: `app/(public)/particuliers/page.tsx`

- [ ] **Step 1: Write a failing route smoke test for the required public page shape**

Create `scripts/home-scrollytelling.test.mjs` with an initial test that asserts file existence and file-content patterns only. This script should not try to execute `.tsx` route modules directly.

Assert:
- `app/(public)/page.tsx` still exists
- `app/(public)/home/page.tsx` exists
- `app/(public)/professionnels/page.tsx` exists
- `app/(public)/particuliers/page.tsx` exists

Example:

```js
import fs from 'node:fs'
import assert from 'node:assert/strict'

assert.equal(fs.existsSync('app/(public)/home/page.tsx'), true)
```

- [ ] **Step 2: Run the smoke test to verify it fails before the new route exists**

Run: `node scripts/home-scrollytelling.test.mjs`

Expected: FAIL because `app/(public)/home/page.tsx` does not exist yet.

- [ ] **Step 3: Create the `/home` route and preserve placeholders elsewhere**

Create `app/(public)/home/page.tsx`:

```tsx
import { HomeScrollytelling } from '@/components/home-scrollytelling/home-scrollytelling'

export default function HomePage() {
  return <HomeScrollytelling />
}
```

Keep `app/(public)/page.tsx` unchanged.

Ensure `app/(public)/professionnels/page.tsx` and `app/(public)/particuliers/page.tsx` are plain `PagePlaceholder` routes only.

Explicit requirement:
- remove any temporary scrollytelling or clone content if present
- final placeholder shape should match the simple scaffold style already in the repo
- no shared scrollytelling component import is allowed on those two routes

- [ ] **Step 4: Re-run the route smoke test**

Run: `node scripts/home-scrollytelling.test.mjs`

Expected: PASS on route/file existence checks.

- [ ] **Step 5: Commit the route setup**

```bash
git add app/(public)/home/page.tsx app/(public)/professionnels/page.tsx app/(public)/particuliers/page.tsx scripts/home-scrollytelling.test.mjs
git commit -m "feat: add home scrollytelling route scaffold"
```

## Task 2: Lock the chapter map and asset assumptions

**Files:**
- Create: `components/home-scrollytelling/home-timeline.ts`
- Create: `public/home-scrollytelling/README.md`
- Create: `docs/superpowers/notes/2026-03-26-home-scrollytelling-asset-map.md`
- Modify: `scripts/home-scrollytelling.test.mjs`

- [ ] **Step 1: Write a failing config test for the seven approved chapters**

Extend `scripts/home-scrollytelling.test.mjs` to assert, by file-content inspection, that `components/home-scrollytelling/home-timeline.ts` contains exactly these chapter ids in order:

```js
[
  'naissain',
  'eclosion',
  'croissance',
  'purification',
  'conditionnement',
  'chaine-du-froid',
  'a-table',
]
```

- [ ] **Step 2: Run the test and verify it fails before the timeline exists**

Run: `node scripts/home-scrollytelling.test.mjs`

Expected: FAIL because `home-timeline.ts` has not been created yet.

- [ ] **Step 3: Create the timeline config with explicit chapter windows**

Create `components/home-scrollytelling/home-timeline.ts` with exported data for all seven stages, including:
- `id`
- `label`
- `start`
- `end`
- `holdStart`
- `holdEnd`
- `overlayTitle`
- `overlayCopy`
- `visualIntent`
- `transitionNotes`

Example shape:

```ts
export const homeTimeline = [
  {
    id: 'naissain',
    label: 'Naissain',
    start: 0,
    end: 0.12,
    holdStart: 0.05,
    holdEnd: 0.08,
    overlayTitle: 'Naissain',
    overlayCopy: '...'
  },
]
```

- [ ] **Step 4: Create the checked-in asset map note and expected asset layout**

Create `docs/superpowers/notes/2026-03-26-home-scrollytelling-asset-map.md` documenting:
- the seven chapter ids
- intended frame ranges per chapter
- whether placeholder frames are acceptable initially
- fallback trigger assumption for planning (for example: missing asset manifest or explicit feature flag)

Create `public/home-scrollytelling/README.md` documenting expected runtime files, such as:
- `frames/frame_0001.jpg`
- `frames/frame_0002.jpg`
- `poster.jpg`
- optional low-res manifest if added later

- [ ] **Step 5: Re-run the config test**

Run: `node scripts/home-scrollytelling.test.mjs`

Expected: PASS on chapter ids and asset note existence.

- [ ] **Step 6: Commit the timeline and asset contract**

```bash
git add components/home-scrollytelling/home-timeline.ts public/home-scrollytelling/README.md docs/superpowers/notes/2026-03-26-home-scrollytelling-asset-map.md scripts/home-scrollytelling.test.mjs
git commit -m "feat: define home scrollytelling timeline contract"
```

## Task 3: Build the scroll engine, pinned stage, and canvas renderer

**Files:**
- Create: `components/home-scrollytelling/home-scrollytelling.tsx`
- Create: `components/home-scrollytelling/home-sequence-canvas.tsx`
- Create: `components/home-scrollytelling/use-home-scroll-timeline.ts`
- Create: `components/home-scrollytelling/home-scrollytelling.module.css`
- Modify: `scripts/home-scrollytelling.test.mjs`

- [ ] **Step 1: Write a failing smoke test for the renderer contract**

Extend `scripts/home-scrollytelling.test.mjs` to assert, by file-content inspection, that these files exist and contain the expected exported identifiers:
- `HomeScrollytelling`
- `useHomeScrollTimeline`

- [ ] **Step 2: Run the test and verify it fails**

Run: `node scripts/home-scrollytelling.test.mjs`

Expected: FAIL because the renderer files do not exist yet.

- [ ] **Step 3: Create the normalized scroll hook**

Create `components/home-scrollytelling/use-home-scroll-timeline.ts` with a hook that returns:
- normalized `progress`
- active chapter id
- active frame index placeholder
- pinned container measurements

Example shape:

```ts
export function useHomeScrollTimeline() {
  return {
    progress,
    activeChapter,
    activeFrame,
  }
}
```

- [ ] **Step 4: Define the deterministic frame source contract**

Create a frame-source contract inside `components/home-scrollytelling/home-timeline.ts` or a nearby helper that makes it unambiguous how frame assets are addressed.

Example shape:

```ts
export const homeSequenceConfig = {
  frameCount: 210,
  getFramePath(index: number) {
    return `/home-scrollytelling/frames/frame_${String(index + 1).padStart(4, '0')}.jpg`
  },
}
```

The goal is to remove guesswork between scroll progress, frame index, and runtime asset path.

- [ ] **Step 5: Create the canvas renderer wrapper**

Create `components/home-scrollytelling/home-sequence-canvas.tsx` with:
- `canvas` element
- device-pixel-ratio sizing
- draw callback based on current frame index
- no baked-in chapter content

- [ ] **Step 6: Create the top-level `/home` page component and stage styles**

Create `components/home-scrollytelling/home-scrollytelling.tsx` to assemble:
- pinned stage wrapper
- canvas renderer
- overlay layer placeholder
- dev counter placeholder
- fallback poster placeholder

Add the scoped layout in `components/home-scrollytelling/home-scrollytelling.module.css`.

- [ ] **Step 7: Re-run the smoke test**

Run: `node scripts/home-scrollytelling.test.mjs`

Expected: PASS on renderer contract checks.

- [ ] **Step 8: Commit the core engine scaffold**

```bash
git add components/home-scrollytelling/home-scrollytelling.tsx components/home-scrollytelling/home-sequence-canvas.tsx components/home-scrollytelling/use-home-scroll-timeline.ts components/home-scrollytelling/home-scrollytelling.module.css scripts/home-scrollytelling.test.mjs
git commit -m "feat: scaffold home scrollytelling engine"
```

## Task 4: Add controlled frame loading and static fallback poster

**Files:**
- Create: `components/home-scrollytelling/use-sequence-preloader.ts`
- Create: `components/home-scrollytelling/home-fallback-poster.tsx`
- Modify: `components/home-scrollytelling/home-sequence-canvas.tsx`
- Modify: `components/home-scrollytelling/home-scrollytelling.tsx`
- Modify: `components/home-scrollytelling/home-timeline.ts`
- Modify: `scripts/home-scrollytelling.test.mjs`

- [ ] **Step 1: Write a failing test for fallback and asset assumptions**

Extend `scripts/home-scrollytelling.test.mjs` to assert by file-content inspection:
- fallback component file exists
- preloader hook file exists
- asset map note mentions the fallback trigger assumption

- [ ] **Step 2: Run the test and verify it fails**

Run: `node scripts/home-scrollytelling.test.mjs`

Expected: FAIL because the fallback pieces do not exist yet.

- [ ] **Step 3: Create the sequence preloader hook**

Create `components/home-scrollytelling/use-sequence-preloader.ts` with logic to:
- accept a frame manifest or frame count
- preload a controlled window of frames around the active frame
- expose loading state
- avoid eager-loading every frame at once

- [ ] **Step 4: Wire scroll progress to exact frame selection**

Update the renderer flow so the happy path is explicit:
- normalized scroll progress
- current chapter range
- frame index selection from progress and frame count
- preloaded image lookup
- canvas draw of the current image

This must result in a functioning scrubbed sequence, not just scaffolded placeholders.

- [ ] **Step 5: Create the fallback poster component**

Create `components/home-scrollytelling/home-fallback-poster.tsx` that renders a static scenic composition with space for overlays when:
- the asset manifest is missing
- the sequence is not yet ready
- the route is running in explicit fallback mode

- [ ] **Step 6: Wire fallback visibility into the top-level page component**

Use the fallback poster in `components/home-scrollytelling/home-scrollytelling.tsx` and keep it separate from the sequence renderer.

- [ ] **Step 7: Re-run the fallback smoke test**

Run: `node scripts/home-scrollytelling.test.mjs`

Expected: PASS on fallback contract checks.

- [ ] **Step 8: Commit loading and fallback support**

```bash
git add components/home-scrollytelling/use-sequence-preloader.ts components/home-scrollytelling/home-fallback-poster.tsx components/home-scrollytelling/home-sequence-canvas.tsx components/home-scrollytelling/home-scrollytelling.tsx scripts/home-scrollytelling.test.mjs
git commit -m "feat: add home sequence loading and fallback poster"
```

## Task 5: Add timeline-driven overlays and the development counter

**Files:**
- Create: `components/home-scrollytelling/home-overlay-layer.tsx`
- Create: `components/home-scrollytelling/home-dev-counter.tsx`
- Modify: `components/home-scrollytelling/home-scrollytelling.tsx`
- Modify: `components/home-scrollytelling/home-scrollytelling.module.css`
- Modify: `scripts/home-scrollytelling.test.mjs`

- [ ] **Step 1: Write a failing test for instrumentation and overlay files**

Extend `scripts/home-scrollytelling.test.mjs` to assert by file-content inspection:
- overlay layer exists
- dev counter exists
- the timeline includes hold window fields for all chapters

- [ ] **Step 2: Run the test and verify it fails**

Run: `node scripts/home-scrollytelling.test.mjs`

Expected: FAIL because the overlay and counter files do not exist yet.

- [ ] **Step 3: Create the overlay layer component**

Create `components/home-scrollytelling/home-overlay-layer.tsx` to:
- receive normalized progress and active chapter
- render editorial panels based on chapter ranges
- show concise content without owning scroll logic

- [ ] **Step 4: Create the dev counter component**

Create `components/home-scrollytelling/home-dev-counter.tsx` to display:
- progress percentage
- active chapter label
- frame index or frame range
- optional checkpoint marker

Gate it behind a simple runtime condition such as:
- query param
- feature flag
- or explicit development mode

- [ ] **Step 5: Wire both components into the top-level page**

Render overlay and counter from `components/home-scrollytelling/home-scrollytelling.tsx` using timeline state from the hook.

- [ ] **Step 6: Re-run the instrumentation smoke test**

Run: `node scripts/home-scrollytelling.test.mjs`

Expected: PASS on overlay, counter, and timeline-hold checks.

- [ ] **Step 7: Commit overlay and dev tooling**

```bash
git add components/home-scrollytelling/home-overlay-layer.tsx components/home-scrollytelling/home-dev-counter.tsx components/home-scrollytelling/home-scrollytelling.tsx components/home-scrollytelling/home-scrollytelling.module.css scripts/home-scrollytelling.test.mjs
git commit -m "feat: add home scrollytelling overlays and dev counter"
```

## Task 6: Integrate route-safe full-bleed rendering and verify public routes

**Files:**
- Modify: `app/(public)/layout.tsx`
- Modify: `app/globals.css`
- Modify: `scripts/home-scrollytelling.test.mjs`

- [ ] **Step 1: Write a failing route-layout smoke check for `/home`**

Extend `scripts/home-scrollytelling.test.mjs` with file-existence and file-content assertions that verify:
- `/home` route file exists
- `/` route file remains present
- placeholders still exist for `/professionnels` and `/particuliers`
- if route-frame logic is introduced, `/home` is the only scrollytelling route

Do not attempt browser rendering from this smoke script.

- [ ] **Step 2: Run the test and verify it fails if layout support is missing**

Run: `node scripts/home-scrollytelling.test.mjs`

Expected: FAIL only if route-safe layout support still needs implementation.

- [ ] **Step 3: Apply the smallest layout change needed for `/home`**

If `app/(public)/layout.tsx` blocks full-bleed rendering, make it route-aware for `/home` only.

Do not change `/` visually.
Do not introduce scrollytelling behavior on `/professionnels` or `/particuliers`.

- [ ] **Step 4: Add only necessary global resets**

Use `app/globals.css` only for app-wide concerns such as:

```css
html,
body {
  margin: 0;
  min-height: 100%;
}
```

Keep scrollytelling-specific styling out of globals where possible.

- [ ] **Step 5: Re-run the route-layout smoke test**

Run: `node scripts/home-scrollytelling.test.mjs`

Expected: PASS on `/`, `/home`, and placeholder route assumptions.

- [ ] **Step 6: Commit route integration**

```bash
git add app/(public)/layout.tsx app/globals.css scripts/home-scrollytelling.test.mjs
git commit -m "feat: integrate home scrollytelling route safely"
```

## Task 7: Run final verification and document remaining asset gaps

**Files:**
- Modify: `docs/superpowers/notes/2026-03-26-home-scrollytelling-asset-map.md`
- Modify: `scripts/home-scrollytelling.test.mjs`

- [ ] **Step 1: Add final smoke coverage for the implemented contract**

Ensure `scripts/home-scrollytelling.test.mjs` checks at minimum:
- `/home` route exists
- timeline contains seven ordered chapters
- overlay and counter components exist
- fallback component exists
- asset map note exists

- [ ] **Step 2: Run smoke verification**

Run: `node scripts/home-scrollytelling.test.mjs`

Expected: PASS with a clear success message.

- [ ] **Step 3: Run linter and production build**

Run:
- `npm run lint`
- `npm run build`

Expected: both pass.

- [ ] **Step 4: Manually verify public-route acceptance criteria**

Check all of the following:
- `/` still shows the split landing placeholder
- `/home` renders the scrollytelling route
- `/professionnels` is a simple placeholder
- `/particuliers` is a simple placeholder
- the dev counter can be shown and hidden as intended
- fallback poster behavior works when sequence assets are unavailable
- chapter transitions occur at the intended progress points from `components/home-scrollytelling/home-timeline.ts`
- hold windows leave enough time for overlays to be read comfortably
- desktop viewport remains usable
- mobile viewport remains usable

- [ ] **Step 5: Update the asset note with remaining production needs**

Record what still remains after engine implementation, such as:
- final generated frame delivery
- final poster asset
- exact frame count
- mobile performance tuning if needed

- [ ] **Step 6: Commit the verified implementation pass**

```bash
git add docs/superpowers/notes/2026-03-26-home-scrollytelling-asset-map.md scripts/home-scrollytelling.test.mjs
git commit -m "feat: finalize home scrollytelling foundation"
```

## Notes for the implementer

- Keep `/` unchanged.
- `/home` is the only scrollytelling route.
- `/professionnels` and `/particuliers` stay as simple placeholders for now.
- Use a static poster fallback, not a secondary video system.
- Keep the chapter model data-driven.
- Treat placeholder sequence assets as acceptable for the first engine pass if final generated frames are not ready yet.
- Do not bundle unrelated JRAG copy or route redesign into this work.
