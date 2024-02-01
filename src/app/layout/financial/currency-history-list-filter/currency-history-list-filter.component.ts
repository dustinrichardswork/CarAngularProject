import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-currency-history-list-filter',
  templateUrl: './currency-history-list-filter.component.html',
  styleUrls: ['./currency-history-list-filter.component.css']
})
export class CurrencyHistoryListFilterComponent implements OnInit {

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
      currency: [null],
    });
  }

  save() {
    let filterData = this.formGroup.value;
    this.onFilter.emit();
  }

}
