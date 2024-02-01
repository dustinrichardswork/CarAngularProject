import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionErrorDialogComponent } from './connection-error-dialog.component';

describe('Shared Components: ConnectionErrorDialogComponent', () => {
  let component: ConnectionErrorDialogComponent;
  let fixture: ComponentFixture<ConnectionErrorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionErrorDialogComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ConnectionErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
