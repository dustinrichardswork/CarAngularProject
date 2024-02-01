import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService} from '@app-shared/services/auth.new.service';
import {Subscription} from 'rxjs';
import {GlobalService} from '../../../shared/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isLoggedIn = true;
  public subscriptions: Subscription[] = [];
  public version = GlobalService._app_version;
  private versionSubscrption;

  public get userName() {
    return this.authService.loggedUser;
  }
  public pushRightClass: string;

  constructor(private readonly authService: AuthService, public readonly router: Router, private readonly globalService: GlobalService) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
    this.version = GlobalService._app_version;
    this.versionSubscrption=globalService.versionemitter.subscribe((val) => {
      this.version = val;

    })

  }

  public ngOnInit() {
    this.pushRightClass = 'push-right';
    this.isLoggedIn = this.authService.isLoggedIn();
    this.subscriptions.push(this.authService.authNavStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    }));
  }
  public ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscriptions.forEach(x => x.unsubscribe());
    this.versionSubscrption.unsubscribe();
  }

  public logout() {
    this.subscriptions.push(this.authService.logout().subscribe(() => {
      this.router.navigateByUrl("/login");
      document.location.reload();
    }));
  }

  public isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  public toggleSidebar() {
    const dom: Element = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }
}
