import { GridBase } from 'app/shared/components/editable-grid/grid-base';
import { GridDecoratorBase } from 'app/shared/components/editable-grid/grid-decorator-base';
import { NumberCellEditorComponent } from 'app/shared/components/editable-grid/number-cell-editor/number-cell-editor.component';

export class ExcessGridDecorator extends GridDecoratorBase {
  constructor( private rateService) {
    super()
  }
  
  buildGrid(grid: GridBase) {
    grid.onCellKeyDown = async (e) => {
      if (e.event.key === "Enter") {
        let vehicle = e.colDef.field;
        let uid = e.data[vehicle + "_uid"];
        this.rateService.getRateSeasonExcessValue(uid).subscribe((data) => {
          let updatedData = {...data, value: e.value }
          this.rateService.updateRateSeasonExcessValue(uid, updatedData).subscribe();
        })
      }
    }
    grid.frameworkComponents = {
      numberCell: NumberCellEditorComponent,
    }
    grid.defaultColDef = { resizable: true };
    grid.addHotKey({ key: "Ctrl+ Shift+C", func: grid.clone });
  }
}
