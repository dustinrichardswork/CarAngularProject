import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  Validators,
  NG_VALIDATORS,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { controlHasErrorType } from '@app-shared/functions/utilities';
import { AddressViewModel } from '@app-shared/models/address-view-model.model';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressDetailsComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AddressDetailsComponent,
      multi: true,
    },
  ],
})
export class AddressDetailsComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input()
  public submitted = false;

  @Input()
  public readOnly = false;
  public formGroup: FormGroup;
  public controlHasErrorType = controlHasErrorType;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private readonly formBuilder: FormBuilder) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange: (val: unknown) => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public ngOnInit() {
    this.formGroup = this.formBuilder.group({
      addressLine1: [null, [Validators.required]],
      addressLine2: [null],
      city: [null],
      countryName: [null],
      uid: [null],
      zipCode: [null],
    });
    this.fields.countryName.disable();

    if (this.readOnly) {
      this.formGroup.disable()
    }
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public get fields() {
    return this.formGroup.controls;
  }

  public writeValue(value: AddressViewModel) {
    if (value) {
      this.formGroup.setValue({
        addressLine1: value.addressLine1 || null,
        addressLine2: value.addressLine2 || null,
        city: value.city || null,
        countryName: value.countryName || null,
        uid: value.uid || null,
        zipCode: value.zipCode || null,
      });
    }
  }

  public validate() {
    const required = this.controlHasErrorType(this.formGroup, 'addressLine1', 'required');
    return required ? { required } : null;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public registerOnChange(fn: () => {}) {
    this.onChange = fn;
    this.formGroup.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(fn);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public registerOnTouched(fn: () => {}) {
    this.onTouched = fn;
  }
}
