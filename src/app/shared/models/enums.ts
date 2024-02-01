// All enums are located here

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

export enum UserRoles {
  AddCarAdmin = 0,
  FranchiseeAdmin = 1,
  AddCarUser = 2,
  FranchiseeUser = 3,
}

export enum UserStates {
  New = 0,
  Active = 1,
  Deactivated = 2,
  Removed = 3,
}

export enum MailAddressTypes {
  Email = 0,
  AlternativeEmail = 1,
}

export enum DiscountTypes {
  PerRa = 0,
  PerRaDay = 1,
  Percent = 2,
}

export enum BrokerForwardingMethods {
  Email = 0,
  Ftp = 1,
}

export enum StatementStatus {
  Draft = 0,
  Published = 1,
  Closed = 2
}

export enum BrokerInvoiceStatus {
  New = 0,
  Sent = 1,
  PartiallyPaid = 2,
  Paid = 3
}

export enum CommissionType {
  Amount = 0,
  Percent = 1
}

export enum CommissionStatus {
  Active = 0,
  Paused = 1
}


export enum FranchiseeInvoiceStatus {
  New = 0,
  Draft = 1,
  Published = 2
}

export enum ReservationStatus {
  Confirmed = 0,
  NoShow = 1,
  Cancelled = 2,
  RaOpen = 3,
  RaClosed = 4,
  Invoiced = 5,
  PaidByBroker = 6,
  PaidToCashier = 7
}

export enum FieldSections {
  Single = 0,
  ReservationRow = 1
}

export enum FranchiseePaymentItemType {
  Clearing = 0,
  Payment = 1,
}

export enum PaymentHistoryItemType {
  Correction = 0,
  Payment = 1,
  StatementClosed = 2,
  Deduction = 3,
  RentalAgreements = 4,
  BrokerRebateChange = 5,
  CommissionChange = 6,
  FeeChange = 7,
  InitialBalance = 8,
  //Used for UI only
  MonthStart = 1000,
  MonthEnd = 1001
}

export enum AlgorithmWebsites {
  Other = 0,
  Rentalcars = 1,
  DiscoverCars = 2,
  Cartrawler = 3
}
