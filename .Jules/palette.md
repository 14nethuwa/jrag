## 2024-10-24 - Active State Navigation Accessibility
**Learning:** Navigation links often use visual indicators (`data-active`) without exposing the active state to screen readers natively. Relying only on visual classes or custom `data-*` attributes leaves assistive technologies unaware of the user's current location within a navigation list.
**Action:** Always include `aria-current="page"` conditionally on active navigation links. Avoid using redundant screen-reader only spans when applying this standard ARIA attribute.
