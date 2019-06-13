import { SimpleChange } from '@angular/core';

export function hasChanged(change: SimpleChange): boolean {
  return change && change.previousValue !== change.currentValue
}
