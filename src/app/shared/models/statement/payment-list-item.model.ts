import { BaseEntity } from "../base-entity.model";

export class PaymentListItem extends BaseEntity {
  public amount: number;
  public payDate: Date;
  public note: string;
  public currencyName: string;
}
