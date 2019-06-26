import { DialogService } from '../../messaging/services/dialog/dialog.service'
import { MockDialogService } from '../../messaging/services/dialog/dialog.service.fake'
import { SnackBarService } from '../../messaging/services/snack-bar/snack-bar.service';
import { MockSnackBarService } from '../../messaging/services/snack-bar/snack-bar.service.fake';
import { ICategory } from '../../models/skill.interface'
import { SkillCategoriesService } from '../../services/skill-categories/skill-categories.service'
import {
  MockSkillCategoriesService,
  dummySkillCategories,
} from '../../services/skill-categories/skill-categories.service.fake'
import { SkillsService } from '../../services/skills/skills.service'
import { MockSkillsService } from '../../services/skills/skills.service.fake'
import { ManageCategoriesComponent } from './manage-categories.component'

describe('ManageCategories (Unit)', () => {
  let categoryService: MockSkillCategoriesService
  let skillService: MockSkillsService
  let dialogService: MockDialogService
  let snackBarService: MockSnackBarService
  let component: ManageCategoriesComponent

  beforeEach(() => {
    categoryService = new MockSkillCategoriesService()
    categoryService.fetch()
    skillService = new MockSkillsService()
    skillService.fetch()
    dialogService = new MockDialogService()
    snackBarService = new MockSnackBarService()
    component = new ManageCategoriesComponent(
      categoryService as SkillCategoriesService,
      skillService as SkillsService,
      dialogService as DialogService,
      snackBarService as SnackBarService
    )
  })

  describe('#onEditCategory()', () => {
    it('should set categoryToEdit to the hydrated category', () => {
      expect(component.categoryToEdit).toBeNull()
      component.onEditCategory(1)
      expect(component.categoryToEdit).toEqual(dummySkillCategories.find(c => c.id === 1))
    })
  })

  describe('#onDeleteCategory()', () => {
    // Needs to be re-worked now that dialog box is there.
    it('should require confirmation when Category has Skills', () => {
      spyOn(dialogService, 'confirm').and.callThrough()
      component.onDeleteCategory(1)
      expect(dialogService.confirm).toHaveBeenCalled()
    })
    xit('should call SkillCategoriesService.delete()', () => {
      spyOn(categoryService, 'delete').and.callThrough()
      component.onDeleteCategory(1)
      expect(categoryService.delete).toHaveBeenCalledWith(1)
    })
  })

  describe('#onSubmitCategory()', () => {
    let newCategory: ICategory
    beforeEach(() => {
      newCategory = {
        id: null,
        name: 'New Category',
      }
    })
    it('should call SkillCategoriesService.addCategory()', () => {
      spyOn(categoryService, 'create').and.callThrough()
      component.onSubmitCategory(newCategory)
      expect(categoryService.create).toHaveBeenCalledWith(newCategory)
    })
    it('should null categoryToEdit to the form resets', () => {
      component.categoryToEdit = newCategory
      component.onSubmitCategory(newCategory)
      expect(component.categoryToEdit).toBeNull()
    })
  })
})
