## 2025-02-28 - WebGL Performance Optimization
**Learning:** Continuous rendering loops (e.g., `requestAnimationFrame` for Three.js/WebGL scenes) do not automatically pause when off-screen in React. This leads to severe CPU/GPU drain.
**Action:** Always wrap continuous render loops with an `IntersectionObserver` that explicitly calls `cancelAnimationFrame(animationId)` when `isIntersecting` is false to fully stop the loop and prevent the main thread from continuously waking up.
