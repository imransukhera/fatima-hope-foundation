import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { SeoService } from '../../../core/services/seo.service';
import { CareersService } from '../../../core/services/careers.service';
import { ScrollRevealDirective } from '../../../shared/ui/scroll-reveal/scroll-reveal.directive';
import { JobOpening } from '../../../core/models/content.models';
import { environment } from '../../../../environments/environment';

const EMPLOYMENT_TYPE_SCHEMA: Record<JobOpening['type'], string> = {
  'Full-time': 'FULL_TIME',
  'Part-time': 'PART_TIME',
  Contract: 'CONTRACTOR',
  Volunteer: 'VOLUNTEER',
  Internship: 'INTERN',
};

// Google drops JobPosting listings that go stale, so give every posting an
// explicit expiry even though the CMS doesn't track one yet.
const JOB_POSTING_VALID_DAYS = 90;

@Component({
  selector: 'app-career-detail',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './career-detail.html',
  styleUrl: './career-detail.scss',
})
export class CareerDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly careersService = inject(CareersService);
  private readonly seo = inject(SeoService);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: '',
  });

  protected readonly job = computed(() =>
    this.careersService.jobs().find((j) => j.slug === this.slug()),
  );

  protected readonly otherJobs = computed(() =>
    this.careersService
      .jobs()
      .filter((j) => j.slug !== this.slug() && j.status === 'open')
      .slice(0, 3),
  );

  protected readonly resumeFile = signal<File | null>(null);
  protected readonly resumeFileName = signal('');

  protected readonly submitting = signal(false);
  protected readonly submitted = signal(false);
  protected readonly error = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    city: ['', Validators.required],
    coverMessage: ['', [Validators.required, Validators.minLength(20)]],
  });

  ngOnInit(): void {
    const job = this.job();
    const isOpen = job?.status === 'open';

    this.seo.update({
      title: job ? `${job.title} — ${job.department}` : 'Careers',
      description: job?.summary ?? 'Explore this job opening at Fatima Hope Foundation.',
      path: `/careers/${this.slug()}`,
      type: 'article',
      // Closed roles and unknown slugs shouldn't rank or show up in Google Jobs.
      noindex: !isOpen,
    });

    this.seo.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Careers', path: '/careers' },
      { name: job?.title ?? 'Job', path: `/careers/${this.slug()}` },
    ]);

    if (job && isOpen) {
      this.seo.setJsonLd(this.buildJobPostingJsonLd(job));
    }
  }

  private buildJobPostingJsonLd(job: JobOpening): object {
    const appUrl = environment.appUrl;
    const isRemote = job.location.toLowerCase().includes('remote');
    const postedAt = job.postedAt ?? new Date().toISOString().slice(0, 10);
    const validThrough = new Date(postedAt);
    validThrough.setDate(validThrough.getDate() + JOB_POSTING_VALID_DAYS);

    return {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: job.title,
      description: job.description,
      identifier: {
        '@type': 'PropertyValue',
        name: 'Fatima Hope Foundation',
        value: job.id,
      },
      datePosted: postedAt,
      validThrough: validThrough.toISOString().slice(0, 10),
      employmentType: EMPLOYMENT_TYPE_SCHEMA[job.type],
      hiringOrganization: {
        '@type': 'NGO',
        name: 'Fatima Hope Foundation',
        sameAs: appUrl,
        logo: `${appUrl}/images/logo.jpeg`,
      },
      directApply: true,
      ...(isRemote
        ? {
            jobLocationType: 'TELECOMMUTE',
            applicantLocationRequirements: { '@type': 'Country', name: 'Pakistan' },
          }
        : {
            jobLocation: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: job.location.split(',')[0].trim(),
                addressCountry: 'PK',
              },
            },
          }),
    };
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.resumeFile.set(file);
    this.resumeFileName.set(file?.name ?? '');
  }

  async onSubmit(): Promise<void> {
    const job = this.job();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!job) {
      this.error.set(true);
      return;
    }

    this.submitting.set(true);
    this.error.set(false);

    try {
      const { fullName, email, phone, city, coverMessage } = this.form.getRawValue();

      const application = {
        jobId: job.id,
        jobTitle: job.title,
        fullName,
        email,
        phone,
        city,
        coverMessage,
      };

      const ok = await this.careersService.submitApplication(application);

      if (ok) {
        this.submitted.set(true);
        this.form.reset();
        this.resumeFile.set(null);
        this.resumeFileName.set('');
      } else {
        this.error.set(true);
      }
    } catch (error) {
      console.error('Failed to submit application:', error);
      this.error.set(true);
    } finally {
      this.submitting.set(false);
    }
  }
}
