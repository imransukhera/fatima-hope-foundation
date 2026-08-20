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
