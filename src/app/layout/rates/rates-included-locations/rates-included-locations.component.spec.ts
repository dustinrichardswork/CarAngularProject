import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesIncludedLocationsComponent } from './rates-included-locations.component';

describe('RatesIncludedLocationsComponent', () => {
  let component: RatesIncludedLocationsComponent;
  let fixture: ComponentFixture<RatesIncludedLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesIncludedLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesIncludedLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
