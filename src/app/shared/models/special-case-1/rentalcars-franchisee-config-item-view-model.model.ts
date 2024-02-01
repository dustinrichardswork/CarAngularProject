import { BaseEntity } from "../base-entity.model";

export class RentalcarsFranchiseeConfigItemViewModel extends BaseEntity {
  public brokerName: string;
  public franchiseeName: string;
  public franchiseeUID: string;
  public isVatInvoice: boolean;
  public brokerVatNumber: string;
  public currencyUID: string;
  public conversionRate: number;
  public brokerAddress: string;
  public email: string;
}
