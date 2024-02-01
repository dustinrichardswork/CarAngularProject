import { BaseEntity } from '../base-entity.model';
import { CommissionType, CommissionStatus } from '../enums';

export class CommissionViewModel extends BaseEntity {
  public name: string;
  public franchiseeUid: string;
  public commissionType: CommissionType;
  public value: number;
  public startDate: Date | null;
  public endDate: Date | null;
  public status: CommissionStatus;

}
