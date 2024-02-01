import { Component, OnInit, Input } from '@angular/core';
import { RatesService } from 'app/shared/services/rates/rates.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const discountMask = {
  prefix: '',                      //mandatory
  suffix: ' %',                    //mandatory
  includeThousandsSeparator: true,
  allowDecimal: true,
  decimalLimit: 0,
  requireDecimal: false,
  allowNegative: false,
  allowLeadingZeroes: false,
  integerLimit: 3
};

const periodMask = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  allowDecimal: true,
  decimalLimit: 0,
  requireDecimal: false,
  allowNegative: false,
  allowLeadingZeroes: false,
  integerLimit: 8
};

const rateMask = {
  prefix: '',
  suffix: ' €',
  includeThousandsSeparator: true,
  allowDecimal: true,
  decimalLimit: 2,
  requireDecimal: false,
  allowNegative: false,
  allowLeadingZeroes: false,
  integerLimit: 8
}
@Component({
  selector: 'app-rates-info-input',
  templateUrl: './rates-info-input.component.html',
  styleUrls: ['./rates-info-input.component.css']
})

export class RatesInfoInputComponent implements OnInit {

  rateData: any
  discountMask = createNumberMask({
    ...discountMask
  });

  periodMask = createNumberMask({
    ...periodMask
  })

  rateMask = createNumberMask({
    ...rateMask
  })
  
  constructor(
    private rateService: RatesService
  ) { }

  ngOnInit(): void {
    this.rateService.getSeasonGridObservable().subscribe((info) => {
      this.rateData = info
    })
  }

}
