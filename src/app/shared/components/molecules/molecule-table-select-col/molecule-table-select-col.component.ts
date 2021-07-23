import {
  Component,
  forwardRef,
  Host,
  Input,
  Optional,
  SkipSelf,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { SelectModel } from '../../../models/select.model';
import { AddressTypes } from '../../../addressTypes';

@Component({
  selector: 'molecule-table-select-col',
  templateUrl: './molecule-table-select-col.component.html',
  styleUrls: ['./molecule-table-select-col.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MoleculeTableSelectColComponent),
      multi: true,
    },
  ],
})
export class MoleculeTableSelectColComponent implements ControlValueAccessor {
  @Input() isEdit = false;
  @Input() inputType!: string;
  @Input() controlName!: string;
  @Input() countries!: SelectModel[] | null;

  types: { [name: string]: string } = AddressTypes;

  onChange!: (_: any) => void;
  onTouched!: () => void;

  value = '';

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {
    console.log(typeof this.types);
  }

  get control(): FormControl {
    return this.controlContainer.control?.get(this.controlName) as FormControl;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
}