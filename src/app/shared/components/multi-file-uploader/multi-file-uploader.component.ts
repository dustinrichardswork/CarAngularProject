import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DropzoneComponent, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'multi-file-uploader',
  templateUrl: './multi-file-uploader.component.html',
  styleUrls: ['./multi-file-uploader.component.css']
})
export class MultiFileUploaderComponent {

  // References to the dropzone component
  @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;
  dropzone: any;
  @ViewChild('errors') errors: ElementRef<HTMLElement>;
  @Input()
  public acceptEmtpyFiles = true;
  @Input()
  public maxFileSize = 0;
  @Input()
  public set accept(acceptConfig) {
    this.dropzoneConfig = {
      autoProcessQueue: false,
      url: 'api/broker/${uID}/upload-invoice-template',
      uploadMultiple: true,
      maxFiles: acceptConfig.maxFile,
      acceptedFiles: acceptConfig.acceptFile,
    };
  }
  @Output()
  public onFileSelected = new EventEmitter<void>();

  public highlightDropzone = false;
  public files: File[] = [];
  public fileUploading = false;
  public dropzoneConfig: DropzoneConfigInterface = {};

  ngAfterViewInit() {
    this.dropzone = this.componentRef.directiveRef.dropzone();
  }

  public uploadFile(files: File[]) {
    if (!this.acceptEmtpyFiles && files[0].size == 0) {
      this.showError(`"${files[0].name}" file is empty.`);
      return;
    }

    if (this.maxFileSize != 0 && files[0].size > this.maxFileSize * 1024 * 1024) {
      this.showError(`"${files[0].name}" file is more than ${this.maxFileSize}mb.`);
      return;
    }
    
    this.files = [files[0]];
    if(files.length > 1) this.files.push(files[1]);
    this.fileUploading = true;
    this.onFileSelected.emit();
  }

  onUploadError() {
    this.dropzone.removeAllFiles();
  }

  public deleteAttachment() {
    this.fileUploading = false;
    this.files = [];
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
