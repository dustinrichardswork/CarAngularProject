import { Pipe, PipeTransform } from '@angular/core';
import {
  BrokerForwardingMethods,
  DiscountTypes,
  UserRoles,
  UserStates,
  MailAddressTypes,
  CommissionType, ReservationStatus, CommissionStatus, StatementStatus,
} from '../models/enums';

@Pipe({ name: 'enumToArray' })
export class EnumToArrayPipe implements PipeTransform {
  transform(value): { index: number; name: string }[] {
    return Object.keys(value)
      .filter((e) => !isNaN(+e))
      .map((o) => ({ index: +o, name: value[o] }));
  }
}

//Translation pipe for enum UserRoles
@Pipe({ name: 'userRolesTranslate' })
export class UserRolesTranslatePipe implements PipeTransform {
  transform(value: UserRoles): string {
    switch (value) {
      case UserRoles.AddCarAdmin:
        return 'AddCar Admin';
      case UserRoles.FranchiseeAdmin:
        return 'Franchisee Admin';
      case UserRoles.AddCarUser:
        return 'AddCar User';
      case UserRoles.FranchiseeUser:
        return 'Franchisee User';

      default:
        throw new Error('UserRolesTranslatePipe - unsupported value for UserRoles enum: ' + value);
    }
  }
}

//Translation pipe for enum UserRoles
@Pipe({ name: 'userRolesEnumTranslate' })
export class UserRolesEnumTranslatePipe implements PipeTransform {
  transform(value): Object {
    const pipe = new UserRolesTranslatePipe();
    return Object.keys(value).filter(e => !isNaN(+e)).map(o => {
      return { index: +o, name: pipe.transform(+o) };
      //switch (+o) {
      //  //TODO: Put your options here
      //  //case UserRoles.Item: return { index: UserRoles.Item, name: 'Item name' }
      //  case UserRoles.AddCarAdmin: return { index: UserRoles.AddCarAdmin, name: 'AddCar Admin' }
      //  case UserRoles.FranchiseeAdmin: return { index: UserRoles.FranchiseeAdmin, name: 'Franchisee Admin' }
      //  case UserRoles.AddCarUser: return { index: UserRoles.AddCarUser, name: 'AddCar User' }
      //  case UserRoles.FranchiseeUser: return { index: UserRoles.FranchiseeUser, name: 'Franchisee User' }

      //  default: throw new Error('UserRolesEnumTranslatePipe - unsupported value for UserRoles enum: ' + o);
      //}
    });
  }
}

@Pipe({ name: 'discountTypesTranslate' })
export class DiscountTypesPipe implements PipeTransform {
  transform(value): Object {
    return Object.keys(value)
      .filter((e) => !isNaN(+e))
      .map((o) => {
        switch (+o) {
          //TODO: Put your options here
          case DiscountTypes.PerRa:
            return { index: DiscountTypes.PerRa, name: 'Per RA' };
          case DiscountTypes.PerRaDay:
            return { index: DiscountTypes.PerRaDay, name: 'Per RA-day' };
          case DiscountTypes.Percent:
            return { index: DiscountTypes.Percent, name: 'As percentage' };

          default:
            throw new Error('DiscountTypesPipe - unsupported value for DiscountTypes enum: ' + o);
        }
      });
  }
}
@Pipe({ name: 'commissionTypeTranslate' })
export class CommissionTypePipe implements PipeTransform {
  transform(value): Object {
    return Object.keys(value)
      .filter((e) => !isNaN(+e))
      .map((o) => {
        switch (+o) {
          //TODO: Put your options here
          case CommissionType.Amount:
            return { index: CommissionType.Amount, name: 'Fixed Fee per month' };
          case CommissionType.Percent:
            return { index: CommissionType.Percent, name: 'Commission, %' };

          default:
            throw new Error('CommissionTypePipe - unsupported value for CommissionType enum: ' + o);
        }
      });
  }
}

@Pipe({ name: 'brokerForwardingMethodsTranslate' })
export class BrokerForwardingMethodsPipe implements PipeTransform {
  transform(value): { index: number; name: string }[] {
    return Object.keys(value)
      .filter((e) => !isNaN(+e))
      .map((o) => {
        switch (+o) {
          //TODO: Put your options here
          case BrokerForwardingMethods.Email:
            return { index: BrokerForwardingMethods.Email, name: 'Email' };
          case BrokerForwardingMethods.Ftp:
            return { index: BrokerForwardingMethods.Ftp, name: 'Ftp' };

          default:
            throw new Error(
              'BrokerForwardingMethodsPipe - unsupported value for BrokerForwardingMethods enum: ' +
              o,
            );
        }
      });
  }
}

@Pipe({ name: 'userStatesEnumTranslate' })
export class UserStatesPipe implements PipeTransform {
  transform(value): string {
    switch (+value) {
      case UserStates.New:
        return 'New';
      case UserStates.Active:
        return 'Active';
      case UserStates.Deactivated:
        return 'Deactivated';
      case UserStates.Removed:
        return 'Removed';
      default:
        throw new Error('UserStatesPipe - unsupported value for UserStates enum: ' + value);
    }
  }
}

@Pipe({ name: 'mailTypeTranslate' })
export class MailAddressTypesPipe implements PipeTransform {
  transform(value): { index: number; name: string }[] {
    return Object.keys(value)
      .filter((e) => !isNaN(+e))
      .map((o) => {
        switch (+o) {
          case MailAddressTypes.AlternativeEmail:
            return { index: MailAddressTypes.AlternativeEmail, name: 'Alternative Email' };
          case MailAddressTypes.Email:
            return { index: MailAddressTypes.Email, name: 'Email' };

          default:
            throw new Error(
              'MailAddressTypesPipe - unsupported value for MailAddressTypes enum: ' + o,
            );
        }
      });
  }
}

@Pipe({ name: 'crop' })
export class CropTextPipe implements PipeTransform {
  transform(value: string, symbolCount: number): Object {
    if (value.length > symbolCount) return value.substring(0, symbolCount) + '...';
    return value;
  }
}

@Pipe({ name: 'numberToMonth' })
export class NumberToMonthPipe implements PipeTransform {
  transform(num: number): any {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (let i = 0; i <= month.length; i++) {
      if (num == i) {
        const monthString = month[i - 1];
        return monthString;
      }
    }
  }
}

@Pipe({ name: 'statusRender' })
export class StatusRenderPipe implements PipeTransform {
  transform(value): string {
    switch (+value) {
      case StatementStatus.Draft:
        return 'Draft';
      case StatementStatus.Published:
        return 'Published';
      case StatementStatus.Closed:
        return 'Closed';
      default:
        throw new Error('StatusRenderPipe - unsupported value for StatementStatus enum: ' + value);
    }
  }
}

@Pipe({ name: 'commissionTypeRender' })
export class CommissionTypeRenderPipe implements PipeTransform {
  transform(value: number): any {
    switch (+value) {
      case CommissionType.Amount:
        return 'Fixed Fee';
      case CommissionType.Percent:
        return 'Commission';
      default:
        throw new Error('CommissionTypeRenderPipe - unsupported value for CommissionType enum: ' + value);
    }
  }
}

@Pipe({ name: 'commissionstatusRender' })
export class CommissionStatusRenderPipe implements PipeTransform {
  transform(value: number): any {
    switch (+value) {
      case CommissionStatus.Active:
        return 'Active';
      case CommissionStatus.Paused:
        return 'Paused';
      default:
        throw new Error('CommissionStatusRenderPipe - unsupported value for CommissionStatus enum: ' + value);
    }
  }
}

@Pipe({ name: 'commissionvalRender' })
export class CommissionValRenderPipe implements PipeTransform {
  transform(value: number, type: number, currencyName: string): string {
    switch (+type) {
      case CommissionType.Amount:
        return value + " " + currencyName;
      case CommissionType.Percent:
        return value + " %";
      default:
        throw new Error('CommissionValRenderPipe - unsupported value for CommissionType enum: ' + value);
    }
  }
}

@Pipe({ name: 'brokerInvoiceStatus' })
export class BrokerInvoiceStatusPipe implements PipeTransform {
  transform(num: number): any {
    if (num == 0) {
      return 'New';
    } else if (num == 1) {
      return 'Sent';
    } else if (num == 2) {
      return 'PartiallyPaid';
    } else if (num == 3) {
      return 'Paid';
    }
  }
}

@Pipe({ name: 'franchiseeInvoiceStatus' })
export class FranchiseeInvoiceStatusPipe implements PipeTransform {
  transform(num: number): any {
    if (num == 0) {
      return 'New';
    } else if (num == 1) {
      return 'Draft';
    } else if (num == 2) {
      return 'Published';
    }
  }
}

@Pipe({ name: 'locationType' })
export class LocationTypePipe implements PipeTransform {
  transform(num: number): any {
    if (num == 1) {
      return 'City';
    } else if (num == 2) {
      return 'Airport';
    } else if (num == 3) {
      return 'Railway';
    } else if (num == 4) {
      return 'Hotel';
    } else if (num == 5) {
      return 'Port';
    }
    return 'Unknown';
  }
}


@Pipe({ name: 'getReservationStatus' })
export class GetReservationStatusPipe implements PipeTransform {
  transform(value: ReservationStatus) {
    switch (+value) {
      case ReservationStatus.Confirmed:
        return 'Confirmed';
      case ReservationStatus.NoShow:
        return 'No show';
      case ReservationStatus.Cancelled:
        return 'Cancelled';
      case ReservationStatus.RaOpen:
        return 'Ra open';
      case ReservationStatus.RaClosed:
        return 'Ra closed';
      case ReservationStatus.Invoiced:
        return 'Invoiced';
      case ReservationStatus.PaidByBroker:
        return 'Paid by broker';
      case ReservationStatus.PaidToCashier:
        return 'Paid to cashier';
      default:
        throw new Error('GetReservationStatusPipe - unsupported value for ReservationStatus enum: ' + value);
    }
  }
}
