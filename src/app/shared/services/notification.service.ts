import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { MessageService } from './system/message.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _notifications: NotificationsService, private messageService: MessageService) { }

  showSuccess(message: string): void {
    this._notifications.success('Success', message);
  }

  showError(message: string): void {
    this._notifications.error('Error', message);
  }

  showWarning(message: string): void {
    this._notifications.warn('Warning', message);
  }

  showSuccessMessage(code: number): void {
    const message = this.messageService.combineMessage({ errorCode: code, params: null });
    this._notifications.success('Success', message);
  }

  showErrorMessage(code: number): void {
    const message = this.messageService.combineMessage({ errorCode: code, params: null });
    this._notifications.error('Error', message);
  }

  showWarningMessage(code: number): void {
    const message = this.messageService.combineMessage({ errorCode: code, params: null });
    this._notifications.warn('Warning', message);
  }
}
