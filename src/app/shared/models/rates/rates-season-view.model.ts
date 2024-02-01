
export class RatesSeasonListModel {

    public uid: string;
    public rateUid: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public bookingStartDate: string;
    public bookingEndDate: string;
    public minRate: string;
    public maxRate: string;
    public minPeriod: string;
    public maxDiscount: string;
}

export class RateSeasonCreateModel {
    public description: string;
    public startDate: string;
    public endDate: string;
    public bookingStartDate: string;
    public bookingEndDate: string;
    constructor() {
        this.description = '';
        this.startDate = null;
        this.endDate = null;
        this.bookingStartDate = null;
        this.bookingEndDate = null;
    }
}

export class RateSeasonDetailsModel{
    public uid : string
    public rateUid : string
    public description : string
    public startDate : string
    public endDate : string
    public bookingStartDate : string
    public bookingEndDate : string
    public entityVersion : string
    constructor({uid, rateUid, description, startDate, endDate, bookingStartDate, bookingEndDate, entityVersion}) {
        this.uid = uid;
        this.rateUid = rateUid;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.bookingStartDate = bookingStartDate;
        this.bookingEndDate = bookingEndDate;
        this.entityVersion  = entityVersion;
    }
}

export class RateSeasonDayBreakDetailsModel {
    public uid:	string
    public entityVersion: string
    public rateSeasonUid: string
    public periodDaysFrom: number
    public periodDaysTo: number
}

export class RateSeasonExcessListModel {
    public uid:	string
    public entityVersion: string
    public seasonUid: string
    public excessUid: string
}

export class RateSeasonExtrasListModel{
    public uid: string
    public entityVersion: string
    public seasonUid: string
    public extrasUid: string
    public code?: string
    public originalCode?: string
}

export class RateSeasonExtrasValueDetailsModel{
    public uid: string	
    public entityVersion: string
    public rateSeasonExtrasUid: string
    public vehicleCategoryUid: string
    public value: number
    public isIncluded: boolean
    public isRequired: boolean
    public hasInvoiceVoucher: boolean
    public isValueChangeAllowed: boolean
    public isAvailable: boolean
    public isBreakdown: boolean
}

export class RateSeasonExcessValueDetailsModel{
    public uid: string
    public entityVersion: string
    public rateSeasonExcessUid: string
    public vehicleCategoryUid: string
    public value: number
}

export class RateSeasonValueDetailsModel{
    public uid: string
    public entityVersion: string
    public vehicleCategoryUid: string
    public dayBreakUid: string
    public value: string
    public freeMiles:	RateSeasonValueFreeMilesModel
}

export class RateSeasonValueFreeMilesModel{
    public price: number
    public isUnlimited: boolean
    public isResetDaily: boolean
    public distanceIncluded: number
}
