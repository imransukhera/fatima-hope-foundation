import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { TemplatesService } from '../../core/services/templates.service';
import { ScrollRevealDirective } from '../../shared/ui/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './templates.html',
  styleUrl: './templates.scss',
})
export class Templates implements OnInit {
  protected readonly templatesService = inject(TemplatesService);
  private readonly seo = inject(SeoService);

  protected itemCount(categorySlug: string): number {
    return this.templatesService.byCategory(categorySlug)().length;
  }

  ngOnInit(): void {
    this.seo.update({
      title: 'Module Templates Library',
      description:
        'Browse the Fatima Hope Foundation module templates library — reusable HTML & CSS page designs, starting with 10 login page styles.',
      path: '/templates',
    });

    this.seo.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Templates', path: '/templates' },
    ]);
  }
}
