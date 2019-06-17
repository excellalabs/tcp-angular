import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { MaterialModule } from 'src/app/material.module'
import { AuthService } from 'src/app/services/auth/auth.service'
import { MockAuthService } from 'src/app/services/auth/auth.service.fake'
import { EmployeesService } from 'src/app/services/employees/employees.service'
import { MockEmployeesService } from 'src/app/services/employees/employees.service.fake'

import { EmployeeListComponent } from './employee-list.component'

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent
  let fixture: ComponentFixture<EmployeeListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      imports: [MaterialModule, NoopAnimationsModule, RouterTestingModule],
      providers: [
        { provide: EmployeesService, useClass: MockEmployeesService },
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
