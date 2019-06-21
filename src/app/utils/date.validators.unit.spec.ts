import { AbstractControl } from '@angular/forms'
import * as moment from 'moment'

import { DateValidators } from './date.validators'

describe('DateValidators', () => {
  describe('validDate', () => {
    let today: string
    beforeEach(() => {
      today = moment().format('MM/DD/YYYY')
    })
    it('should accept today as valid', () => {
      expect(DateValidators.validDate()({ value: today } as AbstractControl)).toBeNull()
    })
    it('should be invalid when not a legal month', () => {
      expect(
        DateValidators.validDate()({ value: '13/01/2000' } as AbstractControl)
      ).toEqual({ invalidDate: '13/01/2000' })
    })
  })

  describe('ofAge', () => {
    it('should reject invalid dates like validDate', () => {
      expect(DateValidators.ofAge()({ value: '13/01/2000' } as AbstractControl)).toEqual({
        invalidDate: '13/01/2000',
      })
    })
    it('should return null if today is 18th birthday', () => {
      const birthDay = moment()
        .startOf('day')
        .subtract(18, 'years')
        .format('MM/DD/YYYY')
      expect(DateValidators.ofAge()({ value: birthDay } as AbstractControl)).toBeNull()
    })
    it('should reject if 18th birthday is tomorrow', () => {
      const birthDay = moment()
        .startOf('day')
        .subtract(18, 'years')
        .add(1, 'days')
        .format('MM/DD/YYYY')
      expect(DateValidators.ofAge()({ value: birthDay } as AbstractControl)).toEqual({
        age: { requiredAge: 18, actualAge: 17 },
      })
    })
    it('should return null if birthday was yesterday', () => {
      const birthDay = moment()
        .startOf('day')
        .subtract(18, 'years')
        .subtract(1, 'days')
        .format('MM/DD/YYYY')
      expect(DateValidators.ofAge()({ value: birthDay } as AbstractControl)).toBeNull()
    })
    it('should support overloading with a custom age', () => {
      const birthDay = moment()
        .startOf('day')
        .subtract(21, 'years')
        .add(1, 'days')
        .format('MM/DD/YYYY')
      expect(DateValidators.ofAge(21)({ value: birthDay } as AbstractControl)).toEqual({
        age: { requiredAge: 21, actualAge: 20 },
      })
    })
  })
})
