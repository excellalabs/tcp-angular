import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { ICategory } from '../../models/skill.interface'
import { ISkillCategoryService } from './skill-categories.service'

export const dummySkillCategories: ICategory[] = [
  { id: 1, name: 'Agile' },
  { id: 2, name: 'Software' },
  { id: 3, name: 'Business' },
  { id: 4, name: 'Dev Ops' },
] as ICategory[]

@Injectable()
export class MockSkillCategoriesService implements ISkillCategoryService {
  readonly list = new BehaviorSubject<ICategory[]>([])

  constructor() {}

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
  }

  updateCategory(category: ICategory) {
    this.deleteCategory(category.id)
    const newList = this.list.value
    newList.push(category)
    this.list.next(newList)
  }

  deleteCategory(id: number) {
    this.list.next(this.list.value.filter(s => s.id !== id))
  }
}
