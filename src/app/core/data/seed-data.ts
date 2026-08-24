// Static fallback content — renders instantly on first paint and during SSR.
// Once Firestore is configured with real data, the relevant services will
// merge/override these seeds with live collection data in the browser.
import {
  BlogPost,
  CoreValue,
  CourseItem,
  CourseModule,
  EventItem,
  GalleryItem,
  ProgramItem,
  StatItem,
  TemplateCategory,
  TemplateItem,
  TestimonialItem,
  TimelineItem,
} from '../models/content.models';

const AI_CHATBOT_MODULES: CourseModule[] = [
  {
    id: 'lesson-1',
    title: 'Lesson 1 — What Is an AI Chatbot?',
    summary: 'Understand what a chatbot is, what Angular does (and doesn\'t do), and why we start with a mock AI service.',
    objectives: [
      'What an AI chatbot is',
      'How a chatbot works',
      'What Angular does in an AI chatbot',
      'Difference between frontend and AI model',
      'Why we are starting with a mock AI service',
    ],
    contentHtml: `
      <h4>What Is a Chatbot?</h4>
      <p>A chatbot is software that allows users to communicate with a computer using text or voice. For example:</p>
      <pre><code>User: What is Angular?
AI: Angular is a TypeScript-based framework used to build modern web applications.</code></pre>
      <p>A simple chatbot flow looks like: <strong>User Input → Application → Processing → Response → User Interface.</strong> An AI chatbot adds an AI model to the processing stage.</p>

      <h4>Is Angular the AI?</h4>
      <p>No. Angular is the <strong>frontend framework</strong>. Angular creates the chat screen, input field, send button, messages, loading indicator, and chat history. The AI model generates the actual intelligent response.</p>
      <p>A real application flow: <strong>Angular → Backend → AI Model → Backend → Angular.</strong></p>

      <h4>Why Are We Not Using an API?</h4>
      <p>Connecting a real API immediately can create unnecessary complexity — API keys, HTTP requests, authentication, backend, security, billing. Instead we build: <strong>Angular → Chat Service → Mock AI.</strong> Once you understand this architecture, connecting a real AI backend later becomes much easier.</p>

      <h4>Lesson Exercise</h4>
      <ul>
        <li>What is an AI chatbot?</li>
        <li>What is Angular responsible for?</li>
        <li>Does Angular itself generate AI responses?</li>
        <li>Why are we using a Mock AI Service?</li>
      </ul>
    `,
  },
  {
    id: 'lesson-2',
    title: 'Lesson 2 — Angular Project Setup',
    summary: 'Create the Angular project, generate the chat component and service, and organize the folder structure.',
    objectives: [
      'Create an Angular project',
      'Start the development server',
      'Create a chatbot component',
      'Create a chatbot service',
      'Organize the project',
    ],
    contentHtml: `
      <h4>Step 1 — Create the Project</h4>
      <pre><code>ng new ai-chatbot
cd ai-chatbot
ng serve</code></pre>
      <p>Open <strong>http://localhost:4200</strong> in your browser.</p>

      <h4>Step 2 — Create Chat Component</h4>
      <pre><code>ng generate component components/chat
# or
ng g c components/chat</code></pre>

      <h4>Step 3 — Create Chat Service</h4>
      <pre><code>ng generate service services/chat
# or
ng g s services/chat</code></pre>

      <h4>Recommended Structure</h4>
      <pre><code>src/
└── app/
    ├── components/
    │   └── chat/
    │       ├── chat.component.ts
    │       ├── chat.component.html
    │       └── chat.component.scss
    │
    └── services/
        └── chat.service.ts</code></pre>

      <h4>Lesson Exercise</h4>
      <p>Start the application and confirm it runs successfully at <code>localhost:4200</code>.</p>
    `,
  },
  {
    id: 'lesson-3',
    title: 'Lesson 3 — Build the Chat Interface',
    summary: 'Build the chat header, message list, input field and send button with a typed ChatMessage model.',
    objectives: [
      'Chat header, message area and input field',
      'User vs. AI message styling',
      'The ChatMessage model',
    ],
    contentHtml: `
      <h4>Create the Message Model</h4>
      <pre><code>interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}</code></pre>
      <p>The <code>role</code> tells us who created the message — <code>'user'</code> or <code>'assistant'</code>.</p>

      <h4>Component</h4>
      <pre><code>import { Component } from '@angular/core';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages: ChatMessage[] = [];
  userMessage = '';
}</code></pre>

      <h4>HTML</h4>
      <pre><code>&lt;div class="chat-container"&gt;
  &lt;div class="chat-header"&gt;
    &lt;h2&gt;AI Chatbot&lt;/h2&gt;
    &lt;p&gt;Ask me anything&lt;/p&gt;
  &lt;/div&gt;

  &lt;div class="chat-messages"&gt;
    &lt;div
      *ngFor="let message of messages"
      class="message"
      [class.user-message]="message.role === 'user'"
      [class.ai-message]="message.role === 'assistant'"
    &gt;
      &lt;strong&gt;{{ message.role === 'user' ? 'You' : 'AI' }}&lt;/strong&gt;
      &lt;p&gt;{{ message.content }}&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;div class="chat-input"&gt;
    &lt;input type="text" [(ngModel)]="userMessage" placeholder="Type your message..." /&gt;
    &lt;button&gt;Send&lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

      <h4>Basic Styling</h4>
      <pre><code>.chat-container { width: 100%; max-width: 800px; margin: 40px auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; }
.chat-header { padding: 20px; text-align: center; }
.chat-messages { min-height: 400px; padding: 20px; }
.message { padding: 12px 16px; margin-bottom: 12px; border-radius: 12px; max-width: 75%; }
.user-message { margin-left: auto; }
.ai-message { margin-right: auto; }
.chat-input { display: flex; padding: 15px; gap: 10px; }
.chat-input input { flex: 1; padding: 12px; }</code></pre>

      <p>At this point the Send button doesn't do anything yet — that's expected, we'll wire it up in the next lessons.</p>
    `,
  },
  {
    id: 'lesson-4',
    title: 'Lesson 4 — Create a Mock AI Service',
    summary: 'Build an Angular service with dependency injection that simulates AI responses using RxJS Observables.',
    objectives: [
      'What an Angular service is',
      'How dependency injection works',
      'How to simulate an AI response',
      'How Observables work',
    ],
    contentHtml: `
      <h4>chat.service.ts</h4>
      <pre><code>import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ChatService {

  getAIResponse(message: string): Observable&lt;string&gt; {
    const text = message.toLowerCase();

    let response = 'I am a demo AI assistant. Please ask me about Angular, TypeScript, or AI.';

    if (text.includes('hello') || text.includes('hi')) {
      response = 'Hello! How can I help you today?';
    } else if (text.includes('angular')) {
      response = 'Angular is a TypeScript-based framework used to build modern web applications.';
    } else if (text.includes('typescript')) {
      response = 'TypeScript is a strongly typed programming language built on JavaScript.';
    } else if (text.includes('ai')) {
      response = 'AI stands for Artificial Intelligence. It enables computers to perform tasks that normally require human intelligence.';
    } else if (text.includes('help')) {
      response = 'Sure! Ask me a question about Angular, TypeScript, or AI.';
    }

    return of(response).pipe(delay(1000));
  }
}</code></pre>

      <h4>How It Works</h4>
      <p>If the user types <strong>Hello</strong>, the service returns <em>"Hello! How can I help you today?"</em>. If the user types <strong>What is Angular?</strong>, it returns the Angular explanation. The one-second delay simulates an AI server responding.</p>
    `,
  },
  {
    id: 'lesson-5',
    title: 'Lesson 5 — Send User Messages',
    summary: 'Capture and validate input, push messages into the array, and call the chat service from the component.',
    objectives: [
      'How to capture input',
      'How to validate input',
      'How to add messages to an array',
      'How to call an Angular service',
    ],
    contentHtml: `
      <h4>Import and Inject the Service</h4>
      <pre><code>import { ChatService } from '../../services/chat.service';

constructor(private chatService: ChatService) {}</code></pre>

      <h4>Create sendMessage()</h4>
      <pre><code>sendMessage(): void {
  if (!this.userMessage.trim()) {
    return;
  }

  const message = this.userMessage.trim();

  this.messages.push({
    role: 'user',
    content: message,
    timestamp: new Date()
  });

  this.userMessage = '';

  this.chatService.getAIResponse(message).subscribe(response =&gt; {
    this.messages.push({
      role: 'assistant',
      content: response,
      timestamp: new Date()
    });
  });
}</code></pre>

      <h4>Connect the Button</h4>
      <pre><code>&lt;button (click)="sendMessage()"&gt;Send&lt;/button&gt;</code></pre>

      <p>The complete flow now works: <strong>User types message → Click Send → sendMessage() → User message added → ChatService called → AI response returned → AI message displayed.</strong></p>
    `,
  },
  {
    id: 'lesson-6',
    title: 'Lesson 6 — Display AI Responses',
    summary: 'Render the messages array in the template and style user vs. AI bubbles.',
    objectives: [
      'How *ngFor renders the messages array',
      'Styling user vs. AI message bubbles',
    ],
    contentHtml: `
      <p>Messages are stored in <code>messages: ChatMessage[] = []</code> and rendered with <code>*ngFor="let message of messages"</code>. For example, given:</p>
      <pre><code>[
  { role: 'user', content: 'What is Angular?', timestamp: new Date() },
  { role: 'assistant', content: 'Angular is a web framework.', timestamp: new Date() }
]</code></pre>
      <p>Angular displays each message as a "You" or "AI" bubble in order.</p>

      <h4>User and AI Styling</h4>
      <pre><code>.message { padding: 12px 16px; margin-bottom: 12px; border-radius: 12px; max-width: 75%; }
.user-message { margin-left: auto; background: #2563eb; color: white; }
.ai-message { margin-right: auto; background: #f1f5f9; color: #111827; }</code></pre>
    `,
  },
  {
    id: 'lesson-7',
    title: 'Lesson 7 — Add Loading States',
    summary: 'Add an isLoading flag so users get immediate feedback while the AI "thinks".',
    objectives: [
      'Why loading feedback matters',
      'Tracking an isLoading flag',
      'Showing a "thinking" indicator',
    ],
    contentHtml: `
      <p>AI responses take time. Without a loading state, users may wonder if the chatbot received their message. We solve this with an <code>isLoading</code> flag.</p>

      <h4>Updated sendMessage()</h4>
      <pre><code>sendMessage(): void {
  if (!this.userMessage.trim() || this.isLoading) {
    return;
  }

  const message = this.userMessage.trim();

  this.messages.push({ role: 'user', content: message, timestamp: new Date() });
  this.userMessage = '';
  this.isLoading = true;

  this.chatService.getAIResponse(message).subscribe({
    next: (response) =&gt; {
      this.messages.push({ role: 'assistant', content: response, timestamp: new Date() });
      this.isLoading = false;
    },
    error: () =&gt; {
      this.isLoading = false;
    }
  });
}</code></pre>

      <h4>Display Loading</h4>
      <pre><code>&lt;div *ngIf="isLoading" class="message ai-message"&gt;
  AI is thinking...
&lt;/div&gt;</code></pre>
    `,
  },
  {
    id: 'lesson-8',
    title: 'Lesson 8 — Error Handling',
    summary: 'Handle failures gracefully with the RxJS error callback and a friendly fallback message.',
    objectives: [
      'Why production apps need error handling',
      'Using the RxJS subscribe error callback',
      'Showing a friendly fallback message',
    ],
    contentHtml: `
      <p>A production application should never assume everything will work — network errors, server errors, invalid responses, API errors, and authentication errors can all happen. Even though our current service is local, we implement error handling now:</p>
      <pre><code>this.chatService.getAIResponse(message).subscribe({
  next: (response) =&gt; {
    this.messages.push({ role: 'assistant', content: response, timestamp: new Date() });
    this.isLoading = false;
  },
  error: () =&gt; {
    this.messages.push({
      role: 'assistant',
      content: 'Sorry, something went wrong. Please try again.',
      timestamp: new Date()
    });
    this.isLoading = false;
  }
});</code></pre>
      <p>This gives the user a friendly fallback message instead of a silent failure.</p>
    `,
  },
  {
    id: 'lesson-9',
    title: 'Lesson 9 — Chat History',
    summary: 'Persist conversations across refreshes using browser localStorage, plus a "New Chat" reset.',
    objectives: [
      'Saving messages to localStorage',
      'Loading messages on ngOnInit',
      'Resetting the conversation with New Chat',
    ],
    contentHtml: `
      <h4>The Problem</h4>
      <p>Refresh the browser and your conversation disappears. We solve this using browser <code>localStorage</code>.</p>

      <h4>Save Messages</h4>
      <pre><code>saveMessages(): void {
  localStorage.setItem('chat_messages', JSON.stringify(this.messages));
}</code></pre>
      <p>Call it whenever the conversation changes.</p>

      <h4>Load Messages</h4>
      <pre><code>loadMessages(): void {
  const savedMessages = localStorage.getItem('chat_messages');
  if (savedMessages) {
    this.messages = JSON.parse(savedMessages);
  }
}

ngOnInit(): void {
  this.loadMessages();
}</code></pre>

      <h4>New Chat</h4>
      <pre><code>&lt;button (click)="newChat()"&gt;New Chat&lt;/button&gt;</code></pre>
      <pre><code>newChat(): void {
  this.messages = [];
  localStorage.removeItem('chat_messages');
}</code></pre>
      <p>Now the chatbot supports: <strong>Previous conversation → Browser refresh → Conversation restored.</strong></p>
    `,
  },
  {
    id: 'lesson-10',
    title: 'Lesson 10 — Deploy the Angular Chatbot',
    summary: 'Build for production, deploy it, and learn the golden rule for handling real AI API keys securely.',
    objectives: [
      'Creating a production build',
      'Deployment options',
      'Why secret API keys never belong in Angular',
    ],
    contentHtml: `
      <h4>Create Production Build</h4>
      <pre><code>ng build</code></pre>
      <p>Angular generates production files inside <code>dist/</code>, ready to deploy.</p>

      <h4>Deployment Options</h4>
      <ul>
        <li>Firebase Hosting</li>
        <li>Netlify</li>
        <li>Vercel</li>
        <li>GitHub Pages</li>
        <li>Your own web server</li>
      </ul>

      <h4>Important Security Lesson</h4>
      <p>When you eventually connect a real AI API, <strong>never</strong> put secret API keys directly into Angular:</p>
      <pre><code>const API_KEY = 'YOUR_SECRET_API_KEY'; // Never do this</code></pre>
      <p>Angular runs in the user's browser, so frontend JavaScript can always be inspected. Instead, route requests through your own backend: <strong>Angular → Your Backend → AI Provider → Your Backend → Angular.</strong> The backend should securely manage the AI API credentials.</p>

      <h4>Final Project</h4>
      <p>Your finished application now supports: user messages, AI responses, mock AI logic, a polished chat UI, loading state, error handling, chat history, New Chat, a responsive interface, and a production build. Congratulations — you've completed <strong>Build an AI Chatbot With Angular</strong>!</p>
    `,
  },
];

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
    modules: AI_CHATBOT_MODULES,
    seoTitle: 'Build an AI Chatbot With Angular | Complete Step-by-Step Course',
    metaDescription:
      'Learn how to build an AI chatbot with Angular step by step. Create a modern chat UI, mock AI responses, loading states, error handling, chat history, and deploy your Angular chatbot.',
    socialTitle: 'Build Your First AI Chatbot With Angular 🚀',
    socialDescription:
      'Learn how to build an AI chatbot with Angular from scratch. Create a modern chat interface, mock AI responses, loading states, error handling, chat history, and a deployment-ready Angular application.',
    altText: 'Build an AI Chatbot With Angular course — step-by-step Angular AI chatbot project',
    keywords: [
      'build AI chatbot with Angular',
      'Angular AI chatbot tutorial',
      'Angular chatbot tutorial',
      'build chatbot in Angular',
      'AI chatbot Angular project',
      'Angular chatbot project',
      'Angular TypeScript chatbot',
      'Angular AI project for beginners',
      'Angular chatbot step by step',
      'create AI chatbot with Angular',
      'Angular chatbot UI',
      'Angular chatbot course',
      'learn Angular AI development',
    ],
    faqs: [
      {
        question: 'Can I build an AI chatbot with Angular?',
        answer:
          'Yes. Angular is well suited for building the frontend of an AI chatbot, including the chat interface, messages, loading states, error handling, and conversation history.',
      },
      {
        question: 'Do I need an AI API?',
        answer:
          'No. This beginner course uses a local Mock AI Service. A real AI API can be added later.',
      },
      {
        question: 'Is this Angular chatbot tutorial beginner-friendly?',
        answer:
          'Yes. The course starts with basic concepts and gradually builds the chatbot feature by feature.',
      },
      {
        question: 'Can I connect OpenAI later?',
        answer:
          'Yes. You can replace the Mock AI Service with a secure backend that communicates with an AI provider.',
      },
      {
        question: 'Can I connect Google Gemini later?',
        answer:
          'Yes. The same Angular frontend architecture can be used with a backend connected to Gemini.',
      },
      {
        question: 'What will I build?',
        answer:
          'You will build a complete Angular chatbot project with a modern chat interface, simulated AI responses, loading states, error handling, chat history, and deployment preparation.',
      },
    ],
  },
];



export const SEED_TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    slug: 'login-pages',
    title: 'Login Page Designs',
    description: '10 distinct HTML & CSS login page styles — minimal, glass, dark neon, brutalist and more.',
    icon: 'pi pi-sign-in',
    swatch: 'linear-gradient(135deg, #0F6A44, #15925E)',
    status: 'available',
  },
  {
    slug: 'dashboards',
    title: 'Dashboards',
    description: 'Admin & analytics dashboard layouts — coming in a future update.',
    icon: 'pi pi-chart-bar',
    swatch: 'linear-gradient(135deg, #6B7280, #9CA3AF)',
    status: 'coming-soon',
  },
];

export const SEED_TEMPLATES: TemplateItem[] = [
  {
    id: 'login-minimal-clean',
    slug: 'minimal-clean',
    title: 'Minimal Clean',
    categorySlug: 'login-pages',
    category: 'Login Page',
    summary: 'A simple centered card with a neutral palette and subtle shadow.',
    description:
      'A clean, distraction-free login screen: a centered white card, thin borders, a single accent button and clear typographic hierarchy. Works well for admin panels, dashboards, and any product that wants to stay out of the way of the task at hand.',
    swatch: 'linear-gradient(135deg, #111827, #374151)',
    icon: 'pi pi-user',
    previewUrl: '/templates/login-pages/01-minimal-clean/index.html',
    tags: ['Minimal', 'Neutral', 'Light'],
  },
  {
    id: 'login-glassmorphism',
    slug: 'glassmorphism',
    title: 'Glassmorphism',
    categorySlug: 'login-pages',
    category: 'Login Page',
    summary: 'A frosted-glass card floating over a vivid gradient backdrop.',
    description:
      'Uses backdrop-filter blur on a semi-transparent card over a purple-to-coral gradient, with soft floating blob shapes behind it. A modern, premium look suited to consumer apps and SaaS marketing sites.',
    swatch: 'linear-gradient(135deg, #6a5cff, #b06ab3, #ff8f8f)',
    icon: 'pi pi-sparkles',
    previewUrl: '/templates/login-pages/02-glassmorphism/index.html',
    tags: ['Glass', 'Gradient', 'Modern'],
  },
  {
    id: 'login-neumorphism',
    slug: 'neumorphism',
    title: 'Neumorphism',
    categorySlug: 'login-pages',
    category: 'Login Page',
    summary: 'Soft, embossed "soft UI" controls using dual-tone shadows.',
    description:
      'A monochrome soft-UI style where every input and button appears pressed into or raised out of the background using paired light/dark box-shadows. Distinctive and tactile, best used sparingly for accessibility.',
    swatch: 'linear-gradient(135deg, #e6e9ef, #c9d0dc)',
    icon: 'pi pi-circle',
    previewUrl: '/templates/login-pages/03-neumorphism/index.html',
    tags: ['Soft UI', 'Monochrome'],
  },
  {
    id: 'login-dark-neon',
    slug: 'dark-neon',
    title: 'Dark Neon',
    categorySlug: 'login-pages',
    category: 'Login Page',
    summary: 'A dark glass card with violet-to-cyan neon glow accents.',
    description:
      'Deep near-black background with blurred violet and cyan glow blobs, a frosted dark card, and a neon gradient button. Suited to developer tools, gaming, and tech-forward products.',
    swatch: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
    icon: 'pi pi-bolt',
    previewUrl: '/templates/login-pages/04-dark-neon/index.html',
    tags: ['Dark Mode', 'Neon', 'Gradient'],
  },
  {
    id: 'login-split-screen',
    slug: 'split-screen',
    title: 'Split Screen',
    categorySlug: 'login-pages',
    category: 'Login Page',
    summary: 'A full-height brand panel beside a plain white sign-in form.',
    description:
      'The left half is a gradient brand panel with a headline and decorative shapes; the right half is a plain white form panel. Reads as more premium and marketing-forward than a single centered card, and stacks to one column on mobile.',
    swatch: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    icon: 'pi pi-table',
    previewUrl: '/templates/login-pages/05-split-screen/index.html',
    tags: ['Two-column', 'Marketing', 'Responsive'],
  },
  {
    id: 'login-material',
    slug: 'material-design',
    title: 'Material Design',
    categorySlug: 'login-pages',
    category: 'Login Page',
    summary: 'Google Material-inspired elevation, filled inputs and floating labels.',
    description:
      'Follows Material Design conventions: elevated white card, filled inputs with animated floating labels, an uppercase filled button, and Roboto-style type. Familiar to Android and Google-ecosystem users.',
    swatch: '#1a73e8',
    icon: 'pi pi-android',
    previewUrl: '/templates/login-pages/06-material/index.html',
    tags: ['Material', 'Google', 'Familiar'],
  },
  {
    id: 'login-brutalist',
    slug: 'brutalist-retro',
    title: 'Brutalist / Retro',
    categorySlug: 'login-pages',
    category: 'Login Page',
    summary: 'Thick black borders, offset drop shadows and monospace type.',
    description:
      'A bold, unapologetic style: thick black borders, hard offset shadows, a bright yellow backdrop and monospace type. Great for portfolios, indie tools, and anything that wants to stand out from typical SaaS design.',
    swatch: '#ffde59',
    icon: 'pi pi-stop',
    previewUrl: '/templates/login-pages/07-brutalist/index.html',
    tags: ['Brutalist', 'Retro', 'Bold'],
  },
  {
    id: 'login-foundation-brand',
    slug: 'foundation-brand',
    title: 'Foundation Brand',
    categorySlug: 'login-pages',
    category: 'Login Page',
    summary: "Uses the site's own green-and-gold palette for a consistent, on-brand feel.",
    description:
      'Built directly from the Fatima Hope Foundation design tokens (--color-primary green and --color-secondary gold), this style matches the rest of the site exactly and is the natural default if a real login page is ever added to the app.',
    swatch: 'linear-gradient(135deg, #0F6A44, #D4AF37)',
    icon: 'pi pi-heart-fill',
    previewUrl: '/templates/login-pages/08-foundation-brand/index.html',
    tags: ['On-brand', 'Green', 'Gold'],
  },
  {
    id: 'login-animated-gradient',
    slug: 'animated-gradient',
    title: 'Animated Gradient',
    categorySlug: 'login-pages',
    category: 'Login Page',
    summary: 'A slow, continuously shifting full-page gradient with a floating card.',
    description:
      'A CSS keyframe animation slowly cycles the background through warm-to-cool tones, while the glass card gently floats up and down. Eye-catching for a landing/marketing-style sign-in without needing any JavaScript.',
    swatch: 'linear-gradient(135deg, #ff5f6d, #ffc371, #24c6dc, #514a9d)',
    icon: 'pi pi-sun',
    previewUrl: '/templates/login-pages/09-animated-gradient/index.html',
    tags: ['Animated', 'Gradient', 'CSS-only'],
  },
  {
    id: 'login-pastel-illustration',
    slug: 'pastel-illustration',
    title: 'Pastel Illustration',
    categorySlug: 'login-pages',
    category: 'Login Page',
    summary: 'Friendly pastel blob shapes behind a rounded, playful card.',
    description:
      'Soft pastel pink, mint and peach blobs sit behind a large rounded white card with playful copy and an emoji-driven submit button. A friendly, approachable tone suited to community, education or wellness products.',
    swatch: 'linear-gradient(135deg, #ffd6e8, #c9f0e0, #ffe9b3)',
    icon: 'pi pi-heart',
    previewUrl: '/templates/login-pages/10-pastel-illustration/index.html',
    tags: ['Pastel', 'Playful', 'Rounded'],
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
  {
    id: 'g1',
    type: 'photo',
    category: 'Food Distribution',
    title: 'Monthly ration bag distribution in Marot, Tehsil Fort Abbas',
    src: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'g2',
    type: 'photo',
    category: 'Medical Camps',
    title: 'Free healthcare checkup and medicine camp in Bahawalnagar',
    src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'g3',
    type: 'photo',
    category: 'Education',
    title: 'School fee sponsorship and book drive for underprivileged students',
    src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'g4',
    type: 'photo',
    category: 'Volunteers',
    title: 'Fatima Hope Foundation volunteers packing food packages',
    src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'g5',
    type: 'photo',
    category: 'Orphan Care',
    title: 'Orphan family welfare support drive across Southern Punjab',
    src: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'g6',
    type: 'photo',
    category: 'Emergency Relief',
    title: 'Emergency flood and crisis relief response in rural Punjab',
    src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=400&q=80'
  }
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
  {
    id: 'b3',
    slug: 'how-to-build-an-ai-chatbot-with-angular',
    title: 'How to Build an AI Chatbot With Angular: A Step-by-Step Beginner Guide',
    excerpt:
      'A complete beginner walkthrough of the architecture, state management, UI, and services behind building an AI chatbot with Angular — from mock responses to a production-ready security model.',
    category: 'Web Development',
    image: '/images/build-ai-chatbot-with-angular-architecture.png',
    author: 'Fatima Hope Foundation',
    publishedAt: '2026-08-20',
    content: `
      <p>AI-powered applications are transforming web development. From intelligent customer service agents to interactive coding assistants, learning how to build modern conversational interfaces is one of the most valuable skills you can learn as a frontend developer.</p>
      <p>If you are looking to master building an AI chatbot with Angular, this complete step-by-step guide will walk you through the essential architecture, state management, UI construction, and service design needed to get started.</p>

      <h2>What You Will Learn in This Guide</h2>
      <ul>
        <li><strong>Angular Chatbot Architecture:</strong> How the frontend communicates with data services and AI models.</li>
        <li><strong>Component-Driven UI:</strong> Building clean message templates, loading states, and input controls.</li>
        <li><strong>Mock AI Services:</strong> Simulating asynchronous backend responses using RxJS.</li>
        <li><strong>State Persistence:</strong> Saving and restoring chat history using browser localStorage.</li>
        <li><strong>Production Security:</strong> Why frontend AI security requires a backend middleware layer.</li>
      </ul>

      <h2>Course Overview: Build an AI Chatbot With Angular</h2>
      <p>This tutorial is based on our complete 10-lesson hands-on course, <strong>Build an AI Chatbot With Angular</strong>.</p>
      <ul>
        <li><strong>Level:</strong> Beginner to Intermediate</li>
        <li><strong>Technology Stack:</strong> Angular, TypeScript, HTML, SCSS, RxJS, Local Storage</li>
        <li><strong>External API Required?</strong> No (uses a local Mock AI Service)</li>
        <li><strong>Project:</strong> Production-ready Angular Chatbot Application</li>
      </ul>

      <h2>High-Level Application Architecture</h2>
      <p>Before writing code, it is critical to understand the separation of concerns. In a clean Angular application, the user interface should never communicate directly with an external service or perform data manipulation inside component files.</p>
      <img src="/images/build-ai-chatbot-with-angular-architecture.png" alt="Angular AI chatbot architecture diagram: User UI to Chat Component to Chat Service to Mock AI Response" loading="lazy" />
      <ul>
        <li><strong>Chat UI:</strong> Renders messages, user input fields, loading indicators, and action buttons.</li>
        <li><strong>Chat Component:</strong> Coordinates component state (messages, isLoading, userMessage).</li>
        <li><strong>Chat Service:</strong> Encapsulates response logic and manages data flow using RxJS Observables.</li>
        <li><strong>Mock AI Service:</strong> Simulates server latency and returns contextual responses.</li>
      </ul>

      <h2>Step 1: Angular Project Setup</h2>
      <p>To get started, create a clean Angular project using the Angular CLI and generate the required component and service files:</p>
      <pre><code># 1. Create a new Angular workspace
ng new ai-chatbot --style=scss --routing=false

# 2. Navigate into the project directory
cd ai-chatbot

# 3. Generate the Chat Component
ng generate component components/chat

# 4. Generate the Chat Service
ng generate service services/chat

# 5. Start the local development server
ng serve</code></pre>

      <h2>Step 2: Defining Data Models &amp; Component State</h2>
      <p>Create a typed interface for your chat messages. Defining strict contracts ensures type safety across your component template and service layer.</p>
      <h3>Update chat.component.ts</h3>
      <pre><code>import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  userMessage: string = '';
  isLoading: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadChatHistory();
  }

  sendMessage(): void {
    if (!this.userMessage.trim() || this.isLoading) {
      return;
    }

    const inputPrompt = this.userMessage.trim();

    this.messages.push({
      role: 'user',
      content: inputPrompt,
      timestamp: new Date()
    });

    this.userMessage = '';
    this.isLoading = true;
    this.saveChatHistory();

    this.chatService.getAIResponse(inputPrompt).subscribe({
      next: (response: string) => {
        this.messages.push({
          role: 'assistant',
          content: response,
          timestamp: new Date()
        });
        this.isLoading = false;
        this.saveChatHistory();
      },
      error: () => {
        this.messages.push({
          role: 'assistant',
          content: 'Sorry, an error occurred while processing your request. Please try again.',
          timestamp: new Date()
        });
        this.isLoading = false;
        this.saveChatHistory();
      }
    });
  }

  newChat(): void {
    this.messages = [];
    localStorage.removeItem('angular_ai_chat_history');
  }

  private saveChatHistory(): void {
    localStorage.setItem('angular_ai_chat_history', JSON.stringify(this.messages));
  }

  private loadChatHistory(): void {
    const saved = localStorage.getItem('angular_ai_chat_history');
    if (saved) {
      try {
        this.messages = JSON.parse(saved);
      } catch (e) {
        this.messages = [];
      }
    }
  }
}</code></pre>

      <h2>Step 3: Building the Mock AI Service</h2>
      <p>Using a local mock service allows you to master frontend state management, loading indicators, and error resilience without incurring API costs or setting up complex backend servers.</p>
      <h3>Update chat.service.ts</h3>
      <pre><code>import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  getAIResponse(prompt: string): Observable&lt;string&gt; {
    const query = prompt.toLowerCase();
    let reply = 'I am an AI assistant built with Angular. Ask me about Angular, TypeScript, or Web Development!';

    if (query.includes('hello') || query.includes('hi')) {
      reply = 'Hello! How can I assist your Angular development journey today?';
    } else if (query.includes('angular')) {
      reply = 'Angular is a full-featured, component-based TypeScript framework for building scalable web applications.';
    } else if (query.includes('typescript')) {
      reply = 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at scale.';
    } else if (query.includes('component')) {
      reply = 'Components are the main building block of Angular applications. They consist of an HTML template, TypeScript class, and styles.';
    } else if (query.includes('service') || query.includes('dependency injection')) {
      reply = 'Angular Services manage data operations and business logic, injected into components using Dependency Injection (DI).';
    }

    return of(reply).pipe(delay(1200));
  }
}</code></pre>

      <h2>Step 4: Crafting the Accessible HTML Template</h2>
      <p>Your HTML template must deliver a responsive user experience with visual distinction between user prompts and AI responses.</p>
      <h3>Update chat.component.html</h3>
      <pre><code>&lt;div class="chat-container"&gt;
  &lt;header class="chat-header"&gt;
    &lt;div class="header-info"&gt;
      &lt;h2&gt;Angular AI Assistant&lt;/h2&gt;
      &lt;p&gt;Interactive Angular &amp; TypeScript Companion&lt;/p&gt;
    &lt;/div&gt;
    &lt;button class="btn-secondary" (click)="newChat()" [disabled]="messages.length === 0"&gt;
      New Chat
    &lt;/button&gt;
  &lt;/header&gt;

  &lt;main class="chat-messages" aria-live="polite"&gt;
    &lt;div *ngIf="messages.length === 0" class="empty-state"&gt;
      &lt;p&gt;No messages yet. Ask a question to start chatting!&lt;/p&gt;
    &lt;/div&gt;

    &lt;article
      *ngFor="let msg of messages"
      class="message-bubble"
      [class.user-bubble]="msg.role === 'user'"
      [class.ai-bubble]="msg.role === 'assistant'"
    &gt;
      &lt;div class="message-meta"&gt;
        &lt;strong&gt;{{ msg.role === 'user' ? 'You' : 'AI Assistant' }}&lt;/strong&gt;
      &lt;/div&gt;
      &lt;p class="message-content"&gt;{{ msg.content }}&lt;/p&gt;
    &lt;/article&gt;

    &lt;div *ngIf="isLoading" class="message-bubble ai-bubble loading-bubble"&gt;
      &lt;div class="typing-indicator"&gt;
        &lt;span&gt;AI is thinking...&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/main&gt;

  &lt;footer class="chat-input-area"&gt;
    &lt;input
      type="text"
      [(ngModel)]="userMessage"
      (keyup.enter)="sendMessage()"
      placeholder="Ask about Angular, TypeScript, or Services..."
      [disabled]="isLoading"
    /&gt;
    &lt;button class="btn-primary" (click)="sendMessage()" [disabled]="!userMessage.trim() || isLoading"&gt;
      Send
    &lt;/button&gt;
  &lt;/footer&gt;
&lt;/div&gt;</code></pre>

      <h2>Critical AI Security Consideration</h2>
      <p>When transitioning from a Mock AI Service to a production environment (such as OpenAI, Anthropic, or Google Gemini), never hardcode API secret keys directly inside your Angular code.</p>
      <pre><code>// NEVER DO THIS IN ANGULAR:
const OPENAI_API_KEY = "sk-proj-xxxxxx...";</code></pre>
      <p><strong>Why?</strong> Angular is a client-side framework. All code delivered to the user's browser can be inspected through developer tools. Storing secret keys in frontend code will expose your credentials, leading to potential account abuse and financial loss.</p>
      <p>Always route request payloads through a secure backend server (Node.js, Python, or Serverless Functions) that securely holds API keys in environment variables:</p>
      <pre><code>Angular App (Browser) --&gt; Express/Node Backend --&gt; OpenAI / Gemini API</code></pre>

      <h2>Frequently Asked Questions</h2>
      <h3>Can I build an AI chatbot with Angular?</h3>
      <p>Yes. Angular is ideal for building high-performance AI frontend applications due to its robust component model, reactive RxJS data streams, and built-in dependency injection.</p>
      <h3>Do I need a paid API key to take this course?</h3>
      <p>No. This course uses a mock service setup, allowing you to master all Angular architecture concepts, state management, and UI building without spending money on third-party API tokens.</p>
      <h3>Can I connect OpenAI or Google Gemini later?</h3>
      <p>Yes. The architecture taught in this course allows you to replace ChatService methods with an HTTP client call to your backend endpoint without altering your component UI code.</p>

      <div class="article-cta">
        <p><strong>Ready to complete the full course?</strong> 10 in-depth lessons covering project setup, typing indicators, RxJS streams, error handling, local storage, and deployment — with full source code and a production deployment guide.</p>
        <a href="/courses/build-ai-chatbot-with-angular">Enroll in Build an AI Chatbot With Angular</a>
      </div>
    `,
  },
];
