import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesSeasonsListComponent } from './rates-seasons-list.component';

describe('RatesSeasonsListComponent', () => {
  let component: RatesSeasonsListComponent;
  let fixture: ComponentFixture<RatesSeasonsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesSeasonsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesSeasonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
