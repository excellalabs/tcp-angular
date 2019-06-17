import { Component } from '@angular/core'
import { ICategory } from 'src/app/models/skill.interface'
import { SkillCategoriesService } from 'src/app/services/skill-categories/skill-categories.service'

@Component({
  selector: 'tcp-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss'],
})
export class ManageCategoriesComponent {
  categoryToEdit: ICategory = null

  constructor(private categoryService: SkillCategoriesService) {}

  onEditCategory(id: number) {
    this.categoryToEdit = this.categoryService.list.value.find(cat => cat.id === id)
  }

  onDeleteCategory(id: number) {
    this.categoryService.deleteCategory(id)
  }

  onAddCategory(category: ICategory) {
    this.categoryToEdit = null
    this.categoryService.addCategory(category)
  }
}
