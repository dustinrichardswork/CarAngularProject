import { BaseEntity } from "../base-entity.model";

export class DeductionListItem extends BaseEntity {
  public refNum: string;
  public year: number;
  public brokerName: string;
  public month: number;
  public locationName: string;
  public reason: string;
  public amount: number;
  public currencyName: string;
  public subfranchiseeName: string;
}
