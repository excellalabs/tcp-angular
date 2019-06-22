import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'

import { IEmployee } from '../models/employee.interface'
import { IEmployeeSkill, PROFICIENCY } from '../models/skill.interface'
import { AuthService } from '../services/auth/auth.service'
import { EmployeesService } from '../services/employees/employees.service'
import { stringCompare } from '../utils/functions'
import { IDataPoint } from './chart/chart.component'

@Component({
  selector: 'tcp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  employee$: Observable<IEmployee>
  subscriptions: Subscription[] = []

  skillsByProficiency$: Observable<IDataPoint[]>
  skillsByCategory$: Observable<IDataPoint[]>

  constructor(
    private employeeService: EmployeesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.employee$ = this.getCurrentUser()
    this.skillsByProficiency$ = this.employee$.pipe(
      map(e => this.skillCountByProficiency(e.skills))
    )
    this.skillsByCategory$ = this.employee$.pipe(
      map(e => this.skillCountByCategory(e.skills))
    )
  }

  getCurrentUser(): Observable<IEmployee> {
    return this.employeeService.getByEmail(this.authService.getEmail())
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  skillCountByProficiency(skills: IEmployeeSkill[]): IDataPoint[] {
    return [PROFICIENCY.HIGH, PROFICIENCY.MID, PROFICIENCY.LOW].map(p => {
      const count = skills.filter(s => s.proficiency === PROFICIENCY[p]).length
      return {
        label: p,
        amount: count,
      } as IDataPoint
    })
  }

  skillCountByCategory(skills: IEmployeeSkill[]): IDataPoint[] {
    const categories = []
    skills.forEach(s => {
      if (!categories.includes(s.skill.category)) {
        categories.push(s.skill.category)
      }
    })

    return categories
      .sort((a, b) => stringCompare(a.name, b.name))
      .map(c => {
        const count = skills.filter(s => s.skill.category.id === c.id).length
        return {
          label: c.name,
          amount: count,
        } as IDataPoint
      })
  }
}
