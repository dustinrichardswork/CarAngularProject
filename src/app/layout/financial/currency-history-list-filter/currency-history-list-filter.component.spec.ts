import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyHistoryListFilterComponent } from './currency-history-list-filter.component';

describe('CurrencyHistoryListFilterComponent', () => {
  let component: CurrencyHistoryListFilterComponent;
  let fixture: ComponentFixture<CurrencyHistoryListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyHistoryListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyHistoryListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
