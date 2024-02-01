import { AddressViewModel } from './address-view-model.model';
import { BaseEntity } from './base-entity.model';

export class SubFranchiseeViewModel extends BaseEntity {
  public name: string;
  public vatNumber: string;
  public address: AddressViewModel;
  public email: string;
  public franchiseeComission: number = 0;
  public currencyName: string;

  public parentUID: string;
}
