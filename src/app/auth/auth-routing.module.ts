import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordResetTokenGuard } from '../shared/services/password-reset-token.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './user-recover-password/recover-password.component';

const routes: Routes = [
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent,
    canActivate: [PasswordResetTokenGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
