# Orbigreen Techsource — Website (Technical README)

Marketing site + lightweight lead-capture backend for **Orbigreen Techsource**, an industrial sourcing company. Built as a single-page React application with client-side routing, a scroll-driven animated hero, Firebase-backed form storage, and a small in-browser blog CMS.

> Looking for page copy, headlines, and content inventory instead of code? See [README.md](README.md) — that file is a full content reference for every page.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Live URLs & Repository](#2-live-urls--repository)
3. [Getting Started](#3-getting-started)
4. [Environment Variables](#4-environment-variables)
5. [Available Scripts](#5-available-scripts)
6. [Project Structure](#6-project-structure)
7. [Routing](#7-routing)
8. [Forms & Data Pipeline](#8-forms--data-pipeline)
9. [Blog / Media CMS](#9-blog--media-cms)
10. [Admin Areas](#10-admin-areas)
11. [Styling & Design System](#11-styling--design-system)
12. [Animation & Scroll System](#12-animation--scroll-system)
13. [Assets & Image Pipeline](#13-assets--image-pipeline)
14. [Firebase Security Rules](#14-firebase-security-rules)
15. [Build & Deployment](#15-build--deployment)
16. [Known Limitations / Notes for Future Work](#16-known-limitations--notes-for-future-work)

---

## 1. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI framework | [React](https://react.dev) | 19.2 |
| Language | [TypeScript](https://www.typescriptlang.org) | 5.8 (strict mode) |
| Build tool | [Vite](https://vite.dev) | 7.3 |
| Routing | [React Router](https://reactrouter.com) | 7.17 (`BrowserRouter`) |
| Styling | [Tailwind CSS](https://tailwindcss.com) | 4.2 (via `@tailwindcss/vite` plugin) |
| Animation | [Framer Motion](https://motion.dev) | 12.40 |
| Smooth scroll | [Lenis](https://github.com/darkroomengineering/lenis) | 1.3 |
| Backend (forms) | [Firebase](https://firebase.google.com) — Firestore + Cloud Storage | 12.16 |
| Form delivery | [Web3Forms](https://web3forms.com) (email notification on submit) | — |
| Image optimization | [sharp](https://sharp.pixelplumbing.com) (build-time scripts only) | 0.35 |
| Hosting target | [Vercel](https://vercel.com) (SPA rewrites configured) | — |

No test runner, linter config, or CI pipeline is currently set up in this repo.

---

## 2. Live URLs & Repository

| Resource | URL |
|---|---|
| GitHub repository | https://github.com/nivin77789/orbigreen |
| Production hosting | Vercel (see [`vercel.json`](vercel.json); connect the repo in the [Vercel dashboard](https://vercel.com/dashboard) to get the live domain) |
| Firebase project console | https://console.firebase.google.com/project/orbigreen-94ea5/overview |
| Firebase project ID | `orbigreen-94ea5` |
| Web3Forms dashboard | https://web3forms.com/ |

---

## 3. Getting Started

### Prerequisites

- Node.js 18+ (developed against Node 26; any current LTS works)
- npm (repo ships a `package-lock.json`)

### Install & run

```bash
git clone https://github.com/nivin77789/orbigreen.git
cd orbigreen
npm install
npm run dev
```

The dev server starts via Vite (default http://localhost:5173).

### Type-check + production build

```bash
npm run build      # runs `tsc --noEmit` then `vite build` → outputs to dist/
npm run preview    # serves the built dist/ folder locally
```

---

## 4. Environment Variables

Copy [`.env.example`](.env.example) to `.env` and fill in as needed — **both variables are optional**, since fallback values are hardcoded in [`src/lib/constants.ts`](src/lib/constants.ts) and [`src/context/BlogContext.tsx`](src/context/BlogContext.tsx).

| Variable | Purpose | Default if unset |
|---|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | Access key for the [Web3Forms](https://web3forms.com) API that emails contact/quotation submissions | Hardcoded key in `src/lib/constants.ts` |
| `VITE_ADMIN_PASSWORD` | Password gate for the `/admin/blog` blog editor | `"orbigreen2026"` in dev mode, empty (locked) in production builds |

Firebase config (`src/lib/firebase.ts`) is **not** environment-driven — the project's public web config (API key, project ID, etc.) is committed directly in source, which is standard for Firebase web apps since these values are not secrets (access is controlled by Firestore/Storage security rules, not by hiding the config).

The `/admin` (submissions dashboard) login is separately hardcoded in [`src/pages/AdminPage.tsx`](src/pages/AdminPage.tsx) and is **not** environment-configurable — see [§16](#16-known-limitations--notes-for-future-work).

---

## 5. Available Scripts

Defined in [`package.json`](package.json):

| Script | Command | Purpose |
|---|---|---|
| `npm run dev` | `vite` | Start local dev server with HMR |
| `npm run build` | `tsc --noEmit && vite build` | Type-check, then bundle for production into `dist/` |
| `npm run preview` | `vite preview` | Preview the production build locally |
| `npm run optimize-images` | `node scripts/optimize-images.mjs` | Re-compress/convert images in `src/assets`, `src/products image`, `src/services image`, logo, and favicon to WebP/PNG |
| `npm run optimize-hero-frames` | `node scripts/optimize-hero-frames.mjs` | Re-process the 240-frame hero background animation from `src/latestbg/*.png` into `public/hero-bg-frames/*.webp` |

---

## 6. Project Structure

```
orbigreen/
├── public/
│   ├── _redirects                # SPA fallback for non-Vercel hosts (Netlify-style)
│   ├── data/blogs.json           # Seed blog posts (loaded once into localStorage)
│   ├── hero-bg-frames/           # 240 optimized WebP frames for the scroll hero animation
│   └── blog-covers/, favicon.png
├── scripts/
│   ├── optimize-images.mjs       # sharp-based image compression (assets, product/service images)
│   └── optimize-hero-frames.mjs  # sharp-based hero frame sequence compression
├── src/
│   ├── App.tsx                   # Root component: providers, router, all routes, per-page <title>/meta
│   ├── main.tsx                  # React DOM entry point
│   ├── styles.css                # Tailwind entry + global styles
│   ├── components/                # 30+ shared UI components (Nav, Footer, ChatBot, forms, hero, etc.)
│   ├── pages/                     # One component per route (see §7)
│   ├── data/                      # Static content: services, products, industries, global hubs, FAQ
│   ├── context/BlogContext.tsx   # React context wrapping the blog store + admin auth gate
│   ├── lib/                       # firebase.ts, constants.ts, submitForm.ts, blogStore.ts, lenis.ts, etc.
│   ├── hooks/                     # useInView, useAutoplayVideo, useScrollSectionProgress, etc.
│   ├── types/blog.ts             # BlogPost / BlogPostInput types
│   ├── assets/                    # Images, gallery photos (by product category), banner video
│   ├── products image/, services image/  # Category thumbnails (spaces in folder names — kept as-is)
│   ├── latestbg/, newbgframe/     # Source PNG frame sequences (pre-optimization)
│   └── vite-env.d.ts             # `ImportMetaEnv` typings for VITE_* vars
├── firestore.rules               # Firestore security rules (see §14)
├── storage.rules                 # Cloud Storage security rules (see §14)
├── vercel.json                   # SPA rewrite rule for Vercel
├── vite.config.ts                # Vite + Tailwind + manual chunk-splitting config
├── tsconfig.json / tsconfig.app.json
└── README.md                     # Content/copy reference (not this file)
```

---

## 7. Routing

All routes are defined in [`src/App.tsx`](src/App.tsx) using React Router, with every page lazy-loaded via `React.lazy` + `Suspense` (fallback: [`PageLoader`](src/components/PageLoader.tsx)).

| Route | Page component | Notes |
|---|---|---|
| `/` | `HomePage` | Hero video, services marquee, workflow, metrics, FAQ |
| `/about` | `AboutPage` | |
| `/resources` | `ResourcesPage` | Not in main nav, but routed |
| `/products` | `ProductsPage` | Product category grid |
| `/products/:slug` | `ProductGalleryPage` | Per-category photo gallery (castings, forging, machining, fabrication, pressure-vessels, stamping-parts, proprietary-machines, fasteners, transmission-gears) |
| `/services` | `ServicesPage` | Services grid |
| `/services/:slug` | `ServiceDetailPage` | global-sourcing, engineering-services, quality-inspection, site-installation, transport-logistics, consultancy-advisory |
| `/contact` | `ContactPage` | Contact form → Firestore + Web3Forms |
| `/quotation` | `QuotationPage` | RFQ form with file attachments → Firestore + Storage + Web3Forms |
| `/global-presence` | `GlobalPresencePage` | Interactive global sourcing hub map |
| `/blog` | `BlogPage` | Published blog post listing |
| `/blog/:slug` | `BlogPostPage` | Single post |
| `/admin/blog` | `AdminBlogPage` | Blog CMS (password-gated, client-side only) |
| `/admin` | `AdminPage` | Contact/quotation submissions dashboard (password-gated, client-side only) |

`App.tsx` also maintains a `STATIC_PAGE_META` map that manually sets `document.title` and the meta-description tag per route on navigation (no `react-helmet` dependency — this is a hand-rolled SPA meta solution, so it won't produce per-page metadata for crawlers that don't execute JS/SSR).

---

## 8. Forms & Data Pipeline

Two public forms — **Contact** ([`ContactForm.tsx`](src/components/ContactForm.tsx)) and **Quotation/RFQ** ([`QuotationForm.tsx`](src/components/QuotationForm.tsx)) — both submit through [`src/lib/submitForm.ts`](src/lib/submitForm.ts):

1. **Primary delivery — [Web3Forms](https://web3forms.com):** the form is POSTed to `https://api.web3forms.com/submit` with the access key, so a notification email lands at the address configured in the Web3Forms dashboard (site constant: `FORM_RECIPIENT_EMAIL = "orbigreenrfq@gmail.com"` in `src/lib/constants.ts`).
2. **Secondary storage — Firebase:** in parallel (fire-and-forget, non-blocking), the same form data is written to Firestore (`contacts` or `quotations` collection) via `saveSubmissionToFirestore`. If the quotation form has file attachments, they're uploaded to Firebase Storage under `quotations/{docId}/{fileName}` and the resulting download URLs are stored on the Firestore doc.
3. Firestore writes are wrapped in a try/catch that **silently swallows failures** — Web3Forms email delivery is treated as the source of truth; Firestore is a convenience mirror for the admin dashboard.

---

## 9. Blog / Media CMS

There is no server-side CMS. Blog posts live in **`localStorage`**, seeded once from [`public/data/blogs.json`](public/data/blogs.json):

- [`src/lib/blogStore.ts`](src/lib/blogStore.ts) — pure functions: `loadBlogs`, `createPost`, `updatePost`, `deletePost`, `slugify`, `resetBlogsToSeed`. Storage key: `orbigreen_blogs_v1`.
- [`src/context/BlogContext.tsx`](src/context/BlogContext.tsx) — React context exposing the post list + CRUD methods + the admin-auth boolean to the rest of the app (wraps the whole router tree in `App.tsx`).
- [`src/types/blog.ts`](src/types/blog.ts) — `BlogPost` / `BlogPostInput` shapes.

**Implication:** blog edits made via `/admin/blog` persist only in the browser that made them — they are not synced to other visitors or devices. To ship new posts to production, edit `public/data/blogs.json` directly (or extend the store to a real backend).

---

## 10. Admin Areas

Two independent, **client-side-only** password gates exist (no server verification, no real auth):

| Route | Guards | Password source |
|---|---|---|
| `/admin` | Contact + quotation submissions viewer (reads Firestore `contacts`/`quotations` collections directly, matching the open `read: if true` rules in `firestore.rules`) | Hardcoded `admin` / `admin` in `src/pages/AdminPage.tsx` — **not env-configurable** |
| `/admin/blog` | Blog post CRUD editor | `VITE_ADMIN_PASSWORD` env var (dev fallback: `orbigreen2026`) in `src/context/BlogContext.tsx` |

Session state for both is kept in `localStorage`/component state — see [§16](#16-known-limitations--notes-for-future-work) for the security caveat.

---

## 11. Styling & Design System

- Tailwind CSS v4 via the `@tailwindcss/vite` plugin (no separate `tailwind.config.js` — v4 uses CSS-based config in [`src/styles.css`](src/styles.css)).
- Brand colors (from the content README, also usable as Tailwind tokens):
  - Primary (teal): `#0B5F7E`
  - Secondary (green): `#5CBF2A`
  - Accent (lime): `#8DD128`
  - Hero background: `#34A4BF`
- Font: Google Fonts **Inter** (400/600/700), preconnected and loaded non-blocking in `index.html`.
- Path alias `@/*` → `src/*` configured in both `vite.config.ts` and `tsconfig.json`.

---

## 12. Animation & Scroll System

- **Framer Motion** (`MotionConfig` in `App.tsx`) drives most transitions; `reducedMotion="user"` respects OS-level reduced-motion preferences.
- **Lenis** (`src/lib/lenis.ts`, `src/components/SmoothScroll.tsx`) provides inertia/smooth scrolling site-wide, plus programmatic `scrollToTarget`/`scrollToTop` used for hash-link navigation (`ScrollToHash` in `App.tsx`).
- **Scroll-driven hero background:** a 240-frame WebP sequence (`public/hero-bg-frames/`) is scrubbed based on scroll position via [`HeroFrameCanvas.tsx`](src/components/HeroFrameCanvas.tsx) + [`src/lib/scroll-frames.ts`](src/lib/scroll-frames.ts) + [`src/lib/frame-cache.ts`](src/lib/frame-cache.ts) (frame preloading/caching to avoid flicker).
- Custom hooks: `useInView` (IntersectionObserver-based reveal animations), `useScrollSectionProgress` (workflow step scroller on the homepage), `useAutoplayVideo`, `usePageVisible`.

---

## 13. Assets & Image Pipeline

- `src/latestbg/` and `src/newbgframe/` hold raw PNG frame sequences (source material, likely from an exported animation/video via `ezgif`).
- `npm run optimize-hero-frames` converts `src/latestbg/*.png` → `public/hero-bg-frames/*.webp` (resized to 896px wide, WebP quality 68, with a brightness/contrast/sharpen pass), targeting ≤5MB total for the full 240-frame sequence.
- `npm run optimize-images` batch-converts `src/assets/`, `src/products image/`, `src/services image/` to WebP (1280px/720px max width) and re-compresses `src/logo.png` and `public/favicon.png` as PNG.
- Product category photography lives under `src/assets/gallary/` (note: folder is spelled "gallary", not "gallery" — intentional/historical, referenced by [`productGalleryAssets.ts`](src/data/productGalleryAssets.ts)), organized by category: Casting and Forgings, Fabrication, Fasteners, Machining, Pressure Vessel, Structural, Transmission and gears, site installation and services.
- `src/banner.mp4` — homepage hero background video (autoplay, see `HeroVideoSection.tsx`).

---

## 14. Firebase Security Rules

**Firestore** ([`firestore.rules`](firestore.rules)):
- `contacts/{docId}` and `quotations/{docId}` — public `create` and `read`, no `update`/`delete`. This is intentional (per the in-file comment): the RFQ/contact forms have no login, and `/admin` reads these collections client-side with no server-verified auth, so read access has to stay open too.
- Everything else: fully locked (`allow read, write: if false`).

**Cloud Storage** ([`storage.rules`](storage.rules)):
- `quotations/{docId}/{fileName}` — public write capped at 20MB/file, public read.
- Everything else: fully locked.

⚠️ Because `read: true` is open on these collections/paths, **anyone with the Firebase config (which ships in the client bundle) can read all contact/quotation submissions and uploaded files directly via the Firebase SDK**, bypassing the `/admin` password screen entirely. This is a deliberate trade-off documented in the rules files, not an oversight — worth revisiting if submissions ever contain sensitive data.

---

## 15. Build & Deployment

- **Build:** `npm run build` → type-checks with `tsc --noEmit`, then runs `vite build` → static output in `dist/`.
- **Chunking:** `vite.config.ts` manually splits `react-vendor`, `lenis`, `framer-motion`, and `router` into separate chunks for better caching.
- **Hosting:** [`vercel.json`](vercel.json) rewrites all paths to `/index.html` (SPA fallback) — deploy by connecting the GitHub repo at https://vercel.com/new.
- **Alternative static hosts:** [`public/_redirects`](public/_redirects) provides the equivalent SPA fallback rule for Netlify-style hosts (`/* /index.html 200`).
- No CI/CD workflow files are present in this repo — deployment is presumably manual/Vercel-auto-deploy-on-push.

---

## 16. Known Limitations / Notes for Future Work

- **`/admin` login is hardcoded** (`admin`/`admin`, in source, not env-driven) — unlike `/admin/blog`, which at least reads from `VITE_ADMIN_PASSWORD`. Both are client-side-only gates with no server session verification, so they only deter casual visitors, not a determined one — consistent with the open Firestore/Storage read rules in §14.
- **Blog CMS is `localStorage`-only** — edits via `/admin/blog` don't propagate to other browsers/visitors (see §9). Treat `public/data/blogs.json` as the real source of truth for production content.
- **No automated tests, linting, or CI** configured.
- **Firebase config and the Web3Forms access key are committed in source** (`src/lib/firebase.ts`, `src/lib/constants.ts`). This is normal for Firebase's public web config, but double-check the Web3Forms key's exposure is acceptable for your usage tier/rate limits.
- Two asset directories (`src/latestbg/`, `src/newbgframe/`) appear to hold overlapping/legacy raw frame exports — worth confirming which one is still the active source for `optimize-hero-frames.mjs` (currently `src/latestbg/`) before deleting either.
