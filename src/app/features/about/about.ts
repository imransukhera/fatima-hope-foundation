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
      title: 'About Us',
      description:
        'Learn about Fatima Hope Foundation’s mission, vision, chairman’s message, story and the core values that guide everything we do.',
      path: '/about',
    });
  }
}
