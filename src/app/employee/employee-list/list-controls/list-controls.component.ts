import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms'
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs'
import { debounceTime, map, startWith } from 'rxjs/operators'
import { ISkill } from 'src/app/models/skill.interface';
import { SkillsService } from 'src/app/services/skills/skills.service';

import { BaseForm } from '../../abstracts/base-form.class'

@Component({
  selector: 'tcp-list-controls',
  templateUrl: './list-controls.component.html',
  styleUrls: ['./list-controls.component.scss'],
})
export class ListControlsComponent extends BaseForm {

  @Output() nameFilter$: Observable<string>
  @Output() skillFilters$: Observable<ISkill[]>

  separatorKeyCodes: number[] = [ENTER, COMMA]
  filteredSkills$: Observable<ISkill[]>
  skills: string[] = []
  allSkills: string[]

  @ViewChild('skillInput', {static: false}) skillInput: ElementRef<HTMLInputElement>
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete

  constructor(private fb: FormBuilder, private skillService: SkillsService) {
    super()
    this.allSkills = this.skillService.list.value.map(s => this.displayFn(s))
    this.formGroup = this.buildForm()
    this.nameFilter$ = this.nameFilter.valueChanges.pipe(debounceTime(1))
    this.filteredSkills$ = this.skillControl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice())
    )
  }

  buildForm(): FormGroup {
    return this.fb.group({
      nameFilter: [''],
      skill: [''],
    })
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input
      const value = event.value

      if ((value || '').trim()) {
        this.skills.push(value.trim())
      }

      if (input) {
        input.value = ''
      }

      this.skillControl.setValue(null)
    }
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill)

    if (index >= 0) {
      this.skills.splice(index, 1)
    }
  }

  displayFn(skill: ISkill): string {
    return skill ? `${skill.name} (${skill.category.name})` : undefined
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue)
    this.skillInput.nativeElement.value = ''
    this.skillControl.setValue(null)
  }

  private _filter(skillName: string): ISkill[] {
    const filterValue = skillName ? skillName.toLowerCase() : ''
    return this.skillService.list.value.filter(s => s.name.toLowerCase().indexOf(filterValue) === 0)
  }

  get nameFilter(): AbstractControl {
    return this.formGroup.get('nameFilter')
  }

  get skillControl(): AbstractControl {
    return this.formGroup.get('skill')
  }
}
