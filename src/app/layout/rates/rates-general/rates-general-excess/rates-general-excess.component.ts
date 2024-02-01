import { Component, EventEmitter, OnInit, SimpleChanges, Input } from '@angular/core';
import { ExcessGridDecorator } from '../../rates-general/grid-decorators/excess-grid-decorator';
import { RatesExcessViewModel } from 'app/shared/models/rates/rates-excess-view.model';
import { ActivatedRoute } from '@angular/router';
import { RatesService } from 'app/shared/services/rates/rates.service';
import { RateSeasonExcessValueDetailsModel } from 'app/shared/models/rates/rates-season-view.model';
import { NumberCellEditorComponent } from 'app/shared/components/editable-grid/number-cell-editor/number-cell-editor.component';
import { DeleteButtonCellComponent } from 'app/shared/components/editable-grid/delete-button-cell/delete-button-cell.component';

@Component({
  selector: 'app-rates-general-excess',
  templateUrl: './rates-general-excess.component.html',
  styleUrls: ['./rates-general-excess.component.css'],
})
export class RatesGeneralExcessComponent {
  @Input() vehicleCategories: any
  excessDecorator = new ExcessGridDecorator(this.ratesService);
  newExcessEmitter = new EventEmitter<any>();
  excesses: any
  newExcessRowPrototype: any
  vehicles: any
  excessValues: any

  columnDefs = []

  rowData = [];

  constructor(
    private readonly route: ActivatedRoute,
    private ratesService: RatesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((x) => {
      if(Object.keys(x).length === 0) {
        this.rowData = [];
      }
    });
    this.ratesService.getRemoveRateSeasonSubject().subscribe((uid) => {
      this.rowData = [];
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.vehicleCategories && changes.vehicleCategories.currentValue) {
      this.vehicleCategories = changes.vehicleCategories.currentValue;
      this.ratesService.getRateSeasonExcessSubject().subscribe(uid => {
        this.initializeGrid();
        this.ratesService.getRateSeasonExcessValues(uid).subscribe((values: RateSeasonExcessValueDetailsModel[]) => {
          if( values.length > 0 ) {
            this.vehicles = [];
            this.excessValues = values;
            for(var i = 0; i < values.length; i ++) {
              let vehicle = this.vehicleCategories.filter(v => v.uid === values[i].vehicleCategoryUid)[0];
              if( Object.keys(this.vehicles).indexOf(vehicle.uid) < 0) {
                this.vehicles[vehicle.uid] = vehicle.code;
              }
            }
            this.ratesService.getRateSeasonExcess(uid).subscribe(excesses => {  
              this.excesses = excesses;
              if (this.excesses && this.excesses.length > 0 && this.excessValues && this.excessValues.length > 0) {
                this.rowData = [];
                this.excesses.map(excess => {
                  let excessRelatedItems = this.excessValues.filter(v => v.rateSeasonExcessUid === excess.uid);
                  let newRowData = {ExcessCode: excess.code};
                  excessRelatedItems.map(i => {
                    newRowData[this.vehicles[i.vehicleCategoryUid]] = i.value;
                    newRowData[this.vehicles[i.vehicleCategoryUid]+ "_uid"] = i.uid;
                  })
                  this.rowData.push(newRowData);
                })
              }
            });
          }
        })
      })
    }
  }

  initializeGrid() {
    let newExcessRowPrototype = {  ExcessCode: '' }
    let columnDefs = [];
    columnDefs.push({ field: 'ExcessCode', editable: true });
    for(var i = 0; i < this.vehicleCategories.length; i ++) {
      newExcessRowPrototype[this.vehicleCategories[i].code] = null;
      columnDefs.push({ field: this.vehicleCategories[i].code, editable: true, width: 140, cellEditor: NumberCellEditorComponent });
    }
    this.columnDefs = columnDefs.concat({ headerName:"Action", cellRenderer: DeleteButtonCellComponent, cellRendererParams: { clicked: (field: any) => { }}, width: 120 });
    this.newExcessRowPrototype = newExcessRowPrototype;
    this.rowData = [];
  }

  insertExcess() {
    this.newExcessEmitter.emit('data');
  }
}
