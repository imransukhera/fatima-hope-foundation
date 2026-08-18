import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then((m) => m.About),
  },
  {
    path: 'programs',
    loadComponent: () => import('./features/programs/programs').then((m) => m.Programs),
  },
  {
    path: 'programs/:slug',
    loadComponent: () =>
      import('./features/programs/program-detail/program-detail').then((m) => m.ProgramDetail),
  },
  {
    path: 'courses',
    loadComponent: () => import('./features/courses/courses').then((m) => m.Courses),
  },
  {
    path: 'courses/:slug',
    loadComponent: () =>
      import('./features/courses/course-detail/course-detail').then((m) => m.CourseDetail),
  },
  {
    path: 'impact',
    loadComponent: () => import('./features/impact/impact').then((m) => m.Impact),
  },
  {
    path: 'gallery',
    loadComponent: () => import('./features/gallery/gallery').then((m) => m.Gallery),
  },
  {
    path: 'events',
    loadComponent: () => import('./features/events/events').then((m) => m.Events),
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog').then((m) => m.Blog),
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./features/blog/blog-detail/blog-detail').then((m) => m.BlogDetail),
  },
  {
    path: 'volunteer',
    loadComponent: () => import('./features/volunteer/volunteer').then((m) => m.Volunteer),
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'donate',
    loadComponent: () => import('./features/donate/donate').then((m) => m.Donate),
  },
  {
    path: 'donate/success',
    loadComponent: () =>
      import('./features/donate/pages/donate-success/donate-success').then((m) => m.DonateSuccess),
  },
  {
    path: 'donate/cancel',
    loadComponent: () =>
      import('./features/donate/pages/donate-cancel/donate-cancel').then((m) => m.DonateCancel),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin-coming-soon').then((m) => m.AdminComingSoon),
  },
  {
    path: '**',
    loadComponent: () => import('./shared/ui/not-found/not-found').then((m) => m.NotFound),
  },
];
