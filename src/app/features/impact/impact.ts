import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SeoService } from '../../core/services/seo.service';
import { StatsService } from '../../core/services/stats.service';
import { ProgramsService } from '../../core/services/programs.service';
import { StatCounter } from '../../shared/ui/stat-counter/stat-counter';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { ScrollRevealDirective } from '../../shared/ui/scroll-reveal/scroll-reveal.directive';

interface YearlyGrowth {
  year: string;
  familiesHelped: number;
  percent: number;
}

@Component({
  selector: 'app-impact',
  standalone: true,
  imports: [StatCounter, SectionHeading, ScrollRevealDirective, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './impact.html',
  styleUrl: './impact.scss',
})
export class Impact implements OnInit {
  protected readonly statsService = inject(StatsService);
  protected readonly programsService = inject(ProgramsService);
  private readonly seo = inject(SeoService);

  protected readonly yearlyGrowth: YearlyGrowth[] = [
    { year: '2021', familiesHelped: 320, percent: 32 },
    { year: '2022', familiesHelped: 510, percent: 51 },
    { year: '2023', familiesHelped: 680, percent: 68 },
    { year: '2024', familiesHelped: 840, percent: 84 },
    { year: '2025', familiesHelped: 960, percent: 96 },
    { year: '2026', familiesHelped: 1000, percent: 100 },
  ];

  protected readonly regions = [
    { name: 'Karachi', percent: 45 },
    { name: 'Lahore', percent: 25 },
    { name: 'Multan', percent: 15 },
    { name: 'Other Cities', percent: 15 },
  ];

  private readonly sanitizer = inject(DomSanitizer);
  protected readonly mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.google.com/maps?q=Karachi,Pakistan&output=embed',
  );

  ngOnInit(): void {
    this.seo.update({
      title: 'Our Impact',
      description:
        'See the real, measurable impact of Fatima Hope Foundation — families helped, medical cases treated, children educated, and communities transformed.',
      path: '/impact',
    });
  }
}
