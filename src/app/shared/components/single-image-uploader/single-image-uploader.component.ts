import {Component, ElementRef, Input, Output, ViewChild, EventEmitter} from '@angular/core';
import { DropzoneComponent } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'single-image-uploader',
  templateUrl: 'single-image-uploader.component.html',
  styleUrls: ['single-image-uploader.component.less']
})
export class SingleImageUploaderComponent {
  @ViewChild('errors') errors: ElementRef<HTMLElement>;
  @ViewChild('dropzone') dropzone: DropzoneComponent;
  @Input()
  public acceptEmtpyFiles = true;
  @Input()
  public maxFileSize = 0;

  @Input()
  public set accept(acceptedFiles: string) {
    this.dropzoneConfig = {
      autoProcessQueue: false,
      url: 'api/QualityReport/${uid}/upload-screenshot',
      acceptedFiles,
    };
  }

  @Output()
  public onFileSelected = new EventEmitter<void>();

  public highlightDropzone = false;
  public file: File;
  public fileUploading = false;

  public dropzoneConfig = {};

  uploadFile(file: File) {
    if (!this.acceptEmtpyFiles && file.size == 0) {
      this.showError(`"${file.name}" file is empty.`);
      return;
    }

    if (this.maxFileSize != 0 && file.size > this.maxFileSize * 1024 * 1024) {
      this.showError(`"${file.name}" file is more than ${this.maxFileSize}mb.`);
      return;
    }

    this.file = file;
    this.fileUploading = true;
    this.onFileSelected.emit();
  }

  public deleteAttachment() {
    this.dropzone.directiveRef.reset();
    this.fileUploading = false;
    this.file = null;
  }

  public calculateSize(byte: number) {
    if (byte / 1024 < 1) {
      return `${byte} b`;
    } else if (byte / 1024 / 1024 < 1) {
      return `${(byte / 1024).toFixed(2)} kb`;
    } else {
      return `${(byte / 1024 / 1024).toFixed(2)} mb`;
    }
  }

  public showError(msg: string) {
    const element = document.createElement('li');
    element.innerText = msg;
    element.style.color = 'red';

    this.errors.nativeElement.appendChild(element);
    setTimeout(() => this.errors.nativeElement.removeChild(element), 5000);
  }
}
