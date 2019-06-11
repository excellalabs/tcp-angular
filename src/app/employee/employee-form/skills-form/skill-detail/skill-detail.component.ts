import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ISkill, PROFICIENCY } from '../../../../models/skill.interface';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { BaseForm } from '../../../abstracts/base-form.class';
import { SkillsService } from '../../../../services/skills/skills.service';

@Component({
  selector: 'tcp-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.scss']
})
export class SkillDetailComponent extends BaseForm implements OnInit {

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
        skillList.filter(s => s.name.toLowerCase().includes(name.toLowerCase()))))
  }

  ngOnInit() {
    this.emitFormReady();
    this.skillService.fetch();
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
