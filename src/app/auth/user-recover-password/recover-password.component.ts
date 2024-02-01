// Code behind logic for UserRecoverPasswordComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoverPasswordViewModel } from '@app-shared/models/recover-password-view-model.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.new.service';
import { NotificationService } from '../../shared/services/notification.service';
import { UserProfileService } from '../../shared/services/user/user-profile.service';

@Component({
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent implements OnInit, OnDestroy {

  public submitted = false;
  public isSubmitting = false;
  private subscriptions: Subscription[] = [];
  private token: string;


  constructor(
    private authService: AuthService,
    private profileService: UserProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationServiec: NotificationService) { }


  ngOnInit(): void {

    if (this.authService.isLoggedIn()) {
      this.subscriptions.push(this.authService.logout().subscribe());
    }

    this.subscriptions.push(this.route.queryParams.subscribe(params => {
      this.token = params["token"];
    }));
  }

  recoverPassword() {
    // this.setPassComponent.formGroup.markAllAsTouched();
    // if (this.setPassComponent.formGroup.valid) {
    //   let data = new RecoverPasswordViewModel();
    //   data.token = this.token;
    //   data.newPassword = this.setPassComponent.fields.newPassword.value;

    //   this.subscriptions.push(this.profileService.recoverPassword(data).subscribe(() => {
    //     this.notificationServiec.showSuccess("Password recovered successfully.");
    //     this.router.navigateByUrl("/login");
    //   }));
    // }
  }

  //Unsubscribe from subscriptions here
  public ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
