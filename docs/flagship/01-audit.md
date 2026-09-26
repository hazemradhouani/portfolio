# 01 · Forensic audit (baseline)

| | |
|---|---|
| Date | 2026-09-26 |
| Branch / commit audited | `flagship-upgrade` at `99b2b3a` (same tree as `main` after PR #1) |
| Mode | Read-only. No source file was modified. This document is the only file added in this phase. |
| Evidence format | `file:line` (1-indexed) or a named measurement from §6. Site text is quoted verbatim. |
| Labels | **UNVERIFIED** = not checked. **NOT MEASURED** = could not run; the reason is given. |

## 0. Method and limits

**How the repository was read**
- Three read-only subagents read every file in parallel: the six top-level pages plus site files; the 12 project pages; `css/styles.css`, `css/motion.css` and `js/main.js`. Each finding had to cite `file:line`.
- I spot-checked the load-bearing claims myself with Grep/Read, for example `css/styles.css:49-59`, `index.html:4-10` and `index.html:390`.
- I re-tested in a browser every finding the readers marked "not browser-tested" that ended up rated High (§6.9).

**How the site was measured**
- The repo was served from a local static server under `/portfolio/`, the GitHub Pages base path, with gzip/brotli compression, byte-range support and real 404s.
- Tools: Chromium 141.0.7390.37 (Playwright 1.56.1), Lighthouse 13.5.0 (3 runs per page and form factor, median chosen by Lighthouse's own `computeMedianRun`), axe-core 4.13.0 (WCAG 2.0/2.1/2.2 A and AA, plus best-practice).

**Limits**

| Limit | Consequence |
|---|---|
| The live site `hazemradhouani.github.io` is blocked by this environment's network policy. | Every metric is from the local copy. GitHub Pages headers, caching, CDN and Jekyll behaviour are UNVERIFIED. |
| `www.googletagmanager.com` is blocked. | The cost of the GA4 script is NOT MEASURED. Lighthouse's Best-Practices "errors-in-console" failure comes from this block, not from the site. |
| `www.linkedin.com` and `heyzine.com` are blocked. | Those links are NOT CHECKED; this is not the same as broken. |
| `www.khoavu.com` (optional reference) is blocked. | It was not consulted. |
| INP needs real interactions. | INP is NOT MEASURED. TBT is reported as the lab proxy. |
| No field data. | CrUX needs an API key and network access. NOT MEASURED. |
| Lighthouse mobile returned `NO_FCP` on 9 of 18 pages (§6.3). | Those scores are NOT MEASURED. A substitute throttled lab measurement is given in §6.4 and labelled as such. |
| Conflict in the prompt: "the only file you create is 01-audit.md" vs "take screenshots". | Screenshots and raw data were kept outside the repo. They are delivered as a zip attached to the chat, and nothing extra was committed. |

**Environment changes made (outside the repo)**
- Installed `lighthouse@13.5.0` and `axe-core@4.13.0` in the session scratchpad. Not project dependencies: 113 packages, 171 MB on disk, never in the repo.
- Added a Chromium enterprise policy, `/etc/chromium/policies/managed/ccr-agent-proxy-ca.json`, containing only the session's TLS proxy CA. Without it, Google Fonts failed in the test browser with `ERR_CERT_AUTHORITY_INVALID`; with it they load (HTTP 200). This was checked by A/B test. No TLS verification was disabled. The container is ephemeral.

## 1. Tooling

| Tool | Available here | Used in this audit | Planned use in later phases, and why |
|---|---|---|---|
| Subagents: `general-purpose`, `Explore`, `Plan`, `claude`, `claude-code-guide`, `statusline-setup` | Yes | 3 × general-purpose (read-only readers) | Parallel read-only analysis. An independent QA reviewer in Prompt 5 (CLAUDE.md working method). |
| Skill `impeccable` (critique, audit, typography, colour, motion, tokens) | Yes | No (audit phase is fact-finding) | Prompts 2 and 4: design direction, tokens, polish. |
| Skills `design-taste-frontend`, `redesign-existing-projects`, `high-end-visual-design`, `minimalist-ui`, `industrial-brutalist-ui`, `stitch-design-taste` | Yes | No | Prompt 2 only, as lenses for distinct directions, weighed against the CLAUDE.md identity rule (reject generic trends). |
| Skills `emil-design-eng`, `apple-design`, `animate`, `improve-animations`, `find-animation-opportunities` | Yes | No | Prompt 2 motion philosophy; Prompt 4 motion build (purpose-first rule). |
| Skill `human-writing` | Yes | No | Editing copy the owner supplies. It will not be used to invent content (CLAUDE.md content-truth rule). |
| Skills `impeccable-finish-reviewer`, `code-review`, `security-review`, `simplify` | Yes | No | Prompt 5 QA and pre-merge review. |
| Skill `run` | Yes | No (custom Playwright scripts were needed for 6 widths, axe and coverage) | Prompt 4 per-task verification. |
| Other skills (for example `write-swift`, `animate-expo`, `claude-api`, `slack-gif-creator`) | Yes | No | Not relevant to this project. |
| Plugins | None enabled on the account (`ListPlugins` returned an empty list) | – | – |
| MCP `github` (scoped to `hazemradhouani/portfolio`) | Yes | Read remote branches and commits | PRs and review threads when you ask for them. |
| MCP `Claude_Code_Remote`, `ccd_session`, `Claude_Docs` | Yes | Session housekeeping only | Not needed for the build. |
| Headless browser: Playwright 1.56.1 + Chromium 141.0.7390.37 (`/opt/pw-browsers`) | **Yes** | Screenshots, axe, keyboard, overflow, coverage, fonts | Every build task (CLAUDE.md "verified" rule). The full Chromium build is required: the default headless shell ignores the CA policy. |
| Lighthouse | Not preinstalled; **runs** after installing 13.5.0 in the scratchpad | Desktop 18/18 pages; mobile 9/18 pages (see §6.3) | Prompt 5 comparison against this baseline. |
| axe-core | Installed 4.13.0 (scratchpad) | All 18 pages at 375 and 1440 | Every build task and QA. |
| `serve` 14.2.6, `eslint` 10.1.0, `prettier` 3.8.1, `typescript` (global) | Yes | `serve` only | Linting is possible later if a lint config is added (a tooling decision for you). |
| Image tooling (ImageMagick, cwebp, avifenc, exiftool, ffprobe, Pillow) | **None installed** | `file` + a stdlib MP4 parser instead | The Prompt 3 image pipeline needs a tool (for example `sharp`). That is a new dependency and needs your approval. |
| Network | npm registry and Google Fonts reachable; the live site, khoavu.com, googletagmanager.com, linkedin.com and heyzine.com blocked | – | You can allow hosts under the environment's Network access settings. |

## 2. Stack

| Aspect | Finding | Evidence |
|---|---|---|
| Framework | None. Hand-written static HTML, CSS and JS. | 19 `.html` files, 2 `.css`, 1 `.js`; no `package.json` or config files at the root. |
| Build process | None. No bundler, no minification, no image processing, no lockfile. | Root listing; CSS served unminified (agent C §11). |
| Runtime dependencies (third party) | Google Fonts, in 3 different family sets; Google Analytics 4 via gtag.js on 18/18 pages; formsubmit.co for both contact forms; Heyzine flip-book iframes for the thesis and report. | `index.html:30`, `about.html:31`, `motion.html:32`; `index.html:4-10`; `about.html:283`, `motion.html:407`; `books.html:129,193` |
| JS | One IIFE, `js/main.js` (851 lines), loaded with `defer` on 17 pages (not `index.html`); inline scripts on `motion.html:483-618` and `videos.html:217-338` | agent C §11-12 |
| CSS | `css/styles.css` (4,912 lines, 137 KB) on 17 pages; `css/motion.css` on `motion.html` only; `index.html` carries its own 340-line inline stylesheet (`index.html:33-372`) | agent C §11 |
| Deploy | GitHub Pages project site at `https://hazemradhouani.github.io/portfolio/`. The source branch or workflow is UNVERIFIED: no Pages API access, and the host is blocked. | canonicals, e.g. `index.html:32`; `sitemap.xml:6`; `robots.txt:4` |
| Jekyll | There is no `.nojekyll` or `_config.yml`. If Pages builds from a branch with Jekyll, `CLAUDE.md` and `images/IMAGES_README.txt` may be publicly served (UNVERIFIED). | root listing |
| Branches | `main` (site); `flagship-upgrade` (this work). `master` holds one commit (`08615b1`, 2026-03-16, "Add video files") containing only `videos/`. It looks stale; whether Pages uses it is UNVERIFIED. | `git ls-remote`; GitHub API listing of `master` |
| How it is served (local run) | `serve` log: `INFO Accepting connections at http://127.0.0.1:8080`. All 18 pages return 200 with `br`/`gzip`, MP4 byte ranges return 206, a missing page returns 404. There is no build step to run. | §0; curl checks in the session |
| Repo weight | 166 MB working tree, of which 151 MB is 6 MP4 files and 12.3 MB is 50 image files | `du`, file listing |

## 3. File inventory

| Path | Size | Lines | Purpose |
|---|---|---|---|
| `index.html` | 12.9 KB | 464 | Landing ("cover") page. Self-contained inline CSS; loads neither `styles.css` nor `main.js`. |
| `about.html` | 17.1 KB | 328 | CV/profile: bio, experience, education, skills, languages, distinctions, contact form |
| `architecture.html` | 18.8 KB | 438 | Works index: hero, 6 taxonomy links, 12 project cards, "Experience more" |
| `books.html` | 14.4 KB | 294 | Thesis and internship report, opened in a Heyzine iframe reader |
| `motion.html` | 28.5 KB | 618 | Motion design: 3 reels, 3 architectural films, bio, second contact form |
| `videos.html` | 14.1 KB | 340 | The same 3 architectural films as `motion.html`, in a lightbox |
| `projects/project-*.html` × 12 | 9.1 to 13.6 KB; **497.2 KB** (foubert) and **1,018.9 KB** (la-villette) because of inline base64 images | 212 to 280 | One case study each (see §4.2) |
| `css/styles.css` | 137.4 KB | 4,912 | Shared stylesheet, 13 chronological patch layers (agent C §9) |
| `css/motion.css` | 31.6 KB | 1,192 | `motion.html` only; its first layer is fully overridden by its later layer |
| `js/main.js` | 35.5 KB | 851 | Page transitions, swipe, reveal, contact form, books reader, mobile menu, back-to-top |
| `images/<project>/` × 12, `images/books/`, `images/motion/`, `images/portrait.jpg`, `images/images/portrait.jpg` | 50 files, 12.3 MB | – | Thumbnails, galleries, covers, portrait (§4.4) |
| `images/IMAGES_README.txt` | 0.4 KB | 14 | Stale developer note (lists only the thumbnails and portrait) |
| `videos/*.mp4` × 6 | 151 MB | – | 3 motion reels, 3 architectural films (§4.5) |
| `favicon.svg`, `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` | 2.7 KB | – | "HR" monogram icons |
| `robots.txt` | 0.1 KB | 4 | Allow all, plus a sitemap line. Served at `/portfolio/robots.txt`, where crawlers do not read it. |
| `sitemap.xml` | 3.8 KB | 126 | 18 URLs, all `lastmod` 2026-03-27 |
| `google8461c5a8f581c32a.html` | 53 B | 1 | Google Search Console ownership file |
| `CLAUDE.md` | 3.9 KB | 41 | Project rules (added in PR #1) |

## 4. Content inventory

### 4.1 Pages

| Page | `<title>` | h1 (verbatim) | Main content |
|---|---|---|---|
| index | "Hazem Radhouani - Architecture / Motion / Research" | "Build from what exists." (`index.html:406`) | Kicker, 3 figures ("12 / 04 / 2026"), 4 image cards, 4 index links. No footer. |
| about | "About · Hazem Radhouani" | "Hazem" "Radhouani" in two spans with no space (`about.html:121`) | Bio (`:126`), 5 experience items, 3 education items, skills, 3 languages, 4 distinctions, contact form |
| architecture | "Hazem Radhouani · Architect" (no page name) | "Places already alive." (`:223`) | Hero, 6 taxonomy links, 12 cards (`:279-400`), "Experience more" |
| books | "Books · Hazem Radhouani" | "Books" (`:120`) | Thesis entry (`:124-186`), report entry (`:188-249`), iframe dialog |
| motion | "Motion · Hazem Radhouani" | "Hazem" "Radhouani" (`:153`, no space) | 3 reels, 3 films, "About", contact form |
| videos | "Videos · Hazem Radhouani" | "Videos" (`:120`) | 3 films |
| 12 project pages | "<Project> · Hazem Radhouani" | Project name (`:152` on every page) | Tag, 5 meta fields, body text, gallery groups with captions, prev/next |

### 4.2 Projects (12)

Metadata is quoted from each page's meta block (`projects/*.html:151-175`). Counts come from agent B §3.4 (Python html.parser word count).

| Project | Tag | Location | Year | Studio / school | Type | Surface | `<img>` (gallery) | Narrative words | Caption words | Own role stated | Tools named |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Al-Arg | Academic · Thesis | Tunisia | 2023–2024 | ENAU · National Architecture Diploma | Heritage Rehabilitation · Abandoned Village | Village: 1.4 ha | 5 (4) | 186 | 244 | No | No |
| Belhomme | PRO · Rehabilitation | Paris | 2025–2026 | Studio BELEM | Residential Rehabilitation | 260 m² | 4 (3) | 107 | 154 | No | No |
| Bolivar | PRO · Mixed-Use | Paris | 2025–2026 | Studio BELEM | Hotel and Student Residence | 2 800 m² | 4 (3) | 122 | 114 | No | No |
| Cinephile | Academic · Cultural | Tunis | 2022 | ENAU | Cinema Complex | 3 200 m² | 6 (5) | 179 | 225 | No | No |
| Corallum | Academic · Cultural | Tunisia | 2023 | ENAU | Research and Exhibition Centre | 1 800 m² | 5 (4) | 163 | 233 | No | No |
| Foubert | PRO · New Build | Paris | 2026 | Studio BELEM | Residential New Build | 420 m² | 3 (2, base64) | 119 | 52 | Yes | Revit |
| Hay Mohammadi Station | PRO · Infrastructure | Casablanca | 2025 | Yassir Khalil Studio | RER Station | 6 500 m² | 4 (3) | 150 | 180 | No | Revit |
| La Villette | PRO · Rehabilitation | Paris | 2025–2026 | Studio BELEM | Residential Rehabilitation | 940 m² | 3 (2, base64) | 126 | 78 | No | "BIM" only |
| Villa Papillon | PRO · Residential | Morocco | 2024 | Yassir Khalil Studio | Contemporary Villa | 480 m² | 1 (0) | 135 | 0 | Yes | Revit |
| Sentry | PRO · Small Scale | Morocco | 2024 | Yassir Khalil Studio | Guard Pavilion | 38 m² | 3 (2) | 98 | 95 | No | No |
| Tamansourt Campus | PRO · Healthcare | Morocco | 2024 | Yassir Khalil Studio | Hospital and Wellness Campus | 12 000 m² | 3 (2) | 141 | 113 | No | "BIM" only |
| Zenata Station | PRO · Infrastructure | Casablanca | 2025 | Yassir Khalil Studio | Regional Rail Station | 4 200 m² | 2 (1) | 146 | 88 | Yes | No |

**Case-study coverage (agent B §3.3)**
- Own role is stated on 3/12 pages.
- Software is named on 3/12 pages, and it is always Revit. Unreal, D5, PBR, photogrammetry, laser scan and point cloud appear on 0/12 project pages.
- Results or recognition appear on 2/12 pages.
- A supervisor is named on 0/3 academic pages.
- "earth / earthen / rammed" appears only in figcaptions (`project-al-arg.html:196,244`; `project-tamansourt.html:206,209`).
- "vernacular" appears once in visible text (`project-al-arg.html:178`).

**Order and navigation**
- The canonical order (`js/main.js:15-28`) matches the grid and the ItemList JSON-LD (`architecture.html:109-195`).
- All 22 prev/next links match that order. The sequence does not wrap around.

### 4.3 Profile facts as currently published (`about.html`)

**Experience**
- 2025–present · Studio BELEM, Paris · "Architectural Intern · Ongoing" (`:134-138`)
- 2025 · Sakura Science Program, Japan · "Saga University & Waseda University · Invited researcher · Sole Tunisian representative", with the distinction "Most Appreciated Research" (`:142-147`)
- 2024–2025 · Yassir Khalil Studio, Casablanca · "Architectural Intern · Full time" (`:151-155`)
- 2023 · 2ADP Salim Ben Rejeb Architectes, Tunis · "Architectural Intern" (`:159-163`)
- 2020–2021 · Société de Préservation du Village d'ARG · "Intern & Volunteer": "Field surveys and heritage assessment of an abandoned village, foundational documentation for the award-winning thesis." (`:167-171`)

**Education**
- Feb. 2026 · National Architecture Diploma (DNA), ENAU · "Thesis: Between the Poetics of Place and the Value of Heritage" · Highest Honours (`:180-185`)
- June 2024 · Final Year Architectural Thesis · Unanimous jury · Highest Honours (`:189-194`)
- 2018–2020 · First Cycle Diploma · With Distinction (`:198-202`)

**Skills** (`:211-231`)
- BIM & Design: Revit, ArchiCAD, AutoCAD, Rhino, Grasshopper
- Visualisation: D5 Render, Unreal Engine, Photoshop, Illustrator
- Documentation: InDesign, Office Suite
- Motion: After Effects, Premiere Pro

**Languages:** Arabic (native), French (fluent), English (fluent) (`:239-241`)

**Distinctions** (`:248-272`)
- 2026 Highest Honours, DNA
- 2025 "Best Research Award", Sakura Science Program
- 2025 "2nd Place · Competition", Zenata Station
- 2024 Highest Honours, final-year thesis

### 4.4 Images (50 files, 12.3 MB)

- Formats: all JPEG or PNG. There is **no WebP or AVIF**.
- Every JPEG is baseline (not progressive), and none carries EXIF.
- **Five files have the wrong extension:**
  - three PNGs named `.jpg`: `cinephile/thumb.jpg`, `sentry/sentry-section.jpg`, `tamansourt/tamansourt-render-facade.jpg`
  - two JPEGs named `.png`: `books/thesis-cover.png`, `books/report-cover.png`
- **Duplicate:** `images/images/portrait.jpg` is byte-identical to `images/portrait.jpg` (md5 `ba5b8c4c…`) and is referenced nowhere.
- **Unreferenced by path:** `foubert/Foubert_page-000{1,2}.jpg` and `la-villette/La villette_page-000{1,2}.jpg`. The La Villette pair is byte-identical to the base64 data embedded in `project-la-villette.html:190,203`. The Foubert pair are the full-sheet versions of the cropped data URIs at `project-foubert.html:189,198` (agent B).
- **img markup across 18 pages (72 `<img>`):**
  - 0 have `srcset`;
  - 58 have no `width`/`height`;
  - 54 are `loading="lazy"`;
  - 0 are broken;
  - 0 lack an `alt` attribute.
- The last column below is the largest rendered width divided by the natural width at a 1440 px viewport. A value above 1 means the browser upscales the file, so it looks soft.

| File | KB | Ext | Real format | Pixels | Max upscale at 1440 |
|---|---|---|---|---|---|
| `images/al-arg/al-arg-plans.jpg` | 499 | jpg | JPEG | 1459x1042 | ≤1 |
| `images/al-arg/al-arg-renders.jpg` | 130 | jpg | JPEG | 539x1042 | ×2.55 |
| `images/al-arg/al-arg-structures.jpg` | 288 | jpg | JPEG | 1459x1042 | ≤1 |
| `images/al-arg/al-arg-territory-map.jpg` | 209 | jpg | JPEG | 1187x904 | ×1.16 |
| `images/al-arg/thumb.jpg` | 191 | jpg | JPEG | 928x466 | ≤1 |
| `images/belhomme/belhomme-facades-demolition.jpg` | 229 | jpg | JPEG | 1310x937 | ≤1 |
| `images/belhomme/belhomme-plu-sections.jpg` | 216 | jpg | JPEG | 947x1042 | ×1.45 |
| `images/belhomme/belhomme-render-courtyard.jpg` | 210 | jpg | JPEG | 827x947 | ×1.66 |
| `images/belhomme/thumb.jpg` | 196 | jpg | JPEG | 574x770 | ×1.25 |
| `images/bolivar/bolivar-render-aerial.jpg` | 1472 | jpg | JPEG | 1459x1042 | ≤1 |
| `images/bolivar/bolivar-section-aa.jpg` | 237 | jpg | JPEG | 1337x820 | ≤1 |
| `images/bolivar/bolivar-volumetric-strategy.jpg` | 62 | jpg | JPEG | 476x804 | ×2.89 |
| `images/bolivar/thumb.jpg` | 250 | jpg | JPEG | 611x760 | ×1.18 |
| `images/books/report-cover.png` | 178 | png | JPEG ⚠ | 703x1003 | ≤1 |
| `images/books/thesis-cover.png` | 156 | png | JPEG ⚠ | 714x1012 | ≤1 |
| `images/cinephile/cinephile-plan-n01.jpg` | 144 | jpg | JPEG | 1003x1042 | ×1.37 |
| `images/cinephile/cinephile-renders.jpg` | 207 | jpg | JPEG | 1450x1042 | ≤1 |
| `images/cinephile/cinephile-section-facade.jpg` | 140 | jpg | JPEG | 1305x884 | ×1.05 |
| `images/cinephile/cinephile-site-study.jpg` | 135 | jpg | JPEG | 1459x1042 | ≤1 |
| `images/cinephile/cinephile-sketches.jpg` | 271 | jpg | JPEG | 1459x854 | ≤1 |
| `images/cinephile/thumb.jpg` | 234 | jpg | PNG ⚠ | 587x341 | ×1.22 |
| `images/corallum/corallum-facade-research.jpg` | 47 | jpg | JPEG | 1459x678 | ≤1 |
| `images/corallum/corallum-renders.jpg` | 82 | jpg | JPEG | 633x945 | ×2.17 |
| `images/corallum/corallum-site.jpg` | 183 | jpg | JPEG | 1299x890 | ×1.06 |
| `images/corallum/corallum-volume-research.jpg` | 51 | jpg | JPEG | 758x1042 | ×1.81 |
| `images/corallum/thumb.jpg` | 158 | jpg | JPEG | 1134x993 | ≤1 |
| `images/foubert/Foubert_page-0001.jpg` | 563 | jpg | JPEG | 1459x1042 | n/a |
| `images/foubert/Foubert_page-0002.jpg` | 381 | jpg | JPEG | 1459x1042 | n/a |
| `images/foubert/thumb.jpg` | 167 | jpg | JPEG | 599x798 | ×1.20 |
| `images/hay-mohammadi/hay-mohammadi-render.jpg` | 426 | jpg | JPEG | 1486x978 | ≤1 |
| `images/hay-mohammadi/hay-mohammadi-section.jpg` | 52 | jpg | JPEG | 1273x355 | ×1.08 |
| `images/hay-mohammadi/hay-mohammadi-structure.jpg` | 304 | jpg | JPEG | 1150x912 | ×1.19 |
| `images/hay-mohammadi/thumb.jpg` | 351 | jpg | JPEG | 2000x702 | ≤1 |
| `images/images/portrait.jpg` | 121 | jpg | JPEG | 720x900 | n/a |
| `images/la-villette/La villette_page-0001.jpg` | 408 | jpg | JPEG | 1459x1042 | n/a |
| `images/la-villette/La villette_page-0002.jpg` | 348 | jpg | JPEG | 1459x1042 | n/a |
| `images/la-villette/thumb.jpg` | 129 | jpg | JPEG | 599x755 | ×1.33 |
| `images/motion/beelove-thumb.jpg` | 124 | jpg | JPEG | 1919x1079 | ≤1 |
| `images/motion/glitch-thumb.jpg` | 102 | jpg | JPEG | 1907x1079 | ≤1 |
| `images/motion/planets-thumb.jpg` | 130 | jpg | JPEG | 1077x1079 | ≤1 |
| `images/papillon/thumb.jpg` | 300 | jpg | JPEG | 2000x1319 | ≤1 |
| `images/portrait.jpg` | 121 | jpg | JPEG | 720x900 | ≤1 |
| `images/sentry/sentry-render.jpg` | 320 | jpg | JPEG | 1490x978 | ≤1 |
| `images/sentry/sentry-section.jpg` | 88 | jpg | PNG ⚠ | 712x340 | ×1.93 |
| `images/sentry/thumb.jpg` | 96 | jpg | JPEG | 925x549 | ≤1 |
| `images/tamansourt/tamansourt-render-aerial.jpg` | 33 | jpg | JPEG | 500x238 | ×2.75 |
| `images/tamansourt/tamansourt-render-facade.jpg` | 109 | jpg | PNG ⚠ | 460x247 | ×2.99 |
| `images/tamansourt/thumb.jpg` | 815 | jpg | JPEG | 2000x1417 | ≤1 |
| `images/zenata/thumb.jpg` | 522 | jpg | JPEG | 2000x1340 | ≤1 |
| `images/zenata/zenata-programme-section.jpg` | 380 | jpg | JPEG | 992x1403 | ×1.39 |


### 4.5 Videos (6 files, 151 MB)

All six are H.264 + AAC with the `moov` atom first (fast start). They are played by a single reusable `<video preload="none" controls playsinline>` per page, with the source set by JS. There is no poster and no `<track>` captions (`motion.html:459-462`, `videos.html:192-196`). Whether the audio contains speech is UNDETERMINED.

| File | MB | Seconds | Pixels | Video | Audio track | Avg Mb/s | moov first (faststart) |
|---|---|---|---|---|---|---|---|
| `videos/beelove.mp4` | 8.1 | 15.04 | 1280×720 | H.264 | AAC | 4.54 | yes |
| `videos/glitch.mp4` | 1.7 | 7.98 | 640×352 | H.264 | AAC | 1.83 | yes |
| `videos/planets.mp4` | 2.5 | 5.03 | 1280×720 | H.264 | AAC | 4.23 | yes |
| `videos/sentry.mp4` | 18.4 | 36.82 | 1280×720 | H.264 | AAC | 4.18 | yes |
| `videos/sidi-maarouf.mp4` | 60.0 | 120.02 | 1280×720 | H.264 | AAC | 4.19 | yes |
| `videos/zenata.mp4` | 60.0 | 120.06 | 1280×720 | H.264 | AAC | 4.19 | yes |


### 4.6 Links

**Internal:** 0 broken. In 36 page loads (18 pages × 2 widths), no request returned 4xx/5xx and no request failed except the policy-blocked analytics script. Every anchor target exists (agents A and B: `#main`, `#contact`, `#works`, `#mot-*`, `#video-sentry`, `#video-zenata`). There are no root-relative paths, so the `/portfolio/` base path is safe.

**External:**

| Link | Where | Status |
|---|---|---|
| LinkedIn profile | 19 `href` occurrences across 18 pages, all `target="_blank" rel="noopener noreferrer"` | NOT CHECKED (blocked by policy) |
| Heyzine flip-books ×2 | `data-book-src`, `books.html:129,179,193,242` | NOT CHECKED (blocked) |
| Google Fonts | 18 pages | 200 |
| `mailto:hazemradhouani@gmail.com` | `about.html:280,320`; `motion.html:401` | – |

**Missing on purpose-critical pages**
- `index.html` has no footer, no email and no LinkedIn.
- `videos.html` is not linked from `index.html` or `motion.html`.
- `motion.html` has no link to `about.html` or `books.html`.

### 4.7 Alt text, placeholders, inconsistencies

**Alt text**
- All images have an alt attribute, and project-page alts are specific and unique (agent B).
- Problems:
  - `index.html:423` "Motion design still" is non-descriptive.
  - The same file, `images/hay-mohammadi/thumb.jpg`, is described as "Hay Mohammadi RER Station" (`architecture.html:369`) and as "Sidi Maarouf Station" (`motion.html:301`, `videos.html:148`).

**Placeholder text:** none found by any reader. The unfinished items are a missing `images/og-cover.jpg` (referenced on 6 pages) and CSS for a `404.html` that does not exist (`css/styles.css:2477-2522`).

**Factual inconsistencies** (quoted; which version is correct is for you to decide):

| Topic | Versions found |
|---|---|
| Graduation year of the Highest Honours | "ENAU Carthage, 2024" (JSON-LD, e.g. `about.html:45`) vs "graduated with Highest Honours (ENAU, 2026)" (`about.html:126`) and "ENAU 2026" (`about.html:21`) |
| Thesis title and date | The title is filed under the Feb. 2026 DNA (`about.html:180-184`), but dated "Academic · Thesis · 2024" / "June 2024" (`books.html:152,167`). Al-Arg calls it "ENAU · National Architecture Diploma" (`project-al-arg.html:164-165`), while about lists June 2024 as the "Final Year Architectural Thesis" (`:189-194`). |
| Sakura distinction | "Most Appreciated Research" (`about.html:147`) vs "Best Research Award" (`about.html:257`; `books.html:227,237`; JSON-LD on 17 pages) |
| "award-winning thesis" | `about.html:171`, `architecture.html:272`. The only thesis distinction shown is the jury grade (`books.html:167`). |
| Supervisor | "Prof. Monsef Al-Fourati · Prof. Adnan Ben Nejma" (`books.html:163`) vs "Prof. Moncef Fourati" (`books.html:231`) |
| Thesis site name | "Al-Arg", "ARG", "Al Erg", "El Erg", "Hammat Al Jarid", "Jérid" (`project-al-arg.html:152,178`; `books.html:154,172`; keywords) |
| Al-Arg material system | "vernacular stone architecture" (`project-al-arg.html:178`) vs "stone and earth wall … rammed construction" (`:196`) and "earthen constructive system … earth masonry" (`:244`) |
| Practice locations | "Paris, Casablanca, Tokyo" (`about.html:126`) vs "based between Paris, Casablanca, and Tunis" (`motion.html:366`). The only Japan item is a 2025 research programme, and no project is in Japan. |
| Current employer (structured data) | `worksFor` lists Yassir Khalil Studio (`about.html:59-78`, on 17 pages) although the role ended 2024–2025 (`about.html:151`) |
| Authorship (structured data) | CreativeWork `author` is the owner alone on all 12 projects (`projects/*.html:101-104`), while page text credits office teams (`project-foubert.html:179`, `project-tamansourt.html:179`, `project-zenata.html:164`) |
| Job title | "Architect" (JSON-LD, footers) vs "Architectural Intern · Ongoing" (`about.html:137`) vs "architect and motion designer" (`index.html:14`) |
| "2026" figure | "professional and research portfolio" (`index.html:410`) vs "Paris practice" (`architecture.html:250`) |

## 5. Current design system (as implemented)

### 5.1 Colour

**Tokens and literals**
- 46 custom properties are defined, 61 times in total.
- 12 are never used, including all 5 easing tokens, `--accent-light`, `--accent-dark` and the 3 shadow tokens.
- 24 distinct hex values and 47 distinct rgba values are written as literals.

**Duplicates**
- Near-duplicate off-whites: `#f7f6f4`, `#f6f6f6`, `#f4f4f2`, `#f3f3f1`, `#f0f0f0`, `#ebebeb`.
- Near-blacks: `#0d0d0d`, `#111111`, `#141210`, `#1a1a1a`, plus `#080808` on `index.html`.
- Translucent black uses two different bases, `rgba(0,0,0,·)` ×11 and `rgba(13,13,13,·)` ×20.
- Translucent white appears 39 times with 20 different alphas.
- (agent C §2)

**Core palette in use**

| Role | Values |
|---|---|
| Ink | `--black #0d0d0d` |
| Paper | `#ffffff` |
| Greys | `--g400 #8c8c8c`, `--g600 #4a4a4a`, `--g100 #ebebeb` |
| Accent | `--accent #B5622A` (burnt orange) |

**Failing text pairs**
- `--g400` on white: **3.36:1**. It is used for the footer, card meta, CV metadata, labels and captions.
- `--accent` on white: **4.43:1**, used on small kickers.
- `--accent` on `#fdf6f1`: **4.14:1**.
- (agent C §2; confirmed in the browser in §6.6)

### 5.2 Typography

**Three separate type systems**

| Pages | Fonts loaded |
|---|---|
| `index.html` | Jost + DM Mono |
| `motion.html` | Jost + Cormorant Garamond, body forced to a Futura-first stack with `!important` (`motion.html:61-64`) |
| The other 16 pages | Cormorant Garamond + DM Sans + DM Mono |

**Rendered fonts vs declared fonts** (Chromium DevTools `CSS.getPlatformFontsForNode`, 1440 px)
- Every display stack starts with `"Arial Black"`, a system font with no web source. On OSes that have it installed (Windows/macOS, UNVERIFIED), headings render in Arial Black and the web fonts serve only as fallbacks. In this Linux test they fell back.
- `architecture.html` h1/h2 render in **DejaVu Sans (system)**, because the stack's web fallback, Jost, is not loaded on that page (`architecture.html:32`).
- `motion.html` paragraphs declared as DM Mono render in **Liberation Mono (system)**, because DM Mono is not loaded there.
- Headings request weight 900, but only DM Sans 300/400 is loaded, so the bold is synthesised (`css/styles.css:3702`).
- Cormorant Garamond is requested (render-blocking) on 17 pages. Its only live use is the JS mobile-menu links (`css/styles.css:2719`, agent C). At 1440 px it was loaded on none of the 18 pages; the mobile Lighthouse run did download it.

**Scale**
- There is no type scale: 112 distinct `font-size` values (42 rem literals, 68 one-off `clamp()`, 2 px) (agent C §3).
- Body text is `13.5px` (`css/styles.css:51`), in px while everything else is in rem.
- **Small text:** 75 of 122 rem-literal sizes are below 10 px. In the browser, nav links render at 10 px, project meta labels at **8 px**, kickers at 9 to 10 px, and the contact-form labels at 8.32 px on mobile (`css/styles.css:2848`).

**Weights and tracking**
- Weights 300, 400, 700, 800 and 900.
- 36 line-heights, 17 letter-spacings.
- 74 `uppercase` declarations.

### 5.3 Spacing, radii, borders, depth

- **Spacing:** no scale. There are 152 distinct spacing tokens mixing rem, px and em in steps of .01 to .02 rem. The gutter `clamp(1.25rem, 4.5vw, 2.75rem)` is repeated 16 times with no token.
- **Radii:** 0, 1, 2, 3, 4, 6 px and 50%. The later layers reset many of them to 0.
- **Borders:** all solid, at 1, 1.4, 1.6 and 2 px. The dominant rule is `1px solid` ink.
- **Shadows:** 9 declarations; the shadow tokens are unused.
- **z-index:** 9 values (0 to 600).

### 5.4 Breakpoints

- 149 `@media` blocks: 19 distinct `max-width` values (360 to 1080 px) and 4 `min-width` values (500, 601, 641, 1041). There are 55 `(hover: hover)` blocks and no container queries.
- **The nav collapse point differs between layers:** 640/641 px in the base layer and JS (`css/styles.css:2570-2578`, `js/main.js:845`), 720 px in the later layers (`css/styles.css:3490-3496`, `:4563-4570`). See §6.9 for the browser result.
- There is no print stylesheet.

### 5.5 Components

| Component | Where | States styled |
|---|---|---|
| Skip link | `css/styles.css:99-105` | focus |
| Fixed header, text logo "HR" | – | – |
| Desktop nav | – | hover, focus-visible, active, `aria-current` |
| JS-injected full-screen mobile menu (`role="dialog"`) | `js/main.js:642-848` | – |
| Architecture hero and figures | – | – |
| Taxonomy band | – | – |
| Project card (image, tags, title, meta, hover overlay) | – | – |
| Project page | – | – |
| Gallery groups with figcaptions | – | – |
| Prev/next project nav | – | – |
| Swipe hint | – | – |
| CV rows | – | – |
| Contact form | – | focus-within, disabled, success/error |
| Books reader (iframe dialog) | – | – |
| Video cards + lightbox | – | – |
| Floating and inline back-to-top | – | – |
| Footer | – | – |

The full state map is in agent C §7.

### 5.6 Motion

**Inventory:** 186 motion declarations (99 transitions, 39 animations), 30 distinct durations (60 ms to 3.6 s) and 8 easings. `cubic-bezier(0.2,0,0.2,1)` is used 117 times as a literal, and no easing token is used.

**Page-level motion**
- `body` starts at `opacity: 0` and fades in over 600 ms (`css/styles.css:49-59`).
- Many blocks use `opacity:0; animation: fadeUp 700ms … <delay>` (for example `:935`, `:978`, `:1094`).
- Every internal link click fades the page out and waits 280 ms before navigating (`js/main.js:79-86`).
- The architecture cards run an infinite shimmer (`:721`).
- Scroll reveal is driven by IntersectionObserver (`js/main.js:306-322`).

**Purpose:** no animation has a documented purpose. This conflicts with the CLAUDE.md motion rule.

**prefers-reduced-motion**
- 8 blocks. The global rule (`css/styles.css:1761-1767`) shortens durations to 1 ms and disables the body fade.
- **Not covered:**
  - delays (content stays hidden for up to 500 ms);
  - `scroll-behavior: smooth` (`:42`);
  - `scrollIntoView` in `js/main.js:137`;
  - the inline rAF scrolls (`about.html:308`, `motion.html:441,598`, `videos.html:229`).
- In the browser, running animations dropped from 12 to 0 on architecture under `reduce`.

## 6. Baseline metrics

### 6.1 How to read these numbers

- **Lighthouse** uses *simulated* throttling (Lantern): mobile is Slow 4G + 4× CPU on a 412×823 @1.75 screen; desktop uses the desktop preset. Each figure is the median of 3 runs.
- **Mobile lab (§6.4)** uses *applied* DevTools throttling with Lighthouse's own mobile constants (562.5 ms latency, 1474.56 kbps down, 675 kbps up, 4× CPU; `@paulirish/trace_engine/.../simulation/Constants.js:11-18`). Its metrics are read from the browser's own PerformanceObserver entries.
- **The two methods disagree in absolute terms** (for example, index LCP 4.06 s in Lighthouse vs about 1.5 s in the lab). Compare like with like across phases. Which method gates the "LCP under 2.5 s" bar is a decision for 03-spec.
- **Everything is measured on a local server.** Real network conditions are NOT MEASURED.

### 6.2 Lighthouse desktop (median of 3)

| Page | Runs | Perf (range) | A11y | BP | SEO | FCP s | LCP s (range) | CLS | TBT ms | Weight KB |
|---|---|---|---|---|---|---|---|---|---|---|
| index | 3 | 100 (99-100) | 96 | 96 | 100 | 0.47 | 0.72 (0.68–0.82) | 0.005 | 0 | 465 |
| about | 3 | 98 (98-98) | 97 | 96 | 100 | 0.91 | 0.91 (0.91–0.92) | 0 | 0 | 235 |
| architecture | 3 | 99 (98-99) | 97 | 96 | 100 | 0.78 | 0.85 (0.82–0.98) | 0 | 0 | 1378 |
| books | 3 | 97 (97-98) | 91 | 96 | 100 | 1.00 | 1.00 (0.92–1.03) | 0 | 0 | 456 |
| motion | 3 | 99 (99-99) | 97 | 96 | 100 | 0.74 | 0.78 (0.78–0.79) | 0 | 0 | 1404 |
| project-al-arg | 3 | 97 (97-98) | 96 | 96 | 100 | 0.90 | 1.08 (1.07–1.08) | 0 | 0 | 1440 |
| project-belhomme | 3 | 97 (97-98) | 96 | 96 | 100 | 0.90 | 1.02 (1.02–1.04) | 0 | 0 | 973 |
| project-bolivar | 3 | 97 (97-97) | 96 | 96 | 100 | 0.91 | 1.06 (1.06–1.08) | 0 | 0 | 2144 |
| project-cinephile | 3 | 97 (96-97) | 96 | 96 | 100 | 0.90 | 1.15 (1.15–1.19) | 0 | 0 | 1254 |
| project-corallum | 3 | 98 (98-98) | 96 | 96 | 100 | 0.89 | 0.93 (0.92–0.94) | 0 | 0 | 644 |
| project-foubert | 3 | 94 (94-94) | 96 | 96 | 100 | 1.22 | 1.22 (1.21–1.23) | 0 | 0 | 633 |
| project-hay-mohammadi | 3 | 96 (96-97) | 96 | 96 | 100 | 0.89 | 1.19 (1.19–1.21) | 0 | 0 | 1256 |
| project-la-villette | 3 | 89 (89-90) | 96 | 96 | 100 | 1.49 | 1.49 (1.44–1.50) | 0 | 0 | 942 |
| project-papillon | 3 | 98 (98-98) | 96 | 96 | 100 | 0.91 | 0.93 (0.93–0.94) | 0 | 0 | 421 |
| project-sentry | 3 | 98 (98-98) | 96 | 96 | 100 | 0.91 | 0.91 (0.90–0.91) | 0 | 0 | 625 |
| project-tamansourt | 3 | 95 (95-95) | 96 | 96 | 100 | 0.89 | 1.36 (1.36–1.37) | 0 | 0 | 1079 |
| project-zenata | 3 | 96 (96-96) | 96 | 96 | 100 | 0.90 | 1.24 (1.24–1.25) | 0 | 0 | 1024 |
| videos | 3 | 95 (95-95) | 96 | 96 | 100 | 0.91 | 1.37 (1.36–1.39) | 0 | 0 | 1083 |


The failing audits are identical on almost every page:
- Accessibility: `color-contrast` (all pages) and `label-content-name-mismatch` (all pages: the "HR" logo's accessible name "Hazem Radhouani, Home" does not contain its visible text, WCAG 2.5.3). `aria-required-parent` fails on books.
- Best Practices: `errors-in-console`, caused only by the blocked analytics script.
- SEO: 100 on every page.

### 6.3 Lighthouse mobile (median of 3 where it could run)

| Page | Runs | Perf (range) | A11y | BP | SEO | FCP s | LCP s (range) | CLS | TBT ms | Weight KB |
|---|---|---|---|---|---|---|---|---|---|---|
| index | 3 | 82 (82-82) | 96 | 96 | 100 | 2.47 | 4.06 (4.05–4.06) | 0 | 0 | 465 |
| about | NOT MEASURED | Lighthouse runtime error NO_FCP in 3/3 runs |  |  |  |  |  |  |  |  |
| architecture | NOT MEASURED | Lighthouse runtime error NO_FCP in 2/2 runs |  |  |  |  |  |  |  |  |
| books | NOT MEASURED | Lighthouse runtime error NO_FCP in 1/1 runs |  |  |  |  |  |  |  |  |
| motion | NOT MEASURED | Lighthouse runtime error NO_FCP in 1/1 runs |  |  |  |  |  |  |  |  |
| project-al-arg | 3 | 75 (74-75) | 96 | 96 | 100 | 3.06 | 4.96 (4.96–4.96) | 0 | 0 | 1189 |
| project-belhomme | 3 | 74 (74-74) | 96 | 96 | 100 | 3.01 | 5.18 (5.18–5.26) | 0 | 0 | 1010 |
| project-bolivar | 3 | 73 (73-74) | 96 | 96 | 100 | 3.18 | 5.41 (5.40–5.41) | 0 | 0 | 2182 |
| project-cinephile | 3 | 73 (73-73) | 96 | 96 | 100 | 3.19 | 5.48 (5.48–5.48) | 0 | 0 | 1007 |
| project-corallum | 3 | 79 (79-79) | 96 | 96 | 100 | 3.01 | 4.28 (4.28–4.28) | 0 | 0 | 635 |
| project-foubert | 3 | 67 (67-67) | 96 | 96 | 100 | 4.99 | 5.42 (5.42–5.48) | 0 | 0 | 671 |
| project-hay-mohammadi | NOT MEASURED | Lighthouse runtime error NO_FCP in 1/1 runs |  |  |  |  |  |  |  |  |
| project-la-villette | 3 | 61 (60-61) | 96 | 96 | 100 | 6.62 | 6.85 (6.85–6.92) | 0 | 0 | 980 |
| project-papillon | NOT MEASURED | Lighthouse runtime error NO_FCP in 1/1 runs |  |  |  |  |  |  |  |  |
| project-sentry | 3 | 84 (83-84) | 96 | 96 | 100 | 2.99 | 3.62 (3.54–3.63) | 0 | 0 | 663 |
| project-tamansourt | NOT MEASURED | Lighthouse runtime error NO_FCP in 1/1 runs |  |  |  |  |  |  |  |  |
| project-zenata | NOT MEASURED | Lighthouse runtime error NO_FCP in 1/1 runs |  |  |  |  |  |  |  |  |
| videos | NOT MEASURED | Lighthouse runtime error NO_FCP in 1/1 runs |  |  |  |  |  |  |  |  |


`NO_FCP` means Lighthouse waited for Chrome's `firstContentfulPaint` event and never received it. The limit was 30 s (default) on the first pages and 15 s later, so failures cost less time (`lighthouse/core/gather/driver/wait-for-condition.js:77-99`).

The saved trace for About shows:
- the page finished loading at 0.67 s;
- Chrome's first paint was at 2.81 s;
- frames show the body fading in until 3.17 s;
- no contentful-paint event was ever emitted.

Every failing page loads `styles.css`, whose `body` starts at `opacity:0` (`css/styles.css:56-57`). The same page in a Playwright browser with identical emulation does report FCP (568 ms).

So: the root cause inside Chromium is UNVERIFIED, but the page design, which hides all content behind an opacity animation, is what makes it unmeasurable here, and it conflicts with the CLAUDE.md rule "Nothing blocks content".

Render-blocking resources on every measured page:
- the Google Fonts stylesheet;
- `styles.css` (137 KB), on every page except index.

### 6.4 Mobile lab substitute (NOT Lighthouse; 3 runs, median by LCP)

| Page | FCP s | LCP s (range of 3) | LCP < 2.5 s | CLS | TBT≈ ms | Transferred KB | LCP element |
|---|---|---|---|---|---|---|---|
| index | 1.52 | 1.52 (1.48–1.53) | PASS | 0.012 | 0 | 465 | `h1.cover-title` |
| about | 2.08 | 2.48 (2.38–2.56) | PASS | 0 | 0 | 272 | `p.about__bio-text` |
| architecture | 2.13 | 2.13 (2.13–2.14) | PASS | 0 | 0 | 697 | `img thumb.jpg` |
| books | 2.27 | 2.37 (2.36–2.38) | PASS | 0.007 | 3 | 494 | `img.bk-entry__cover-img thesis-cover.png` |
| motion | 2.35 | 6.27 (6.26–6.29) | FAIL | 0 | 0 | 1563 | `img.mot-card__thumb beelove-thumb.jpg` |
| videos | 2.23 | 4.32 (4.26–4.36) | FAIL | 0.009 | 0 | 1120 | `img.vid-card__thumb thumb.jpg` |
| project-al-arg | 2.27 | 3.88 (3.70–3.92) | FAIL | 0.004 | 0 | 1478 | `img.proj-img thumb.jpg` |
| project-belhomme | 2.25 | 3.80 (3.78–3.82) | FAIL | 0.009 | 0 | 1010 | `img.proj-img thumb.jpg` |
| project-bolivar | 2.26 | 4.86 (4.85–4.88) | FAIL | 0.007 | 0 | 2181 | `img.proj-img thumb.jpg` |
| project-cinephile | 2.28 | 5.57 (5.56–5.60) | FAIL | 0.009 | 0 | 1292 | `img.proj-img thumb.jpg` |
| project-corallum | 2.29 | 2.62 (2.57–2.70) | FAIL | 0.008 | 0 | 682 | `img.proj-img thumb.jpg` |
| project-foubert | 2.26 | 3.62 (3.60–3.62) | FAIL | 0.007 | 0 | 1036 | `img.proj-img thumb.jpg` |
| project-hay-mohammadi | 2.28 | 6.40 (6.39–6.41) | FAIL | 0.001 | 0 | 1294 | `img.proj-img thumb.jpg` |
| project-la-villette | 2.26 | 3.10 (3.09–3.11) | FAIL | 0.013 | 0 | 1736 | `img.proj-img thumb.jpg` |
| project-papillon | 2.27 | 3.70 (3.70–3.71) | FAIL | 0.029 | 0 | 458 | `img.proj-img thumb.jpg` |
| project-sentry | 1.95 | 1.95 (1.94–1.95) | PASS | 0.005 | 0 | 663 | `img.proj-img thumb.jpg` |
| project-tamansourt | 2.26 | 7.28 (7.28–7.29) | FAIL | 0.001 | 0 | 1116 | `img.proj-img thumb.jpg` |
| project-zenata | 2.25 | 6.93 (6.92–6.94) | FAIL | 0.001 | 0 | 1061 | `img.proj-img thumb.jpg` |


### 6.5 Core Web Vitals summary against CLAUDE.md targets

| Metric (target) | Lighthouse mobile (9 pages measurable) | Mobile lab substitute (18 pages) | Status |
|---|---|---|---|
| LCP (< 2.5 s) | 0/9 pass (3.62 to 6.85 s) | 5/18 pass (1.52 to 7.28 s) | **FAIL** |
| CLS (< 0.1) | 0 on every measured page (desktop max 0.005) | max 0.029 | PASS |
| INP (< 200 ms) | NOT MEASURED (lab navigation) | NOT MEASURED | TBT proxy: 0 ms in Lighthouse, ≈0 to 3 ms in the lab (UNVERIFIED for INP) |
| FCP (context only) | 2.47 to 6.62 s | 1.52 to 2.35 s | – |


### 6.6 Accessibility

**Automated scans:** axe-core 4.13 with WCAG 2.0/2.1/2.2 A and AA plus best-practice, on every page at 375 and 1440 px, after scrolling the whole page so that reveal animations finish.

| Rule | Impact | WCAG / type | Pages | Nodes (max of 375/1440) | Per page (nodes) | Example targets |
|---|---|---|---|---|---|---|
| `color-contrast` | serious | wcag2aa,wcag143 | 18 | 159 | index (1), about (42), architecture (18), books (5), motion (8), videos (4), project-al-arg (9), project-belhomme (7), project-bolivar (7), project-cinephile (9), project-corallum (8), project-foubert (6), project-hay-mohammadi (7), project-la-villette (6), project-papillon (4), project-sentry (6), project-tamansourt (6), project-zenata (6) | `.cover-kicker`; `.exp-item:nth-child(1) > .exp-date`; `.exp-item:nth-child(1) > div > .exp-role` |
| `aria-allowed-role` | minor | best-practice | 4 | 25 | about (2), architecture (12), motion (8), videos (3) | `.about-contact__link[role="listitem"]:nth-child(1)`; `.about-contact__link[role="listitem"][target="_blank"]`; `.card[role="listitem"]:nth-child(1)` |
| `aria-required-parent` | critical | wcag131 | 1 | 6 | books (6) | `article:nth-child(2) > .bk-entry__body > .bk-entry__meta > div[role="listitem"]:nth-child(1)`; `article:nth-child(2) > .bk-entry__body > .bk-entry__meta > div[role="listitem"]:nth-child(2)` |


**Colour-contrast failures by colour pair** (axe data, all pages, both widths):

| Foreground | Background | Ratio | Size | Weight | Pages | Nodes (375+1440) | Examples |
|---|---|---|---|---|---|---|---|
| `#8c8c8c` | `#ffffff` | 3.36 | 7.5pt (10px) | normal | 17 | 111 | `.exp-item:nth-child(1) > .exp-date`; `.exp-item:nth-child(1) > div > .exp-role` |
| `#8c8c8c` | `#ffffff` | 3.36 | 7.0pt (9.28px) | normal | 17 | 68 | `.footer__id`; `.footer__link:nth-child(1)` |
| `#8c8c8c` | `#ffffff` | 3.36 | 6.5pt (8.64px) | normal | 11 | 54 | `.proj-gallery-group.will-reveal.visible:nth-child(1) > .proj-img-block > figure > figcaption`; `.proj-gallery-group.will-reveal.visible:nth-child(2) > .proj-img-block > figure > figcaption` |
| `#8c8c8c` | `#ffffff` | 3.36 | 6.2pt (8.32px) | normal | 14 | 43 | `label[for="cf-name"]`; `label[for="cf-email"]` |
| `#8c8c8c` | `#ffffff` | 3.36 | 6.6pt (8.8px) | normal | 2 | 24 | `.exp-item:nth-child(1) > .exp-date`; `.exp-item:nth-child(2) > .exp-date` |
| `#8c8c8c` | `#ffffff` | 3.36 | 6.4pt (8.48px) | normal | 1 | 12 | `.exp-item:nth-child(1) > div > .exp-role`; `.exp-item:nth-child(2) > div > .exp-role` |
| `#b5622a` | `#ffffff` | 4.42 | 7.4pt (9.92px) | normal | 2 | 6 | `.cover-kicker`; `.studio-hero__kicker` |
| `#b5622a` | `#ffffff` | 4.42 | 9.4pt (12.48px) | normal | 3 | 6 | `em` |
| `#ffffff` | `#b5622a` | 4.42 | 6.2pt (8.32px) | normal | 1 | 4 | `.edu-item:nth-child(1) > div > .edu-mention`; `.edu-item:nth-child(2) > div > .edu-mention` |
| `#b5622a` | `#fdf6f1` | 4.13 | 6.2pt (8.32px) | normal | 1 | 2 | `.exp-award` |

Incomplete (manual review) color-contrast reasons: pseudoContent ×60, imgNode ×2, elmPartiallyObscured ×16


**Keyboard and focus** (Tab through each page, 60 to 400 ms per step; computed styles compared focused vs not):
- Every page has a skip link as its first tab stop. It does not work on 17 pages (§6.9).
- **Focus indicators that exist (verified):**
  - index nav: an underline (`border-bottom-color` transparent → `#080808`);
  - taxonomy links: an ink background inversion;
  - project cards and prev/next: a 2 px solid outline.
- **Weak or missing (from CSS source, agent C; not reproduced in the browser):**
  - contact inputs: a 1.10:1 background change (`css/styles.css:1324`, `:3952-3963`);
  - video element: `outline:none` with no replacement (`css/styles.css:2398`).
- **Target size:** footer links are about 13 px tall and "View selected works" is 19 px tall, below the CLAUDE.md 24×24 bar. axe's WCAG 2.2 target-size rule passes them through its spacing exception.

**Reduced motion:** see §5.6.

**JavaScript disabled:** see §6.9.

### 6.7 Page weight

Lighthouse `total-byte-weight` (median runs; transferred, compressed):
- Desktop: 235 KB (about) to 2,144 KB (bolivar).
- Mobile: 465 KB (index) to 2,182 KB (bolivar).

**Main drivers**
- 2000 px thumbnails shown at about 320 to 720 px.
- `bolivar-render-aerial.jpg`, 1.47 MB.
- The inline base64 galleries (`project-la-villette.html`, 1,018.9 KB of HTML).
- `styles.css` (137 KB raw, 70 to 83% unused per page by Chromium coverage).
- Video files are not part of page load (`preload="none"`), but each film is 18 to 60 MB when played.

### 6.8 Responsive

**Horizontal overflow:** none on any page at 320, 375, 768, 1024, 1440 or 1920 px (`scrollWidth` vs `clientWidth`).

**Screenshots:**
- 18 pages × 375 and 1440, first viewport (`*-fold.png`) and full page (`*-full.jpg`).
- Home page at 0.3 s and 4 s.
- Verification shots.
- All delivered in the attached zip; not committed.

### 6.9 Browser verification of code-level findings

Each check below was run in Chromium 141 against the local server. Screenshots are in the attached zip.

| Check | Method | Result |
|---|---|---|
| Navigation at 600 to 768 px | Load about, architecture, al-arg and motion at 600, 640, 641, 660, 680, 700, 720, 721 and 768 px; count visible header links and the burger | **Defect confirmed.** From 641 to 720 px there are 0 visible nav links and no burger on all 4 pages. Links appear at 721 px; the burger shows at ≤640 px. The same range is reached at 200% zoom on 1282 to 1440 px windows. Cause: `css/styles.css:2576-2578` (`display:none !important`) vs `:3490-3496`, `:4563-4570`. |
| Skip link | Tab, Enter, Tab | **Defect confirmed on the 17 pages that load `main.js`.** Focus stays on the skip link, the hash does not change, and the next Tab lands on "HR" in the header (`js/main.js:128-138`). On `index.html` it works: focus moves into `main`. |
| Fixed header after prev/next | Open al-arg, click "next", scroll 1500 px | **Defect confirmed.** The body keeps `entering--forward` with `transform: matrix(1,0,0,1,0,0)`. The header's top is −1500 px, so it scrolled away. On a direct load it stays at 0 (`css/styles.css:75-88`, `js/main.js:90-96`). |
| Mobile menu focus | 375 px, open the menu, Tab 14 times | **Defect confirmed.** After the 6 menu items, focus moves to the burger (outside the dialog, under the overlay) and then to page links and inputs hidden under the overlay: 8 of 14 stops on about, 7 of 14 on al-arg (`js/main.js:824-841`). |
| Motion nested link | Focus "Architecture project" in the Sentry card, press Enter | **Defect confirmed.** No navigation and no lightbox; the URL is unchanged (`motion.html:523-535`). |
| Focus indicators | Computed style, focused vs not | Indicators are present on the index nav (underline), the taxonomy links (inversion), and cards and prev/next (2 px outline). The contact input could not be focused by this harness, so the CSS evidence stands (agent C). |
| JavaScript disabled | 6 pages with JS off | Content stays visible: 0 hidden text nodes on index, about, architecture and al-arg; 2 on books (hover labels); 1 on motion (video fallback text). The `noscript` overrides work. |
| Focus during reveal | Tab with a 400 ms settle | On about at 375 px, the email link received focus while still at opacity 0 (its reveal-on-scroll had not run yet). |


## 7. UX findings (against the CLAUDE.md audience)

### 7.1 The first 10 seconds (landing page)

**Visible text in the first viewport** (browser text extraction):
- **375 px:** "HR" · nav at 10 px · "Architecture / Motion / Research" (10 px) · h1 "Build from what exists." (79 px) · "12 selected architecture works" · "04 territories: Paris, Casablanca, Tokyo, Tunisia" · "2026 professional and research portfolio". **There is no image, no project and no name.**
- **1440 px:** the same, plus four cards: "Architecture / Selected works", "Motion / Moving image", "Research / Books / thesis", and "Profile / Architect between heritage, cities, and motion. / Paris / Casablanca / Tokyo".

**What a committee member learns in 10 seconds:** an "HR" monogram, a manifesto line and three figures. They do not learn:
- the person's name, which is not visible anywhere on the page (`index.html:390,403` aria-labels only);
- the degree or distinction;
- the specialism. "Heritage documentation" and "earthen/vernacular" do not appear. The only positioning line is "Architect between heritage, cities, and motion." (`index.html:438`).

Motion takes 1 of the 3 image cards and 1 of the 4 index links (`index.html:422,449`). The home page's LCP on mobile is the h1 text, waiting on web fonts (§6.3).

### 7.2 Navigation

The nav set, labels and order change by page:

| Page | Nav |
|---|---|
| index | Architecture · Motion · Books · About · Contact |
| 16 inner pages | Work · Videos · About · Contact · Books · Motion |
| motion | Work (= `motion.html`) · About · Contact · Architecture |

- "Home" goes to `architecture.html` from project pages (`projects/*.html:123`) but to `index.html` from the mobile menu (`js/main.js:684`).
- Six taxonomy links on `architecture.html:256-261` look like filters. Five of them ("Architecture", "Transformations", "Infrastructure", "Housing", "Research") all jump to `#works` and filter nothing; the sixth, "Motion", goes to `motion.html`.
- Projects have no headings below h1, so there is no in-page navigation (`projects/*.html`: h2 to h6 count is 0).

### 7.3 Project storytelling

**Structure:** a consistent template (hero, tag, h1, 5 meta fields, 98 to 186 words of narrative, 0 to 5 captioned gallery sheets, prev/next).

**What is missing for the audience:**
- **Own role:** absent on 9/12 pages.
- **Method or process:** thin on most pages.
- **Tools:** absent on 9/12.
- **Outcomes:** 2/12 pages.
- **Survey/documentation outputs:** none labelled as such, even for Al-Arg, whose text claims "field surveys and heritage documentation … over two years" (`project-al-arg.html:180`).

**Evidence depth varies widely:**
- Villa Papillon has no gallery (1 image, 156 words).
- Zenata has one drawing sheet.
- Foubert has two elevations.
- La Villette has two construction details.

**Visual quality works against the "high-end visualization" claim:**
- Key renders are shown at up to 3× their pixel size (Tamansourt facade ×2.99, Bolivar volumetric ×2.89, Tamansourt aerial ×2.75, Al-Arg renders ×2.55).
- Several sheets are stacked composites in one small file (`al-arg-renders.jpg`, 539×1042 px, holds three renders).

**The flagship candidate, Al-Arg**, has the richest text (186 narrative + 244 caption words). It still lacks:
- a supervisor (who appears on `books.html:163` but not here);
- a statement of individual or group work;
- a link to the thesis document;
- references for the named theory (Scarpa, Grassi, Italian urban morphology).

### 7.4 Calls to action and contact path

- **Landing:** "Contact / Start a conversation" goes to `about.html#contact`, 1 click. The contact section offers the email, LinkedIn and a form that posts to formsubmit.co (`about.html:283`).
- **What is missing:**
  - no CV/PDF download anywhere;
  - no direct thesis download: the thesis is readable only in a JS-opened third-party flip-book (`books.html:129`, `:282-288`);
  - no email or LinkedIn on `index.html` (no footer).
- **Interaction friction:**
  - Every internal click is intercepted: Ctrl/Cmd-click cannot open a new tab (`js/main.js:102-123`), which is a common reviewer habit.
  - Every click adds a 280 ms blank-page delay (`js/main.js:84-86`).
  - The floating back-to-top button shows after 120 ms and never hides (`js/main.js:434`). On a 375 px project page it overlaps the metadata (screenshot `project-al-arg-375-fold.png`).

## 8. Code findings

- **Structure**
  - Two parallel systems: `index.html` has its own inline CSS and tokens (`--black #080808` vs `#0d0d0d`, `css/styles.css:13`), no `main.js` and no footer.
  - `css/styles.css` is 13 chronological patch layers (v9 base → "MVRDV-inspired index pass" → "Flagship secondary system" → 3 correction passes), each overriding the ones before (agent C §9).
  - `css/motion.css` has a first layer that its own later layer overrides entirely.
- **Duplication**
  - 168 selectors are declared in more than one block, and 36 declarations are fully shadowed. For example, `.page-about .about__bio-name` has its font-size set 8 times.
  - 82 `!important`.
  - Nav, footer and JSON-LD are copy-pasted into 18 files with drift (§7.2).
  - The Person JSON-LD block is duplicated on 17 pages.
- **Dead code**
  - 483 lines of CSS are wholly dead: the legacy hero `:294-561`, a 404 page with no `404.html`, and unused gallery grids.
  - 35 classes are never used.
  - Unused: `window.portfolioLinks` (`js/main.js:15-28`), `--reader-scale` (`js/main.js:519`), and 29 `data-i18n` attributes (`books.html`).
  - Scroll handlers with no visual effect: `js/main.js:58-65`, `:147-161`; the second calls `getBoundingClientRect()` on every scroll event.
  - `noscript` rules target classes that are not on the page (`architecture.html:34`).
- **Error handling**
  - The good: every `querySelector` result is null-checked, fetch ends in `.catch`, and storage and focus calls are wrapped.
  - Gaps:
    - fullscreen promises are unhandled (`js/main.js:541,558,578,580`);
    - the IntersectionObserver is created without a feature test inside the single IIFE, so a throw would disable everything after it, including the mobile menu (`js/main.js:150`);
    - `document.querySelector(location.hash)` throws on an invalid hash (`videos.html:224`);
    - timer races (`js/main.js:408`, `:567`).
- **Security**
  - No secrets or keys; the GA4 ID and site-verification token are public identifiers.
  - `innerHTML` is used only with constant strings.
  - The iframe `src` comes from any clicked element's `data-book-src`, with no host check and no `sandbox` (`js/main.js:528`, `books.html:282-288`). The current data is constant.
  - The form posts to a third party with `_captcha=false` and the owner's email in the URL path (`about.html:283-287`).
  - There is no CSP, and inline handlers (`about.html:308`, `motion.html:180,208,236,441`) would block adopting a strict one.
  - GA4 runs with no consent step (18/18 pages).
- **HTML validity**
  - `<button>` elements contain `<div>` (`books.html:132,139,196,203`).
  - Empty `src=""` on `<iframe>`/`<source>` (`books.html:286`, `motion.html:460`, `videos.html:194`).
  - `motion.html` has no `</body></html>`.

## 9. Content gaps

**Everything below needs your input.** None of it will be invented.

1. [CONTENT NEEDED: the correct degree timeline. Which diploma, date and distinction belongs to the June 2024 thesis, and which to the Feb 2026 DNA; which thesis title goes with which.]
2. [CONTENT NEEDED: the official name of the 2025 Sakura Science distinction, and whether "award-winning thesis" is accurate or should read "Highest Honours, unanimous jury".]
3. [CONTENT NEEDED: supervisor names and spelling for the thesis and for the internship report.]
4. [CONTENT NEEDED: your own role, phases and deliverables on each professional project. 9 of 12 pages lack it.]
5. [CONTENT NEEDED: tools per project (Revit, D5, Unreal, the PBR capture workflow, survey instruments).]
6. [CONTENT NEEDED: Al-Arg survey and documentation outputs (measured drawings, photo surveys, condition maps, any photogrammetry or point clouds) and the correct description of its material system (stone vs earth).]
7. [CONTENT NEEDED: higher-resolution source files for the upscaled renders (Tamansourt aerial and facade, Bolivar volumetric, the three Al-Arg renders as separate files, Corallum renders, Sentry section).]
8. [CONTENT NEEDED: the correct image and status of "Sidi Maarouf Station". It currently uses the Hay Mohammadi image and has no project page.]
9. [CONTENT NEEDED: Villa Papillon gallery material, or a decision to drop or merge the project.]
10. [CONTENT NEEDED: thesis and internship-report PDFs (or permission to link a hosted copy) and a thesis abstract.]
11. [CONTENT NEEDED: a social share image (`og-cover`), and whether one per project is wanted.]
12. [CONTENT NEEDED: your current base and how to describe Tokyo (research programme vs practice location); your current job title.]
13. [CONTENT NEEDED: any earthen/vernacular work beyond Al-Arg (research, surveys, workshops) that supports the stated specialism.]
14. [CONTENT NEEDED: whether the film audio contains speech. If so, captions or transcripts.]
15. [CONTENT NEEDED: confirmation that you may publish the Studio BELEM and Yassir Khalil Studio drawings, and the credit line each office requires.]
16. [CONTENT NEEDED: the canonical spelling of the thesis site (Al-Arg / ARG / Al Erg / El Erg) and of the Zenata competition organiser.]
17. [CONTENT NEEDED: a CV PDF and a publications/research list, if the site is to act as a research profile. This is your open question from the first message.]
18. [CONTENT NEEDED (decision): analytics. Keep GA4 with a consent step, switch to cookieless analytics, or remove it.]

## 10. Findings

**Effort scale:**
- **S**: under 1 hour
- **M**: 1 to 4 hours
- **L**: 1 to 2 days
- **XL**: multi-day or structural
- **+Owner**: needs your input first

| ID | Area | Finding | Evidence (file:line or measurement) | Severity | Effort |
|---|---|---|---|---|---|
| F01 | Content truth | Degree dates and thesis attribution contradict each other: the Highest Honours is dated 2024 in one place and 2026 in others; the thesis title is filed under the Feb 2026 DNA but dated June 2024; Al-Arg is labelled "National Architecture Diploma". | `about.html:45` (JSON-LD "…ENAU Carthage, 2024"); `about.html:21,126` ("2026"); `about.html:180-194`; `books.html:152,167`; `project-al-arg.html:164-165` | Critical | S +Owner |
| F02 | Content truth | The Sakura distinction is named two ways, and "award-winning thesis" is claimed where the only thesis distinction shown is a jury grade. | `about.html:147` "Most Appreciated Research" vs `about.html:257`, `books.html:227,237` "Best Research Award"; `about.html:171`, `architecture.html:272` vs `books.html:167` | Critical | S +Owner |
| F03 | First impression | The name is never visible on the landing page. At 375 px the first viewport has no image, no project and no name, only "HR", a manifesto and three figures. | `index.html:390,403` (aria-label only); first-viewport text extraction (§7.1) | High | S |
| F04 | Identity | The stated specialisms barely appear in visible content: "earth/earthen/rammed" is in 4 captions only, "vernacular" appears once, "PBR", photogrammetry and point cloud 0 times, "Unreal" once (skills list). The landing page frames the owner as "Architecture / Motion / Research". | `project-al-arg.html:178,196,244`; `project-tamansourt.html:206,209`; `about.html:219`; `index.html:405,438`; agent greps (A, B) | High | M +Owner |
| F05 | Storytelling | Own role is absent on 9/12 project pages, tools on 9/12, and outcomes on 10/12. | agent B §3.3 matrix, e.g. `project-tamansourt.html:179` "developed by the team at Yassir Khalil Studio" | High | M +Owner |
| F06 | Research access | The thesis and report can only be read inside a JS-opened third-party Heyzine iframe: there is no link, no PDF and no abstract. The reader's focus trap cycles only its 2 toolbar buttons, so the iframe content is not reachable by keyboard. | `books.html:129,179,193,242,282-288`; `js/main.js:607-620` | High | M +Owner |
| F07 | Flagship case | Al-Arg has no supervisor, no individual/group statement, no survey or documentation outputs (despite "field surveys and heritage documentation … over two years"), no link to the thesis and no references for Scarpa, Grassi or Italian urban morphology. | `project-al-arg.html:164,179,180`; supervisor exists only at `books.html:163` | High | M +Owner |
| F08 | Content truth | One image is presented as two projects: the Hay Mohammadi thumbnail is labelled "Sidi Maarouf Station" on two pages. | `architecture.html:369`; `motion.html:300-301`; `videos.html:147-148` | High | S +Owner |
| F09 | Visual quality | Key renders are upscaled up to ×3 at 1440 px: Tamansourt facade ×2.99, Bolivar volumetric ×2.89, Tamansourt aerial ×2.75, Al-Arg renders ×2.55, Corallum renders ×2.17. The source files are 460-633 px wide. This undercuts the visualisation claim. | §4.4 (natural vs rendered width in Chromium) | High | M +Owner |
| F10 | Evidence depth | Villa Papillon has no gallery at all: 1 image and 156 words. | `project-papillon.html:181-184`; agent B §3.4 | High | M +Owner |
| F11 | Performance | Mobile LCP misses the 2.5 s target on every page Lighthouse could measure: 3.62-6.85 s (index 4.06 s). Substitute lab (applied throttling): LCP fails on 13/18 pages (2.62 to 7.28 s). It passes on index 1.52 s, sentry 1.95 s, architecture 2.13 s, books 2.37 s, about 2.48 s. | §6.3; §6.4 | High | L |
| F12 | Motion / perf | All content on 17 pages sits behind a `body{opacity:0}` animation. Lighthouse mobile recorded no FCP on 9/18 pages (trace: first paint 2.81 s, no contentful paint). This conflicts with "Nothing blocks content". | `css/styles.css:49-59`; §6.3 | High | M |
| F13 | Performance | Gallery images are embedded as base64, so HTML weighs 1,018.9 KB (La Villette) and 497.2 KB (Foubert). Mobile FCP is 6.62 s and 4.99 s. | `project-la-villette.html:190,203`; `project-foubert.html:189,198`; §6.3 | High | S |
| F14 | Performance | There are no responsive images or modern formats: 0/72 `<img>` with `srcset`, no WebP/AVIF. 2000 px thumbnails are shown at 318-375 px on mobile, and eager heroes run up to 815 KB (Tamansourt). | §4.4; `project-tamansourt.html:148`; `architecture.html:358` | High | L (needs an image tool: dependency decision) |
| F15 | Accessibility | Text contrast fails WCAG 1.4.3 on all 18 pages: `--g400 #8c8c8c` at 3.36:1, and the accent at 4.43:1 on small text. | axe `color-contrast` (serious) 18/18 (§6.6); `css/styles.css:18,21` | High | S |
| F16 | Accessibility | The 12 project-card links and the contact links carry `role="listitem"`, which replaces the link role (WCAG 4.1.2). | `architecture.html:279-400`; `about.html:280-281`; `motion.html:401-402`; axe `aria-allowed-role` | High | S |
| F17 | Accessibility | Video cards are `<article role="listitem" tabindex="0">` driven by JS handlers, with no button role. The motion lightbox has no focus trap. Pressing Enter on the nested "Architecture project" links does nothing (verified). | `motion.html:171-319,483-538`; `motion.html:530`; `videos.html:126-164,305-315`; §6.9 | High | M |
| F18 | Navigation | There is no navigation at all between 641 and 720 px (also 200% zoom on 1282-1440 px windows): links and burger are both hidden on every page that uses `styles.css`. | `css/styles.css:2576-2578` vs `:3490-3496,4563-4570`; §6.9 (verified on 4 pages) | High | S |
| F19 | Accessibility | "Skip to content" does not move focus on 17 pages (WCAG 2.4.1): focus stays on the link, and the next Tab goes to the header. | `js/main.js:128-138`; §6.9 | High | S |
| F20 | Bug | After prev/next navigation the fixed header scrolls away with the page (the body keeps a transform), so navigation is lost on long case studies. | `css/styles.css:75-88`; `js/main.js:90-96`; §6.9 (header top −1500 px after a 1500 px scroll) | High | S |
| F21 | Accessibility | The mobile menu does not contain focus: Tab leaves the dialog for links and inputs hidden under the overlay (WCAG 2.4.3, 2.4.11). | `js/main.js:824-841`; §6.9 (7-8 of 14 stops outside the dialog) | High | S |
| F22 | Sharing | `og:image` on the 6 top-level pages points to a missing `images/og-cover.jpg`. Project pages use relative `og:image` URLs, and no page has `og:url`. Shares on LinkedIn (the only social channel) get no reliable preview. | `index.html:21` and 5 pages; `projects/*.html:23`; agents A, B | High | S +Owner |
| F23 | Typography | There are three type systems. Heading stacks start with a system font ("Arial Black"), so rendering depends on the OS. Some fonts are declared but not loaded: architecture headings fall back to DejaVu Sans and motion text to Liberation Mono. Weight 900 is synthesised. Cormorant is requested on 17 pages but used only by the mobile menu. | §5.2 (Chromium platform-font report); `css/styles.css:3025,3602,3702,2719`; `motion.html:32,61-64`; `architecture.html:32` | Medium | M |
| F24 | Legibility | 75 of 122 rem font sizes are under 10 px. In the browser, nav is 10 px, project meta labels 8 px and mobile form labels 8.32 px. Body text is set in px (13.5 px). | §5.2; `css/styles.css:51,1580-1591,2848` | Medium | M |
| F25 | Accessibility | The label-in-name check (WCAG 2.5.3) fails on every page: the logo's visible text is "HR" but its accessible name is "Hazem Radhouani, Home". | Lighthouse `label-content-name-mismatch` 18/18; `about.html:98-99` | Medium | S |
| F26 | Navigation | Navigation changes between pages: different sets, labels and order; "Work" means `architecture.html` on 16 pages and `motion.html` on motion; "Home" goes to two different pages (WCAG 3.2.3/3.2.4). | §7.2; `index.html:394-398`; `motion.html:139-142`; `projects/*.html:123`; `js/main.js:684` | Medium | M |
| F27 | UX | Five taxonomy links that look like filters all jump to `#works`. | `architecture.html:256-260` | Medium | S |
| F28 | UX | Link interception breaks Ctrl/Cmd-click (open in new tab) and adds a 280 ms blank-page delay to every internal navigation. | `js/main.js:79-86,102-123` | Medium | S |
| F29 | Motion | Reduced motion is incomplete: delays still hide content for up to 500 ms, smooth scrolling is not reset, 4 inline rAF/smooth scrolls ignore it, and `motion.css` has no reduced-motion block. | `css/styles.css:42,978,1535,1761-1767`; `about.html:308`; `motion.html:441,598`; `videos.html:229` | Medium | S |
| F30 | Motion | No animation has a stated purpose, and there are decorative loops (an infinite shimmer, hover zoom and saturation). This conflicts with the CLAUDE.md motion rule. | `css/styles.css:721`; `index.html:193-194,247-251` | Medium | S |
| F31 | Media | Each film is up to 60 MB (120 s at 4.2 Mb/s), with no poster and no captions track. Audio tracks are present; their content is UNDETERMINED. | §4.5; `motion.html:459-462`; `videos.html:192-196` | Medium | M +Owner |
| F32 | Privacy | GA4 loads on 18/18 pages with no consent step, and there are EU (Paris) visitors. The legal requirement is UNVERIFIED; this is not legal advice. | `index.html:4-10`; grep "consent" = 0 | Medium | S +Owner |
| F33 | Structured data | The CreativeWork `author` is the owner alone on team projects; `worksFor` lists a past employer; there is no `image`; `dateCreated` mismatches the displayed year. | `projects/*.html:101-105`; `project-foubert.html:179`; `about.html:59-78,151` | Medium | S +Owner |
| F34 | Content truth | Secondary facts disagree: practice locations (Tokyo, Tunis), supervisor spelling, six spellings of the thesis site, the Al-Arg material system, job title, and the "2026" figure. | §4.7 table | Medium | S +Owner |
| F35 | Evidence depth | Zenata has one drawing sheet, Foubert two elevations, and La Villette two construction details. None has a plan, section or survey. | `project-zenata.html:172`; `project-foubert.html:184`; `project-la-villette.html:184` | Medium | M +Owner |
| F36 | Performance | Render-blocking resources: the Google Fonts CSS on every page plus the 137 KB `styles.css` on every page except index. Lighthouse estimates 1.79 s of savings on the index mobile run. | Lighthouse `render-blocking-insight`; `projects/*.html:32-33` | Medium | M |
| F37 | Performance | The mobile LCP image is lazy-loaded on motion and videos, and LCP heroes on project pages have no dimensions. | §6.4 LCP elements; `motion.html:176`; `videos.html:128`; `projects/*.html:148` | Medium | S |
| F38 | Code | The CSS is an accretion of 13 patch layers with 82 `!important`, 168 selectors declared more than once, 36 shadowed declarations and 483 dead lines. 70-83% of `styles.css` is unused on each page. | agent C §9-10; Chromium coverage (§6.7) | Medium | XL (rebuild) |
| F39 | Design system | There are no working tokens: 112 font sizes, 152 spacing values, 24 hex and 47 rgba literals, 6 near-duplicate off-whites and 12 unused tokens. | §5 | Medium | XL (rebuild) |
| F40 | Code | `index.html` is a separate design system: its own inline CSS and tokens, no `main.js`, no footer. | `index.html:33-372` | Medium | L |
| F41 | Accessibility | Project pages have no headings below h1; gallery labels are `<p>` elements (WCAG 1.3.1). | `projects/*.html` (h2-h6 = 0); agent B | Medium | S |
| F42 | Accessibility | Forms: the outline is removed and replaced by a 1.10:1 cue; the error is generic, not tied to fields, and clears after 7 s; there are no required markers; `role="alert"` is combined with `aria-live="polite"`. | `css/styles.css:1324,3952-3963`; `js/main.js:349-356,408`; `about.html:290-312` | Medium | M |
| F43 | Accessibility | The video element's outline is removed with no replacement. | `css/styles.css:2398` | Medium | S |
| F44 | Accessibility | Books: `<button>` wraps `<div>`; `role="listitem"` has no list parent (axe `aria-required-parent`, critical impact); the dialog is `aria-hidden` but contains focusable buttons. | `books.html:132-139,157-165,264-273`; axe (§6.6) | Medium | S |
| F45 | Robustness | After a bfcache restore, the `is-leaving--forward/--back` classes keep `transform !important` on body, which can shift the page and detach fixed elements. The code path is confirmed; runtime is UNVERIFIED because Playwright disables bfcache. | `js/main.js:45-53,80-81`; `css/styles.css:67-74` | Medium | S |
| F46 | Deploy / SEO | `robots.txt` lives under `/portfolio/`, where crawlers do not read it. Every sitemap `lastmod` is 2026-03-27, while every page changed on 2026-06-16. | `robots.txt:1-4`; `sitemap.xml:7`; `git log` (agent A) | Low | S |
| F47 | Deploy | The stale `master` branch holds only `videos/`. The Pages source branch is UNVERIFIED. There is no `.nojekyll`, so `CLAUDE.md` and `images/IMAGES_README.txt` may be published (UNVERIFIED). | GitHub API (`master` @ `08615b1`); root listing | Low | S +Owner |
| F48 | Assets | A duplicate portrait, 4 unreferenced page scans, 5 wrong file extensions and filenames containing spaces. | §4.4; `images/images/portrait.jpg`; `images/la-villette/La villette_page-0001.jpg` | Low | S |
| F49 | SEO | Titles use inconsistent separators and the architecture title has no page name. Project meta descriptions are 64-92 character keyword strings, and the same 509-character keywords string is on all 12 project pages. | `index.html:17`; `architecture.html:19`; `projects/*.html:15,17` | Low | S |
| F50 | HTML validity | Empty `src=""` on an iframe and on `<source>` elements; `motion.html` lacks `</body></html>`; obsolete iframe attributes. | `books.html:282-288`; `motion.html:460,618`; `videos.html:194` | Low | S |
| F51 | Code | Dead JS: `window.portfolioLinks`, `--reader-scale`, two scroll handlers with no effect (one calls `getBoundingClientRect` on every scroll), and 29 unused `data-i18n` attributes. | `js/main.js:15-28,58-65,147-161,519`; `books.html` | Low | S |
| F52 | Robustness | IntersectionObserver is used without a feature test inside the single IIFE (a throw would kill the mobile menu); fullscreen promises are unhandled; the raw hash is passed to `querySelector`; there are timer races. | `js/main.js:150,408,541,567`; `videos.html:224` | Low | S |
| F53 | Security | The form posts to formsubmit.co with its captcha disabled and the address in the URL path. The iframe `src` comes from any `data-book-src` without a host check, and the iframe is not sandboxed. Inline handlers would block a strict CSP. | `about.html:283-287`; `js/main.js:371,528`; `books.html:282-288`; `motion.html:180,441` | Low | S |
| F54 | Accessibility | New-tab links carry no warning. French phrases have no `lang`. The About and Motion h1s read as "HazemRadhouani" because the spans have no whitespace. | 19 LinkedIn links; `books.html:167`; `about.html:121,169`; `motion.html:153` | Low | S |
| F55 | IA | `videos.html` duplicates the films already on `motion.html`, and is not linked from index or motion. | `videos.html:126-181` vs `motion.html:270-341` | Low | S +Owner |
| F56 | UX | The floating back-to-top button appears after 120 ms, never hides, and covers content on 375 px project pages. | `js/main.js:434`; screenshot `project-al-arg-375-fold.png` | Low | S |
| F57 | Layout | Card `width`/`height` attributes differ from the real pixels on 7 thumbnails, and heroes are cropped by `object-fit: cover`. | `architecture.html:227-402`; `css/styles.css:4235-4255` | Low | S |

