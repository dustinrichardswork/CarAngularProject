import { BaseEntity } from "../base-entity.model";

export class LocationViewModel extends BaseEntity {
  public name: string;
  public countryName: string;
  public locationType: string;
  public airportCode: string;
  public address: string;
  public phone: string;
  public mobilePhone: string;
  public latitude: string;
  public info: string;
  public longitude: string;
  public rate: number;
  public timezone: number;
  public rateCode: string;
  public isShownOnSite: boolean = false;
}
