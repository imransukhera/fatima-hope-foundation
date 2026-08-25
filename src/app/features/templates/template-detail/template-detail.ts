import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { SeoService } from '../../../core/services/seo.service';
import { TemplatesService } from '../../../core/services/templates.service';
import { ScrollRevealDirective } from '../../../shared/ui/scroll-reveal/scroll-reveal.directive';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-template-detail',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './template-detail.html',
  styleUrl: './template-detail.scss',
})
export class TemplateDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly templatesService = inject(TemplatesService);
  private readonly seo = inject(SeoService);
  private readonly sanitizer = inject(DomSanitizer);

  private readonly categorySlug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('category') ?? '')),
    { initialValue: '' },
  );

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: '',
  });

  protected readonly template = computed(() =>
    this.templatesService.templates().find((t) => t.slug === this.slug() && t.categorySlug === this.categorySlug()),
  );

  protected readonly previewSrc = computed(() => {
    const url = this.template()?.previewUrl ?? '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  protected readonly copiedLabel = signal<'html' | 'css' | null>(null);

  protected copyCode(code: string, label: 'html' | 'css'): void {
    navigator.clipboard.writeText(code).then(() => {
      this.copiedLabel.set(label);
      setTimeout(() => this.copiedLabel.set(null), 2000);
    });
  }

  protected readonly otherTemplates = computed(() =>
    this.templatesService
      .byCategory(this.categorySlug())()
      .filter((t) => t.slug !== this.slug())
      .slice(0, 3),
  );

  ngOnInit(): void {
    const template = this.template();
    const path = `/templates/${this.categorySlug()}/${this.slug()}`;

    this.seo.update({
      title: template?.seoTitle ?? template?.title ?? 'Template',
      description: template?.metaDescription ?? template?.description ?? 'Explore this Fatima Hope Foundation module template.',
      path,
    });

    this.seo.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Templates', path: '/templates' },
      { name: template?.category ?? 'Category', path: `/templates/${this.categorySlug()}` },
      { name: template?.title ?? 'Template', path },
    ]);

    if (template) {
      this.seo.setJsonLd({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: template.title,
        description: template.metaDescription ?? template.description,
        url: `${environment.appUrl}${path}`,
        keywords: template.tags?.join(', '),
        creator: {
          '@type': 'Organization',
          name: 'Fatima Hope Foundation',
          sameAs: environment.appUrl,
        },
      });
    }
  }
}
