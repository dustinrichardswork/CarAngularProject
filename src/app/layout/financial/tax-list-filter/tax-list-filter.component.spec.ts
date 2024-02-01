import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxListFilterComponent } from './tax-list-filter.component';

describe('TaxListFilterComponent', () => {
  let component: TaxListFilterComponent;
  let fixture: ComponentFixture<TaxListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
