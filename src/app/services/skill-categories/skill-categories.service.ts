import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { ICategory } from '../../models/skill.interface'
import { dummySkillCategories } from './skill-categories.service.fake'
import { MatSnackBar } from '@angular/material'

export interface ISkillCategoryService {
  readonly list: BehaviorSubject<ICategory[]>
  fetch(): void
  addCategory(category: ICategory): void
  updateCategory(category: ICategory): void
  deleteCategory(id: number): void
}

@Injectable()
export class SkillCategoriesService implements ISkillCategoryService {
  readonly list = new BehaviorSubject<ICategory[]>([])

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  fetch(): void {
    if (this.list.value.length === 0) {
      this.list.next(dummySkillCategories)
    }
  }

  addCategory(category: ICategory) {
    const newList = this.list.value
    category.id = newList.length
    newList.push(category)
    this.list.next(newList)
    this.openSnackBar('Category Added')
  }

  updateCategory(category: ICategory) {
    this.deleteCategory(category.id)
    const newList = this.list.value
    newList.push(category)
    this.list.next(newList)
    this.openSnackBar('Category Updated')
  }

  deleteCategory(id: number) {
    this.list.next(this.list.value.filter(s => s.id !== id))
    this.openSnackBar('Category Deleted')
  }

  openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }
}
