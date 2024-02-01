import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesListFilterComponent } from './rates-list-filter.component';

describe('RatesListFilterComponent', () => {
  let component: RatesListFilterComponent;
  let fixture: ComponentFixture<RatesListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
