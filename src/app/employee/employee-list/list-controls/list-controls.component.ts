import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms'
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
} from '@angular/material'
import { Observable } from 'rxjs'
import { debounceTime, map, startWith } from 'rxjs/operators'
import { ISkill } from 'src/app/models/skill.interface'
import { SkillsService } from 'src/app/services/skills/skills.service'

import { BaseForm } from '../../abstracts/base-form.class'

@Component({
  selector: 'tcp-list-controls',
  templateUrl: './list-controls.component.html',
  styleUrls: ['./list-controls.component.scss'],
})
export class ListControlsComponent extends BaseForm {
  @Output() nameFilter$: Observable<string>

  constructor(private fb: FormBuilder) {
    super()
    this.formGroup = this.buildForm()
    this.nameFilter$ = this.nameFilter.valueChanges.pipe(debounceTime(1))
  }

  buildForm(): FormGroup {
    return this.fb.group({
      nameFilter: [''],
    })
  }

  get nameFilter(): AbstractControl {
    return this.formGroup.get('nameFilter')
  }
}
