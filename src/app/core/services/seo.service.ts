import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

export interface SeoData {
  title: string;
  description: string;
  image?: string;
  path?: string;
  type?: 'website' | 'article';
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(data: SeoData): void {
    const fullTitle = `${data.title} | Fatima Hope Foundation`;
    const url = `${environment.appUrl}${data.path ?? ''}`;
    const image = data.image ?? `${environment.appUrl}/og-image.jpg`;

    this.title.setTitle(fullTitle);

    this.setTag('description', data.description);
    this.setTag('og:type', data.type ?? 'website');
    this.setTag('og:title', fullTitle);
    this.setTag('og:description', data.description);
    this.setTag('og:url', url);
    this.setTag('og:image', image);
    this.setTag('twitter:card', 'summary_large_image');
    this.setTag('twitter:title', fullTitle);
    this.setTag('twitter:description', data.description);
    this.setTag('twitter:image', image);
    this.setCanonical(url);
  }

  private setTag(name: string, content: string): void {
    const isOg = name.startsWith('og:') || name.startsWith('twitter:');
    const selector = isOg ? `property="${name}"` : `name="${name}"`;
    if (this.meta.getTag(selector)) {
      this.meta.updateTag({ [isOg ? 'property' : 'name']: name, content });
    } else {
      this.meta.addTag({ [isOg ? 'property' : 'name']: name, content });
    }
  }

  private setCanonical(url: string): void {
    const head = this.document.querySelector('head');
    if (!head) return;
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
