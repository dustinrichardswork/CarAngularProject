import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListPageWrapper } from 'app/shared/common/list-page-wrapper.model';
import { PagerService } from 'app/shared/common/pager.service';
import { RentalStationsListItem } from 'app/shared/models/financial/rental-stations-list-item.model';
import { RentalStationsService } from 'app/shared/services/financial/rental-stations.service';
import { SpinnerOverlayService } from 'app/shared/services/spinner-overlay.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rental-stations',
  templateUrl: './rental-stations.component.html',
  styleUrls: ['./rental-stations.component.css']
})
export class RentalStationsComponent implements OnInit {

  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver
  private queryParamsSubscription: Subscription;
  private subscriptions: Subscription[] = [];
  pageWrapper: ListPageWrapper<RentalStationsListItem>;
  list: Array<RentalStationsListItem>;
  pager: any = {};
  query: any;

  constructor(private defaultService: RentalStationsService, private pagerService: PagerService, private spinnerService: SpinnerOverlayService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe((data: { list: ListPageWrapper<RentalStationsListItem> }) => {
      this.pageWrapper = data.list;
      this.list = data.list.items;
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

}
