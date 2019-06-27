import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { IEmployee } from '../../models/employee.interface'
import { BaseCrudService, IBaseCrudService } from '../abstract/base-crud.service'

export interface IEmployeesService extends IBaseCrudService<IEmployee> {
  getByEmail(email: string): Observable<IEmployee>
}

@Injectable()
export class EmployeesService extends BaseCrudService<IEmployee>
  implements IEmployeesService {
  endpoint = '/employee/'

  constructor(protected http: HttpClient) {
    super(http)
  }

  getByEmail(email: string): Observable<IEmployee> {
    return this.list.pipe(
      map(list => list.find(e => e.contact.email.toLowerCase() === email.toLowerCase()))
    )
  }
}
