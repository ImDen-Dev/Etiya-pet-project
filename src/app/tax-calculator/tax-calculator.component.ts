import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TaxCalculatorState } from '../shared/states/tax-state/tax-calculator.state';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CalculatingAction,
  GetTaxTypesAction,
} from '../shared/states/tax-state/tax-calculator.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tax-calculator',
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.scss'],
})
export class TaxCalculatorComponent implements OnInit {
  taxForm!: FormGroup;
  types: { name: string }[] = [];

  constructor(private fb: FormBuilder, private store: Store) {}

  @Select(TaxCalculatorState.getTypes) types$!: Observable<{ name: string }[]>;
  @Select(TaxCalculatorState.getSum) sum$!: Observable<number>;

  ngOnInit(): void {
    this.store.dispatch(new GetTaxTypesAction());
    this.types$.subscribe((types) =>
      this.types.length === 0 ? (this.types = types) : this.types
    );
    this.initForm();
  }

  initForm() {
    this.taxForm = this.fb.group({
      type: [''],
      salary: ['', Validators.pattern(/[0-9]g/)],
    });
  }

  onSubmit() {
    const { type, salary } = this.taxForm.value;
    console.log(type);
    this.store.dispatch(new CalculatingAction(salary, type));
  }
}
