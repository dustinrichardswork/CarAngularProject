import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerErrorComponent } from './server-error.component';

describe('ServerErrorComponent', () => {
  let component: ServerErrorComponent;
  let fixture: ComponentFixture<ServerErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServerErrorComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(ServerErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
