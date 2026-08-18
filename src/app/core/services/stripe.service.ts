import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface CreateCheckoutSessionPayload {
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

/**
 * Thin client for Stripe Checkout. The Checkout Session itself is created
 * server-side (Cloud Function `createCheckoutSession`) because the secret
 * key must never be exposed to the browser — see /functions. The function
 * returns a hosted Checkout URL (which already supports card, Apple Pay and
 * Google Pay), and we simply redirect the browser to it.
 */
@Injectable({ providedIn: 'root' })
export class StripeService {
  async startCheckout(payload: CreateCheckoutSessionPayload): Promise<void> {
    const response = await fetch(environment.stripe.createCheckoutSessionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Unable to start checkout. Please try again shortly.');
    }

    const { url } = (await response.json()) as { url?: string };

    if (!url) {
      throw new Error('Checkout session response was invalid.');
    }

    window.location.href = url;
  }
}
