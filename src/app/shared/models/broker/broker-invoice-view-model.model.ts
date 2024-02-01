import { BaseEntity } from '../base-entity.model';
import { BrokerInvoiceStatus } from '../enums';

export class BrokerInvoiceViewModel extends BaseEntity {
  public brokerName: string;
  public totalAmount: number;
  public currencyName: string;
  public status: BrokerInvoiceStatus;
  public dueDate: Date;
  public invoiceNumber: string;
  public isUploadedByUser: boolean;
}
