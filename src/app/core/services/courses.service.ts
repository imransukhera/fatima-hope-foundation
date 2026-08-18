import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SEED_COURSES } from '../data/seed-data';
import { CourseItem } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private readonly firestore = inject(Firestore, { optional: true });
  private readonly platformId = inject(PLATFORM_ID);

  readonly courses = signal<CourseItem[]>(SEED_COURSES);

  constructor() {
    if (isPlatformBrowser(this.platformId) && this.firestore) {
      this.syncFromFirestore();
    }
  }

  bySlug(slug: string) {
    return computed(() => this.courses().find((c) => c.slug === slug));
  }

  private async syncFromFirestore(): Promise<void> {
    try {
      const snap = await getDocs(collection(this.firestore!, 'courses'));
      if (!snap.empty) {
        this.courses.set(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as CourseItem));
      }
    } catch {
      // Firestore not configured yet — keep static seed data so the page still renders.
    }
  }
}
