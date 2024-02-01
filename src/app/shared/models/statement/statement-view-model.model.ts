import { BaseEntity } from "../base-entity.model";
import { StatementStatus } from "../enums";

export class StatementViewModel extends BaseEntity {
  public year: number;
  public month: number;
  public ownerName: string;
  public status: StatementStatus;
  public locationName: string;
  public vatAmount: number;
  public totalInvoicedToBrokers: number;
  public totalInvoicedCash: number;
  public commission: number;
  public fee: number;
  public corrections: number;
  public toBeTransferred: number;
  public transferred: number;
  public amountDue: number;
  public brokerRebate: number;
}
