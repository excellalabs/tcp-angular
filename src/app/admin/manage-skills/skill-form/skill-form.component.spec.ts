import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '../../../material.module'
import { PipeModule } from '../../../pipes/pipe.module'
import { SkillCategoriesService } from '../../../services/skill-categories/skill-categories.service'
import { MockSkillCategoriesService } from '../../../services/skill-categories/skill-categories.service.fake'
import { SkillsService } from '../../../services/skills/skills.service'
import { MockSkillsService } from '../../../services/skills/skills.service.fake'
import { SkillFormComponent } from './skill-form.component'

describe('SkillFormComponent', () => {
  let component: SkillFormComponent
  let fixture: ComponentFixture<SkillFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        NoopAnimationsModule,
        PipeModule,
      ],
      providers: [
        { provide: SkillsService, useClass: MockSkillsService },
        { provide: SkillCategoriesService, useClass: MockSkillCategoriesService },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
