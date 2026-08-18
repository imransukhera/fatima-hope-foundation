import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { BlogService } from '../../core/services/blog.service';
import { ScrollRevealDirective } from '../../shared/ui/scroll-reveal/scroll-reveal.directive';

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

  ngOnInit(): void {
    this.seo.update({
      title: 'Blog',
      description:
        'Stories, updates and insights from Fatima Hope Foundation — transparency, program updates and behind-the-scenes coverage.',
      path: '/blog',
    });
  }
}
