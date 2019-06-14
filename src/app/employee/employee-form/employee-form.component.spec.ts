import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { EmployeesService } from 'src/app/services/employees/employees.service';
import { SkillCategoriesService } from 'src/app/services/skill-categories/skill-categories.service';
import { MockSkillCategoriesService } from 'src/app/services/skill-categories/skill-categories.service.fake';
import { SkillsService } from 'src/app/services/skills/skills.service';
import { MockSkillsService } from 'src/app/services/skills/skills.service.fake';

import { MockEmployeesService } from '../../services/employees/employees.service.fake'
import { StateService } from '../services/state/state.service';
import { MockStateService } from '../services/state/state.service.fake';
import { BioFormComponent } from './bio-form/bio-form.component';
import { AddressFormComponent } from './contact-form/address-form/address-form.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { EmployeeFormComponent } from './employee-form.component'
import { ReviewComponent } from './review/review.component';
import { SkillDetailComponent } from './skills-form/skill-detail/skill-detail.component';
import { SkillsFormComponent } from './skills-form/skills-form.component';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent
  let fixture: ComponentFixture<EmployeeFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeFormComponent,
        BioFormComponent,
        ContactFormComponent,
        AddressFormComponent,
        SkillsFormComponent,
        SkillDetailComponent,
        ReviewComponent
        ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        NoopAnimationsModule,
        PipeModule,
        RouterTestingModule
      ],
      providers: [
        { provide: EmployeesService, useClass: MockEmployeesService },
        { provide: SkillsService, useClass: MockSkillsService },
        { provide: SkillCategoriesService, useClass: MockSkillCategoriesService },
        { provide: StateService, useClass: MockStateService },
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
