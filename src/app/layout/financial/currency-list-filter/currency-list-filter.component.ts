import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-currency-list-filter',
  templateUrl: './currency-list-filter.component.html',
  styleUrls: ['./currency-list-filter.component.css']
})
export class CurrencyListFilterComponent implements OnInit {

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
