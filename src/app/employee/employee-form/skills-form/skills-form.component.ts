import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IEmployeeSkill, PROFICIENCY } from '../../../models/skill.interface';

import { BaseForm } from '../../abstracts/base-form.class';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tcp-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.scss']
})
export class SkillsFormComponent extends BaseForm implements OnInit {

  constructor(private fb: FormBuilder) {
    super();
    this.formGroup = this.buildForm();
  }

  ngOnInit() {
    this.emitFormReady();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      skillList: this.fb.array([])
    });
  }

  get skillListFormArray(): FormArray {
    return this.formGroup.get('skillList') as FormArray
  }

}
