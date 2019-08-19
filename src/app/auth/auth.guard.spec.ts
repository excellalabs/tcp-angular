import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed, inject } from '@angular/core/testing'
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'

import { Role } from '../models/role'
import { AuthService } from '../services/auth/auth.service'
import { MockAuthService } from '../services/auth/auth.service.fake'
import { AuthGuard } from './auth.guard'

describe('AuthGuard', () => {
  let authService: AuthService
  let mockRouter: any
  let guard: AuthGuard

  beforeEach(() => {
    mockRouter = { navigateByUrl: jasmine.createSpy('navigateByUrl') }
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    })

    guard = TestBed.get(AuthGuard)
    authService = TestBed.get(AuthService)
  })

  it('should create', () => {
    expect(guard).toBeTruthy()
  })

  describe('handleCheck()', () => {
    it('should route to /login if not logged in', () => {
      spyOn(authService, 'isLoggedIn').and.returnValue(false)
      expect(guard.handleCheck([])).toBe(false)
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login')
    })
    it('should check roles and return true if allowed', () => {
      spyOn(authService, 'isLoggedIn').and.returnValue(true)
      spyOn(authService, 'getRoles').and.returnValue([Role.user])
      expect(guard.handleCheck([Role.user])).toBe(true)
    })
    it('should check roles and navigate to /home if not allowed', () => {
      spyOn(authService, 'isLoggedIn').and.returnValue(true)
      spyOn(authService, 'getRoles').and.returnValue([Role.user])
      expect(guard.handleCheck([Role.admin])).toBe(false)
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/home')
    })
  })
})
