import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../shared/services/auth.new.service';
import {MenuItem} from '../../../../shared/services/navigation/navigation-config';
import {NavigationService} from '../../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.less']
})
export class HeaderMenuComponent implements OnDestroy {
  private _subscription: Subscription = new Subscription();

  public activeTitle = "";
  public currentUrl: string = '';
  // private _items: IMenuItem[] = [
  //   {
  //     title: "Users",
  //     route: "/users",
  //     roles: [UserRoles.AddCarAdmin, UserRoles.FranchiseeAdmin],
  //     activeOptions: { exact: false}
  //   },
  //   {
  //     title: "Franchisees",
  //     route: "/franchisees",
  //     roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
  //     activeOptions: { exact: false }
  //   },
  //   {
  //     title: "Details",
  //     route: "", //will be initialized during execution. Look at initFrinchiseId below.
  //     roles: [UserRoles.FranchiseeAdmin, UserRoles.FranchiseeUser],
  //     activeOptions: {exact: true}
  //   },
  //   {
  //     title: "Subfranchisees",
  //     route: "", //will be initialized during execution. Look at initFrinchiseId below.
  //     roles: [UserRoles.FranchiseeAdmin, UserRoles.FranchiseeUser],
  //     activeOptions: { exact: true }
  //   },
  //   {
  //     title: "Brokers",
  //     route: "/brokers",
  //     roles: [UserRoles.AddCarAdmin],
  //     activeOptions: { exact: false }
  //   },
  //   {
  //     title: "Reservations",
  //     route: "/reservations",
  //     roles: [],
  //     activeOptions: { exact: false }
  //   },
  //   {
  //     title: "Reports",
  //     route: "/reports",
  //     roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeAdmin],
  //     activeOptions: { exact: false }
  //   },
  //   {
  //     title: "Algorithm",
  //     route: "/algorithm",
  //     roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeAdmin],
  //     activeOptions: { exact: false }
  //   }
  // ];

  public availableItems: MenuItem[] = [];
  public loggedUserRole;

  constructor(
    navigationService: NavigationService,
    private authService: AuthService) {
    this._subscription.add(
      navigationService.topMenu.subscribe((a) => {
        this.availableItems = a;
      }),
    );
    this.loggedUserRole = this.authService.loggedUserRole;
    this.currentUrl = window.location.pathname;
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
