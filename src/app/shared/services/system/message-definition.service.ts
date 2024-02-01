import { Injectable } from '@angular/core';
import { MessageDefinition } from '@app-shared/models/system/message-definition.model';
import { MessageCodes } from '../../models/system/message-codes';

@Injectable({
  providedIn: 'root',
})
export class MessageDefinitionService {

  constructor() {
    this.checkDuplicateDefinitions();
    this.checkAllCodesHaveDefinitions();
  }

  getMessageDefinition(code: number): MessageDefinition {
    if (!code) {
      throw new Error("code is undefined");
    }
    const msgDef = this.findMessageDefinition(code);
    if (msgDef)
      return { code: code, definition: msgDef.definition };
    else
      return this.getUnknownMessageDefinition(code);
  }

  private getUnknownMessageDefinition(code: number): MessageDefinition {
    const msgDef = this.findMessageDefinition(MessageCodes.UnknownMessage);
    const text = msgDef.definition.replace("{0}", code.toString());
    return { code: MessageCodes.UnknownMessage, definition: text };
  }

  private findMessageDefinition(code: number): MessageDefinition {
    const msgDef = this.messageDefinitions.find(a => a.code == code);
    return msgDef;
  }

  //Checks for duplicate codes
  private checkDuplicateDefinitions() {
    this.messageDefinitions.forEach(a => {
      const result = this.messageDefinitions.find(b => b.code === a.code && b != a);
      if (result) {
        throw new Error(`Duplicate message definitions for code '${a.code}'`);
      }
    });
  }

  //Checks if all codes have message text defined
  private checkAllCodesHaveDefinitions() {
    for (let code in MessageCodes) {
      if (!isNaN(+code)) {
        const msgDef = this.findMessageDefinition(+code);
        if (!msgDef) {
          console.error(`Message code ${code} (${MessageCodes[code]}) does not have text definition`);
        }
      }
    }
  }

  //TODO: load dynamically or move to a separate class
  private messageDefinitions: MessageDefinition[] =
    [
      { code: MessageCodes.UnknownMessage, definition: "*** The message text supposed to be here, but it was not found. Please ask developers to add text for message code '{0}'" },
      { code: MessageCodes.NotAuthorizedError, definition: "You are not authorized to perform this action" },
      { code: MessageCodes.NoInternetConnection, definition: "There is No Internet Connection" },
      { code: MessageCodes.UnableToCompleteRequest, definition: "We are Unable to Complete this Request" },

      { code: MessageCodes.BrokerSaveSuccess, definition: "Broker was saved successfully" },
      { code: MessageCodes.FranchiseeSaveSuccess, definition: "Franchise was saved successfully" },
      { code: MessageCodes.SubfranchiseeSaveSuccess, definition: "Sub Franchise was saved successfully" },
      { code: MessageCodes.DeductionSaveSuccess, definition: "Deduction was saved successfully" },
      { code: MessageCodes.CommissionSaveSuccess, definition: "Commission was saved successfully" },
      { code: MessageCodes.UserProfileSaveSuccess, definition: "User Profile was saved successfully" },

      { code: MessageCodes.BrokerInvoiceTemplateUploadSuccess, definition: "Invoice template was successfully attached" },
      { code: MessageCodes.BrokerInvoiceTemplateRemovalSuccess, definition: "Invoice template was successfully deleted" },
      { code: MessageCodes.AlgorithmDataEntryUploadSuccess, definition: "Algorithm Data Entry was successfully attached" },
      { code: MessageCodes.AlgorithmDataEntryRemovalSuccess, definition: "Algorithm Data Entry was successfully deleted" },
      { code: MessageCodes.FranchiseeRemovalSuccess, definition: "The Franchise was deleted successfully" },
      { code: MessageCodes.SubfranchiseeRemovalSuccess, definition: "The Sub Franchise was deleted successfully" },
      { code: MessageCodes.BrokerRemovalSuccess, definition: "The broker was deleted successfully" },
      { code: MessageCodes.UserProfileRemovalSuccess, definition: "The User Profile was deleted successfully" },
      { code: MessageCodes.DeductionRemovalSuccess, definition: "The deduction was deleted successfully" },
      { code: MessageCodes.DeductionCloneSuccess, definition: "The deduction was cloned successfully" },
      { code: MessageCodes.UserProfileChangePasswordSuccess, definition: "Password was changed successfully" },

      { code: MessageCodes.UserProfileDeactivationSuccess, definition: "The user was deactivated successfully" },
      { code: MessageCodes.UserProfileActivationSuccess, definition: "The user was Activated successfully" },
      { code: MessageCodes.UserProfileResendInvitationSuccess, definition: "The invitation was resent successfully" },

      { code: MessageCodes.QualityReportScreenshotUploadSuccess, definition: "Quality report screenshot was saved successfully" },
      { code: MessageCodes.PasswordCopySuccess, definition: "Your password was copied successfully" },
      { code: MessageCodes.CustomPaymentSuccess, definition: "Custom payment added successfully" },
      { code: MessageCodes.MarkedAsPaidSuccess, definition: "Marked as paid successfully" },
      { code: MessageCodes.PaymentRemovalSuccess, definition: "Payment was removed successfully" },
      { code: MessageCodes.SubfranchiseeAssignedSuccess, definition: "Deduction assigned successfully" },
      { code: MessageCodes.SubfranchiseeUnassignedSuccess, definition: "Deduction unassigned successfully" },
      { code: MessageCodes.QualityReportRemovalSuccess, definition: "Quality report was deleted successfully" },
      { code: MessageCodes.BrokerInvoiceCreationSuccess, definition: "Broker invoice was created successfully" },
      { code: MessageCodes.BrokerInvoicesCreationSuccess, definition: "Broker invoices were created successfully" },
      { code: MessageCodes.FranchiseeVendorInvoiceCreationSuccess, definition: "Franchisee vendor invoice for the payment was created successfully" },
      { code: MessageCodes.FranchiseeVendorInvoiceReCreationSuccess, definition: "Franchisee vendor invoice was successfully marked for retry E-conomic sync" },

      { code: MessageCodes.BrokerSaveError, definition: "Error happened during saving the broker" },
      { code: MessageCodes.FranchiseeSaveError, definition: "Error happened during saving the franchisee" },
      { code: MessageCodes.SubfranchiseeSaveError, definition: "Error happened during saving the sub franchisee" },
      { code: MessageCodes.DeductionSaveError, definition: "Error happened during saving the deduction" },
      { code: MessageCodes.UserProfileSaveError, definition: "Error happened during saving the user" },
      { code: MessageCodes.UserProfileDeactivationError, definition: "Error happened during deactivating the user" },
      { code: MessageCodes.SubfranchiseeAssignedError, definition: "Error happened during assigned the subfranchisee for deduction" },
      { code: MessageCodes.SubfranchiseeUnassignedError, definition: "Error happened during unassigned the subfranchisee from deduction" },
      { code: MessageCodes.UserProfileDeactivationOwnAccountError, definition: "You cannot deactivate your own account" },
      { code: MessageCodes.UserProfileRemovalOwnAccountError, definition: "You cannot delete your own account" },
      { code: MessageCodes.UserProfileChangePasswordError, definition: "Error happened during changing a password" },
      { code: MessageCodes.BrokerNotFoundError, definition: "Broker not found." },
      { code: MessageCodes.LocationDoesNotBelongToTheSubFranchiseError, definition: "The location does not belong to the subfranchise." },
      { code: MessageCodes.UserProfileNotFoundError, definition: "User profile not found." },
      { code: MessageCodes.ApplicationUserNotFoundError, definition: "Application user not found." },
      { code: MessageCodes.UserProfileActivationTermsOfUseError, definition: "User activation is impossible without accepting terms of use." },
      { code: MessageCodes.UserProfileEmailConfirmError, definition: "An error occurred while trying to confirm email." },
      { code: MessageCodes.TermsOfServiceAcceptError, definition: "An error occurred while trying to accept terms of service." },
      { code: MessageCodes.SetNewPasswordError, definition: "An error occurred while trying to set new password." },
      { code: MessageCodes.RoleExistError, definition: "Provided role does not exist." },
      { code: MessageCodes.InvitingUserProfileNotFoundError, definition: "Inviting user profile not found." },
      { code: MessageCodes.FranchiseeNotFoundError, definition: "Unable to find franchisee." },
      { code: MessageCodes.SubFranchiseeNotFoundError, definition: "Unable to find subfranchisee." },
      { code: MessageCodes.ApplicationUserCreateError, definition: "An error occurred while trying to create application user." },
      { code: MessageCodes.ResetPasswordError, definition: "An error occurred while trying to reset the password." },
      { code: MessageCodes.CreateResetTokenError, definition: "An error occurred while trying to create email confirmation token." },
      { code: MessageCodes.ChangePasswordError, definition: "An error occurred while trying to change the password." },
      { code: MessageCodes.IncorrectCurrentPasswordError, definition: "Incorrect current password." },
      { code: MessageCodes.UserIdExtractTokenError, definition: "An error occurred while trying to extract user id from token." },
      { code: MessageCodes.InvoiceTemplateNotFoundError, definition: "The broker does not have an invoice template." },
      { code: MessageCodes.CurrencyNotFoundError, definition: "The specified currency was not found." },
      { code: MessageCodes.BrokerInvoiceNumberExistError, definition: "BrokerInvoice with specified InvoiceNumber already exists." },
      { code: MessageCodes.BrokerInvoiceDateRangeError, definition: "From date must be more than till date." },
      { code: MessageCodes.BrokerRentalAgreementPeriodNotFountError, definition: "There is no rental agreement in the specified period of time." },
      { code: MessageCodes.QualityReportScreenshotUploadError, definition: "Error happened during saving the quality report screenshot." },
      { code: MessageCodes.QualityReportAlreadyExists, definition: "Quality report from this broker for these dates and franchisee already exists." },
      { code: MessageCodes.CustomPaymentError, definition: "Error happened during adding a custom payment" },
      { code: MessageCodes.BrokerInvoiceNotFoundError, definition: "Broker invoice not found." },
      { code: MessageCodes.BrokerInvoiceMarkAsSentError, definition: "An error occurred while changing the invoice status." },
      { code: MessageCodes.ExcelFileCorruptError, definition: "Excel file has an invalid format. Must be an .xslx file." },
      { code: MessageCodes.ExcelFileSingleSheetError, definition: "Excel file must have one worksheet only." },
      { code: MessageCodes.ExcelFileWorkBookError, definition: "The document type must be a workbook (.xslx). No macros or addin supported." },
      { code: MessageCodes.ExcelFileFormulaError, definition: "The document cannot contain formulas." },
      { code: MessageCodes.ReservationMixedCurrenciesError, definition: "Cannot create invoice due to mixed currencies. Following currencies would be placed on the same invoice: {conflictCurrenies}." },
      { code: MessageCodes.ReservationNullCurrencyError, definition: "Reservation does not have currency assigned" },
      { code: MessageCodes.QualityReportFileIsTooLargeError, definition: "File is too large" },
      { code: MessageCodes.QualityReportFileNotSupportedError, definition: "File not supported" },
      { code: MessageCodes.SubFranchiseeNameExistError, definition: "SubFranchisee with specified Name already exists for Franchisee." },
      { code: MessageCodes.BrokerEmailIsEmptyError, definition: "Broker must have email." },
      { code: MessageCodes.RentalcarsFranchiseeConfigsEmailError, definition: "There are Rentalcars franchisee configs with empty emails. Please set emails for specified countries: '{conflictSettings}'" },
      { code: MessageCodes.CannotAddDeductionForFrozenStatementError, definition: "The statement is frozen. Unable to add a new deduction or edit an existing one for this month" },
      { code: MessageCodes.PaymentNotFoundError, definition: "Cannot find payment" },
      { code: MessageCodes.CannotAddInvoiceToNegativePaymentError, definition: "Cannot add a vendor invoice to a payment made by the franchisee to addCar" },

      { code: MessageCodes.PleaseWaitWhileTheListIsLoadingWarning, definition: "Please wait while the list is loaded..." },
    ];
}
