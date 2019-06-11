import { Component, Input, OnInit } from '@angular/core';
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

  @Input() skillList: IEmployeeSkill[] = []

  constructor(private fb: FormBuilder) {
    super();
    this.formGroup = this.buildForm();
  }

  ngOnInit() {
    this.emitFormReady(this.skillListFormArray);
    if (!this.skillList || this.skillList.length === 0) {
      this.addSkill();
    }
  }

  registerSkillDetail(index: number, formGroup: FormGroup): void {
    this.skillListFormArray.insert(index ? index : 0, formGroup);
  }

  deregisterSkillDetail(index: number): void {
    this.skillListFormArray.removeAt(index);
  }

  buildForm(): FormGroup {
    return this.fb.group({
      skillList: this.fb.array([])
    });
  }

  addSkill(): void {
    this.skillList.push(null);
  }

  get skillListFormArray(): FormArray {
    return this.formGroup.get('skillList') as FormArray
  }

}
