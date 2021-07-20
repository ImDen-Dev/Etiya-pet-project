import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
} from '@angular/forms';
import { AtomInputErrorsComponent } from '../atom-input-errors/atom-input-errors.component';

@Component({
  selector: 'atom-input-with-label',
  templateUrl: './atom-input-with-label.component.html',
  styleUrls: ['./atom-input-with-label.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtomInputWithLabelComponent),
      multi: true,
    },
  ],
})
export class AtomInputWithLabelComponent
  implements ControlValueAccessor, OnInit
{
  @Input() inputType = 'email';
  @Input() inputId = 'email';
  @Input() labelText = '';
  @Input() inputClasses = ['form-control'];
  @Input() labelClasses = ['form-label'];
  @Input() isRequired = true;

  ngControl!: NgControl;

  onChange!: (_: any) => void;
  onTouched!: () => void;

  value = '';

  constructor(public _injector: Injector) {}

  ngOnInit() {
    this.ngControl = this._injector.get(NgControl);
  }

  get control(): AbstractControl | null {
    return this.ngControl.control;
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

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
  }
}
