import * as KeyCodes from '@angular/cdk/keycodes';
import { AfterViewInit, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { ColDef, GridOptions } from "ag-grid-community";
import { deepCopy } from 'app/shared/common/deepCopy';
import * as KeyParser from 'key-event-to-string';
import { GridDecoratorBase } from "./grid-decorator-base";
import { GridState } from './grid-state';
import { Subscription } from 'rxjs';
import { RatesService } from 'app/shared/services/rates/rates.service';

export interface HotKey {
  key: string;
  func(options, grid): any;
}
export abstract class GridBase implements OnInit {

  @Output()
  tabPress = new EventEmitter();

  @Output()
  datasaveemitter = new EventEmitter();

  @Output()
  rowAdded = new EventEmitter();

  @Output()
  selectedItemChanged = new EventEmitter();

  @Input()
  decorator: GridDecoratorBase;

  @Input()
  newRowPrototype: any;

  ratesService: RatesService
  decoratorSubject: Subscription

  rowClassRules: any;
  columnDefs;
  rowData = [];
  columns;
  params;
  colIds;
  rowIndex;
  colIndex;
  nextRowIndex;
  gridApi;
  isEscape: boolean = false;
  gridOptions: GridOptions;
  selectedItem: any;
  frameworkComponents;
  defaultColDef;

  private state: GridState;
  private boundItems = [];

  private hotKeys: HotKey[] = [];
  private prohibitedCombinations = ["Ctrl + T", "Ctrl + Shift + N"];

  get items() {
    return this.boundItems;
  }

  get focusedColumn() {
    return this.gridApi.focusController.focusedCellPosition.column;
  }

  get focusedRoxIndex() {
    return this.gridApi.focusController.focusedCellPosition.rowIndex;
  }

  updateSelectionState(event) {
    this.state.updateSelectionState(event);
  }

  set items(value) {
    this.boundItems = value;
    this.rowData = value;
    if (this.rowData) {
      this.initRowData();
    }
  }

  constructor() {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
  }


  addEmptyRow() {
    const item = deepCopy(this.newRowPrototype);
    this.boundItems.push(item);
    this.rowData = [...this.boundItems];
  }

  makeEmptyGrid() {
    const item = deepCopy(this.newRowPrototype);
    this.rowData.push(item);
  }

  private cloneRow(originalItem) {
    const item = deepCopy(originalItem);
    this.boundItems.push(item);
    this.rowData = [...this.boundItems];
  }

  ngOnInit(): void {
    if (this.decorator)
      this.decorator.buildGrid(this);
    this.state = new GridState(this);
  }
  
  preventBrowserKeys(e) {
    //add additional combinations if needed
    if (e.ctrlKey && e.shiftKey && e.which == KeyCodes.C) {
      e.preventDefault();
      return false;
    }

    //preventing browser hotkeys conflicts
    if (this.hotKeys.some(x => x.key == KeyParser()(e))) {
      e.preventDefault();
      return false;
    }
  }

  addHotKey(hotkey: HotKey) {

    if (this.prohibitedCombinations.some(cmb => cmb == hotkey.key)) {
      console.error(`\"${hotkey.key}\" is a prohibited combination.`);
      return;
    }

    if (this.hotKeys.some(x => x.key == hotkey.key)) {
      console.error(`"${hotkey.key}" combination already exists in the hotkey list`);
      return;
    }

    this.hotKeys.push(hotkey);
  }

  setFocus() {
    if (this.rowData.length > this.rowIndex)
      this.gridApi.setFocusedCell(this.rowIndex, this.columns[1]);
    else
      this.gridApi.setFocusedCell(0, this.columns[1]);
  }

  protected initRowData() {
    if (!this.rowData.length) {
      this.addEmptyRow();
    }
    this.nextRowIndex = 0;
  }

  onCellFocused(params) {
    if (!this.gridApi)
      this.gridApi = params.api;

    if (this.rowData) {
      this.gridApi.forEachNode(node => { if (node.rowIndex === params.rowIndex) node.setSelected(true) });
      if (this.selectedItem !== this.rowData[params.rowIndex]) {
        this.selectedItem = this.rowData[params.rowIndex];
        this.selectedItemChanged.emit(this.selectedItem);
      }
      if (this.isEscape)
        this.isEscape = false;
      else
        if (params && params.column) {
          if (params.column.colDef && params.column.colDef.cellEditorParams && params.column.colDef.cellEditorParams.autocomplete) {
            return;
          }

          this.gridApi.startEditingCell({ rowIndex: params.rowIndex, colKey: params.column.colId });
        }
    }
  }

  onGridReady(params) {
    // this.decoratorSubject = this.ratesService.getExtraDecoratorObservable().subscribe((columnDefs) => {
    //   // if(data) this.decorators = data
    //   console.log(columnDefs)
    //   this.columnDefs = columnDefs
    //   this.gridApi = params.api;
    //   this.columns = params.columnApi.getAllDisplayedVirtualColumns();
    //   this.gridApi.setFocusedCell(0, this.columns[0]);
    //   this.colIds = this.columnDefs ? this.columnDefs.map(column => column.field) : [];
    //   this.gridApi.sizeColumnsToFit();
        
    // })
    this.gridApi = params.api;
    this.columns = params.columnApi.getAllDisplayedVirtualColumns();
    this.gridApi.setFocusedCell(0, this.columns[0]);
    this.colIds = this.columnDefs ? this.columnDefs.map(column => column.field) : [];
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setDomLayout('normal');
  }

  private handleHotKeysBehavior(e) {

    console.log("Hot KEys")
    if (this.hotKeys && this.hotKeys.length > 0) {
      this.hotKeys.forEach(x => {
        if (KeyParser()(e.event) == x.key) {
          x.func(e, this);
        }
      });
    }
  }

  onCellKeyDown(e) {

    this.handleHotKeysBehavior(e);

    if (e.event.keyCode === KeyCodes.ENTER) {
      this.state.enterToNextCell(e);
    }
    else if (e.event.keyCode === KeyCodes.DOWN_ARROW) {
      this.state.moveDown(e);
    }
    else if (e.event.keyCode === KeyCodes.UP_ARROW) {
      this.state.moveUp(e);
    }
    else if (e.event.keyCode === KeyCodes.LEFT_ARROW) {
      this.state.moveLeft(e);
    }
    else if (e.event.keyCode === KeyCodes.RIGHT_ARROW) {
      this.state.moveRight(e)
    }
    else if (e.event.keyCode === KeyCodes.ESCAPE) {
      this.escape();
    }
    else if (e.event.keyCode === KeyCodes.TAB) {
      this.gridApi.stopEditing();
      this.tabPress.emit();
    }

    this.state.updateSelectionState(e)
  }

  escape() {
    this.isEscape = true;
    this.gridApi.stopEditing();
    this.gridApi.setFocusedCell(this.focusedRoxIndex, this.focusedColumn.colId);
  }

  clone(opt, grid) {
    const rows = grid.gridApi.getSelectedRows();
    if (rows && rows.length > 0) {
      grid.cloneRow(rows[0]);
      grid.gridApi.setFocusedCell(grid.focusedRoxIndex, grid.focusedColumn.colId);
    }
  }
  clonewhenclicked(opt, grid) {
    if (opt.data) {
      grid.cloneRow(opt.data);
      grid.gridApi.setFocusedCell(grid.focusedRoxIndex, grid.focusedColumn.colId);
    }
  }

  


  onRemove(opt, grid) {
    let rowCount = grid.rowData.length;
    if (rowCount === 1)
      return;

    let rIndex = grid.focusedRoxIndex;
    grid.boundItems.splice(rIndex, 1);
    grid.rowData = grid.boundItems.map(element => {
      return element;
    });
    if (rIndex === grid.rowData.length)
      rIndex--;
    grid.gridApi.setFocusedCell(rIndex, grid.columns[grid.colIndex]);
  }

  onGridSizeChanged(params, container) {
    var gridWidth = document.getElementById(container)?.offsetWidth;
    if (gridWidth) {
      var columnsToShow = [];
      var columnsToHide = [];
      var totalColsWidth = 0;
      var allColumns = params.columnApi.getAllColumns();
      for (var i = 0; i < allColumns.length; i++) {
        var column = allColumns[i];
        totalColsWidth += column.getMinWidth();
        if (totalColsWidth > gridWidth) {
          columnsToHide.push(column.colId);
        } else {
          columnsToShow.push(column.colId);
        }
      }
      params.columnApi.setColumnsVisible(columnsToShow, true);
      params.columnApi.setColumnsVisible(columnsToHide, false);
      this.gridApi.sizeColumnsToFit();
    }
  }

  focusCell(rowNum: number, colNum: number) {
    this.gridApi.setFocusedCell(rowNum, this.columns[colNum]);
  }
  onchange(params) {

    this.datasaveemitter.emit(params);
  }

  onRowSelected(event) {
  }

  onRowValueChanged(event) {

  }
  onCellClicked(event) {
    
  }

  onRowClicked(event) {
    
  }
}

