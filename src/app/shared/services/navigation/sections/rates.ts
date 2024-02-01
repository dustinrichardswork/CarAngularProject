import { UserRoles } from "../../../models/enums";
import { MenuItem } from "../navigation-config";

export class RatesNavigationFactory {
  public static CreateMenu(): MenuItem {
    return new MenuItem({
      title: "Rates",
      route: "/rates/page",
      placement: "Top",
      roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeUser, UserRoles.FranchiseeAdmin],
      childItems: [
        new MenuItem({
          title: "Create Rate",
          route: "/rates/create",
          useParentMenu: true,
          placement: "Side",
          icon: "fas fa-plus", 
          breadcrumbTitle: 'Create',
          roles: [UserRoles.AddCarAdmin],
          subMenu: true,
          code: "rate-create",
        }),
        new MenuItem({
          title: "Create Extra",
          route: "/rates/extras/new",
          useParentMenu: true,
          placement: "Side",
          icon: "fas fa-plus",
          roles: [UserRoles.AddCarAdmin],
          subMenu: true,
          breadcrumbTitle: 'Create Extra',
          code: "extra-create"
        }),
        new MenuItem({
          title: "Cretae Oneway",
          // route: "/rates/oneway/create",
          useParentMenu: true,
          placement: "Side",
          icon: "fas fa-plus", 
          breadcrumbTitle: 'Create Oneway',
          code: 'oneway-create',
          roles: [UserRoles.AddCarAdmin],
          subMenu: true,
        }),
        new MenuItem({
          title: "Rates",
          route: "/rates/page",
          useParentMenu: true,
          placement: "Side",
          icon:"fas fa-tag",
          breadcrumbTitle: 'List',
          roles: [UserRoles.AddCarAdmin],
          childItems: [
            // new MenuItem({
            //   title: "Back to list",
            //   route: "/rates/page",
            //   icon: "fas fa-backward",
            //   code: "rates-details",
            //   useParentMenu: true,
            //   breadcrumbTitle: "Rates Details",
            //   roles: [UserRoles.AddCarAdmin],
            // }),
            // new MenuItem({
            //   title: "Extra",
            //   route: "/rates/extras/new",
            //   useParentMenu: true,
            //   icon: "fas fa-plus",
            //   breadcrumbTitle: "Create Extra",
            //   roles: [UserRoles.AddCarAdmin],
            // }),
            // new MenuItem({
            //   title: "Extras",
            //   route: "/rates/extras/page",
            //   useParentMenu: true,
            //   icon: "fas fa-puzzle-piece",
            //   roles: [UserRoles.AddCarAdmin],
            // }),
          ]
        }),
        new MenuItem({
          title: "Extras",
          route: "/rates/extras/page",
          useParentMenu: true,
          placement: "Side",
          icon: "fas fa-puzzle-piece",
          breadcrumbTitle: 'Extras',
          code: "extras",
          roles: [UserRoles.AddCarAdmin],
          childItems: [
            // new MenuItem({
            //   title: "Back to list",
            //   route: "/rates/page",
            //   icon: "fas fa-backward",
            //   code: "rates-details",
            //   useParentMenu: true,
            //   breadcrumbTitle: "Rates Details",
            //   roles: [UserRoles.AddCarAdmin],
            // }),
            // new MenuItem({
            //   title: "Extra",
            //   route: "/rates/extras/new",
            //   useParentMenu: true,
            //   icon: "fas fa-plus",
            //   breadcrumbTitle: "Create Extra",
            //   roles: [UserRoles.AddCarAdmin],
            // }),
            // new MenuItem({
            //   title: "Extras",
            //   route: "/rates/extras/page",
            //   useParentMenu: true,
            //   icon: "fas fa-puzzle-piece",
            //   roles: [UserRoles.AddCarAdmin],
            // }),
          ]
        }),
        new MenuItem({
          title: "Allotments",
          route: "/rates/allotments",
          useParentMenu: false,
          placement: "Side",
          icon: "fas fa-bus",
          breadcrumbTitle: 'Allotments',
          code: 'allotments',
          roles: [UserRoles.AddCarAdmin],
          childItems: [
            new MenuItem({
              title: "Back to list",
              route: "/rates/page",
              icon: "fas fa-backward",
              // code: "rates-details",
              useParentMenu: true,
              breadcrumbTitle: "Rates Details",
              
              roles: [UserRoles.AddCarAdmin],
            }),
            new MenuItem({
              title: "Create Allotment",
              icon: "fas fa-plus",
              code: 'allotment-create',
              useParentMenu: true,
              roles: [UserRoles.AddCarAdmin],
            })
          ]
        }),
        new MenuItem({
          title: "Oneway",
          route: "/rates/oneway",
          useParentMenu: true,
          placement: "Side",
          icon: "fas fa-arrow-right", 
          breadcrumbTitle: 'Oneway',
          code: 'oneway',
          roles: [UserRoles.AddCarAdmin],
        }),
      ]
    });
  }
}
