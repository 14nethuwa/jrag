## 2024-04-13 - Checkout Form Processing UX
**Learning:** Disabling parallel actions (like Reset) during async submissions prevents race conditions and user errors, while `aria-busy` ensures screen readers announce the processing state correctly.
**Action:** Always disable secondary form actions (like reset, cancel, back) when a primary form submission is actively processing, and use `aria-busy` paired with dynamic text updates on the submit button for better accessibility.
