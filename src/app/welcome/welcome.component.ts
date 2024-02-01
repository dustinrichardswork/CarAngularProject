import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardComponent } from 'angular-archwizard';
import { UserProfileViewModel } from '@app-shared/models/user-profile-view-model.model';
import { AuthService } from '@app-shared/services/auth.new.service';
import { UserProfileService } from '@app-shared/services/user/user-profile.service';

import { Subscription } from 'rxjs';

@Component({
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;

  public token: string;
  public checked = false;
  public profileModel: UserProfileViewModel = new UserProfileViewModel();
  public subscriptions: Subscription[] = [];
  constructor(
    private readonly authService: AuthService,
    private readonly profileService: UserProfileService,
    private readonly route: ActivatedRoute,
  ) {}
   
  public ngOnInit(): void {
    this.initModelbyToken();

    if (this.authService.isLoggedIn()) {
      this.subscriptions.push(this.authService.logout().subscribe());
    }
  }

  public initModelbyToken() {
    this.subscriptions.push(this.route.queryParams.subscribe((x) => {
      if (x.token) {
        this.token = x.token;
        this.profileService.getUserProfileByToken(x.token).subscribe((result) => {
          this.profileModel = result;
        });
      }
    }));
  }

  public acceptTermsOfUse() {
    if (this.checked) {
      this.subscriptions.push(this.profileService.acceptTermsOfService(this.token).subscribe({
        next: () => {
          this.wizard.goToNextStep();
        },
        error: (e) => {
          console.error(e);
        },
      }));
    }
  }

  public finish() {
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
