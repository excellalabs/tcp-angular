import { AbstractControl, FormGroup } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';

export abstract class BaseForm {

  @Output() formReady: EventEmitter<AbstractControl>;
  formGroup: FormGroup;

  constructor() {
    this.formReady = new EventEmitter<AbstractControl>(true); // true = async
  }

  abstract buildForm(): FormGroup;

  emitFormReady(control: AbstractControl = null): void {
    this.formReady.emit(control ? control : this.formGroup);
  }

  registerForm(name: string, control: AbstractControl): void {
    this.formGroup.setControl(name, control);
  }

  deregisterForm(name: string): void {
    if (this.formGroup.contains(name)) {
      this.formGroup.removeControl(name);
    }
  }
}
