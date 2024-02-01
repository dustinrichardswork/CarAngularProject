import { Component, EventEmitter, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { SeasonsGridDecorator } from './grid-decorators/seasons-grid-decorator';
import { RateSeasonCreateModel, RateSeasonValueDetailsModel, RatesSeasonListModel } from 'app/shared/models/rates/rates-season-view.model';
import { ActivatedRoute } from '@angular/router';
import { RatesService } from 'app/shared/services/rates/rates.service';
// import { RateCreateModel } from 'app/shared/models/rates/rates-item-detail.model';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { VehicleCategoryDetailsModel } from 'app/shared/models/rates/vehicle-category-model';

@Component({
  selector: 'app-rates-general',
  templateUrl: './rates-general.component.html',
  styleUrls: ['./rates-general.component.css']
})
export class RatesGeneralComponent implements OnInit {

  @Input() addSeasonEmitter: EventEmitter<any>;

  public formGroup: FormGroup;

  newSeasonEmitter = new EventEmitter<any>();
  newDayBreakEmitter = new EventEmitter<any>();
  autoSelectRowEmitter = new EventEmitter<any>();

  rateSeasonValueDetails: RateSeasonValueDetailsModel[]
  seasonsDecorator = new SeasonsGridDecorator(this.route, this.ratesService);
  newSeasonRowPrototype = new RateSeasonCreateModel();
  rateUid: string;
  rateData: any;
  vehicleCategories: VehicleCategoryDetailsModel[]
  public rowData: RatesSeasonListModel[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly ratesService: RatesService,
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({

    });
    this.ratesService.getRemoveRateSeasonSubject().subscribe((uid) => {
      this.rowData = this.rowData.filter(season => season.uid !== uid);
    })
    this.route.queryParams.subscribe((query: any) => {
      this.rateData = {
        rateMax: query.rateMax,
        rateMin: query.rateMin,
        periodMin: query.periodMin,
        discountMax: query.discountMax
      }
    })
    this.route.paramMap.subscribe(paramMap => {
      let rateUid = paramMap['params']['uid'];
      this.rowData = [];
      if (rateUid) {
        this.ratesService.getRateSeasons(rateUid, 0).subscribe((seasonData: RatesSeasonListModel[]) => {
          this.rowData = [...seasonData];
          this.rowData.map(item => {
            item.bookingStartDate = item.bookingStartDate ? item.bookingStartDate.split('T')[0] : '';
            item.bookingEndDate = item.bookingEndDate ? item.bookingEndDate.split('T')[0] : '';
          })
          this.autoSelectRowEmitter.emit({rowIndex: 0, data: seasonData[0]});
        })
        this.ratesService.getVehicleCategories().subscribe((vehicleCategories: VehicleCategoryDetailsModel[]) => {
          this.vehicleCategories = vehicleCategories;
          console.log(this.vehicleCategories)
        })
        if(this.rowData.length > 0) {
          this.autoSelectRowEmitter.emit(0);
        }
        
      }
    })
  }

  tabChanged(event: MatTabChangeEvent): void {
    this.ratesService.sendChangeRatesTabSubject();
  }

  insertSeason() {
    this.newSeasonEmitter.emit('new');
  }

  insertDayBreak() {
    this.newDayBreakEmitter.emit('new');
  }
}
