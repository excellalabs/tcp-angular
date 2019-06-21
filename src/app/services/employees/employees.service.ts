import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'

import { IEmployee } from '../../models/employee.interface'
import { dummyEmployees } from './employees.service.fake'
import { SnackBarService } from '../snack-bar/snack-bar.service'

export interface IEmployeesService {
  readonly list: BehaviorSubject<IEmployee[]>
  fetch(): void
  getById(id: number): Observable<IEmployee>
  getByEmail(email: string): Observable<IEmployee>
  addEmployee(employee: IEmployee): void
  updateEmployee(employee: IEmployee): void
  deleteEmployee(id: number): void
}

@Injectable()
export class EmployeesService implements IEmployeesService {
  readonly list = new BehaviorSubject<IEmployee[]>([])

  constructor(private http: HttpClient, private snackBarService: SnackBarService) {}

  fetch(): void {
    this.list.next(dummyEmployees)
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

  addEmployee(employee: IEmployee) {
    const newList = this.list.value
    employee.id = this.list.value.length
    newList.push(employee)
    this.list.next(newList)
    this.snackBarService.openSnackBar('Employee Added')
  }

  updateEmployee(employee: IEmployee) {
    this.deleteEmployee(employee.id)
    const newList = this.list.value
    newList.push(employee)
    this.list.next(newList)
    this.snackBarService.openSnackBar('Employee Updated')
  }

  deleteEmployee(id: number) {
    this.list.next(this.list.value.filter(e => e.id !== id))
    this.snackBarService.openSnackBar('Employee Deleted')
  }
}
