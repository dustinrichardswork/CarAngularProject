import { BaseEntity } from '../base-entity.model';
import { CommissionType, CommissionStatus } from '../enums';

export class CommissionListItem extends BaseEntity {
  public name: string;
  public commissionType: CommissionType;
  public value: number;
  public startDate: Date | null;
  public endDate: Date | null;
  public currencyName: string;
  public status: CommissionStatus;

}
