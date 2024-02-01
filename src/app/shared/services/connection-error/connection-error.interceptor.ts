import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { delay, retryWhen, tap } from 'rxjs/operators';
import { ConnectionErrorDialogComponent } from '@app-shared/components';

@Injectable()
export class ConnectionInterceptor implements HttpInterceptor {
  public retryDelay = 1500;
  private openedDialog: MatDialogRef<ConnectionErrorDialogComponent>;

  constructor(private readonly matDialog: MatDialog) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (navigator.onLine) {
      return next.handle(request);
    }
    return next.handle(request).pipe(
      retryWhen((error: Observable<HttpErrorResponse>) =>
        error.pipe(
          tap(() => {
            if (!this.openedDialog) {
              window.addEventListener('online', this.handleOnline.bind(this));
              this.openedDialog = this.matDialog.open(ConnectionErrorDialogComponent, {
                disableClose: true,
                closeOnNavigation: false,
              });
            }
          }),
          delay(this.retryDelay),
        ),
      ),
    );
  }
  private handleOnline() {
    window.removeEventListener('online', this.handleOnline.bind(this));
    if (this.openedDialog) {
      this.openedDialog.close();
      this.openedDialog = null;
    }
  }
}
