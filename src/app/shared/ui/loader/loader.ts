import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <div class="route-loader" role="progressbar" aria-label="Loading page"></div>
    }
  `,
  styles: [
    `
      .route-loader {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        width: 100%;
        z-index: 200;
        background: linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-accent));
        background-size: 200% 100%;
        animation: loading-slide 1.1s ease-in-out infinite;
      }

      @keyframes loading-slide {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `,
  ],
})
export class Loader {
  readonly loading = signal(false);

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    const sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) this.loading.set(true);
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading.set(false);
      }
    });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}
