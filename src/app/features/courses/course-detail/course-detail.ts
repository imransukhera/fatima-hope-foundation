import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { SeoService } from '../../../core/services/seo.service';
import { CoursesService } from '../../../core/services/courses.service';
import { Button } from '../../../shared/ui/button/button';
import { ScrollRevealDirective } from '../../../shared/ui/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [RouterLink, Button, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.scss',
})
export class CourseDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly coursesService = inject(CoursesService);
  private readonly seo = inject(SeoService);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: '',
  });

  protected readonly course = computed(() =>
    this.coursesService.courses().find((c) => c.slug === this.slug()),
  );

  protected readonly otherCourses = computed(() =>
    this.coursesService.courses().filter((c) => c.slug !== this.slug()).slice(0, 3),
  );

  ngOnInit(): void {
    const course = this.course();
    this.seo.update({
      title: course?.title ?? 'Course',
      description: course?.description ?? 'Explore this Fatima Hope Foundation course.',
      path: `/courses/${this.slug()}`,
      image: course?.image,
    });
  }
}
