import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationListSearchComponent } from './location-list-search.component';

describe('LocationListSearchComponent', () => {
  let component: LocationListSearchComponent;
  let fixture: ComponentFixture<LocationListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
