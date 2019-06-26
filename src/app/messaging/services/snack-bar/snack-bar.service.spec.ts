import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '../../../material.module'
import { SnackBarService } from './snack-bar.service'

describe('SnackBarService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [SnackBarService],
    })
  )

  it('should be created', () => {
    const service: SnackBarService = TestBed.get(SnackBarService)
    expect(service).toBeTruthy()
  })
})
