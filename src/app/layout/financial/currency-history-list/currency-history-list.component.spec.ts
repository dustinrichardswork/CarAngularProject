import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyHistoryListComponent } from './currency-history-list.component';

describe('CurrencyHistoryListComponent', () => {
  let component: CurrencyHistoryListComponent;
  let fixture: ComponentFixture<CurrencyHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
