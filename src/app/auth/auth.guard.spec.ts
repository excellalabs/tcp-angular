import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed, inject } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { AuthService } from '../services/auth/auth.service';
import { MockAuthService } from '../services/auth/auth.service.fake';
import { AuthGuard } from './auth.guard'

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthGuard, { provide: AuthService, useClass: MockAuthService}],
    })
  })

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy()
  }))
})
