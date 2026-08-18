# Cloud Functions — Fatima Hope Foundation

This package holds the server-side pieces that must never run in the
browser: Stripe secret-key operations, the Stripe webhook, the Angular SSR
request handler, and admin role management.

## Functions

| Function | Trigger | Purpose |
|---|---|---|
| `createCheckoutSession` | HTTPS | Creates a Stripe Checkout Session and a matching `pending` Firestore donation doc. |
| `stripeWebhook` | HTTPS | Verifies Stripe webhook signatures and updates donation status on `checkout.session.completed` / `checkout.session.expired`. |
| `ssr` | HTTPS | Serves the built Angular app (server-side rendering) — used by the Hosting rewrite in `firebase.json`. |
| `setAdminRole` | Callable | Lets an existing admin grant/revoke the `admin` custom claim on another user. |

## Setup

```bash
cd functions
npm install
```

## Secrets

Stripe credentials are stored as Firebase secrets, never in source control:

```bash
firebase functions:secrets:set STRIPE_SECRET_KEY
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
```

`STRIPE_WEBHOOK_SECRET` comes from the Stripe Dashboard → Developers →
Webhooks → your endpoint → "Signing secret" (or from `stripe listen` output
when testing locally).

## Bootstrapping the first admin

`setAdminRole` deliberately refuses to run unless the caller is already an
admin, so it cannot be used to self-promote. To create the very first admin,
run a one-off trusted script locally with the Firebase Admin SDK:

```js
// scripts/bootstrap-admin.js — run with `node`, using a service account key
// downloaded from Firebase Console → Project Settings → Service Accounts.
const admin = require('firebase-admin');
admin.initializeApp({ credential: admin.credential.cert(require('./serviceAccountKey.json')) });

admin.auth().setCustomUserClaims('<the user's Firebase Auth UID>', { admin: true })
  .then(() => console.log('Admin claim granted.'));
```

Delete the service account key file afterward and never commit it.

## Local emulation

```bash
firebase emulators:start
```

## Deploy

```bash
npm run build          # from repo root — builds the Angular SSR app
cd functions && npm run build && cd ..
firebase deploy
```
