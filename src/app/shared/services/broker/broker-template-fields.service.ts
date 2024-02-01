import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "@app-shared/common/base.service";
import {FieldMetadataListItem} from 'app/shared/models/codebook/field-metadata-list-item.model';
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BrokerTemplateFieldsService extends BaseService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    super();
    this.baseUrl = baseUrl;
  }

  getTemplateFields(): Observable<Array<FieldMetadataListItem>> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    return this.http.get<Array<FieldMetadataListItem>>(this.baseUrl + 'api/Codebook/excel-template-fields', options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }
}
