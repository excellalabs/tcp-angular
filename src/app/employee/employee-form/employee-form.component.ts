import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { BehaviorSubject, Subscription } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { BaseForm } from '../../abstracts/base-form.class'
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
    private employeesService: EmployeesService
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
    }
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe())
  }

  onSubmit() {
    console.log(this.formGroup.value)
  }
}
