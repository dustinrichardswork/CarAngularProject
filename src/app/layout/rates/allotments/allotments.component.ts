import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FleetGridDecorator } from './grid-decorators/fleet-grid-decorator';
import { GlobalService } from 'app/shared/services/global.service';

@Component({
  selector: 'app-allotments',
  templateUrl: './allotments.component.html',
  styleUrls: ['./allotments.component.css']
})
export class AllotmentsComponent implements OnInit {

  public formGroup: FormGroup;
  
  fleetDecorator;
  carGroupOptions = ['EDMR', 'AMDR', 'FERT', 'GAFY'];
  rowData: any[] = [
    {carGroup: 'EDMR', 'numberOfCars': 3, startDate: '2020-03-01', endDate: '2020-04-01', freeSell: true, onRequest: true},
    {carGroup: 'AMDR', 'numberOfCars': 2, startDate: '2020-05-01', endDate: '2020-06-01', freeSell: true, onRequest: false},
    {carGroup: 'FERT', 'numberOfCars': 2, startDate: '2020-07-01', endDate: '2020-08-01', freeSell: false, onRequest: true}
  ];

  newFleetRowPrototype = {carGroup: null, 'numberOfCars': null, startDate: null, endDate: null, freeSell: false, onRequest: false};
  newRowEmitter = new EventEmitter<any>(); 
  
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly globalService: GlobalService
  ) {
    this.fleetDecorator = new FleetGridDecorator({carGroupOptions: this.carGroupOptions});
   }

  // convenience getter for easy access to form fields
  public get fields() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      client: [null],
      start_date: [],
      end_date: []
    });
    this.globalService.getRateInfoCreateSbj().subscribe((code) => {
      if( code === 'allotment-create') {
        this.newRowEmitter.emit('new');
      }
    })
  }

  public save() {

  }

  insertFleet() {
    this.newRowEmitter.emit('new');
  }
}
