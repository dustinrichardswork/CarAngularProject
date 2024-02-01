import { BaseEntity } from './base-entity.model';
import { UserStates } from './enums';

export class UserProfileListItem extends BaseEntity {
  public firstName: string;
  public lastName: string;
  public email: string;
  public locationName: string;
  public roleName: string;
  public userState: UserStates;
}
