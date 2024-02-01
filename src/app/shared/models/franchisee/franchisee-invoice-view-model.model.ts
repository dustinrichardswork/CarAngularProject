import { BaseEntity } from '../base-entity.model';
import { FranchiseeInvoiceStatus } from '../enums';

export class FranchiseeInvoiceViewModel extends BaseEntity {
  public franchiseeName: string;
  public totalAmount: number;
  public currencyName: string;
  public status: FranchiseeInvoiceStatus;
  public dueDate: Date;
  public invoiceNumber: string;
  public referenceId: string;
  public description: string;

}
