import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss',
})
export class LandingpageComponent {
  email: string = '';
  private emailService = inject(EmailService);
  router = inject(Router);

  constructor() {}

  navigateToSignup() {
    this.emailService.setEmail(this.email);
    this.router.navigate(['signup']);
  }
}
