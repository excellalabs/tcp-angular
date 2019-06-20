import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ChartsModule } from 'ng2-charts'

import { MaterialModule } from '../../material.module'
import { ChartComponent } from './chart.component'

describe('ChartComponent', () => {
  let component: ChartComponent
  let fixture: ComponentFixture<ChartComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
      imports: [MaterialModule, NoopAnimationsModule, ChartsModule],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
