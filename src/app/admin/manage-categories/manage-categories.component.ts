import { Component } from '@angular/core'
import { MatDialog } from '@angular/material'
import { ICategory } from 'src/app/models/skill.interface'

import { SkillCategoriesService } from '../../services/skill-categories/skill-categories.service'
import { SkillsService } from '../../services/skills/skills.service'
import { ConfirmCategoryDeleteComponent } from './confirm-category-delete/confirm-category-delete.component'

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
    private dialog: MatDialog
  ) {}

  onEditCategory(id: number) {
    this.categoryToEdit = this.categoryService.list.value.find(cat => cat.id === id)
  }

  onDeleteCategory(id: number) {
    const hasSkills: boolean =
      this.skillService.list.value.filter(s => s.id === id).length > 0
    if (hasSkills) {
      const dialogRef = this.dialog.open(ConfirmCategoryDeleteComponent)
      dialogRef.afterClosed().subscribe((okToDelete: boolean) => {
        // auto closes
        if (okToDelete) {
          this.deleteHelper(id)
        }
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
