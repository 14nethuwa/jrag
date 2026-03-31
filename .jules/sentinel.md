## 2025-02-17 - [Missing rel="noopener noreferrer" on target="_blank" links]
**Vulnerability:** External links (`<a target="_blank">`) in static HTML files within `tmp-grain/` and `underwater-temp/` directories lacked the `rel="noopener noreferrer"` attributes.
**Learning:** Hardcoded static assets and boilerplate HTML templates often miss critical security attributes that prevent reverse tabnabbing attacks, allowing a newly opened tab to potentially hijack the original page.
**Prevention:** Ensure any newly added static HTML or templates that contain `target="_blank"` links include `rel="noopener noreferrer"`. Enforce automated linting rules or global search-and-replace during build for these static external directories if applicable.
