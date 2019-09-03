import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { BehaviorSubject, Subscription } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { BaseForm } from '../../abstracts/base-form.class'
import { SnackBarService } from '../../messaging/services/snack-bar/snack-bar.service'
import { IEmployee } from '../../models/employee.interface'
import { EmployeesService } from '../../services/employees/employees.service'

@Component({
  selector: 'tcp-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent extends BaseForm implements OnInit, OnDestroy {
  employee$ = new BehaviorSubject<IEmployee>({} as IEmployee)

  subs: Subscription[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeesService: EmployeesService,
    private snackBarService: SnackBarService
  ) {
    super()
    this.formGroup = this.buildForm()
  }

  buildForm(): FormGroup {
    return new FormGroup({})
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.subs.push(
        this.activatedRoute.paramMap
          .pipe(
            switchMap((params: ParamMap) =>
              this.employeesService.getById(Number.parseInt(params.get('id'), 10))
            )
          )
          .subscribe((employee: IEmployee) => this.employee$.next(employee))
      )
    } else {
      this.employee$.next({} as IEmployee)
    }
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe())
  }

  onSubmit() {
    const newEmployee = this.formGroup.value
    if (this.employee$.value && this.employee$.value.id) {
      this.employeesService
        .update({ ...newEmployee, id: this.employee$.value.id })
        .subscribe(
          this.snackBarService.observerFor('Update Employee', () =>
            this.employeesService.fetch().subscribe()
          )
        )
    } else {
      this.employeesService
        .create(newEmployee)
        .subscribe(
          this.snackBarService.observerFor('Add Employee', () =>
            this.employeesService.fetch().subscribe()
          )
        )
    }
  }
}
