export class MenuItemsCount {
  subfranchiseeCount;
  deductionsCount;
  statementsCount;
  commissionsCount;

  constructor(init?: Partial<MenuItemsCount>) {
    this.subfranchiseeCount = init.subfranchiseeCount ? init.subfranchiseeCount : null;
    this.deductionsCount = init.deductionsCount ? init.deductionsCount : null;
    this.statementsCount = init.statementsCount ? init.statementsCount : null;
    this.commissionsCount = init.commissionsCount ? init.commissionsCount : null;
  }
}
