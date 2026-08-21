# Fatima Hope Foundation

**Giving Hope, Changing Lives.**

A premium, production-ready website for Fatima Hope Foundation — an NGO providing food &
ration support, medical assistance, education support, orphan care, emergency relief and
community welfare to underprivileged families in Pakistan.

Built with **Angular 20** (standalone components, signals, SSR), **Tailwind CSS v4**,
**Angular Material**, **PrimeNG**, **Firebase** (Auth, Firestore, Storage), and **Stripe**.

---

## What's included in this build

This repository ships the **public-facing site and the full donation flow**, fully working
end to end (see "Roadmap" below for what's intentionally deferred to a phase 2).

- ✅ Home, About, Programs (+ detail), Impact, Gallery (with lightbox), Events (with
  countdown), Blog (+ detail), Volunteer registration, Contact — all real pages backed by
  Firestore-ready services with static content fallback (the site looks and works correctly
  even before you've configured Firebase).
- ✅ Donate page — quick/custom amount, one-time/monthly, Stripe Checkout (card, Apple Pay,
  Google Pay all supported automatically by Stripe's hosted Checkout page) **or** bank
  transfer, with success/cancel pages.
- ✅ Cloud Functions (`/functions`) for `createCheckoutSession`, `stripeWebhook`, an SSR
  request handler, and admin-role management — the secret Stripe key never touches the browser.
- ✅ Firestore + Storage security rules (`firestore.rules`, `storage.rules`).
- ✅ Dark mode, glassmorphism, scroll-reveal animations, SEO meta/OG/Twitter tags per page,
  PWA manifest + service worker, Angular SSR with per-route render strategy.
- 🚧 Admin dashboard (auth-gated CRUD for donations/volunteers/events/blog/gallery, exports,
  charts) is scaffolded as a "coming soon" route (`/admin`) — see **Roadmap**.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Angular 20 (standalone components, signals, SSR via `@angular/ssr`) |
| Styling | Tailwind CSS v4, custom SCSS design tokens, Angular Material (M3), PrimeNG (Aura theme) |
| Fonts | Poppins (headings), Inter (body), Playfair Display (editorial accents) |
| Backend | Firebase — Authentication, Firestore, Storage |
| Payments | Stripe Checkout (Cloud Functions create the session; webhook confirms it) |
| PWA | `@angular/service-worker` + Web App Manifest |

---

## Project structure

```
src/app/
├── core/                 # Singletons: services, models, seed data, config
│   ├── services/         # Firestore-backed content services, Stripe, SEO, Theme, Donations…
│   ├── models/            # TypeScript interfaces for every Firestore collection
│   └── data/               # Static seed content (renders instantly, before Firestore is wired up)
├── shared/
│   └── ui/                 # Reusable UI: Header, Footer, Button, SectionHeading, StatCounter…
└── features/               # One folder per route: home, about, programs, donate, volunteer…

functions/                # Cloud Functions: Stripe checkout + webhook, SSR handler, admin roles
firestore.rules           # Firestore security rules
storage.rules              # Storage security rules
firestore.indexes.json     # Composite indexes
firebase.json               # Hosting + Functions + Firestore + Storage + emulator config
```

Each content type (`programs`, `testimonials`, `gallery`, `events`, `blogs`, `statistics`)
has a small service in `core/services` that seeds itself with static data from
`core/data/seed-data.ts` and then — **only in the browser, never during SSR** — tries to
sync from the matching Firestore collection. If Firestore isn't configured yet, or a read
fails, the page silently keeps showing the seed data instead of breaking.

---

## Environment setup

### 1. Firebase

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Authentication** (Email/Password, or your preferred providers), **Firestore
   Database**, and **Storage**.
3. Register a Web App and copy its config object.
4. Paste those values into `src/environments/environment.ts` and
   `src/environments/environment.prod.ts`, replacing every `REPLACE_ME_*` placeholder.
5. Deploy the security rules and indexes:
   ```bash
   firebase deploy --only firestore:rules,firestore:indexes,storage
   ```

### 2. Stripe

1. Create a [Stripe](https://dashboard.stripe.com) account (test mode is fine to start).
2. Copy your **publishable key** into `environment.stripe.publishableKey`.
3. Set the **secret key** and **webhook signing secret** as Firebase secrets (never in source
   control — see `functions/README.md`):
   ```bash
   firebase functions:secrets:set STRIPE_SECRET_KEY
   firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
   ```
4. After deploying functions, register the webhook endpoint
   (`https://<region>-<project>.cloudfunctions.net/stripeWebhook`) in the Stripe Dashboard →
   Developers → Webhooks, listening for `checkout.session.completed` and
   `checkout.session.expired`.
5. Set `environment.stripe.createCheckoutSessionUrl` to your deployed
   `createCheckoutSession` function URL.

### 3. Bank transfer details

Already filled in under `environment.bankTransfer` (Allied Bank / Muhammad Imran /
09580010131306030025) — update there if the account ever changes.

---

## Firestore collections

| Collection | Written by | Read by |
|---|---|---|
| `programs`, `gallery`, `events`, `testimonials`, `blogs`, `statistics`, `settings` | Admin only | Public |
| `donations` | Public **create** (pending), Admin read/update | Admin only |
| `volunteers` | Public **create** (new), Admin read/update | Admin only |
| `contactMessages` | Public **create** (new), Admin read/update | Admin only |
| `users` | User (own doc), Admin (all) | User (own doc), Admin (all) |

See `firestore.rules` for the exact rule per collection — public submissions can only
`create`, never read each other's data, matching the principle of least privilege.

---

## Local development

```bash
npm install
npm start          # ng serve — http://localhost:4200
```

```bash
npm run build       # production build with SSR, prerendering static routes
npm test            # Karma/Jasmine unit tests
```

To also run the Cloud Functions locally against the Firebase emulator suite:

```bash
cd functions && npm install && cd ..
firebase emulators:start
```

---

## Deployment guide

All pages (including `blog/:slug`, `programs/:slug`, `courses/:slug`, and the donate
flow) are prerendered to static HTML at build time — see `src/app/app.routes.server.ts`.
Hosting serves that output directly; no SSR Cloud Function is involved in page rendering,
so a hosting-only deploy works even on the free Spark plan. A post/program/course added
only through Firestore (not `seed-data.ts`) needs a rebuild + redeploy before its detail
page exists.

1. **Build the Angular app** (from repo root):
   ```bash
   npm run build
   ```
2. **Deploy Hosting** (static files only — no billing plan required):
   ```bash
   firebase deploy --only hosting
   ```
3. Point your domain (`fatimahopefoundation.com`) at the Firebase Hosting site in Firebase
   Console → Hosting → Add custom domain.

### Deploying the backend functions (requires the Blaze plan)

The `createCheckoutSession`, `stripeWebhook`, and `setAdminRole` functions handle live
Stripe checkout, payment webhooks, and admin role assignment — these need a real backend
and can't be made static. Cloud Functions (2nd gen) requires the Blaze (pay-as-you-go)
plan to deploy, even though it has a free usage tier.

```bash
cd functions && npm install && npm run build && cd ..
firebase deploy --only functions,firestore:rules,firestore:indexes
```

Deploying is a real, external, billable action — review the Firebase project and Stripe
mode (test vs. live) before running `firebase deploy` against production.

---

## PWA

Icons in `public/icons/` are placeholders generated by the `@angular/pwa` schematic —
replace them with real Fatima Hope Foundation branding (logo mark on the brand green
`#0F6A44`, at each listed size) before launch. `public/manifest.webmanifest` and
`ngsw-config.json` are already wired up; the service worker only activates in production
builds (`ng build`), not in `ng serve`.

---

## Known build warnings (harmless)

- `Deprecation [plugin angular-sass]` on `@import 'tailwindcss'` — this is Tailwind v4's
  documented setup syntax; Dart Sass warns because `@import` itself is being phased out
  sass-wide, but the import resolves and compiles correctly.
- `Module '@grpc/grpc-js' ... is not ESM` — from Firestore's Node SDK, used during SSR;
  doesn't affect the browser bundle or functionality.

---

## Roadmap (phase 2)

Deliberately not included in this build, to avoid shipping shallow/broken scaffolding for
systems that need real design and testing time:

- **Admin dashboard** — Firebase Auth–gated, role-based access, CRUD for donations,
  volunteers, events, gallery, blog, testimonials; Excel/PDF export; charts and
  notifications.
- **JazzCash integration** (mentioned in the brief as "future").
- **Urdu language switcher** (Angular i18n or ngx-translate).
- **AI chat assistant** / live chat.
- **Live donation feed** and **volunteer certificate generation**.
- **Annual report PDF downloads**.

---

## Design system

| Token | Value |
|---|---|
| Primary | `#0F6A44` |
| Secondary (gold) | `#D4AF37` |
| Accent | `#10B981` |
| Background | `#F8FAFC` |
| Text | `#1F2937` |
| Headings | Poppins |
| Body | Inter |
| Editorial accents | Playfair Display |

Dark mode is a signal-driven `ThemeService` that toggles `data-theme` on `<html>` and
persists the choice in `localStorage`, falling back to `prefers-color-scheme`.
