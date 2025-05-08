import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  apiService = inject(ApiService);
  private emailService = inject(EmailService);
  router = inject(Router);
  contactData = {
    email: '',
    password: '',
    repeated_password: '',
  };

  passwordVisible = false;
  confirmPasswordVisible = false;
  emailFocused = false;
  message = '';

  ngOnInit() {
    const emailFromSignal = this.emailService.getEmail()();
    if (emailFromSignal) {
      this.contactData.email = emailFromSignal;
    }
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (field === 'confirmPassword') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  async onSubmit(form: NgForm) {
    if (
      form.valid &&
      this.contactData.password === this.contactData.repeated_password
    ) {
      try {
        await firstValueFrom(
          this.apiService.post(this.contactData, 'registration/')
        );
        this.message =
          'A confirmation email has been sent. Please check your inbox.';
      } catch (error: any) {
        this.message =
          error.repeated_password ||
          error.email ||
          'Error during registration.';
      }
    } else {
      this.message = 'Form is invalid or passwords do not match.';
    }
  }
}
