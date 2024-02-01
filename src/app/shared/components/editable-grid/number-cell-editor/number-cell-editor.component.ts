import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-number-cell-editor',
  templateUrl: './number-cell-editor.component.html',
  styleUrls: ['./number-cell-editor.component.css']
})
export class NumberCellEditorComponent implements OnInit, ICellEditorAngularComp {

  params: any;
  value: any;
  @ViewChild('input', { read: ViewContainerRef }) public input: any;
  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
  }

  getValue() {
    return this.input.element.nativeElement.value;
  }

  ngOnInit(): void {
  }

}
