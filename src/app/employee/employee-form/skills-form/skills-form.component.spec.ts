import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '../../../material.module'
import { SkillCategoriesService } from '../../../services/skill-categories/skill-categories.service'
import { MockSkillCategoriesService } from '../../../services/skill-categories/skill-categories.service.fake'
import { SkillsService } from '../../../services/skills/skills.service'
import { MockSkillsService } from '../../../services/skills/skills.service.fake'
import { PrimarySkillService } from '../../services/primary-skill/primary-skill.service'
import { SkillDetailComponent } from './skill-detail/skill-detail.component'
import { SkillsFormComponent } from './skills-form.component'

describe('SkillsFormComponent', () => {
  let component: SkillsFormComponent
  let fixture: ComponentFixture<SkillsFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillsFormComponent, SkillDetailComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        NoopAnimationsModule,
      ],
      providers: [
        PrimarySkillService,
        { provide: SkillsService, useClass: MockSkillsService },
        { provide: SkillCategoriesService, useClass: MockSkillCategoriesService },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
