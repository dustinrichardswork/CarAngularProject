import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PromoGridDecorator } from '../grid-decorators/promo-grid-decorator';
import { RatesPromoViewModel } from 'app/shared/models/rates/rates-promo-view.model';
import { ActivatedRoute } from '@angular/router';
import { DropdownCellEditorComponent } from 'app/shared/components/editable-grid/dropdown-cell-editor/dropdown-cell-editor.component';
import { DateCellEditorComponent } from 'app/shared/components/editable-grid/date-cell-editor/date-cell-editor.component';
import { NumberCellEditorComponent } from 'app/shared/components/editable-grid/number-cell-editor/number-cell-editor.component';
import { PromoButtonGroupComponent } from 'app/shared/components/editable-grid/promo-button-group/promo-button-group.component';

@Component({
  selector: 'app-rates-general-promo',
  templateUrl: './rates-general-promo.component.html',
  styleUrls: ['./rates-general-promo.component.css']
})
export class RatesGeneralPromoComponent implements OnInit {
  
  public formGroup: FormGroup;

  public newPromoRowPrototype = new RatesPromoViewModel();
  public newPromoEmitter = new EventEmitter<any>();
  public promoDecorator = null;

  public rowData = [
    { country: 'USA', broker: 'broker1', sippCode: 'MDMR', pickupStart: '2020-01-01', pickupEnd: '2020-01-01', bookingStart: '2020-01-01', bookingEnd: '2020-01-01', blackoutStart: '2020-01-01', blackoutEnd: '2020-01-01', discount: 0 },
    { country: 'USA', broker: 'broker1', sippCode: 'MDMR', pickupStart: '2020-01-01', pickupEnd: '2020-01-01', bookingStart: '2020-01-01', bookingEnd: '2020-01-01', blackoutStart: '2020-01-01', blackoutEnd: '2020-01-01', discount: 0 },
    { country: 'USA', broker: 'broker1', sippCode: 'MDMR', pickupStart: '2020-01-01', pickupEnd: '2020-01-01', bookingStart: '2020-01-01', bookingEnd: '2020-01-01', blackoutStart: '2020-01-01', blackoutEnd: '2020-01-01', discount: 0 },
  ];
  public optionsObject:any = {
    'country': ['USA', 'UK', 'France', 'Italy'],
    'broker': ['broker1', 'broker2', 'broker3', 'broker4'],
    'sippCode': ['MDMR', 'STMR', 'ATRE', 'REYU', 'STMR'],
  }

  columnDefs = [
    {
        groupId:'countryGroup',
        children:[
            { field: 'country', editable: true, cellEditor: DropdownCellEditorComponent, cellEditorParams: {options: this.optionsObject.country}, width:160  },
            { field: 'broker', editable: true, cellEditor: DropdownCellEditorComponent, cellEditorParams: {options: this.optionsObject.broker}, width:140  },
            { field: 'sippCode', editable: true, cellEditor: DropdownCellEditorComponent, cellEditorParams: {options: this.optionsObject.sippCode}, width:120  },
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
    { field: 'discount', editable: true, cellEditor: NumberCellEditorComponent, valueFormatter: (params) => {return Number(params.value).toFixed(2) + "%"; }, width: 110 },
    { headerName:"Action", cellRenderer: PromoButtonGroupComponent, cellRendererParams: { clicked: (field: any) => { }}, width: 120 }
];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      
    });
    this.promoDecorator = new PromoGridDecorator(this.optionsObject);
    this.route.params.subscribe((x) => {
      if(Object.keys(x).length === 0) {
        this.rowData = [];
      }
    });
  }

  insertNewPromo(): void {
    this.newPromoEmitter.emit('data');
  }

}
