import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ContactService } from '../../../core/services/contact.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly year = new Date().getFullYear();
  protected readonly contact = environment.contact;
  protected readonly bank = environment.bankTransfer;

  protected readonly newsletterEmail = signal('');
  protected readonly subscribed = signal(false);

  private readonly contactService = inject(ContactService);

  async subscribe(): Promise<void> {
    const email = this.newsletterEmail().trim();
    if (!email) return;
    await this.contactService.sendMessage({
      name: 'Newsletter Subscriber',
      email,
      subject: 'Newsletter Signup',
      message: 'Requested to join the newsletter mailing list.',
    });
    this.subscribed.set(true);
    this.newsletterEmail.set('');
  }
}
