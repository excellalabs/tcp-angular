import { EventEmitter, SimpleChange } from '@angular/core'
import { AbstractControl, FormBuilder } from '@angular/forms'

import { ICategory } from '../../../models/skill.interface'
import { CategoryFormComponent } from './category-form.component'

describe('CategoryFormComponent (Unit)', () => {
  let component: CategoryFormComponent
  beforeEach(() => {
    component = new CategoryFormComponent(new FormBuilder())
  })

  describe('constructor', () => {
    it('should build the formGroup via #buildForm()', () => {
      expect(component.formGroup).toBeTruthy()
      expect(component.formGroup.contains('name'))
    })
    it('should have an addCategory EventEmitter', () => {
      expect(component.submitCategory instanceof EventEmitter).toBe(true)
    })
  })

  describe('OnChanges', () => {
    it('should reset the formGroup when category is set to null', () => {
      spyOn(component.formGroup, 'reset').and.callThrough()
      component.category = null
      component.ngOnChanges({ category: new SimpleChange({} as ICategory, null, false) })
      expect(component.formGroup.reset).toHaveBeenCalled()
    })
    it('should patch the formGroup when category is set to an object', () => {
      spyOn(component.formGroup, 'patchValue').and.callThrough()
      component.category = { id: 3, name: 'New Category' }
      component.ngOnChanges({
        category: new SimpleChange(null, component.category, false),
      })
      expect(component.formGroup.patchValue).toHaveBeenCalledWith(component.category)
    })
    it('should do nothing if there is not a real change', () => {
      spyOn(component.formGroup, 'reset').and.callThrough()
      spyOn(component.formGroup, 'patchValue').and.callThrough()
      component.ngOnChanges({ category: new SimpleChange(null, null, false) })
      expect(component.formGroup.reset).not.toHaveBeenCalled()
      expect(component.formGroup.patchValue).not.toHaveBeenCalled()
    })
  })

  describe('#buildForm()', () => {
    it('should have a name control', () => {
      expect(component.buildForm().contains('name')).toBe(true)
    })
    describe('name field', () => {
      let field: AbstractControl
      beforeEach(() => {
        field = component.formGroup.get('name')
      })
      it('should be required', () => {
        expect(field.hasError('required')).toBe(true)
      })
      it('should enforce a 3 character minimum length', () => {
        field.setValue('ab')
        expect(field.hasError('minlength')).toBe(true)
        expect(field.getError('minlength').requiredLength).toBe(3)
      })
    })
  })

  describe('#onSubmit()', () => {
    it('should emit the new category via addCategory', () => {
      spyOn(component.submitCategory, 'emit').and.callThrough()
      component.category = null
      component.formGroup.get('name').setValue('New Category')
      component.onSubmit()
      expect(component.submitCategory.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({ name: 'New Category' })
      )
    })
    it('should emit the updated category value via addCategory when editing', () => {
      spyOn(component.submitCategory, 'emit').and.callThrough()
      component.category = { id: 15, name: 'Old Category' }
      component.formGroup.get('name').setValue('New Category')
      component.onSubmit()
      expect(component.submitCategory.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({ id: 15, name: 'New Category' })
      )
    })
  })
})
