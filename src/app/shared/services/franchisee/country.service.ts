// Service for processing server-side calls, related to

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";

import { SpinnerOverlayService } from "../spinner-overlay.service";
import { BaseService } from '../../common/base.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { CountryListItem } from "../../models/franchisee/country-list-item.model";
// import { CountryCategorySetupViewModel } from "../../models/country/country-category-setup-view-model.model";
// import { VehicleCategoryListItem } from "../../models/vehicle/vehicle-category-list-item.model";
// import { CountryViewModel } from "../../models/country/country-view-model.model";


@Injectable(
  {
    providedIn:'root'
  }
)
export class CountryService extends BaseService {

  baseUrl: string;
  countryId: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private spinnerService: SpinnerOverlayService,
  ) {
    super();
    this.baseUrl = baseUrl;
  }


  getAllCountries(): Observable<CountryListItem[]> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http
      .get<CountryListItem[]>(this.baseUrl + `api/country`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  findCountries(searchText: string): Observable<Array<CountryListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    let query = "?";
    query = query + ((searchText) ? "searchText=" + encodeURI(searchText) : "") + "&";
    //if (hideNoInvoices)query = query + "hideNoInvoices=" + hideNoInvoices + "&";

    return this.http
      .get<Array<CountryListItem>>(`${this.baseUrl}api/country/find${query}`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }
  
  getCountryLight(uID: string): Observable<CountryListItem> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get<CountryListItem>(this.baseUrl + 'api/country/' + uID + '/light', options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }


  // getCountry(uID: string): Observable<CountryViewModel> {
  //   const headers = this.prepareHeaders();
  //   const options = { headers: headers };
  //   this.countryId = uID;
  //   return this.http.get<CountryViewModel>(this.baseUrl + "api/country/" + uID, options)
  //     .pipe(map(res => {
  //       return res;
  //     }),
  //       catchError(err => this.handleError(err)));
  // }

  // saveCountry(item: CountryViewModel): Observable<CountryViewModel> {
  //   const headers = this.prepareHeaders();
  //   const options = { headers: headers };
  //   const s = JSON.stringify(item);
  //   return this.http.post<CountryViewModel>(this.baseUrl + "api/country/", s, options)
  //     .pipe(map(res => {
  //       return res;
  //     }),
  //       catchError(err => this.handleError(err)));
  // }

  loadFranchiseeCountries(): Observable<Array<CountryListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http
      .get<Array<CountryListItem>>(`${this.baseUrl}api/country/list-with-franchisees`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  // loadCountryVehicleCategories(uid: string): Observable<Array<VehicleCategoryListItem>> {
  //   const headers = this.prepareHeaders();
  //   const options = { headers: headers };

  //   return this.http
  //     .get<Array<VehicleCategoryListItem>>(`${this.baseUrl}api/country/${uid}/vehicle-categories`, options)
  //     .pipe(
  //       map((res) => {
  //         return res;
  //       }),
  //       catchError((err) => this.handleError(err)),
  //     );
  // }

  // getCountryCategorySettings(uid: string, vehicleCategoryUid: string): Observable<CountryCategorySetupViewModel> {
  //   const headers = this.prepareHeaders();
  //   const options = { headers: headers };
  //   return this.http.get<CountryCategorySetupViewModel>(`${this.baseUrl}api/country/${uid}/vehicle-categories/${vehicleCategoryUid}`, options).pipe(
  //     map((res) => {
  //       return res;
  //     }),
  //     catchError((err) => this.handleError(err)),
  //   );
  // }


  loadAllowedCountries(uid: string): Observable<Array<CountryListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http
      .get<Array<CountryListItem>>(`${this.baseUrl}api/country/${uid}/allowed-countries`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  addAllowedCountries(uid: string, allowedCountryUid): Observable<Array<CountryListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http
      .put<Array<CountryListItem>>(`${this.baseUrl}api/country/${uid}/allowed-countries?allowedCountryUid=${allowedCountryUid}`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  deleteAllowedCountries(allowedCountryUid): Observable<Array<CountryListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http
      .delete<Array<CountryListItem>>(`${this.baseUrl}api/country/${this.countryId}/allowed-countries?allowedCountryUid=${allowedCountryUid}`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  exportChanges(date): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers, responseType: 'blob' as 'json' };

    return this.http
      .get<any>(`${this.baseUrl}api/country/${this.countryId}/export-changes?updatedAfter=${date}`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }
}
