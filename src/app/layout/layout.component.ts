import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '@app-shared/services/auth.new.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  public collapedSideBar: boolean;

  public isLoggedIn = false;
  public subscription: Subscription;

  constructor(private readonly authService: AuthService, public router: Router) {}

  public receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  public ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.subscription = this.authService.authNavStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  public ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}
