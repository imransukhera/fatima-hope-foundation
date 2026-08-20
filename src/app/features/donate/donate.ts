import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeoService } from '../../core/services/seo.service';
import { ProgramsService } from '../../core/services/programs.service';
import { DonationsService } from '../../core/services/donations.service';
import { StripeService } from '../../core/services/stripe.service';
import { environment } from '../../../environments/environment';

type PaymentMethod = 'stripe' | 'bank-transfer';
type Frequency = 'one-time' | 'monthly';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './donate.html',
  styleUrl: './donate.scss',
})
export class Donate implements OnInit {
  protected readonly quickAmounts = [10, 20, 50, 100];
  protected readonly bank = environment.bankTransfer;
  protected readonly contact = environment.contact;

  protected readonly selectedAmount = signal<number | null>(50);
  protected readonly customAmount = signal<string>('');
  protected readonly frequency = signal<Frequency>('one-time');
  protected readonly method = signal<PaymentMethod>('stripe');
  protected readonly copied = signal(false);

  protected readonly submitting = signal(false);
  protected readonly errorMsg = signal<string | null>(null);
  protected readonly bankConfirmed = signal(false);

  protected readonly amount = computed(() => {
    const custom = parseFloat(this.customAmount());
    if (!isNaN(custom) && custom > 0) return custom;
    return this.selectedAmount() ?? 0;
  });

  protected readonly programsService = inject(ProgramsService);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    donorName: ['', [Validators.required, Validators.minLength(2)]],
    donorEmail: ['', [Validators.required, Validators.email]],
    program: [''],
    message: [''],
    anonymous: [false],
  });

  private readonly donationsService = inject(DonationsService);
  private readonly stripeService = inject(StripeService);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Donate Now',
      description:
        'Support Fatima Hope Foundation with a secure one-time or monthly donation via card, Apple Pay, Google Pay, or bank transfer.',
      path: '/donate',
    });

    this.seo.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Donate', path: '/donate' },
    ]);
  }

  selectAmount(value: number): void {
    this.selectedAmount.set(value);
    this.customAmount.set('');
  }

  onCustomAmountChange(value: string): void {
    this.customAmount.set(value);
    this.selectedAmount.set(null);
  }

  setFrequency(freq: Frequency): void {
    this.frequency.set(freq);
  }

  setMethod(method: PaymentMethod): void {
    this.method.set(method);
    this.errorMsg.set(null);
  }

  async copyAccountNumber(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.bank.accountNumber);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // Clipboard API unavailable — user can select the text manually.
    }
  }

  async submitStripeDonation(): Promise<void> {
    if (this.form.invalid || this.amount() <= 0) {
      this.form.markAllAsTouched();
      if (this.amount() <= 0) this.errorMsg.set('Please select or enter a donation amount.');
      return;
    }

    this.submitting.set(true);
    this.errorMsg.set(null);

    const { donorName, donorEmail, program, message, anonymous } = this.form.getRawValue();

    // Note: the pending donation record is created server-side by the
    // `createCheckoutSession` Cloud Function (linked to the Stripe session
    // id), not here — that keeps the webhook's status update unambiguous.
    try {
      await this.stripeService.startCheckout({
        amount: this.amount(),
        currency: 'usd',
        frequency: this.frequency(),
        donorName,
        donorEmail,
        program: program || undefined,
        message: message || undefined,
        anonymous,
        successUrl: `${environment.appUrl}/donate/success`,
        cancelUrl: `${environment.appUrl}/donate/cancel`,
      });
    } catch (err) {
      this.errorMsg.set(
        (err as Error)?.message ??
          'Payment system is not configured yet. Please try bank transfer or contact us directly.',
      );
      this.submitting.set(false);
    }
  }

  async submitBankTransferIntent(): Promise<void> {
    if (this.form.invalid || this.amount() <= 0) {
      this.form.markAllAsTouched();
      if (this.amount() <= 0) this.errorMsg.set('Please select or enter a donation amount.');
      return;
    }

    this.submitting.set(true);
    const { donorName, donorEmail, program, message, anonymous } = this.form.getRawValue();

    await this.donationsService.recordDonation({
      donorName,
      donorEmail,
      amount: this.amount(),
      currency: 'pkr',
      frequency: this.frequency(),
      program: program || undefined,
      method: 'bank-transfer',
      status: 'pending',
      message: message || undefined,
      anonymous,
    });

    this.submitting.set(false);
    this.bankConfirmed.set(true);
  }
}
