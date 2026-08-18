import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import Stripe from 'stripe';
import { db } from './admin';

const stripeSecretKey = defineSecret('STRIPE_SECRET_KEY');
const stripeWebhookSecret = defineSecret('STRIPE_WEBHOOK_SECRET');

/**
 * Handles Stripe webhook events. Must be registered in the Stripe Dashboard
 * (or `stripe listen` for local testing) pointing at this function's URL,
 * listening for at least `checkout.session.completed`.
 *
 * IMPORTANT: this function must receive the raw request body to verify the
 * signature — do not add any body-parsing middleware in front of it.
 */
export const stripeWebhook = onRequest(
  { secrets: [stripeSecretKey, stripeWebhookSecret] },
  async (req, res) => {
    const stripe = new Stripe(stripeSecretKey.value());
    const signature = req.headers['stripe-signature'];

    if (!signature || typeof signature !== 'string') {
      res.status(400).send('Missing Stripe signature header');
      return;
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req.rawBody, signature, stripeWebhookSecret.value());
    } catch (err) {
      console.error('Webhook signature verification failed', err);
      res.status(400).send(`Webhook Error: ${(err as Error).message}`);
      return;
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          const donationId = session.metadata?.['donationId'];

          if (donationId) {
            await db.collection('donations').doc(donationId).update({
              status: 'succeeded',
              stripeSessionId: session.id,
              completedAt: new Date(),
            });
          }
          // TODO: trigger a receipt email here (e.g. via a transactional email
          // provider like SendGrid/Postmark) once one is configured.
          break;
        }

        case 'checkout.session.expired': {
          const session = event.data.object as Stripe.Checkout.Session;
          const donationId = session.metadata?.['donationId'];
          if (donationId) {
            await db.collection('donations').doc(donationId).update({ status: 'failed' });
          }
          break;
        }

        default:
          // Unhandled event type — safe to ignore.
          break;
      }

      res.status(200).json({ received: true });
    } catch (err) {
      console.error('Error handling webhook event', err);
      res.status(500).send('Webhook handler failed');
    }
  },
);
