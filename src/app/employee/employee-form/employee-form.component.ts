import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { BaseForm } from '../abstracts/base-form.class';
import { EmployeesService } from '../../services/employees/employees.service';
import { FormGroup } from '@angular/forms';
import { IEmployee } from '../../models/employee.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'tcp-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent extends BaseForm implements OnInit, OnDestroy {

  employee$ = new BehaviorSubject<IEmployee>({} as IEmployee)

  subs: Subscription[] = []

  constructor(private activatedRoute: ActivatedRoute, private employeesService: EmployeesService) {
    super();
    this.formGroup = this.buildForm();
  }

  buildForm(): FormGroup {
    return new FormGroup({});
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.subs.push(
        this.activatedRoute.paramMap.pipe(
          switchMap((params: ParamMap) => this.employeesService.getById(Number.parseInt(params.get('id'))))
        ).subscribe((employee: IEmployee) => this.employee$.next(employee))
      )
    }
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe())
  }

}
