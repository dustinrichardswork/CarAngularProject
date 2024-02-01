import { BaseEntity } from './base-entity.model';

export class PasswordViewModel extends BaseEntity {
  public currentPassword: string;
  public newPassword: string;
}
