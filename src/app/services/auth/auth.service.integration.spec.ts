import { HttpErrorResponse } from '@angular/common/http'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { AuthService } from './auth.service'

describe('AuthService', () => {
  let http
  let service
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })

    http = TestBed.get(HttpTestingController)
    service = TestBed.get(AuthService)
    service.key = 'test-tcp-angular'
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should have username and password in header on login', () => {
    const username = 'testUsername'
    const password = 'testPassword'
    service.login(username, password)
    const req = http.expectOne(
      r =>
        r.headers.has('u') &&
        r.headers.get('u') === username &&
        r.headers.has('p') &&
        r.headers.get('p') === password
    )
    expect(req).toBeTruthy()
  })

  it('should set localStorageKey on successful login', () => {
    const randomKey = 'randomKey'
    localStorage.removeItem(service.key)
    service.login('u', 'p')
    const req = http.expectOne('login')
    req.flush(randomKey)
    expect(localStorage.getItem(service.key)).toBe(randomKey)
  })

  it('should not localStorageKey on unsuccessful login', () => {
    localStorage.removeItem(service.key)
    service.login('u', 'p')
    const req = http.expectOne('login')
    req.flush({ errorMessage: 'Uh oh!' }, { status: 500, statusText: 'Server Error' })
    expect(localStorage.getItem(service.key)).toBeFalsy()
  })
})
