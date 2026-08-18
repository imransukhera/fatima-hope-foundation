import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SEED_GALLERY } from '../data/seed-data';
import { GalleryItem } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private readonly firestore = inject(Firestore, { optional: true });
  private readonly platformId = inject(PLATFORM_ID);

  readonly items = signal<GalleryItem[]>(SEED_GALLERY);

  constructor() {
    if (isPlatformBrowser(this.platformId) && this.firestore) {
      this.syncFromFirestore();
    }
  }

  private async syncFromFirestore(): Promise<void> {
    try {
      const snap = await getDocs(collection(this.firestore!, 'gallery'));
      if (!snap.empty) {
        this.items.set(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as GalleryItem));
      }
    } catch {
      // Keep seed data.
    }
  }
}
