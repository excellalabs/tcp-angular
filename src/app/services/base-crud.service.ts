import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface IBaseCrudService<T> {
  readonly list: BehaviorSubject<T[]>
  endpoint: string
  fetch(): Observable<T[]>
  getById(id: number): Observable<T>
  create(item: T): void
  update(item: T): void
  delete(id: number): void
}

export abstract class BaseCrudService<T> implements IBaseCrudService<T> {
  readonly list = new BehaviorSubject<T[]>([])

  abstract endpoint: string

  constructor(protected http: HttpClient) {}

  fetch(): Observable<T[]> {
    return this.http.get<T[]>(this.endpoint).pipe(tap((items: T[]) => this.list.next(items)))
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`)
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.endpoint, item)
  }

  update(item: T): Observable<T> {
    return this.http.post<T>(this.endpoint, item)
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.endpoint}/${id}`)
  }
}