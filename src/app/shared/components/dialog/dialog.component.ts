import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    private readonly dialogRef: MatDialogRef<DialogComponent>,
    private sanitizer: DomSanitizer
  ) { }

  onebutton: boolean = false;
  twobutton: boolean = false;
  threebutton: boolean = false;

  caption: string;
  text: string | SafeHtml;
  button1Text: string;
  button2Text: string;
  button3Text: string;


  public close(result: number) {
    this.dialogRef.close(result);
  }

  public setTextUnsafe(text: string) {
    this.text = this.sanitizer.bypassSecurityTrustHtml(text);
  }

}
