import { AbstractControl, FormGroup } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';

export abstract class BaseForm {

  @Output() formReady: EventEmitter<FormGroup>;
  formGroup: FormGroup;

  constructor() {
    this.formReady = new EventEmitter<FormGroup>(true); // true = async
  }

  abstract buildForm(): FormGroup;

  registerForm(name: string, control: AbstractControl): void {
    this.formGroup.setControl(name, control);
  }

  deregisterForm(name: string): void {
    if (this.formGroup.contains(name)) {
      this.formGroup.removeControl(name);
    }
  }
}
