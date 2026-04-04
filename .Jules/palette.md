## 2024-05-18 - Visual Indicators with ARIA
**Learning:** When adding visual indicators for active states (like an "Actif" badge) alongside standard ARIA attributes like `aria-current="page"`, screen readers will redundantly announce both the current page status AND the visual text element.
**Action:** Always apply `aria-hidden="true"` to the visual text element (e.g. badge) when `aria-current` is used on the parent link to prevent redundant screen reader announcements.
