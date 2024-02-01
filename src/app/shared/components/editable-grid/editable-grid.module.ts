import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableGridComponent } from './editable-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { DateCellEditorComponent } from './date-cell-editor/date-cell-editor.component';
import { DropdownCellEditorComponent } from './dropdown-cell-editor/dropdown-cell-editor.component';
import { FormsModule } from '@angular/forms';
import { CheckboxCellEditorComponent } from './checkbox-cell-editor/checkbox-cell-editor.component';
import { NumberCellEditorComponent } from './number-cell-editor/number-cell-editor.component';
import { HeaderCellEditorComponent } from './header-cell-editor/header-cell-editor.component';
import { DeleteButtonCellComponent } from './delete-button-cell/delete-button-cell.component';
import { PromoButtonGroupComponent } from './promo-button-group/promo-button-group.component';

@NgModule({
  declarations: [
    EditableGridComponent,
    DateCellEditorComponent,
    DropdownCellEditorComponent,
    CheckboxCellEditorComponent,
    NumberCellEditorComponent,
    HeaderCellEditorComponent,
    DeleteButtonCellComponent,
    PromoButtonGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule.withComponents([DateCellEditorComponent])
  ],
  exports: [
    EditableGridComponent
  ]
})
export class EditableGridModule { }
