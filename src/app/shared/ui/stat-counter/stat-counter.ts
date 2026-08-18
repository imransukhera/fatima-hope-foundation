import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-stat-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="stat-counter">{{ display() }}{{ suffix() }}</span>
  `,
  styles: [
    `
      .stat-counter {
        font-family: var(--font-heading);
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }
    `,
  ],
})
export class StatCounter {
  readonly value = input.required<number>();
  readonly suffix = input('');
  readonly durationMs = input(1800);

  readonly display = signal(0);

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        this.display.set(this.value());
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.animate();
              observer.unobserve(this.el.nativeElement);
            }
          }
        },
        { threshold: 0.4 },
      );
      observer.observe(this.el.nativeElement);
    });
  }

  private animate(): void {
    const target = this.value();
    const duration = this.durationMs();
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.display.set(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }
}
