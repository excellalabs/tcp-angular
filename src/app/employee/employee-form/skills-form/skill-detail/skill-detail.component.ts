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
import { Observable, Subscription, combineLatest } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { PrimarySkillService } from 'src/app/employee/services/primary-skill/primary-skill.service'

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
  @Input() index: number
  @Input() employeeSkill: IEmployeeSkill
  @Output() destroyForm = new EventEmitter<void>()

  proficiencies: string[] = Object.keys(PROFICIENCY)
  filteredSkills$: Observable<ISkill[]>
  displayFn = displaySkillFn
  subscriptions: Subscription[] = []

  constructor(
    private fb: FormBuilder,
    public skillService: SkillsService,
    public primarySkillService: PrimarySkillService
  ) {
    super()
    this.formGroup = this.buildForm()
  }

  ngOnInit() {
    this.emitFormReady()
    this.skillService.fetch()

    this.filteredSkills$ = this.skill.valueChanges.pipe(
      map(s => (typeof s === 'string' ? s : s.name)),
      map(name =>
        this.skillService.list.value.filter(op =>
          op.name.toLowerCase().includes(name.toLowerCase())
        )
      )
    )

    // Send and respond to Primary Skill changes
    this.subscriptions.push(
      this.primary.valueChanges.pipe(filter(v => v === true)).subscribe(() => {
        this.primarySkillService.primarySkill$.next(this.index)
      }),
      this.primarySkillService.primarySkill$.subscribe(primaryIndex => {
        if (primaryIndex !== this.index && this.primary.value === true) {
          this.primary.setValue(false, { emitEvent: false })
        }
        if (primaryIndex === this.index && this.primary.value !== true) {
          this.primary.setValue(true, { emitEvent: false })
        }
      })
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
      if (this.primary.value === true) {
        this.primarySkillService.primarySkill$.next(this.index)
      } else {
        if (this.primarySkillService.primarySkill$.value === this.index) {
          this.primary.setValue(true, { emitEvent: false })
        }
      }
    }
  }

  ngOnDestroy() {
    this.destroyForm.emit()
    this.primarySkillService.clearPrimarySkill(this.index)
    this.subscriptions.forEach(s => s.unsubscribe())
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

  get primary(): AbstractControl {
    return this.formGroup.get('primary')
  }
}
