// Static fallback content — renders instantly on first paint and during SSR.
// Once Firestore is configured with real data, the relevant services will
// merge/override these seeds with live collection data in the browser.
import {
  BlogPost,
  CoreValue,
  CourseItem,
  EventItem,
  GalleryItem,
  ProgramItem,
  StatItem,
  TestimonialItem,
  TimelineItem,
} from '../models/content.models';

export const SEED_STATS: StatItem[] = [
  { id: 'families', value: 1000, suffix: '+', label: 'Families Helped', icon: 'pi pi-home' },
  { id: 'medical', value: 500, suffix: '+', label: 'Medical Cases', icon: 'pi pi-heart-fill' },
  { id: 'children', value: 250, suffix: '+', label: 'Children Educated', icon: 'pi pi-graduation-cap' },
  { id: 'food', value: 150, suffix: '+', label: 'Food Distributions', icon: 'pi pi-shopping-bag' },
];

export const SEED_PROGRAMS: ProgramItem[] = [
  {
    id: 'food-support',
    slug: 'food-support',
    title: 'Food & Ration Support',
    summary: 'Monthly ration bags delivered to families facing food insecurity.',
    description:
      'We provide monthly ration packages — flour, rice, pulses, oil and essentials — to families who cannot meet their basic nutritional needs, with priority given to widows, orphans and the elderly.',
    image: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1200&q=80',
    icon: 'pi pi-shopping-bag',
    impactLabel: 'Ration bags distributed',
    impactValue: 4200,
    progressPercent: 82,
  },
  {
    id: 'medical-help',
    slug: 'medical-help',
    title: 'Medical Assistance',
    summary: 'Free medical camps, medicines and emergency treatment support.',
    description:
      'Our medical program funds consultations, medicines, diagnostic tests and emergency surgeries for patients who cannot afford treatment, alongside free health camps in underserved communities.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    icon: 'pi pi-heart-fill',
    impactLabel: 'Patients treated',
    impactValue: 1850,
    progressPercent: 68,
  },
  {
    id: 'education-support',
    slug: 'education-support',
    title: 'Education Support',
    summary: 'School fees, books and uniforms for underprivileged children.',
    description:
      'We sponsor school fees, books, uniforms and tuition support for children from low-income households, helping them stay in school and build a path out of poverty.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    icon: 'pi pi-graduation-cap',
    impactLabel: 'Children sponsored',
    impactValue: 620,
    progressPercent: 74,
  },
  {
    id: 'orphan-care',
    slug: 'orphan-care',
    title: 'Orphan Care',
    summary: 'Holistic care, education and emotional support for orphans.',
    description:
      'Beyond financial aid, our orphan care program provides mentorship, education, healthcare and a support network so every child grows up feeling valued and hopeful.',
    image: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=1200&q=80',
    icon: 'pi pi-users',
    impactLabel: 'Orphans supported',
    impactValue: 310,
    progressPercent: 60,
  },
  {
    id: 'emergency-relief',
    slug: 'emergency-relief',
    title: 'Emergency Relief',
    summary: 'Rapid response support during floods, disasters and crises.',
    description:
      'When disaster strikes, we mobilize emergency food, shelter, clean water and medical aid within hours, reaching the most vulnerable families first.',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80',
    icon: 'pi pi-bolt',
    impactLabel: 'Emergency responses',
    impactValue: 95,
    progressPercent: 55,
  },
  {
    id: 'women-empowerment',
    slug: 'women-empowerment',
    title: 'Women Empowerment',
    summary: 'Skills training and micro-grants to help women become self-reliant.',
    description:
      'We equip women with vocational training, small business grants and mentorship, enabling them to build sustainable livelihoods and lift their families out of poverty.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80',
    icon: 'pi pi-star-fill',
    impactLabel: 'Women trained',
    impactValue: 275,
    progressPercent: 48,
  },
];

export const SEED_COURSES: CourseItem[] = [
  {
    id: 'basic-computer-literacy',
    slug: 'basic-computer-literacy',
    title: 'Basic Computer Literacy',
    summary: 'Foundational computer and internet skills for beginners.',
    description:
      'This course covers essential computer skills — typing, using the internet, email and common office applications — to help students and job seekers build confidence with everyday technology.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    icon: 'pi pi-desktop',
    instructor: 'Ayesha Khan',
    duration: '6 weeks',
    level: 'Beginner',
    seatsAvailable: 25,
  },
  {
    id: 'tailoring-fashion-design',
    slug: 'tailoring-fashion-design',
    title: 'Tailoring & Fashion Design',
    summary: 'Hands-on stitching and design skills for a sustainable livelihood.',
    description:
      'Students learn pattern-making, cutting and stitching techniques, preparing them to start their own tailoring business or find employment in the garment industry.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80',
    icon: 'pi pi-palette',
    instructor: 'Sadia Malik',
    duration: '10 weeks',
    level: 'Beginner',
    seatsAvailable: 20,
  },
  {
    id: 'spoken-english',
    slug: 'spoken-english',
    title: 'Spoken English',
    summary: 'Practical English speaking and communication skills.',
    description:
      'A conversation-focused English course designed to build fluency and confidence for the workplace, higher education and everyday communication.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    icon: 'pi pi-comments',
    instructor: 'Bilal Ahmed',
    duration: '8 weeks',
    level: 'Beginner',
    seatsAvailable: 30,
  },
];

export const SEED_TIMELINE: TimelineItem[] = [
  { year: '2015', title: 'The Beginning', description: 'Fatima Hope Foundation was founded with a single food drive for 30 families in a Karachi neighborhood.' },
  { year: '2017', title: 'Medical Camps Launched', description: 'Our first free medical camp treated over 400 patients in a single weekend.' },
  { year: '2019', title: 'Education Program', description: 'Launched school-fee sponsorships for underprivileged children across three cities.' },
  { year: '2021', title: 'Emergency Relief Network', description: 'Built a rapid-response network to support flood and disaster-affected families nationwide.' },
  { year: '2023', title: 'Orphan Care Expansion', description: 'Opened dedicated orphan care support reaching over 300 children.' },
  { year: '2026', title: 'Digital Transformation', description: 'Launched a fully transparent online donation platform to reach donors worldwide.' },
];

export const SEED_VALUES: CoreValue[] = [
  { title: 'Compassion', description: 'We lead every decision with empathy for the families we serve.', icon: 'pi pi-heart' },
  { title: 'Transparency', description: 'Every rupee is tracked and reported — donors deserve full visibility.', icon: 'pi pi-eye' },
  { title: 'Dignity', description: 'We serve in a way that preserves the dignity of every person we help.', icon: 'pi pi-shield' },
  { title: 'Community', description: 'Lasting change happens when communities are empowered, not just given aid.', icon: 'pi pi-users' },
];

export const SEED_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Rukhsana Bibi',
    role: 'Ration Support Recipient',
    quote: 'When my husband lost his job, Fatima Hope Foundation made sure my children never slept hungry. I am forever grateful.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Ahmed Raza',
    role: 'Medical Assistance Recipient',
    quote: 'The foundation covered my father\'s surgery when we had nowhere else to turn. They gave us our family back.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Ayesha Khan',
    role: 'Volunteer',
    quote: 'Volunteering here changed how I see giving back — every distribution is organized with so much care and respect.',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80',
    rating: 5,
  },
];

export const SEED_GALLERY: GalleryItem[] = [
  { id: 'g1', type: 'photo', category: 'Food Distribution', title: 'Ration distribution drive', src: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=400&q=80' },
  { id: 'g2', type: 'photo', category: 'Medical Camps', title: 'Free medical camp checkup', src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=400&q=80' },
  { id: 'g3', type: 'photo', category: 'Education', title: 'Classroom sponsorship visit', src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80' },
  { id: 'g4', type: 'photo', category: 'Volunteers', title: 'Volunteer packing day', src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=400&q=80' },
  { id: 'g5', type: 'photo', category: 'Orphan Care', title: 'Orphan care center activities', src: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=400&q=80' },
  { id: 'g6', type: 'photo', category: 'Emergency Relief', title: 'Flood relief response', src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=400&q=80' },
];

export const SEED_EVENTS: EventItem[] = [
  {
    id: 'e1',
    title: 'Winter Ration Drive 2026',
    description: 'A city-wide ration distribution reaching 500 families ahead of winter.',
    date: '2026-09-20',
    location: 'Karachi, Pakistan',
    image: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1200&q=80',
    status: 'upcoming',
  },
  {
    id: 'e2',
    title: 'Free Medical Camp — Lyari',
    description: 'Free consultations, medicines and diagnostic tests for the Lyari community.',
    date: '2026-10-05',
    location: 'Lyari, Karachi',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    status: 'upcoming',
  },
  {
    id: 'e3',
    title: 'Back-to-School Drive 2026',
    description: 'Distributed books, uniforms and bags to 300 sponsored students.',
    date: '2026-03-01',
    location: 'Multiple Cities',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    status: 'past',
  },
];

export const SEED_BLOG: BlogPost[] = [
  {
    id: 'b1',
    slug: 'why-transparency-matters-in-charity',
    title: 'Why Transparency Matters in Charity',
    excerpt: 'How we track every donation from your card to a family\'s doorstep.',
    content: 'Full article content goes here...',
    category: 'Transparency',
    image: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1200&q=80',
    author: 'Fatima Hope Foundation',
    publishedAt: '2026-06-10',
  },
  {
    id: 'b2',
    slug: 'inside-a-medical-camp',
    title: 'Inside a Free Medical Camp',
    excerpt: 'A behind-the-scenes look at how our medical camps are organized.',
    content: 'Full article content goes here...',
    category: 'Medical',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    author: 'Fatima Hope Foundation',
    publishedAt: '2026-05-22',
  },
];
