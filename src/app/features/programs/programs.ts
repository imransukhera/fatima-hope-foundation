import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { ProgramsService } from '../../core/services/programs.service';
import { ScrollRevealDirective } from '../../shared/ui/scroll-reveal/scroll-reveal.directive';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './programs.html',
  styleUrl: './programs.scss',
})
export class Programs implements OnInit {
  protected readonly programsService = inject(ProgramsService);
  private readonly seo = inject(SeoService);
  private readonly appUrl = environment.appUrl;

  ngOnInit(): void {
    this.seo.update({
      title: 'Our Programs',
      description:
        'Explore Fatima Hope Foundation programs: food & ration support, medical assistance, education support, orphan care, emergency relief and women empowerment.',
      path: '/programs',
    });

    this.seo.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Programs', path: '/programs' },
    ]);

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Fatima Hope Foundation Programs',
      itemListElement: this.programsService.programs().map((program, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${this.appUrl}/programs/${program.slug}`,
        item: {
          '@type': 'Service',
          name: program.title,
          description: program.summary,
          provider: {
            '@type': 'NGO',
            name: 'Fatima Hope Foundation',
            sameAs: this.appUrl,
          },
        },
      })),
    });
  }
}
