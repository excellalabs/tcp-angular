import { HttpClient } from '@angular/common/http'
import { Component, OnInit, ViewChild } from '@angular/core'
import { BehaviorSubject, Subscription } from 'rxjs'
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { IEmployee } from '../models/employee.interface'
import { EmployeesService } from '../services/employees/employees.service'

@Component({
  selector: 'tcp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  employees: IEmployee[] = []
  employeesSubscription: Subscription
  tableColumns: string[] = [
    'name',
    'birthDate',
    'email',
    'phoneNumber'
  ]
  
  dataSource: MatTableDataSource<IEmployee>;

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort: MatSort;

  constructor(private httpClient: HttpClient, private employeesData: EmployeesService) {
    this.employeesData.fetch()
    this.employeesSubscription = this.employeesData.list.subscribe(data => {
      if (data) {
        console.log(data)
        this.employees = data
      } else {
        this.employees = []
      }
    })
    this.dataSource = new MatTableDataSource(this.employees);
  }
  ngOnInit() {
    this.dataSource.filterPredicate = (employee: IEmployee, filter: string) => {
      console.log(employee)
      console.log(filter)
      return employee.bio.firstName.toLowerCase() == filter;
     };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (employee, property) => {
      switch(property) {
        case 'name': return employee.bio.firstName;
        case 'birthDate': return employee.bio.birthDate;
        case 'email': return employee.contact.email;
        case 'phoneNumber': return employee.contact.phoneNumber;
        default: return employee[property];
      }
    };
    this.dataSource.sort = this.sort;
  }

  filterEmployee (filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  testRequest() {
    this.httpClient.get('tests').subscribe()
  }

  ngOnDestroy() {
    this.employeesSubscription.unsubscribe
  }
}
