import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListPageWrapper } from 'app/shared/common/list-page-wrapper.model';
import { PagerService } from 'app/shared/common/pager.service';
import { CurrencyListItem } from 'app/shared/models/financial/currency-list-item.model';
import { CurrencyService } from 'app/shared/services/financial/currency.service';
import { SpinnerOverlayService } from 'app/shared/services/spinner-overlay.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {

  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver
  private queryParamsSubscription: Subscription;
  private subscriptions: Subscription[] = [];
  pageWrapper: ListPageWrapper<CurrencyListItem>;
  currencies: Array<CurrencyListItem>;
  pager: any = {};
  query: any;

  constructor(private defaultService: CurrencyService, private pagerService: PagerService, private spinnerService: SpinnerOverlayService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe((data: { currencies: ListPageWrapper<CurrencyListItem> }) => {
      this.pageWrapper = data.currencies;
      this.currencies = data.currencies.items;
      this.pager = this.pagerService.getPager(data.currencies.totalCount, data.currencies.currentPage, data.currencies.pageSize);
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

  public downloadCsv() {
    // this.subscriptions.push(this.defaultService.downloadReservationsCsv(this.query).subscribe({
    //   next: (data: any) => {
    //     const blob = new Blob([data], { type: 'text/csv' });
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = 'Reservations.csv';
    //     link.click();
    //   },
    // }));
  }

}
