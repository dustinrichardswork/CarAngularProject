import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-delete-button-cell',
  templateUrl: './delete-button-cell.component.html',
  styleUrls: ['./delete-button-cell.component.css']
})
export class DeleteButtonCellComponent implements ICellRendererAngularComp {

  private params: any;

  constructor() {}
  refresh(params: ICellRendererParams): boolean {
    // throw new Error('Method not implemented.');
    return true;
  }

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.params.clicked(this.params.data);
  }

}
