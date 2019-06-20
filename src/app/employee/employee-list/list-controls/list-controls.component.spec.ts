import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { SkillsService } from 'src/app/services/skills/skills.service';
import { MockSkillsService } from 'src/app/services/skills/skills.service.fake';

import { ListControlsComponent } from './list-controls.component'

describe('ListControlsComponent', () => {
  let component: ListControlsComponent
  let fixture: ComponentFixture<ListControlsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListControlsComponent],
      imports: [FormsModule, ReactiveFormsModule, FlexLayoutModule, MaterialModule, NoopAnimationsModule],
      providers: [
        { provide: SkillsService, useClass: MockSkillsService }
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ListControlsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
