import { BaseEntity } from '../base-entity.model';
import { BrokerInvoiceStatus } from '../enums';

export class BrokerInvoiceListItem extends BaseEntity {
  public brokerName: string;
  public totalAmount: number;
  public currencyName: string;
  public status: BrokerInvoiceStatus;
  public dueDate: Date;
  public invoiceNumber: string;
  public hasTemplate: boolean;
  public hasArchive: boolean;
  public hasInvoiceExcel: boolean;
  public hasIncorrectData: boolean;
  public warning: string;
  public isSentToBroker: boolean;
  public canSendToBroker: boolean;
  public isUploadedByUser: boolean;
}
