import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDatepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { AngularIbanModule } from 'angular-iban';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StantumCommonModule } from './shared/common/module';
import { ServicesModule } from './shared/services/services.module';
import { SpinnerOverlayComponent } from './spinner/spinner-overlay.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TermsOfServiceComponent } from './layout/components/terms-of-service/terms-of-service.component';
import { NavigationModule } from './shared/services/navigation/navigation.module';
import { AppNavigation } from './shared/services/navigation/app-navigation';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    SpinnerComponent,
    SpinnerOverlayComponent,
    AppComponent,
    WelcomeComponent,
    TermsOfServiceComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    TextMaskModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StantumCommonModule,
    MatProgressSpinnerModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    ServicesModule,
    AppRoutingModule,
    ArchwizardModule,
    SimpleNotificationsModule.forRoot(),
    AngularIbanModule,
    NavigationModule.forRoot(AppNavigation.LoadConfig()),
  ],
  bootstrap: [AppComponent],
  entryComponents: [SpinnerOverlayComponent],
})
export class AppModule {}
