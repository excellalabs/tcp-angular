import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../services/employees/employees.service';
import { BehaviorSubject } from 'rxjs';
import { IEmployee } from '../models/employee.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'tcp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  employees: IEmployee[] = [];
  employeesSubject: BehaviorSubject<IEmployee[]>;

  constructor(private httpClient: HttpClient, private employeesData: EmployeesService) { 
    this.employeesData.fetch();
    this.employeesSubject = employeesData.getList();
    this.employeesSubject.subscribe(data => {
     if (data) {
       this.employees = data;
       console.log(this.employees);
     } else {
       this.employees = [];
     }
   })
  }
  ngOnInit() {}

  testRequest() {
    this.httpClient.get('tests').subscribe()
  }
  
  ngOnDestroy() {
    this.employeesSubject.unsubscribe;
  }

}
