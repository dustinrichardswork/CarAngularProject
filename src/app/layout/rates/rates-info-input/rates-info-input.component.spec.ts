import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesInfoInputComponent } from './rates-info-input.component';

describe('RatesInfoInputComponent', () => {
  let component: RatesInfoInputComponent;
  let fixture: ComponentFixture<RatesInfoInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesInfoInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesInfoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
