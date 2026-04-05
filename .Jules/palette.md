## 2025-04-05 - Visual Active States and aria-current
**Learning:** When using visual indicators for active states (like a badge saying "Actif") alongside standard ARIA attributes like `aria-current="page"`, screen readers will announce both the current state and the visual badge text redundantly.
**Action:** Always apply `aria-hidden="true"` to the visual text element representing the active state when using `aria-current="page"` on the parent link to prevent redundant screen reader announcements.
