import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnectionErrorDialogComponent } from './connection-error-dialog.component';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatProgressSpinnerModule, BrowserAnimationsModule],
  declarations: [ConnectionErrorDialogComponent],
})
export class ConnectionErrorDialogModule {}
