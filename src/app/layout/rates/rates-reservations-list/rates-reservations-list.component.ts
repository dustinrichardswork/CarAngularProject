import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rates-reservations-list',
  templateUrl: './rates-reservations-list.component.html',
  styleUrls: ['./rates-reservations-list.component.css']
})
export class RatesReservationsListComponent implements OnInit {

  @Input() list;
  
  constructor() { }

  ngOnInit(): void {
  }

}
