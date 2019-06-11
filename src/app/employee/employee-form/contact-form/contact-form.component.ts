import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BaseForm } from '../../abstracts/base-form.class';

@Component({
  selector: 'tcp-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent extends BaseForm implements OnInit {

  constructor(private fb: FormBuilder) {
    super();
    this.formGroup = this.buildForm();
  }

  ngOnInit() {
    this.emitFormReady();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/\(\d{3}\)\d{3}-\d{4}/)]],
    });
  }

}
