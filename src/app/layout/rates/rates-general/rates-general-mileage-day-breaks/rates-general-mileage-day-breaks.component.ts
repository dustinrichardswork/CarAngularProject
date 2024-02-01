import { Component, EventEmitter, OnInit, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { DayBreakGridDecorator } from '../grid-decorators/day-break-grid-decorator';
import { ActivatedRoute } from '@angular/router';
import { RatesService } from 'app/shared/services/rates/rates.service';
import { RateSeasonValueDetailsModel } from 'app/shared/models/rates/rates-season-view.model';

import { CheckboxCellEditorComponent } from "app/shared/components/editable-grid/checkbox-cell-editor/checkbox-cell-editor.component";
import { NumberCellEditorComponent } from "app/shared/components/editable-grid/number-cell-editor/number-cell-editor.component";
import { DeleteButtonCellComponent } from 'app/shared/components/editable-grid/delete-button-cell/delete-button-cell.component';
@Component({
  selector: 'app-rates-general-mileage-day-breaks',
  templateUrl: './rates-general-mileage-day-breaks.component.html',
  styleUrls: ['./rates-general-mileage-day-breaks.component.css']
})
export class RatesGeneralMileageDayBreaksComponent implements OnInit {

  list: any[] = [];
  @Input() addDayBreakEmitter: EventEmitter<any>;
  @Input() vehicleCategories: any
  rateSeasonValueDetails: RateSeasonValueDetailsModel[]
  newRowEmitter = new EventEmitter<any>();
  vehicles: any[] = [];
  columnDefs: any[] = []
  newDayBreakRowPrototype: any = {};

  rowData = [];

  dayBreakDecorator = new DayBreakGridDecorator(this.ratesService);

  constructor(
    private route: ActivatedRoute,
    private ratesService: RatesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscribeToParentEmitter();
    this.route.params.subscribe((x) => {
      if (Object.keys(x).length === 0) {
        this.rowData = [];
      }
    });
    this.ratesService.getRemoveRateSeasonSubject().subscribe((uid) => {
      this.rowData = [];
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.vehicleCategories && changes.vehicleCategories.currentValue) {
      this.vehicleCategories = changes.vehicleCategories.currentValue
      this.ratesService.getRateSeasonValuesSubject().subscribe((uid: string) => {
        if( uid === null) return;
        this.initializeGrid();
        this.ratesService.getRateSeasonValues(uid).subscribe((rateSeasonValues: RateSeasonValueDetailsModel[]) => {
          this.rateSeasonValueDetails = rateSeasonValues;
          if (this.rateSeasonValueDetails && this.rateSeasonValueDetails.length > 0) {
            let mileages = [];
            let dataSet = [];
            for (var i = 0; i < this.rateSeasonValueDetails.length; i++) {
              let vehicle = this.vehicleCategories.filter(v => v.uid === this.rateSeasonValueDetails[i].vehicleCategoryUid)[0].code;
              this.vehicles.indexOf(vehicle) < 0 && this.vehicles.push(vehicle);
              if (mileages.indexOf(this.rateSeasonValueDetails[i].dayBreakUid) < 0) {
                mileages.push(this.rateSeasonValueDetails[i].dayBreakUid);
                dataSet[this.rateSeasonValueDetails[i].dayBreakUid] = [this.rateSeasonValueDetails[i]]
              } else {
                dataSet[this.rateSeasonValueDetails[i].dayBreakUid].push(this.rateSeasonValueDetails[i])
              }
            }
            if (this.vehicles.length > 0) {
              this.newDayBreakRowPrototype = {};
              this.newDayBreakRowPrototype['mileage'] = null;
              let columnDefs = [];
              columnDefs.push(this.addInitialColumn);
              // this.vehicles.map((vehicle: any) => {
              for(var i = 0; i < this.vehicles.length; i ++) {
                columnDefs.push(this.addNewColumn(this.vehicles[i]));
                this.newDayBreakRowPrototype[`${this.vehicles[i]}_No`] = null;
                this.newDayBreakRowPrototype[`${this.vehicles[i]}_Free`] = false;
                this.newDayBreakRowPrototype[`${this.vehicles[i]}_Value`] = null;
                this.newDayBreakRowPrototype[`${this.vehicles[i]}_IsUnlimited`] = false;
                // if( i === this.vehicles.length - 1 ) {
                //   columnDefs.push({ headerName:"Action", cellRenderer: DeleteButtonCellComponent, cellRendererParams: { clicked: (field: any) => { }}, width: 120 },);
                // }
              }
              if (columnDefs && columnDefs.length > 0) {
                this.columnDefs = columnDefs;
                console.log(this.columnDefs)
              }
            }
            if (dataSet && Object.keys(dataSet).length > 0) {
              let rowData = [];
              this.ratesService.getRateSeasonDayBreaks(uid).subscribe((response) => {
                let dayBreaks = response.items;
                for (var i = 0; i < Object.keys(dataSet).length; i++) {
                  let data = Object.keys(dataSet)[i];
                    let newData = {}
                    let dayBreak = dayBreaks.filter(i => i.uid === data)[0];
                    newData['mileage'] = `${dayBreak.periodDaysFrom}-${dayBreak.periodDaysTo}`;
                    dataSet[data].forEach(element => {
                      let vehicle = this.vehicleCategories.filter(v => v.uid === element.vehicleCategoryUid)[0].code;
                      newData[`${vehicle}_Uid`] = element.uid;
                      newData[`${vehicle}_No`] = element.freeMiles.distanceIncluded;
                      newData[`${vehicle}_Free`] = element.freeMiles.isResetDaily;
                      newData[`${vehicle}_Value`] = element.freeMiles.price;
                      newData[`${vehicle}_IsUnlimited`] = element.freeMiles.isUnlimited;
                      newData[`${vehicle}_SippValue`] = element.value;
                    });
                    rowData.push(newData);
                }
                this.rowData = rowData
              });  
            }

          }
        })
      })
    }
  }

  subscribeToParentEmitter(): void {
    this.addDayBreakEmitter?.subscribe((data: string) => {
      this.newRowEmitter.emit(data);
    });
  }

  addNewColumn(vehicle): any {
    let newColumn = {
      groupId: vehicle,
      headerName: vehicle,
      children: [
        { field: `${vehicle}_No`, headerName: 'No of Free KMs', editable: true, cellEditor: NumberCellEditorComponent, width: 80 },
        { field: `${vehicle}_Free`, headerName: 'Free KMs per Day', editable: true, cellEditor: CheckboxCellEditorComponent, valueFormatter: (params) => { if (params.value === true) return 'Yes'; else return 'No' }, width: 80 },
        { field: `${vehicle}_Value`, headerName: 'Value', editable: true, cellEditor: NumberCellEditorComponent, width: 80 },
        { field: `${vehicle}_IsUnlimited`, headerName: 'Is Unlimited', editable: true, cellEditor: CheckboxCellEditorComponent, valueFormatter: (params) => { if (params.value === true) return 'Yes'; else return 'No' }, width: 80 }
      ]
    };
    return newColumn;
  }

  initializeGrid(): void {
    this.newDayBreakRowPrototype = {};
    this.columnDefs = [];
    this.rowData = [];
    this.vehicles = [];
  }

  get addInitialColumn(): any {
    let initialColumn = {
      groupId: 'mileage',
      headerName: 'Mileage',
      children: [
        { field: 'mileage', headerName: 'Day Breaks', editable: true, width:120 },
      ],
    };
    return initialColumn;
  }

}
