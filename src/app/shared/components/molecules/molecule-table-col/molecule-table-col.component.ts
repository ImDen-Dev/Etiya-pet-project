import {
  Component,
  forwardRef,
  Host,
  Injector,
  Input,
  OnInit,
  Optional,
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
  selector: 'molecule-table-col',
  templateUrl: './molecule-table-col.component.html',
  styleUrls: ['./molecule-table-col.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MoleculeTableColComponent),
      multi: true,
    },
  ],
})
export class MoleculeTableColComponent implements OnInit, ControlValueAccessor {
  @Input() isEdit = false;
  @Input() inputType!: string;
  @Input() controlName!: string;

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

  ngOnInit() {}

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
