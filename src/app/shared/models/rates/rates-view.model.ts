import { BaseEntity } from "../base-entity.model";

export class RatesViewModel extends BaseEntity {
  public code: string;
  public description: string;
  public observation: string;
  public exchange_rate: number;
  public unit: string;
  public decimal: string;
}
