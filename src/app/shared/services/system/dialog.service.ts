import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map } from 'rxjs/operators';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { DialogComponent } from '../../components/dialog/dialog.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService  {

  constructor(
    private dialog: MatDialog,
    private spinnerService: SpinnerOverlayService
  ) { }

  oneButton(caption: string, text: string, button1Text: string): Observable<any> {

    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.componentInstance.caption = caption;
    dialogRef.componentInstance.text = text;
    dialogRef.componentInstance.button1Text = button1Text;
    dialogRef.componentInstance.onebutton = true;
    return dialogRef.afterClosed();
  }

  oneButtonUnsafe(caption: string, text: string, button1Text: string): Observable<any> {

    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.componentInstance.caption = caption;
    dialogRef.componentInstance.setTextUnsafe(text);
    dialogRef.componentInstance.button1Text = button1Text;
    dialogRef.componentInstance.onebutton = true;
    return dialogRef.afterClosed();
  }

  twoButtons(caption: string, text: string, button1Text: string, button2Text: string): Observable<any> {

    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.componentInstance.caption = caption;
    dialogRef.componentInstance.text = text;
    dialogRef.componentInstance.button1Text = button1Text;
    dialogRef.componentInstance.button2Text = button2Text;
    dialogRef.componentInstance.twobutton =true;
    return dialogRef.afterClosed().pipe(
      map((res) => {
        this.spinnerService.hide();
        return res;
      }),
    );
  }


  threeButtons(caption: string, text: string, button1Text: string, button2Text: string, button3Text: string): Observable<any> {

    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.componentInstance.caption = caption;
    dialogRef.componentInstance.text = text;
    dialogRef.componentInstance.button1Text = button1Text;
    dialogRef.componentInstance.button2Text = button2Text;
    dialogRef.componentInstance.button3Text = button3Text;
    dialogRef.componentInstance.threebutton = true;
    return dialogRef.afterClosed().pipe(
      map((res) => {
        this.spinnerService.hide();
        return res;
      }),
    );
  }

}
