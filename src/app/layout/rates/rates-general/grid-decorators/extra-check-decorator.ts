import { CheckboxCellEditorComponent } from "app/shared/components/editable-grid/checkbox-cell-editor/checkbox-cell-editor.component";
import { DropdownCellEditorComponent } from "app/shared/components/editable-grid/dropdown-cell-editor/dropdown-cell-editor.component";
import { GridBase } from "app/shared/components/editable-grid/grid-base";
import { GridDecoratorBase } from "app/shared/components/editable-grid/grid-decorator-base";

export class ExtraCheckDecorator extends GridDecoratorBase {


    constructor(private rateService) {
        super();
    }
    buildGrid(grid: GridBase) { 

    grid.frameworkComponents = {
        checkboxCell: CheckboxCellEditorComponent,
        dropdownCell: DropdownCellEditorComponent
    };

    grid.onCellClicked = (e) => {
        console.log(e);
    }

    grid.onCellKeyDown = async (e) => {
        
        if (e.event.key === "Enter") {
            let vehicle = e.colDef.field.split("_")[0];
            let uid = e.data[vehicle+"_Uid"];
            this.rateService.getRateSeasonExtraValue(uid).subscribe((data: any) => {
                let updatedData = { ...data, [e.colDef.field.split("_")[1]]: e.value };
                console.log(vehicle, uid, updatedData);
                this.rateService.updateRateSeasonExtraValue(uid, updatedData).subscribe();
            });
        }
    }

    grid.defaultColDef = { resizable: true };
    grid.addHotKey({ key: "Ctrl + Shift + C", func: grid.clone });
  }
}
