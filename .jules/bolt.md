## 2024-05-18 - Stop off-screen WebGL rendering loops
**Learning:** Continuous rendering loops (e.g., `requestAnimationFrame` for Three.js/WebGL scenes) do not automatically pause when off-screen in React. They can silently consume significant CPU/GPU resources in the background.
**Action:** Always wrap continuous render loops with an `IntersectionObserver` that explicitly calls `cancelAnimationFrame(animationId)` when `isIntersecting` is false to fully stop the loop and prevent the main thread from continuously waking up.
