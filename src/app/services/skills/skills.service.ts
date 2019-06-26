import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { ISkill } from '../../models/skill.interface'
import { BaseCrudService, IBaseCrudService } from '../abstract/base-crud.service'

@Injectable()
export class SkillsService extends BaseCrudService<ISkill>
  implements IBaseCrudService<ISkill> {
  endpoint = '/skills'

  constructor(protected http: HttpClient) {
    super(http)
  }
}
