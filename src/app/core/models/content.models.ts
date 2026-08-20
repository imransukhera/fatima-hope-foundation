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
