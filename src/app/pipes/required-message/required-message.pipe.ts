import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'requiredMessage',
})
export class RequiredMessagePipe implements PipeTransform {
  static postfix: ' is a required field'

  transform(value: any, args?: any): any {
    return value + RequiredMessagePipe.postfix
  }
}
