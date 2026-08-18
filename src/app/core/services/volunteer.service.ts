import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, serverTimestamp } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { VolunteerApplication } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class VolunteerService {
  private readonly firestore = inject(Firestore, { optional: true });
  private readonly storage = inject(Storage, { optional: true });

  async uploadResume(file: File, applicantEmail: string): Promise<string | null> {
    if (!this.storage) return null;
    try {
      const path = `volunteers/resumes/${Date.now()}-${applicantEmail}-${file.name}`;
      const storageRef = ref(this.storage, path);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch {
      return null;
    }
  }

  async submitApplication(application: Omit<VolunteerApplication, 'status'>): Promise<boolean> {
    if (!this.firestore) return false;
    try {
      await addDoc(collection(this.firestore, 'volunteers'), {
        ...application,
        status: 'new',
        createdAt: serverTimestamp(),
      });
      return true;
    } catch {
      return false;
    }
  }
}
