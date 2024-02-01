import { StatementStatus } from "../enums";
import { BaseEntity } from "../base-entity.model";

export class StatementSummaryViewModel extends BaseEntity {
  public status: StatementStatus;
  public vatAmount: number = 0;
  public totalInvoicedToBrokers: number = 0;
  public totalInvoicedCash: number = 0;
  public commission: number = 0;
  public fee: number = 0;
  public corrections: number = 0;
  public transferred: number = 0;
  public toBeTransferred: number = 0;
  public alreadyTransferred: number = 0;
  public brokerRebate: number = 0;
  public amountDue: number = 0;
  public ownerName: string;
  public locationName: string;
  public changesAfterClosed: number = 0;
  public toBeTransferredOnClosing: number = 0;
  public globalBalance: number = 0;
}
