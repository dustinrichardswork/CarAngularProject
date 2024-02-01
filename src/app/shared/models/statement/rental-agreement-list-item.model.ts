import { BaseEntity } from "../base-entity.model";

export class RentalAgreementListItem extends BaseEntity {
  public brokerName: string;
  public number: string;
  public startDate: Date;
  public endDate: Date;
  public totalValue: number;
  public days: number;
  public extrasInvoice: number;
  public extrasCash: number;
  public daysInvoice: number;
  public daysCashier: number;
  public creditNote: number;
  public debitNote: number;
  public invoiceNumber: string;
  public cashInvoiceNumber: string;
  public creditNoteNumber: string;
  public currencyName: string;
  public processingErrors: string;
  public isPaidToFranchisee: boolean;
}
