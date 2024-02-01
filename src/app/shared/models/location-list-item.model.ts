import { BaseEntity } from "./base-entity.model";

export class LocationListItem extends BaseEntity {
  public name: string;
  public referenceCode: string;
  public address: string;
  public subFranchiseeName: string;
  public subFranchiseeUID: string;
}
