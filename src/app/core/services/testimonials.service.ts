import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SEED_TESTIMONIALS } from '../data/seed-data';
import { TestimonialItem } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class TestimonialsService {
  private readonly firestore = inject(Firestore, { optional: true });
  private readonly platformId = inject(PLATFORM_ID);

  readonly testimonials = signal<TestimonialItem[]>(SEED_TESTIMONIALS);

  constructor() {
    if (isPlatformBrowser(this.platformId) && this.firestore) {
      this.syncFromFirestore();
    }
  }

  private async syncFromFirestore(): Promise<void> {
    try {
      const snap = await getDocs(collection(this.firestore!, 'testimonials'));
      if (!snap.empty) {
        this.testimonials.set(
          snap.docs.map((d) => ({ id: d.id, ...d.data() }) as TestimonialItem),
        );
      }
    } catch {
      // Keep seed data.
    }
  }
}
