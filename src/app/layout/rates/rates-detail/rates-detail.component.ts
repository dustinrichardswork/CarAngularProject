import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RatesViewModel } from 'app/shared/models/rates/rates-view.model';
import { MessageCodes } from 'app/shared/models/system/message-codes';
import { AuthService } from 'app/shared/services/auth.new.service';
import { CurrencyService } from 'app/shared/services/financial/currency.service';
import { RatesService } from 'app/shared/services/rates/rates.service';
import { GlobalService } from 'app/shared/services/global.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rates-detail',
  templateUrl: './rates-detail.component.html',
  styleUrls: ['./rates-detail.component.css']
})
export class RatesDetailComponent implements OnInit {

  public formGroup: FormGroup;

  private routeDataSubscription: Subscription; //Used for the current model retrieval from the resolver
  public currentModel: RatesViewModel;
  public submitted = false;
  public isSubmitting = false;
  public uid: string;
  public rentalStationsList: any[] = [];
  public reservationsList: any[] = [];
  
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly defaultService: RatesService,
    private readonly globalService: GlobalService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.routeDataSubscription = this.route.data.subscribe(
      (data: { rate: RatesViewModel }) => {
        this.currentModel = data.rate;
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
      description: [this.currentModel.description],
      observation: [this.currentModel.observation]
    })
  }

  //Applied after the model saved
  public updateForm() {
    const model = this.currentModel;
    this.formGroup.patchValue({
      code: model.code,
      description: model.description,
      observation: model.observation
    });
  }

  //Update the model with the form values
  private applyForm() {
    const formValue = this.formGroup.value;
    this.currentModel.code = formValue.code;
    this.currentModel.description = formValue.description;
    this.currentModel.observation = formValue.observation;
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

  onRatesExcess() {
    this.router.navigate([`/rates/${this.currentModel.uid}/excess`]);
  }

  onRatesExtras(){
    this.router.navigate([`/rates/${this.currentModel.uid}/extras`]);
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
