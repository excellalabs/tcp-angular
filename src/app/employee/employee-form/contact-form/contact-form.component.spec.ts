import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from 'src/app/material.module'
import { PipeModule } from 'src/app/pipes/pipe.module'

import { StateService } from '../../services/state/state.service'
import { MockStateService } from '../../services/state/state.service.fake'
import { AddressFormComponent } from './address-form/address-form.component'
import { ContactFormComponent } from './contact-form.component'

describe('ContactFormComponent', () => {
  let component: ContactFormComponent
  let fixture: ComponentFixture<ContactFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactFormComponent, AddressFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        NoopAnimationsModule,
        PipeModule,
      ],
      providers: [{ provide: StateService, useClass: MockStateService }],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
