import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rental-stations-detail',
  templateUrl: './rental-stations-detail.component.html',
  styleUrls: ['./rental-stations-detail.component.css']
})
export class RentalStationsDetailComponent implements OnInit {

  public formGroup: FormGroup;
  
  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  // convenience getter for easy access to form fields
  public get fields() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      code: [null, Validators.required]
    })
  }

  save() {
    
  }
}
