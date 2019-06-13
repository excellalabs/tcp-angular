import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
} from '@angular/material'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { AddressFormComponent } from './address-form.component'

describe('AddressFormComponent', () => {
  let component: AddressFormComponent
  let fixture: ComponentFixture<AddressFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressFormComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should compile', () => {
    expect(component).toBeTruthy()
  })
})
