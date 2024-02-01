import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFileUploaderComponent } from './single-file-uploader.component';

describe('FileUploadComponent', () => {
  let component: SingleFileUploaderComponent;
  let fixture: ComponentFixture<SingleFileUploaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleFileUploaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(SingleFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
