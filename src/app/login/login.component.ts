import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  apiService = inject(ApiService);
  router = inject(Router);
  contactData = {
    email: '',
    password: '',
  };

  errorMessage: string | null = null;
  passwordVisible = false;
  emailFocused = false;

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['videos']);
    }
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    }
  }

  async onSubmit(form: any) {
    if (form.valid) {
      this.errorMessage = null;
      try {
        const response = await firstValueFrom(
          this.apiService.post<any>(this.contactData, 'login/')
        );
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['videos']);
        }
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 403) {
            this.errorMessage = 'Please confirm your email address first.';
          } else if (error.status === 400) {
            this.errorMessage = 'Invalid email or password';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        }
      }
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
    }
  }
}
