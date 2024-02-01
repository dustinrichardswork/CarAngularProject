import { BaseEntity } from './base-entity.model';

export class UserViewModel extends BaseEntity {
  public first_name: string;
  public last_name: string;
  public email: string;
  public role: string;
  public country: string;
}
