## 2024-05-24 - WebGL Off-screen Rendering Loop
**Learning:** Continuous rendering loops (like `requestAnimationFrame` for Three.js WebGL scenes) consume significant CPU/GPU resources even when the `<canvas>` element is completely scrolled out of the viewport. React components alone do not pause their internal WebGL loops automatically when off-screen.
**Action:** Always wrap continuous WebGL/Canvas rendering loops with an `IntersectionObserver`. Pause `requestAnimationFrame` and `renderer.render()` execution when `entry.isIntersecting` is false to drastically reduce resource consumption.
