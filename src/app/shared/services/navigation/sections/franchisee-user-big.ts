import { MenuItem } from "../navigation-config";
import { ReservationsBigNavigationFactory } from "./reservations-big";
import { UserRoles } from "../../../models/enums";

export class FranchiseeUserBigNavigationFactory {  
  public static CreateMenu(): MenuItem[] {
    let login_data = JSON.parse(localStorage.getItem('login_data'));
    if(login_data['profile']['franchiseeUid']) {
      return [
        new MenuItem({
          title: "Details",
          route: "/franchisees/" + login_data['profile']['franchiseeUid'],
          placement: "Top",
          roles: [UserRoles.FranchiseeUser],
          childItems: [
            new MenuItem({
              title: "Storage",
              route: "/reports/dropbox",
              icon: "fas fa-hand-holding-usd",
              useParentMenu: false,
              placement: "Side",
              roles: [UserRoles.FranchiseeUser],
              childItems: [
              ]            
            }),
            new MenuItem({
              title: "Location list",
              route: "/locations/page",
              roles: [UserRoles.FranchiseeUser],
              icon: "fas fa-map-marked-alt",
              useParentMenu: false,
              placement: "Side",
            }),
          ]
        }),
        new MenuItem({
          title: "Subfranchisees",
          route: "/franchisees/" + login_data['profile']['franchiseeUid'] + '/subfranchisees/page',
          placement: "Top",
          code: 'subfranchisee-list',
          roles: [UserRoles.FranchiseeUser],
          childItems: [
            new MenuItem({
              title: "Create",
              route: "/franchisees/:franchiseeUid/subfranchisees/new",
              icon: "fas fa-plus",
              useParentMenu: false,
              placement: "Side",
              roles: [ UserRoles.FranchiseeAdmin],
              code: "subfranchisee-details",
              childItems: [
                new MenuItem({
                  title: "Back to list",
                  route: "/franchisees/:franchiseeUid/subfranchisees/page",
                  icon: "fas fa-backward",                
                  useParentMenu: false,
                  roles: [UserRoles.FranchiseeUser]
                }),
                new MenuItem({
                  title: "Deductions",
                  route: "/franchisees/:franchiseeUid/subfranchisee/:uid/deductions/page/1",
                  icon: "fas fa-hand-holding-usd",
                  useParentMenu: false,
                  roles: [UserRoles.FranchiseeUser],
                  code: 'subfranchisee-deduction-list',
                  childItems: [
                    new MenuItem({
                      title: "Back to subfranchisee",
                      route: "/franchisees/:franchiseeUid/subfranchisees/:subFranchiseeUid",
                      icon: "fas fa-backward",                
                      useParentMenu: false,
                      placement: "Side",
                      code: 'subfranchisee-deduction-details', 
                      roles: [UserRoles.FranchiseeUser]
                    }),
                  ]
                }),
                new MenuItem({
                  title: "Statements",
                  route: "/franchisees/:franchiseeUid/subfranchisee/:uid/statements/page/1",
                  icon: "fas fa-hand-holding-usd",
                  useParentMenu: false,
                  roles: [
                    UserRoles.FranchiseeUser,
                  ],
                  code: 'subfranchisee-statements-list',
                  childItems: [
                    new MenuItem({
                      title: "Back to subfranchisee",
                      route: "/franchisees/:franchiseeUid/subfranchisees/:subFranchiseeUid",
                      icon: "fas fa-backward",                
                      useParentMenu: false,
                      placement: "Side",
                      code: 'subfranchisee-statements-details', 
                      roles: [
                        UserRoles.FranchiseeUser,
                      ]
                    }),
                  ]
                })
              ]
            }),
          ]
        }),
        ReservationsBigNavigationFactory.CreateMenu()
      ]
    } else if(login_data['profile']['subFranchiseeUid']) {
      return [
        new MenuItem({
          title: "Details",
          route: "/franchisees/subfranchisee/" + login_data['profile']['subFranchiseeUid'],
          placement: "Top",
          roles: [UserRoles.FranchiseeUser],
          childItems: [
            new MenuItem({
              title: "Deductions",
              route: "/franchisees/subfranchisee/:uid/deductions/page/1",
              icon: "fas fa-hand-holding-usd",
              useParentMenu: false,
              placement: "Side",
              code: 'subfranchisee-deduction-list',
              roles: [UserRoles.FranchiseeUser],
              childItems: [
                new MenuItem({
                  title: "Back to subfranchisee",
                  route: "/franchisees/subfranchisee/" + login_data['profile']['subFranchiseeUid'],
                  icon: "fas fa-backward",                
                  useParentMenu: false,
                  code: 'subfranchisee-deduction-details', 
                  roles: [UserRoles.FranchiseeUser]
                }),
              ]
            }),
            new MenuItem({
              title: "Statements",
              route: "/franchisees/subfranchisee/:uid/statements/page/1",
              icon: "fas fa-hand-holding-usd",
              useParentMenu: false,
              placement: "Side",
              roles: [UserRoles.FranchiseeUser],
              code: 'subfranchisee-statements-list',
              childItems: [
                new MenuItem({
                  title: "Back to subfranchisee",
                  route: "/franchisees/subfranchisee/:subFranchiseeUid",
                  icon: "fas fa-backward",
                  useParentMenu: false,
                  placement: "Side",
                  code: 'subfranchisee-statements-details',
                  roles: [UserRoles.FranchiseeUser]
                }),
              ]
            })
          ]
        }),
        new MenuItem({
          title: "Storage",
          route: "/reports/dropbox",
          icon: "fas fa-hand-holding-usd",
          useParentMenu: false,
          placement: "top",
          roles: [UserRoles.FranchiseeUser],
          childItems: [
          ]            
        }),
        new MenuItem({
          title: "Locations",
          route: "/locations/page",
          roles: [UserRoles.FranchiseeUser],
          icon: "fas fa-map-marked-alt",
          useParentMenu: false,
          placement: "top",
        }),
        ReservationsBigNavigationFactory.CreateMenu(),
      ]
    }
    
  }
}