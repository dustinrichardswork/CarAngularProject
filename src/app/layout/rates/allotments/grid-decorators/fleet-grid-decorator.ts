import { NumberCellEditorComponent } from "app/shared/components/editable-grid/number-cell-editor/number-cell-editor.component";
import { GridBase } from "app/shared/components/editable-grid/grid-base";
import { GridDecoratorBase } from "app/shared/components/editable-grid/grid-decorator-base";
import { DropdownCellEditorComponent } from "app/shared/components/editable-grid/dropdown-cell-editor/dropdown-cell-editor.component";
import { DateCellEditorComponent } from "app/shared/components/editable-grid/date-cell-editor/date-cell-editor.component";
import { CheckboxCellEditorComponent } from "app/shared/components/editable-grid/checkbox-cell-editor/checkbox-cell-editor.component";

export class FleetGridDecorator extends GridDecoratorBase {

    carGroupOptions: any[] = [];
    constructor(optionsObject : any= {}) {
        super();
        this.carGroupOptions = optionsObject?.carGroupOptions || [];
    }

  buildGrid(grid: GridBase) {
    grid.columnDefs = [
        { field: 'carGroup', editable: true, cellEditor: DropdownCellEditorComponent, cellEditorParams: {options: this.carGroupOptions} },
        { field: 'numberOfCars', editable: true, cellEditor: NumberCellEditorComponent },
        { field: 'startDate', editable: true, cellEditor: DateCellEditorComponent, width: 130 },
        { field: 'endDate', editable: true, cellEditor: DateCellEditorComponent, width: 130 },
        { field: 'freeSell', editable: true, cellEditor: CheckboxCellEditorComponent, valueFormatter: (params) => {if(params.value == true) return 'Yes'; else return 'No'} },
        { field: 'onRequest', editable: true, cellEditor: CheckboxCellEditorComponent, valueFormatter: (params) => {if(params.value == true) return 'Yes'; else return 'No'} },
    ];

    grid.frameworkComponents = {
      numberCell: NumberCellEditorComponent,
      dropdownCell: DropdownCellEditorComponent,
      dateCell: DateCellEditorComponent,
      checkboxCell: CheckboxCellEditorComponent
    };

    grid.defaultColDef = { resizable: true };
    grid.addHotKey({ key: "Ctrl + Shift + C", func: grid.clone });
  }
}
