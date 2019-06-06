import { Component, OnInit } from '@angular/core';

import { BaseForm } from '../../abstracts/base-form.class';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'tcp-bio-form',
  templateUrl: './bio-form.component.html',
  styleUrls: ['./bio-form.component.scss']
})
export class BioFormComponent extends BaseForm implements OnInit {

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
