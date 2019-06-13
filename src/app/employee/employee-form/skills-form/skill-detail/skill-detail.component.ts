import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { IEmployeeSkill, ISkill, PROFICIENCY } from '../../../../models/skill.interface';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

import { BaseForm } from '../../../abstracts/base-form.class';
import { SkillsService } from '../../../../services/skills/skills.service';
import { hasChanged } from '../../../../utils/functions';

@Component({
  selector: 'tcp-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.scss']
})
export class SkillDetailComponent extends BaseForm implements OnInit, OnChanges, OnDestroy {

  @Input() employeeSkill: IEmployeeSkill
  @Output() destroyForm = new EventEmitter<void>();

  proficiencies: string[] = Object.keys(PROFICIENCY);
  filteredSkills$: Observable<ISkill[]>

  constructor(private fb: FormBuilder, public skillService: SkillsService) {
    super();
    this.formGroup = this.buildForm();
    this.filteredSkills$ = combineLatest([
      this.skill.valueChanges.pipe(
        startWith(''),
        map(s => typeof s === 'string' ? s : s.name)
      ),
      this.skillService.list
    ]).pipe(
      map(([name, skillList]: [string, ISkill[]]) =>
        skillList.filter(s => s.name.toLowerCase().includes(name.toLowerCase())))
    )
  }

  ngOnInit() {
    this.emitFormReady();
    this.skillService.fetch();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (hasChanged(changes.employeeSkill)) {
      const value = this.employeeSkill ? this.employeeSkill : {} as IEmployeeSkill
      if (value === {} as IEmployeeSkill) {
        this.formGroup.reset()
      }
      this.formGroup.patchValue(value, {onlySelf: false});
    }
    if (hasChanged(changes.index)) {
      this.emitFormReady()
    }
  }

  ngOnDestroy() {
    this.destroyForm.emit();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      skill: ['', [Validators.required]],
      proficiency: ['', [Validators.required]],
      primary: [false, []]
    })
  }

  displayFn(skill: ISkill): string {
    return skill ? `${skill.name} (${skill.category.name})` : undefined;
  }

  get skill(): AbstractControl {
    return this.formGroup.get('skill');
  }

}
