import { Pipe, PipeTransform } from '@angular/core'

export const requiredPostfix = ' is a required field'

@Pipe({
  name: 'requiredMessage',
})
export class RequiredMessagePipe implements PipeTransform {
  postfix: string = requiredPostfix

  transform(value: any, args?: any): any {
    return value + this.postfix
  }
}
