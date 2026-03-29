# JRAG cloned scrolling homepages design

## Overview

This spec covers a first-pass clone of the referenced scrolling homepage experience into the JRAG Next.js site.

The goal is not to redesign or brand-adapt the experience yet. The goal is to reproduce the source homepage feel as faithfully as possible inside JRAG's route structure so the user can review the cloned experience in-app before a later adaptation phase.

The source artifact for this work is the local reference bundle at `C:\Users\Sami\Downloads\Code`, with the primary moving-reference asset provided separately as `C:\Users\Sami\Downloads\scrollytelling.mp4`. For planning and implementation, these local files are the source of truth for clone parity.

## Scope

In scope:

- leave the split landing page unchanged
- clone the referenced scrolling homepage into `app/(public)/professionnels/page.tsx`
- clone the same scrolling homepage into `app/(public)/particuliers/page.tsx`
- use `C:\Users\Sami\Downloads\scrollytelling.mp4` as the background video asset for the cloned experience
- share as much implementation as practical between the two audience pages

Out of scope:

- changing `app/(public)/page.tsx`
- adapting the clone to JRAG brand copy, layout logic, or section strategy
- building distinct B2B and B2C content differences in this pass
- recreating every legacy plugin dependency from the source WordPress theme if simpler Next.js-native equivalents can produce the same visible result

## User-approved direction

The user chose these constraints during brainstorming:

- use the source homepage as a close clone target
- keep the split landing page as a placeholder and do not modify it
- do not adapt the experience yet; just clone it for now
- use the provided MP4 as the background media rather than exporting it to images unless performance later forces a change

## Page architecture

The cloned experience will live behind the existing public split landing page.

- `app/(public)/page.tsx` remains untouched
- `app/(public)/professionnels/page.tsx` renders the cloned scrolling homepage
- `app/(public)/particuliers/page.tsx` renders the same cloned scrolling homepage

To avoid duplicating a large page tree, the clone should be implemented through a shared module or component set that both routes consume.

Recommended structure:

- shared cloned page component in `components/` or a route-local shared module
- small route wrappers in each page file
- route-specific page metadata only if needed later

## Visual and interaction target

The implementation target is visual and experiential parity with the source homepage, not parity with its original CMS or plugin stack.

The clone should preserve, as closely as practical:

- the long-form scrolling structure
- the sequencing and pacing of reveals
- the dramatic editorial layout rhythm
- the background media treatment
- any key layered, pinned, or parallax-feeling moments that define the source experience

The implementation may simplify internals if the visible result remains faithful.

## Media handling

The background media source for the clone is:

- `C:\Users\Sami\Downloads\scrollytelling.mp4`

Initial media decision:

- use the MP4 directly in the clone
- prefer standard video playback over image-sequence rendering in this phase
- only revisit image export later if performance, compression artifacts, or frame-accurate scroll control become blocking issues

Asset handling assumption for planning:

- the MP4 should be copied into the JRAG app as a normal app asset, most likely under `public/`, so the cloned routes can load it through Next.js at runtime
- implementation should not rely on the original Downloads path during runtime
- if the asset is too large or otherwise unsuitable for repository storage, that should be surfaced during implementation as a follow-up constraint rather than silently changing the design

## Component boundaries

Even though the visible result is a close clone, the code should still be split into understandable pieces.

Recommended boundaries:

- page shell: overall wrapper, background media, and scroll context
- section blocks: each major scrolling section or visual chapter
- shared decorative primitives: overlays, labels, buttons, lines, counters, or other recurring motifs if the source uses them repeatedly
- motion helpers: any small utilities needed for scroll-triggered state or reveal behavior

This keeps the clone maintainable while preserving the exact front-end target.

## Motion strategy

Because the source appears to rely on a large legacy JS stack, motion should be rebuilt using the lightest approach that can preserve the same visible effect.

Priority order:

1. CSS for static styling, layering, and simple transitions
2. native browser behavior for video and layout where possible
3. targeted client-side scroll logic only for effects that truly depend on scroll position

The implementation should not attempt to port the original theme's entire script bundle. It should recreate only the behaviors needed for the cloned pages.

## Public layout implications

The current public layout is scaffold-level placeholder UI. The clone may require bypassing or replacing portions of that placeholder shell so the scrolling pages can render full-bleed and uninterrupted.

The intended result is:

- split landing page remains untouched at the route level
- cloned scrolling pages are allowed to feel immersive rather than boxed into the current placeholder container

If needed, shared public layout chrome can be adjusted only insofar as required to let the clone display correctly.

Planning assumption: any public layout changes should be treated as minimal incidental support work, not as a redesign of the shared landing experience.

## Responsive behavior

The clone should work on desktop and mobile.

Desktop priority:

- preserve the full cinematic structure and layered composition

Mobile priority:

- preserve the same visual story in a simplified stacked flow where necessary
- keep video and heavy layering performant enough to remain usable
- avoid broken pinning or overlapping content that blocks reading

Exact motion parity on mobile is less important than preserving the same recognizable experience.

## Error handling and fallbacks

The page should degrade safely if the background video cannot autoplay or load.

Minimum fallback expectations:

- video element does not crash rendering if asset is unavailable
- content remains readable over a static poster-like background state or first frame
- layout remains navigable without JS-dependent motion

## Testing and verification

Implementation planning should assume these checks are needed after coding:

- lint the project
- run a production build
- manually review `Professionnels` and `Particuliers` routes in browser
- verify the split landing route is unchanged
- verify desktop and mobile layouts remain readable and usable

## Success criteria

This work is successful when:

- the split landing page remains unchanged
- both audience routes show the cloned scrolling homepage experience
- the two audience routes share one core implementation rather than duplicated large page files
- the MP4 is used as the background media in the cloned experience
- the resulting pages visually feel like the referenced source homepage before any later JRAG adaptation pass

Visual parity should be judged against the local reference bundle in `C:\Users\Sami\Downloads\Code` together with the behavior and atmosphere shown in `C:\Users\Sami\Downloads\scrollytelling.mp4`.
