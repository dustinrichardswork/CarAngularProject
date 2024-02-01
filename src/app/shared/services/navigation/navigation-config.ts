import {UserRoles} from "../../models/enums";

export class MenuItem {
  public constructor(init?: Partial<MenuItem>) {
    Object.assign(this, init);
    if (this.childItems)
      this.childItems.forEach(a => {
        a.parentItem = this;
        if (!a.placement)
          a.placement = this.placement;
      });
    this.activeOptions = { exact: this.activeExact };
  }

  title: string;
  route: string;
  activeExact = false;
  roles: UserRoles[] = [];
  childItems: MenuItem[];
  breadcrumbTitle: string;
  disableBreadcrumb: boolean = false;
  pageCallback: any;
  icon: string;
  useParentMenu: boolean = false;
  parentItem: MenuItem;
  count: number;
  placement: string;
  code: string;
  hiddenFlagName: string;
  isHidden = false;
  activeOptions = { exact: false };
  subMenu: boolean;

  public getPlacement(): string {
    if (this.placement)
      return this.placement.toLowerCase();
    if (this.parentItem)
      return this.parentItem.getPlacement();
    return undefined;
  }
}

export interface BreadcrumbMenu {
  title: string;
  link: string;
}
export class NavigationConfig {
  public constructor(init?: Partial<NavigationConfig>) {
    Object.assign(this, init);
  }

  screenSizeConfigs: NavigationScreenSizeConfig[] = [];
}

export class NavigationScreenSizeConfig {
  public constructor(init?: Partial<NavigationScreenSizeConfig>) {
    Object.assign(this, init);
  }

  maxResolution: number = Number.MAX_SAFE_INTEGER;
  menuItems: MenuItem[] = [];
  showTopMenu: boolean = true;
}
