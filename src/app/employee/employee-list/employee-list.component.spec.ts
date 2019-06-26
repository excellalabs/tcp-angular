import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'

import { MaterialModule } from '../../material.module'
import { AuthService } from '../../services/auth/auth.service'
import { MockAuthService } from '../../services/auth/auth.service.fake'
import { EmployeesService } from '../../services/employees/employees.service'
import { MockEmployeesService } from '../../services/employees/employees.service.fake'
import { SkillsService } from '../../services/skills/skills.service'
import { MockSkillsService } from '../../services/skills/skills.service.fake'
import { EmployeeListComponent } from './employee-list.component'
import { ListControlsComponent } from './list-controls/list-controls.component'

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent
  let fixture: ComponentFixture<EmployeeListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent, ListControlsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: EmployeesService, useClass: MockEmployeesService },
        { provide: SkillsService, useClass: MockSkillsService },
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
