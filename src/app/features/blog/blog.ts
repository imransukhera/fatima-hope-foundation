import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { BlogService } from '../../core/services/blog.service';
import { ScrollRevealDirective } from '../../shared/ui/scroll-reveal/scroll-reveal.directive';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, DatePipe, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements OnInit {
  protected readonly blogService = inject(BlogService);
  private readonly seo = inject(SeoService);
  private readonly appUrl = environment.appUrl;

  ngOnInit(): void {
    this.seo.update({
      title: 'Blog',
      description:
        'Stories, updates and insights from Fatima Hope Foundation — transparency, program updates and behind-the-scenes coverage.',
      path: '/blog',
    });

    this.seo.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]);

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Fatima Hope Foundation Blog',
      url: `${this.appUrl}/blog`,
      blogPost: this.blogService.posts().map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        url: `${this.appUrl}/blog/${post.slug}`,
        datePublished: post.publishedAt,
        author: { '@type': 'Person', name: post.author },
      })),
    });
  }
}
