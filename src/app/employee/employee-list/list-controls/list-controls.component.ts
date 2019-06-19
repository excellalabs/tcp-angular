import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, ElementRef, Output, ViewChild } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
} from '@angular/material'
import { Observable } from 'rxjs'
import { debounceTime, map, startWith } from 'rxjs/operators'
import { ISkill, displaySkillFn } from 'src/app/models/skill.interface';
import { SkillsService } from 'src/app/services/skills/skills.service';

import { BaseForm } from '../../abstracts/base-form.class'

@Component({
  selector: 'tcp-list-controls',
  templateUrl: './list-controls.component.html',
  styleUrls: ['./list-controls.component.scss'],
})
export class ListControlsComponent extends BaseForm {
  @Output() nameFilter$: Observable<string>

  separatorKeysCodes: number[] = [ENTER, COMMA]
  skillFilterControl = new FormControl()
  filteredSkills$: Observable<ISkill[]>
  skills: ISkill[] = []
  allSkills: ISkill[]
  displayFn = displaySkillFn

  @ViewChild('fruitInput', { static: false }) fruitInput: ElementRef<HTMLInputElement>
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete

  constructor(private fb: FormBuilder, private skillService: SkillsService) {
    super()
    this.formGroup = this.buildForm()
    this.skillService.fetch() // should be in a route resolver
    this.allSkills = this.skillService.list.value
    this.nameFilter$ = this.nameFilter.valueChanges.pipe(debounceTime(1))

    this.filteredSkills$ = this.skillFilterControl.valueChanges.pipe(
      startWith(null),
      map((skill: string | ISkill | null) =>
        skill ? this._filter(skill) : this.allSkills.slice()
      )
    )
  }

  buildForm(): FormGroup {
    return this.fb.group({
      nameFilter: [''],
    })
  }

  add(event: MatChipInputEvent): void {
    // Add skill only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input
      const skillName = event.value
      const skill = skillName ? this.findSkillByName(skillName) : null

      // Add our skill
      if (skill) {
        this.skills.push(skill)
      }

      // Reset the input value
      if (input) {
        input.value = ''
      }

      this.skillFilterControl.setValue(null)
    }
  }

  remove(skill: ISkill): void {
    const index = this.skills.indexOf(skill)

    if (index >= 0) {
      this.skills.splice(index, 1)
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const skillName = event.option.viewValue.split('(')[0].trim()
    const skill = skillName ? this.findSkillByName(skillName) : null
    if (skill) {
      this.skills.push(skill)
    }
    this.fruitInput.nativeElement.value = null
    this.skillFilterControl.setValue(null)
  }

  private _filter(value: string | ISkill): ISkill[] {
    let filterValue: string
    if (value instanceof String) {
      filterValue = value.toLowerCase()
    }
    if (value instanceof Object) {
      filterValue = value.name.toLowerCase()
    }

    return this.allSkills.filter(s => s.name.toLowerCase().indexOf(filterValue) === 0)
  }

  private findSkillByName(name: string): ISkill {
    return this.allSkills.find(s => s.name.toLowerCase().indexOf(name.trim().toLowerCase()) === 0)
  }

  get nameFilter(): AbstractControl {
    return this.formGroup.get('nameFilter')
  }
}
