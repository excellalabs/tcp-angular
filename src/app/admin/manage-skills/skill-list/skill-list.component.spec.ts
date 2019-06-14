import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { SkillsService } from 'src/app/services/skills/skills.service';
import { MockSkillsService } from 'src/app/services/skills/skills.service.fake';

import { SkillListComponent } from './skill-list.component'

describe('SkillListComponent', () => {
  let component: SkillListComponent
  let fixture: ComponentFixture<SkillListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillListComponent],
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [
       { provide: SkillsService, useClass: MockSkillsService }
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
