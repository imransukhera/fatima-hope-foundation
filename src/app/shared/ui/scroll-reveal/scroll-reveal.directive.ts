import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, PLATFORM_ID, afterNextRender, inject, input } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
  host: { class: 'reveal' },
})
export class ScrollRevealDirective {
  readonly delay = input(0, { alias: 'appScrollReveal' });

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      const element = this.el.nativeElement;
      const delayMs = this.delay() || 0;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setTimeout(() => element.classList.add('reveal-visible'), delayMs);
              observer.unobserve(element);
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
      );

      observer.observe(element);
    });
  }
}
