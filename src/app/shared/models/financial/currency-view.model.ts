import { BaseEntity } from "../base-entity.model";

export class CurrencyViewModel extends BaseEntity {
  public code: string;
  public description: string;
  public exchange_rate: number;
  public unit: string;
  public decimal: string;
}
