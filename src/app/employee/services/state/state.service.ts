import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

import { states } from './state.service.fake';

export interface IState {
  name: string
  code: string
}

export interface IStateService {
  getStates(): Observable<IState[]>
}

@Injectable()
export class StateService implements IStateService{
  constructor(private http: HttpClient) {}

  getStates(): Observable<IState[]> {
    return of(states)
  }
}
