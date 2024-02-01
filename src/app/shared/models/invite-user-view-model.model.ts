import { BaseEntity } from './base-entity.model';
import { UserRoles } from './enums';

export class InviteUserViewModel extends BaseEntity {
  public email: string;
  public role: UserRoles;
  public franchiseeUID: string | null;
  public subfranchiseeUID: string | null;
}
