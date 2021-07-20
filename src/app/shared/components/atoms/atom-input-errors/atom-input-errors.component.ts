import { Component, Injector, Input, OnInit } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { AtomInputWithLabelComponent } from '../atom-input-with-label/atom-input-with-label.component';

@Component({
  selector: 'atom-input-errors',
  templateUrl: './atom-input-errors.component.html',
  styleUrls: ['./atom-input-errors.component.scss'],
})
export class AtomInputErrorsComponent {
  @Input() validationErrors!: ValidationErrors | null | undefined;
  @Input() fieldText!: string;

  get errors() {
    return Object.keys(this.validationErrors as Object).map((key) =>
      this.validationErrors
        ? {
            [key]: this.validationErrors[key],
          }
        : null
    )[0];
  }

  get stringError() {
    return Object.keys(this.errors as Object).map((key) => key);
  }
}
