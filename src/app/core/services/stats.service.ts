import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SEED_STATS } from '../data/seed-data';
import { StatItem } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class StatsService {
  private readonly firestore = inject(Firestore, { optional: true });
  private readonly platformId = inject(PLATFORM_ID);

  readonly stats = signal<StatItem[]>(SEED_STATS);

  constructor() {
    if (isPlatformBrowser(this.platformId) && this.firestore) {
      this.syncFromFirestore();
    }
  }

  private async syncFromFirestore(): Promise<void> {
    try {
      const snap = await getDocs(collection(this.firestore!, 'statistics'));
      if (!snap.empty) {
        this.stats.set(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as StatItem));
      }
    } catch {
      // Keep seed data.
    }
  }
}
