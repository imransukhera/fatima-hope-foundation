import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, serverTimestamp } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { SEED_JOBS } from '../data/seed-data';
import { JobOpening } from '../models/content.models';

export interface JobApplication {
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  coverMessage: string;
  resumeUrl?: string;
  status?: string;
  createdAt?: unknown;
}

@Injectable({ providedIn: 'root' })
export class CareersService {
  private readonly firestore = inject(Firestore, { optional: true });
  private readonly storage = inject(Storage, { optional: true });
  private readonly platformId = inject(PLATFORM_ID);

  readonly jobs = signal<JobOpening[]>(SEED_JOBS);

  constructor() {
    if (isPlatformBrowser(this.platformId) && this.firestore) {
      this.syncFromFirestore();
    }
  }

  bySlug(slug: string) {
    return computed(() => this.jobs().find((j) => j.slug === slug));
  }

  async uploadResume(file: File, applicantEmail: string): Promise<string | null> {
    if (!this.storage) return null;
    try {
      const path = `careers/resumes/${Date.now()}-${applicantEmail}-${file.name}`;
      const storageRef = ref(this.storage, path);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch {
      return null;
    }
  }

async submitApplication(
  application: Omit<JobApplication, 'status' | 'createdAt'>
): Promise<boolean> {

  if (!this.firestore) {
    console.error('[Careers] Firestore is not available');
    return false;
  }

  try {
    const applicationsRef = collection(
      this.firestore,
      'jobApplications'
    );

    const docRef = await addDoc(applicationsRef, {
      ...application,
      status: 'new',
      createdAt: serverTimestamp()
    });

    console.log(
      '[Careers] Application saved:',
      docRef.id
    );

    return true;

  } catch (error) {
    console.error(
      '[Careers] Firestore insert failed:',
      error
    );

    return false;
  }
}

  private async syncFromFirestore(): Promise<void> {
    try {
      const snap = await getDocs(collection(this.firestore!, 'jobs'));
      if (!snap.empty) {
        this.jobs.set(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as JobOpening));
      }
    } catch {
      // Firestore not configured yet — keep static seed data so the page still renders.
    }
  }
}
