import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../core/services/seo.service';
import { Button } from '../../../../shared/ui/button/button';

@Component({
  selector: 'app-donate-cancel',
  standalone: true,
  imports: [RouterLink, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './donate-cancel.html',
})
export class DonateCancel implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Donation Cancelled',
      description: 'Your donation was not completed.',
      path: '/donate/cancel',
      noindex: true,
    });
  }
}
