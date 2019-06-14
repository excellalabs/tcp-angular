import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { ISkill } from '../../models/skill.interface'
import { dummySkillCategories } from '../skill-categories/skill-categories.service.fake'
import { ISkillsService } from './skills.service'

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
    name: 'Business Analysis',
    category: dummySkillCategories.find(c => c.name === 'Business'),
  },
  {
    id: 4,
    name: 'Business Development',
    category: dummySkillCategories.find(c => c.name === 'Business'),
  },
  {
    id: 5,
    name: 'Recruiting',
    category: dummySkillCategories.find(c => c.name === 'Business'),
  },
  {
    id: 6,
    name: 'Scrum Master',
    category: dummySkillCategories.find(c => c.name === 'Agile'),
  },
  {
    id: 7,
    name: 'Agile Coach',
    category: dummySkillCategories.find(c => c.name === 'Agile'),
  },
  {
    id: 8,
    name: 'Jenkins',
    category: dummySkillCategories.find(c => c.name === 'Dev Ops'),
  },
  { id: 9, name: 'AWS', category: dummySkillCategories.find(c => c.name === 'Dev Ops') },
]

@Injectable()
export class MockSkillsService implements ISkillsService {
  readonly list = new BehaviorSubject<ISkill[]>([])

  constructor() {}

  fetch(): void {
    this.list.next(dummySkills)
  }

  addSkill(skill: ISkill) {
    const newList = this.list.value
    skill.id = newList.length
    newList.push(skill)
    this.list.next(newList)
  }

  updateSkill(skill: ISkill) {
    this.deleteSkill(skill.id)
    const newList = this.list.value
    newList.push(skill)
    this.list.next(newList)
  }

  deleteSkill(id: number) {
    this.list.next(this.list.value.filter(s => s.id !== id))
  }
}
