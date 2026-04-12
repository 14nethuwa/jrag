## 2024-05-18 - Native ARIA State Indication
**Learning:** For active navigation links, adding `aria-current="page"` natively signals the active state to screen readers without requiring additional hidden `span` elements with `.srOnly` classes or `aria-hidden="true"`.
**Action:** Consistently apply `aria-current="page"` for active routing components to keep the DOM clean and semantically correct.
