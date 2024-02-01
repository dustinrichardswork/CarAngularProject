import { NumberCellEditorComponent } from "app/shared/components/editable-grid/number-cell-editor/number-cell-editor.component";
import { DropdownCellEditorComponent } from "app/shared/components/editable-grid/dropdown-cell-editor/dropdown-cell-editor.component";
import { GridBase } from "app/shared/components/editable-grid/grid-base";
import { GridDecoratorBase } from "app/shared/components/editable-grid/grid-decorator-base";
import { HeaderCellEditorComponent } from "app/shared/components/editable-grid/header-cell-editor/header-cell-editor.component";

export class SippCodeGridDecorator extends GridDecoratorBase {

  dropdownOptions: any[] = [];
  constructor(options= [], private ratesService) {
    super();
    this.dropdownOptions = options;
    this.ratesService = ratesService;
  }

  buildGrid(grid: GridBase) {

    grid.frameworkComponents = {
      dropdownCell: DropdownCellEditorComponent,
      numberCell: NumberCellEditorComponent,
      headerCell: HeaderCellEditorComponent
    };

    grid.onCellKeyDown = async (e) => {
      if (e.event.key === "Enter") {
        console.log(e);
        if(e.colDef.field === "sipp") {
          // let updateExtraData = {
          //   uid: e.data.uid,
          //   entityVersion: e.data.entityVersion,
          //   code: e.data.code
          // }
          // this.ratesService.updateRateSeasonExtra(e.data.uid, updateExtraData).subscribe()
        } else {
          let daybreak = e.colDef.field;
          let uid = e.data[daybreak + "_uid"];
          
          this.ratesService.getRateSeasonValue(uid).subscribe((data: any) => {
            let updatedData = { ...data, value: e.value };
            this.ratesService.updateRateSeasonValue(uid, updatedData).subscribe();
          });
        }
      }
    }

    grid.defaultColDef = { resizable: true };
    grid.addHotKey({ key: "Ctrl + Shift + C", func: grid.clone });
  }
}
