import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  getClientMessage(error: Error): string {
    return error.message ? error.message : error.toString();
  }

  getClientStack(error: Error): string {
    return error.stack;
  }

  getServerMessage(error: HttpErrorResponse): string | string[] {
    if (error.error && error.status === 400) {
      return error.error;
    }
    return 'Unable to complete request';
  }

  getServerStack(error: HttpErrorResponse): string {
    // handle stack trace
    return 'stack';
  }
}
