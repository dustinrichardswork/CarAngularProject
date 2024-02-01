import { BaseEntity } from "../base-entity.model";

export class CountryViewModel extends BaseEntity {
  public code: string;
  public description: string;
  public cashMovements: boolean;
  public tax_rate: number;
  public bookKeepingAccount: string;
  public unit: string;
  public decimal: string;
}
