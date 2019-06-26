import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatChipInputEvent } from '@angular/material'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '../../../material.module'
import { SkillsService } from '../../../services/skills/skills.service'
import {
  MockSkillsService,
  dummySkills,
} from '../../../services/skills/skills.service.fake'
import { ListControlsComponent } from './list-controls.component'

describe('ListControlsComponent', () => {
  let component: ListControlsComponent
  let fixture: ComponentFixture<ListControlsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListControlsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: SkillsService, useClass: MockSkillsService }],
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

  it('should emit on nameFilter$ when a name is entered', done => {
    const nameInput = 'doe'
    component.nameFilter$.subscribe(name => {
      expect(name).toEqual(nameInput)
      done()
    })
    component.nameFilter.setValue(nameInput)
  })

  it('should emit on skillFilter$ when a skill is added', done => {
    const skillInput = dummySkills[0]
    component.skillFilters$.subscribe(skills => {
      if (skills.length > 0) {
        expect(skills).toContain(skillInput)
        done()
      }
    })
    component.add({ input: null, value: skillInput.name } as MatChipInputEvent)
  })
})
