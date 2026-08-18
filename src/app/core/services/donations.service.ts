import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, serverTimestamp } from '@angular/fire/firestore';
import { Donation } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class DonationsService {
  private readonly firestore = inject(Firestore, { optional: true });

  /**
   * Records a donation intent/result in Firestore. Returns the new document id,
   * or null if Firestore isn't configured yet (placeholder credentials) — the
   * donation flow still completes via Stripe/bank transfer either way.
   */
  async recordDonation(donation: Donation): Promise<string | null> {
    if (!this.firestore) return null;
    try {
      const ref = await addDoc(collection(this.firestore, 'donations'), {
        ...donation,
        createdAt: serverTimestamp(),
      });
      return ref.id;
    } catch {
      return null;
    }
  }
}
