import {UserRoles} from "../../models/enums";
import {MenuItem, NavigationConfig, NavigationScreenSizeConfig} from "./navigation-config";
import { FranchiseeAdminBigNavigationFactory } from "./sections/franchisee-admin-big";
import { FranchiseeUserBigNavigationFactory } from "./sections/franchisee-user-big";
import { ReservationsBigNavigationFactory } from "./sections/reservations-big";
import { FinancialNavigationFactory } from "./sections/financial";
import { RatesNavigationFactory } from "./sections/rates";

export class AppNavigation {
  franchiseeId = 'a';
  constructor() {

  }

  public static LoadConfig(): NavigationConfig {
    let login_data = JSON.parse(localStorage.getItem('login_data'));
    let menuItems = [];
    if(!login_data) menuItems = [];
    else {
      let role = login_data['role'];
      
      menuItems = [
        RatesNavigationFactory.CreateMenu(),
        FinancialNavigationFactory.CreateMenu(),
        
        //ReservationsBigNavigationFactory.CreateMenu()
      ];
      // if(role == UserRoles.AddCarAdmin) {
      //   menuItems = [
      //     RatesNavigationFactory.CreateMenu(),
      //     FinancialNavigationFactory.CreateMenu(),
          
      //     //ReservationsBigNavigationFactory.CreateMenu()
      //   ];
      // } else if(role == UserRoles.FranchiseeAdmin) {
      //   menuItems = FranchiseeAdminBigNavigationFactory.CreateMenu();
      // } else if(role == UserRoles.FranchiseeUser){
      //   menuItems = FranchiseeUserBigNavigationFactory.CreateMenu();
      // }
    }

    return new NavigationConfig({
      screenSizeConfigs: [
        new NavigationScreenSizeConfig({
          // Default menu config for the big screens
          showTopMenu: true,
          menuItems: menuItems
        }),
        new NavigationScreenSizeConfig({
          maxResolution: 990, //Small and middle screens
          showTopMenu: true,
          menuItems: [
            new MenuItem({
              title: "Administration",
              route: "/users",
              placement: "Top",
              roles: [UserRoles.AddCarAdmin, UserRoles.FranchiseeAdmin],
              childItems: [
                new MenuItem({
                  title: "Create a user",
                  route: "/users/invite-user",
                  roles: [UserRoles.AddCarAdmin, UserRoles.FranchiseeAdmin],
                  activeExact: true,
                  icon: "fas fa-plus",
                  placement: "Side",
                }),
                new MenuItem({
                  title: "User list",
                  route: "/users/page",
                  roles: [UserRoles.AddCarAdmin, UserRoles.FranchiseeAdmin],
                  placement: "Side",
                  icon: "fas fa-list",
                }),
                new MenuItem({
                  title: "Storage",
                  route: "/reports/dropbox",
                  roles: [UserRoles.AddCarAdmin],
                  icon: "far fa-images",
                  useParentMenu: true,
                  placement: "Side",
                }),
                new MenuItem({
                  title: "Payments overview",
                  route: "/payment-overview/by-franchisees",
                  roles: [UserRoles.AddCarAdmin],
                  icon: "fas fa-file-invoice-dollar",
                  useParentMenu: true,
                  placement: "Side",
                }),
                new MenuItem({
                  title: "Location list",
                  route: "/locations",
                  roles: [UserRoles.AddCarAdmin],
                  icon: "fas fa-map",
                  useParentMenu: true,
                  placement: "Side",
                })
              ]
            }),
            new MenuItem({
              title: "Franchisees",
              route: "/franchisees",
              roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
              placement: "Top",
              breadcrumbTitle: 'Franchisees',
              childItems: [
                new MenuItem({
                  title: "Franchisee list",
                  route: "/franchisees/page",
                  icon: "fas fa-list-ul",
                  placement: "Side",
                  useParentMenu: true,
                  roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                  code: "franchisee-list",
                  breadcrumbTitle: 'List',
                  childItems: [
                    new MenuItem({
                      title: "Back to list",
                      route: "/franchisees/page",
                      icon: "fas fa-backward",
                      code: "franchisee-details",
                      roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                      useParentMenu: true,
                    }),
                    new MenuItem({
                      title: "Subfranchisees",
                      route: "/franchisees/:uid/subfranchisees/page",
                      icon: "fas fa-map-marker",
                      code: "subfranchisee-list",
                      useParentMenu: false,
                      roles: [
                        UserRoles.AddCarAdmin,
                        UserRoles.AddCarUser,
                        UserRoles.FranchiseeAdmin,
                        UserRoles.FranchiseeUser,
                      ],
                      childItems: [
                        new MenuItem({
                          title: "Back to franchisee",
                          route: "/franchisees/:franchiseeUid",
                          icon: "fas fa-backward",
                          useParentMenu: false,
                          roles: [
                            UserRoles.AddCarAdmin,
                            UserRoles.AddCarUser,
                            UserRoles.FranchiseeAdmin,
                            UserRoles.FranchiseeUser,
                          ],
                        }),
                        new MenuItem({
                          title: "Create",
                          route: "/franchisees/:franchiseeUid/subfranchisees/new",
                          icon: "fas fa-plus",
                          useParentMenu: false,
                          roles: [
                            UserRoles.AddCarAdmin,
                            UserRoles.AddCarUser,
                            UserRoles.FranchiseeAdmin,
                          ],
                          childItems: [
                            new MenuItem({
                              title: "Back to list",
                              route: "/franchisees/:franchiseeUid/subfranchisees/page",
                              icon: "fas fa-backward",
                              code: "subfranchisee-details",
                              useParentMenu: false,
                              roles: [
                                UserRoles.AddCarAdmin,
                                UserRoles.AddCarUser,
                                UserRoles.FranchiseeAdmin,
                                UserRoles.FranchiseeUser,
                              ],
                              childItems: [
                                new MenuItem({
                                  title: "Back to franchisee",
                                  route: "/franchisees/:franchiseeUid",
                                  icon: "fas fa-backward",
                                  useParentMenu: true,
                                  roles: [
                                    UserRoles.AddCarAdmin,
                                    UserRoles.AddCarUser,
                                    UserRoles.FranchiseeAdmin,
                                    UserRoles.FranchiseeUser,
                                  ],
                                }),
                                new MenuItem({
                                  title: "Back to list",
                                  route: "/franchisees/:franchiseeUid/subfranchisees/page",
                                  icon: "fas fa-backward",
                                  useParentMenu: true,
                                  roles: [
                                    UserRoles.AddCarAdmin,
                                    UserRoles.AddCarUser,
                                    UserRoles.FranchiseeAdmin,
                                    UserRoles.FranchiseeUser,
                                  ],
                                }),
                                new MenuItem({
                                  title: "Deductions",
                                  route: "/franchisees/subfranchisee/:uid/deductions/page/1",
                                  icon: "fas fa-hand-holding-usd",
                                  useParentMenu: false,
                                  roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                                }),
                                new MenuItem({
                                  title: "Statements",
                                  route: "/franchisees/subfranchisee/:uid/statements/page/1",
                                  icon: "fas fa-hand-holding-usd",
                                  useParentMenu: false,
                                  roles: [
                                    UserRoles.AddCarAdmin,
                                    UserRoles.AddCarUser,
                                    UserRoles.FranchiseeAdmin,
                                  ],
                                })
                              ]
                            }),
                          ]
                        })
                      ]
                    }),
                    new MenuItem({
                      title: "Deductions",
                      route: "/franchisees/:uid/deductions/page/1",
                      icon: "fas fa-hand-holding-usd",
                      useParentMenu: false,
                      roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                      childItems: [
                        new MenuItem({
                          title: "Back to franchisee",
                          route: "/franchisees/:franchiseeUid",
                          icon: "fas fa-backward",
                          useParentMenu: true,
                          roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                          code: "deduction-list",
                        }),
                        new MenuItem({
                          title: "Create",
                          route: "/franchisees/:franchiseeUid/deductions/new",
                          roles: [UserRoles.AddCarAdmin, UserRoles.FranchiseeAdmin],
                          icon: "fas fa-plus",
                          childItems: [
                            new MenuItem({
                              title: "Back to franchisee",
                              route: "/franchisees/:franchiseeUid",
                              icon: "fas fa-backward",
                              useParentMenu: true,
                              roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                              code: "deduction-details",
                            }),
                            new MenuItem({
                              title: "Deduction list",
                              route: "/franchisees/:franchiseeUid/deductions/page/1",
                              icon: "fas fa-list-ul",
                              useParentMenu: true,
                              roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                            })
                          ]
                        }),
                      ]
                    }),
                    new MenuItem({
                      title: "Statements",
                      route: "/franchisees/:uid/statements/page/1",
                      icon: "fas fa-hand-holding-usd",
                      useParentMenu: false,
                      childItems: [
                        new MenuItem({
                          title: "Back to franchisee",
                          route: "/franchisees/:franchiseeUid",
                          icon: "fas fa-backward",
                          useParentMenu: true,
                          code: "statement-list",
                          childItems: [
                            new MenuItem({
                              title: "Back to franchisee",
                              route: "/franchisees/:franchiseeUid",
                              icon: "fas fa-backward",
                              useParentMenu: true,
                              code: "statement-details",
                            }),
                            new MenuItem({
                              title: "Statement list",
                              route: "/franchisees/:franchiseeUid/statements/page/1",
                              icon: "fas fa-list-ul",
                              useParentMenu: true,
                            }),
                          ]
                        }),
                      ]
                    }),
                    new MenuItem({
                      title: "Fees & Commmissions",
                      route: "/franchisees/:uid/commissions/page/1",
                      icon: "fas fa-hand-holding-usd",
                      useParentMenu: false,
                      roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                      childItems: [
                        new MenuItem({
                          title: "Back to franchisee",
                          route: "/franchisees/:franchiseeUid",
                          icon: "fas fa-backward",
                          useParentMenu: true,
                          code: "commission-list",
                          roles: [
                            UserRoles.AddCarAdmin,
                            UserRoles.AddCarUser,
                            UserRoles.FranchiseeAdmin,
                          ],
                        }),
                        new MenuItem({
                          title: "Create",
                          route: "/franchisees/:franchiseeUid/commissions/new",
                          roles: [UserRoles.AddCarAdmin, UserRoles.FranchiseeAdmin],
                          icon: "fas fa-plus",
                          childItems: [
                            new MenuItem({
                              title: "Back to franchisee",
                              route: "/franchisees/:franchiseeUid",
                              icon: "fas fa-backward",
                              useParentMenu: true,
                              code: "commission-details",
                              roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                            }),
                            new MenuItem({
                              title: "Fees & commissions list",
                              route: "/franchisees/:franchiseeUid/commissions/page/1",
                              icon: "fas fa-list-ul",
                              useParentMenu: true,
                              roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                            }),
                          ]
                        }),
                      ]
                    }),
                    new MenuItem({
                      title: "Invoices",
                      route: "/franchisees/:uid/invoices/page/1",
                      icon: "fas fa-hand-holding-usd",
                      useParentMenu: false,
                      roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                      childItems: [
                        new MenuItem({
                          title: "Back to franchisee",
                          route: "/franchisees/:franchiseeUid",
                          icon: "fas fa-backward",
                          useParentMenu: true,
                          code: "invoice-list",
                          roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                          childItems: [
                            new MenuItem({
                              title: "Back to franchisee",
                              route: "/franchisees/:franchiseeUid",
                              icon: "fas fa-backward",
                              useParentMenu: true,
                              code: "franchisee-invoice-details",
                              roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                            }),
                            new MenuItem({
                              title: "Invoice list",
                              route: "/franchisees/:franchiseeUid/invoices/page/1",
                              icon: "fas fa-list-ul",
                              useParentMenu: true,
                              roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                            }),
                          ]
                        }),
                      ]
                    })
                  ]
                }),
                // new MenuItem({
                //   title: "Location list",
                //   route: "/locations/page",
                //   roles: [UserRoles.AddCarAdmin, UserRoles.FranchiseeAdmin],
                //   icon: "fas fa-map-marked-alt",
                //   placement: "Side",
                //   useParentMenu: true,
                // }),
                // new MenuItem({
                //   title: "Payment overview",
                //   route: "/payment-overview/by-franchisees",
                //   roles: [UserRoles.AddCarAdmin],
                //   icon: "fas fa-file-invoice-dollar",
                //   useParentMenu: true,
                //   placement: "Side",
                // }),
                new MenuItem({
                  title: "Quality screenshots",
                  route: "/reports/quality-screenshots",
                  roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                  icon: "fas fa-chart-bar",
                  useParentMenu: true,
                  placement: "Side",
                }),
              ]
            }),
            new MenuItem({
              title: "Brokers",
              route: "/brokers",
              roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
              placement: "Top",
              childItems: [
                new MenuItem({
                  title: "List",
                  route: "/brokers/page/1",
                  roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
                  icon: "fas fa-list-ul",
                  useParentMenu: true,
                  placement: "Side",
                }),
                new MenuItem({
                  title: "Template Fields",
                  route: "/brokers/codebook/excel-template-fields",
                  roles: [UserRoles.AddCarAdmin],
                  icon: "far fa-list-alt",
                  useParentMenu: true,
                  placement: "Side",
                }),
                new MenuItem({
                  title: "Create invoices",
                  route: "/brokers/creation-list/page/1",
                  roles: [UserRoles.AddCarAdmin],
                  icon: "fas fa-hand-holding-usd",
                  useParentMenu: true,
                  placement: "Side",
                }),
              ]
            }),
            new MenuItem({
              title: "Reservations",
              route: "/reservations",
              placement: "Top",
              roles: [
                UserRoles.AddCarAdmin,
                UserRoles.AddCarUser,
                UserRoles.FranchiseeUser,
                UserRoles.FranchiseeAdmin,
              ],
              childItems: [
                new MenuItem({
                  title: "Reservations list",
                  route: "/reservations",
                  roles: [
                    UserRoles.AddCarAdmin,
                    UserRoles.AddCarUser,
                    UserRoles.FranchiseeUser,
                    UserRoles.FranchiseeAdmin,
                  ],
                  icon: "fas fa-list",
                  placement: "Side",
                }),
              ]
            }),
            new MenuItem({
              title: "Reports",
              route: "/reports",
              placement: "Top",
              roles: [UserRoles.AddCarAdmin, UserRoles.AddCarUser],
              childItems: [
                new MenuItem({
                  title: "Reports list",
                  route: "/reports",
                  roles: [
                    UserRoles.AddCarAdmin,
                    UserRoles.AddCarUser,
                    UserRoles.FranchiseeUser,
                    UserRoles.FranchiseeAdmin,
                  ],
                  icon: "fas fa-list",
                  placement: "Side",
                }),
              ]
            })
          ]
        })
      ]
    });
  }
}
