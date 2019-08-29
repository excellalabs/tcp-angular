import { HttpClient } from '@angular/common/http'
import { Resolve } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { environment } from '../../../environments/environment'
import { IBaseItem } from '../../models/base-item.interface'

export interface IBaseCrudService<I extends IBaseItem> {
  readonly list: BehaviorSubject<I[]>
  endpoint: string
  fetch(): Observable<I[]>
  getById(id: number): Observable<I>
  create(item: I): Observable<I>
  update(item: I): Observable<I>
  delete(id: number): Observable<I>
}

export abstract class BaseCrudService<I extends IBaseItem>
  implements IBaseCrudService<I>, Resolve<I[]> {
  readonly list = new BehaviorSubject<I[]>([])

  abstract endpoint: string

  constructor(protected http: HttpClient) {}

  fetch(): Observable<I[]> {
    return this.http
      .get<I[]>(`${environment.api}${this.endpoint}`)
      .pipe(tap((items: I[]) => this.list.next(items)))
  }

  getById(id: number): Observable<I> {
    return this.http.get<I>(`${environment.api}${this.endpoint}${id}`)
  }

  create(item: I): Observable<I> {
    return this.http
      .post<I>(`${environment.api}${this.endpoint}`, item)
      .pipe(tap(() => this.fetch().subscribe()))
  }

  update(item: I): Observable<I> {
    return this.http
      .put<I>(`${environment.api}${this.endpoint}${item.id}`, item)
      .pipe(tap(() => this.fetch().subscribe()))
  }

  delete(id: number): Observable<I> {
    return this.http
      .delete<I>(`${environment.api}${this.endpoint}${id}`)
      .pipe(tap(() => this.fetch().subscribe()))
  }

  resolve(): Observable<I[]> {
    return this.fetch()
  }
}
