import { BaseEntity } from './base-entity.model';
import { AddressViewModel } from './address-view-model.model';
import { DiscountTypes, BrokerForwardingMethods } from './enums';

export class BrokerViewModel extends BaseEntity {
  public name: string;
  public vatNumber: string;
  public customerNumber: number;
  public address: AddressViewModel;
  public email: string;
  public paymentTerms = 14;
  public discountType: DiscountTypes;
  public discountValue: number;
  public forwardingMethod: BrokerForwardingMethods;
  public hasInvoiceTemplate: boolean;
  public isInvoicePerFranchisee: boolean;
  public isGroupedByVat: boolean;
  public canHaveInvoices: boolean;
  public isRentalcars: any;
}
