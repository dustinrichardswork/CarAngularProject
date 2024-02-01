import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesGeneralFilterComponent } from './rates-general-filter.component';

describe('RatesGeneralFilterComponent', () => {
  let component: RatesGeneralFilterComponent;
  let fixture: ComponentFixture<RatesGeneralFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesGeneralFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesGeneralFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
