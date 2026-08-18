import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { Button } from '../button/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="result-section">
      <div class="container-fhf result-card glass">
        <span class="result-icon result-icon--cancel"><i class="pi pi-question"></i></span>
        <h1 class="font-display">Page Not Found</h1>
        <p>The page you're looking for doesn't exist or may have been moved.</p>
        <div class="result-actions">
          <app-button variant="primary" routerLink="/">Back to Home</app-button>
          <app-button variant="outline" routerLink="/contact">Contact Us</app-button>
        </div>
      </div>
    </section>
  `,
})
export class NotFound implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Page Not Found',
      description: 'The page you requested could not be found.',
      path: '/404',
    });
  }
}
