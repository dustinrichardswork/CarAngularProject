import { GridBase } from "./grid-base";

export class GridState {

  public isLastCol: boolean;
  private rowIndex: number;
  private rowCount: number;
  private colIndex: number;
  private colCount: number;
  private nextRowIndex: number;
  private nextColIndex: number;
  private emptyRowsToAdd: number;
  private selection: number;

  constructor(private grid: GridBase) { }

  private readGridState() {
    this.emptyRowsToAdd = 0;
    this.rowIndex = this.grid.focusedRoxIndex;
    this.rowCount = this.grid.rowData.length;
    this.colIndex = this.grid.colIds.indexOf(this.grid.focusedColumn.colId);

    const subtract = this.grid.gridApi.columnController.columnDefs
      .filter(x => x.headerName === "" && x.field !== "isChecked").length;

    this.colCount = this.grid.columnDefs.length - subtract;

    this.isLastCol = !((this.colCount + this.colIndex + 1) % this.colCount);
    //this.nextRowIndex = this.rowIndex + (this.isLastCol ? 0 : 1);
    //this.nextColIndex = (this.colCount + this.colIndex + 1) % this.colCount;

    //if (this.isLastCol === true)
    //  this.nextColIndex = 1;
    //if (this.nextRowIndex === this.rowCount) {
    //  this.emptyRowsToAdd++;
    //}

  }

  private applyGridState() {
    for (let i = 0; i < this.emptyRowsToAdd; i++) {
      this.grid.addEmptyRow();
    }
    this.grid.focusCell(this.nextRowIndex, this.nextColIndex);
  }

  moveUp(e) {
    this.readGridState();
    this.nextRowIndex = Math.max(this.rowIndex - 1, 0);
    this.nextColIndex = this.colIndex;
    this.applyGridState();
  }

  moveDown(e) {
    this.readGridState();
    this.nextRowIndex = this.rowIndex + 1;
    this.nextColIndex = this.colIndex;
    if (this.nextRowIndex >= this.rowCount)
      this.emptyRowsToAdd++;
    this.applyGridState();
  }

  moveLeft(e) {
    
    if (e.event.target.selectionStart === this.selection || e.event.target.value.length === 0) {
      this.readGridState();
      this.nextColIndex = this.colIndex - 1;
      this.nextRowIndex = this.rowIndex;
      if (this.nextColIndex >= 0)
        this.applyGridState()
    }
    
    this.selection = e.event.target.selectionStart;
  }

  moveRight(e) {

    if (e.event.target.selectionStart === this.selection || e.event.target.value.length === 0) {
      this.readGridState();
      this.nextColIndex = this.colIndex + 1;
      this.nextRowIndex = this.rowIndex
      if (this.nextColIndex < this.colCount)
        this.applyGridState();
    }
    
    this.selection = e.event.target.selectionStart;
  }

  enterToNextCell(e) {
    this.readGridState();
    const column = this.grid.focusedColumn;
    console.log("Enter Clicked")

    if (column && column.colDef && column.colDef.cellEditorParams && column.colDef.cellEditorParams.autocomplete) {
      this.grid.gridApi.stopEditing(false);
    }

    let isLastCol = !((this.colCount + this.colIndex + 1) % this.colCount);
    this.nextRowIndex = this.rowIndex + <number><unknown>isLastCol;
    let nextColIndex = (this.colCount + this.colIndex + 1) % this.colCount;
    if (isLastCol) nextColIndex = 0;
    if (this.nextRowIndex === this.rowCount - 1 || this.nextRowIndex === this.rowCount) {
      this.grid.addEmptyRow();
      if(this.nextRowIndex === this.rowCount - 1) {
        this.nextRowIndex++;
        nextColIndex = 0;
      }      
    }
    this.grid.gridApi.setFocusedCell(this.nextRowIndex, this.grid.columns[nextColIndex]);
    this.grid.gridApi.startEditingCell({ rowIndex: this.nextRowIndex, colKey: this.grid.columnDefs[nextColIndex].field, keyPress: "f2" });

    e.handled = true;
  }

  updateSelectionState(e) {
    this.selection = e.event.target.selectionStart;
  }

  moveToFirstCol() {

  }
}
