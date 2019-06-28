import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { ICategory } from '../../models/skill.interface'
import { BaseCrudService, IBaseCrudService } from '../abstract/base-crud.service'

@Injectable()
export class SkillCategoriesService extends BaseCrudService<ICategory>
  implements IBaseCrudService<ICategory> {
  endpoint = '/skill-category/'

  constructor(protected http: HttpClient) {
    super(http)
  }
}
