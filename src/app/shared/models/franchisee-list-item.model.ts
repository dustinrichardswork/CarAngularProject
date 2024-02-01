import { BaseEntity } from './base-entity.model';

export class FranchiseeListItem extends BaseEntity {
  public name: string;
  public email: string;
  public vatNumber: string;
  public location: string;
}
