import { Component, OnInit } from '@angular/core';
import { UserRoles } from '../../shared/models/enums';
import { AuthService } from '../../shared/services/auth.new.service';
import { FranchiseeService } from '../../shared/services/franchisee/franchisee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public myFranchiseeId: string;
  public mySubFranchiseeId: string;

  get loggedUserRole(): UserRoles {
    return this.authService.loggedUserRole;
  }

  get isFranchisee(): boolean {
    return !!this.myFranchiseeId && !this.mySubFranchiseeId;
  }

  get isSubFranchisee(): boolean {
    return !!this.mySubFranchiseeId && !this.myFranchiseeId;
  }

  constructor(private readonly authService: AuthService, private franchiseService: FranchiseeService) {

  }

  ngOnInit(): void {
    this.initFranchiseId();
  }

  initFranchiseId() {
    if (this.authService.loggedUserRole == UserRoles.FranchiseeAdmin
      || this.authService.loggedUserRole == UserRoles.FranchiseeUser) {
      this.franchiseService.getMyFranchiseId2()
        .subscribe((data) => {
          this.myFranchiseeId = data.franchiseeId;
          this.mySubFranchiseeId = data.subFranchiseeId;
        });
    }
  }
}
