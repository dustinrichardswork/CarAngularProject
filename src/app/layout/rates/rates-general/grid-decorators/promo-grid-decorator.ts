import { DateCellEditorComponent } from "app/shared/components/editable-grid/date-cell-editor/date-cell-editor.component";
import { DropdownCellEditorComponent } from "app/shared/components/editable-grid/dropdown-cell-editor/dropdown-cell-editor.component";
import { NumberCellEditorComponent } from "app/shared/components/editable-grid/number-cell-editor/number-cell-editor.component";
import { GridBase } from "app/shared/components/editable-grid/grid-base";
import { GridDecoratorBase } from "app/shared/components/editable-grid/grid-decorator-base";
import { PromoButtonGroupComponent } from "app/shared/components/editable-grid/promo-button-group/promo-button-group.component";

export class PromoGridDecorator extends GridDecoratorBase {

  countryOptions: any[] = [];
  brokerOptions: any[] = [];
  sippCodeOptions: any[] = [];
  constructor(optionsObject : any= {} ) {
    super();
    this.countryOptions = optionsObject?.country || [];
    this.brokerOptions = optionsObject?.broker || [];
    this.sippCodeOptions = optionsObject?.sippCode || [];
  }

  buildGrid(grid: GridBase) {
    grid.columnDefs =  [
        {
            groupId:'countryGroup',
            children:[
                { field: 'country', editable: true, cellEditor: DropdownCellEditorComponent, cellEditorParams: {options: this.countryOptions}, width:160  },
                { field: 'broker', editable: true, cellEditor: DropdownCellEditorComponent, cellEditorParams: {options: this.brokerOptions}, width:140  },
                { field: 'sippCode', editable: true, cellEditor: DropdownCellEditorComponent, cellEditorParams: {options: this.sippCodeOptions}, width:120  },
            ]
        },
        {
            headerName: "Pick Up Period",
            groupId:'pickUpPeriod',
            children:[
                { headerName:'Start', field: 'pickupStart', editable: true, cellEditor: DateCellEditorComponent, width: 110 },
                { headerName:'End', field: 'pickupEnd', editable: true, cellEditor: DateCellEditorComponent, width: 110 },
            ]
        },
        {
            headerName: "Booking Period",
            groupId:'bookingPeriod',
            children:[
                { headerName:'Start', field:'bookingStart', editable: true, cellEditor: DateCellEditorComponent, width: 110 },
                { headerName:'End', field: 'bookingEnd', editable: true, cellEditor: DateCellEditorComponent, width: 110 },
            ]
        },
        {
            headerName: "Blackout Period",
            groupId:'blackoutPeriod',
            children:[
                { headerName:'Start', field:'blackoutStart', editable: true, cellEditor: DateCellEditorComponent, width: 110 },
                { headerName:'End', field: 'blackoutEnd', editable: true, cellEditor: DateCellEditorComponent, width: 110 },
            ]
        },
        { field: 'discount', editable: true, cellEditor: NumberCellEditorComponent, valueFormatter: (params) => {return Number(params.value).toFixed(2) + "%"; } },
        { headerName:"Action", cellRenderer: PromoButtonGroupComponent, cellRendererParams: { clicked: (field: any) => { }}, width: 120 }
    ];

    grid.frameworkComponents = {
      dateCell: DateCellEditorComponent,
      dropdownCell: DropdownCellEditorComponent,
      numberCell: NumberCellEditorComponent,
    };

    grid.onCellClicked = (e) => {
        console.log(e);
    }

    grid.defaultColDef = { resizable: true };
    grid.addHotKey({ key: "Ctrl + Shift + C", func: grid.clone });
  }
}
