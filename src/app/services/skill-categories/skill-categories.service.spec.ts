import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { MessagingModule } from '../../messaging/messaging.module'
import { SkillCategoriesService } from './skill-categories.service'

describe('SkillCategoriesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [SkillCategoriesService],
      imports: [HttpClientTestingModule, MessagingModule],
    })
  )

  it('should be created', () => {
    const service: SkillCategoriesService = TestBed.get(SkillCategoriesService)
    expect(service).toBeTruthy()
  })
})
