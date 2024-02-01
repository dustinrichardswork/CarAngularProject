import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NavigationError, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ErrorService } from './error.service';
import { LoggingService } from './logging.service';
import { NotificationService } from './notification.service';
import { MessageService } from './system/message.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector, router: Router) {
    router.events.pipe(filter((event) => event instanceof NavigationError)).subscribe((event) => {
      this.handleRouterErrors(event as NavigationError);
    });
  }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);
    const messageService = this.injector.get(MessageService);

    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
      // Server Error
      if (error.status == 409) {
        const msg = messageService.combineMessage(error.error);
        notifier.showError(msg);
      } else {
        message = errorService.getServerMessage(error);
        stackTrace = errorService.getServerStack(error);
        if (message instanceof Array) {
          message.forEach((msg) => notifier.showError(msg));
        } else notifier.showError(message);
      }
    } else {
      // Client Error
      message = errorService.getClientMessage(error);
      stackTrace = errorService.getClientStack(error);
      notifier.showError(message);
    }

    // Always log errors
    logger.logError(message, stackTrace);

    console.error(error);
  }
  private handleRouterErrors(event: NavigationError) {
    if (event.error.name === 'ChunkLoadError') {
      window.location.href = `${window.location.origin}${event.url}`;
    }
  }
}
