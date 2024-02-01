import { Component, OnInit, EventEmitter } from '@angular/core';
import { ListPageWrapper } from 'app/shared/common/list-page-wrapper.model';
import { CountryListItem } from 'app/shared/models/financial/country-list-item.model';
import { OnewayGridDecorator } from './oneway-decorator/oneway-grid-decorator';
import { GlobalService } from 'app/shared/services/global.service';

@Component({
  selector: 'app-operations-oneway',
  templateUrl: './operations-oneway.component.html',
  styleUrls: ['./operations-oneway.component.css']
})
export class OperationsOnewayComponent implements OnInit {

  pageWrapper: ListPageWrapper<CountryListItem>;
  list: Array<CountryListItem>;

  firstStationGroup = ['Abu Dhabi Airport', 'Abu Dhabi Airport1', 'Abu Dhabi Airport2', 'Abu Dhabi Airport3'];
  secondStationGroup = ['Abu Dhabi Office', 'Abu Dhabi Office1', 'Abu Dhabi Office2', 'Abu Dhabi Office3']
  onewayDecorator: any
  
  rowData: any[] = [
    { firstStation: "Abu Dhabi Airport", secondStation: "Abu Dhabi Office", change: true, extra: "One way fee", value:"78.002"}
  ];

  newOnewayRowPrototype = {firstStation: null, secondStation: null, change: false, extra: null, value: false};
  newRowEmitter = new EventEmitter<any>(); 
  
  pager: any = {};
  query: any;
  
  constructor(
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.onewayDecorator = new OnewayGridDecorator(this.firstStationGroup, this.secondStationGroup);
    this.globalService.getRateInfoCreateSbj().subscribe((code) => {
      if(code === 'oneway-create') {
        this.newRowEmitter.emit('new');
      }
    })
  }

  insertOneway() {
    this.newRowEmitter.emit('new');
  }

}
