import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { ISkill } from '../../models/skill.interface'
import { BaseCrudService } from '../base-crud.service';

@Injectable()
export class SkillsService extends BaseCrudService<ISkill> {

  endpoint = '/skills'

  constructor(protected http: HttpClient) {
    super(http)
  }
}
