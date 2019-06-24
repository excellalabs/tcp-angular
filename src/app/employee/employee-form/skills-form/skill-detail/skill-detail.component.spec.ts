import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { PrimarySkillService } from 'src/app/employee/services/primary-skill/primary-skill.service'
import { MaterialModule } from 'src/app/material.module'
import { SkillCategoriesService } from 'src/app/services/skill-categories/skill-categories.service'
import { MockSkillCategoriesService } from 'src/app/services/skill-categories/skill-categories.service.fake'
import { SkillsService } from 'src/app/services/skills/skills.service'
import { MockSkillsService } from 'src/app/services/skills/skills.service.fake'

import { SkillDetailComponent } from './skill-detail.component'

fdescribe('SkillDetailComponent', () => {
  let component: SkillDetailComponent
  let primarySkillService: PrimarySkillService
  let fixture: ComponentFixture<SkillDetailComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillDetailComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        NoopAnimationsModule,
      ],
      providers: [
        PrimarySkillService,
        { provide: SkillsService, useClass: MockSkillsService },
        { provide: SkillCategoriesService, useClass: MockSkillCategoriesService },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillDetailComponent)
    primarySkillService = TestBed.get(PrimarySkillService)
    component = fixture.componentInstance
    component.index = 0
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Primary Skill Management', () => {
    it('should check primary when event is this index', async () => {
      expect(component.primary.value).toBe(false)
      primarySkillService.primarySkill$.next(0)
      fixture.detectChanges()
      await fixture.whenStable()
      expect(component.primary.value).toBe(true)
    })
    it('should uncheck primary when event is not this index', async () => {
      component.primary.setValue(true)
      fixture.detectChanges()
      await fixture.whenStable()
      primarySkillService.primarySkill$.next(1)
      fixture.detectChanges()
      await fixture.whenStable()
      expect(component.primary.value).toBe(false)
    })
    it('should set the primary index when set from F -> T', async () => {
      spyOn(primarySkillService.primarySkill$, 'next').and.callThrough()
      component.primary.setValue(true)
      fixture.detectChanges()
      await fixture.whenStable()
      expect(primarySkillService.primarySkill$.next).toHaveBeenCalledWith(component.index)
    })
    it('should not set the primary index when set from T -> F', async () => {
      spyOn(primarySkillService.primarySkill$, 'next').and.callThrough()
      component.primary.setValue(true, { emitEvent: false })
      fixture.detectChanges()
      await fixture.whenStable()
      expect(component.primary.value).toBe(true)
      component.primary.setValue(false)
      fixture.detectChanges()
      await fixture.whenStable()
      expect(component.primary.value).toBe(false)
      expect(primarySkillService.primarySkill$.next).not.toHaveBeenCalledWith(
        component.index
      )
    })
    xit('should reassert the index when the index changes and is set to primary', async () => {
      spyOn(primarySkillService.primarySkill$, 'next').and.callThrough()
      component.primary.setValue(true, { emitEvent: false })
      fixture.detectChanges()
      await fixture.whenStable()
      expect(component.primary.value).toBe(true)
      component.index = 1
      fixture.detectChanges()
      await fixture.whenStable()
      expect(component.primary.value).toBe(true)
      expect(primarySkillService.primarySkill$.next).toHaveBeenCalledWith(component.index)
    })
  })
})
