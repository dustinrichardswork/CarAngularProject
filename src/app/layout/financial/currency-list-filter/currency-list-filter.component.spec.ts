import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyListFilterComponent } from './currency-list-filter.component';

describe('CurrencyListFilterComponent', () => {
  let component: CurrencyListFilterComponent;
  let fixture: ComponentFixture<CurrencyListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
