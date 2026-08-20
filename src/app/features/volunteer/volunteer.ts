import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeoService } from '../../core/services/seo.service';
import { VolunteerService } from '../../core/services/volunteer.service';

const SKILL_OPTIONS = [
  'Food Packing & Distribution',
  'Medical / Nursing',
  'Teaching / Tutoring',
  'Fundraising',
  'Photography / Videography',
  'Social Media & Marketing',
  'Event Management',
  'Translation',
];

const AVAILABILITY_OPTIONS = ['Weekdays', 'Weekends', 'Evenings', 'Flexible / Anytime'];

@Component({
  selector: 'app-volunteer',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.scss',
})
export class Volunteer implements OnInit {
  protected readonly skillOptions = SKILL_OPTIONS;
  protected readonly availabilityOptions = AVAILABILITY_OPTIONS;

  protected readonly selectedSkills = signal<string[]>([]);
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
    availability: ['', Validators.required],
    motivation: ['', [Validators.required, Validators.minLength(20)]],
  });

  private readonly volunteerService = inject(VolunteerService);
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Become a Volunteer',
      description:
        'Join Fatima Hope Foundation as a volunteer. Share your skills and time to help us reach more families in need.',
      path: '/volunteer',
    });

    this.seo.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Volunteer', path: '/volunteer' },
    ]);
  }

  toggleSkill(skill: string): void {
    this.selectedSkills.update((skills) =>
      skills.includes(skill) ? skills.filter((s) => s !== skill) : [...skills, skill],
    );
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.resumeFile.set(file);
    this.resumeFileName.set(file?.name ?? '');
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.selectedSkills().length === 0) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.error.set(false);

    const { fullName, email, phone, city, availability, motivation } = this.form.getRawValue();

    const file = this.resumeFile();
    const resumeUrl = file
      ? (await this.volunteerService.uploadResume(file, email)) ?? undefined
      : undefined;

    const ok = await this.volunteerService.submitApplication({
      fullName,
      email,
      phone,
      city,
      skills: this.selectedSkills(),
      availability,
      motivation,
      resumeUrl,
    });

    this.submitting.set(false);

    if (ok) {
      this.submitted.set(true);
      this.form.reset();
      this.selectedSkills.set([]);
      this.resumeFileName.set('');
    } else {
      this.error.set(true);
    }
  }
}
