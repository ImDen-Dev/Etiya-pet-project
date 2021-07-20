export class GetTaxTypesAction {
  static readonly desc = 'Get Tax Types';
  static readonly type = '[Tax] Get Types';
}

export class CalculatingAction {
  static readonly desc = 'Calculating Taxes';
  static readonly type = '[Tax] Calculate';
  constructor(public salary: string, public type: string) {}
}
