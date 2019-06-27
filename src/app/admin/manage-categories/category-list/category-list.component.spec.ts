import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '../../../material.module'
import { PipeModule } from '../../../pipes/pipe.module'
import { SkillCategoriesService } from '../../../services/skill-categories/skill-categories.service'
import { MockSkillCategoriesService } from '../../../services/skill-categories/skill-categories.service.fake'
import { SkillsService } from '../../../services/skills/skills.service'
import { MockSkillsService } from '../../../services/skills/skills.service.fake'
import { CategoryListComponent } from './category-list.component'

describe('CategoryListComponent', () => {
  let component: CategoryListComponent
  let fixture: ComponentFixture<CategoryListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryListComponent],
      imports: [MaterialModule, NoopAnimationsModule, PipeModule],
      providers: [
        { provide: SkillCategoriesService, useClass: MockSkillCategoriesService },
        { provide: SkillsService, useClass: MockSkillsService },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
