import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { SeoService } from '../../../core/services/seo.service';
import { BlogService } from '../../../core/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.scss',
})
export class BlogDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly blogService = inject(BlogService);
  private readonly seo = inject(SeoService);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: '',
  });

  protected readonly post = computed(() => this.blogService.posts().find((p) => p.slug === this.slug()));

  ngOnInit(): void {
    const post = this.post();
    this.seo.update({
      title: post?.title ?? 'Blog',
      description: post?.excerpt ?? 'Read this story from Fatima Hope Foundation.',
      path: `/blog/${this.slug()}`,
      image: post?.image,
      type: 'article',
    });
  }
}
