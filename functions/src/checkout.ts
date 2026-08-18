import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import Stripe from 'stripe';
import { db } from './admin';

const stripeSecretKey = defineSecret('STRIPE_SECRET_KEY');

interface CheckoutRequestBody {
  amount: number;
  currency: string;
  frequency: 'one-time' | 'monthly';
  donorName: string;
  donorEmail: string;
  program?: string;
  message?: string;
  anonymous?: boolean;
  successUrl: string;
  cancelUrl: string;
}

function isValidBody(body: Partial<CheckoutRequestBody>): body is CheckoutRequestBody {
  return (
    typeof body.amount === 'number' &&
    body.amount > 0 &&
    typeof body.currency === 'string' &&
    (body.frequency === 'one-time' || body.frequency === 'monthly') &&
    typeof body.donorName === 'string' &&
    typeof body.donorEmail === 'string' &&
    typeof body.successUrl === 'string' &&
    typeof body.cancelUrl === 'string'
  );
}

/**
 * Creates a Stripe Checkout Session for a one-time or monthly donation.
 * The secret key never reaches the browser — only this function holds it.
 *
 * A matching Firestore `donations` doc (status: "pending") is created here
 * and its id is attached to the Checkout Session metadata, so the
 * `stripeWebhook` function can find and update the correct record once
 * payment completes.
 */
export const createCheckoutSession = onRequest(
  { secrets: [stripeSecretKey], cors: true },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const body = req.body as Partial<CheckoutRequestBody>;
    if (!isValidBody(body)) {
      res.status(400).json({ error: 'Invalid request body' });
      return;
    }

    const stripe = new Stripe(stripeSecretKey.value());
    const amountInSmallestUnit = Math.round(body.amount * 100);

    try {
      const donationRef = await db.collection('donations').add({
        donorName: body.donorName,
        donorEmail: body.donorEmail,
        amount: body.amount,
        currency: body.currency,
        frequency: body.frequency,
        program: body.program ?? null,
        message: body.message ?? null,
        anonymous: body.anonymous ?? false,
        method: 'stripe',
        status: 'pending',
        createdAt: new Date(),
      });

      const productName = body.program
        ? `Donation — ${body.program}`
        : 'Donation to Fatima Hope Foundation';

      const session = await stripe.checkout.sessions.create({
        mode: body.frequency === 'monthly' ? 'subscription' : 'payment',
        payment_method_types: ['card'],
        customer_email: body.donorEmail,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: body.currency,
              unit_amount: amountInSmallestUnit,
              product_data: { name: productName },
              ...(body.frequency === 'monthly' ? { recurring: { interval: 'month' } } : {}),
            },
          },
        ],
        metadata: {
          donationId: donationRef.id,
          donorName: body.donorName,
          program: body.program ?? '',
        },
        success_url: `${body.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: body.cancelUrl,
      });

      await donationRef.update({ stripeSessionId: session.id });

      res.status(200).json({ url: session.url, sessionId: session.id });
    } catch (err) {
      console.error('createCheckoutSession failed', err);
      res.status(500).json({ error: 'Unable to create checkout session' });
    }
  },
);
