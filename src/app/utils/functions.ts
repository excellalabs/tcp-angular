import { SimpleChange } from '@angular/core'

import { IEmployeeSkill, PROFICIENCY } from '../models/skill.interface';

export function hasChanged(change: SimpleChange): boolean {
  return change && change.previousValue !== change.currentValue
}

export function stringCompare(a: string, b: string): number {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

export function sortEmployeeSkillsByImpact(a: IEmployeeSkill, b: IEmployeeSkill): number {

  // First sort, primary
  if (a.primary || b.primary) {
    return a.primary ? -1 : 1
  }

  // Second Sort, Proficiency
  if (a.proficiency !== b.proficiency) {
    switch(a.proficiency) {
      case PROFICIENCY.HIGH:
        return -1
      case PROFICIENCY.MID:
        return b.proficiency === PROFICIENCY.HIGH ? 1 : -1
      default:
        return 1
    }
  }

  // Third Sort, Name
  return stringCompare(a.skill.name, b.skill.name)
}
