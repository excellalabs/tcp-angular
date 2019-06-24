import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable()
export class PrimarySkillService {
  readonly primarySkill$ = new BehaviorSubject<number>(-1)

  constructor() {}

  // For use when on deletion, in order to maintain a chosen Primary
  //     if the currently chosen Primary is the item deleted
  clearPrimarySkill(index: number) {
    if (this.primarySkill$.value === index) {
      this.primarySkill$.next(0)
    }
  }
}
