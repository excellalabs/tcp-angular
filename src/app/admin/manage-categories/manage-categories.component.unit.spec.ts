import { MatDialog } from '@angular/material';
import { ICategory } from 'src/app/models/skill.interface'
import { SkillCategoriesService } from 'src/app/services/skill-categories/skill-categories.service'
import {
  MockSkillCategoriesService,
  dummySkillCategories,
} from 'src/app/services/skill-categories/skill-categories.service.fake'
import { SkillsService } from 'src/app/services/skills/skills.service';
import { MockSkillsService } from 'src/app/services/skills/skills.service.fake';

import { ManageCategoriesComponent } from './manage-categories.component'

describe('ManageCategories (Unit)', () => {
  let categoryService: MockSkillCategoriesService
  let component: ManageCategoriesComponent

  beforeEach(() => {
    categoryService = new MockSkillCategoriesService()
    categoryService.fetch()
    component = new ManageCategoriesComponent(
      categoryService as SkillCategoriesService,
      new MockSkillsService() as SkillsService,
      new MatDialog(null, null, null, null, null, null, null)
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
    xit('should call SkillCategoriesService.deleteCategory()', () => {
      spyOn(categoryService, 'deleteCategory').and.callThrough()
      component.onDeleteCategory(1)
      expect(categoryService.deleteCategory).toHaveBeenCalledWith(1)
    })
  })

  describe('#onAddCategory()', () => {
    let newCategory: ICategory
    beforeEach(() => {
      newCategory = {
        id: null,
        name: 'New Category',
      }
    })
    it('should call SkillCategoriesService.addCategory()', () => {
      spyOn(categoryService, 'addCategory').and.callThrough()
      component.onAddCategory(newCategory)
      expect(categoryService.addCategory).toHaveBeenCalledWith(newCategory)
    })
    it('should null categoryToEdit to the form resets', () => {
      component.categoryToEdit = newCategory
      component.onAddCategory(newCategory)
      expect(component.categoryToEdit).toBeNull()
    })
  })
})
