import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDeniedComponent } from './access-denied.component';

describe('AccessDeniedComponent', () => {
  let component: AccessDeniedComponent;
  let fixture: ComponentFixture<AccessDeniedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessDeniedComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(AccessDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
