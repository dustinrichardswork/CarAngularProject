import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './shared/services/logged-in.guard';
import { WelcomeGuard } from './shared/services/welcome.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { TermsOfServiceComponent } from './layout/components/terms-of-service/terms-of-service.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInGuard],
  },
  { path: 'welcome', component: WelcomeComponent, canActivate: [WelcomeGuard] },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  {
    path: 'error',
    loadChildren: () =>
      import('./server-error/server-error.module').then((m) => m.ServerErrorModule),
  },
  {
    path: 'access-denied',
    loadChildren: () =>
      import('./access-denied/access-denied.module').then((m) => m.AccessDeniedModule),
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule),
  },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
