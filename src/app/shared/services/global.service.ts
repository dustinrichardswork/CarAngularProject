import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {FranchiseeViewModel} from '../models/franchisee-view-model.model';
import {BrokerViewModel} from "@app-shared/models/broker-view-model.model";
import { Output, EventEmitter } from '@angular/core';
import { SubFranchiseeViewModel } from '../models/sub-franchisee-view-model.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public static _app_version: string;
  public versionemitter = new EventEmitter<string>();
  public _franchiseeDetailSource = new Subject<FranchiseeViewModel>();
  public _subFranchiseeDetailSource = new Subject<SubFranchiseeViewModel>();
  public _brokersDetailSource = new Subject<BrokerViewModel>();
  public rateInfoCreateSbj = new Subject<any>();

  public emitFranchiseeDetail(detail: any) {
    this._franchiseeDetailSource.next(detail);
  }

  public emitSubFranchiseeDetail(detail: any) {
    this._subFranchiseeDetailSource.next(detail);
  }

  public emitBrokersDetail(detail: any) {
    this._brokersDetailSource.next(detail);
  }

  public emitVersion() {
    this.versionemitter.emit(GlobalService._app_version);
  }

  public sendRateInfoCreateSbj(code: string) {
    this.rateInfoCreateSbj.next(code);
  }

  public getRateInfoCreateSbj() {
    return this.rateInfoCreateSbj;
  }
}
