import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-date-cell-editor',
  templateUrl: './date-cell-editor.component.html',
  styleUrls: ['./date-cell-editor.component.css']
})
export class DateCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {

  params: any;
  value: any;
  highlightAllOnFocus: any;
  @ViewChild('input', { read: ViewContainerRef }) public input: any;
  
  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
  }

  getValue() {
    return this.input.element.nativeElement.value;
  }

  ngAfterViewInit() {
  
  }
}
