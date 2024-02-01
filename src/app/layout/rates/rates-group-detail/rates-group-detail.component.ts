import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rates-group-detail',
  templateUrl: './rates-group-detail.component.html',
  styleUrls: ['./rates-group-detail.component.css']
})
export class RatesGroupDetailComponent implements OnInit {

  public formGroup: FormGroup;
  public submitted = false;
  public isSubmitting = false;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  // convenience getter for easy access to form fields
  public get fields() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      code: [null, Validators.required],
      description: [null],
      ssip: [null]
    })
  }

  save() {

  }
}
