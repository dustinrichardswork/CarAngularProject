import { UserRoles } from "../../../models/enums";
import { MenuItem } from "../navigation-config";

export class ReportsBigNavigationFactory {
  public static CreateMenu(): MenuItem {
    return new MenuItem({
      title: "Reports",
      route: "/reports",
      placement: "Top",
      roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
    });
  }
}
