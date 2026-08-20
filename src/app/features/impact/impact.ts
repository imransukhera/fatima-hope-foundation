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

  // Updated regional distribution incorporating specific target locations
  protected readonly regions = [
    { name: 'Bahawalnagar', percent: 35 },
    { name: 'Bahawalpur', percent: 25 },
    { name: 'Multan', percent: 20 },
    { name: 'Fort Abbas & Surrounding', percent: 20 },
  ];

  private readonly sanitizer = inject(DomSanitizer);
  // Centered Google Map iframe URL covering Bahawalnagar, Bahawalpur, Multan & Fort Abbas region
  protected readonly mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1740.9935490746766!2d72.40799518940753!3d29.223934007893902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393c3d004f455ecf%3A0xdb722e6649673fa1!2s319%20hr%20marot!5e0!3m2!1sen!2s!4v1787136636373!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin'
  );

  ngOnInit(): void {
    this.seo.update({
      title: 'Our Charitable Impact | Fatima Hope Foundation',
      description:
        'Explore the measurable impact of Fatima Hope Foundation across Bahawalnagar, Bahawalpur, Multan, and Fort Abbas—providing food security, medical aid, and child education.',
      path: '/impact',
    });

    this.seo.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Impact', path: '/impact' },
    ]);
  }
}