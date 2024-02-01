import { BaseEntity } from './base-entity.model';

export interface AddressViewModel extends BaseEntity {
  addressLine1: string;
  addressLine2: string;
  city: string;
  countryUID: string;
  countryName: string;
  zipCode: string;
}
