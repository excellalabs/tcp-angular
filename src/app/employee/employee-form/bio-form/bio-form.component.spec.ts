import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { PipeModule } from 'src/app/pipes/pipe.module';

import { BioFormComponent } from './bio-form.component'

describe('BioFormComponent', () => {
  let component: BioFormComponent
  let fixture: ComponentFixture<BioFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BioFormComponent],
      imports: [FormsModule, ReactiveFormsModule, FlexLayoutModule, NoopAnimationsModule, MaterialModule, PipeModule]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BioFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
