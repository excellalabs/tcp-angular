import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { SkillsService } from './skills.service'

describe('SkillsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [SkillsService],
      imports: [HttpClientTestingModule],
    })
  )

  it('should be created', () => {
    const service: SkillsService = TestBed.get(SkillsService)
    expect(service).toBeTruthy()
  })
})
