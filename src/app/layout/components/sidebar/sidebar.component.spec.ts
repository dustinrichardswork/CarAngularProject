import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { UserRoles } from '@app-shared/models/enums';
import { AuthService } from '@app-shared/services/auth.new.service';
import { GlobalService } from '@app-shared/services/global.service';
import { SidebarComponent } from './sidebar.component';
import { LayoutModule } from '../../layout.module';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  const mockedGlobalService = {
    _franchiseeDetailSource: of({}),
  };
  const mockedAuthService = {
    isLoggedIn: jasmine.createSpy('isLoggedIn'),
    authNavStatus$: of({}),
    loggedUserRole: UserRoles.FranchiseeAdmin,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayoutModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: mockedAuthService },
        { provide: GlobalService, useValue: mockedGlobalService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
