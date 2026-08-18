import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { ProgramsService } from '../../core/services/programs.service';
import { ScrollRevealDirective } from '../../shared/ui/scroll-reveal/scroll-reveal.directive';

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

  ngOnInit(): void {
    this.seo.update({
      title: 'Our Programs',
      description:
        'Explore Fatima Hope Foundation programs: food & ration support, medical assistance, education support, orphan care, emergency relief and women empowerment.',
      path: '/programs',
    });
  }
}
