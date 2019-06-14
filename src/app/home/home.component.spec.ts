import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../material.module'
import { AuthService } from '../services/auth/auth.service'
import { MockAuthService } from '../services/auth/auth.service.fake'
import { EmployeesService } from '../services/employees/employees.service'
import { MockEmployeesService } from '../services/employees/employees.service.fake'
import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [MaterialModule, NoopAnimationsModule, RouterTestingModule],
      providers: [
        { provide: EmployeesService, useClass: MockEmployeesService },
        { provide: AuthService, useClass: MockAuthService }
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
