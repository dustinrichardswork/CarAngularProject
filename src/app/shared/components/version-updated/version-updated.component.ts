import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: 'version-updated.component.html',
  styleUrls: ['version-updated.component.less']
})
export class VersionUpdatedComponent {
  constructor(private dialogRef: MatDialogRef<VersionUpdatedComponent>)
  { }

  close() {
    this.dialogRef.close()
  }
}
