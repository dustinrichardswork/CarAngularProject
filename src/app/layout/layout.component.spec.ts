import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AuthService } from '@app-shared/services/auth.new.service';
import { LayoutComponent } from './layout.component';
import { LayoutModule } from './layout.module';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  const mockedAuthService = {
    isLoggedIn: jasmine.createSpy('isLoggedIn'),
    authNavStatus$: of({}),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayoutModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: mockedAuthService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
