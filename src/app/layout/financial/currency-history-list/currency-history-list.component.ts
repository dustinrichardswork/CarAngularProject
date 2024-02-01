import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListPageWrapper } from 'app/shared/common/list-page-wrapper.model';
import { PagerService } from 'app/shared/common/pager.service';
import { CurrencyListItem } from 'app/shared/models/financial/currency-list-item.model';
import { CurrencyService } from 'app/shared/services/financial/currency.service';
import { SpinnerOverlayService } from 'app/shared/services/spinner-overlay.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-history-list',
  templateUrl: './currency-history-list.component.html',
  styleUrls: ['./currency-history-list.component.css']
})
export class CurrencyHistoryListComponent implements OnInit {

  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver
  private queryParamsSubscription: Subscription;
  private subscriptions: Subscription[] = [];
  pager: any = {};
  query: any;
  @Input() history: Array<CurrencyListItem>;
  @Input() pageWrapper: ListPageWrapper<CurrencyListItem>;

  constructor(private defaultService: CurrencyService, private pagerService: PagerService, private spinnerService: SpinnerOverlayService,
    private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit(): void {
    
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
