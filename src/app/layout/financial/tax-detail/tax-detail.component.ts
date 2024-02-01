import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyViewModel } from 'app/shared/models/financial/currency-view.model';
import { TaxViewModel } from 'app/shared/models/financial/tax-view.model';
import { MessageCodes } from 'app/shared/models/system/message-codes';
import { AuthService } from 'app/shared/services/auth.new.service';
import { CurrencyService } from 'app/shared/services/financial/currency.service';
import { TaxService } from 'app/shared/services/financial/tax.service';
import { GlobalService } from 'app/shared/services/global.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tax-detail',
  templateUrl: './tax-detail.component.html',
  styleUrls: ['./tax-detail.component.css']
})
export class TaxDetailComponent implements OnInit {

  public formGroup: FormGroup;

  private routeDataSubscription: Subscription; //Used for the current model retrieval from the resolver
  public currentModel: TaxViewModel;
  public submitted = false;
  public isSubmitting = false;
  public uid: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly defaultService: TaxService,
    private readonly globalService: GlobalService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.routeDataSubscription = this.route.data.subscribe(
      (data: { tax: TaxViewModel }) => {
        this.currentModel = data.tax;

        // emit to sidebar component that current menu has no subfranchisee menu on create
        this.route.params.subscribe((x) => {
          if (x.uid === 'new') {
            this.globalService.emitFranchiseeDetail(null);
          } else {
            this.globalService.emitFranchiseeDetail(this.currentModel);
          }
        });

        if (this.currentModel) this.createForm();
      },
    );
  }

  // convenience getter for easy access to form fields
  public get fields() {
    return this.formGroup.controls;
  }
  //Applied to a new form
  //Requires unsubscribe
  public createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      code: [this.currentModel.code, Validators.required],
      tax_rate: [this.currentModel.tax_rate],
      cashMovements: [this.currentModel.cashMovements],
      bookKeepingAccount: [this.currentModel.bookKeepingAccount],
      description: [this.currentModel.description],
      unit: [this.currentModel.unit],
      decimal: [this.currentModel.decimal],
    })
  }

  //Applied after the model saved
  public updateForm() {
    const model = this.currentModel;
    this.formGroup.patchValue({
      code: model.code,
      tax_rate: model.tax_rate,
      description: model.description,
      cashMovements: model.cashMovements,
      bookKeepingAccount: model.bookKeepingAccount,
      unit: model.unit,
      decimal: model.decimal,
    });
  }

  //Update the model with the form values
  private applyForm() {
    const formValue = this.formGroup.value;
    this.currentModel.code = formValue.code;
    this.currentModel.tax_rate = formValue.tax_rate;
    this.currentModel.description = formValue.description;
    this.currentModel.cashMovements = formValue.cashMovements;
    this.currentModel.bookKeepingAccount = formValue.bookKeepingAccount;
    this.currentModel.unit = formValue.unit;
    this.currentModel.decimal = formValue.decimal;
  }

  //Save the model and update it from the service
  public save() {
    this.submitted = true;
    this.applyForm();
    this.isSubmitting = true;
    this.formGroup.disable();
    this.defaultService.saveCurrency(this.currentModel).subscribe(
      (res) => {
        this.isSubmitting = false;
        this.formGroup.enable();
        this.notificationService.showSuccessMessage(MessageCodes.FranchiseeSaveSuccess);
        //this.currentModel = res;
        //this.updateForm();
        void this.router.navigateByUrl(`/franchisees/${res.uid}`);
      },
      (err) => {
        if (err.status === 401) {
          this.notificationService.showErrorMessage(MessageCodes.NotAuthorizedError);
          void this.router.navigateByUrl('/');
        }
        this.isSubmitting = false;
        this.formGroup.enable();
        throw err;
      },
    );
  }

  //Validate the control
  private get isValid(): boolean {
    return this.formGroup.valid;
  }

  //Unsubscribe from subscriptions here
  public ngOnDestroy() {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
  }

}
