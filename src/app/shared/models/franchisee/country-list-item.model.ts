
import { BaseEntity } from "./../base-entity.model";


export class CountryListItem extends BaseEntity {
  public name: string;
  public locationCount: number;
  public categorieCount: number;
  public allowedCountriesCount: number;
}
