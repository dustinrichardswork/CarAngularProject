import { UserRoles } from "../../../models/enums";
import { MenuItem } from "../navigation-config";

export class FinancialNavigationFactory {
  public static CreateMenu(): MenuItem {
    return new MenuItem({
      title: "Registry",
      route: "/financial",
      placement: "Top",
      roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser, UserRoles.FranchiseeUser, UserRoles.FranchiseeAdmin],
      breadcrumbTitle: 'Registry',
      childItems: [
        new MenuItem({
          title: "Create Currency",
          route: "/financial/currency/new",
          useParentMenu: true,
          placement: "Side",
          breadcrumbTitle: 'Create Currency',
          code: "currency-create",
          icon: "fas fa-plus",
          subMenu: true,
          roles: [UserRoles.AddCarAdmin],
        }),
        new MenuItem({
          title: "Create Group",
          route: "/financial/groups/create",
          useParentMenu: true,
          placement: "Side",
          breadcrumbTitle: 'Create Group',
          code: "group-create",
          icon: "fas fa-plus",
          subMenu: true,
          roles: [UserRoles.AddCarAdmin],
        }),
        new MenuItem({
          title: "Create Country",
          route: "/financial/countries/create",
          useParentMenu: true,
          placement: "Side",
          breadcrumbTitle: 'Create Country',
          code: "country-create",
          icon: "fas fa-plus",
          subMenu: true,
          roles: [UserRoles.AddCarAdmin],
        }),
        new MenuItem({
          title: "Create Location",
          route: "/financial/locations/create",
          useParentMenu: true,
          placement: "Side",
          breadcrumbTitle: 'Create Location',
          code: "location-create",
          icon: "fas fa-plus",
          subMenu: true,
          roles: [UserRoles.AddCarAdmin],
        }),
        new MenuItem({
          title: "Create Rental Station",
          route: "/financial/rental_stations/new",
          useParentMenu: true,
          placement: "Side",
          breadcrumbTitle: 'Create Rental Station',
          code: "rental-station-create",
          icon: "fas fa-plus",
          subMenu: true,
          roles: [UserRoles.AddCarAdmin],
        }),
        new MenuItem({
          title: "Currencies",
          route: "/financial/currency/page",
          useParentMenu: true,
          placement: "Side",
          icon: "fas fa-money-bill",
          breadcrumbTitle: 'Currency List',
          roles: [UserRoles.AddCarAdmin],
          code: "currency-list",
          childItems: [
            new MenuItem({
              title: "Back to list",
              route: "/financial/currency/page",
              icon: "fas fa-backward",
              code: "currency-details",
              useParentMenu: true,
              breadcrumbTitle: "Currency Details",
              roles: [UserRoles.AddCarAdmin],
            }),
          ]
        }),
        new MenuItem({
          title: "Groups",
          route: "/financial/groups/page",
          useParentMenu: false,
          placement: "Side",
          icon: "fa fa-users",
          breadcrumbTitle: 'Group List',
          roles: [UserRoles.AddCarAdmin],
          childItems: [
            new MenuItem({
              title: "Back to list",
              route: "/financial/groups/page",
              icon: "fas fa-backward",
              code: "group-details",
              useParentMenu: true,
              breadcrumbTitle: "Group Details",
              roles: [UserRoles.AddCarAdmin],
            }),
          ]
        }),
        new MenuItem({
          title: "Countries",
          route: "/financial/countries/page",
          useParentMenu: false,
          placement: "Side",
          icon: "fas fa-globe",
          breadcrumbTitle: 'Country List',
          roles: [UserRoles.AddCarAdmin],
          childItems: [
            new MenuItem({
              title: "Back to list",
              route: "/financial/countries/page",
              icon: "fas fa-backward",
              code: "country-details",
              useParentMenu: true,
              breadcrumbTitle: "Country Details",
              roles: [UserRoles.AddCarAdmin],
            }),
          ]
        }),
        new MenuItem({
          title: "Locations",
          route: "/financial/locations/page",
          useParentMenu: false,
          placement: "Side",
          icon: "fas fa-map-marker",  
          breadcrumbTitle: 'Locations List',
          roles: [UserRoles.AddCarAdmin],
          childItems: [
            new MenuItem({
              title: "Back to list",
              route: "/financial/locations/page",
              icon: "fas fa-backward",
              code: "location-details",
              useParentMenu: true,
              breadcrumbTitle: "Locations Details",
              roles: [UserRoles.AddCarAdmin],
            }),
          ]
        }),
        // new MenuItem({
        //   title: "Rental Stations",
        //   route: "/financial/rental_stations/page",
        //   useParentMenu: false,
        //   placement: "Side",
        //   icon: "fas fa-car",
        //   breadcrumbTitle: 'Rental Stations List',
        //   roles: [UserRoles.AddCarAdmin],
        //   childItems: [
        //     new MenuItem({
        //       title: "Back to list",
        //       route: "/financial/rental_stations/page",
        //       icon: "fas fa-backward",
        //       code: "rental-stations-details",
        //       useParentMenu: true,
        //       breadcrumbTitle: "Rental Station Details",
        //       roles: [UserRoles.AddCarAdmin],
        //     }),
        //     // new MenuItem({
        //     //   title: "Currencies",
        //     //   route: "/financial/currency/page",
        //     //   useParentMenu: true,
        //     //   placement: "Side",
        //     //   icon: "fas fa-money-bill",
        //     //   breadcrumbTitle: 'Currency List',
        //     //   roles: [UserRoles.AddCarAdmin],
        //     // }),
        //     // new MenuItem({
        //     //   title: "Groups",
        //     //   route: "/financial/groups/page",
        //     //   useParentMenu: false,
        //     //   placement: "Side",
        //     //   icon: "fa fa-users",
        //     //   breadcrumbTitle: 'Group List',
        //     //   roles: [UserRoles.AddCarAdmin],
        //     // }),
        //     // new MenuItem({
        //     //   title: "Countries",
        //     //   route: "/financial/countries/page",
        //     //   useParentMenu: false,
        //     //   placement: "Side",
        //     //   icon: "fas fa-globe",
        //     //   breadcrumbTitle: 'Country List',
        //     //   roles: [UserRoles.AddCarAdmin],
        //     // })
        //   ]
        // })
      ]
    });
  }
}
