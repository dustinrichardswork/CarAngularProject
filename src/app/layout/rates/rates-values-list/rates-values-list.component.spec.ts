import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesValuesListComponent } from './rates-values-list.component';

describe('RatesValuesListComponent', () => {
  let component: RatesValuesListComponent;
  let fixture: ComponentFixture<RatesValuesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesValuesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesValuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
