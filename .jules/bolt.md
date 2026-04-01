## 2025-04-01 - Avoid useState in Scrollytelling scroll hooks
**Learning:** Found a critical performance bottleneck in the main GSAP animations. Updating React `useState` variables inside high-frequency scroll callbacks like GSAP `onUpdate` triggers a complete re-render of the complex DOM hierarchy and heavy Canvas contexts.
**Action:** Always use `useRef` directly mutating DOM elements instead of `useState` when keeping track of numeric scroll progress that only needs a visual refresh to completely avoid main-thread blocking React render cycles.
