import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from '@angular/fire/firestore';

export interface EnrollmentSession {
  id: string;
  name: string;
  email: string;
  courseSlug: string;
}

const SESSION_KEY_PREFIX = 'fhf_enrollment_';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private readonly firestore = inject(Firestore, { optional: true });
  private readonly platformId = inject(PLATFORM_ID);

  getSession(courseSlug: string): EnrollmentSession | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const raw = localStorage.getItem(SESSION_KEY_PREFIX + courseSlug);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as EnrollmentSession;
    } catch {
      return null;
    }
  }

  private setSession(session: EnrollmentSession): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(SESSION_KEY_PREFIX + session.courseSlug, JSON.stringify(session));
  }

  async enroll(data: {
    courseSlug: string;
    name: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<{ session: EnrollmentSession } | { error: string }> {
    if (!this.firestore) {
      return { error: 'Enrollment is not available right now. Please try again later.' };
    }
    try {
      const ref = await addDoc(collection(this.firestore, 'enrollments'), {
        courseSlug: data.courseSlug,
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone,
        password: data.password,
        completedModules: [],
        createdAt: serverTimestamp(),
      });

      const session: EnrollmentSession = {
        id: ref.id,
        name: data.name,
        email: data.email,
        courseSlug: data.courseSlug,
      };
      this.setSession(session);
      return { session };
    } catch {
      return { error: "Couldn't submit your enrollment — please try again." };
    }
  }

  async getCompletedModules(enrollmentId: string): Promise<string[]> {
    if (!this.firestore) return [];
    try {
      const snap = await getDoc(doc(this.firestore, 'enrollments', enrollmentId));
      return snap.exists() ? ((snap.data()['completedModules'] as string[] | undefined) ?? []) : [];
    } catch {
      return [];
    }
  }

  async setModuleComplete(enrollmentId: string, moduleId: string, completed: boolean): Promise<void> {
    if (!this.firestore) return;
    try {
      await updateDoc(doc(this.firestore, 'enrollments', enrollmentId), {
        completedModules: completed ? arrayUnion(moduleId) : arrayRemove(moduleId),
      });
    } catch {
      // Ignore — UI already reflects the optimistic state and resyncs on next visit.
    }
  }
}
