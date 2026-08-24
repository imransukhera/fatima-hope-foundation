import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SEED_TEMPLATES, SEED_TEMPLATE_CATEGORIES } from '../data/seed-data';
import { TemplateCategory, TemplateItem } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class TemplatesService {
  private readonly firestore = inject(Firestore, { optional: true });
  private readonly platformId = inject(PLATFORM_ID);

  readonly categories = signal<TemplateCategory[]>(SEED_TEMPLATE_CATEGORIES);
  readonly templates = signal<TemplateItem[]>(SEED_TEMPLATES);

  constructor() {
    if (isPlatformBrowser(this.platformId) && this.firestore) {
      this.syncFromFirestore();
    }
  }

  categoryBySlug(categorySlug: string) {
    return computed(() => this.categories().find((c) => c.slug === categorySlug));
  }

  byCategory(categorySlug: string) {
    return computed(() => this.templates().filter((t) => t.categorySlug === categorySlug));
  }

  bySlug(slug: string) {
    return computed(() => this.templates().find((t) => t.slug === slug));
  }

  private async syncFromFirestore(): Promise<void> {
    try {
      const snap = await getDocs(collection(this.firestore!, 'templates'));
      if (!snap.empty) {
        this.templates.set(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as TemplateItem));
      }
    } catch {
      // Firestore not configured yet — keep static seed data so the page still renders.
    }
  }
}
