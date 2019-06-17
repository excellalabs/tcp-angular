import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from 'src/app/material.module'
import { ICategory } from 'src/app/models/skill.interface'
import { PipeModule } from 'src/app/pipes/pipe.module'
import { SkillCategoriesService } from 'src/app/services/skill-categories/skill-categories.service'
import { MockSkillCategoriesService } from 'src/app/services/skill-categories/skill-categories.service.fake'

import { CategoryFormComponent } from './category-form/category-form.component'
import { CategoryListComponent } from './category-list/category-list.component'
import { ManageCategoriesComponent } from './manage-categories.component'

describe('ManageCategoriesComponent', () => {
  let component: ManageCategoriesComponent
  let fixture: ComponentFixture<ManageCategoriesComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ManageCategoriesComponent,
        CategoryFormComponent,
        CategoryListComponent,
      ],
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

  beforeEach(async () => {
    fixture = TestBed.createComponent(ManageCategoriesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Child Event Bindings', () => {
    it('should register edit events from CategoryListComponent', () => {
      spyOn(component, 'onEditCategory').and.callThrough()
      const button = fixture.debugElement.nativeElement.querySelector(
        'button#edit-category-1'
      )
      button.click()
      expect(component.onEditCategory).toHaveBeenCalledWith(1)
    })
    it('should register delete events from CategoryListComponent', () => {
      spyOn(component, 'onDeleteCategory').and.callThrough()
      const button = fixture.debugElement.nativeElement.querySelector(
        'button#delete-category-1'
      )
      button.click()
      expect(component.onDeleteCategory).toHaveBeenCalledWith(1)
    })
    xit('should register add/update events from CategoryFormComponent', async () => {
      // Arrange
      spyOn(component, 'onAddCategory').and.callThrough()
      const input = fixture.debugElement.nativeElement.querySelector(
        'input#category-name'
      )
      input.value = 'Name'
      input.dispatchEvent(new Event('keyup'))
      fixture.detectChanges()
      await fixture.whenStable()
      // Act
      const button = fixture.debugElement.nativeElement.querySelector(
        'button#submit-category'
      )
      button.click()
      fixture.detectChanges()
      await fixture.whenStable()
      // Assert
      expect(component.onAddCategory).toHaveBeenCalledWith({
        name: 'Name',
        id: undefined,
      } as ICategory)
    })
  })
})
