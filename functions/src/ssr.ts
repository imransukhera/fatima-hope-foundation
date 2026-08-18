import { onRequest } from 'firebase-functions/v2/https';

/**
 * Serves the Angular SSR app. Requires the Angular app to be built first
 * (`npm run build` at the repo root) — this simply re-exports the request
 * handler that `src/server.ts` already produces for exactly this purpose.
 *
 * Path is relative to functions/lib/ssr.js after compilation, pointing at
 * the sibling Angular build output two levels up in the repo.
 */
// Built via a variable (not a string literal) so TypeScript doesn't try to
// resolve this module at compile time — the file only exists after the
// Angular app has been built, which happens in a separate build step.
const ssrServerPath = '../../dist/fatima-hope-foundation/server/server.mjs';

export const ssr = onRequest({ memory: '512MiB' }, async (req, res) => {
  const { reqHandler } = await import(ssrServerPath);
  return reqHandler(req, res);
});
