import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NotificationBarMessage } from '../../../shared/models/notification-bar/notification-bar-message.model';
import { NotificationBarService } from '../../../shared/services/notification-bar/notification-bar.service';
import { DialogService } from '../../../shared/services/system/dialog.service';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('1s')
      ]),
    ]),
  ],
})
export class NotificationBarComponent implements OnInit {

  public currentMessage: NotificationBarMessage;
  public isOpen = false;

  constructor(private defaultService: NotificationBarService, private dialogService: DialogService) { }

  ngOnInit(): void {
    //setTimeout(() => this.checkForMessage(), 500);
  }

  public dismiss(): boolean {
    this.isOpen = false;
    setTimeout(() => {
      this.defaultService.dismissNotification(this.currentMessage.uid).subscribe(a => {
        this.currentMessage = a;
        if (a) {
          this.isOpen = true;
        } else {
          this.isOpen = false;
          setTimeout(() => this.checkForMessage(), 600000);
        }
      });
    }, 500);
    return false;
  }

  public showNotification(): void {
    if (this.isOpen && this.currentMessage)
      this.dialogService.oneButtonUnsafe(this.currentMessage.title, `<div style="min-width: 400px; overflow: hidden;">${this.currentMessage.content}</div>`, "Close");
  }

  private checkForMessage() {
    this.defaultService.getNotification().subscribe(a => {
      this.currentMessage = a;
      if (a) {
        this.isOpen = true;
      } else {
        this.isOpen = false;
        setTimeout(() => this.checkForMessage(), 600000);
      }
    }, () => { });
  }
}
