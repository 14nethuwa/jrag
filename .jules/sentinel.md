## 2024-10-27 - [Reverse Tabnabbing Prevention]
**Vulnerability:** External links with `target="_blank"` lacked `rel="noopener noreferrer"`.
**Learning:** This exposes the site to "Reverse Tabnabbing" attacks where the newly opened page can access the original page's `window` object via `window.opener` and potentially redirect it to a malicious site.
**Prevention:** Always include `rel="noopener noreferrer"` on `target="_blank"` anchor tags.
