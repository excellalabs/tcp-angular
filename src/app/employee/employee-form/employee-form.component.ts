import { Component, OnInit } from '@angular/core';

import { BaseForm } from '../abstracts/base-form.class';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'tcp-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent extends BaseForm {

  constructor() {
    super();
    this.formGroup = this.buildForm();
  }

  buildForm(): FormGroup {
    return new FormGroup({});
  }

}
