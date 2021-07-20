import {
  Component,
  forwardRef,
  Host,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  SkipSelf,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

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
  @Input() countries!: any;

  onChange!: (_: any) => void;
  onTouched!: () => void;

  value = '';

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {}

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
