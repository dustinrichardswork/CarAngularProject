import { BaseEntity } from "../base-entity.model";

export class TransferListItem extends BaseEntity {
  public amount: number;
  public transferDate: Date;
  public currencyName: string;
}
