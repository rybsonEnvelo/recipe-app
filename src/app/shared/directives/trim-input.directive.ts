import { Directive, HostListener, Optional } from '@angular/core';
import { FormControlDirective, FormControlName } from '@angular/forms';

@Directive({
  selector: '[appTrimInput]',
})
export class TrimInputDirective {
  constructor(
    @Optional() private formControlDir: FormControlDirective,
    @Optional() private formControlName: FormControlName
  ) {}

  @HostListener('blur')
  trimValue() {
    const control = this.formControlDir?.control || this.formControlName?.control;
    control.setValue(control.value.trim());
  }
}
