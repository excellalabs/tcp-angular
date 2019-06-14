import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { IEmployee } from '../models/employee.interface'
import { EmployeesService } from '../services/employees/employees.service'

@Component({
  selector: 'tcp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  employees: IEmployee[] = []
  employeesSubscription: Subscription

  constructor(private employeesData: EmployeesService) {
    this.employeesData.fetch()
    this.employeesSubscription = this.employeesData.list.subscribe(data => {
      if (data) {
        this.employees = data
      } else {
        this.employees = []
      }
    })
  }
  ngOnInit() {}

  testRequest() {
    console.log('tests')
  }

  ngOnDestroy() {
    this.employeesSubscription.unsubscribe()
  }
}
