import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AuthService } from '@app-shared/services/auth.new.service';
import { AppNavigation } from 'app/shared/services/navigation/app-navigation';
declare const StartParticles: any;
declare const DestroyParticles: any;

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  //  private currentModel: Login;
  public submitted = false;
  public isSubmitting = false;
  public errors: Array<string>;

  public returnUrl: string;

  // convenience getter for easy access to form fields
  public get fields() {
    return this.formGroup.controls;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  public ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    StartParticles();
    this.createForm();
  }

  public createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      remember: [true],
    });
  }

  public login() {
    //this.formGroup.controls["remember"].value
    this.submitted = true;
    this.errors = null;
    if (this.formGroup.valid) {
      this.isSubmitting = true;
      this.authService
        .login(
          this.formGroup.value.userName,
          this.formGroup.value.password,
          this.formGroup.value.remember,
        )
        .pipe(finalize(() => (this.isSubmitting = false)))
        .subscribe(
          (result) => {
            if (result) {
              void this.router.navigateByUrl(this.returnUrl).then(() => {
                window.location.reload();
              });
            }
          },
          (error) => {
            if (error.error && error.error.login_failure) {
              this.errors = error.error.login_failure;
            } else {
              this.errors = ['Unable to connect'];
            }
          },
        );
    }
    return false;
  }

  public ngOnDestroy(): void {
    DestroyParticles();
  }
}
