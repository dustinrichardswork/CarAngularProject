import { NumberCellEditorComponent } from "app/shared/components/editable-grid/number-cell-editor/number-cell-editor.component";
import { GridBase } from "app/shared/components/editable-grid/grid-base";
import { GridDecoratorBase } from "app/shared/components/editable-grid/grid-decorator-base";
// import { RatesService } from "app/shared/services/rates/rates.service";
export class ExtraGridDecorator extends GridDecoratorBase {

  constructor(private rateService) {
    super();
  }

  buildGrid(grid: GridBase) {

    grid.frameworkComponents = {
      numberCell: NumberCellEditorComponent,
    };

    grid.onRowSelected = async (e) => {
      console.log(e);
    }

    grid.onCellKeyDown = async (e) => {
      console.log(e);
      if (e.event.key === "Enter") {
        console.log(e);
        if(e.colDef.field === "code") {
          let updateExtraData = {
            uid: e.data.uid,
            entityVersion: e.data.entityVersion,
            code: e.data.code
          }
          this.rateService.updateRateSeasonExtra(e.data.uid, updateExtraData).subscribe();
        } else if (e.colDef.field === "maxValues") {

        } else {
          let vehicle = e.colDef.field;
          let uid = e.data[vehicle + "_uid"];
          
          this.rateService.getRateSeasonExtraValue(uid).subscribe((data: any) => {
            let updatedData = { ...data, value: e.value };
            console.log(vehicle, uid, updatedData);
            this.rateService.updateRateSeasonExtraValue(uid, updatedData).subscribe();
          });
          // this.rateService.
        }
      }
    }

    grid.defaultColDef = { resizable: true };
    grid.addHotKey({ key: "Ctrl + Shift + C", func: grid.clone });
  }
}
