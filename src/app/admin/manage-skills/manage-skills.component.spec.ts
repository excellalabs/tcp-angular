import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '../../material.module'
import { SnackBarService } from '../../messaging/services/snack-bar/snack-bar.service'
import { MockSnackBarService } from '../../messaging/services/snack-bar/snack-bar.service.fake'
import { ISkill } from '../../models/skill.interface'
import { PipeModule } from '../../pipes/pipe.module'
import { SkillCategoriesService } from '../../services/skill-categories/skill-categories.service'
import { MockSkillCategoriesService } from '../../services/skill-categories/skill-categories.service.fake'
import { SkillsService } from '../../services/skills/skills.service'
import { MockSkillsService } from '../../services/skills/skills.service.fake'
import { ManageSkillsComponent } from './manage-skills.component'
import { SkillFormComponent } from './skill-form/skill-form.component'
import { SkillListComponent } from './skill-list/skill-list.component'

describe('ManageSkillsComponent', () => {
  let component: ManageSkillsComponent
  let fixture: ComponentFixture<ManageSkillsComponent>
  let skillService: SkillsService
  let snackBarService: SnackBarService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageSkillsComponent, SkillFormComponent, SkillListComponent],
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
        { provide: SnackBarService, useClass: MockSnackBarService },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSkillsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    skillService = TestBed.get(SkillsService)
    snackBarService = TestBed.get(SnackBarService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('onEditSkill()', () => {
    it('should set the skillToEdit', () => {
      component.onEditSkill(skillService.list.value[0].id)
      expect(component.skillToEdit).toEqual(skillService.list.value[0])
    })
  })

  describe('onDeleteSkill()', () => {
    it('should call skillService.delete()', () => {
      spyOn(skillService, 'delete').and.callThrough()
      component.onDeleteSkill(0)
      expect(skillService.delete).toHaveBeenCalledWith(0)
    })
    it('should use an observer', () => {
      spyOn(snackBarService, 'observerFor').and.callThrough()
      component.onDeleteSkill(0)
      expect(snackBarService.observerFor).toHaveBeenCalledWith('Delete Skill')
    })
  })

  describe('onAddSkill()', () => {
    it('should clear the skillToEdit', () => {
      component.skillToEdit = skillService.list.value[0]
      component.onAddSkill({} as ISkill)
      expect(component.skillToEdit).toBeNull()
    })
    it('should call skillService.update() when the skill has an id already', () => {
      spyOn(skillService, 'update').and.callThrough()
      const updatedSkill = skillService.list.value[0]
      component.onAddSkill(updatedSkill)
      expect(skillService.update).toHaveBeenCalledWith(updatedSkill)
    })
    it("should use an observer with 'Update Skill' when the skill has an id already", () => {
      spyOn(snackBarService, 'observerFor').and.callThrough()
      const updatedSkill = skillService.list.value[0]
      component.onAddSkill(updatedSkill)
      expect(snackBarService.observerFor).toHaveBeenCalledWith('Update Skill')
    })
    it('should call skillService.create() when skill.id is null', () => {
      spyOn(skillService, 'create').and.callThrough()
      const newSkill = { ...skillService.list.value[0], id: null }
      component.onAddSkill(newSkill)
      expect(skillService.create).toHaveBeenCalledWith(newSkill)
    })
    it("should use an observer with 'Create Skill' when skill.id is null", () => {
      spyOn(snackBarService, 'observerFor').and.callThrough()
      const newSkill = { ...skillService.list.value[0], id: null }
      component.onAddSkill(newSkill)
      expect(snackBarService.observerFor).toHaveBeenCalledWith('Create Skill')
    })
  })
})
