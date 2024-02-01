import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-dropdown-cell-editor',
  templateUrl: './dropdown-cell-editor.component.html',
  styleUrls: ['./dropdown-cell-editor.component.css']
})
export class DropdownCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {

  params: any;
  value: any;
  options: any[] = [];
  @ViewChild('select', { read: ViewContainerRef }) public select: any;
  
  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
    this.options = this.params.options;
  }

  getValue() {
    return this.select.element.nativeElement.value;
  }

  ngAfterViewInit() {
  }


}
