import { TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from 'src/app/material.module'

import { DialogService } from './dialog.service'

describe('DialogService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [DialogService],
    })
  )

  it('should be created', () => {
    const service: DialogService = TestBed.get(DialogService)
    expect(service).toBeTruthy()
  })
})
