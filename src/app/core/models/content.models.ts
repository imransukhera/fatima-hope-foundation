export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface ProgramGalleryImage {
  src: string;
  alt: string;
}

export interface ProgramItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  icon: string;
  impactLabel: string;
  impactValue: number;
  progressPercent: number;
  altText?: string;  // Added optional property
  ctaText?: string;  // Added optional property
  packageTitle?: string;
  packageIntro?: string;
  packageContents?: string[];
  packageOutro?: string;
  gallery?: ProgramGalleryImage[];
}

export interface CourseModule {
  id: string;
  title: string;
  summary: string;
  objectives?: string[];
  contentHtml: string;
}

export interface CourseFaq {
  question: string;
  answer: string;
}

export interface CourseItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  icon: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  seatsAvailable: number;
  modules?: CourseModule[];
  /** Overrides `title` in the <title> tag only — keep the on-page h1 more descriptive if useful. */
  seoTitle?: string;
  /** Overrides `description` in the meta description tag. */
  metaDescription?: string;
  /** Overrides og:title / twitter:title (social share card headline). */
  socialTitle?: string;
  /** Overrides og:description / twitter:description (social share card copy). */
  socialDescription?: string;
  /** Descriptive alt text for the hero/thumbnail image, distinct from the display title. */
  altText?: string;
  keywords?: string[];
  faqs?: CourseFaq[];
}

export interface Enrollment {
  id?: string;
  courseSlug: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  completedModules: string[];
  createdAt?: unknown;
}

export interface TemplateCategory {
  slug: string;
  title: string;
  description: string;
  icon: string;
  swatch: string;
  /** Categories with no items yet render as a disabled "Coming Soon" card. */
  status: 'available' | 'coming-soon';
}

export interface TemplateItem {
  id: string;
  slug: string;
  /** Slug of the TemplateCategory this item belongs to, e.g. 'login-pages'. */
  categorySlug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  /** CSS background (solid color or gradient) used for the card/hero preview swatch — no photography needed. */
  swatch: string;
  icon: string;
  /** Path to the static HTML/CSS preview file, served from the public/ assets folder. */
  previewUrl: string;
  tags?: string[];
  seoTitle?: string;
  metaDescription?: string;
  /** Path to a static screenshot of the template, served from the public/ assets folder. When set, this image is shown instead of a live iframe preview. */
  previewImage?: string;
  /** Full HTML source of the template, shown as a copyable code block below the preview image. */
  htmlCode?: string;
  /** Full CSS source of the template, shown as a copyable code block below the HTML code. */
  cssCode?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  location: string;
  rating: number;
}

export interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  category: string;
  title: string;
  src: string;
  thumb: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  status: 'upcoming' | 'past';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  publishedAt: string;
}

export interface Donation {
  id?: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  frequency: 'one-time' | 'monthly';
  program?: string;
  method: 'stripe' | 'bank-transfer';
  status: 'pending' | 'succeeded' | 'failed';
  message?: string;
  anonymous: boolean;
  createdAt?: unknown;
  stripeSessionId?: string;
}

export interface VolunteerApplication {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  skills: string[];
  availability: string;
  motivation: string;
  resumeUrl?: string;
  status: 'new' | 'reviewed' | 'accepted' | 'rejected';
  createdAt?: unknown;
}

export interface JobOpening {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Volunteer' | 'Internship';
  summary: string;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  postedAt?: string;
  status: 'open' | 'closed';
}

export interface JobApplication {
  id?: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  coverMessage: string;
  resumeUrl?: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  createdAt?: unknown;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt?: unknown;
}
