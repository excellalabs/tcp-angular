import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { SkillCategoriesService } from 'src/app/services/skill-categories/skill-categories.service';
import { MockSkillCategoriesService } from 'src/app/services/skill-categories/skill-categories.service.fake';

import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ManageCategoriesComponent } from './manage-categories.component'

describe('ManageCategoriesComponent', () => {
  let component: ManageCategoriesComponent
  let fixture: ComponentFixture<ManageCategoriesComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCategoriesComponent, CategoryFormComponent, CategoryListComponent],
      imports: [FormsModule, ReactiveFormsModule, FlexLayoutModule, MaterialModule, NoopAnimationsModule, PipeModule],
      providers: [
        { provide: SkillCategoriesService, useClass: MockSkillCategoriesService}
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCategoriesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
