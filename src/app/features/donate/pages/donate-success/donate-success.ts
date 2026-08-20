import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../core/services/seo.service';
import { Button } from '../../../../shared/ui/button/button';

@Component({
  selector: 'app-donate-success',
  standalone: true,
  imports: [RouterLink, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './donate-success.html',
})
export class DonateSuccess implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Thank You',
      description: 'Thank you for your donation to Fatima Hope Foundation.',
      path: '/donate/success',
      noindex: true,
    });
  }
}
