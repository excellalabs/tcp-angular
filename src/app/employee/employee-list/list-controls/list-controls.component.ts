import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, ElementRef, Output, ViewChild } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms'
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
} from '@angular/material'
import { BehaviorSubject, Observable, combineLatest } from 'rxjs'
import { debounceTime, map, startWith } from 'rxjs/operators'

import { BaseForm } from '../../../abstracts/base-form.class'
import { ISkill, displaySkillFn } from '../../../models/skill.interface'
import { SkillsService } from '../../../services/skills/skills.service'

@Component({
  selector: 'tcp-list-controls',
  templateUrl: './list-controls.component.html',
  styleUrls: ['./list-controls.component.scss'],
})
export class ListControlsComponent extends BaseForm {
  @Output() nameFilter$: Observable<string>
  @Output() skillFilters$ = new BehaviorSubject<ISkill[]>([])

  separatorKeysCodes: number[] = [ENTER, COMMA]
  filteredSkills$: Observable<ISkill[]>
  allSkills: ISkill[]
  displayFn = displaySkillFn

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>
  @ViewChild('auto') matAutocomplete: MatAutocomplete

  constructor(private fb: FormBuilder, private skillService: SkillsService) {
    super()
    this.formGroup = this.buildForm()

    this.allSkills = this.skillService.list.value
    this.nameFilter$ = this.nameFilter.valueChanges.pipe(debounceTime(1))

    const possibleChoices$ = this.skillFilterInput.valueChanges.pipe(
      startWith(null),
      map((skill: string | ISkill | null) =>
        skill ? this._filter(skill) : this.allSkills.slice()
      )
    )
    this.filteredSkills$ = combineLatest([possibleChoices$, this.skillFilters$]).pipe(
      map(([possibleChoices, alreadyChosen]) =>
        possibleChoices.filter(match => !alreadyChosen.includes(match))
      )
    )
  }

  buildForm(): FormGroup {
    return this.fb.group({
      nameFilter: [''],
      skillFilter: [''],
    })
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete || !this.matAutocomplete.isOpen) {
      const input = event.input
      const skillName = event.value
      const skill = skillName ? this.findSkillByName(skillName) : null

      // Add our skill
      if (skill) {
        this.addSkillFilter(skill)
      }

      // Reset the input value
      if (input) {
        input.value = ''
      }
      this.skillFilterInput.setValue(null)
    }
  }

  remove(skill: ISkill): void {
    const list = [...this.skillFilters$.value]
    const index = this.skillFilters$.value.indexOf(skill)

    if (index >= 0) {
      list.splice(index, 1)
      this.skillFilters$.next(list)
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const skillName = event.option.viewValue.split('(')[0].trim()
    const skill = skillName ? this.findSkillByName(skillName) : null
    if (skill) {
      this.addSkillFilter(skill)
    }
    if (this.skillInput) {
      this.skillInput.nativeElement.value = null
    }
    this.skillFilterInput.setValue(null)
  }

  private _filter(value: string | ISkill): ISkill[] {
    let filterValue: string
    if (typeof value === 'string') {
      filterValue = value.toLowerCase()
    }
    if (typeof value === 'object') {
      filterValue = value.name.toLowerCase()
    }
    return this.allSkills.filter(s => s.name.toLowerCase().indexOf(filterValue) === 0)
  }

  private findSkillByName(name: string): ISkill {
    return this.allSkills.find(
      s => s.name.toLowerCase().indexOf(name.trim().toLowerCase()) === 0
    )
  }

  private addSkillFilter(skill: ISkill) {
    const list = this.skillFilters$.value
    list.push(skill)
    this.skillFilters$.next(list)
  }

  get nameFilter(): AbstractControl {
    return this.formGroup.get('nameFilter')
  }

  get skillFilterInput(): AbstractControl {
    return this.formGroup.get('skillFilter')
  }
}
