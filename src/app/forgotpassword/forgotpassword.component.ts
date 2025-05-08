import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  apiService = inject(ApiService);
  router = inject(Router);

  contactData = {
    email: '',
  };

  emailFocused = false;
  message: string | null = null;
  errorMessage: string | null = null;

  async onSubmit(form: any) {
    if (form.valid) {
      this.errorMessage = null;
      this.message = null;
      try {
        const response = await firstValueFrom(
          this.apiService.post<any>(
            { email: this.contactData.email },
            'password-reset/'
          )
        );
        this.message = response.message;
      } catch (error) {
        this.errorMessage =
          'An error has occurred. Please try again later.';
      }
    } else {
      this.errorMessage = 'Please enter a valid e-mail address.';
    }
  }
}
