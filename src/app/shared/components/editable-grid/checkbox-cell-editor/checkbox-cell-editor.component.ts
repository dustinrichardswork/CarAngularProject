import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox-cell-editor',
  templateUrl: './checkbox-cell-editor.component.html',
  styleUrls: ['./checkbox-cell-editor.component.css']
})
export class CheckboxCellEditorComponent{

  params: any;
  value: boolean = false;

  agInit(params: any): void {
    this.params = params;
    this.value = params.value;
  }

  getValue() {
    return this.value;
  }

  chkbChangedHandler(event) {
   
    // this.value = !this.value
    // this.params.value = !this.params.value;
    // console.log(this.value, 'checkbox');
    // this.params.value = this.value;
    // console.log(this.params.value);
    // let colKey = this.params.colDef.field;
    // this.params.data[colKey] = this.value;
    // if (event.target.checked==true) {
    //   this.params.gridparam.addCode(this.params);
    //   this.params.gridparam.clickHandler();
    // }
    // if (event.target.checked==false) {
    //   this.params.gridparam.deletecode(this.params);
    //   this.params.gridparam.clickHandler();
    // }
    // if (this.params.changed) {
    //   this.params.changed(event, this.params);
    // }
  }

}
