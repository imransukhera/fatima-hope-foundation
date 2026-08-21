import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SeoService } from '../../core/services/seo.service';
import { ContactService } from '../../core/services/contact.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  protected readonly contact = environment.contact;

  protected readonly submitting = signal(false);
  protected readonly submitted = signal(false);
  protected readonly error = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  private readonly contactService = inject(ContactService);
  private readonly seo = inject(SeoService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.google.com/maps?q=Marot,+Fort+Abbas,+Bahawalnagar,+Punjab,+Pakistan&output=embed',
  );

  ngOnInit(): void {
    this.seo.update({
      title: 'Contact Us | Fort Abbas, Bahawalnagar',
      description:
        'Connect with Fatima Hope Foundation in Fort Abbas, Bahawalnagar. Contact us for donations, social welfare programs, partnerships, or volunteering.',
      path: '/contact',
    });

    this.seo.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]);

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Fatima Hope Foundation',
      url: `${environment.appUrl}/contact`,
      mainEntity: {
        '@type': 'NGO',
        name: 'Fatima Hope Foundation',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          telephone: `+${this.contact.whatsapp}`,
          email: this.contact.email,
          areaServed: 'PK',
          availableLanguage: ['Urdu', 'English'],
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Marot, Tehsil Fort Abbas',
          addressLocality: 'Bahawalnagar',
          addressRegion: 'Punjab',
          addressCountry: 'PK',
        },
      },
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.error.set(false);

    const value = this.form.getRawValue();
    const ok = await this.contactService.sendMessage(value);

    this.submitting.set(false);

    if (ok) {
      this.submitted.set(true);
      this.form.reset();
    } else {
      this.error.set(true);
    }
  }
}
