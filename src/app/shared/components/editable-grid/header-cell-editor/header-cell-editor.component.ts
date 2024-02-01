import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-header-cell-editor',
  templateUrl: './header-cell-editor.component.html',
  styleUrls: ['./header-cell-editor.component.css']
})
export class HeaderCellEditorComponent implements OnInit, ICellEditorAngularComp {

  params: any;
  value: any;
  isEditable: boolean = false;
  @ViewChild('input', { read: ViewContainerRef }) public input: any;
  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.displayName;
  }

  getValue() {
    return this.input.element.nativeElement.value;
  }

  ngOnInit(): void {
  }

  change() {
    this.isEditable = false
  }
}
