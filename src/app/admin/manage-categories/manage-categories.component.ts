import { Component } from '@angular/core'
import { MatDialog } from '@angular/material'
import { DialogService } from 'src/app/messaging/services/dialog/dialog.service'
import { ICategory } from 'src/app/models/skill.interface'

import { SkillCategoriesService } from '../../services/skill-categories/skill-categories.service'
import { SkillsService } from '../../services/skills/skills.service'

@Component({
  selector: 'tcp-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss'],
})
export class ManageCategoriesComponent {
  categoryToEdit: ICategory = null

  constructor(
    private categoryService: SkillCategoriesService,
    private skillService: SkillsService,
    private dialogService: DialogService
  ) {}

  onEditCategory(id: number) {
    this.categoryToEdit = this.categoryService.list.value.find(cat => cat.id === id)
  }

  onDeleteCategory(id: number) {
    const hasSkills: boolean =
      this.skillService.list.value.filter(s => s.id === id).length > 0
    if (hasSkills) {
      this.dialogService.confirm({
        title: 'Confirm Category Delete',
        message: '',
        accept: () => {
          this.deleteHelper(id)
        },
        cancel: () => null,
      })
    }
  }

  private deleteHelper(id: number) {
    this.categoryService.deleteCategory(id) // rely on the API to cascade delete
  }

  onAddCategory(category: ICategory) {
    this.categoryToEdit = null
    this.categoryService.addCategory(category)
  }
}
