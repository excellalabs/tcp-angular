import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import * as moment from 'moment'

// @dynamic
export class DateValidators {
  static validDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const value = control ? control.value : null
      return DateValidators.validDateHelper(value)
    }
  }

  private static validDateHelper(value: string): ValidationErrors {
    return value && moment(new Date(value)).isValid() ? null : { invalidDate: value }
  }

  static ofAge(years: number = 18): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const value = control ? control.value : null
      const validity = DateValidators.validDateHelper(value)
      if (validity !== null) {
        return validity
      }

      const bornBefore = moment()
        .startOf('day')
        .subtract(years, 'years')
      const birthDate = moment(new Date(value))
      return birthDate.isSame(bornBefore) || birthDate.isBefore(bornBefore)
        ? null
        : {
            age: {
              requiredAge: years,
              actualAge: moment().diff(birthDate, 'years'),
            },
          }
    }
  }
}
