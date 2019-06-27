import { IEmployee } from '../../models/employee.interface'
import {
  ICategory,
  IEmployeeSkill,
  ISkill,
  PROFICIENCY,
} from '../../models/skill.interface'
import { AuthService } from '../../services/auth/auth.service'
import { MockAuthService } from '../../services/auth/auth.service.fake'
import { EmployeesService } from '../../services/employees/employees.service'
import {
  MockEmployeesService,
  dummyEmployees,
} from '../../services/employees/employees.service.fake'
import { dummySkills } from '../../services/skills/skills.service.fake'
import { EmployeeListComponent, IEmployeeFilters } from './employee-list.component'

describe('EmployeeListComponent (Unit)', () => {
  let component: EmployeeListComponent
  let authService: MockAuthService
  let employeeService: MockEmployeesService

  beforeEach(() => {
    authService = new MockAuthService()
    employeeService = new MockEmployeesService()
    component = new EmployeeListComponent(
      authService as AuthService,
      employeeService as EmployeesService
    )
  })

  describe('#constructor()', () => {
    it('should create', () => {
      expect(component).toBeTruthy()
    })
    it('should not display the edit column user is not an admin', () => {
      spyOn(authService, 'isAdmin').and.returnValue(false)
      component = new EmployeeListComponent(
        authService as AuthService,
        employeeService as EmployeesService
      )
      expect(component.tableColumns).not.toContain('edit')
    })
    it('should add the edit column if user is admin', () => {
      spyOn(authService, 'isAdmin').and.returnValue(true)
      component = new EmployeeListComponent(
        authService as AuthService,
        employeeService as EmployeesService
      )
      expect(component.tableColumns).toContain('edit')
    })
  })

  describe('#filterEmployeeByName()', () => {
    it('should set the name value on dataFilter$', done => {
      const value = ' Doe '
      component.dataFilter$.subscribe(filter => {
        if (filter.name) {
          expect(filter.name).toEqual(value.trim().toLowerCase())
          done()
        }
      })
      component.filterEmployeeByName(value)
    })
  })

  describe('#filterEmployeeBySkills()', () => {
    it('should set the skills value on dataFilter$', done => {
      const value = [...dummySkills].slice(0, 2)
      component.dataFilter$.subscribe(filter => {
        if (filter.skills) {
          expect(filter.skills).toEqual(value)
          done()
        }
      })
      component.filterEmployeeBySkills(value)
    })
  })

  describe('#employeeFilterPredicate()', () => {
    let employees: IEmployee[]
    beforeEach(() => {
      employees = [...dummyEmployees]
    })

    it('should filter on first name', () => {
      const value = employees[0].bio.firstName.toLowerCase()
      const filter = { name: value } as IEmployeeFilters
      const results = employees.filter(e =>
        component.employeeFilterPredicate(e, JSON.stringify(filter))
      )
      expect(results).toContain(employees[0])
      expect(results).not.toContain(employees[1])
    })

    it('should filter on last name', () => {
      const value = employees[0].bio.lastName.toLowerCase()
      const filter = { name: value } as IEmployeeFilters
      const results = employees.filter(e =>
        component.employeeFilterPredicate(e, JSON.stringify(filter))
      )
      expect(results).toContain(employees[0])
      expect(results).not.toContain(employees[1])
    })

    it('should filter on skills', () => {
      const value = employees[0].skills
      value.slice(0, 2)
      const filter = { skills: value.map(s => s.skill) } as IEmployeeFilters
      const results = employees.filter(e =>
        component.employeeFilterPredicate(e, JSON.stringify(filter))
      )
      expect(results).toContain(employees[0])
      expect(results).not.toContain(employees[1])
    })

    it('should filter on name and skills', () => {
      // Add another employee that has same last name and one fewer skill than item 0
      employees.push({
        ...employees[0],
        bio: { ...employees[0].bio, firstName: 'Jim' },
        skills: [...employees[0].skills.splice(0, 1)],
      })
      // Common last name (removes [1])
      const nameValue = employees[0].bio.lastName.substr(0, 4).toLowerCase()
      // Unique skill
      const skillsValue = employees[0].skills[0]
      const filter = {
        name: nameValue,
        skills: skillsValue,
      }
      const results = employees.filter(e =>
        component.employeeFilterPredicate(e, JSON.stringify(filter))
      )
      expect(results).toContain(employees[0])
      expect(results).not.toContain(employees[1])
    })
  })

  describe('#isHighProficiency()', () => {
    const proficiencies = Object.keys(PROFICIENCY)
    proficiencies.forEach(p => {
      it(`should return ${p === 'HIGH'} when skill is ${p} proficiency`, () => {
        const skill: IEmployeeSkill = {
          id: 1,
          skill: {} as ISkill,
          proficiency: PROFICIENCY[p],
          primary: false,
        }
        expect(component.isHighProficiency(skill)).toBe(p === 'HIGH')
      })
    })
  })

  describe('#skillAriaLabel()', () => {
    it('should return a nicely formatted string', () => {
      const skill: IEmployeeSkill = {
        id: 1,
        skill: {
          id: 12,
          name: 'Important Skill',
          category: {
            id: 34,
            name: 'Fundamentals',
          } as ICategory,
        } as ISkill,
        proficiency: PROFICIENCY.HIGH,
        primary: false,
      }

      expect(component.skillAriaLabel(skill)).toEqual(
        'Important Skill - HIGH proficiency'
      )
    })
  })
})
