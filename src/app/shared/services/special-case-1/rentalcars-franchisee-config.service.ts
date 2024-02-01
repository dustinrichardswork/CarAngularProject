// Service for processing server-side calls, related to RentalcarsFranchiseeConfigItemViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";

import { SpinnerOverlayService } from "../spinner-overlay.service";
import { BaseService } from '../../common/base.service';
import { RentalcarsFranchiseeConfigItemViewModel } from '../../models/special-case-1/rentalcars-franchisee-config-item-view-model.model';


@Injectable()
export class RentalcarsFranchiseeConfigService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }

  createRentalcarsFranchiseeConfigItem(): RentalcarsFranchiseeConfigItemViewModel {
    return new RentalcarsFranchiseeConfigItemViewModel();
  }

  getRentalcarsFranchiseeConfigItem(uID: string): Observable<RentalcarsFranchiseeConfigItemViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    if (!uID)
      uID = "";
    return this.http.get<RentalcarsFranchiseeConfigItemViewModel>(this.baseUrl + "api/rentalcarsfranchiseeconfigitem/" + uID, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  saveRentalcarsFranchiseeConfigItem(item: RentalcarsFranchiseeConfigItemViewModel): Observable<RentalcarsFranchiseeConfigItemViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    const s = JSON.stringify(item);
    return this.http.post<RentalcarsFranchiseeConfigItemViewModel>(this.baseUrl + "api/rentalcarsfranchiseeconfigitem/", s, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }
}
