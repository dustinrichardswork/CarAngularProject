import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rates-rental-stations',
  templateUrl: './rates-rental-stations.component.html',
  styleUrls: ['./rates-rental-stations.component.css']
})
export class RatesRentalStationsComponent implements OnInit {

  @Input() list: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
