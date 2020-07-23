import { EventEmitter, Directive } from '@angular/core'
import { AbstractControl, FormControl, FormGroup } from '@angular/forms'

import { BaseForm } from './base-form.class'

@Directive()
class BasicBaseForm extends BaseForm {
  constructor() {
    super()
    this.formGroup = this.buildForm()
  }

  buildForm(): FormGroup {
    return new FormGroup({})
  }
}

describe('BaseForm', () => {
  let baseForm: BaseForm
  beforeEach(() => {
    baseForm = new BasicBaseForm()
  })

  it('should create an instance', () => {
    expect(baseForm).toBeTruthy()
  })
  it('should provide a formReady emitter', () => {
    expect(baseForm.formReady instanceof EventEmitter).toBe(true)
  })

  describe('#emitFormReady()', () => {
    it('should emit the formGroup by default', done => {
      baseForm.formReady.subscribe(obj => {
        expect(obj).toBe(baseForm.formGroup)
        done()
      })
      baseForm.emitFormReady()
    })
    it('should emit the provided AbstractControl', done => {
      const control = new FormControl('test')
      baseForm.formReady.subscribe(obj => {
        expect(obj).toBe(control)
        done()
      })
      baseForm.emitFormReady(control)
    })
  })

  describe('#registerForm()', () => {
    it('should set the provided control to the provided value', () => {
      baseForm.registerForm('test', new FormControl('water'))
      expect(baseForm.formGroup.contains('test')).toBe(true)
      expect(baseForm.formGroup.get('test').value).toBe('water')
    })
  })

  describe('#deregisterForm()', () => {
    it('should remove the control based on name provided', () => {
      // Arrange
      baseForm.registerForm('test', new FormControl('water'))
      expect(baseForm.formGroup.contains('test')).toBe(true)
      expect(baseForm.formGroup.get('test').value).toBe('water')
      // Act
      baseForm.deregisterForm('test')
      // Assert
      expect(baseForm.formGroup.contains('test')).toBe(false)
    })
  })
})
