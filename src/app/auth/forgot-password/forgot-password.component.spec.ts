import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UserProfileService } from '@app-shared/services/user/user-profile.service';
import { ForgotPasswordComponent } from './forgot-password.component';

xdescribe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  const mockedUserProfileService = {
    requestPasswordRecovery: jasmine.createSpy('requestPasswordRecovery').and.returnValue(of({})),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      providers: [FormBuilder, { provide: UserProfileService, useValue: mockedUserProfileService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
