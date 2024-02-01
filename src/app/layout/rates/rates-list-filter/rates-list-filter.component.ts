import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rates-list-filter',
  templateUrl: './rates-list-filter.component.html',
  styleUrls: ['./rates-list-filter.component.css']
})
export class RatesListFilterComponent implements OnInit {

  public formGroup: FormGroup;
  @Output()
  onFilter = new EventEmitter();
  
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.formGroup = this.formBuilder.group({
      searchNumber: [null],
    });
  }

  save() {
    let filterData = this.formGroup.value;
    this.onFilter.emit();
  }

}
