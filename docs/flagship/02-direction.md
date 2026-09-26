# 02 · Design direction (decision gate)

| | |
|---|---|
| Date | 2026-09-26 |
| Based on | `CLAUDE.md`, `docs/flagship/01-audit.md` (58 findings) |
| Status | **Awaiting your choice.** No code has been written. |

## 0. How this was produced

**Skills applied**
- `impeccable`: only its `SKILL.md` is present in this session. Its context launcher and reference playbooks are missing, so its principles were applied directly:
  - treat a redesign as a replacement visual world that keeps product truth;
  - choose a mode per surface: *Experience* for the portfolio, *Read* for case studies and research.
- `design-taste-frontend`:
  - design read and dials;
  - serif discipline (Fraunces and Instrument Serif banned);
  - avoid the "warm beige, brass, espresso" default palette;
  - em-dash ban;
  - eyebrow restraint;
  - no scroll cues, locale strips or decorative hairlines;
  - self-hosted fonts;
  - motion must be motivated;
  - real images only.
- `emil-design-eng`:
  - decide whether to animate from how often the user sees it;
  - custom ease-out and ease-in-out curves;
  - UI motion under 300 ms;
  - press feedback at `scale(0.97)`;
  - never animate from `scale(0)`;
  - `clip-path` reveals, `@starting-style`, and WAAPI or CSS over JS under load;
  - hover gated to fine pointers;
  - reduced motion keeps fades and drops movement.

**Evidence gathered for this document**
- **Fonts:** every family proposed below is OFL-1.1 (`npm view @fontsource/<family> license`, version 5.3.0) and is served by Google Fonts with the axes named (HTTP 200). They will be self-hosted as WOFF2, not linked.
- **Colours:** sampled from your own images by canvas pixel sampling:
  - Al-Arg renders: earth `#7a5535`, ochre `#d8aa67`;
  - Al-Arg dusk aerial: burnt red `#873625`, night ground `#191819`;
  - territory map: oasis olive `#8a946d`;
  - structure drawings: lime paper `#e9e5db`;
  - Hay Mohammadi: night blue `#3d4c67`;
  - Zenata: steel blue `#748ba7`.
- **Contrast:** computed with the WCAG 2.x relative-luminance formula for every text/background pair listed.
- **Platform:** tested in Chromium 141. Cross-document View Transitions, scroll-driven animations, `@starting-style`, container queries, `:has()`, cascade layers, the popover API and `<dialog>` are all supported. Safari and Firefox support is UNVERIFIED, so every effect below degrades to a plain page.

**Design read:** a portfolio and research dossier for graduate committees and heritage/architecture firms, in a precise, documentary language, built on native CSS and a small amount of vanilla JS (no framework).

**Dials** (design-taste-frontend):

| Dial | Value | Why |
|---|---|---|
| Variance | 6 | Asymmetric but ordered; committees reward legibility over spectacle. |
| Motion | 5 | Purposeful and noticeable, never ornamental. |
| Density | 4 | Case studies carry real information. |

**Stack stays as it is:** static HTML, CSS and vanilla JS on GitHub Pages, with no framework and no build step in the repo.
- The design-taste skill defaults to React, Next.js and Tailwind. I am **not** proposing that. It would change build tooling and deploy config (high-stakes under CLAUDE.md), add JavaScript weight, and the native platform already covers the motion goals.
- Image derivatives (AVIF/WebP at several widths) and video posters would be generated offline with tools outside the repo, and the output files committed. Originals are never overwritten. Details belong in 03-spec.

## 1. Direction A · "Measured Drawing" (recommended)

**Concept**
- The site becomes a coherent drawing set: the documentation an architect hands to a heritage authority.
- Every case study opens with a title block (place, year, type, surface, studio, your role), numbered figures and drawings shown at their true resolution.
- A single red "survey line" is used the way surveyors use red for measured annotation: links, focus and the one annotation that matters on each view.
- This comes straight from the stated core skill, survey and documentation. It tells a committee "method and rigour" and tells a firm "drawing literacy and BIM delivery" before a word is read.
- The metaphor lives in **structure** (title blocks, figure numbers, section marks used for wayfinding), not in ornament. The rule: a line either frames a drawing or carries data, or it does not exist.

**Typography**

| Role | Family | Settings | Why |
|---|---|---|---|
| All text | **Archivo** (variable: width 62-125, weight 100-900; OFL-1.1) | Reading at width 100 / weight 400; title blocks at width 75 / weight 500; project titles at width 112 / weight 620 | A grotesque with a width axis gives the whole hierarchy from one family and one file. Condensed widths are the traditional voice of drawing title blocks. |
| Figures and data | **IBM Plex Mono** (OFL-1.1), weights 400 and 500 | Tabular figures | Measurements, dates and figure numbers read as data, the way dimension strings do on a sheet |

**Scale** (fluid from 320 to 1440 px):

| Level | Size |
|---|---|
| Body | 16 → 18 px, line-height 1.55 |
| Small | 14 px |
| Data | 13 px mono |
| h3 | 20 → 24 px |
| h2 | 28 → 40 px |
| h1 | 40 → 72 px |
| Home name | 48 → 104 px |

Nothing renders below 12 px. Today the site goes down to 6.9 px.

**Palette** (light, print-emulating; dark mode deliberately not offered because drawing sheets are white objects):

| Token | Hex | Use | Text contrast |
|---|---|---|---|
| paper | `#F6F6F3` | page | – |
| plate | `#ECEDE9` | image mats | – |
| ink | `#17181A` | text | 16.41:1 on paper, 15.11:1 on plate (AAA) |
| ink-2 | `#4B4F55` | secondary text, form borders | 7.61:1 on paper, 7.01:1 on plate (AAA) |
| redline | `#9E3524` (derived from your Al-Arg dusk red `#873625`) | links, focus, annotation | 6.49:1 on paper, 5.98:1 on plate (AA); paper on redline 6.49:1 |
| rule | `#C9CBC6` | decorative hairlines only (exempt from 1.4.11) | 1.51:1 |

**Layout and imagery**
- **Grid:** 12 columns at ≥1024 px (24 px gutters), 6 at 768 px, 4 at ≤640 px.
- **Case studies:** a sticky title-block column (3 of 12) holds metadata, role, tools and credits. The narrative and figures take the other 9.
- **Renders:** full-bleed **only** when the source is ≥2400 px wide. Everything else sits on a plate at no more than 1× its native pixels, so nothing is ever upscaled again (audit F09).
- **Drawings:** open in a zoomable viewer (`<dialog>`, pan and zoom at native pixels), so a 1459 px sheet's small text is readable on a phone.
- **Work index:** a "drawing register" (project, type, place, year, role) with real filters built from the existing tags.

**Motion** (purpose → what moves → timing)

| Purpose | What | Timing and easing | Reduced motion |
|---|---|---|---|
| Orientation | Cross-document View Transition: the register row's title and thumbnail morph into the case study's title block; the rest crossfades | 240 ms, `cubic-bezier(0.23,1,0.32,1)`; root 180 ms | 120 ms crossfade, no movement |
| Explanation | Diagrams draw their linework once, in the order of the design logic (territory → village → building for Al-Arg; years for the survey line) | 700 ms, `cubic-bezier(0.77,0,0.175,1)`, labels +150 ms | Shown drawn |
| Feedback | Link underline grows from the left; buttons press to `scale(0.97)`; focus ring 2 px redline, offset 3 px | 160 ms, 120 ms, instant | Colour only |
| State | Register filter: rows reflow (FLIP) | 220 ms | Instant |

**Never:** intro loaders, a whole-page opacity fade (audit F12), parallax, scroll-jacking, custom cursors, marquees or infinite loops. All content renders without JS.

**Signature moment: "The Survey Line"**
- On the home page, one measured baseline spans the viewport, ticked from 2018 to 2026.
- It carries only the real events already on your About page (education, the three offices, the ARG documentation years, Sakura) and the dated projects.
- Each tick is a link. The line draws itself once, then stays still.
- **Cost:** an inline SVG under 6 KB and under 2 KB of JS (IntersectionObserver). The source of truth is an ordered list of links, so it is keyboard and screen-reader complete; the SVG is `aria-hidden`.
- **Blocked on:** your answer on the 2024/2026 graduation conflict (audit F01), because the line would print those dates.

**Risks and trade-offs**
- It can read austere if images stay weak. It needs the higher-resolution renders to reach full impact.
- Drawings with small text depend on the zoom viewer on phones.
- The red must stay rare (links, focus, one annotation per view) or it becomes decoration.
- "Drawing-set" can slide into hairlines everywhere; the "frames a drawing or carries data" rule prevents that.

## 2. Direction B · "Earth Section"

**Concept**
- Built from the material of your main research, rammed earth and lime under desert light.
- The ground is the night earth of your Al-Arg dusk aerial, the text is the lime paper of your drawings, and the one accent is the ochre of your renders.
- Pages read as a vertical section through strata (territory, settlement, building, detail), mirroring the three scales the thesis itself works at ("territorial … urban … architectural", `project-al-arg.html:179`).
- Image-led and cinematic, closest to "visualization craft".

**Typography**

| Role | Family | Why |
|---|---|---|
| Display and pull statements | **EB Garamond** (OFL-1.1), 400/500 and italic | A manuscript/heritage register is one of the design-taste skill's valid serif justifications; EB Garamond is in its allowed pool, not a banned default |
| Body and UI | **Instrument Sans** (OFL-1.1, width 75-100) | Neutral and legible on dark grounds |

Scale: body 17 → 19 px, display 44 → 96 px.

**Palette** (dark):

| Token | Hex | Text contrast |
|---|---|---|
| ground | `#191819` (sampled) | – |
| earth (surface) | `#2A2322` | – |
| lime | `#E9E5DB` (sampled) | 14.08:1 on ground, 12.26:1 on earth (AAA) |
| lime-2 | `#B7B0A2` | 8.22:1 on ground, 7.16:1 on earth (AAA) |
| ochre (accent) | `#D8AA67` (sampled) | 8.32:1 on ground, 7.24:1 on earth (AAA); ground on ochre 8.32:1 |

**Layout and imagery:** an asymmetric 8-column grid. Full-bleed image sequences, captions in the margin. Horizontal strata bands carry section titles, and white drawing sheets sit on lime plates to avoid glare.

**Motion**
- Storytelling reveals: images uncover top-down with `clip-path: inset()`, 600 ms ease-in-out, once, in stratum order.
- Page transitions: slower crossfades (300 ms).
- Reduced motion: none of the above.

**Signature moment: "Stratigraphy"**
- Scrolling the home page passes down through four strata of Al-Arg material. Each band's caption holds briefly via CSS scroll-driven animation, with no scroll-jacking.
- **Cost:** several large images above and near the fold, which puts LCP at risk. Scroll-driven support outside Chromium is UNVERIFIED, so it needs a static fallback.

**Risks and trade-offs**
- **The heaviest content dependency:** the Al-Arg renders are one 539 px composite, and several renders are 460-633 px wide. A full-bleed direction would either upscale them (audit F09) or have nothing to show.
- **Palette risk:** a warm dark palette with ochre sits close to the "warm craft" cliché. It is only defensible because it is sampled from your renders.
- Long-form reading on dark suits some readers less.
- It is the heaviest pages of the three.

## 3. Direction C · "Research Index"

**Concept**
- The portfolio as a research dossier. Index-first: every project is an entry with a complete record (role, method, sources, outputs), figures are numbered and sources cited.
- It speaks first to committees: rigour, structure, reading comfort.
- Visual quality comes from typographic precision and figure presentation rather than image scale.

**Typography**

| Role | Family | Why |
|---|---|---|
| Text and headings | **Source Serif 4** (OFL-1.1, optical sizes 8-60) | Designed for long-form reading on screen; the academic register justifies a serif |
| UI, tables and captions | **Source Sans 3** (OFL-1.1) | The superfamily keeps the pair coherent |

Scale: body 18 → 20 px serif (line-height 1.6), UI 14-15 px sans.

**Palette** (light, cool):

| Token | Hex | Text contrast |
|---|---|---|
| page | `#FCFCFB` | – |
| wash | `#EEF1F4` | – |
| text | `#16181B` | 17.33:1 on page, 15.69:1 on wash (AAA) |
| text-2 | `#555A61` | 6.77:1 on page, 6.13:1 on wash (AA) |
| archive (accent) | `#2F4A6B` (derived from your night blue `#3d4c67`) | 8.85:1 on page, 8.01:1 on wash (AAA); page on archive 8.85:1 |

**Layout and imagery:** a three-zone manuscript grid.
- Left margin: sidenotes and figure references.
- Centre: a 65-character text column.
- Right (wide screens): figures and metadata.
- The work register is a sortable, filterable table.

**Motion:** minimal.
- A 150 ms preview crossfade on register hover or focus.
- A 200 ms FLIP when sorting.
- Instant page changes.

**Signature moment: "Live register"**
- The works table sorts and filters by type, place, year and role. The focused row pins that project's figure in a side panel.
- **Cost:** about 4 KB of JS; it is a real `<table>` with `aria-sort`.

**Risks and trade-offs**
- The least visual of the three, so firms may under-read your visualisation skill.
- A text-first design exposes the missing content (roles, methods, sources) most.
- It can feel like a document rather than a flagship.

## 4. Information architecture (common to all directions)

**URLs are kept** (audit: SEO baseline, canonical tags). The nav becomes one consistent set everywhere (audit F26): **Work · Research · Motion · About · Contact**.

| Page (URL kept) | Role | Sections |
|---|---|---|
| `index.html` | Home | Name and role line (existing wording, e.g. "Architect specialising in heritage rehabilitation", `about.html:14`), the signature moment, the flagship case (Al-Arg), 4-6 selected works, research (thesis), contact |
| `architecture.html` | Work register | All 12 projects; filters from existing tags (Rehabilitation, New Build, Mixed-Use, Infrastructure, Small Scale, Residential, Healthcare, Thesis, Cultural) and Professional / Academic |
| `projects/*.html` (12) | Case study | Title block: place, year, type, surface, studio or school, **role [CONTENT NEEDED]**, **tools [CONTENT NEEDED]**. Chapters: Context, Survey and research, Proposal, Drawings and visualisation, Credits (team, supervisor), prev/next. A chapter with no content is omitted, not faked. |
| `books.html` | Research (label changes from "Books") | Thesis: the existing summary (`books.html:172-173`), supervisors, distinction, **"Download PDF" [CONTENT NEEDED]**, flip-book as secondary. Internship report. Sakura Science research. |
| `motion.html` | Motion and film | Reels and the architectural films, with posters taken from each film's own frames (this fixes the Sidi Maarouf image mix-up, F08, without inventing anything) |
| `videos.html` | Kept as a redirect to `motion.html#films` (meta refresh + canonical) | Nothing is deleted |
| `about.html` | Profile and CV | Timeline, education, experience, distinctions, skills, languages, **CV PDF [CONTENT NEEDED]**, contact (email, LinkedIn, form) |
| `404.html` | New | Way back to Work |

**If the site also acts as a research profile** (your open question): Research gains "Publications and talks" [CONTENT NEEDED] and a CV download, and the home page gains a direct Research entry.

**Case-study content I cannot supply** (all [CONTENT NEEDED], carried into 03-spec):
- your role (9 of 12 projects);
- tools;
- the Al-Arg survey outputs;
- supervisors on the academic pages;
- higher-resolution renders;
- the Villa Papillon gallery;
- permission and credit lines for office work.

## 5. Performance budget (per page, mobile, compressed)

| Resource | Budget | Today (audit) |
|---|---|---|
| HTML | ≤ 30 KB | Up to 1,019 KB (base64) |
| CSS | ≤ 25 KB, one file, cacheable | 137 KB raw, 70-83% unused |
| JS | ≤ 15 KB, no framework, `defer` | 35 KB + inline |
| Fonts | ≤ 110 KB, 2 families, WOFF2, Latin + Latin-Ext subsets, self-hosted, 1-2 preloaded | 3 render-blocking Google CSS sets |
| LCP image | ≤ 120 KB (AVIF/WebP, `srcset`, `fetchpriority=high`, width/height set) | Up to 815 KB eager |
| Total transfer before interaction | ≤ 900 KB (video and PDF load only on request) | 235 to 2,182 KB |
| Video | Poster ≤ 60 KB; web encodes ≤ 2.5 Mb/s at 720p; never autoplay | 60 MB files, no poster |

**Targets:** LCP < 2.5 s (the measurement method is to be fixed in 03-spec, see §6), CLS < 0.1, INP < 200 ms.

## 6. Conflicts to decide consciously

| Conflict | Where it bites | Proposed resolution |
|---|---|---|
| "Flagship" motion vs "Nothing blocks content", reduced motion and LCP < 2.5 s | Intro sequences, page fades and scroll-jacking are the usual "flagship" tools and fail all three rules | Motion only where it orients, explains or confirms. Every transition under 300 ms except one-time diagram drawing. No loaders. |
| Full-bleed imagery vs current image resolution | 460-633 px renders cannot be shown large without upscaling (F09) | Show at ≤1× on plates until you supply sources. Direction B is hit hardest. |
| Page transitions on a static multi-page site | Cross-document View Transitions exist in Chromium 141; Safari and Firefox support is UNVERIFIED | Progressive enhancement: other browsers navigate instantly. |
| The LCP target has no measurement method | Lighthouse (simulated) and applied throttling differ by up to about 2.5 s (audit §6.1). Lighthouse could not measure 9 pages. | Pick the gate in 03-spec. My proposal: Lighthouse mobile median of 3, plus the lab method where Lighthouse fails. |
| GA4 vs performance and privacy | Third-party script on every page, no consent (F32) | Your decision (audit §9 item 18). |
| Flip-book vs research access | Committees cannot download the thesis (F06) | Add a PDF when you provide it; keep the flip-book second. |

## 7. Comparison

| Direction | Strength | Weakness | Best for audience | Performance risk | Content you must supply |
|---|---|---|---|---|---|
| **A · Measured Drawing** | Expresses survey and documentation directly. Works with today's assets (drawings shine at native size). Cheapest motion. | Can read austere until better renders arrive | Both: committees (method) and firms (drawing and BIM literacy) | Low: 1 variable font + a mono subset, SVG diagrams, contained images | Roles, tools, credits; hi-res renders for full-bleed; Al-Arg survey sheets |
| B · Earth Section | Most atmospheric; closest to visualisation craft and the earthen identity | Depends on high-resolution imagery you don't have yet; near the "warm craft" cliché; dark long-form reading | Firms first | High: large images near the fold, scroll-driven effects | Everything in A, plus 2400 px+ renders for every stratum |
| C · Research Index | Maximum rigour and reading comfort; best for committees | Least visual; exposes missing method content most | Committees first | Lowest | Everything in A, plus method text and sources per project |

## 8. Recommendation

**Direction A, "Measured Drawing"**, borrowing C's register-style Work index and structured Research page, which are information architecture rather than aesthetics. The reasons:
- It is the only one of the three that comes directly from your stated core skill, survey and documentation.
- It is the only one that looks flagship with the images you have today, because it presents drawings at native resolution instead of stretching renders.
- It meets the performance budget most easily.
- Its motion vocabulary (lines that draw in the order of the design logic, and title blocks that carry you between pages) is purposeful by construction.

B becomes attractive once high-resolution renders exist. C is the fallback if committee applications are the only goal.
