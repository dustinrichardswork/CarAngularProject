import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListPageWrapper } from 'app/shared/common/list-page-wrapper.model';
import { PagerService } from 'app/shared/common/pager.service';
import { ExtrasListModel } from 'app/shared/models/rates/estras-list-model';
import { RatesExtraListItem } from 'app/shared/models/rates/rates-extra-list-item.model';
import { RatesService } from 'app/shared/services/rates/rates.service';
import { SpinnerOverlayService } from 'app/shared/services/spinner-overlay.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rates-extras',
  templateUrl: './rates-extras.component.html',
  styleUrls: ['./rates-extras.component.css']
})
export class RatesExtrasComponent implements OnInit {

  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver
  private queryParamsSubscription: Subscription;
  private subscriptions: Subscription[] = [];
  pageWrapper: ListPageWrapper<ExtrasListModel>;
  rates: Array<ExtrasListModel>;
  pager: any = {};
  query: any;

  constructor(private defaultService: RatesService, private pagerService: PagerService, private spinnerService: SpinnerOverlayService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe((data: { list: ListPageWrapper<ExtrasListModel> }) => {
      this.pageWrapper = data.list;
      this.rates = data.list.items;
      this.pager = this.pagerService.getPager(data.list.totalCount, data.list.currentPage, data.list.pageSize);
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

  removeExtra(uid, entityVersion) {
    this.defaultService.removeExtra(uid, entityVersion).subscribe(res => {
      this.rates = this.rates.filter(r => r.uid !== uid);
    });
  }

}
