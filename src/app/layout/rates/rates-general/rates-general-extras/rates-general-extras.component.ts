import { Component, EventEmitter, OnInit, Input, SimpleChanges } from '@angular/core';
import { ExtraGridDecorator } from '../grid-decorators/extra-grid-decorator';
import { ExtraCheckDecorator } from '../grid-decorators/extra-check-decorator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RatesService } from 'app/shared/services/rates/rates.service';
import { NumberCellEditorComponent } from 'app/shared/components/editable-grid/number-cell-editor/number-cell-editor.component';
import { CheckboxCellEditorComponent } from 'app/shared/components/editable-grid/checkbox-cell-editor/checkbox-cell-editor.component';
import { DeleteButtonCellComponent } from 'app/shared/components/editable-grid/delete-button-cell/delete-button-cell.component';
import { DropdownCellEditorComponent } from 'app/shared/components/editable-grid/dropdown-cell-editor/dropdown-cell-editor.component';
import { CellEditorComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes';

@Component({
  selector: 'app-rates-general-extras',
  templateUrl: './rates-general-extras.component.html',
  styleUrls: ['./rates-general-extras.component.css']
})
export class RatesGeneralExtrasComponent implements OnInit {

  @Input() vehicleCategories: any
  newExtraRowPrototype: any;
  newExtraCheckPrototype: any;
  newRowEmitter = new EventEmitter<any>();
  newExtraCheckEmitter = new EventEmitter<any>();
  extraSubject: Subscription;
  extras = []
  columnDefs: any
  checkColumnDefs: any
  rowData = [];

  rowCheckData = []


  // extraDecorator = new ExtraGridDecorator(this.ratesService);
  extraDecorator = new ExtraGridDecorator(this.ratesService)
  extraCheckDecorator = new ExtraCheckDecorator(this.ratesService);
  constructor(
    private route: ActivatedRoute,
    private ratesService: RatesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((x) => {
      if (Object.keys(x).length === 0) {
        this.rowData = [];
        this.rowCheckData = [];
      }
    });
    this.ratesService.getRemoveRateSeasonSubject().subscribe((uid) => {
      this.rowData = [];
      this.rowCheckData = [];
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.vehicleCategories && changes.vehicleCategories.currentValue) {
      this.vehicleCategories = changes.vehicleCategories.currentValue;
      this.initializeGrid();;
      this.ratesService.getExtraObservable().subscribe(uid => {
        this.initializeGrid();
        this.ratesService.getRateSeasonExtra(uid).subscribe(async extras => {
          this.extras = extras;
          if (this.extras && this.extras.length > 0) {
            let rowData = [];
            let rowCheckData = [];
            for( var i = 0; i < this.extras.length; i++) {
              let extra = this.extras[i];
              let sequence = i;
              this.ratesService.getRateSeasonExtraValues(extra.seasonUid).subscribe((values) => {
                rowData.push(this.buildExtraGrid(extra, values));
                rowCheckData.push(this.buildExtraCheckGrid(extra, values));
                if(sequence === this.extras.length - 1) {
                  this.rowData = rowData;
                  this.rowCheckData = rowCheckData;
                }
              })
            }
          }
        })
      })
    }
  }

  initializeGrid() {
    let newExtraRowPrototype = {code: '', 'maxValues': null,};
    this.rowData = [];
    this.rowCheckData = [];
      let columnDefs = [];
      columnDefs.push({ field: 'code', editable: true, cellEditor: DropdownCellEditorComponent, cellEditorParams: {options: this.extras?.map(extra => {return extra.code})} },
      { field: 'maxValues', editable: true, cellEditor: NumberCellEditorComponent }
      );
      let checkColumnDefs = [];
      checkColumnDefs.push({ headerName:'Extra Code', field: 'ExtraCode', editable: true, cellEditor: DropdownCellEditorComponent, cellEditorParams: {options: this.extras.map(extra => {return extra.code})}});
      let newExtraCheckPrototype = { ExtraCode: ''};
      for(var i = 0; i < this.vehicleCategories.length; i++) {
        newExtraRowPrototype[this.vehicleCategories[i].code] = null;
        columnDefs.push({ field: this.vehicleCategories[i].code, editable: true, width: 160, cellEditor: NumberCellEditorComponent })
        newExtraCheckPrototype[`${this.vehicleCategories[i].code}_isValueChangeAllowed`] = null;
        newExtraCheckPrototype[`${this.vehicleCategories[i].code}_isIncluded`] = null;
        newExtraCheckPrototype[`${this.vehicleCategories[i].code}_isRequired`] = null;
        newExtraCheckPrototype[`${this.vehicleCategories[i].code}_hasInvoiceVoucher`] = null;
        newExtraCheckPrototype[`${this.vehicleCategories[i].code}_isAvailable`] = null;
        newExtraCheckPrototype[`${this.vehicleCategories[i].code}-isBreakdown`] = null;
        let newColumnGroup = [];
        newColumnGroup.push({ headerName:`Value Change`, field: `${this.vehicleCategories[i].code}_isValueChangeAllowed`, editable: true, cellEditor: CheckboxCellEditorComponent, valueFormatter: (params) => {if(params.value == true) return 'Yes'; else return 'No'}, width:70})
        newColumnGroup.push({ headerName:'Included', field: `${this.vehicleCategories[i].code}_isIncluded`, editable: true, cellEditor: CheckboxCellEditorComponent, valueFormatter: (params) => {if(params.value == true) return 'Yes'; else return 'No'}, width:80})
        newColumnGroup.push({ headerName:'Mandatory', field: `${this.vehicleCategories[i].code}_isRequired`, editable: true, cellEditor: CheckboxCellEditorComponent, valueFormatter: (params) => {if(params.value == true) return 'Yes'; else return 'No'}, width:80})
        newColumnGroup.push({ headerName:'Invoice', field: `${this.vehicleCategories[i].code}_hasInvoiceVoucher`, editable: true, cellEditor: CheckboxCellEditorComponent, valueFormatter: (params) => {if(params.value == true) return 'Yes'; else return 'No'}, width:80},)
        newColumnGroup.push({ headerName:'Not Available', field: `${this.vehicleCategories[i].code}_isAvailable`, editable: true, cellEditor: CheckboxCellEditorComponent, valueFormatter: (params) => {if(params.value == true) return 'Yes'; else return 'No'}, width:80})
        newColumnGroup.push({ headerName:'Is Breakdown', field: `${this.vehicleCategories[i].code}_isBreakdown`, editable: true, cellEditor: CheckboxCellEditorComponent, valueFormatter: (params) => {if(params.value == true) return 'Yes'; else return 'No'}, width:80});
        checkColumnDefs.push({
          headerName: this.vehicleCategories[i].code,
          children:newColumnGroup
        },)
      }
      this.newExtraRowPrototype = newExtraRowPrototype;
      this.newExtraCheckPrototype = newExtraCheckPrototype;
      this.columnDefs = columnDefs.concat({ headerName:"Action", cellRenderer: DeleteButtonCellComponent, cellRendererParams: { clicked: (field: any) => { }}, width: 120 });
      this.checkColumnDefs = checkColumnDefs;
    }

  buildExtraGrid(extra, values) {
    let newRowData = { code: extra.code, maxValues: 5, uid: extra.uid, entityVersion: extra.entityVersion }
    extra.extraValues = values;
    for(var i = 0; i < extra.extraValues.length; i++) {
      let vehicle = this.vehicleCategories.filter(v => v.uid === extra.extraValues[i].vehicleCategoryUid)[0]
      newRowData[vehicle.code] = extra.extraValues[i].value
      newRowData[vehicle.code + "_uid"] = extra.extraValues[i].uid
    }
    return newRowData;
  }

  buildExtraCheckGrid(extra, values) {
    let newRowData = { ExtraCode: extra.code }
    for(var i = 0; i < values.length; i++) {
      let vehicle = this.vehicleCategories.filter(v => v.uid === values[i].vehicleCategoryUid)[0];
      newRowData[`${vehicle.code}_isValueChangeAllowed`] = values[i].isValueChangeAllowed;
      newRowData[`${vehicle.code}_isIncluded`] = values[i].isIncluded;
      newRowData[`${vehicle.code}_isRequired`] = values[i].isRequired;
      newRowData[`${vehicle.code}_hasInvoiceVoucher`] = values[i].hasInvoiceVoucher;
      newRowData[`${vehicle.code}_isAvailable`] = values[i].isAvailable;
      newRowData[`${vehicle.code}_isBreakdown`] = values[i].isBreakdown;
      newRowData[`${vehicle.code}_Uid`] = values[i].uid;
    }
    return newRowData;
  }

  insertExtra() {
    this.newRowEmitter.emit('new');
  }

  insertExtraCheck() {
    this.newExtraCheckEmitter.emit('new');
  }
}
