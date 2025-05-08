import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private emailSignal = signal<string>('');

  getEmail = () => this.emailSignal;

  setEmail(email: string) {
    this.emailSignal.set(email);
  }
}
