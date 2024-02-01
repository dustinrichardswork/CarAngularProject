import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rates-season-details',
  templateUrl: './rates-season-details.component.html',
  styleUrls: ['./rates-season-details.component.css']
})
export class RatesSeasonDetailsComponent implements OnInit {

  public submitted = false;
  public isSubmitting = false;

  public formGroup: FormGroup;
  
  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  // convenience getter for easy access to form fields
  public get fields() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      description: [null],
    })
  }

  save() {

  }
}
