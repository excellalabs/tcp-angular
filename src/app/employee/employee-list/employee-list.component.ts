import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/services/auth/auth.service';

import { IEmployee } from '../../models/employee.interface'
import { EmployeesService } from '../../services/employees/employees.service'

@Component({
  selector: 'tcp-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  employeesSubscription: Subscription
  tableColumns: string[] = ['name', 'birthDate', 'email', 'phoneNumber']

  dataSource: MatTableDataSource<IEmployee>

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: false }) sort: MatSort

  constructor(private authService: AuthService, private employeeService: EmployeesService) {
    this.employeeService.fetch()
    this.dataSource = new MatTableDataSource(this.employeeService.list.value)
  }

  ngOnInit() {
    // show edit buttons if admin
    if (this.authService.isAdmin()) {
      this.tableColumns.unshift('edit')
    }

    this.dataSource.filterPredicate = (employee: IEmployee, filter: string) => {
      return (
        employee.bio.firstName.toLowerCase().includes(filter.toLowerCase()) ||
        employee.bio.lastName.toLowerCase().includes(filter.toLowerCase())
      )
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sortingDataAccessor = (employee, property) => {
      switch (property) {
        case 'name':
          return employee.bio.firstName
        case 'birthDate':
          return employee.bio.birthDate
        case 'email':
          return employee.contact.email
        case 'phoneNumber':
          return employee.contact.phoneNumber
        default:
          return employee[property]
      }
    }
    this.dataSource.sort = this.sort
  }

  filterEmployee(filterValue: string) {
    filterValue = filterValue.trim()
    filterValue = filterValue.toLowerCase()
    this.dataSource.filter = filterValue
  }
}
