import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AuthService } from '@app-shared/services/auth.new.service';
import { HeaderComponent } from './header.component';
import { LayoutModule } from '../../layout.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const mockedAuthService = {
    loggedUser: 'mocked.user',
    isLoggedIn: jasmine.createSpy('isLoggedIn'),
    authNavStatus$: of({}),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayoutModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: mockedAuthService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
