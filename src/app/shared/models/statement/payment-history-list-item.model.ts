import { BaseEntity } from "../base-entity.model";
import { PaymentHistoryItemType } from "../enums";

export class PaymentHistoryListItem extends BaseEntity {
  public itemType: PaymentHistoryItemType;
  public amount: number;
  public balance: number;
  public effectiveDate: Date;
  public description: string;
  public currencyName: string;
  public isInvoiceCreated: boolean;
  public isInvoiceFailed: boolean;
  public vendorInvoiceJournalEntry: number;
}
