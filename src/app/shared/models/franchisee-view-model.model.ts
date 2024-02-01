import { BaseEntity } from './base-entity.model';
import { AddressViewModel } from './address-view-model.model';

export class FranchiseeViewModel extends BaseEntity {
  public name: string;
  public legalName: string;
  public vatNumber: string;
  public address: AddressViewModel;
  public email: string;
  public customerNumber: string;
  public franchiseeComission: number;
  public accountNumber: string;
  public bankAccountSwift: string;
  public bankAccountIban: string
  public minCommissionPerReservation: number;
  public isAlgorithmEnabled: boolean;

  public subfranchiseeCount = 0;
  public deductionsCount = 0;
  public statementsCount = 0;
  public commissionsCount = 0;
}
