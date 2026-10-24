# Portfolio design system

Approved direction: ivory, charcoal, cobalt; Manrope display typography; flat components, generous spacing, and restrained motion. Ashwin explicitly approved the Genjutsu changes and publication to GitHub and ashchembu.com. The implementation retains the existing AC mark, navigation, URLs, résumé, project evidence, personalization, and theme control.

## Evidence and design choices

Awwwards MCP supplied Right Hemisphere, Mathias Adolfsson 2026, and Ingrassia Daniel as references. The first informed typographic scale and asymmetric work placement; the second informed generous project framing. No reference motion was copied: the MCP brief reported unavailable motion evidence.

Dembrandt extracted the existing portfolio's color, typography, spacing, component, breakpoint, and motion evidence. Genjutsu supplied the visual and interaction thesis, motion principles, design-system lookup, and audit workflow. The lookup's flat portfolio structure was retained; its replacement fonts and palette were discarded in favor of the approved Manrope and cobalt direction.

## Tokens

| Role | Light | Dark |
| --- | --- | --- |
| Paper | #F5F5F0 | #171918 |
| Ink | #171918 | #F5F5F0 |
| Muted text | #626660 | #B9BDB5 |
| Accent | #2449DB | #A7B8FF |
| Line | #C9CDC4 | #50544D |
| Surface | #FFFFFF | #222522 |

Existing public token names remain available. `--lime` and `--orange` alias the new accent for legacy UI elements. Project illustrations retain their own colors and are illustrative, not production screenshots.

Manrope 400/500/600/700/800 is retained from the existing Google Fonts connection, with Arial/system-ui fallbacks. Body: 16px, line height 1.65, maximum reading measure 70ch. Secondary metadata: 14px minimum. Display hierarchy uses a 1.25 scale: 16, 20, 25, 31, 39, 49, 61px. Name typography is fluid and reflows on phones.

Spacing uses 8px units: 8, 16, 24, 32, 48, 64, 80, 96px. Half unit: 4px. Radius: 8px for interactive surfaces; full radius only for the brand mark and pills. Flat surfaces use a single border rather than decorative shadows. Content width is capped at 1320px, with 48px desktop and 20px mobile edge insets.

## Interaction and accessibility

Hover: 150ms, up to 2px translation. Native scroll remains available. Project cards align without staggered placement or entrance delays. Five project case studies are shown per view, with larger illustrations and keyboard-accessible expansion in a native dialog. The skills strip contains eight engineering areas and scrolls over 42 seconds, with a pause/resume button and pause on hover or keyboard focus. Reduced motion disables automatic scrolling and supports manual horizontal scrolling. Content is visible without JavaScript. Focus uses a 3px accent outline with a 4px offset. Buttons, summary controls, and navigation targets have at least 44px height. Disabled buttons remain visibly disabled.

Personalization is optional and remains accessible from the header. It preserves the role-based project selection, local preferences, form validation, focus trap, and focus restoration. Light is the new default; a previously saved dark preference is honored.

Each of the eight portfolio focus views has a separate one-page PDF résumé. The hero, experience, and footer résumé links update together and restore with saved preferences. The default and no-JavaScript experience link to the General résumé. Legacy `resume.pdf` remains available as the General version. Only the reviewed PDFs are published; evidence specifications, ATS sidecars, and review materials remain outside the public repository.

Allowed patterns: oversized name typography, cobalt emphasis, hairline separators, aligned project rows, user-approved pausable skills scrolling, expanded illustrative project artwork, existing verified metrics and ownership notes, and the existing brand and employer logos. No additional runtime dependencies.

## Verification

Check desktop and mobile layouts, first visit, saved preferences, personalization, theme persistence, keyboard navigation, reduced motion, résumé access, project detail disclosure, role-specific project selection, no-JavaScript content access, and browser errors. Public deployment is separate from local preview.
