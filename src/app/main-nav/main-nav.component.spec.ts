import { LayoutModule } from '@angular/cdk/layout'
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'

import { MaterialModule } from '../material.module'
import { AuthService } from '../services/auth/auth.service'
import { MockAuthService } from '../services/auth/auth.service.fake'
import { MainNavComponent } from './main-nav.component'

describe('MainNavComponent', () => {
  let component: MainNavComponent
  let fixture: ComponentFixture<MainNavComponent>
  let authService: AuthService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainNavComponent],
      imports: [NoopAnimationsModule, LayoutModule, MaterialModule, RouterTestingModule],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    authService = TestBed.get(AuthService)
  })

  it('should compile', () => {
    expect(component).toBeTruthy()
  })

  describe('isLoggedIn()', () => {
    it('should refer to authService.isLoggedIn()', () => {
      spyOn(authService, 'isLoggedIn').and.callThrough()
      component.isLoggedIn()
      expect(authService.isLoggedIn).toHaveBeenCalled()
    })
  })

  describe('logout()', () => {
    it('should call authService.logout()', () => {
      spyOn(authService, 'logout').and.callThrough()
      component.logout()
      expect(authService.logout).toHaveBeenCalled()
    })
  })

  describe('currentUserIsAdmin()', () => {
    it('should refer to authService.isAdmin()', () => {
      spyOn(authService, 'isAdmin').and.callThrough()
      component.currentUserIsAdmin()
      expect(authService.isAdmin).toHaveBeenCalled()
    })
  })
})

describe('Main Nav Rendering', () => {
  let component: MainNavComponent
  let fixture: ComponentFixture<MainNavComponent>
  let authService: AuthService

  let loginLink: DebugElement
  let logoutLink: DebugElement
  let homeLink: DebugElement
  let employeeSelfLink: DebugElement
  let employeeListLink: DebugElement
  let employeeAddLink: DebugElement
  let adminSkillsLink: DebugElement
  let adminCategoriesLink: DebugElement

  const createComponent = (): Promise<any> => {
    TestBed.configureTestingModule({
      declarations: [MainNavComponent],
      imports: [NoopAnimationsModule, LayoutModule, MaterialModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compileComponents()

    fixture = TestBed.createComponent(MainNavComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    return fixture.whenStable()
  }

  const getLinks = () => {
    loginLink = fixture.debugElement.query(By.css('#login'))
    logoutLink = fixture.debugElement.query(By.css('#logout'))
    homeLink = fixture.debugElement.query(By.css('#home'))
    employeeSelfLink = fixture.debugElement.query(By.css('#employee-self'))
    employeeListLink = fixture.debugElement.query(By.css('#employee-list'))
    employeeAddLink = fixture.debugElement.query(By.css('#employee-add'))
    adminSkillsLink = fixture.debugElement.query(By.css('#admin-skills'))
    adminCategoriesLink = fixture.debugElement.query(By.css('#admin-categories'))
  }

  beforeEach(() => {
    authService = new MockAuthService()
  })

  it('should display the login link when not logged in', async () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false)
    await createComponent()
    getLinks()
    expect(loginLink).toBeTruthy()
    expect(logoutLink).toBeNull()
  })

  it('should display the logout link when not logged in', async () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true)
    await createComponent()
    getLinks()
    expect(loginLink).toBeNull()
    expect(logoutLink).toBeTruthy()
  })

  it('should display the right links for Users', async () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true)
    spyOn(authService, 'isAdmin').and.returnValue(false)
    await createComponent()
    getLinks()

    expect(homeLink).toBeTruthy()
    expect(employeeSelfLink).toBeTruthy()
    expect(employeeListLink).toBeTruthy()
    expect(employeeAddLink).toBeNull()
    expect(adminSkillsLink).toBeNull()
    expect(adminCategoriesLink).toBeNull()
  })

  it('should display the right links for Admin', async () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true)
    spyOn(authService, 'isAdmin').and.returnValue(true)
    await createComponent()
    getLinks()

    expect(homeLink).toBeTruthy()
    expect(employeeSelfLink).toBeTruthy()
    expect(employeeListLink).toBeTruthy()
    expect(employeeAddLink).toBeTruthy()
    expect(adminSkillsLink).toBeTruthy()
    expect(adminCategoriesLink).toBeTruthy()
  })

})
