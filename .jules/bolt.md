## 2026-04-02 - [WebGL Component Offscreen Render Loop]
**Learning:** WebGL canvas components with a continuously running `requestAnimationFrame` loop will act as silent performance killers in long-scrolling pages, wasting GPU/CPU cycles even when completely out of the viewport.
**Action:** Always wrap the render loop in an `IntersectionObserver` so it only triggers when the canvas is intersecting with the viewport.
