import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { BehaviorSubject, Subscription } from 'rxjs'

import { IEmployee } from '../../models/employee.interface'
import { IEmployeeSkill, ISkill, PROFICIENCY } from '../../models/skill.interface'
import { AuthService } from '../../services/auth/auth.service'
import { EmployeesService } from '../../services/employees/employees.service'

export interface IEmployeeFilters {
  name: string
  skills: ISkill[]
}

@Component({
  selector: 'tcp-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements AfterViewInit {
  employeesSubscription: Subscription
  tableColumns: string[] = ['name', 'email', 'skills']

  dataSource: MatTableDataSource<IEmployee>
  dataFilter$ = new BehaviorSubject<IEmployeeFilters>({} as IEmployeeFilters)

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: false }) sort: MatSort

  constructor(
    private authService: AuthService,
    private employeeService: EmployeesService
  ) {
    this.dataSource = new MatTableDataSource(this.employeeService.list.value)
    this.dataFilter$.subscribe(f => (this.dataSource.filter = JSON.stringify(f)))

    // show edit buttons if admin
    if (this.authService.isAdmin()) {
      this.tableColumns.unshift('edit')
    }
    this.dataSource.filterPredicate = this.employeeFilterPredicate
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sortingDataAccessor = (employee, property) => {
      switch (property) {
        case 'name':
          return employee.bio.firstName
        case 'email':
          return employee.contact.email
        case 'skills':
          return employee.skills.find(s => s.primary === true).skill.name
        default:
          return employee[property]
      }
    }
    this.dataSource.sort = this.sort
  }

  filterEmployeeByName(filterValue: string) {
    this.dataFilter$.next({
      ...this.dataFilter$.value,
      name: filterValue.trim().toLowerCase(),
    })
  }

  filterEmployeeBySkills(filterValue: ISkill[]) {
    this.dataFilter$.next({ ...this.dataFilter$.value, skills: filterValue })
  }

  employeeFilterPredicate(employee: IEmployee, filter: string): boolean {
    const filterObj = JSON.parse(filter) as IEmployeeFilters
    let nameMatches = true
    let skillsMatch = true

    if (filterObj.name) {
      nameMatches =
        employee.bio.firstName.toLowerCase().includes(filterObj.name.toLowerCase()) ||
        employee.bio.lastName.toLowerCase().includes(filterObj.name.toLowerCase())
    }

    if (filterObj.skills && filterObj.skills.length > 0) {
      const employeeSkills = employee.skills.map(employeeSkill => employeeSkill.skill.id)
      skillsMatch = filterObj.skills.every(s => employeeSkills.includes(s.id))
    }

    return nameMatches && skillsMatch
  }

  isHighProficiency(skill: IEmployeeSkill): boolean {
    return skill.proficiency === PROFICIENCY.HIGH
  }

  skillAriaLabel(skill: IEmployeeSkill): string {
    return `${skill.skill.name} - ${skill.proficiency} proficiency`
  }
}
