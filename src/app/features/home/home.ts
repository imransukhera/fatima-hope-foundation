import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { ProgramsService } from '../../core/services/programs.service';
import { TestimonialsService } from '../../core/services/testimonials.service';
import { StatsService } from '../../core/services/stats.service';
import { StatCounter } from '../../shared/ui/stat-counter/stat-counter';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { Button } from '../../shared/ui/button/button';
import { ScrollRevealDirective } from '../../shared/ui/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, StatCounter, SectionHeading, Button, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  protected readonly programsService = inject(ProgramsService);
  protected readonly testimonialsService = inject(TestimonialsService);
  protected readonly statsService = inject(StatsService);

  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Non-Profit Charity & Humanitarian Relief',
      description:
        "Support Fatima Hope Foundation's mission to provide food, medical care, education, and emergency relief to families in need. Donate or volunteer today!",
      path: '/',
    });
  }
}
