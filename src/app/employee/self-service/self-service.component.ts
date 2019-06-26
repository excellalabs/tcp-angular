import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'

import { SnackBarService } from '../../messaging/services/snack-bar/snack-bar.service'
import { IEmployee } from '../../models/employee.interface'
import { IEmployeeSkill } from '../../models/skill.interface'
import { AuthService } from '../../services/auth/auth.service'
import { EmployeesService } from '../../services/employees/employees.service'
import { BaseForm } from '../abstracts/base-form.class'

@Component({
  selector: 'tcp-self-service',
  templateUrl: './self-service.component.html',
  styleUrls: ['./self-service.component.scss'],
})
export class SelfServiceComponent extends BaseForm implements OnInit {
  user$ = new BehaviorSubject<IEmployee>(null)

  constructor(
    private authService: AuthService,
    private employeeService: EmployeesService,
    private fb: FormBuilder,
    private snackBarService: SnackBarService
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
      skills: this.formGroup.value.skills as IEmployeeSkill[],
    }
    this.employeeService
      .update(newEmployee)
      .subscribe(this.snackBarService.observerFor<IEmployee>('Update My Skills'))
  }
}
