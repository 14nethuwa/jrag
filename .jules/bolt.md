
## 2024-05-15 - Optimize high-frequency render loops
**Learning:** In high-frequency rendering loops (like a GSAP ticker running at 60fps), repeatedly building long strings using the `+=` concatenation operator inside the loop causes excessive memory allocations and triggers heavy garbage collection pressure, leading to dropped frames or micro-stutters.
**Action:** When constructing complex strings (such as SVG `d` path attributes) inside render loops, prefer an array-based approach (e.g., `pathCommands.push(...)`) followed by a single `.join(' ')` operation at the end to minimize intermediate string allocations.
