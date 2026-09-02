import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { CareersService } from '../../core/services/careers.service';
import { ScrollRevealDirective } from '../../shared/ui/scroll-reveal/scroll-reveal.directive';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
})
export class Careers implements OnInit {
  protected readonly careersService = inject(CareersService);
  private readonly seo = inject(SeoService);
  private readonly appUrl = environment.appUrl;

  protected readonly openJobs = computed(() =>
    this.careersService.jobs().filter((job) => job.status === 'open'),
  );

  ngOnInit(): void {
    this.seo.update({
      title: 'Careers',
      description:
        'Join the Fatima Hope Foundation team. Explore current job openings and apply to help us reach more families in need.',
      path: '/careers',
    });

    this.seo.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Careers', path: '/careers' },
    ]);

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Fatima Hope Foundation Job Openings',
      itemListElement: this.openJobs().map((job, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${this.appUrl}/careers/${job.slug}`,
        item: {
          '@type': 'JobPosting',
          title: job.title,
          description: job.summary,
          employmentType: job.type.toUpperCase().replace('-', '_'),
          hiringOrganization: {
            '@type': 'NGO',
            name: 'Fatima Hope Foundation',
            sameAs: this.appUrl,
          },
          jobLocation: {
            '@type': 'Place',
            address: job.location,
          },
        },
      })),
    });
  }
}
