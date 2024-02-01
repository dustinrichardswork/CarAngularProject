import { UserRoles } from "../../../models/enums";
import { MenuItem } from "../navigation-config";

export class ReservationsBigNavigationFactory {
  public static CreateMenu(): MenuItem {
    return new MenuItem({
      title: "Reservations",
      route: "/reservations",
      placement: "Top",
      roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeUser, UserRoles.FranchiseeAdmin],
    });
  }
}
