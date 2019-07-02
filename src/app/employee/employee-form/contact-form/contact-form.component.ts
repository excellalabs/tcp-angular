import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { BaseForm } from '../../../abstracts/base-form.class'
import { IEmployeeContact } from '../../../models/employee.interface'
import { hasChanged } from '../../../utils/functions'

@Component({
  selector: 'tcp-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent extends BaseForm implements OnInit, OnChanges {
  @Input() contact: IEmployeeContact = {} as IEmployeeContact

  constructor(private fb: FormBuilder) {
    super()
    this.formGroup = this.buildForm()
  }

  ngOnInit() {
    this.emitFormReady()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (hasChanged(changes.contact) && !!this.contact) {
      this.formGroup.patchValue(this.contact)
    }
  }

  buildForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/\(\d{3}\)\d{3}-\d{4}/)],
      ],
    })
  }
}
