import { BaseEntity } from "../base-entity.model";

export class DeductionViewModel extends BaseEntity {
  public refNum: string;
  public year: number;
  public month: number;
  public franchiseeUid: string;
  public brokerUid: string;
  public reason: string;
  public amount: number;
  public insertedBy: string;
  public subfranchiseeName: string;
}
