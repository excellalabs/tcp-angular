import { LayoutModule } from '@angular/cdk/layout'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '../material.module'
import { MainNavComponent } from './main-nav.component'

describe('MainNavComponent', () => {
  let component: MainNavComponent
  let fixture: ComponentFixture<MainNavComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainNavComponent],
      imports: [NoopAnimationsModule, LayoutModule, MaterialModule],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should compile', () => {
    expect(component).toBeTruthy()
  })
})
