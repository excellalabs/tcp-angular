import { TestBed } from '@angular/core/testing'

import { PrimarySkillService } from './primary-skill.service'

describe('PrimarySkillService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [PrimarySkillService],
    })
  )

  it('should be created', () => {
    const service: PrimarySkillService = TestBed.get(PrimarySkillService)
    expect(service).toBeTruthy()
  })
})
