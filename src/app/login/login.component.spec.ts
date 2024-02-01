import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { AuthService } from '@app-shared/services/auth.new.service';

import { LoginComponent } from './login.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const mockedActivatedRoute = { snapshot: { queryParams: of({ returnUrl: 'mocked text' }) } };
  const mockedRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };
  const mockedAuthService = { login: jasmine.createSpy('login').and.returnValue(of({})) };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: mockedActivatedRoute },
        { provide: AuthService, useValue: mockedAuthService },
        { provide: Router, useValue: mockedRouter },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    window['DestroyParticles'] = () => {};
    window['StartParticles'] = () => {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
