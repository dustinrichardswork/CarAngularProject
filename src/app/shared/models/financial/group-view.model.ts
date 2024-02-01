import { BaseEntity } from "../base-entity.model";

export class GroupViewModel extends BaseEntity {
  public uid: string;
  public code: string;
  public group: string;
  public description: string;
  public sipp: string;
  public minimum_age: string;
  public maximum_age: string;
}
