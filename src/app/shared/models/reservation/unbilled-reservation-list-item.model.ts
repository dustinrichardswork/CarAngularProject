import { BaseEntity } from "../base-entity.model";

export class UnbilledReservationListItem extends BaseEntity {
  public currencyName: string;
  public amount: number;
}
