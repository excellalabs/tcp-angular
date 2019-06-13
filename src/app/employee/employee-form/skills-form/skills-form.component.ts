import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'

import { IEmployeeSkill } from '../../../models/skill.interface'
import { BaseForm } from '../../abstracts/base-form.class'

@Component({
  selector: 'tcp-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.scss'],
})
export class SkillsFormComponent extends BaseForm implements OnInit {
  @Input() skillList: IEmployeeSkill[] = []

  constructor(private fb: FormBuilder) {
    super()
    this.formGroup = this.buildForm()
  }

  ngOnInit() {
    this.emitFormReady(this.skillListFormArray)
    if (!this.skillList || this.skillList.length === 0) {
      this.addSkill()
    }
  }

  buildForm(): FormGroup {
    return this.fb.group({
      skillList: this.fb.array([]),
    })
  }

  registerSkillDetail(index: number, formGroup: FormGroup): void {
    this.skillListFormArray.setControl(index, formGroup)
  }

  deleteSkillAt(index: number): void {
    this.skillList.splice(index, 1)
  }

  deregisterSkillDetail(index: number): void {
    this.skillListFormArray.removeAt(Math.min(index, this.skillListFormArray.length - 1))
  }

  addSkill(): void {
    if (this.formGroup.valid) {
      this.skillList = this.skillListFormArray.value as IEmployeeSkill[]
      this.skillList.push({} as IEmployeeSkill)
    }
  }

  get skillListFormArray(): FormArray {
    return this.formGroup.get('skillList') as FormArray
  }
}
