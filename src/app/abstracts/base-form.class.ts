import { EventEmitter, Output, Directive } from '@angular/core'
import { AbstractControl, FormGroup } from '@angular/forms'

@Directive()
export abstract class BaseForm {
  @Output() formReady: EventEmitter<AbstractControl>
  formGroup: FormGroup

  constructor() {
    this.formReady = new EventEmitter<AbstractControl>(true) // true = async
  }

  abstract buildForm(): FormGroup

  emitFormReady(control: AbstractControl = null): void {
    this.formReady.emit(control ? control : this.formGroup)
  }

  registerForm(name: string, control: AbstractControl): void {
    this.formGroup.setControl(name, control)
  }

  deregisterForm(name: string): void {
    if (this.formGroup.contains(name)) {
      this.formGroup.removeControl(name)
    }
  }
}
