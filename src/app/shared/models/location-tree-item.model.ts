import { BaseEntity } from './base-entity.model';

export class LocationTreeItem extends BaseEntity {
  public name: string;
  public parentLocation: string;
  public isChecked: string;
}
