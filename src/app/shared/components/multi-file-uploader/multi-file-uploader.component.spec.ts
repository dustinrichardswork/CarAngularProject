import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiFileUploaderComponent } from './multi-file-uploader.component';

describe('MultiFileUploaderComponent', () => {
  let component: MultiFileUploaderComponent;
  let fixture: ComponentFixture<MultiFileUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiFileUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
