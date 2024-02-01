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
import { LocationListItem } from "../../models/franchisee/location-list-item.model";
import { LocationViewModel } from "../../models/location/location-view-model.model";
// import { LocationVehiclesViewModel } from "../../models/location/location-vehicles-view-model.model";


@Injectable()
export class LocationService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }

  getLocations(pageNum: number, searchText?: string, searchCountry?: string): Observable<ListPageWrapper<LocationListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    let query = "?";
    if (searchText)
      query = query + "searchText=" + encodeURI(searchText);
    if (searchCountry)
      query = query + "&countryUID=" + encodeURI(searchCountry);

    return this.http.get<LocationListItem[]>("/assets/json/location.json")
    .pipe(
        map((response:any)=> {
          let response_data = response;
          if(searchText) {
            response_data = response_data.filter(x => x.name.split(searchText).length > 1);
          }
          return {
            totalCount: response_data.length,
            currentPage: pageNum,
            pageSize: 10,
            items: response_data.slice(10*(pageNum-1), 10*pageNum),
          }
        }),
        catchError(this.handleError)
      );

    // return this.http.get<ListPageWrapper<LocationListItem>>(`${this.baseUrl}api/location/page/${pageNum}/${query}`, options)
    //   .pipe(map(res => {
    //     return res;
    //   }),
    //     catchError(err => this.handleError(err)));
  }

  getLocation(uID: string): Observable<LocationViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<LocationListItem[]>("/assets/json/location.json")
    .pipe(
      map((response: any) => {
        return response.find(x => x.uid === uID);
      })
    )
    // return this.http.get<LocationViewModel>(this.baseUrl + "api/location/" + uID, options)
    //   .pipe(map(res => {
    //     return res;
    //   }),
    //     catchError((err) => {console.log(err);this.handleError(err)}));
  }

  loadReturnLocations(uid: string): Observable<Array<LocationListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http
      .get<Array<LocationListItem>>(`${this.baseUrl}api/location/${uid}/return-locations`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }


  // getLocationVehicles(uid: string): Observable<LocationVehiclesViewModel> {
  //   const headers = this.prepareHeaders();
  //   const options = { headers: headers };
  //   return this.http.get<LocationVehiclesViewModel>(`${this.baseUrl}api/location/${uid}/vehicles`, options).pipe(
  //     map((res) => {
  //       return res;
  //     }),
  //     catchError((err) => this.handleError(err)),
  //   );
  // }

  setLocationCategoryVehicle(locationUid: string, categoryUid: string, vehicleUid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.put(`${this.baseUrl}api/location/${locationUid}/vehicles?categoryUid=${categoryUid}&vehicleUid=${vehicleUid}`, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  unsetLocationCategoryVehicle(locationUid: string, categoryUid: string, vehicleUid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.delete(`${this.baseUrl}api/location/${locationUid}/vehicles?categoryUid=${categoryUid}&vehicleUid=${vehicleUid}`, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }


  saveLocation(item: LocationViewModel): Observable<LocationViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.post<LocationViewModel>(`${this.baseUrl}api/location/`, item, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

}
