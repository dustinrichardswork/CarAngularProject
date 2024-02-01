import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoButtonGroupComponent } from './promo-button-group.component';

describe('PromoButtonGroupComponent', () => {
  let component: PromoButtonGroupComponent;
  let fixture: ComponentFixture<PromoButtonGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoButtonGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
