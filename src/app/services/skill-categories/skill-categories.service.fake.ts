import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'

import { ICategory } from '../../models/skill.interface'
import { IBaseCrudService } from '../abstract/base-crud.service'

export const dummySkillCategories: ICategory[] = [
  { id: 1, name: 'Agile' },
  { id: 2, name: 'Software' },
  { id: 3, name: 'Business' },
  { id: 4, name: 'Dev Ops' },
] as ICategory[]

@Injectable()
export class MockSkillCategoriesService implements IBaseCrudService<ICategory> {
  readonly list = new BehaviorSubject<ICategory[]>([])

  endpoint = '/category'

  constructor() {}

  fetch(): Observable<ICategory[]> {
    if (this.list.value.length === 0) {
      this.list.next(dummySkillCategories)
    }
    return this.list.asObservable()
  }

  getById(id: number): Observable<ICategory> {
    return of(this.list.value.find(c => c.id === id))
  }

  create(category: ICategory): Observable<ICategory> {
    const newList = this.list.value
    category.id = newList.length
    newList.push(category)
    this.list.next(newList)
    return of(category)
  }

  update(category: ICategory): Observable<ICategory> {
    this.delete(category.id)
    const newList = this.list.value
    newList.push(category)
    this.list.next(newList)
    return of(category)
  }

  delete(id: number): Observable<ICategory> {
    this.list.next(this.list.value.filter(s => s.id !== id))
    return of(null)
  }
}
