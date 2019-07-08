import { HttpClient, HttpParams } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'

import { AuthService } from './auth.service'

describe('AuthService', () => {
  let http: HttpTestingController
  let service: AuthService
  let router: Router
  let navigateSpy: jasmine.Spy
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })

    http = TestBed.get(HttpTestingController)
    router = TestBed.get(Router)
    navigateSpy = spyOn(router, 'navigateByUrl').and.callFake((url: string | UrlTree) => new Promise<boolean>(() => true))
    service = TestBed.get(AuthService)
    service.key = 'test-tcp-angular'
  })

  afterEach(() => {
    http.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('login', () => {
    it('should POST username & password in url-encoded body with Basic auth', () => {
      const username = 'testUsername'
      const password = 'testPassword'
      service.login(username, password)
      const req = http.expectOne(
        r => {
          const goodHeaders =  r.headers.has('Content-Type') &&
          r.headers.get('Content-Type') === 'application/x-www-form-urlencoded' &&
          r.headers.has('Authorization') &&
          r.headers.get('Authorization').startsWith('Basic')

          const body = r.body as HttpParams
          const goodBody = body.has('username') &&
            body.get('username') === username &&
            body.has('password') &&
            body.get('password') === password &&
            body.has('grant_type') &&
            body.get('grant_type') === 'password'

          return r.method === 'POST' && goodHeaders && goodBody
        }
      )
      expect(req).toBeTruthy()
    })

    it('should set localStorageKey when successful', () => {
      const randomKey = 'randomKey'
      localStorage.removeItem(service.key)
      service.login('u', 'p')
      const req = http.expectOne({ method: 'POST', url: service.authorizationEndpoint })
      req.flush({ access_token: randomKey})
      expect(localStorage.getItem(service.key)).toBe(randomKey)
    })

    it('should route to home when successful', () => {
      const randomKey = 'randomKey'
      service.login('u', 'p')
      const req = http.expectOne({ method: 'POST', url: service.authorizationEndpoint })
      req.flush({ access_token: randomKey})
      expect(navigateSpy).toHaveBeenCalledWith('home')
    })

    it('should not localStorageKey when unsuccessful', () => {
      localStorage.removeItem(service.key)
      service.login('u', 'p')
      const req = http.expectOne({ method: 'POST', url: service.authorizationEndpoint })
      req.flush({ errorMessage: 'Uh oh!' }, { status: 500, statusText: 'Server Error' })
      expect(localStorage.getItem(service.key)).toBeFalsy()
    })
  })
})
