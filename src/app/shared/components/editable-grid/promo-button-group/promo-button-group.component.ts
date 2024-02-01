import { Component, OnInit } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-promo-button-group',
  templateUrl: './promo-button-group.component.html',
  styleUrls: ['./promo-button-group.component.css']
})
export class PromoButtonGroupComponent implements ICellEditorAngularComp {

  private params: any;

  constructor() {}
  getValue() {
    // throw new Error('Method not implemented.');
  }

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.params.clicked(this.params.data);
  }

}
