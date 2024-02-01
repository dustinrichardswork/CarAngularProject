import { Route } from "@angular/router";
import { MenuItem } from "../services/navigation/navigation-config";

export interface NamedRoute extends Route {
  menuCode?: string;
  menuCallback?: (item: MenuItem) => void;
}

export declare type NamedRoutes = NamedRoute[]
