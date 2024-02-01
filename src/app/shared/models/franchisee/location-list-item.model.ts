
import { BaseEntity } from "./../base-entity.model";


export class LocationListItem extends BaseEntity {
  public name: string = "";
  public country: string = "";
  public city: string = "";
  public email: string = "";
  public phone: string = "";
  public code: string = "";
}
