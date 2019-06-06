import { Component, OnInit } from '@angular/core';

import { BaseForm } from '../../abstracts/base-form.class';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'tcp-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent extends BaseForm implements OnInit {


  constructor() {
    super();
    this.formGroup = this.buildForm();
  }

  ngOnInit() {
    this.emitFormReady();
   }

  buildForm(): FormGroup {
    return new FormGroup({});
  }

}
