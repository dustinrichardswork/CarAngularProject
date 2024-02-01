import { Overlay } from '@angular/cdk/overlay';
import { NotificationService } from './notification.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.new.service';
import { BrokerListResolverService } from './broker/broker-list-resolver.service';
import { BrokerResolverService } from './broker/broker-resolver.service';
import { BrokerService } from './broker/broker.service';
import { GlobalErrorHandler } from './global-error-handler';
import { ListSettingsService } from './list-settings.service';
import { LoggedInGuard } from './logged-in.guard';
import { ConnectionInterceptor } from './connection-error/connection-error.interceptor';
import { ServerErrorInterceptor } from './server-error.interceptor';
import { TokenInterceptor } from './token.interceptor';
import { FranchiseeService } from './franchisee/franchisee.service';
import { FranchiseeResolverService } from './franchisee/franchisee-resolver.service';
import { FranchiseeListResolverService } from './franchisee/franchisee-list-resolver.service';
import { UserProfileListResolverService } from './user/user-profile-list-resolver.service';
import { UserProfileResolverService } from './user/user-profile-resolver.service';
import { UserProfileService } from './user/user-profile.service';
import {
  BrokerForwardingMethodsPipe,
  CommissionStatusRenderPipe,
  CommissionTypePipe,
  CommissionTypeRenderPipe,
  CommissionValRenderPipe,
  CropTextPipe,
  DiscountTypesPipe,
  EnumToArrayPipe,
  GetReservationStatusPipe,
  BrokerInvoiceStatusPipe,
  FranchiseeInvoiceStatusPipe,
  MailAddressTypesPipe,
  NumberToMonthPipe,
  StatusRenderPipe,
  UserRolesEnumTranslatePipe,
  UserRolesTranslatePipe,
  UserStatesPipe,
  LocationTypePipe,
} from './pipes';
import { InviteUserResolverService } from './user/invite-user-resolver.service';
import { SubFranchiseeService } from './franchisee/sub-franchisee.service';
import { SubFranchiseeListResolverService } from './franchisee/sub-franchisee-list-resolver.service';
import { WelcomeGuard } from './welcome.guard';
import { SubFranchiseeResolverService } from './franchisee/sub-franchisee-resolver.service';
import { SingleFileUploaderComponent } from '../components/single-file-uploader.component';
import { SingleImageUploaderComponent } from '@app-shared/components/single-image-uploader/single-image-uploader.component';
import { DeductionService } from './deduction/deduction.service';
import { DeductionListResolverService } from './deduction/deduction-list-resolver.service';
import { DeductionResolverService } from './deduction/deduction-resolver.service';
import { StatementResolverService } from './statement/statement-resolver.service';
import { StatementService } from './statement/statement.service';
import { StatementListResolverService } from './statement/statement-list-resolver.service';
import { MessageDefinitionService } from './system/message-definition.service';
import { MessageService } from './system/message.service';
import { PasswordService } from './system/password.service';
import { RentalAgreementService } from '@app-shared/services/statement/rental-agreement.service';
import { BrokerInvoiceService } from './broker/broker-invoice.service';
import { BrokerInvoiceListResolverService } from './broker/broker-invoice-list-resolver.service';
import { BrokerInvoiceResolverService } from './broker/broker-invoice-resolver.service';
import { CommissionService } from './commission/commission.service';
import { CommissionListResolverService } from './commission/commission-list-resolver.service';
import { CommissionResolverService } from './commission/commission-resolver.service';
import { FranchiseeInvoiceResolverService } from './franchisee/franchisee-invoice-resolver.service';
import { FranchiseeInvoiceListResolverService } from './franchisee/franchisee-invoice-list-resolver.service';
import { FranchiseeInvoiceService } from './franchisee/franchisee-invoice.service';
import { ReservationService } from './reservation/reservation.service';
import { ReservationListResolverService } from './reservation/reservation-list-resolver.service';
import { PasswordResetTokenGuard } from './password-reset-token.guard';
import { VersionInterceptor } from './version-interceptor';
import { PaymentService } from './statement/payment.service';
import { SubFranchiseeStatementListResolverService } from './statement/sub-franchisee-statement-list-resolver.service';
import { SubFranchiseeStatementResolverService } from './statement/sub-franchisee-statement-resolver.service';
import {
  RentalcarsFranchiseeConfigResolverService
} from "@app-shared/services/special-case-1/rentalcars-franchisee-config-resolver.service";
import {
  RentalcarsFranchiseeConfigService
} from "@app-shared/services/special-case-1/rentalcars-franchisee-config.service";
// import { LocationListResolverService } from './location/location-list-resolver.service';
import { LocationService } from './location/location.service';
import { BrokerInvoiceCreationListResolverService } from './broker/broker-invoice-creation-list-resolver.service';
import { NotificationBarService } from './notification-bar/notification-bar.service';
import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogService } from './system/dialog.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MultiFileUploaderComponent } from '../components/multi-file-uploader/multi-file-uploader.component';
import { CurrencyService } from './financial/currency.service';
import { CurrencyListResolverService } from './financial/currency-list-resolver.service';
import { CurrencyResolverService } from './financial/currency-resolver.service';
import { TaxListResolverService } from './financial/tax-list-resolver.service';
import { TaxResolverService } from './financial/tax-resolver.service';
import { CurrencyHistoryResolverService } from './financial/currency-history-resolver.service';
import { TaxService } from './financial/tax.service';
import { RatesService } from './rates/rates.service';
import { RatesListResolverService } from './rates/rates-list-resolver.service';
import { RatesResolverService } from './rates/rates-resolver.service';
import { RatesDetailExcessResolverService } from './rates/rates-detail-excess-resolver.service';
import { RatesExtraResolverService } from './rates/rates-extra-resolver.service';
import { RatesExtraDetailResolverService } from './rates/rates-extra-detail-resolver.service';
import { RatesExtraDefinitionsResolverService } from './rates/rates-extra-definitions-resolver.service';
import { CountryService } from './financial/country.service';
import { CountryListResolverService } from './financial/country-list-resolver.service';
import { CountryResolverService } from './financial/country-resolver.service';
import { GroupService } from './financial/group.service';
import { GroupListResolverService } from './financial/group-list-resolver.service';
import { GroupResolverService } from './financial/group-resolver.service';
import { RentalStationsService } from './financial/rental-stations.service';
import { RentalStationsListResolverService } from './financial/rental-stations-list-resolver.service';
import { RentalStationsResolverService } from './financial/rental-stations-resolver.service';

@NgModule({
  imports: [CommonModule, DropzoneModule, MatDialogModule, MatCardModule],
  declarations: [
    SingleFileUploaderComponent,
    MultiFileUploaderComponent,
    SingleImageUploaderComponent,
    DialogComponent,
    UserRolesEnumTranslatePipe,
    UserRolesTranslatePipe,
    DiscountTypesPipe,
    BrokerForwardingMethodsPipe,
    UserStatesPipe,
    MailAddressTypesPipe,
    CropTextPipe,
    NumberToMonthPipe,
    StatusRenderPipe,
    CommissionTypeRenderPipe,
    CommissionStatusRenderPipe,
    CommissionValRenderPipe,
    StatusRenderPipe,
    BrokerInvoiceStatusPipe,
    FranchiseeInvoiceStatusPipe,
    CommissionTypePipe,
    GetReservationStatusPipe,
    EnumToArrayPipe,
    LocationTypePipe
  ],
  providers: [
    Overlay,
    ListSettingsService,
    NotificationService,
    BrokerService,
    FranchiseeService,
    BrokerResolverService,
    FranchiseeResolverService,
    BrokerListResolverService,
    FranchiseeListResolverService,
    AuthService,
    AuthGuard,
    WelcomeGuard,
    PasswordResetTokenGuard,
    LoggedInGuard,
    UserProfileResolverService,
    UserProfileListResolverService,
    UserProfileService,
    InviteUserResolverService,
    VersionInterceptor,
    SubFranchiseeService,
    SubFranchiseeResolverService,
    SubFranchiseeListResolverService,
    DeductionService,
    DeductionResolverService,
    DeductionListResolverService,
    StatementResolverService,
    StatementService,
    StatementListResolverService,
    RentalAgreementService,
    MessageDefinitionService,
    MessageService,
    PasswordService,
    BrokerInvoiceService,
    BrokerInvoiceListResolverService,
    BrokerInvoiceResolverService,
    CommissionService,
    CommissionListResolverService,
    CommissionResolverService,
    FranchiseeInvoiceResolverService,
    FranchiseeInvoiceListResolverService,
    FranchiseeInvoiceService,
    ReservationService,
    ReservationListResolverService,
    CurrencyService,
    CurrencyListResolverService,
    CurrencyResolverService,
    CurrencyHistoryResolverService,
    TaxService,
    TaxListResolverService,
    TaxResolverService,
    CountryService,
    CountryListResolverService,
    CountryResolverService,
    RentalStationsService,
    RentalStationsListResolverService,
    RentalStationsResolverService,
    GroupService,
    GroupListResolverService,
    GroupResolverService,
    RatesService,
    RatesListResolverService,
    RatesResolverService,
    RatesDetailExcessResolverService,
    RatesExtraResolverService,
    RatesExtraDetailResolverService,
    RatesExtraDefinitionsResolverService,
    PaymentService,
    SubFranchiseeStatementListResolverService,
    SubFranchiseeStatementResolverService,
    RentalcarsFranchiseeConfigResolverService,
    RentalcarsFranchiseeConfigService,
    // LocationListResolverService,
    LocationService,
    BrokerInvoiceCreationListResolverService,
    NotificationBarService,
    DialogService,
    { provide: HTTP_INTERCEPTORS, useClass: ConnectionInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: VersionInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  exports: [
    SingleFileUploaderComponent,
    MultiFileUploaderComponent,
    SingleImageUploaderComponent,
    DialogComponent,
    UserRolesEnumTranslatePipe,
    UserRolesTranslatePipe,
    DiscountTypesPipe,
    BrokerForwardingMethodsPipe,
    UserStatesPipe,
    MailAddressTypesPipe,
    CropTextPipe,
    NumberToMonthPipe,
    StatusRenderPipe,
    CommissionTypeRenderPipe,
    CommissionStatusRenderPipe,
    CommissionValRenderPipe,
    StatusRenderPipe,
    BrokerInvoiceStatusPipe,
    FranchiseeInvoiceStatusPipe,
    CommissionTypePipe,
    GetReservationStatusPipe,
    EnumToArrayPipe,
    LocationTypePipe,
  ],
})
export class ServicesModule { }
