import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import {
  RequiredMessagePipe,
  requiredPostfix,
} from 'src/app/pipes/required-message/required-message.pipe'

import { MaterialModule } from '../../../material.module'
import { ICategory } from '../../../models/skill.interface'
import { PipeModule } from '../../../pipes/pipe.module'
import { SkillCategoriesService } from '../../../services/skill-categories/skill-categories.service'
import { MockSkillCategoriesService } from '../../../services/skill-categories/skill-categories.service.fake'
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

  describe('Name field', () => {
    let nameField: AbstractControl
    let error: DebugElement
    beforeEach(() => {
      nameField = component.formGroup.get('name')
    })

    it('should display the required error message', async () => {
      expect(nameField.hasError('required')).toBe(true)
      nameField.markAllAsTouched()
      fixture.detectChanges()
      await fixture.whenStable()
      error = fixture.debugElement.query(By.css('.mat-error'))
      expect(error.nativeElement.textContent.trim()).toEqual(
        'Category Name' + requiredPostfix
      )
    })
    it('should display the required error message', async () => {
      expect(nameField.hasError('required')).toBe(true)
      nameField.setValue('ab')
      nameField.markAllAsTouched()
      fixture.detectChanges()
      await fixture.whenStable()
      error = fixture.debugElement.query(By.css('.mat-error'))
      expect(error.nativeElement.textContent.trim()).toEqual(
        'Category Name must be at least 3 characters'
      )
    })
  })

  describe('Submit button', () => {
    let button: DebugElement
    beforeEach(() => {
      button = fixture.debugElement.query(By.css('button#submit-category'))
    })

    it('should be disabled when the formGroup is invalid', () => {
      expect(component.formGroup.invalid).toBe(true)
      expect(button.nativeElement.disabled).toBe(true)
    })
    it('should be enabled when the formGroup is valid', async () => {
      component.formGroup.get('name').setValue('Category Name')
      fixture.detectChanges()
      await fixture.whenStable()
      expect(component.formGroup.valid).toBe(true)
      expect(button.nativeElement.disabled).toBe(false)
    })
    it('should call onSubmit() when clicked', async () => {
      spyOn(component, 'onSubmit').and.callThrough()
      component.formGroup.get('name').setValue('Category Name')
      fixture.detectChanges()
      await fixture.whenStable()
      button.nativeElement.click()
      expect(component.onSubmit).toHaveBeenCalled()
    })
    it('should be labeled "Add Category" when not editing', async () => {
      component.category = null
      fixture.detectChanges()
      await fixture.whenStable()
      expect(button.nativeElement.textContent.trim()).toBe('Add Category')
    })
    it('should be labeled "Update Category" when not editing', async () => {
      component.category = { id: 1, name: 'Sample Category' } as ICategory
      fixture.detectChanges()
      await fixture.whenStable()
      expect(button.nativeElement.textContent.trim()).toBe('Update Category')
    })
  })
})
