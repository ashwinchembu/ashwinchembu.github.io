# Portfolio design system

Approved direction: colorful editorial portfolio with cream, coral, mint, lilac, violet, and forest green. Ashwin requested a complete visual overhaul and San Francisco location on October 23, 2026, with prior authorization for Genjutsu implementation and publication. The implementation retains the existing AC mark, navigation, URLs, tailored résumés, project evidence, personalization, and theme control. `assets/css/color.css` is the final visual layer over the existing component styles.

Visual thesis: a warm, expressive introduction pairs oversized stacked name typography on coral with a mint San Francisco panel and a simple native SVG bridge illustration. Calm reading surfaces frame the project work; lavender organizes capabilities and the scrolling skill strip; forest green separates professional experience. All new color roles are defined below.

Interaction thesis: retain aligned project rows with no stagger or entrance delays, large expandable illustrations, pausable skills scrolling, native page scrolling, keyboard access, and eight focus-specific résumé links. Hover states use the existing 150ms easing; reduced motion remains fully supported. No runtime dependencies added.

## Evidence and design choices

Awwwards MCP supplied Right Hemisphere, Mathias Adolfsson 2026, and Ingrassia Daniel as references. The first informed typographic scale and asymmetric work placement; the second informed generous project framing. No reference motion was copied: the MCP brief reported unavailable motion evidence.

Dembrandt extracted the existing portfolio's color, typography, spacing, component, breakpoint, and motion evidence. Genjutsu supplied the visual and interaction thesis, motion principles, design-system lookup, and audit workflow. The lookup's flat portfolio structure was retained; its replacement fonts and palette were discarded in favor of the approved Manrope and cobalt direction.

## Tokens

| Role | Light | Dark |
| --- | --- | --- |
| Paper | #F8F4EB | #1E2523 |
| Ink | #25231F | #F8F4EB |
| Muted text | #625E55 | #C1CBC4 |
| Accent | #5933AE | #D6C1FF |
| Accent hover | #41227F | #E4D6FF |
| Line | #CBC4B7 | #52625A |
| Control outline | #857B6C | #8A9B90 |
| Surface | #FFFDF7 | #29332E |

Both themes share fixed decorative panels: coral #FF936F, mint #CCEADE, lilac #E1D7F5, lime #DFEC9B, gold #F1C96B, with panel ink #25231F and panel secondary text #514D44. Forest #173E37 uses cream text, muted #C1D6C9, line #5C8071, and surface #234D42. Bridge structure uses #A93C27; file-handoff artwork uses fixed purple #41227F in both themes. These panel colors keep readable dark text in both themes. Existing public token names remain available; `--orange` is coral and `--lime` is lime. Project illustrations retain their own colors and are illustrative, not production screenshots.

Manrope 400/500/600/700/800 is retained from the existing Google Fonts connection, with Arial/system-ui fallbacks. Body: 16px, line height 1.65, maximum reading measure 70ch. Secondary metadata: 14px minimum. Display hierarchy uses a 1.25 scale: 16, 20, 25, 31, 39, 49, 61px. Name typography is fluid and reflows on phones.

Spacing uses a 4px base with 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 80, 88, and 96px steps. Radius: 12px controls, 16px nested project art, 24px primary panels, 32px footer top corners; full radius for the brand mark, jump control, and discipline pills. Flat colored fills separate panels without decorative shadows. Content width is capped at 1320px, with 48px desktop and 20px mobile edge insets. Hero typography uses 88–138px desktop and 66–112px mobile; section titles use 39–66px. No body text is clamped.

## Interaction and accessibility

Hover: 150ms, up to 2px translation. Native scroll remains available. Project cards align without staggered placement or entrance delays. Five project case studies are shown per view, with larger illustrations and keyboard-accessible expansion in a native dialog. The skills strip contains eight engineering areas and scrolls over 42 seconds, with a pause/resume button and pause on hover or keyboard focus. Reduced motion disables automatic scrolling and supports manual horizontal scrolling. Content is visible without JavaScript. Focus uses a 3px accent outline with a 4px offset. Buttons, summary controls, and navigation targets have at least 44px height. Disabled buttons remain visibly disabled.

Personalization is optional and remains accessible from the header. It preserves the role-based project selection, local preferences, form validation, focus trap, and focus restoration. Light is the new default; a previously saved dark preference is honored.

Each of the eight portfolio focus views has a separate one-page PDF résumé. The hero, experience, and footer résumé links update together and restore with saved preferences. The default and no-JavaScript experience link to the General résumé. Legacy `resume.pdf` remains available as the General version. Only the reviewed PDFs are published; evidence specifications, ATS sidecars, and review materials remain outside the public repository.

Allowed patterns: oversized stacked name typography, flat colored panels, decorative native SVG location illustration, hairline separators, aligned project rows, user-approved pausable skills scrolling, expanded illustrative project artwork, existing verified metrics and ownership notes, and the existing brand and employer logos. San Francisco is the user-supplied location for the hero, About copy, footer, metadata, and all eight résumé downloads. Employer South San Francisco location remains accurate and distinct.

## Verification

Check desktop and mobile layouts, first visit, saved preferences, personalization, theme persistence, keyboard navigation, reduced motion, résumé access, project detail disclosure, role-specific project selection, no-JavaScript content access, and browser errors. Public deployment is separate from local preview.

## Publication content checks

Keep two distinct, visible publication entries in every role view and without JavaScript. Each entry must retain the complete title, coauthor attribution, venue, status, and its public link. ICER 2024 is published August 12, 2024 (DOI `https://doi.org/10.1145/3632620.3671104`); ACM SIGCSE TS 2027 is accepted/upcoming (`https://2027.sigcse-ts.acm.org/track/sigcse-ts-2027-Papers-1`). Preserve the full author lists from the official conference records. Do not describe the 2027 paper as already published or presented. Add another paper only after its exact metadata is supplied.

## Expanded content refresh

Keep five selected projects per role view. The native project archive holds the broader catalog and implementation disclosures. Tallyrus and AbleGrade remain separate; Job Hub exposes architecture without personal records or a source link. Keep awards and university coverage separate from the two research publications. Role dates, Android delivery versus iOS scaffold, pretrained inference and distinct Forge synchronization schedules must retain their current factual boundaries.

## Content consistency across views

Use the same verified chronology and claim boundaries in hero cards, project artwork, disclosures, the general view and every role view. Tallyrus ended September 2025; Tech4Good ended June 2025; Lume ended January 2026. Keep commit counts out of all public accomplishment labels, including decorative artwork. Job Hub uses routine exact-package validation and exception-only human review; its resume pipeline is version-5 Python-to-LaTeX compiled with Tectonic, with ATS and rendered-page checks. Keep the two publication statuses and dates from the publication checks above.
