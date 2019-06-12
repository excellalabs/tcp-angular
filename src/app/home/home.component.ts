import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../services/employees/employees.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IEmployee } from '../models/employee.interface';

@Component({
  selector: 'tcp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  employees: IEmployee[] = [];
  employeesSubject: BehaviorSubject<IEmployee[]>;

  constructor(private employeesData: EmployeesService) { 
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

  ngOnInit() {
  }

  
  ngOnDestroy() {
    this.employeesSubject.unsubscribe;
  }

}
