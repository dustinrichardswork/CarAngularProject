// Service for processing server-side calls, related to LocationListItem2

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";
import { map } from "rxjs/internal/operators/map";
import { BaseService } from '../../common/base.service';
import { NotificationBarMessage } from '../../models/notification-bar/notification-bar-message.model';
import { SpinnerOverlayService } from "../spinner-overlay.service";

@Injectable()
export class NotificationBarService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }

  getNotification(): Observable<NotificationBarMessage> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get<NotificationBarMessage>(`${this.baseUrl}api/notificationmessage/`, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }


  dismissNotification(uid: string): Observable<NotificationBarMessage> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<NotificationBarMessage>(`${this.baseUrl}api/notificationmessage/${uid}/dismiss`, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }
}
