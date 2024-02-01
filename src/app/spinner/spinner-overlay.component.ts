import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.less'],
})
export class SpinnerOverlayComponent {
  public message = 'Loading...';
  public diameter = 60;
}
