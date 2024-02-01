import { Component, Input, OnInit } from '@angular/core';
import { ListPageWrapper } from 'app/shared/common/list-page-wrapper.model';
import { PagerService } from 'app/shared/common/pager.service';
import { RatesExtraListItem } from 'app/shared/models/rates/rates-extra-list-item.model';

@Component({
  selector: 'app-rates-extras-search-list',
  templateUrl: './rates-extras-search-list.component.html',
  styleUrls: ['./rates-extras-search-list.component.css']
})
export class RatesExtrasSearchListComponent implements OnInit {

  @Input() list;

  pageWrapper: ListPageWrapper<RatesExtraListItem>;
  extras: Array<RatesExtraListItem>;
  pager: any = {};
  query: any;
  
  constructor(private pagerService: PagerService) { }

  ngOnInit(): void {
    this.pageWrapper = this.list;
    this.extras = this.list.items;
    this.pager = this.pagerService.getPager(this.list.totalCount, this.list.currentPage, this.list.pageSize);
  }

}
