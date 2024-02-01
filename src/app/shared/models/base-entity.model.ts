export abstract class BaseEntity {
  uid: string;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

export abstract class ExtraBaseEntity {
  code : string
  description : string
  isIncluded : boolean;
  isRequired : boolean;
  hasInvoiceVoucher : boolean;
  isValueChangeAllowed : boolean;
  isAvailable : boolean;
  isBreakdown : boolean;
}

