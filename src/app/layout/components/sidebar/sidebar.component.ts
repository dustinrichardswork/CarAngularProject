import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FranchiseeViewModel} from '@app-shared/models/franchisee-view-model.model';
import {AuthService} from '@app-shared/services/auth.new.service';
import {GlobalService} from '@app-shared/services/global.service';
import {UserRoles} from '@app-shared/models/enums';
import {BrokerViewModel} from '@app-shared/models/broker-view-model.model';
import {SubFranchiseeViewModel} from '../../../shared/models/sub-franchisee-view-model.model';
import {FranchiseeService} from '../../../shared/services/franchisee/franchisee.service';
import {tap} from 'rxjs/operators';
import {MenuItem} from '../../../shared/services/navigation/navigation-config';
import {NavigationService} from '../../../shared/services/navigation/navigation.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import { BreadcrumbService } from 'app/shared/services/breadcrumb.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public isActive: boolean;
  public isLoggedIn = true;
  public subscription: Subscription;
  public franchiseeDetailSubscription: Subscription;
  public subFranchiseeDetailSubscription: Subscription;
  public brokersDetailSubscription: Subscription;
  public loggedUserRole;

  public wideResolution = true;

  public get userName() {
    return this.authService.loggedUser;
  }
  public collapsed: boolean;
  public showMenu: string;
  public pushRightClass: string;

  @Output() collapsedEvent = new EventEmitter<boolean>();

  private _subscription: Subscription = new Subscription();
  public availableItems: MenuItem[] = [];
  public availableTopItems: MenuItem[] = [];
  public availableSmallResolutionItems: MenuItem[] = [];

  public isHome: boolean;
  public isPromo: boolean;
  public issettings: boolean;
  public ispaymentoverview: boolean;
  public franchiseDetail: FranchiseeViewModel;
  public franchiseeUid: string;
  public brokersDetail: BrokerViewModel;
  public subFranchiseeDetail: SubFranchiseeViewModel;
  public isFranchiseeLevel: boolean = false;
  public isAlgorithm: boolean;

  constructor(
    private readonly franchiseeService: FranchiseeService,
    private readonly authService: AuthService,
    public readonly router: Router,
    private readonly globalService: GlobalService,
    private readonly breakpointObserver: BreakpointObserver,
    navigationService: NavigationService,
    public breadCrumbService: BreadcrumbService
  ) {
    this._subscription.add(navigationService.sideMenu.subscribe((a) => {
      this.availableItems = a;
      // if(this.router.url !== '/rates/page' && this.router.url !== '/rates/create') {
      //   if ( this.availableItems && this.availableItems[0]['title'] === "Create Rate") 
      //       this.availableItems?.shift()
      // }
      const subItems = this.availableItems?.filter(menu => menu.subMenu);
      this.availableItems = this.availableItems?.filter(menu => !menu.subMenu);
      if(this.router.url.includes("/rates/page") || this.router.url === '/rates/create') {
        const addedItem = subItems?.filter(menu => menu.code === "rate-create");
        this.availableItems?.unshift(addedItem[0]);
      }
      if(this.router.url.includes("/rates/extras/page") || this.router.url === '/rates/extras/create') {
        const addedItem = subItems?.filter(menu => menu.code === "extra-create");
        this.availableItems?.unshift(addedItem[0]);
      }
      // if(this.router.url.includes("/rates/allotments") || this.router.url === '/rates/allotments/create') {
      //   const addedItem = subItems?.filter(menu => menu.code === "allotment-create");
      //   this.availableItems?.unshift(addedItem[0]);
      // }
      if(this.router.url.includes("/rates/oneway") || this.router.url === '/rates/oneway/create') {
        const addedItem = subItems?.filter(menu => menu.code === "oneway-create");
        this.availableItems?.unshift(addedItem[0]);
      }
      if(this.router.url === '/financial/currency/page' || this.router.url === '/financial/currency/new') {
        const addedItem = subItems?.filter(menu => menu.code === "currency-create");
        this.availableItems?.unshift(addedItem[0]);
      }
      if(this.router.url === '/financial/groups/page' || this.router.url === '/financial/groups/create') {
        const addedItem = subItems?.filter(menu => menu.code === "group-create");
        this.availableItems?.unshift(addedItem[0]);
      }
      if(this.router.url === '/financial/countries/page' || this.router.url === '/financial/countries/create') {
        const addedItem = subItems?.filter(menu => menu.code === "country-create");
        this.availableItems?.unshift(addedItem[0]);
      }
      if(this.router.url.includes('/financial/locations')) {
        const addedItem = subItems?.filter(menu => menu.code === "location-create");
        this.availableItems?.unshift(addedItem[0]);
      }
      if(this.router.url === '/financial/rental_stations/page' || this.router.url === '/financial/rental_stations/new') {
        const addedItem = subItems?.filter(menu => menu.code === "rental-station-create");
        this.availableItems?.unshift(addedItem[0]);
      }
    }));
    this._subscription.add(
      navigationService.sideMenu.subscribe((a) => {this.availableSmallResolutionItems = a; this.breadCrumbService.sideMenuItems.next(a);}),
    );
    this._subscription.add(
      navigationService.topMenu.subscribe((a) => {this.availableTopItems = a; console.log(this.availableTopItems)})
    );
    this.franchiseDetail = null;
    this.brokersDetail = null;
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isHome = router.url.indexOf('/home') > -1;
        this.issettings = router.url.indexOf('/settings') > -1;
        this.ispaymentoverview = router.url.indexOf('/payment-overview') > -1;
        this.isPromo = router.url.indexOf('/promo') > -1;
        // this.issubfranchisdetails = router.url.indexOf('/subfranchisees/') > -1 && router.url.indexOf('/page') == -1;
        // this.isnew = router.url.indexOf('/new') > -1;
        // this.isAlgorithm = router.url.indexOf('/algorithm/') > -1;

        if (window.innerWidth <= 992 && this.isToggled()) {
          this.toggleSidebar();
        }
      }
    });

    this.franchiseeDetailSubscription = this.globalService._franchiseeDetailSource.subscribe(
      (franchiseeDetail) => (this.franchiseDetail = franchiseeDetail),
    );

    this.brokersDetailSubscription = this.globalService._brokersDetailSource.subscribe(
      (brokersDetail) => (this.brokersDetail = brokersDetail),
    );

    this.subFranchiseeDetailSubscription = this.globalService._subFranchiseeDetailSource.subscribe(
      (subFranchiseeDetail) => (this.subFranchiseeDetail = subFranchiseeDetail),
    );
  }

  public ngOnInit() {
    this.breakpointObserver.observe(['(max-width: 990px)']).subscribe((state: BreakpointState) => {
      this.wideResolution = !state.matches;
    });
    this.isLoggedIn = this.authService.isLoggedIn();
    this.subscription = this.authService.authNavStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.isActive = false;
    this.collapsed = false;
    this.showMenu = '';
    this.pushRightClass = 'push-right';
    this.loggedUserRole = this.authService.loggedUserRole;
    if (
      this.authService.loggedUserRole == UserRoles.AddCarAdmin ||
      this.authService.loggedUserRole == UserRoles.AddCarUser
    ) {
      this.isFranchiseeLevel = true;
    } else {
      // this.isFranchiseeLevel = false;
      // this.franchiseeService
      //   .getUserFranchiseeMetadata()
      //   .pipe(
      //     tap((res) => {
      //       this.isFranchiseeLevel = !res.isSubFranchiseeUser;
      //     }),
      //   )
      //   .subscribe();
    }
  }

  public addExpandClass(element: string) {
    element === this.showMenu ? (this.showMenu = '0') : (this.showMenu = element);
  }

  public toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }

  public isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  public toggleSidebar() {
    const dom: Element = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  onMenuClick(menuItem: MenuItem): void {
    switch(menuItem.code) {
      case "rate-create":
        {
          
        }
      case "extra-create":
        {

        }
      case "allotment-create":
        { 
          this.globalService.sendRateInfoCreateSbj("allotment-create");
        }
      case "oneway-create":
        {
          this.globalService.sendRateInfoCreateSbj("oneway-create");
        }
      default: {
        this.breadCrumbService.onChangeMenu(menuItem);
      }
    }
  }

  public ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
    this.franchiseeDetailSubscription.unsubscribe();
    this.brokersDetailSubscription.unsubscribe();
  }
}
