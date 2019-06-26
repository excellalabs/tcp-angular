import { ElementRef } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import {
  MatAutocomplete,
  MatAutocompleteDefaultOptions,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatOption,
} from '@angular/material'

import { ISkill, displaySkillFn } from '../../../models/skill.interface'
import { SkillsService } from '../../../services/skills/skills.service'
import {
  MockSkillsService,
  dummySkills,
} from '../../../services/skills/skills.service.fake'
import { ListControlsComponent } from './list-controls.component'

describe('ListControlsComponent (Unit)', () => {
  let skillService: MockSkillsService
  let component: ListControlsComponent

  beforeEach(() => {
    skillService = new MockSkillsService()
    skillService.fetch()
    component = new ListControlsComponent(
      new FormBuilder(),
      skillService as SkillsService
    )
  })

  describe('#constructor()', () => {
    it('should create', () => {
      expect(component).toBeTruthy()
    })
    it('should build the formGroup', () => {
      expect(component.formGroup).toBeTruthy()
    })
  })

  describe('#buildForm()', () => {
    let formGroup: FormGroup
    beforeEach(() => {
      formGroup = component.buildForm()
    })
    it('should have a nameFilter control', () => {
      expect(formGroup.contains('nameFilter')).toBe(true)
    })
    it('should have a skillFilter control', () => {
      expect(formGroup.contains('skillFilter')).toBe(true)
    })
  })

  describe('#add()', () => {
    it('should add the skill to the skillFilters$ list', () => {
      expect(component.skillFilters$.value).toEqual([])
      component.add({ input: null, value: dummySkills[0].name } as MatChipInputEvent)
      expect(component.skillFilters$.value).toContain(dummySkills[0])
    })
    it('should not add the skill if it cannot be found', () => {
      expect(component.skillFilters$.value).toEqual([])
      component.add({ input: null, value: 'asdf' } as MatChipInputEvent)
      expect(component.skillFilters$.value).toEqual([])
    })
    it('should reset the skillInput FormControl', () => {
      component.skillFilterInput.setValue('Java')
      expect(component.skillFilterInput.value).toEqual('Java')
      component.add({ input: null, value: dummySkills[0].name } as MatChipInputEvent)
      expect(component.skillFilterInput.value).toBeNull()
    })
  })

  describe('#remove()', () => {
    beforeEach(() => {
      component.skillFilters$.next(dummySkills)
    })
    it('should remove the designated skill from the skillFilters$ list', () => {
      component.remove(dummySkills[0])
      expect(component.skillFilters$.value).not.toContain(dummySkills[0])
    })
    it('should not do anything if the skill cannot be found in the list', () => {
      component.remove({ ...dummySkills[0], id: 12 }) // wrong ID
      expect(component.skillFilters$.value).toContain(dummySkills[0])
    })
  })

  describe('#selected()', () => {
    let event: MatAutocompleteSelectedEvent

    function makeSelectedEvent(skill: ISkill) {
      const autoComplete = new MatAutocomplete(
        null,
        null,
        {} as MatAutocompleteDefaultOptions
      )
      const option = new MatOption(
        new ElementRef<HTMLElement>({
          textContent: skill ? displaySkillFn(skill) : '',
        } as HTMLElement),
        null,
        autoComplete,
        null
      )
      return new MatAutocompleteSelectedEvent(autoComplete, option)
    }

    it('should add the selected skill to skillFilters$', done => {
      event = makeSelectedEvent(dummySkills[0])
      component.skillFilters$.subscribe(skills => {
        if (skills.length > 0) {
          expect(skills).toContain(dummySkills[0])
          done()
        }
      })
      component.selected(event)
    })
    it('should not add anything if the skill does not exist', () => {
      event = makeSelectedEvent(null)
      component.selected(event)
      expect(component.skillFilters$.value.length).toBe(0)
    })

    it('should reset the skillFilterInput', () => {
      component.skillFilterInput.setValue('Java')
      expect(component.skillFilterInput.value).toBe('Java')
      component.selected(makeSelectedEvent(dummySkills[0]))
      expect(component.skillFilterInput.value).toBeNull()
    })
  })

  describe('filteredSkills$', () => {
    it('should show all skills by default', done => {
      component.filteredSkills$.subscribe(options => {
        expect(skillService.list.value.every(s => options.includes(s))).toBe(true)
        done()
      })
    })
    it('should filter to matches when the skillFilterInput input value changes', done => {
      const skillName = 'java'
      component.filteredSkills$.subscribe(options => {
        if (options.length < skillService.list.value.length) {
          expect(options.every(o => o.name.toLowerCase().startsWith(skillName))).toBe(
            true
          )
          done()
        }
      })
      component.skillFilterInput.setValue(skillName)
    })
    it('should filter to chosen skill when the skillFilterInput is set to an ISkill', done => {
      const skillOption = dummySkills[1]
      component.filteredSkills$.subscribe(options => {
        if (options.length < skillService.list.value.length) {
          expect(options.length).toBe(1)
          expect(options).toContain(skillOption)
          done()
        }
      })
      component.skillFilterInput.setValue(skillOption)
    })
  })

  describe('getters', () => {
    it('should have a getter for nameFilter', () => {
      expect(component.nameFilter).toBe(component.formGroup.get('nameFilter'))
    })
    it('should have a getter for skillFilterInput', () => {
      expect(component.skillFilterInput).toBe(component.formGroup.get('skillFilter'))
    })
  })
})
