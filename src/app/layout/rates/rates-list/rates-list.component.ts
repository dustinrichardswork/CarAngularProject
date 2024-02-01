import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListPageWrapper } from 'app/shared/common/list-page-wrapper.model';
import { PagerService } from 'app/shared/common/pager.service';
import { RateListModel } from 'app/shared/models/rates/rates-item-detail.model';
import { RatesListItem } from 'app/shared/models/rates/rates-list-item.model';
import { RatesService } from 'app/shared/services/rates/rates.service';
import { SpinnerOverlayService } from 'app/shared/services/spinner-overlay.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rates-list',
  templateUrl: './rates-list.component.html',
  styleUrls: ['./rates-list.component.css']
})
export class RatesListComponent implements OnInit {

  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver
  private queryParamsSubscription: Subscription;
  private subscriptions: Subscription[] = [];
  pageWrapper: ListPageWrapper<RateListModel>;
  rates: Array<RateListModel>;
  pager: any = {};
  query: any;

  constructor(private defaultService: RatesService, private pagerService: PagerService, private spinnerService: SpinnerOverlayService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe((data: { rates: ListPageWrapper<RateListModel> }) => {
      this.pageWrapper = data.rates;
      this.rates = data.rates.items;
      this.pager = this.pagerService.getPager(data.rates.totalCount, data.rates.currentPage + 1, data.rates.pageSize);
    });
    
  }

  onFilter() {
    this.router.navigate(['/rates', 'page', 1])
  }

  //Unsubscribe from subscriptions here
  ngOnDestroy() {
    if (this.routeDataSubscription)
      this.routeDataSubscription.unsubscribe();
    if (this.queryParamsSubscription)
      this.queryParamsSubscription.unsubscribe();
  }

  removeRates(uid, entityVersion) {
    this.defaultService.deleteRates(uid, {entityVersion:entityVersion}).subscribe(res => { 
      this.rates = this.rates.filter(item => item.entityVersion !== entityVersion)
    })
  }

}
