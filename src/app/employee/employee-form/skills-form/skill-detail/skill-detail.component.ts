import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import {
  IEmployeeSkill,
  ISkill,
  PROFICIENCY,
  displaySkillFn,
} from '../../../../models/skill.interface'
import { SkillsService } from '../../../../services/skills/skills.service'
import { hasChanged } from '../../../../utils/functions'
import { BaseForm } from '../../../abstracts/base-form.class'

@Component({
  selector: 'tcp-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.scss'],
})
export class SkillDetailComponent extends BaseForm
  implements OnInit, OnChanges, OnDestroy {
  @Input() employeeSkill: IEmployeeSkill
  @Output() destroyForm = new EventEmitter<void>()

  proficiencies: string[] = Object.keys(PROFICIENCY)
  filteredSkills$: Observable<ISkill[]>
  displayFn = displaySkillFn

  constructor(private fb: FormBuilder, public skillService: SkillsService) {
    super()
    this.formGroup = this.buildForm()
  }

  ngOnInit() {
    this.emitFormReady()

    this.filteredSkills$ = this.skill.valueChanges.pipe(
      map(s => (typeof s === 'string' ? s : s.name)),
      map(name =>
        this.skillService.list.value.filter(op =>
          op.name.toLowerCase().includes(name.toLowerCase())
        )
      )
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if (hasChanged(changes.employeeSkill)) {
      const value = this.employeeSkill ? this.employeeSkill : ({} as IEmployeeSkill)
      if (value === ({} as IEmployeeSkill)) {
        this.formGroup.reset()
      }
      this.formGroup.patchValue(value, { onlySelf: false })
    }
    if (hasChanged(changes.index)) {
      this.emitFormReady()
    }
  }

  ngOnDestroy() {
    this.destroyForm.emit()
  }

  buildForm(): FormGroup {
    return this.fb.group({
      skill: ['', [Validators.required]],
      proficiency: ['', [Validators.required]],
      primary: [false, []],
    })
  }

  get skill(): AbstractControl {
    return this.formGroup.get('skill')
  }
}
