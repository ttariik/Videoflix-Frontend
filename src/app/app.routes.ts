import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { VideosOfferComponent } from './videos-offer/videos-offer.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: LandingpageComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy-policy', component: PrivacypolicyComponent },
  {
    path: 'forgot-password',
    component: ForgotpasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reset-password/:uid/:token',
    component: ResetpasswordComponent,
    canActivate: [AuthGuard],
  },
  { path: 'videos', component: VideosOfferComponent },
];
