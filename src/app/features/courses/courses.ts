import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { CoursesService } from '../../core/services/courses.service';
import { ScrollRevealDirective } from '../../shared/ui/scroll-reveal/scroll-reveal.directive';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses implements OnInit {
  protected readonly coursesService = inject(CoursesService);
  private readonly seo = inject(SeoService);
  private readonly appUrl = environment.appUrl;

  ngOnInit(): void {
    this.seo.update({
      title: 'Free Vocational & Skill Development Courses',
      description:
        'Explore free vocational and skill-development courses from Fatima Hope Foundation, empowering youth across Marot, Fort Abbas, Bahawalnagar and Southern Punjab.',
      path: '/courses',
    });

    this.seo.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Courses', path: '/courses' },
    ]);

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Fatima Hope Foundation Courses',
      itemListElement: this.coursesService.courses().map((course, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${this.appUrl}/courses/${course.slug}`,
        item: {
          '@type': 'Course',
          name: course.title,
          description: course.summary,
          provider: {
            '@type': 'Organization',
            name: 'Fatima Hope Foundation',
            sameAs: this.appUrl,
          },
        },
      })),
    });
  }
}
