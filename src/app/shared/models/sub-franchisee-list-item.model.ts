import { BaseEntity } from './base-entity.model';

export class SubFranchiseeListItem extends BaseEntity {
  public name: string;
  public email: string;
  public vatNumber: string;
  public location: string;
}
