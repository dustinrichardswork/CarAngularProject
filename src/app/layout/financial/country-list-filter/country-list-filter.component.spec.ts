import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryListFilterComponent } from './country-list-filter.component';

describe('CountryListFilterComponent', () => {
  let component: CountryListFilterComponent;
  let fixture: ComponentFixture<CountryListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
