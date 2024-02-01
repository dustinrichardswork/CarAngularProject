import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { AddressDetailsComponent } from './address-details.component';

describe('AddressDetailsComponent', () => {
  let component: AddressDetailsComponent;
  let fixture: ComponentFixture<AddressDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressDetailsComponent],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(AddressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
