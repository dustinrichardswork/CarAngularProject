import { Component, EventEmitter, HostListener, Input, OnInit, ViewChild, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { GridBase } from './grid-base';
import { AgGridAngular } from 'ag-grid-angular';
import { RatesService } from 'app/shared/services/rates/rates.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editable-grid',
  templateUrl: './editable-grid.component.html',
  styleUrls: ['./editable-grid.component.css']
})
export class EditableGridComponent extends GridBase implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.gridApi.sizeColumnsToFit();
  }

  @Input() columnDefs: ColDef[];
  @Input() rowData: any[];
  @Input() decorator: any;
  @Input() newRowPrototype: any;

  @Input() addEmitter: EventEmitter<any>;
  @Input() autoSelectRowEmitter: EventEmitter<any>;

  @ViewChild('gridProperties') agGrid: AgGridAngular;

  isRowUpdated: boolean = false;
  changeRatesTabSbj: Subscription

  public defaultColDef: ColDef = {
    sortable: true,
    //filter: true,
    editable: true
  };

  cellRules = { 'required-input': params => params.value === "" || params.value === null}

  constructor(private cdr: ChangeDetectorRef, public ratesService: RatesService) {
    super()
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.columnDefs = this.columnDefs?.map((obj: any) => {
      if (obj.headerName !== 'Action') {
        obj.cellClassRules = this.cellRules;
        if (obj.children) {
          obj.children.map((child: any) => {
            child.cellClassRules = this.cellRules;
          })
        }
      }
      return obj;
    })
    this.subscribeToParentEmitter();
    this.autoSelectRowEmitter?.subscribe((row) => {
      setTimeout(() => {
        const node = this.agGrid.api.getRowNode(String(row.rowIndex));
        this.agGrid.api.selectNode(node, true, false);
        this.defaultGridShow(row.data);
      }, 200)
    })
    this.changeRatesTabSbj = this.ratesService.getChangeRatesTabSubject().subscribe((data) => {
      this.gridApi?.sizeColumnsToFit();
    })
  }

  defaultGridShow(defaultSeasonData) {
    if(defaultSeasonData?.uid) {
      this.ratesService.sendSeasonGridSubject(defaultSeasonData);
      this.ratesService.sendRateSeasonExcessSubject(defaultSeasonData.uid);  
      this.ratesService.sendRateExtrasSubject(defaultSeasonData.uid);
      this.ratesService.sendRateSeasonValuesSubject(defaultSeasonData.uid);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rowData && changes.rowData.currentValue) {
      this.rowData = changes.rowData.currentValue;
      this.items = this.rowData;
    }
    if (changes.columnDefs && changes.columnDefs.currentValue) {
      setTimeout(() => {
        this.gridApi?.sizeColumnsToFit();
        this.columns = this.params?.columnApi.getAllDisplayedVirtualColumns();
      }, 100)
      this.columnDefs  = changes.columnDefs.currentValue;
      this.columnDefs = this.columnDefs?.map(obj => {
        if (obj.headerName !== 'Action')
          obj.cellClassRules = this.cellRules;
        return obj;
      })
      // this.columns = this.params?.columnApi.getAllDisplayedVirtualColumns();
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.items = this.rowData;
    this.params = params;
    this.columns = params.columnApi.getAllDisplayedVirtualColumns();
    this.colIds = this.columnDefs ? this.columnDefs.map(column => column.field) : [];
    this.gridApi.sizeColumnsToFit();
  }

  subscribeToParentEmitter(): void {
    this.addEmitter?.subscribe((data: string) => {
      this.addEmptyRow();
      setTimeout(() => {
        this.gridApi.setFocusedCell(this.rowData.length - 1, this.columns[0]['colId']);
        this.gridApi.startEditingCell({ rowIndex: this.rowData.length - 1, colKey: this.columns[0]['colId'] })
      }, 200)
    });
  }

  onRowValueChanged(event) {
    this.isRowUpdated = true;
    this.gridApi.redrawRows();
  }

  onRowEditingStopped(event) {
  }

  ngOnDestroy() {
    this.changeRatesTabSbj.unsubscribe();
  }


}
