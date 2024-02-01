import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GroupViewModel } from 'app/shared/models/financial/group-view.model';
import { GroupService } from 'app/shared/services/financial/group.service';
import { GlobalService } from 'app/shared/services/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-groups-detail',
  templateUrl: './groups-detail.component.html',
  styleUrls: ['./groups-detail.component.css']
})
export class GroupsDetailComponent implements OnInit {

  public formGroup: FormGroup;

  private routeDataSubscription: Subscription; //Used for the current model retrieval from the resolver
  public currentModel: GroupViewModel;
  
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly defaultService: GroupService,
    private readonly globalService: GlobalService,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe(
      (data: { detail: GroupViewModel }) => {
        this.currentModel = data.detail;
        if (this.currentModel) this.createForm();
      },
    );
  }

  // convenience getter for easy access to form fields
  public get fields() {
    return this.formGroup.controls;
  }

  public createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      group: [this.currentModel.group, Validators.required],
    });
  }
}
