import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '../../../material.module'
import { PipeModule } from '../../../pipes/pipe.module'
import { SkillCategoriesService } from '../../../services/skill-categories/skill-categories.service'
import { MockSkillCategoriesService } from '../../../services/skill-categories/skill-categories.service.fake'
import { SkillsService } from '../../../services/skills/skills.service'
import { MockSkillsService, dummySkills } from '../../../services/skills/skills.service.fake'
import { SkillFormComponent } from './skill-form.component'

describe('SkillFormComponent', () => {
  let component: SkillFormComponent
  let fixture: ComponentFixture<SkillFormComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SkillFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        NoopAnimationsModule,
        PipeModule,
      ],
      providers: [
        { provide: SkillsService, useClass: MockSkillsService },
        { provide: SkillCategoriesService, useClass: MockSkillCategoriesService },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(SkillFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('ngOnChanges', () => {
    beforeEach(() => {
      spyOn(component.formGroup, 'patchValue').and.callThrough()
      spyOn(component.formGroup, 'reset').and.callThrough()
    })
    it('should do nothing on initial load', () => {
      expect(component.formGroup.patchValue).not.toHaveBeenCalled()
      expect(component.formGroup.reset).not.toHaveBeenCalled()
    })
    it('should populate the formGroup with the new skill', () => {
      component.skill = dummySkills[0]
      const changes = {skill: {previousValue: null, currentValue: dummySkills[0], firstChange: false} as SimpleChange}
      component.ngOnChanges(changes)

      expect(component.formGroup.patchValue).toHaveBeenCalled()
      expect(component.formGroup.get('name').value).toEqual(dummySkills[0].name)
      expect(component.formGroup.get('category').value.id).toBe(dummySkills[0].category.id)
    })
    it('should reset the formGroup when the new skill is null', () => {
      component.skill = dummySkills[0]
      let changes = {skill: {previousValue: null, currentValue: dummySkills[0], firstChange: false} as SimpleChange}
      component.ngOnChanges(changes)
      expect(component.formGroup.patchValue).toHaveBeenCalled()

      component.skill = null
      changes = {skill: {previousValue: dummySkills[0], currentValue: null, firstChange: false} as SimpleChange}
      component.ngOnChanges(changes)
      expect(component.formGroup.reset).toHaveBeenCalled()
      expect(component.formGroup.get('name').value).toBeNull()
    })
    it('should do nothing if there is not a change in the skill', () => {
      component.skill = dummySkills[0]
      const changes = {skill: {previousValue: dummySkills[0], currentValue: dummySkills[0], firstChange: false} as SimpleChange}
      component.ngOnChanges(changes)

      expect(component.formGroup.patchValue).not.toHaveBeenCalled()
      expect(component.formGroup.reset).not.toHaveBeenCalled()
    })
  })

  describe('onSubmit()', () => {
    it('should emit the new skill', done => {
      component.skill = null
      component.addSkill.subscribe(skill => {
        expect(skill).toEqual({ name: dummySkills[0].name, category: dummySkills[0].category})
        done()
      })
      component.formGroup.patchValue(dummySkills[0])
      component.onSubmit()
    })
    it('should emit the updated skill', done => {
      component.skill = dummySkills[0]
      component.addSkill.subscribe(skill => {
        expect(skill).toEqual({ ...dummySkills[0], name: 'new name'})
        done()
      })
      component.formGroup.patchValue(dummySkills[0])
      component.formGroup.get('name').setValue('new name')
      component.onSubmit()
    })
  })
})
