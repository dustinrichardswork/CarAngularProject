import { StatementStatus } from "../enums";
import { BaseEntity } from "../base-entity.model";

export class StatementListItem extends BaseEntity {
  public ownerName: string;
  public year: number;
  public month: number;
  public status: StatementStatus;
  public totalInvoicedToBrokers: number;
  public toBeTransferred: number;
  public alreadyTransferred: number;
  public currencyName: string;
  public canRecalculate: boolean;
  public canPublish: boolean;
}
