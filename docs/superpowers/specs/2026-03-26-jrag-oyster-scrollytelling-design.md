# JRAG oyster scrollytelling design

## Overview

This spec replaces the earlier Byewind-style clone direction with an original JRAG scrollytelling page built around the oyster life story from Dakhla lagoon to final plate.

The experience should feel like one continuous cinematic world controlled by scroll. It is not a set of unrelated sections and it is not a looping background video with content stacked on top. The page should behave like a scroll-driven visual narrative with precise checkpoints, frame holds, and editorial proof overlays.

## User-approved direction

The user clarified and approved these points during brainstorming:

- the current video quality is not acceptable
- the page must be a real scrollytelling experience
- the target is not the Byewind clone as an end state
- the page concept should come from the oyster life-story prompt used to generate the original visual world
- the story should feel like one continuous timeline rather than seven unrelated sections
- key moments may pause on specific frames so overlay boxes can explain the stage
- a development-only scroll counter should exist to help prompt, tune, and build the sequence
- the existing split landing at `/` must remain in place
- the scrollytelling experience should live at `/home`
- `/professionnels` and `/particuliers` should remain as routes, but their current temporary clone content should be removed rather than duplicated or preserved as competing scrollytelling pages
- when the full frame sequence is unavailable, fallback should be a static poster scene rather than a lightweight alternate video mode

## Narrative goal

The page tells the full life story of a premium oyster through one unified visual world.

The seven approved narrative anchors are:

1. `Naissain`
2. `Eclosion`
3. `Croissance`
4. `Purification 42-48h`
5. `Conditionnement`
6. `Chaine du froid`
7. `A table`

These are not separate page templates. They are chapters within one continuous scroll-controlled visual timeline.

## Route and page placement

The scrollytelling page belongs at `app/(public)/home/page.tsx` and should resolve to `/home`.

Route intent:

- `/` stays as the split landing page
- `/home` becomes the cinematic oyster scrollytelling experience
- `/professionnels` remains a separate route family and should no longer host the temporary clone content
- `/particuliers` remains a separate route family and should no longer host the temporary clone content

This prevents the same cinematic system from being duplicated across multiple top-level journeys.

## Visual world

The source visual direction comes from the user's original prompt:

- ultra-premium cinematic renders
- luxury editorial CGI tone
- Dakhla lagoon atmosphere
- deep navy, pearl white, seafoam turquoise, mineral silver, warm sand highlights
- volumetric light, suspended particles, caustics, moisture, cinematic depth of field
- clean negative space for typography and overlays
- one unified art direction across all scenes

The result should feel noble, precise, quiet, pure, sensual, rigorous, and premium.

## Core interaction model

The page should be driven by one primary scroll timeline.

- the viewport acts as a pinned stage for the main visual sequence
- scroll progress maps to timeline progress
- timeline progress maps to frame or state progress in the visual sequence
- chapter checkpoints are embedded into the timeline rather than implemented as isolated full-page sections

At selected ranges, the timeline may visually dwell on a frame or a narrow progression band so explanatory overlays can appear without breaking continuity.

## Rendering strategy

The approved target is a true frame-sequence scrollytelling system.

The system should be designed around:

- a frame-sequence renderer, ideally canvas-driven
- precise frame control from scroll progress
- chapter ranges defined as timeline data
- overlay windows tied to exact progress ranges

This is preferred over a normal background video because it gives exact scrubbing, cleaner holds, and tighter control over chapter transitions.

## Page behavior

The page should feel like one scroll-controlled cinematic film with editorial interruptions at the right moments.

Behavior expectations:

- most scroll ranges advance the visual narrative continuously
- selected ranges slow down perceptually by holding a frame or narrow frame band
- overlay boxes appear during those hold windows
- overlay boxes explain the current chapter with concise premium copy, proof, or process detail
- the underlying visual world remains continuous while overlays change

The page should never feel like a slideshow or a stack of ordinary marketing sections.

## Overlay system

Overlay content is part of the scrollytelling choreography.

Each overlay should be authored against timeline coordinates rather than arbitrary DOM placement.

Overlay content may include:

- chapter label
- concise explanatory copy
- one metric or proof line
- process or quality note
- route or CTA at the final stage if appropriate

Overlay panels should feel editorial and restrained, not app-like.

## Development counter

The page should include a development-only scroll counter to support prompt iteration and build tuning.

The counter should expose enough information to make the sequence measurable while developing, such as:

- timeline progress percentage
- active chapter label
- current frame or frame range
- checkpoint identifier if relevant

This counter is a tool for development and alignment. It should be removable or hideable for production.

## Timeline authoring model

The timeline should be data-driven.

Each chapter entry should define, at minimum:

- chapter id
- start progress
- end progress
- optional hold range
- visual intent
- overlay content slot or slots
- transition notes

The renderer should read from this timeline data instead of hardcoding narrative decisions inside the render loop.

## Architectural boundaries

The implementation should be split into clear units:

- scroll engine: translates scroll distance into normalized timeline progress
- sequence renderer: draws the current frame or state
- chapter timeline config: defines all seven story ranges and hold points
- overlay layer: renders editorial explanation boxes based on active timeline ranges
- development instrumentation: exposes the scroll counter and tuning signals
- asset pipeline hooks: support the generated sequence assets used by the renderer

Content and timing should live in configuration data rather than being buried inside rendering code.

## Performance direction

The user asked for the page to run smartly.

That means the design should plan for:

- frame assets sized appropriately for web delivery
- controlled loading rather than naive eager loading of everything at once
- the ability to tune image quality against smooth scrubbing
- graceful fallback behavior when the full sequence is unavailable or unsuitable

The design goal is high-fidelity scrollytelling with disciplined delivery, not brute-force asset dumping.

## Fallback behavior

If the full frame sequence is unavailable, incomplete, or unsuitable for the current environment, the page should fall back to a static poster scene.

- do not build a second lightweight video system as fallback
- fallback should preserve composition, atmosphere, and overlay legibility
- fallback exists to keep the page stable while assets are still being generated or when the sequence cannot run

## Placeholder route behavior

`/professionnels` and `/particuliers` should remain as simple placeholder pages for now once the temporary clone content is removed.

- no redirect to `/home`
- no duplicate scrollytelling implementation on those routes
- no attempt to redesign those journeys in this spec

## Scope

In scope:

- keeping `/` unchanged as the split landing page
- building the scrollytelling experience at `/home`
- a true scroll-driven oyster life-story page
- one continuous cinematic timeline
- seven chapter anchors inside that timeline
- overlay boxes during selected hold moments
- development counter for tuning and prompting
- architecture that supports iterative asset replacement and sequence refinement
- removing the current temporary clone content from `/professionnels` and `/particuliers`

Out of scope for this spec:

- final copy polish for every overlay
- the final production prompt pack for all generated images
- non-scrollytelling page redesign across the rest of the site

## Verification expectations

Before claiming this work complete in implementation, verification should include:

- lint
- production build
- confirmation that `/` remains the split landing page
- confirmation that `/home` hosts the scrollytelling experience
- manual review of scroll progress against the counter
- confirmation that chapter transitions occur at intended progress points
- confirmation that hold windows leave enough time for overlays to read clearly
- desktop and mobile usability checks
- fallback behavior when the full sequence cannot be used

## Success criteria

This work is successful when:

- `/` remains the split landing page
- `/home` becomes the continuous oyster scrollytelling experience
- the page behaves like one continuous scroll-controlled oyster narrative
- the seven oyster stages are legible as timeline anchors without breaking continuity
- overlays can pause on chosen moments and explain the stage cleanly
- a dev-only counter makes chapter and frame tuning measurable
- the implementation is built around frame-sequence scrollytelling rather than ordinary autoplay video
- the system is structured so assets and chapter timing can evolve without rewriting the core engine
