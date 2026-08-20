import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { SeoService } from '../../../core/services/seo.service';
import { CoursesService } from '../../../core/services/courses.service';
import { EnrollmentService, EnrollmentSession } from '../../../core/services/enrollment.service';
import { Button } from '../../../shared/ui/button/button';
import { ScrollRevealDirective } from '../../../shared/ui/scroll-reveal/scroll-reveal.directive';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [RouterLink, Button, ScrollRevealDirective, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.scss',
})
export class CourseDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly coursesService = inject(CoursesService);
  private readonly seo = inject(SeoService);
  private readonly enrollmentService = inject(EnrollmentService);
  private readonly sanitizer = inject(DomSanitizer);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: '',
  });

  protected readonly course = computed(() =>
    this.coursesService.courses().find((c) => c.slug === this.slug()),
  );

  protected readonly otherCourses = computed(() =>
    this.coursesService.courses().filter((c) => c.slug !== this.slug()).slice(0, 3),
  );

  protected readonly session = signal<EnrollmentSession | null>(null);
  protected readonly completedModules = signal<Set<string>>(new Set());
  protected readonly expandedModuleId = signal<string | null>(null);

  protected readonly progressPercent = computed(() => {
    const modules = this.course()?.modules ?? [];
    if (modules.length === 0) return 0;
    return Math.round((this.completedModules().size / modules.length) * 100);
  });

  protected readonly enrollDialogOpen = signal(false);
  protected readonly enrollSubmitting = signal(false);
  protected readonly enrollError = signal('');
  protected readonly enrollSuccess = signal(false);

  protected readonly enrollForm = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {
    const course = this.course();
    const path = `/courses/${this.slug()}`;

    this.seo.update({
      title: course?.seoTitle ?? course?.title ?? 'Course',
      description: course?.metaDescription ?? course?.description ?? 'Explore this Fatima Hope Foundation course.',
      ogTitle: course?.socialTitle,
      ogDescription: course?.socialDescription,
      path,
      image: course?.image,
    });

    this.seo.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Courses', path: '/courses' },
      { name: course?.title ?? 'Course', path },
    ]);

    if (course) {
      const courseSchema = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.title,
        description: course.metaDescription ?? course.description,
        image: course.image,
        url: `${environment.appUrl}${path}`,
        ...(course.keywords?.length ? { keywords: course.keywords.join(', ') } : {}),
        provider: {
          '@type': 'Organization',
          name: 'Fatima Hope Foundation',
          sameAs: environment.appUrl,
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'Onsite',
          courseWorkload: course.duration,
        },
        educationalLevel: course.level,
        instructor: {
          '@type': 'Person',
          name: course.instructor,
        },
        isAccessibleForFree: true,
        ...(course.modules?.length
          ? {
              hasPart: course.modules.map((module, index) => ({
                '@type': 'Syllabus',
                position: index + 1,
                name: module.title,
                description: module.summary,
                url: `${environment.appUrl}${path}#module-${module.id}`,
              })),
            }
          : {}),
      };

      const faqSchema = course.faqs?.length
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: course.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }
        : null;

      this.seo.setJsonLd(faqSchema ? [courseSchema, faqSchema] : courseSchema);
    }

    this.loadSession();
  }

  private loadSession(): void {
    const existing = this.enrollmentService.getSession(this.slug());
    if (!existing) return;

    this.session.set(existing);
    this.enrollmentService.getCompletedModules(existing.id).then((completed) => {
      this.completedModules.set(new Set(completed));
    });
  }

  protected trustHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  protected toggleModuleExpanded(moduleId: string): void {
    this.expandedModuleId.update((current) => (current === moduleId ? null : moduleId));
  }

  protected async toggleModuleComplete(moduleId: string, event: Event): Promise<void> {
    event.stopPropagation();

    const activeSession = this.session();
    if (!activeSession) {
      this.openEnrollDialog();
      return;
    }

    const completed = this.completedModules();
    const isComplete = completed.has(moduleId);

    const updated = new Set(completed);
    isComplete ? updated.delete(moduleId) : updated.add(moduleId);
    this.completedModules.set(updated);

    await this.enrollmentService.setModuleComplete(activeSession.id, moduleId, !isComplete);
  }

  protected openEnrollDialog(): void {
    this.enrollError.set('');
    this.enrollDialogOpen.set(true);
  }

  protected closeEnrollDialog(): void {
    this.enrollDialogOpen.set(false);
  }

  protected async submitEnroll(): Promise<void> {
    if (this.enrollForm.invalid) {
      this.enrollForm.markAllAsTouched();
      return;
    }

    this.enrollSubmitting.set(true);
    this.enrollError.set('');

    const { name, email, phone, password } = this.enrollForm.getRawValue();
    const result = await this.enrollmentService.enroll({
      courseSlug: this.slug(),
      name,
      email,
      phone,
      password,
    });

    this.enrollSubmitting.set(false);

    if ('error' in result) {
      this.enrollError.set(result.error);
      return;
    }

    this.session.set(result.session);
    this.completedModules.set(new Set());
    this.enrollSuccess.set(true);
    this.enrollForm.reset();
  }
}
