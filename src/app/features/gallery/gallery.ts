import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { GalleryService } from '../../core/services/gallery.service';
import { ScrollRevealDirective } from '../../shared/ui/scroll-reveal/scroll-reveal.directive';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit {
  protected readonly galleryService = inject(GalleryService);
  private readonly seo = inject(SeoService);
  private readonly appUrl = environment.appUrl;

  protected readonly activeCategory = signal('All');

  protected readonly categories = computed(() => [
    'All',
    ...new Set(this.galleryService.items().map((i) => i.category)),
  ]);

  protected readonly filteredItems = computed(() => {
    const cat = this.activeCategory();
    const items = this.galleryService.items();
    return cat === 'All' ? items : items.filter((i) => i.category === cat);
  });

  protected readonly lightboxIndex = signal<number | null>(null);

  ngOnInit(): void {
    this.seo.update({
      title: 'Photo & Video Gallery — Humanitarian Impact',
      description:
        'Browse photos and videos of Fatima Hope Foundation food ration drives, medical camps, child education programs and volunteer work across Marot, Fort Abbas, Bahawalnagar and Southern Punjab.',
      path: '/gallery',
    });

    this.seo.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Gallery', path: '/gallery' },
    ]);

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: 'Fatima Hope Foundation Humanitarian Impact Gallery',
      description:
        'Photos and video highlights from food ration drives, medical camps, child education programs and volunteer work across Southern Punjab.',
      url: `${this.appUrl}/gallery`,
      associatedMedia: this.galleryService.items().map((item) => ({
        '@type': item.type === 'video' ? 'VideoObject' : 'ImageObject',
        contentUrl: item.src,
        thumbnailUrl: item.thumb,
        name: item.title,
      })),
    });
  }

  setCategory(cat: string): void {
    this.activeCategory.set(cat);
  }

  open(index: number): void {
    this.lightboxIndex.set(index);
  }

  close(): void {
    this.lightboxIndex.set(null);
  }

  next(event: Event): void {
    event.stopPropagation();
    const items = this.filteredItems();
    const i = this.lightboxIndex();
    if (i === null) return;
    this.lightboxIndex.set((i + 1) % items.length);
  }

  prev(event: Event): void {
    event.stopPropagation();
    const items = this.filteredItems();
    const i = this.lightboxIndex();
    if (i === null) return;
    this.lightboxIndex.set((i - 1 + items.length) % items.length);
  }
}
