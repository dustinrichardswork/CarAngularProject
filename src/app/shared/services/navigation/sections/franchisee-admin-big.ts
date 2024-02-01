import { UserRoles } from "app/shared/models/enums";
import { MenuItem } from "../navigation-config";
import { ReservationsBigNavigationFactory } from "./reservations-big";

export class FranchiseeAdminBigNavigationFactory {
  public static CreateMenu(): MenuItem[] {
    let login_data = JSON.parse(localStorage.getItem('login_data'));
    return [
      new MenuItem({
        title: "Details",
        route: "/franchisees/" +  login_data['profile']['franchiseeUid'],
        placement: "Top",
        activeExact: true,
        roles: [UserRoles.FranchiseeAdmin],
        childItems: [
          new MenuItem({
            title: "Deductions",
            route: "/franchisees/:uid/deductions/page",
            icon: "fas fa-hand-holding-usd",
            useParentMenu: false,
            placement: "Side",
            roles: [UserRoles.FranchiseeAdmin],
            childItems: [
              new MenuItem({
                title: "Back to franchisee",
                route: "/franchisees/:franchiseeUid",
                icon: "fas fa-backward",
                useParentMenu: false,
                roles: [UserRoles.FranchiseeAdmin],
                code: "deduction-list",
              }),
            ]
          }),
          new MenuItem({
            title: "Statements",
            route: "/franchisees/:uid/statements/page/1",
            icon: "fas fa-hand-holding-usd",
            useParentMenu: false,
            placement: "Side",
            roles: [UserRoles.FranchiseeAdmin],
            childItems: [
              new MenuItem({
                title: "Back to franchisee",
                route: "/franchisees/:franchiseeUid",
                icon: "fas fa-backward",
                useParentMenu: true,
                roles: [UserRoles.FranchiseeAdmin],
                code: "statement-list",
              }),
            ]
          }),
          new MenuItem({
            title: "Fees & Commmissions",
            route: "/franchisees/:uid/commissions/page/1",
            icon: "fas fa-hand-holding-usd",
            useParentMenu: false,
            placement: "Side",
            roles: [UserRoles.FranchiseeAdmin],
            childItems: [
              new MenuItem({
                title: "Back to franchisee",
                route: "/franchisees/:franchiseeUid",
                icon: "fas fa-backward",
                useParentMenu: true,
                roles: [UserRoles.FranchiseeAdmin],
                code: "commission-list",
              })
            ]
          }),
          new MenuItem({
            title: "Storage",
            route: "/reports/dropbox",
            icon: "fas fa-hand-holding-usd",
            useParentMenu: false,
            placement: "Side",
            roles: [UserRoles.FranchiseeAdmin],
            childItems: [
              new MenuItem({
                title: "Back to franchisee",
                route: "/franchisees/:franchiseeUid",
                icon: "fas fa-backward",
                useParentMenu: true,
                roles: [UserRoles.FranchiseeAdmin],
              })
            ]
            
          })
        ]
      }),
      new MenuItem({
        title: "Subfranchisees",
        route: "/franchisees/" + login_data['profile']['franchiseeUid'] + '/subfranchisees/page',
        placement: "Top",
        code: 'subfranchisee-list',
        roles: [UserRoles.FranchiseeAdmin],
        activeExact: true,
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
                roles: [
                  UserRoles.FranchiseeAdmin,
                ]
              }),
              new MenuItem({
                title: "Deductions",
                route: "/franchisees/:franchiseeUid/subfranchisee/:uid/deductions/page/1",
                icon: "fas fa-hand-holding-usd",
                useParentMenu: false,
                roles: [UserRoles.FranchiseeAdmin],
                code: 'subfranchisee-deduction-list',
                childItems: [
                  new MenuItem({
                    title: "Back to subfranchisee",
                    route: "/franchisees/:franchiseeUid/subfranchisees/:subFranchiseeUid",
                    icon: "fas fa-backward",                
                    useParentMenu: false,
                    placement: "Side",
                    code: 'subfranchisee-deduction-details', 
                    roles: [
                      UserRoles.FranchiseeAdmin,
                    ]
                  }),
                ]
              }),
              new MenuItem({
                title: "Statements",
                route: "/franchisees/:franchiseeUid/subfranchisee/:uid/statements/page/1",
                icon: "fas fa-hand-holding-usd",
                useParentMenu: false,
                roles: [
                  UserRoles.FranchiseeAdmin,
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
                      UserRoles.FranchiseeAdmin,
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
  }
}