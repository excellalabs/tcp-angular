import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'

import { ETHNICITY, GENDER, IEmployee } from '../../models/employee.interface'
import { PROFICIENCY } from '../../models/skill.interface'
import { IBaseCrudService } from '../abstract/base-crud.service'
import { dummySkills } from '../skills/skills.service.fake'
import { IEmployeesService } from './employees.service'

export const dummyEmployees: IEmployee[] = [
  {
    id: 1,
    bio: {
      firstName: 'John',
      middleInitial: 'T',
      lastName: 'Winchester',
      birthDate: new Date(),
      gender: GENDER.MALE,
      ethnicity: ETHNICITY.CAUCASIAN,
      usCitizen: true,
    },
    contact: {
      email: 'jon.doe@gmail.com',
      phoneNumber: '(123)456-7890',
      address: {
        line1: '2300 Wilson Blvd',
        line2: null,
        city: 'Arlington',
        stateCode: 'VA',
        zipCode: '22201',
      },
    },
    skills: [
      {
        id: 1,
        skill: dummySkills.find(s => s.name === 'JavaScript'),
        proficiency: PROFICIENCY.HIGH,
        primary: true,
      },
      {
        id: 2,
        skill: dummySkills.find(s => s.name === 'Java'),
        proficiency: PROFICIENCY.MID,
        primary: false,
      },
      {
        id: 3,
        skill: dummySkills.find(s => s.name === 'Jenkins'),
        proficiency: PROFICIENCY.MID,
        primary: false,
      },
      {
        id: 4,
        skill: dummySkills.find(s => s.name === 'Scrum Master'),
        proficiency: PROFICIENCY.LOW,
        primary: false,
      },
      {
        id: 5,
        skill: dummySkills.find(s => s.name === 'Python'),
        proficiency: PROFICIENCY.LOW,
        primary: false,
      },
      {
        id: 6,
        skill: dummySkills.find(s => s.name === 'Business Analysis'),
        proficiency: PROFICIENCY.MID,
        primary: false,
      },
      {
        id: 7,
        skill: dummySkills.find(s => s.name === 'SQL Databases'),
        proficiency: PROFICIENCY.MID,
        primary: false,
      },
      {
        id: 8,
        skill: dummySkills.find(s => s.name === 'NoSQL Databases'),
        proficiency: PROFICIENCY.MID,
        primary: false,
      },
    ],
  },
  {
    id: 2,
    bio: {
      firstName: 'Pete',
      middleInitial: '',
      lastName: 'Sampras',
      birthDate: new Date('1967-12-25'),
      gender: GENDER.MALE,
      ethnicity: ETHNICITY.CAUCASIAN,
      usCitizen: true,
    },
    contact: {
      email: 'pete.sampras@gmail.com',
      phoneNumber: '(321)456-7890',
      address: {
        line1: '2300 Wilson Blvd',
        line2: null,
        city: 'Arlington',
        stateCode: 'VA',
        zipCode: '22201',
      },
    },
    skills: [
      {
        id: 1,
        skill: dummySkills.find(s => s.name === 'Business Analysis'),
        proficiency: PROFICIENCY.HIGH,
        primary: true,
      },
      {
        id: 2,
        skill: dummySkills.find(s => s.name === 'Business Development'),
        proficiency: PROFICIENCY.LOW,
        primary: false,
      },
      {
        id: 3,
        skill: dummySkills.find(s => s.name === 'Scrum Master'),
        proficiency: PROFICIENCY.HIGH,
        primary: false,
      },
      {
        id: 4,
        skill: dummySkills.find(s => s.name === 'Project Management'),
        proficiency: PROFICIENCY.MID,
        primary: false,
      },
    ],
  },
]

@Injectable()
export class MockEmployeesService implements IEmployeesService {
  readonly list = new BehaviorSubject<IEmployee[]>([])

  endpoint = '/employee'

  constructor() {}

  fetch(): Observable<IEmployee[]> {
    this.list.next(dummyEmployees)
    return this.list.asObservable()
  }

  getById(id: number): Observable<IEmployee> {
    return of(dummyEmployees.find(e => e.id === id))
  }

  getByEmail(email: string): Observable<IEmployee> {
    if (this.list.value.length === 0) {
      this.fetch()
    }
    return of(this.list.value.find(e => e.contact.email === email))
  }

  create(employee: IEmployee): Observable<IEmployee> {
    const newList = this.list.value
    employee.id = this.list.value.length
    newList.push(employee)
    this.list.next(newList)
    return of(employee)
  }

  update(employee: IEmployee): Observable<IEmployee> {
    this.delete(employee.id)
    const newList = this.list.value
    newList.push(employee)
    this.list.next(newList)
    return of(employee)
  }

  delete(id: number): Observable<IEmployee> {
    this.list.next(this.list.value.filter(e => e.id !== id))
    return of(null)
  }
}
