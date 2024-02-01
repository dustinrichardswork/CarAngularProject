import { Component, EventEmitter, OnInit, SimpleChanges, Input } from '@angular/core';
import { SippCodeGridDecorator } from '../grid-decorators/sipp-code-grid-decorator';
import { ActivatedRoute } from '@angular/router';
import { RatesService } from 'app/shared/services/rates/rates.service';
import { RateSeasonValueDetailsModel } from 'app/shared/models/rates/rates-season-view.model';
import { DropdownCellEditorComponent } from 'app/shared/components/editable-grid/dropdown-cell-editor/dropdown-cell-editor.component';
import { NumberCellEditorComponent } from 'app/shared/components/editable-grid/number-cell-editor/number-cell-editor.component';
import { DeleteButtonCellComponent } from 'app/shared/components/editable-grid/delete-button-cell/delete-button-cell.component';

@Component({
  selector: 'app-rates-general-sipp-code-list',
  templateUrl: './rates-general-sipp-code-list.component.html',
  styleUrls: ['./rates-general-sipp-code-list.component.css']
})
export class RatesGeneralSippCodeListComponent implements OnInit {
  @Input() vehicleCategories: any
  list: any[] = [];

  // newSippCodeRowPrototype = {sipp: '', '1': null, '2-3': null, '4-7': null, '8-14': null, '15-21': null, '21-31': null, '32-99': null};

  newSippCodeRowPrototype: any
  rowData = [];

  newSippEmitter = new EventEmitter<any>();
  columnDefs = [];
  dayBreaks = [];


  options = []
  sippCodeDecorator = new SippCodeGridDecorator(this.options, this.ratesService);
  // vehicleCategories: any;
  rateSeasonValueDetails: any
  vehicles: any[]
  dataSet: any
  constructor(
    private readonly route: ActivatedRoute,
    private ratesService: RatesService
  ) { }

  ngOnInit(): void {
    this.sippCodeDecorator = new SippCodeGridDecorator(this.options, this.ratesService);
    this.route.params.subscribe((x) => {
      if (Object.keys(x).length === 0) {
        this.rowData = [];
      }
    });
    this.ratesService.getRemoveRateSeasonSubject().subscribe((uid) => {
      console.log("sippp", uid);
      this.rowData = [];
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.vehicleCategories && changes.vehicleCategories.currentValue) {
      this.vehicleCategories = changes.vehicleCategories.currentValue
      this.ratesService.getRateSeasonValuesSubject().subscribe((uid: string) => {
        if (uid === null) return;
        this.initializeGrid();
        this.ratesService.getRateSeasonValues(uid).subscribe((rateSeasonValues: RateSeasonValueDetailsModel[]) => {
          this.rateSeasonValueDetails = rateSeasonValues;
          this.dataSet = {}
          if (this.rateSeasonValueDetails && this.rateSeasonValueDetails.length > 0) {
            for(var i = 0; i < this.rateSeasonValueDetails.length; i++) {
              let vehicle = this.vehicleCategories.filter(v => v.uid === this.rateSeasonValueDetails[i].vehicleCategoryUid)[0].code;
              if( Object.keys(this.dataSet).indexOf(vehicle) < 0 ) {
                this.dataSet[vehicle] = [this.rateSeasonValueDetails[i]]
              } else {
                this.dataSet[vehicle].push(this.rateSeasonValueDetails[i]);
              }
            }
            if(Object.keys(this.dataSet).length > 0) {
              let columnDefs = [];
        
              this.ratesService.getRateSeasonDayBreaks(uid).subscribe((response) => {
                this.dayBreaks = response.items;
                columnDefs.push({ field: 'sipp', editable: true, cellEditor: DropdownCellEditorComponent, cellEditorParams: {options: Object.keys(this.dataSet)}, width: 120});
                let protoType = { sipp: "" };
                for ( var i = 0; i < this.dayBreaks.length; i++) {
                  protoType[`${this.dayBreaks[i].periodDaysFrom}-${this.dayBreaks[i].periodDaysTo}`] = null;
                  columnDefs.push({ field: `${this.dayBreaks[i].periodDaysFrom}-${this.dayBreaks[i].periodDaysTo}`, editable: true, cellEditor: NumberCellEditorComponent, width: 120 });
                  if( i === this.dayBreaks.length - 1 ) {
                    columnDefs.push({ headerName:"Action", cellRenderer: DeleteButtonCellComponent, cellRendererParams: { clicked: (field: any) => { }}, width: 120 },);
                  }
                }
                this.columnDefs = columnDefs;
                this.newSippCodeRowPrototype = protoType;
                this.rowData = []
                for(var i = 0; i < Object.keys(this.dataSet).length; i++) {
                  let sipp = Object.keys(this.dataSet)[i];
                  let newRowdata = { sipp: sipp };
                  for( var j = 0; j < this.dataSet[sipp].length; j++) {
                    let seasonValue = this.dataSet[sipp][j]
                    let daybreak = this.dayBreaks.filter(i => i.uid === seasonValue.dayBreakUid)[0];
                    newRowdata[`${daybreak.periodDaysFrom}-${daybreak.periodDaysTo}`] = seasonValue.value;
                    newRowdata[`${daybreak.periodDaysFrom}-${daybreak.periodDaysTo}_uid`] = seasonValue.uid;
                  }
                  this.rowData.push(newRowdata);
                }
              });
            }
          }
        })
      })
    }
  }

  initializeGrid() {
    this.rowData = [];
    this.columnDefs = [];
    this.newSippCodeRowPrototype = {};
  }

  insertNewSipp(): void {
    this.newSippEmitter.emit('new');
  }

}
