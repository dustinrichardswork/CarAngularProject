import { BaseEntity } from "../base-entity.model";


export class CurrencyHistoryListItem extends BaseEntity {
  public code: string;
  public date: string;
  public exchange_rate: string;
  public description: string;
  public unit: string;
  public decimal: string;
}
