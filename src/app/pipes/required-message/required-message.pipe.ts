import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'requiredMessage',
})
export class RequiredMessagePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return `${value} is a required field`
  }
}
