import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, serverTimestamp } from '@angular/fire/firestore';
import { ContactMessage } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly firestore = inject(Firestore, { optional: true });

  async sendMessage(message: Omit<ContactMessage, 'status'>): Promise<boolean> {
    if (!this.firestore) return false;
    try {
      await addDoc(collection(this.firestore, 'contactMessages'), {
        ...message,
        status: 'new',
        createdAt: serverTimestamp(),
      });
      return true;
    } catch {
      return false;
    }
  }
}
