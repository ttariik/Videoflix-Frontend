import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'videoflix';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        document.body.className = '';
        if (event.urlAfterRedirects === '/') {
          document.body.classList.add('bg-home');
        } else if (event.urlAfterRedirects === '/signup') {
          document.body.classList.add('bg-signup');
        } else if (event.urlAfterRedirects === '/login') {
          document.body.classList.add('bg-login');
        } else if (event.urlAfterRedirects === '/forgot-password') {
          document.body.classList.add('bg-forgot');
        } else if (event.urlAfterRedirects === '/imprint') {
          document.body.classList.add('bg-imprint');
        } else if (event.urlAfterRedirects === '/privacy-policy') {
          document.body.classList.add('bg-privacyPolicy');
        }
      });
  }
}
