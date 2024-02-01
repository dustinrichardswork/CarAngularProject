import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsOfServiceComponent } from './terms-of-service.component';

describe('TermsOfServiceComponent', () => {
  let component: TermsOfServiceComponent;
  let fixture: ComponentFixture<TermsOfServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsOfServiceComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(TermsOfServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
