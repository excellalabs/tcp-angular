import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { environment } from '../../../environments/environment'
import { EmployeesService } from './employees.service'
import { dummyEmployees } from './employees.service.fake';

describe('EmployeesService', () => {
  let service: EmployeesService
  let httpMock: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeesService],
      imports: [HttpClientTestingModule],
    })
    httpMock = TestBed.get(HttpTestingController)
    service = TestBed.get(EmployeesService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('getByEmail', () => {
    beforeEach(() => {
      // Load the service cache with data, like a route resolver
      service.fetch().subscribe()
      const fetch = httpMock.expectOne({method: 'GET', url: `${environment.api}${service.endpoint}`})
      fetch.flush(dummyEmployees)
    })
    it('should query the cache for an employee with the given email', done => {
      service.getByEmail(dummyEmployees[0].contact.email).subscribe(employee => {
        expect(employee).toEqual(dummyEmployees[0])
        done()
      })
    })
  })
})
