import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RecoverPasswordComponent } from './user-recover-password/recover-password.component';
import { ServicesModule } from '../shared/services/services.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ServicesModule,
    HttpClientModule
  ],

  declarations: [
    ForgotPasswordComponent,
    RecoverPasswordComponent
  ],

  providers: [],
})
export class AuthModule { }
