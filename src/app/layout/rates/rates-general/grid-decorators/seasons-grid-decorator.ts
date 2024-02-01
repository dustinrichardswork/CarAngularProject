
//import { AutocompleteCell } from "../autocomplete-cell.editor/autocomplete-cell.editor";
import { EventEmitter } from '@angular/core';
import { DateCellEditorComponent } from "app/shared/components/editable-grid/date-cell-editor/date-cell-editor.component";
import { NumberCellEditorComponent } from "app/shared/components/editable-grid/number-cell-editor/number-cell-editor.component";
import { GridBase } from 'app/shared/components/editable-grid/grid-base';
import { GridDecoratorBase } from "app/shared/components/editable-grid/grid-decorator-base";
import { RatesService } from "app/shared/services/rates/rates.service";
import { ActivatedRoute, Route } from "@angular/router";
import { RateSeasonDetailsModel } from "app/shared/models/rates/rates-season-view.model";
import { DeleteButtonCellComponent } from 'app/shared/components/editable-grid/delete-button-cell/delete-button-cell.component';


interface Extra {
  uid: string;
  entityVersion: string;
  seasonUid : string;
  extrasUid: string;
  code: string;
  extraValues:any
}
export class SeasonsGridDecorator extends GridDecoratorBase {

  rateUid: string;
  newSeasonEmitter = new EventEmitter<any>();
  extras: Extra[] = [];
  isNew: boolean = false;
  constructor(private readonly router: ActivatedRoute, private readonly ratesService: RatesService) {
    super();
    this.router.paramMap.subscribe( paramMap => {
      this.rateUid = paramMap['params']['uid'] ?? "" ;
    })
  }

  deleteSeason(field: any) {
    this.ratesService.deleteRateSeason(field.uid, field.entityVersion).subscribe((res) => {
      this.ratesService.sendRemoveRateSeasonSubject(field.uid);
    });
  }

  buildGrid(grid: GridBase) {
    grid.columnDefs = [
        { headerName: "Season", field: 'description', editable: true, minWidth: 100 },
        { headerName:"Start Date", field: 'startDate', editable: true, cellEditor: DateCellEditorComponent, minWidth: 140 },
        { headerName:"End Date", field: 'endDate', editable: true, cellEditor: DateCellEditorComponent, minWidth: 140 },
        { headerName:"Booking From", field: 'bookingStartDate', editable: true, cellEditor: DateCellEditorComponent, minWidth: 140 },
        { headerName:"Booking To", field: 'bookingEndDate', editable: true, cellEditor: DateCellEditorComponent, minWidth: 140 },
        { headerName:"Action", cellRenderer: DeleteButtonCellComponent, cellRendererParams: { clicked: (field: any) => { this.deleteSeason(field); }}, width: 120 },
    ];

    grid.onCellKeyDown = async (e) => {
      let flag = true;
      if(e.event.key === "Enter") {
        await Object.keys(e.data).forEach(key => {
          if(e.data[key] === null || e.data[key] === undefined || e.data[key] === '') {
            flag = false;
          }
        })
        if(flag) {
          let newSeason = e.data;
          newSeason.bookingStartDate = new Date(e.data.bookingStartDate).toISOString().replace(".000", "");
          newSeason.bookingEndDate = new Date(e.data.bookingEndDate).toISOString().replace(".000", ""); 
          if(this.isNew) {
            this.ratesService.saveRateSeason(this.rateUid, newSeason).subscribe();
          } else {
            const updatedData = new RateSeasonDetailsModel(newSeason);
            this.ratesService.updateRateSeason(e.data.uid, updatedData).subscribe();
          }
        }
      }
    }

    grid.onCellClicked = (e: any) => {
      console.log("row selected", e);
      if(e.colDef.headerName !== "Action") {
        Object.keys(e.data).forEach(key => {
          if(e.data[key] === null || e.data[key] === undefined || e.data[key] === '') {
            this.isNew = true;
          }
        });
        if(!this.isNew) {
          this.ratesService.sendSeasonGridSubject(e.data);
          this.ratesService.sendRateSeasonExcessSubject(e.data.uid);  
          this.ratesService.sendRateExtrasSubject(e.data.uid);
          this.ratesService.sendRateSeasonValuesSubject(e.data.uid);
        } 
      }
    }

    grid.frameworkComponents = {
      dateCell: DateCellEditorComponent,
      numberCell: NumberCellEditorComponent
    };

    grid.defaultColDef = { resizable: true };
    grid.addHotKey({ key: "Ctrl + Shift + C", func: grid.clone });
  }
}
