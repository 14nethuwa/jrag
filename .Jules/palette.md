## 2024-04-18 - Avoid redundant ARIA elements for active states
**Learning:** When using `aria-current="page"` to indicate active navigation states, any visual "Active" or "Actif" badges must be hidden from screen readers using `aria-hidden="true"`. Otherwise, the screen reader will redundantly announce both the current page status and the literal text "Active".
**Action:** Always check if visual indicators of state duplicate the semantic meaning provided by ARIA attributes, and hide the visual indicators from screen readers if they do.
