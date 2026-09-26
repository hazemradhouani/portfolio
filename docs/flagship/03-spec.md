# 03 · Implementation specification

| | |
|---|---|
| Date | 2026-09-26 |
| Direction | **A · Measured Drawing** (chosen by the owner's delegation: "always take the best decision, you are the design director") |
| Site role | Portfolio **plus research profile** (delegated) |
| Content decisions received | Thesis June 2024 + DNA February 2026, both Highest Honours (F01). The Sakura distinction is officially **"Most Appreciated Research"** (F02). |

## 1. Design tokens

**Colour** (light only; measured contrast in 02-direction §1)

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F6F6F3` | page |
| `--plate` | `#ECEDE9` | image mats, code/data wells |
| `--ink` | `#17181A` | text, primary buttons |
| `--ink-2` | `#4B4F55` | secondary text, form borders (7.61:1) |
| `--redline` | `#9E3524` | links, focus, the one annotation per view (6.49:1) |
| `--redline-deep` | `#7E2A1C` | link hover |
| `--rule` | `#C9CBC6` | decorative separators only |

**Type**

| Token | Value |
|---|---|
| `--font-sans` | `"Archivo", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--font-mono` | `"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` |
| Widths | `--w-cond: 75`, `--w-text: 100`, `--w-display: 112` (font-stretch %) |

**Scale** (fluid from 320 to 1440 px):

| Step | Size | Use |
|---|---|---|
| `--step--1` | 13 px | data (mono) |
| `--step-small` | 14 px | – |
| `--step-0` | 16 → 18 px | body, line-height 1.55 |
| `--step-1` | 20 → 24 px | – |
| `--step-2` | 28 → 40 px | – |
| `--step-3` | 40 → 72 px | – |
| `--step-4` | 48 → 104 px | – |

Nothing renders below 12 px. Measure: 64-70 characters.

**Space, shape, depth**
- Spacing: a 4 px base, `--s1…--s10` = 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section rhythm: `clamp(64px, 8vw, 128px)`.
- Radius: **0 everywhere** (shape lock: the drawing set is all sharp).
- Shadows: none. Depth comes from the plate colour and 1 px ink frames around drawings.

**Breakpoints:** mobile-first `min-width` 640 / 768 / 1024 / 1280. The inline nav appears at ≥768 px, which removes the old 641-720 px dead zone (F18).

**Motion**
- Easings: `--ease-out: cubic-bezier(0.23,1,0.32,1)`, `--ease-in-out: cubic-bezier(0.77,0,0.175,1)`.
- Durations: press 120 ms, hover 160 ms, UI 200 ms, view transition 240 ms, diagram draw 700 ms.

**Layers:** the header is `z-index: 10`. Menus and viewers use the native `<dialog>` top layer, so no z-index races.

## 2. Components

| Component | Variants | States | Accessibility behaviour |
|---|---|---|---|
| Skip link | – | hidden → visible on focus | A plain `#main` anchor; `main` has `tabindex="-1"`. **No JS interception** (fixes F16). |
| Site header | desktop inline nav; mobile Menu button | default, hover (underline grows 160 ms), focus-visible (2 px redline ring, offset 3 px), `aria-current="page"` (2 px redline underline) | The wordmark "Hazem Radhouani" is text, so the visible label equals the accessible name (fixes F03, F25) |
| Mobile menu | modal `<dialog>` | open/closed; opens with a 200 ms fade + 8 px rise, reduced: fade only | Native modal: the background is inert and focus stays inside (fixes F21); Esc closes; focus returns to the Menu button |
| Button | primary (ink), secondary (1 px ink frame) | hover (redline fill), active `scale(0.97)` 120 ms, focus-visible ring, disabled (ink-2 text, no hover), loading (label + `aria-busy`) | Min target 44×44 px |
| Text link | inline, standalone with arrow | hover (underline 1 → 2 px), focus ring | External links say "(opens in new tab)" in visually hidden text |
| Title block | case study, research | – | A `<dl>`; labels in mono 13 px ink-2, values in body |
| Figure | drawing (zoomable), render, portrait | loading (plate + reserved `aspect-ratio`), loaded, error (alt text shown) | `<figure>` + `<figcaption>` "Fig. N"; drawings get a "View full size" button |
| Viewer | modal `<dialog>` | fit / actual size, panning by scroll or drag | Esc closes, focus returns, the image keeps its alt text |
| Register (Work) | list, filters, preview (fine pointer ≥1024 px only) | filter pressed/unpressed, empty result message, row hover/focus | Filter buttons use `aria-pressed`; a live region announces the count; rows are real `<a>` links (fixes F13) |
| Survey Line | home timeline | drawn (static), drawing (first view, once) | The source is an `<ol>` of events; the SVG is `aria-hidden` |
| Scales diagram | Al-Arg | drawn, drawing | Links to the Territory, Plans and Structures figures |
| Film card | inline `<video controls preload="none" poster>` | idle, playing (native controls) | No autoplay; posters are frames from the film itself (fixes F08) |
| Contact form | – | default, focus (2 px redline), invalid (message under the field, `aria-invalid`, `aria-describedby`), sending (button disabled + `aria-busy`), sent, failed | Labels above fields with "(required)"; `role="status"` for the result (fixes F42) |
| Prev/next | – | hover, focus | The accessible names include "Previous project:" / "Next project:" |

## 3. Pages (mobile → desktop)

All pages share the header, the footer, one stylesheet (`css/styles.css`, rewritten), one deferred script (`js/main.js`, rewritten) and self-hosted fonts. There is **no body fade** and all content renders without JS (fixes F12, F58 cause candidates).

**Home (`index.html`)**
- **Hero:** h1 "Hazem Radhouani". Line: "Architect specialising in heritage documentation and earthen architecture." Sub: "Survey and documentation, BIM delivery in Revit, and visualisation in Unreal Engine and D5 Render." (identity and strengths as stated by the owner in `CLAUDE.md`). CTAs: **View work** (primary) and **Research**.
  - Hero figure: the Al-Arg dusk aerial (`images/al-arg/thumb.jpg`, 928 px, shown ≤1×).
  - Mobile: stacked. Desktop: 7/5 split.
- **Survey Line:** the timeline from 2018 to 2026, built from `about.html` facts and the corrected degree dates.
- **Flagship: Al-Arg.** Summary sentence (verbatim), the Scales diagram, a link to the case study.
- **Selected work:** 4 projects (La Villette, Zenata Station, Tamansourt Campus, Corallum) plus a link to the register.
- **Research:** the thesis title, its distinction, and a link.
- **Contact:** email and LinkedIn.

**Work (`architecture.html`)**
- h1 "Work".
- Filters: All, Professional (PRO), Academic, then the type tags.
- The register: 12 rows (project, type, place, year, studio or school).
- Preview panel at ≥1024 px on fine pointers.
- Mobile: single-column rows with a thumbnail.

**Case study (`projects/*.html` × 12)**
- **Title block:** tag, h1, Location / Year / Studio / Type / Surface, plus the recognition line where present. Sticky at ≥1024 px.
- **Hero figure**, then the narrative (verbatim paragraphs), then the figure groups. Each existing gallery label becomes an **h2** (fixes F41), with numbered figures and verbatim captions.
- The film link on Sentry and Zenata.
- Prev/next and "All work".
- Base64 images are replaced by the same pixels as files: La Villette's two data URIs are byte-identical to `images/la-villette/La villette_page-000{1,2}.jpg`; the two Foubert data URIs are decoded into new files, and the originals are left untouched (fixes F13).

**Research (`books.html`, h1 "Research")**
- Thesis:
  - cover, title, subtitle, institution, supervisors (verbatim, both spellings kept, F34 flagged), distinction, the existing summary;
  - **Read online** (direct Heyzine link, works without JS);
  - PDF slot hidden until a file is supplied.
- Internship report: same pattern.
- Research: the Sakura Science Program entry (verbatim, with the official distinction name).

**About (`about.html`)**
- Name, role line, bio (verbatim) and portrait.
- CV sections as definition lists: Experience, Education (thesis title moved to the June 2024 entry per the owner's answer), Distinctions ("Most Appreciated Research"), Skills, Languages.
- Contact with email, LinkedIn and the form (same formsubmit endpoint).

**Motion (`motion.html`)**
- The three reels and the three architectural films, each inline with a poster from its own frames.
- Web encodes at 720p (originals kept), with a link to each related project.

**Other pages**
- `videos.html`: a small page that redirects to `motion.html#films` (meta refresh + canonical + a visible link). Nothing is deleted.
- `404.html`: new; offers a way back to Work.

## 4. Technical decisions

| Decision | Choice | Why |
|---|---|---|
| Stack | **Keep** static HTML, CSS and vanilla JS on GitHub Pages | No build or deploy change (CLAUDE.md high-stakes). The native platform covers the motion (View Transitions, `<dialog>`, IntersectionObserver). |
| Page production | Pages are generated **outside the repo** by a scratchpad script from text extracted verbatim from the current pages; only the resulting plain HTML is committed | Guarantees identical chrome on 19 pages (audit F26 drift) and verbatim content. It adds no tooling to the repo, and the HTML stays hand-editable. |
| Fonts | Self-hosted Google subsets, unmodified: Archivo variable Latin (90.1 KB) + Latin-Ext (86.2 KB, loads only for Latin-Ext characters) and IBM Plex Mono 400 Latin (14.7 KB) + Latin-Ext (13.3 KB). OFL text in `fonts/OFL.txt`. `font-display: swap`; Archivo preloaded. | ~105 KB typical: within budget. No third-party render-blocking CSS (F36). |
| Old files | `css/motion.css` will no longer be referenced | Deletion needs the owner's OK; reported, not deleted |
| Analytics | GA4 unchanged (async) | The owner's decision is pending (content list item 18) |
| Page transitions | `@view-transition { navigation: auto; }` plus shared names (register row ↔ case-study title block) | Progressive enhancement; disabled under reduced motion |

## 5. Media pipeline (outside the repo; originals never overwritten)

**Images**
- `sharp` 0.35.4 (libvips 8.18.6) writes AVIF (quality 50) and WebP (quality 72) at widths of 480, 800, 1200 and 1600, **never above the source width**, to `images/opt/<path>-<w>.<ext>`.
- Markup: `<picture>` with AVIF and WebP sources, the original JPEG/PNG as fallback, `width`/`height` from the real pixels, and `sizes` per layout slot.
- The LCP image is `fetchpriority="high"`; everything else is lazy.

**Share images**
- 1200×630 cover crops of each page's lead image go to `images/og/*.jpg`. They are only used where the source is ≥1200 px wide (no upscaling); otherwise the image is contained on paper.

**Video** (ffmpeg 7.0.2, libx264)
- Posters are frames from each film, saved as 1280 px JPEGs plus AVIF.
- Web encodes: 720p, CRF 26, faststart, AAC 96 kb/s, to `videos/web/*.mp4`.
- The originals stay in `videos/`.

## 6. Acceptance criteria (every page, checked in Prompt 5)

1. axe-core 4.13: **0 violations** (WCAG 2.0/2.1/2.2 A and AA) at 375 and 1440 px.
2. Contrast: all text ≥ 4.5:1 (large text ≥ 3:1), measured by axe.
3. Keyboard:
   - every control is reachable, with a visible focus indicator;
   - the skip link moves focus to `main`;
   - the mobile menu keeps focus inside;
   - Esc closes dialogs.
4. **No horizontal overflow** at 320, 375, 768, 1024, 1440 and 1920 px. Navigation is visible at every width (no dead zone).
5. Reduced motion: no transform animations run; every piece of content is visible with no delay.
6. JS disabled: all content visible; nav, register rows and film players all usable.
7. Text: nothing below 12 px; body ≥ 16 px. Targets ≥ 24×24 px, primary ≥ 44×44 px.
8. Performance (Lighthouse 13.5, 3-run median):
   - desktop Performance ≥ 95;
   - mobile LCP ≤ 2.5 s on every page Lighthouse can measure (it must now measure all 18);
   - CLS ≤ 0.1.
   - The applied-throttling lab (01-audit §6.4) is reported alongside.
9. Weight: within the 02-direction §5 budget. No HTML page over 30 KB compressed.
10. SEO/sharing:
    - unique title and description;
    - absolute canonical, `og:url` and `og:image` (a file that exists);
    - Twitter card;
    - valid JSON-LD (Person corrected per F01/F02, CreativeWork with `image` on case studies);
    - sitemap `lastmod` updated.
11. Content truth: every text block from the current pages is present verbatim unless listed in §7, and no new factual claim exists beyond `CLAUDE.md` and the owner's answers.

## 7. Content changes made on the owner's answers or delegation

| Change | Basis |
|---|---|
| JSON-LD Person: thesis Highest Honours June 2024; DNA Highest Honours February 2026 | Answer to F01 |
| About education: the thesis title moves to the June 2024 thesis entry | Answer to F01 (matches `books.html:152,167`) |
| "Best Research Award" → "Most Appreciated Research" everywhere (about, books, JSON-LD) | Answer to F02 |
| Sidi Maarouf film: its thumbnail becomes a frame of its own film | F08; uses the owner's own material |
| Nav labels "Books" → "Research", "Videos" folded into "Motion" | IA delegation |
| Home hero line and sub-line | Owner-provided identity in `CLAUDE.md` |
| Taglines "Build from what exists." and "Places already alive." | Kept (home and Work intro) |

## 8. Tasks and milestones

| # | Milestone | Tasks | Verification |
|---|---|---|---|
| M1 | Foundations | Fonts + OFL; tokens and base CSS; header, footer, skip link and menu; generator scaffold | axe + screenshots of a sample page at 375/1440 |
| M2 | Media | Image derivatives; base64 extraction; share images; video posters and encodes | File counts and sizes; spot-check pixels (no upscaling) |
| M3 | Pages | Home, Work, 12 case studies, Research, About, Motion, videos redirect, 404 | Content-truth diff (old text ⊂ new text); link check |
| M4 | Motion and interaction | View transitions; Survey Line and Scales drawing; register filter and preview; viewer; form | Keyboard, reduced motion, no-JS checks |
| M5 | Metadata | JSON-LD, OG/Twitter, sitemap, canonicals | Parse JSON-LD; URL existence |
| M6 | QA (Prompt 5) | Full measurement suite vs the 01 baseline; independent reviewer; fix Critical/High | `docs/flagship/05-qa-report.md` |

## 9. [CONTENT NEEDED] (consolidated; the build ships without these and shows nothing fake in their place)

1. Your role, phases and deliverables on each project (9/12 missing).
2. Tools per project.
3. Al-Arg survey and documentation sheets; the correct description of its material system (stone vs earth).
4. Higher-resolution renders (Tamansourt aerial and facade, Bolivar volumetric, the three Al-Arg renders as separate files, Corallum renders, the Sentry section).
5. Villa Papillon gallery material.
6. Thesis and internship-report PDFs; a formal abstract.
7. CV PDF; publications and talks, if any.
8. Supervisor name spelling (Monsef Al-Fourati / Moncef Fourati).
9. Whether "award-winning thesis" should stay (the only listed distinction is the jury grade).
10. How to describe Tokyo (research programme vs practice) and your current base.
11. Captions or transcripts for films with speech.
12. Permission and credit lines for Studio BELEM and Yassir Khalil Studio drawings.
13. The canonical spelling of the thesis site (Al-Arg / ARG / Al Erg / El Erg).
14. The analytics decision (keep GA4 with consent, cookieless, or remove).
15. Deleting the now-unreferenced `css/motion.css`, the duplicate `images/images/portrait.jpg` and the stale `master` branch (needs your OK).
