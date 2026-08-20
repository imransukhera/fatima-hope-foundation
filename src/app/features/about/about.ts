import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { SEED_TIMELINE, SEED_VALUES } from '../../core/data/seed-data';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { ScrollRevealDirective } from '../../shared/ui/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionHeading, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  protected readonly timeline = SEED_TIMELINE;
  protected readonly values = SEED_VALUES;

  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'About Us — Our Mission & Story',
      description:
        'Discover the mission, vision and story behind Fatima Hope Foundation — a Pakistan NGO delivering food, healthcare & education across Southern Punjab.',
      path: '/about',
    });

    this.seo.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
    ]);

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Fatima Hope Foundation',
      description:
        'Fatima Hope Foundation is a non-profit welfare organization dedicated to restoring dignity, self-reliance, and hope across Bahawalnagar, Fort Abbas, Bahawalpur, and Multan through sustainable food security, emergency healthcare, and child education programs.',
      mainEntity: {
        '@type': 'NGO',
        name: 'Fatima Hope Foundation',
        founder: {
          '@type': 'Person',
          name: 'Muhammad Imran',
          jobTitle: 'Founder & Chairman',
        },
      },
    });
  }
}
