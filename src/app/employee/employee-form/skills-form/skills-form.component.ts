import { Component, OnInit } from '@angular/core';

import { BaseForm } from '../../abstracts/base-form.class';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'tcp-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.scss']
})
export class SkillsFormComponent extends BaseForm implements OnInit {

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
