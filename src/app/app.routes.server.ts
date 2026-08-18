import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Dynamic routes are rendered per-request — their params aren't known at build time.
  { path: 'programs/:slug', renderMode: RenderMode.Server },
  { path: 'courses/:slug', renderMode: RenderMode.Server },
  { path: 'blog/:slug', renderMode: RenderMode.Server },
  // Donation flow reads live query params (Stripe session) and writes to Firestore —
  // always render on the server rather than serving a stale prerendered snapshot.
  { path: 'donate', renderMode: RenderMode.Server },
  { path: 'donate/success', renderMode: RenderMode.Server },
  { path: 'donate/cancel', renderMode: RenderMode.Server },
  // Everything else (Home, About, Programs, Impact, Gallery, Events, Blog, Volunteer,
  // Contact, Admin, 404) is static enough to prerender at build time.
  { path: '**', renderMode: RenderMode.Prerender },
];
