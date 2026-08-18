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
      title: 'Giving Hope, Changing Lives',
      description:
        'Fatima Hope Foundation provides food & ration support, medical assistance, education, orphan care and emergency relief to underprivileged families in Pakistan. Donate today.',
      path: '/',
    });
  }
}
