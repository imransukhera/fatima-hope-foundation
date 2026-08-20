import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-admin-coming-soon',
  standalone: true,
  imports: [RouterLink, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="result-section">
      <div class="container-fhf result-card glass">
        <span class="result-icon result-icon--success"><i class="pi pi-shield"></i></span>
        <h1 class="font-display">Admin Dashboard — Coming in Phase 2</h1>
        <p>
          This build ships the public-facing site and donation flow. The secure admin dashboard
          (Firebase Authentication, role-based access, donation/volunteer/event/blog management,
          Excel/PDF exports) is planned as the next phase — see README.md → "Roadmap" for details.
        </p>
        <div class="result-actions">
          <app-button variant="primary" routerLink="/">Back to Home</app-button>
        </div>
      </div>
    </section>
  `,
})
export class AdminComingSoon implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Admin',
      description: 'Fatima Hope Foundation admin dashboard.',
      path: '/admin',
      noindex: true,
    });
  }
}
