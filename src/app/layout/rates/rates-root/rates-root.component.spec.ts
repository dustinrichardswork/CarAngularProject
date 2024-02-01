import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesRootComponent } from './rates-root.component';

describe('RatesRootComponent', () => {
  let component: RatesRootComponent;
  let fixture: ComponentFixture<RatesRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
