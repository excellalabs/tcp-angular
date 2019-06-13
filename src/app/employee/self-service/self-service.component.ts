import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEmployee } from 'src/app/models/employee.interface';
import { IEmployeeSkill } from 'src/app/models/skill.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeesService } from 'src/app/services/employees/employees.service';

import { BaseForm } from '../abstracts/base-form.class';

@Component({
  selector: 'tcp-self-service',
  templateUrl: './self-service.component.html',
  styleUrls: ['./self-service.component.scss']
})
export class SelfServiceComponent extends BaseForm implements OnInit {

  user$ = new BehaviorSubject<IEmployee>(null)

  constructor(
    private authService: AuthService,
    private employeeService: EmployeesService,
    private fb: FormBuilder
    ) {
    super()
    this.formGroup = this.buildForm()
  }

  ngOnInit() {
    const userEmail = this.authService.getEmail()
    this.employeeService.getByEmail(userEmail).subscribe(user => this.user$.next(user))
  }

  buildForm(): FormGroup {
    return this.fb.group({})
  }

  onSave() {
    const newEmployee: IEmployee = {
      ...this.user$.value,
      skills: this.formGroup.value.skills as IEmployeeSkill[]
    }
    this.employeeService.updateEmployee(newEmployee)
  }

}
