import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'

import { MaterialModule } from '../../material.module'
import { SnackBarService } from '../../messaging/services/snack-bar/snack-bar.service';
import { MockSnackBarService } from '../../messaging/services/snack-bar/snack-bar.service.fake';
import { AuthService } from '../../services/auth/auth.service'
import { MockAuthService } from '../../services/auth/auth.service.fake'
import { EmployeesService } from '../../services/employees/employees.service'
import { MockEmployeesService } from '../../services/employees/employees.service.fake'
import { SkillCategoriesService } from '../../services/skill-categories/skill-categories.service'
import { MockSkillCategoriesService } from '../../services/skill-categories/skill-categories.service.fake'
import { SkillsService } from '../../services/skills/skills.service'
import { MockSkillsService } from '../../services/skills/skills.service.fake'
import { SkillDetailComponent } from '../employee-form/skills-form/skill-detail/skill-detail.component'
import { SkillsFormComponent } from '../employee-form/skills-form/skills-form.component'
import { PrimarySkillService } from '../services/primary-skill/primary-skill.service';
import { SelfServiceComponent } from './self-service.component'

describe('SelfServiceComponent', () => {
  let component: SelfServiceComponent
  let fixture: ComponentFixture<SelfServiceComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelfServiceComponent, SkillsFormComponent, SkillDetailComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        PrimarySkillService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: SkillsService, useClass: MockSkillsService },
        { provide: SkillCategoriesService, useClass: MockSkillCategoriesService },
        { provide: EmployeesService, useClass: MockEmployeesService },
        { provide: SnackBarService, useClass: MockSnackBarService }
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfServiceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
