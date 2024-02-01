import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { SpinnerOverlayService } from './shared/services/spinner-overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  public title = 'app';

  constructor(
    private readonly router: Router,
    private readonly spinnerService: SpinnerOverlayService,
  ) {}

  public ngOnInit() {
    //Showing the spinner while modules loading
    this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.spinnerService.show();
      } else if (event instanceof RouteConfigLoadEnd) {
        this.spinnerService.hide();
      }
    });
  }
}
