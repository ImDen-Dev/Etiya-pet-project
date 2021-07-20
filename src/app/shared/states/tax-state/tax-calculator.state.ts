import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CalculatingAction, GetTaxTypesAction } from './tax-calculator.actions';
import { TaxCalculatorService } from '../../services/tax-calculator.service';
import { tap } from 'rxjs/operators';

export interface TaxCalculatorStateModel {
  types: string[];
  sum: number;
}

@State<TaxCalculatorStateModel>({
  name: 'Tax',
  defaults: {
    types: [],
    sum: 0,
  },
})
@Injectable()
export class TaxCalculatorState {
  constructor(private tax: TaxCalculatorService) {}

  @Selector()
  static getTypes({ types }: TaxCalculatorStateModel): { name: string }[] {
    let newTypes!: { name: string }[];
    newTypes = types.map((type) => ({ name: type }));
    return newTypes;
  }

  @Selector()
  static getSum({ sum }: TaxCalculatorStateModel): number {
    return sum;
  }

  @Action(GetTaxTypesAction)
  getTypes({ patchState }: StateContext<TaxCalculatorStateModel>) {
    return this.tax
      .getTypes()
      .subscribe((types) => patchState({ types: [...types] }));
  }

  @Action(CalculatingAction)
  calc(
    { patchState }: StateContext<TaxCalculatorStateModel>,
    { type, salary }: CalculatingAction
  ) {
    return this.tax
      .getTaxes(salary, type)
      .pipe(tap((percent) => patchState({ sum: +percent })));
  }
}
