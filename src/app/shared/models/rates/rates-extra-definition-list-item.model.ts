import { BaseEntity } from "../base-entity.model";

export class RatesExtraDefinitionListItemModel extends BaseEntity {
  public uid: string;
  public code: string;
  public group: string;
  public description: string;
}
