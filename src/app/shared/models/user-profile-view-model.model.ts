import { BaseEntity } from './base-entity.model';
import { MailAddressTypes, UserRoles } from './enums';

export class UserProfileViewModel extends BaseEntity {
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public alternateEmail: string;
  public role: UserRoles;
  public organizationName: string;
  public applicationUserId: string;
  public correspondenceEmail: MailAddressTypes;
}
