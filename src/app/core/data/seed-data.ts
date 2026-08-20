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
  { 
    id: 'families', 
    value: 1000, 
    suffix: '+', 
    label: 'Underprivileged Families Helped', 
    icon: 'pi pi-home' 
  },
  { 
    id: 'medical', 
    value: 500, 
    suffix: '+', 
    label: 'Medical Aid Cases Supported', 
    icon: 'pi pi-heart-fill' 
  },
  { 
    id: 'children', 
    value: 250, 
    suffix: '+', 
    label: 'Children Provided Education', 
    icon: 'pi pi-graduation-cap' 
  },
  { 
    id: 'food', 
    value: 150, 
    suffix: '+', 
    label: 'Food & Ration Distributions', 
    icon: 'pi pi-shopping-bag' 
  },
];

export const SEED_PROGRAMS: ProgramItem[] = [
  {
    id: 'food-support',
    slug: 'food-support',
    title: 'Food & Ration Assistance Program',
    summary: 'Fighting hunger and restoring dignity by delivering essential monthly food ration packages to vulnerable families across Pakistan.',
    description:
      'We provide essential monthly ration packages — flour, rice, pulses, and oil — to families unable to afford basic nutrition, prioritizing widows, orphans, and the elderly.',
    image: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1200&q=80',
    altText: 'Volunteers preparing monthly ration bags and emergency food relief for needy families',
    ctaText: 'Explore Food Support',
    icon: 'pi pi-shopping-bag',
    impactLabel: 'Ration bags distributed',
    impactValue: 4200,
    progressPercent: 82,
    packageTitle: "What's Inside Our Monthly Food Ration Pack?",
    packageIntro:
      'Every Fatima Hope Foundation food ration pack is carefully assembled with nutrition, quality, and dignity in mind. To ensure families receive balanced nourishment, each standardized monthly food package includes:',
    packageContents: [
      'Staple Grains & Flour: High-quality wheat flour (atta) and fine rice for daily meals.',
      'Cooking Essentials: Fortified cooking oil/banaspati ghee, salt, and essential cooking spices.',
      'Proteins & Pulses: Chickpeas (chana), lentils (daal), and sugar.',
      'Household Essentials: Vital tea and hygiene supplies (soap and dishwashing bars).',
    ],
    packageOutro:
      'All items are securely packed into heavy-duty ration sacks and labeled boxes to guarantee safe delivery directly to families in need.',
    gallery: [
      {
        src: '/images/fatima-hope-food-ration-pack-contents.jpg',
        alt: 'Essential food ration contents including rice, flour, pulses, oil, tea, and hygiene items provided by Fatima Hope Foundation.',
      },
      {
        src: '/images/monthly-food-ration-bag-distribution.jpg',
        alt: 'Heavy-duty sealed food ration bag prepared for delivery to underprivileged families.',
      },
      {
        src: '/images/monthly-food-ration-bag-distribution-2.jpg',
        alt: 'Heavy-duty sealed food ration bag prepared for delivery to underprivileged families.',
      },
      {
        src: '/images/fatima-hope-food-ration-pack-contents-2.jpg',
        alt: 'Essential food ration contents including rice, flour, pulses, oil, tea, and hygiene items provided by Fatima Hope Foundation.',
      },
      {
        src: '/images/fatima-hope-foundation-ration-boxes.jpg',
        alt: 'Sealed and labeled food ration donation boxes prepared by Fatima Hope Foundation for relief distribution.',
      },
      {
        src: '/images/fatima-hope-foundation-ration-boxes-2.jpg',
        alt: 'Sealed and labeled food ration donation boxes prepared by Fatima Hope Foundation for relief distribution.',
      },
      {
        src: '/images/fatima-hope-foundation-ration-boxes-3.jpg',
        alt: 'Sealed and labeled food ration donation boxes prepared by Fatima Hope Foundation for relief distribution.',
      },
    ],
  },
  {
    id: 'medical-help',
    slug: 'medical-help',
    title: 'Medical Relief & Emergency Healthcare Assistance',
    summary:
      'Providing free medical camps, essential prescription drugs, and emergency surgery funding to save lives in vulnerable communities.',
    description:
      'Access to proper medical care should never depend on financial standing. The Fatima Hope Foundation works to eliminate healthcare disparities by offering immediate financial assistance and healthcare services to marginalized individuals facing severe health crises. Through continuous community support, our healthcare initiative bridges the gap between impoverished families and critical medical care.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    altText: 'Medical professionals providing free healthcare services and emergency treatment to patients',
    ctaText: 'Explore Medical Relief',
    icon: 'pi pi-heart-fill',
    impactLabel: 'Patients treated',
    impactValue: 1850,
    progressPercent: 68,
    packageTitle: 'Key Services Provided',
    packageContents: [
      'Free Medical Camps: Regular local clinics offering free consultations, vital checks, and general health screenings.',
      'Essential Medications: Providing necessary prescription drugs to chronic patients and low-income families.',
      'Diagnostic & Lab Support: Covering costs for critical diagnostic tests, X-rays, and lab work.',
      'Emergency Surgery Support: Direct financial grants for life-saving surgeries and emergency treatments.',
    ],
  },
  {
    id: 'education-support',
    slug: 'education-support',
    title: 'Child Education Sponsorship & Literacy Support',
    summary:
      'Empowering underprivileged children with quality education, school supplies, and tuition sponsorship to build a brighter future.',
    description:
      "Education is the most powerful tool to lift families out of generational poverty. Unfortunately, thousands of bright young minds drop out of school each year due to their family's inability to cover basic educational expenses. Through the Fatima Hope Foundation Child Education Program, we eliminate these financial barriers. By sponsoring tuition fees, books, and uniforms, we ensure vulnerable children remain enrolled in school and gain the skills needed for a self-sufficient future.",
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    altText: 'Underprivileged children receiving books, school uniforms, and educational supplies',
    ctaText: 'Explore Education Programs',
    icon: 'pi pi-graduation-cap',
    impactLabel: 'Children sponsored',
    impactValue: 620,
    progressPercent: 74,
    packageTitle: 'What Our Sponsorship Covers',
    packageContents: [
      'School Fee Coverage: Direct payment of monthly tuition and admission fees to partner schools.',
      'Books & Stationery Kits: Providing complete course books, notebooks, and learning materials at the start of each academic year.',
      'Uniforms & Footwear: Ensuring students have proper school uniforms and shoes to attend classes with confidence and dignity.',
      'After-School Support: Offering supplemental tutoring and mentorship for students needing academic assistance.',
    ],
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
  {
    id: 'build-ai-chatbot-with-angular',
    slug: 'build-ai-chatbot-with-angular',
    title: 'Build an AI Chatbot With Angular — Complete Beginner Course',
    summary: 'Build a modern AI chatbot UI in Angular, from mock responses to a deployed app.',
    description:
      'Learn how to build an AI chatbot with Angular step by step. Create a modern chat UI, mock AI responses, loading states, error handling, chat history, and deploy your Angular chatbot.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    icon: 'pi pi-code',
    instructor: 'Hamza Sheikh',
    duration: '4 weeks',
    level: 'Beginner',
    seatsAvailable: 30,
  },
];



export const SEED_TIMELINE: TimelineItem[] = [
  { 
    year: '2026', 
    title: 'Foundation Established', 
    description: 'Fatima Hope Foundation was officially founded in Marot, Tehsil Fort Abbas, to address urgent food security and medical needs in Southern Punjab.' 
  },
  { 
    year: '2026', 
    title: 'First Ration Distribution Drive', 
    description: 'Launched our initial food pack drive, delivering essential monthly rations directly to vulnerable families across Fort Abbas and nearby villages.' 
  },
  { 
    year: '2026', 
    title: 'Public Launch & Digital Platform', 
    description: 'Opened our portal to the public and international donors, establishing transparent donation channels for medical aid, education, and orphan support.' 
  },
  { 
    year: 'Future', 
    title: 'Expanding Community Reach', 
    description: 'Working toward establishing regular free medical camps, school fee sponsorships, and sustainable welfare programs across Bahawalnagar District.' 
  },
];

export const SEED_VALUES: CoreValue[] = [
  { 
    title: 'Compassion First', 
    description: 'We approach every family in Marot and Fort Abbas with genuine empathy, treating their hardships as our own.', 
    icon: 'pi pi-heart' 
  },
  { 
    title: 'Complete Transparency', 
    description: 'Every rupee donated toward food rations, medical aid, and education is tracked and accountably delivered.', 
    icon: 'pi pi-eye' 
  },
  { 
    title: 'Preserving Dignity', 
    description: 'We distribute monthly rations and humanitarian relief in a manner that respects the honor and self-worth of every beneficiary.', 
    icon: 'pi pi-shield' 
  },
  { 
    title: 'Community Empowerment', 
    description: 'We uplift rural communities across Bahawalnagar District through sustainable aid, educational support, and orphan care.', 
    icon: 'pi pi-users' 
  },
];



export const SEED_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Rukhsana Bibi',
    role: 'Ration Pack Recipient',
    location: 'Fort Abbas, Southern Punjab',
    quote: 'In our village near Fort Abbas, seasonal farm work often dries up. Fatima Hope Foundation delivered our monthly food pack right to our home with complete respect and dignity.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Muhammad Ramzan',
    role: 'Medical Aid Beneficiary',
    location: 'Bahawalnagar',
    quote: 'We could not afford my father’s emergency surgical care at the hospital. The team arranged essential medicines and covered treatment costs without making us feel helpless.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Ayesha Khan',
    role: 'Field Volunteer',
    location: 'Bahawalpur & Multan',
    quote: 'Distributing food ration packs in remote border communities showed me how transparent this team is. Every donation directly reaches genuine, deserving families.',
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
