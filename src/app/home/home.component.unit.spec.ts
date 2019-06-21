import { IEmployeeSkill, PROFICIENCY } from '../models/skill.interface'
import { AuthService } from '../services/auth/auth.service'
import { MockAuthService } from '../services/auth/auth.service.fake'
import { EmployeesService } from '../services/employees/employees.service'
import {
  MockEmployeesService,
  dummyEmployees,
} from '../services/employees/employees.service.fake'
import { stringCompare } from '../utils/functions'
import { HomeComponent } from './home.component'

describe('HomeComponent (Unit)', () => {
  let component: HomeComponent
  let employeeService: MockEmployeesService
  let authService: MockAuthService

  beforeEach(() => {
    employeeService = new MockEmployeesService()
    authService = new MockAuthService()
    component = new HomeComponent(
      employeeService as EmployeesService,
      authService as AuthService
    )
  })

  describe('#getCurrentUser()', () => {
    it('should utilize AuthService and EmployeeService to get the currently logged in user', done => {
      const email = 'jon.doe@gmail.com'
      spyOn(authService, 'getEmail').and.returnValue(email)
      spyOn(employeeService, 'getByEmail').and.callThrough()
      component.getCurrentUser().subscribe(user => {
        expect(authService.getEmail).toHaveBeenCalled()
        expect(employeeService.getByEmail).toHaveBeenCalledWith(email)
        expect(user).toEqual(dummyEmployees.find(e => e.contact.email === email))
        done()
      })
    })
  })

  describe('#skillCountByProficiency()', () => {
    let skills: IEmployeeSkill[]
    beforeEach(() => {
      skills = dummyEmployees[0].skills
    })

    it('should return data in order, from High to Low', () => {
      expect(component.skillCountByProficiency(skills)[0].label).toBe('HIGH')
      expect(component.skillCountByProficiency(skills)[1].label).toBe('MID')
      expect(component.skillCountByProficiency(skills)[2].label).toBe('LOW')
    })

    it('should properly count skills based on proficiency', () => {
      const data = component.skillCountByProficiency(skills)
      expect(data[0].amount).toBe(
        skills.filter(s => s.proficiency === PROFICIENCY.HIGH).length
      )
    })
  })

  describe('#skillCountByCategory()', () => {
    let skills: IEmployeeSkill[]
    beforeEach(() => {
      skills = dummyEmployees[0].skills
    })

    it('should return data in alphabetical order', () => {
      const data = component.skillCountByCategory(skills)
      expect(stringCompare(data[0].label, data[1].label)).toBe(-1)
    })

    it('should properly count skills based on category', () => {
      const data = component.skillCountByCategory(skills)
      expect(data[0].amount).toBe(
        skills.filter(s => s.skill.category.name === data[0].label).length
      )
    })
  })
})
