import { BaseEntity } from './base-entity.model';

export class BrokerListItem extends BaseEntity {
  public name: string;
  public vatNumber: string;
  public jimpiClientId: number | null;
  public email: string;
  public amountToInvoice: number | null;
  public isMultipleCurrencies = false;
}
