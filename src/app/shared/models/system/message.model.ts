export class Message {
  public errorCode: number;
  public params: Params;
}

export interface Params {
  [key: string]: string;
}
