import { BaseEntity } from './base-entity.model';
import { UserStates } from './enums';

export class UserListItem extends BaseEntity {
  public first_name: string;
  public last_name: string;
  public email: string;
  public role: string;
  public country: string;
  public userState: UserStates;
}
