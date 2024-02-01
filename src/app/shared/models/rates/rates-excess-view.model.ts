
export class RatesExcessViewModel {
    public ExcessCode: string;
    public MDMR: number;
    public EDMR: number;
    public ECMR: number;
    public CDMR: number;
    public MDAR: number;
    public EDAR: number;

    constructor() {
        this.ExcessCode = '';
        this.MDMR = null;
        this.EDMR = null;
        this.ECMR = null;
        this.CDMR = null;
        this.MDAR = null;
        this.EDAR = null;
    }
}