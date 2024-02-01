import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401 && error.status !== 400 && error.status !== 403) {
          retry(1);
        }
        if (error.status === 401 || error.status === 403) {
          return next.handle(request);
        } else {
          return throwError(error);
        }
      }),
    );
  }
}
