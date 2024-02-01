// Service for processing server-side calls, related to 

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";
import { map } from "rxjs/internal/operators/map";
import { BaseService } from '../../common/base.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { ReservationListItem } from '../../models/reservation/reservation-list-item.model';
import { SpinnerOverlayService } from "../spinner-overlay.service";
import { DateConverters } from '../system/date-converters.helper';
import { RatesViewModel } from 'app/shared/models/rates/rates-view.model';
import * as jsonData from '../../../../assets/json/rates.json';
import * as definitionData from '../../../../assets/json/rates_extra_definitions.json';
import { RatesExtraDetailViewModel } from 'app/shared/models/rates/rates-extra-detail-view.model';
import { RatesListItem } from 'app/shared/models/rates/rates-list-item.model';
import { RateCreateModel, RateDetailsModel, RateListModel, RateUpdateModel } from 'app/shared/models/rates/rates-item-detail.model';
import { ExtrasCreateModel, ExtrasListModel, ExtrasUpdateModel } from 'app/shared/models/rates/estras-list-model';
import { environment } from 'environments/environment';
import { RateSeasonDayBreakDetailsModel, RateSeasonDetailsModel, RateSeasonExcessListModel, RateSeasonExcessValueDetailsModel, RateSeasonExtrasListModel, RateSeasonExtrasValueDetailsModel } from 'app/shared/models/rates/rates-season-view.model';
import { VehicleCategoryDetailsModel } from 'app/shared/models/rates/vehicle-category-model';
import { BehaviorSubject, Subject  } from 'rxjs';

@Injectable()
export class RatesService extends BaseService {

  private rateSeasonExtraSubject = new Subject<any>();
  private extraDecoratorSubject = new Subject<any>(); 
  private rateSeasonValuesSubject = new Subject<any>();
  private rateSeasonExcessSubject = new Subject<any>();
  private rateSeasonGridSubject = new Subject<any>();
  private removeRateSeasonSubject = new Subject<any>();
  private changeRateTabSubject = new Subject<any>();

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = environment.apiUrl;
  }

  createCurrency(): RatesViewModel {
    return new RatesViewModel();
  }
 
  sendChangeRatesTabSubject() {
    return this.changeRateTabSubject.next("");
  }

  getChangeRatesTabSubject() {
    return this.changeRateTabSubject;
  }

  //RxJS functions
  sendRateExtrasSubject(data: any) {
    return this.rateSeasonExtraSubject.next(data);
  }

  getExtraObservable() {
    return this.rateSeasonExtraSubject;
  }

  sendSeasonGridSubject(data: any) {
    return this.rateSeasonGridSubject.next(data);
  }

  getSeasonGridObservable() {
    return this.rateSeasonGridSubject;
  }

  sendExtraDecoratorProtoType(data: any) {
    return this.extraDecoratorSubject.next(data);
  }

  getExtraDecoratorObservable() {
    return this.extraDecoratorSubject;
  }

  sendRateSeasonValuesSubject(data: any) {
    return this.rateSeasonValuesSubject.next(data);
  }

  getRateSeasonValuesSubject() {
    return this.rateSeasonValuesSubject;
  }

  sendRateSeasonExcessSubject(data: any) {
    return this.rateSeasonExcessSubject.next(data);
  }

  getRateSeasonExcessSubject() {
    return this.rateSeasonExcessSubject;
  }

  sendRemoveRateSeasonSubject(data: any) {
    return this.removeRateSeasonSubject.next(data);
  }

  getRemoveRateSeasonSubject() {
    return this.removeRateSeasonSubject;
  }


  //[GET]/api/rates
  getRates(pageNum: number): Observable<ListPageWrapper<any>> {
    // var baseUrl = this.baseUrl + "api/reservation/rates/" + pageNum + "?";
    var baseUrl = this.baseUrl + `api/rates?pageSize=20&pageIndex=${pageNum-1}`;  
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    //return this.http.get('/assets/json/rates.json').pipe(map(res => {console.log(res);return res})); //this is for dummy data.

    return this.http.get<ListPageWrapper<RateListModel> | Observable<any> | Observable<never>>(baseUrl, options) 
    .pipe(map((res: any) => {
      const response = new ListPageWrapper(res.totalCount, res.page.index, res.page.size, res.data);
      // return response;
      return response;
    }),
    catchError(err => this.handleError(err)));
  }

  //[POST]/api/rates/
  saveRates(newRate: RateCreateModel): Observable<RateDetailsModel> {
    var baseUrl = this.baseUrl + `api/rates`;
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.post<RateDetailsModel>(baseUrl, newRate, options)
    .pipe(map((res: RateDetailsModel) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  //[GET]/api/rates/{uid}
  getRatesDetail(uid): Observable<RateDetailsModel> {
    var baseUrl = this.baseUrl + `api/rates/${uid}`;
    const headers = this.prepareHeaders();
    const options = { headers: headers, params: { uid: uid } };

    // return of(jsonData['items'][0]);
    return this.http.get<RateDetailsModel>(baseUrl, options)
    .pipe(map(res => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  //[PUT]/api/rates/{uid}
  updateRatesDetail(updateRate: RateUpdateModel, uid): Observable<any> {
    var baseUrl = this.baseUrl + `api/rates/${uid}`;
    const headers = this.prepareHeaders();
    const options = { headers: headers, params: { uid: uid } };
    return this.http.put<any>(baseUrl, updateRate, options)
    .pipe(map((res: any) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  //[DELETE]/api/rates/{uid}
  deleteRates(uid, deletedData) {
    var baseUrl = this.baseUrl + `api/rates/${uid}`;
    const headers = this.prepareHeaders();
    const options = { headers: headers, body:deletedData };
    return this.http.request<any>("delete", baseUrl, options)
    .pipe(map((res: any) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  //[DELETE]/api/rates/{uid}/force
  deleteRatesForce(uid, deletedData) {
    var baseUrl = this.baseUrl + `api/rates/${uid}/force`;
    const headers = this.prepareHeaders();
    const options = { headers: headers, body: deletedData };
    return this.http.request<any>('delete', baseUrl, options)
    .pipe(map((res: any) => {
      console.log(res);
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  getRatesDetailExcess(page, uid) {
    return this.http.get('/assets/json/rates_excess.json');
  }


  //[GET]/api/extras
  getExtras(page: number) {
    var baseUrl = this.baseUrl + `api/extras/?pageSize=10&pageIndex=${page-1}`;
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    // return this.http.get('/assets/json/rates_extra.json'); 
    return this.http.get<ListPageWrapper<ExtrasListModel> | Observable<any> | Observable<never>>(baseUrl, options)
    .pipe(map((res: any) => {
      const response = new ListPageWrapper(res.totalCount, res.page.index, res.page.size, res.data);
      return response;
    }),
    catchError(err => this.handleError(err)));
  }

  //[POST]/api/extras
  saveExtra(item: ExtrasCreateModel) {
    var baseUrl = this.baseUrl + `api/extras/`;
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.post<ExtrasListModel>(baseUrl, item, options)
    .pipe(map((res: ExtrasListModel) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  //[DELETE]/api/extras/{uid}
  removeExtra(uid, entityVersion) {
    var baseUrl = this.baseUrl + `api/extras/${uid}`;
    const headers = this.prepareHeaders();
    const options = {headers: headers, body: {entityVersion: entityVersion}};
    return this.http.request<any>("delete", baseUrl, options)
    .pipe(map((res: any) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  //[GET]/api/extras/{uid}
  getExtraDetail(uid): Observable<ExtrasListModel> {
    var baseUrl = this.baseUrl + `api/extras/${uid}`;
    const headers = this.prepareHeaders();
    const options = {headers: headers, params: { uid: uid } };
    return this.http.get<ExtrasListModel>(baseUrl, options)
    .pipe(map((res: ExtrasListModel) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  //[PUT]/api/extras/{uid}
  updateExtraDetail(uid, updatedExtra): Observable<ExtrasUpdateModel> {
    var baseUrl = this.baseUrl + `api/extras/${uid}`;
    const headers = this.prepareHeaders();
    const options = {headers: headers, params: { uid: uid } };
    return this.http.put<ExtrasListModel>(baseUrl, options)
    .pipe(map((res: ExtrasListModel) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  getRatesExtraDefinitions(uid) {
    return of(definitionData);
    // return this.http.get('/assets/json/rates_extra.json'); 
  }

  saveCurrency(item: RatesViewModel){
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    const s = JSON.stringify(item);
    return of(item);
    return this.http.post<RatesViewModel>(this.baseUrl + 'api/franchisee/', s, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  getCurrencyHistory(uid, pageNum = 1): any {
    var baseUrl = this.baseUrl + "api/reservation/page/" + pageNum + "?";

    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get('/assets/json/rates.json');

    return this.http.get<ListPageWrapper<ReservationListItem>>(baseUrl, options)
      .pipe(map(res => {
         return res;
      }),
        catchError(err => this.handleError(err)));
  }


  //[GET]/api/rates/{rateUid}/seasons
  getRateSeasons(rateUid, pageNum): Observable<any[]> {
    var baseUrl = this.baseUrl + `api/rates/${rateUid}/seasons`;
    const headers = this.prepareHeaders();
    const options = {headers: headers };
    return this.http.get<ListPageWrapper<RateListModel> | Observable<any> | Observable<never>>(baseUrl, options)
    .pipe(map((res: any) => {
      const response = new ListPageWrapper(res.totalCount, res.page.index, res.page.size, res.data);
      return response.items;
    }),
    catchError(err => this.handleError(err)));
  }

  //[POST]/api/rates/{rateUid}/seasons
  saveRateSeason(rateUid, newSeason): Observable<RateSeasonDetailsModel>{
    var baseUrl = this.baseUrl + `api/rates/${rateUid}/seasons`;
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.post<RateSeasonDetailsModel>(baseUrl, newSeason, options)
    .pipe(map((res: RateSeasonDetailsModel) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  //[GET]/api/rates/seasons/{uid}
  getRateSeason(uid): Observable<RateSeasonDetailsModel>{
    var baseUrl = this.baseUrl + `api/rates/seasons/${uid}`;
    const headers = this.prepareHeaders();
    const options = {headers: headers };
    return this.http.get<RateSeasonDetailsModel>(baseUrl, options)
    .pipe(map((res: RateSeasonDetailsModel) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  //[PUT]/api/rates/seasons/{uid}
  updateRateSeason(uid, updatedSeason): Observable<RateSeasonDetailsModel>{
    var baseUrl = this.baseUrl + `api/rates/seasons/${uid}`;
    const headers = this.prepareHeaders();
    const options = {headers: headers };
    return this.http.put<RateSeasonDetailsModel>(baseUrl, updatedSeason, options)
    .pipe(map((res: RateSeasonDetailsModel) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  //[DELETE]/api/rates/seasons/{uid}
  deleteRateSeason(uid, entityVersion): Observable<any>{
    var baseUrl = this.baseUrl + `api/rates/seasons/${uid}`;
    const headers = this.prepareHeaders();
    const options = {headers: headers, params: { uid: uid }, body: { entityVersion: entityVersion, uid: uid } };
    return this.http.request<any>('delete', baseUrl, options)
    .pipe(map((res: any) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  //[DELETE]/api/rates/seasons/{uid}/force
  deleteForceRateSeason(uid, entityVersion): Observable<any>{
    var baseUrl = this.baseUrl + `api/rates/seasons/${uid}`;
    const headers = this.prepareHeaders();
    const options = {headers: headers, params: { uid: uid }, body: { entityVersion: entityVersion } };
    return this.http.request<any>('delete', baseUrl, options)
    .pipe(map((res: any) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

//---------------------------------------------Season Day Breaks API--------------------------------//
  //[GET]/api/rates/seasons/{seasonUid}/day-breaks
  getRateSeasonDayBreaks(seasonUid): Observable<any> {
    var baseUrl = this.baseUrl + `api/rates/seasons/${seasonUid}/day-breaks`;
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.get<ListPageWrapper<RateSeasonDayBreakDetailsModel> | Observable<any> | Observable<never>>(baseUrl, options)
    .pipe(map((res: any) => {
      const response = new ListPageWrapper(res.totalCount, res.page.index, res.page.size, res.data);
      return response;
    }),
    catchError(err => this.handleError(err)));
  }

  //[GET]/api/rates/seasons/day-breaks/{uid}
  getRateSeasonDayBreak(uid): Observable<any> {
    var baseUrl = this.baseUrl + `api/rates/seasons/day-breaks/${uid}`;
    const headers = this.prepareHeaders();
    const options = {headers: headers };
    return this.http.get<any>(baseUrl, options)
    .pipe(map((res: any) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

//----------------------------------------------Rate Season Values API-------------------------------//
  //[GET]/api/rates/seasons/{seasonId}/values
  getRateSeasonValues(seasonUid: string): Observable<any> {
    var baseUrl = this.baseUrl + `api/rates/seasons/${seasonUid}/values?pageSize=40`;
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.get<ListPageWrapper<RateSeasonDetailsModel> | Observable<any> | Observable<never>>(baseUrl, options)
    .pipe(map((res: any) => {
      console.log(seasonUid, res)
      const response = new ListPageWrapper(res.totalCount, res.page.index, res.page.size, res.data);
      return response.items;
    }),
    catchError(err => this.handleError(err)));
  }

  getRateSeasonValue(uid: string): Observable<any> {
    var baseUrl = this.baseUrl + `api/rates/seasons/values/${uid}`;
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.get<any>(baseUrl, options)
    .pipe(map((res: any) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  updateRateSeasonValue(uid: string, data): Observable<any> { 
    var baseUrl = this.baseUrl + `api/rates/seasons/values/${uid}`;
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.put<any>(baseUrl, data, options)
    .pipe(map((res: any) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  deleteRateSeasonValue(uid, entityVersion) {
    var baseUrl = this.baseUrl + `api/rates/seasons/values/${uid}`;
    const headers = this.prepareHeaders();
    const options = {headers: headers, params: { uid: uid }, body: { entityVersion: entityVersion, uid: uid } };
    return this.http.request<any>('delete', baseUrl, options)
    .pipe(map((res: any) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

//---------------------------------------------Season Excess API------------------------------------//
  //[GET]/api/rates/seasons/{seasonUid}/excess
  getRateSeasonExcess(seasonUid): Observable<any> {
    var baseUrl = this.baseUrl + `api/rates/seasons/${seasonUid}/excess`;
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.get<ListPageWrapper<RateSeasonExcessListModel> | Observable<any> | Observable<never>>(baseUrl, options)
    .pipe(map((res: any) => {
      const response = new ListPageWrapper(res.totalCount, res.page.index, res.page.size, res.data);
      return response.items;
    }),
    catchError(err => this.handleError(err)));
  }

//---------------------------------------------Season Extra API------------------------------------//
  //[GET]/api/rates/seasons/{seasonUid}/extras
  getRateSeasonExtra(seasonUid): Observable<any> {
    var baseUrl = this.baseUrl + `api/rates/seasons/${seasonUid}/extras`;
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.get<ListPageWrapper<RateSeasonExtrasListModel> | Observable<any> | Observable<never>>(baseUrl, options)
    .pipe(map((res: any) => {
      const response = new ListPageWrapper(res.totalCount, res.page.index, res.page.size, res.data);
      return response.items;
    }),
    catchError(err => this.handleError(err)));
  }

  //[PUT]/api/rates/seasons/extras/{uid}
  updateRateSeasonExtra(uid, updatedData): Observable<any> {
    var baseUrl = this.baseUrl + `api/rates/seasons/extras/${uid}`;
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.put<any>(baseUrl, updatedData, options)
    .pipe(map((res: any) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

//----------------------------------------------Vehicle Categories API-------------------------------//
  //[GET]/api/vehicle-categories
  getVehicleCategories(): Observable<any> {
    var baseUrl = this.baseUrl + `api/vehicle-categories`;
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.get<ListPageWrapper<VehicleCategoryDetailsModel> | Observable<any> | Observable<never>>(baseUrl, options)
    .pipe(map((res: any) => {
      const response = new ListPageWrapper(res.totalCount, res.page.index, res.page.size, res.data);
      return response.items;
    }),
    catchError(err => this.handleError(err)));
  }


//--------------------------------------------------Extra Values API----------------------------------//
  //[GET]/api/rates/seasons/{seasonUid}/extra-values
  getRateSeasonExtraValues(seasonUid): Observable<any> {
    
    var baseUrl = this.baseUrl + `api/rates/seasons/${seasonUid}/extras-values`;
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.get<ListPageWrapper<RateSeasonExtrasValueDetailsModel> | Observable<any> | Observable<never>>(baseUrl, options)
    .pipe(map((res: any) => {
      console.log(seasonUid, res);
      const response = new ListPageWrapper(res.totalCount, res.page.index, res.page.size, res.data);
      return response.items;
    }),
    catchError(err => this.handleError(err)));
  }

  //[GET]/api/rates/seasons/extras-values/{uid}
  getRateSeasonExtraValue(uid): Observable<any> {
    var baseUrl = this.baseUrl + `api/rates/seasons/extras-values/${uid}`;
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.get<any>(baseUrl, options)
    .pipe(map((res: any) => {
      console.log(uid, res)
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  //[PUT]/api/rates/seasons/extras-values/{uid}
  updateRateSeasonExtraValue(uid, data): Observable<any> {
    var baseUrl = this.baseUrl + `api/rates/seasons/extras-values/${uid}`;
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.put<any>(baseUrl, data, options)
    .pipe(map((res: any) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

//---------------------------------------------------Excess Values API---------------------------------//
  //[GET]/api/rates/seasons/{seasonUid}/excess-values
  getRateSeasonExcessValues(seasonUid): Observable<any> {
    var baseUrl = this.baseUrl + `api/rates/seasons/${seasonUid}/excess-values`;
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.get<ListPageWrapper<RateSeasonExcessValueDetailsModel> | Observable<any> | Observable<never>>(baseUrl, options)
    .pipe(map((res: any) => {
      const response = new ListPageWrapper(res.totalCount, res.page.index, res.page.size, res.data);
      return response.items;
    }),
    catchError(err => this.handleError(err)));
  }
  //[GET/api/rates/seasons/excess-values/{uid}
  getRateSeasonExcessValue(uid): Observable<any> {
    var baseUrl = this.baseUrl + `api/rates/seasons/excess-values/${uid}`;
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.get<any>(baseUrl, options)
    .pipe(map((res: any) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }

  //[PUT]/api/rates/seasons/excess-values/{uid}
  updateRateSeasonExcessValue(uid, data): Observable<any> {
    var baseUrl = this.baseUrl + `api/rates/seasons/excess-values/${uid}`;
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.put<any>(baseUrl, data, options)
    .pipe(map((res: any) => {
      return res;
    }),
    catchError(err => this.handleError(err)));
  }
}
