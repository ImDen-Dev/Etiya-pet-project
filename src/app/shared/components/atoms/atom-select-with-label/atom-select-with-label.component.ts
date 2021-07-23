import {
  Component,
  forwardRef,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'atom-select-with-label',
  templateUrl: './atom-select-with-label.component.html',
  styleUrls: ['./atom-select-with-label.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtomSelectWithLabelComponent),
      multi: true,
    },
  ],
})
export class AtomSelectWithLabelComponent
  implements ControlValueAccessor, OnChanges
{
  @Input() inputId = 'addressType';
  @Input() labelText = '';
  @Input() inputClasses = ['form-select'];
  @Input() labelClasses = ['form-label'];
  @Input() isRequired = true;
  @Input() disabledSelectedOption = 'Choose address type';

  @Input() optionsValue!: { name: string }[] | null;

  options: {
    value: string;
    name: string;
  }[] = [
    {
      value: 'Shipment_Address',
      name: 'Shipment Address',
    },
    {
      value: 'Billing_Address',
      name: 'Billing Address',
    },
    {
      value: 'Home_Address',
      name: 'Home Address',
    },
  ];

  ngControl!: NgControl;

  onChange!: (_: any) => void;
  onTouched!: () => void;
  value = '';

  constructor(private _injector: Injector) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['optionsValue']) {
      this.setOptions();
    }
  }

  setOptions() {
    if (this.optionsValue) {
      this.options = [
        ...this.optionsValue.map((val) => ({
          value: val.name,
          name: val.name,
        })),
      ];
    }
  }

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

  onSelect(event: Event) {
    this.value = (event.target as HTMLSelectElement).value;
    this.onChange(this.value);
  }
}
