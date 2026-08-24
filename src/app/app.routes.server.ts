import { RenderMode, ServerRoute } from '@angular/ssr';
import {
  SEED_BLOG,
  SEED_COURSES,
  SEED_PROGRAMS,
  SEED_TEMPLATE_CATEGORIES,
  SEED_TEMPLATES,
} from './core/data/seed-data';

export const serverRoutes: ServerRoute[] = [
  // Prerendered from seed data at build time so these pages are served as plain static
  // files by Hosting — no live Cloud Function needed on request. A post/program/course
  // added only through Firestore (not seed-data.ts) needs a rebuild + hosting redeploy
  // before its detail page exists; that's a deliberate trade-off to avoid depending on
  // the Blaze-only `ssr` function for content that rarely changes.
  {
    path: 'programs/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SEED_PROGRAMS.map((program) => ({ slug: program.slug }));
    },
  },
  {
    path: 'courses/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SEED_COURSES.map((course) => ({ slug: course.slug }));
    },
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SEED_BLOG.map((post) => ({ slug: post.slug }));
    },
  },
  {
    path: 'templates/:category',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SEED_TEMPLATE_CATEGORIES.map((category) => ({ category: category.slug }));
    },
  },
  {
    path: 'templates/:category/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SEED_TEMPLATES.map((template) => ({
        category: template.categorySlug,
        slug: template.slug,
      }));
    },
  },
  // The Stripe session id / donation outcome is read from the URL client-side after
  // hydration, same as any prerendered page — no server-side rendering is needed here.
  // The actual checkout/webhook logic lives in Cloud Functions called directly by URL,
  // not through page rendering.
  { path: 'donate', renderMode: RenderMode.Prerender },
  { path: 'donate/success', renderMode: RenderMode.Prerender },
  { path: 'donate/cancel', renderMode: RenderMode.Prerender },
  // Everything else (Home, About, Programs, Impact, Gallery, Events, Blog, Volunteer,
  // Contact, Admin, 404) is static enough to prerender at build time.
  { path: '**', renderMode: RenderMode.Prerender },
];
