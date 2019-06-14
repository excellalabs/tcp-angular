import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { StateService } from './state.service'

describe('StateService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [StateService],
      imports: [HttpClientTestingModule],
    })
  )

  it('should be created', () => {
    const service: StateService = TestBed.get(StateService)
    expect(service).toBeTruthy()
  })
})
