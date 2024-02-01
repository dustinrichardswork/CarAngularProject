import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListPageWrapper } from 'app/shared/common/list-page-wrapper.model';
import { PagerService } from 'app/shared/common/pager.service';
import { RatesListItem } from 'app/shared/models/rates/rates-list-item.model';
import { RatesService } from 'app/shared/services/rates/rates.service';
import { SpinnerOverlayService } from 'app/shared/services/spinner-overlay.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rates-client-associated',
  templateUrl: './rates-client-associated.component.html',
  styleUrls: ['./rates-client-associated.component.css']
})
export class RatesClientAssociatedComponent implements OnInit {

  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver
  private queryParamsSubscription: Subscription;
  private subscriptions: Subscription[] = [];
  pageWrapper: ListPageWrapper<RatesListItem>;
  rates: Array<RatesListItem>;
  pager: any = {};
  query: any;

  constructor(private defaultService: RatesService, private pagerService: PagerService, private spinnerService: SpinnerOverlayService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe((data: { rates: ListPageWrapper<RatesListItem> }) => {
      this.pageWrapper = data.rates;
      this.rates = data.rates.items;
      this.pager = this.pagerService.getPager(data.rates.totalCount, data.rates.currentPage, data.rates.pageSize);
    });
    
  }

  onFilter() {
    this.router.navigate(['/reservations', 'page', 1], { queryParams: this.query })
  }

  //Unsubscribe from subscriptions here
  ngOnDestroy() {
    if (this.routeDataSubscription)
      this.routeDataSubscription.unsubscribe();
    if (this.queryParamsSubscription)
      this.queryParamsSubscription.unsubscribe();
  }

}
