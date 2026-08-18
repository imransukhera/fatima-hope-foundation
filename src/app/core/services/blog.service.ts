import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SEED_BLOG } from '../data/seed-data';
import { BlogPost } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly firestore = inject(Firestore, { optional: true });
  private readonly platformId = inject(PLATFORM_ID);

  readonly posts = signal<BlogPost[]>(SEED_BLOG);

  constructor() {
    if (isPlatformBrowser(this.platformId) && this.firestore) {
      this.syncFromFirestore();
    }
  }

  bySlug(slug: string) {
    return computed(() => this.posts().find((p) => p.slug === slug));
  }

  private async syncFromFirestore(): Promise<void> {
    try {
      const snap = await getDocs(collection(this.firestore!, 'blogs'));
      if (!snap.empty) {
        this.posts.set(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as BlogPost));
      }
    } catch {
      // Keep seed data.
    }
  }
}
