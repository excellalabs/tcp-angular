import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'

import { MaterialModule } from '../material.module'
import { AuthService } from '../services/auth/auth.service'
import { MockAuthService } from '../services/auth/auth.service.fake'
import { LoginComponent } from './login.component'

describe('LoginComponent', () => {
  let component: LoginComponent
  let authService: AuthService

  beforeEach(() => {
    authService = new AuthService(null, null)
    component = new LoginComponent(new FormBuilder(), authService)
    component.ngOnInit()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call authservice login with correct info', () => {
    spyOn(authService, 'login').and.callFake(() => {})
    component.formGroup.patchValue({ username: 'testUserName', password: 'testPassword' })
    component.submit()
    expect(authService.login).toHaveBeenCalledTimes(1)
    expect(authService.login).toHaveBeenCalledWith('testUserName', 'testPassword')
  })
})
