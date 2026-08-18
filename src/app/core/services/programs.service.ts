import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SEED_PROGRAMS } from '../data/seed-data';
import { ProgramItem } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class ProgramsService {
  private readonly firestore = inject(Firestore, { optional: true });
  private readonly platformId = inject(PLATFORM_ID);

  readonly programs = signal<ProgramItem[]>(SEED_PROGRAMS);

  constructor() {
    if (isPlatformBrowser(this.platformId) && this.firestore) {
      this.syncFromFirestore();
    }
  }

  bySlug(slug: string) {
    return computed(() => this.programs().find((p) => p.slug === slug));
  }

  private async syncFromFirestore(): Promise<void> {
    try {
      const snap = await getDocs(collection(this.firestore!, 'programs'));
      if (!snap.empty) {
        this.programs.set(
          snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ProgramItem),
        );
      }
    } catch {
      // Firestore not configured yet — keep static seed data so the page still renders.
    }
  }
}
