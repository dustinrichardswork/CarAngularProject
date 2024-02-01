import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { VersionUpdatedComponent } from '../components/version-updated/version-updated.component';
import { GlobalService } from './global.service';

@Injectable()
export class VersionInterceptor implements HttpInterceptor, OnDestroy {

  subscription = new Subscription();
  constructor(private dialog: MatDialog, private readonly globalService: GlobalService) {
  }
  

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap((event) => {
          if (event instanceof HttpResponse && event.headers.has("X-Version")) {

            var localVersion = localStorage.getItem("version");
            var incomingVersion = event.headers.get("X-Version");

          if (GlobalService._app_version && GlobalService._app_version != incomingVersion) {
              this.subscription.add(this.dialog.open(VersionUpdatedComponent).afterClosed().subscribe(() => {
                location.reload();

              }))
            }

            GlobalService._app_version = incomingVersion;
            this.globalService.emitVersion();

        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
