import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { IEmployee } from '../../models/employee.interface';
import { BaseCrudService, IBaseCrudService } from '../abstract/base-crud.service';

@Injectable()
export class EmployeesService extends BaseCrudService<IEmployee> implements IBaseCrudService<IEmployee> {

  endpoint = '/employee'

  constructor(protected http: HttpClient) {
    super(http)
  }
}
