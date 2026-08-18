import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SEED_EVENTS } from '../data/seed-data';
import { EventItem } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly firestore = inject(Firestore, { optional: true });
  private readonly platformId = inject(PLATFORM_ID);

  readonly events = signal<EventItem[]>(SEED_EVENTS);
  readonly upcoming = computed(() => this.events().filter((e) => e.status === 'upcoming'));
  readonly past = computed(() => this.events().filter((e) => e.status === 'past'));

  constructor() {
    if (isPlatformBrowser(this.platformId) && this.firestore) {
      this.syncFromFirestore();
    }
  }

  private async syncFromFirestore(): Promise<void> {
    try {
      const snap = await getDocs(collection(this.firestore!, 'events'));
      if (!snap.empty) {
        this.events.set(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as EventItem));
      }
    } catch {
      // Keep seed data.
    }
  }
}
