import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesExtrasSearchListComponent } from './rates-extras-search-list.component';

describe('RatesExtrasSearchListComponent', () => {
  let component: RatesExtrasSearchListComponent;
  let fixture: ComponentFixture<RatesExtrasSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesExtrasSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesExtrasSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
