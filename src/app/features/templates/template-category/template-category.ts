import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { SeoService } from '../../../core/services/seo.service';
import { TemplatesService } from '../../../core/services/templates.service';
import { ScrollRevealDirective } from '../../../shared/ui/scroll-reveal/scroll-reveal.directive';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-template-category',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './template-category.html',
  styleUrl: './template-category.scss',
})
export class TemplateCategoryPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly templatesService = inject(TemplatesService);
  private readonly seo = inject(SeoService);
  private readonly appUrl = environment.appUrl;

  private readonly categorySlug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('category') ?? '')),
    { initialValue: '' },
  );

  protected readonly category = computed(() =>
    this.templatesService.categories().find((c) => c.slug === this.categorySlug()),
  );

  protected readonly items = computed(() => this.templatesService.byCategory(this.categorySlug())());

  ngOnInit(): void {
    const category = this.category();
    const path = `/templates/${this.categorySlug()}`;

    this.seo.update({
      title: category ? `${category.title} — Module Templates` : 'Module Templates',
      description: category?.description ?? 'Browse this Fatima Hope Foundation module template category.',
      path,
    });

    this.seo.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Templates', path: '/templates' },
      { name: category?.title ?? 'Category', path },
    ]);

    if (category) {
      this.seo.setJsonLd({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: category.title,
        itemListElement: this.items().map((template, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${this.appUrl}/templates/${category.slug}/${template.slug}`,
          item: {
            '@type': 'CreativeWork',
            name: template.title,
            description: template.summary,
          },
        })),
      });
    }
  }
}
