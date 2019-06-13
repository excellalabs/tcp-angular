import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { ICategory } from '../../models/skill.interface'

export const dummySkillCategories: ICategory[] = [
  { id: 1, name: 'Agile' },
  { id: 2, name: 'Software' },
  { id: 3, name: 'Business' },
  { id: 4, name: 'Dev Ops' },
] as ICategory[]

@Injectable({
  providedIn: 'root',
})
export class SkillCategoriesService {
  readonly list = new BehaviorSubject<ICategory[]>([])

  constructor() {}

  fetch(): void {
    if ( this.list.value.length === 0) {
      this.list.next(dummySkillCategories)
    }
  }
}
