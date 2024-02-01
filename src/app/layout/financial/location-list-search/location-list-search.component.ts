import { Component, OnInit, Input } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import { CountryListItem } from '../../../shared/models/franchisee/country-list-item.model';
import { CountryService } from '../../../shared/services/franchisee/country.service';

@Component({
  selector: 'app-location-list-search',
  templateUrl: './location-list-search.component.html',
  styleUrls: ['./location-list-search.component.css'],
})
export class LocationListSearchComponent implements OnInit {
  @Input() isSelectVisible: boolean = true; // changed this value to check frontend display
  @Input() countriesList: Array<CountryListItem> = [];
  @Input() placeholder = 'Search location by name';
  @Input() routeParams = '/financial/locations/page/1';

  private searchTextSubscription: Subscription;

  get canSearch(): boolean {
    return this.searchText && this.searchText.length > 2
      || this.oldSelectedCountryUID != this.selectedCountryUID;
  }

  private get canClear(): boolean {
    return (!this.searchText || this.searchText.length === 0)
      && this.selectedCountryUID == this.oldSelectedCountryUID;
  }

  searchText: string;
  searchCountry: string;
  selectedCountryUID: string;
  oldSelectedCountryUID: string;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService
  ) {
  }

  ngOnInit(): void {
    this.searchTextSubscription = this.route.queryParams.subscribe((values) => {
      this.searchText = values['searchText'];
      this.selectedCountryUID = values['searchCountry'];
    });
    // this.loadLists();
  }

  loadLists(): void {
    this.countryService.getAllCountries().subscribe((res) => {
      this.countriesList = res;
    });
  }

  performSearch(): void {
    if (this.canSearch) {
      this.router.navigate([this.routeParams], {
        queryParams: { searchText: this.searchText, searchCountry: this.selectedCountryUID },
      });
    }
    if (this.canClear) {
      this.router.navigate([this.routeParams]);
    }
    this.oldSelectedCountryUID = this.selectedCountryUID;
  }


  clearSearchText() {
    this.searchText = '';
   
    this.router.navigate([this.routeParams], {
      queryParams: { searchText: this.searchText, searchCountry: this.selectedCountryUID },
    });
   
  }
  //Unsubscribe from subscriptions here to avoid memory leaks
  ngOnDestroy(): void {
    if (this.searchTextSubscription)
      this.searchTextSubscription.unsubscribe();
  }

}
