import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'

import { IEmployee } from '../models/employee.interface'
import { AuthService } from '../services/auth/auth.service'
import { EmployeesService } from '../services/employees/employees.service'

@Component({
  selector: 'tcp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  employee$: Observable<IEmployee>
  subscriptions: Subscription[] = []

  constructor(
    private employeeService: EmployeesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.employee$ = this.getCurrentUser()
  }

  getCurrentUser(): Observable<IEmployee> {
    return this.employeeService.getByEmail(this.authService.getEmail())
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
}
