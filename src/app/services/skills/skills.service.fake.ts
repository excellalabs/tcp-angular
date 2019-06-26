import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

import { ISkill } from '../../models/skill.interface'
import { IBaseCrudService } from '../abstract/base-crud.service'
import { dummySkillCategories } from '../skill-categories/skill-categories.service.fake'

export const dummySkills: ISkill[] = [
  {
    id: 1,
    name: 'Java',
    category: dummySkillCategories.find(c => c.name === 'Software'),
  },
  {
    id: 2,
    name: 'JavaScript',
    category: dummySkillCategories.find(c => c.name === 'Software'),
  },
  {
    id: 3,
    name: 'Python',
    category: dummySkillCategories.find(c => c.name === 'Software'),
  },
  {
    id: 4,
    name: 'Ruby',
    category: dummySkillCategories.find(c => c.name === 'Software'),
  },
  {
    id: 5,
    name: 'SQL Databases',
    category: dummySkillCategories.find(c => c.name === 'Software'),
  },
  {
    id: 6,
    name: 'NoSQL Databases',
    category: dummySkillCategories.find(c => c.name === 'Software'),
  },
  {
    id: 10,
    name: 'Business Analysis',
    category: dummySkillCategories.find(c => c.name === 'Business'),
  },
  {
    id: 11,
    name: 'Business Development',
    category: dummySkillCategories.find(c => c.name === 'Business'),
  },
  {
    id: 12,
    name: 'Recruiting',
    category: dummySkillCategories.find(c => c.name === 'Business'),
  },
  {
    id: 13,
    name: 'Project Management',
    category: dummySkillCategories.find(c => c.name === 'Business'),
  },
  {
    id: 20,
    name: 'Scrum Master',
    category: dummySkillCategories.find(c => c.name === 'Agile'),
  },
  {
    id: 21,
    name: 'Product Owner',
    category: dummySkillCategories.find(c => c.name === 'Agile'),
  },
  {
    id: 22,
    name: 'Agile Coach',
    category: dummySkillCategories.find(c => c.name === 'Agile'),
  },
  {
    id: 30,
    name: 'Jenkins',
    category: dummySkillCategories.find(c => c.name === 'Dev Ops'),
  },
  {
    id: 31,
    name: 'AWS / ECS',
    category: dummySkillCategories.find(c => c.name === 'Dev Ops'),
  },
]

@Injectable()
export class MockSkillsService implements IBaseCrudService<ISkill> {
  readonly list = new BehaviorSubject<ISkill[]>([])

  endpoint = '/skills'

  constructor() {}

  getById(id: number): Observable<ISkill> {
    return this.list.pipe(map(skills => skills.find(s => s.id === id)))
  }

  fetch(): Observable<ISkill[]> {
    this.list.next(dummySkills)
    return this.list.asObservable()
  }

  create(skill: ISkill): Observable<ISkill> {
    const newList = this.list.value
    skill.id = newList.length
    newList.push(skill)
    this.list.next(newList)
    return of(skill)
  }

  update(skill: ISkill): Observable<ISkill> {
    this.delete(skill.id)
    const newList = this.list.value
    newList.push(skill)
    this.list.next(newList)
    return of(skill)
  }

  delete(id: number): Observable<ISkill> {
    this.list.next(this.list.value.filter(s => s.id !== id))
    return of(null)
  }
}
