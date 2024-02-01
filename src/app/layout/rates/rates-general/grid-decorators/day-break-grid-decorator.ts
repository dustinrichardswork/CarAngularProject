import { GridBase } from "app/shared/components/editable-grid/grid-base";
import { GridDecoratorBase } from "app/shared/components/editable-grid/grid-decorator-base";
import { RatesService } from "app/shared/services/rates/rates.service";

export class DayBreakGridDecorator extends GridDecoratorBase {

  constructor(private rateService: RatesService) {
    super();
  }
  selectedDaybreak: any
  changedDaybreakUid: any
  buildGrid(grid: GridBase) {

    grid.onRowSelected = async (e) => {
      console.log(e);
      if (e.type === "rowSelected")
        this.selectedDaybreak = e.data;
    }
    grid.onCellKeyDown = async (e) => {
      console.log(e);
      if (e.event.key === "Enter") {
        let vehicle = e.colDef.field.split("_")[0];
        this.changedDaybreakUid = e.data[vehicle + "_Uid"];
        console.log(this.changedDaybreakUid);
        this.rateService.getRateSeasonValue(this.changedDaybreakUid).subscribe((data: any) => {
          let updatedData = {
            uid: data.uid,
            entityVersion: data.entityVersion,
            value: data.value,
            freeMiles: {
              price: e.data[vehicle + "_Value"],
              isUnlimited: e.data[vehicle + "_IsUnlimited"],
              isResetDaily: e.data[vehicle + "_Free"],
              distanceIncluded: e.data[vehicle + "_No"]
            }
          }
          console.log(data);
          this.rateService.updateRateSeasonValue(this.changedDaybreakUid, updatedData).subscribe();

        })
      }
    }
    grid.defaultColDef = { resizable: true };
    grid.addHotKey({ key: "Ctrl + Shift + C", func: grid.clone });
  }
}
