import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { MessagingModule } from 'src/app/messaging/messaging.module'

import { EmployeesService } from './employees.service'

describe('EmployeesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [EmployeesService],
      imports: [MessagingModule, HttpClientTestingModule],
    })
  )

  it('should be created', () => {
    const service: EmployeesService = TestBed.get(EmployeesService)
    expect(service).toBeTruthy()
  })
})
