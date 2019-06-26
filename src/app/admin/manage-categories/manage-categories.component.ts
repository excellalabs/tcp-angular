import { Component } from '@angular/core'

import { DialogService } from '../../messaging/services/dialog/dialog.service'
import { SnackBarService } from '../../messaging/services/snack-bar/snack-bar.service'
import { ICategory } from '../../models/skill.interface'
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
    private dialogService: DialogService,
    private snackBarService: SnackBarService
  ) {}

  onEditCategory(id: number) {
    this.categoryToEdit = this.categoryService.list.value.find(cat => cat.id === id)
  }

  onDeleteCategory(id: number) {
    const hasSkills: boolean =
      this.skillService.list.value.filter(s => s.id === id).length > 0
    if (hasSkills) {
      this.dialogService.confirm({
        title: 'Confirm Deletion',
        message: 'Deleting a Category with Skills will also delete those Skills.',
        accept: () => {
          this.deleteHelper(id)
        },
        cancel: () => null,
      })
    }
  }

  private deleteHelper(id: number) {
    this.categoryService
      .delete(id)
      .subscribe(this.snackBarService.observerFor<ICategory>('Delete Category'))
  }

  onSubmitCategory(category: ICategory) {
    this.categoryToEdit = null
    if (category.id) {
      this.categoryService
        .update(category)
        .subscribe(this.snackBarService.observerFor<ICategory>('Create Category'))
    } else {
      this.categoryService
        .create(category)
        .subscribe(this.snackBarService.observerFor<ICategory>('Update Category'))
    }
  }
}
