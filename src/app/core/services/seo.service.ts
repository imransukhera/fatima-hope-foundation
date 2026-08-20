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
  /** Set true for thank-you/error/admin pages that shouldn't appear in search results. */
  noindex?: boolean;
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
    this.setTag('robots', data.noindex ? 'noindex, nofollow' : 'index, follow');
    this.setTag('og:site_name', 'Fatima Hope Foundation');
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

  /** Injects (or replaces) the page's JSON-LD structured data block (e.g. Article, Product). */
  setJsonLd(data: object | object[]): void {
    this.setJsonLdScript('data-seo-jsonld', data);
  }

  /** Injects (or replaces) a BreadcrumbList JSON-LD block from a Home → ... path. */
  setBreadcrumbs(items: { name: string; path: string }[]): void {
    this.setJsonLdScript('data-seo-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${environment.appUrl}${item.path}`,
      })),
    });
  }

  private setJsonLdScript(attr: string, data: object | object[]): void {
    const head = this.document.querySelector('head');
    if (!head) return;

    let script = this.document.querySelector<HTMLScriptElement>(`script[${attr}]`);
    if (!script) {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute(attr, '');
      head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
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
