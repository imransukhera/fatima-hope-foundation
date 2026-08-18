import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { SeoService } from '../../../core/services/seo.service';
import { ProgramsService } from '../../../core/services/programs.service';
import { Button } from '../../../shared/ui/button/button';
import { ScrollRevealDirective } from '../../../shared/ui/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-program-detail',
  standalone: true,
  imports: [RouterLink, DecimalPipe, Button, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './program-detail.html',
  styleUrl: './program-detail.scss',
})
export class ProgramDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly programsService = inject(ProgramsService);
  private readonly seo = inject(SeoService);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: '',
  });

  protected readonly program = computed(() =>
    this.programsService.programs().find((p) => p.slug === this.slug()),
  );

  protected readonly otherPrograms = computed(() =>
    this.programsService.programs().filter((p) => p.slug !== this.slug()).slice(0, 3),
  );

  ngOnInit(): void {
    const program = this.program();
    this.seo.update({
      title: program?.title ?? 'Program',
      description: program?.description ?? 'Explore this Fatima Hope Foundation program.',
      path: `/programs/${this.slug()}`,
      image: program?.image,
    });
  }
}
