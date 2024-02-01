import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivationEnd, NavigationEnd, Params, Router} from '@angular/router';
import {MenuItem, NavigationConfig, NavigationScreenSizeConfig} from './navigation-config';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from '../auth.new.service';
import {NamedRoute} from '../../named-routes/named-route-declarations';
import {ResizeService} from './resize.service';
import {GlobalService} from '@app-shared/services/global.service';
import {FranchiseeViewModel} from '@app-shared/models/franchisee-view-model.model';
import {MenuItemsCount} from '@app-shared/services/navigation/MenuItemsCount';
import {SubFranchiseeViewModel} from '@app-shared/models/sub-franchisee-view-model.model';
import { UserRoles } from 'app/shared/models/enums';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  // Observable navItem source
  private _topMenuSource = new BehaviorSubject<MenuItem[]>(null);
  // Observable navItem source
  private _sideMenuSource = new BehaviorSubject<MenuItem[]>(null);

  // Observable navItem stream
  public topMenu = this._topMenuSource.asObservable();
  // Observable navItem stream
  public sideMenu = this._sideMenuSource.asObservable();

  private currentScreenSizeConfig: NavigationScreenSizeConfig;

  private menuCodeItems: { [key: string]: MenuItem } = {};
  private menuRouteItems: MenuItem[] = [];
  private allMenuItems: MenuItem[] = [];
  private menuPlacementSources: { [key: string]: BehaviorSubject<MenuItem[]> } = {};

  private contextVariableStateless: { [key: string]: string } = {};
  private contextVariableStateful: { [key: string]: string } = {};

  private isLoading = false;
  private currentRoute: NamedRoute;
  private currentParams: Params;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private config: NavigationConfig,
    private authService: AuthService,
    private resizeService: ResizeService,
    private globalService: GlobalService,
  ) {
    this.validateConfig();
    this.currentScreenSizeConfig;
    this.loadConfig();

    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd) {
        if (event.snapshot) {
          if (event.snapshot.routeConfig && event.snapshot.routeConfig.path) {
            if (!this.isLoading) {
              this.contextVariableStateless = {};
              this.currentRoute = event.snapshot.routeConfig;
              this.currentParams = event.snapshot.params;
              this.isLoading = true;
            }
          }
        }
      }

      if (event instanceof NavigationEnd) {
        this.isLoading = false;
        this.publishMenus();
      }
    });

    resizeService.subscribe((a) => {
      if (this.loadConfig()) {
        this.publishMenus();
      }
    });
  }

  public load() {
    //this.buildMenus();
  }

  public setContextVariable(name: string, value: string, saveState = false) {
    if (saveState) this.contextVariableStateful[name] = value;
    else this.contextVariableStateless[name] = value;
    this.publishMenus();
  }

  private publishMenus() {
    this.publishTopMenu();
    this.publishSideMenu();
  }

  private publishTopMenu() {
    let items = this.allMenuItems.filter((a) => a.getPlacement() === 'top');
    if (items) {
      items = items
        .map((a) => this.applyRouteParams(new MenuItem(a)))
        .map((a) => this.applyContextVariables(new MenuItem(a)))
        .filter((a) => !a.isHidden);
    }
    this._topMenuSource.next(items);
  }

  private publishSideMenu() {
    let items = this.discoverSideMenu();
    if (items)
      items = items
        .filter(a => a.getPlacement() === 'side')
        .map(a => this.applyRouteParams(new MenuItem(a)))
        .map(a => this.applyContextVariables(new MenuItem(a)))
        .filter(a => !a.isHidden);

    this._sideMenuSource.next(items);
  }

  private setCountForMenuItems(
    items: MenuItem[],
    res: FranchiseeViewModel | SubFranchiseeViewModel | any,
  ): void {
    if (items && res) {
      const count = new MenuItemsCount({
        subfranchiseeCount: res.subfranchiseeCount,
        deductionsCount: res.deductionsCount,
        statementsCount: res.statementsCount,
        commissionsCount: res.commissionsCount,
      });
      items.forEach((el) => {
        switch (el.title) {
          case 'Subfranchisees':
            el.count = count.subfranchiseeCount;
            break;
          case 'Deductions':
            el.count = count.deductionsCount;
            break;
          case 'Statements':
            el.count = count.statementsCount;
            break;
          case 'Fees & Commmissions':
            el.count = count.commissionsCount;
            break;
          default:
            return;
        }
      });
    }
  }

  private discoverSideMenu(): MenuItem[] {
    if (this.currentRoute && this.currentRoute.menuCode) {
      const item = this.menuCodeItems[this.currentRoute.menuCode];
      if (item) {
        if (this.currentRoute.menuCallback) this.currentRoute.menuCallback(item);
        return this.getMenuForItem(item);
      }
    }
    const items = this.menuRouteItems.filter((a) =>
      this.router.isActive(a.route, a.activeOptions.exact),
    );
    if (items.length > 0) return this.getMenuForItem(items[0]);

    return null;
  }

  private getMenuForItem(item: MenuItem): MenuItem[] {
    if (item.useParentMenu) return item.parentItem.childItems;
    return item.childItems;
  }

  private applyRouteParams(item: MenuItem): MenuItem {
    const currentKeys = Object.keys(this.currentParams);
    currentKeys.forEach((a) => {
      item.route = item.route?.replace(':' + a, this.currentParams[a]);
    });
    return item;
  }

  private applyContextVariables(item: MenuItem): MenuItem {
    let currentKeys = Object.keys(this.contextVariableStateful);
    currentKeys.forEach((a) => {
      this.applyItemContextVariable(item, a, this.contextVariableStateful[a]);
    });
    currentKeys = Object.keys(this.contextVariableStateless);
    currentKeys.forEach((a) => {
      this.applyItemContextVariable(item, a, this.contextVariableStateless[a]);
    });
    return item;
  }

  private applyItemContextVariable(item: MenuItem, variableName: string, variableValue: string) {
    if (!variableValue) variableValue = '';
    if (item.icon) item.icon = item.icon.replace(`$${variableName}$`, variableValue);
    if (item.route) item.route = item.route.replace(`$${variableName}$`, variableValue);
    if (item.title) item.title = item.title.replace(`$${variableName}$`, variableValue);
    if (item.breadcrumbTitle)
      item.breadcrumbTitle = item.breadcrumbTitle.replace(`$${variableName}$`, variableValue);
    if (item.hiddenFlagName === variableName) item.isHidden = variableValue === 'true';
  }

  private loadConfig(): boolean {
    const isChanged = this.loadScreenSizeConfig(window.innerWidth);
    if (isChanged) {
      this.allMenuItems = [];
      this.menuRouteItems = [];
      this.menuCodeItems = {};
      this.loadMenuItems(this.currentScreenSizeConfig.menuItems);
      return true;
    }
    return false;
  }

  private loadScreenSizeConfig(width: number): boolean {
    const configs = this.config.screenSizeConfigs
      .filter((a) => a.maxResolution >= width)
      .sort((a, b) => a.maxResolution - b.maxResolution);

    if (
      !this.currentScreenSizeConfig ||
      configs[0].maxResolution !== this.currentScreenSizeConfig.maxResolution
    ) {
      this.currentScreenSizeConfig = configs[0];
      return true;
    }
    return false;
  }

  private loadMenuItems(items: MenuItem[]) {
    items.forEach((a) => {
      this.allMenuItems.push(a);
      if (a.code) {
        if (this.menuCodeItems[a.code]) throw new Error(`Duplicate menuCode: '${a.code}'`);
        this.menuCodeItems[a.code] = a;
      } else {
        if (a.route) this.menuRouteItems.push(a);
      }
      if (!this.menuPlacementSources[a.placement]) {
        this.menuPlacementSources[a.placement] = new BehaviorSubject<MenuItem[]>(null);
      }
      if (a.childItems) this.loadMenuItems(a.childItems);
    });
  }

  private validateConfig() {
    if (!this.config.screenSizeConfigs) {
      throw new Error('Navigation config should have at least one screen resolution option');
    }
    if (this.config.screenSizeConfigs.length == 0) {
      throw new Error('Navigation config should have at least one screen resolution option');
    }
    this.config.screenSizeConfigs.forEach((a) => {
      if (
        this.config.screenSizeConfigs.filter((b) => b.maxResolution === a.maxResolution).length > 1
      )
        throw new Error('Duplicate screen resolution options: ' + a.maxResolution);
    });
  }
}
