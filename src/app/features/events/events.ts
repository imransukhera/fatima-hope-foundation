import { DatePipe, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { EventsService } from '../../core/services/events.service';
import { ScrollRevealDirective } from '../../shared/ui/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [ScrollRevealDirective, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements OnInit {
  protected readonly eventsService = inject(EventsService);

  protected readonly nextEvent = computed(() => {
    const upcoming = [...this.eventsService.upcoming()].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    return upcoming[0];
  });

  protected readonly countdown = signal({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  private readonly platformId = inject(PLATFORM_ID);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.seo.update({
      title: 'Events',
      description:
        'Join Fatima Hope Foundation at upcoming food distributions, medical camps and community events. See past events too.',
      path: '/events',
    });

    if (isPlatformBrowser(this.platformId)) {
      this.startCountdown();
    }
  }

  private startCountdown(): void {
    const tick = () => {
      const target = this.nextEvent();
      if (!target) return;

      const diff = Math.max(0, new Date(target.date).getTime() - Date.now());
      this.countdown.set({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    this.destroyRef.onDestroy(() => clearInterval(interval));
  }
}
