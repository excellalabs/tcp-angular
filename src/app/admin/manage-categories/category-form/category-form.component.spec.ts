import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from 'src/app/material.module'
import { PipeModule } from 'src/app/pipes/pipe.module'
import { SkillCategoriesService } from 'src/app/services/skill-categories/skill-categories.service'
import { MockSkillCategoriesService } from 'src/app/services/skill-categories/skill-categories.service.fake'

import { CategoryFormComponent } from './category-form.component'

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent
  let fixture: ComponentFixture<CategoryFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        NoopAnimationsModule,
        PipeModule,
      ],
      providers: [
        { provide: SkillCategoriesService, useClass: MockSkillCategoriesService },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
