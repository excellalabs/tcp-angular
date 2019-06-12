import { BehaviorSubject } from 'rxjs';
import { ICategory } from '../../models/skill.interface';
import { Injectable } from '@angular/core';

export const dummySkillCategories: ICategory[] = [
  { id: 1, name: 'Agile'},
  { id: 2, name: 'Software'},
  { id: 3, name: 'Business'},
  { id: 4, name: 'Dev Ops'}
] as ICategory[];

@Injectable({
  providedIn: 'root'
})
export class SkillCategoriesService {

  readonly list = new BehaviorSubject<ICategory[]>([]);

  constructor() { }

  fetch(): void {
    this.list.next(dummySkillCategories);
  }
}
