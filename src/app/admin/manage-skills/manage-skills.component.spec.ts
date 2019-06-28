import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '../../material.module'
import { SnackBarService } from '../../messaging/services/snack-bar/snack-bar.service'
import { MockSnackBarService } from '../../messaging/services/snack-bar/snack-bar.service.fake'
import { PipeModule } from '../../pipes/pipe.module'
import { SkillCategoriesService } from '../../services/skill-categories/skill-categories.service'
import { MockSkillCategoriesService } from '../../services/skill-categories/skill-categories.service.fake'
import { SkillsService } from '../../services/skills/skills.service'
import { MockSkillsService } from '../../services/skills/skills.service.fake'
import { ManageSkillsComponent } from './manage-skills.component'
import { SkillFormComponent } from './skill-form/skill-form.component'
import { SkillListComponent } from './skill-list/skill-list.component'

describe('ManageSkillsComponent', () => {
  let component: ManageSkillsComponent
  let fixture: ComponentFixture<ManageSkillsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageSkillsComponent, SkillFormComponent, SkillListComponent],
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
        { provide: SnackBarService, useClass: MockSnackBarService },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSkillsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
