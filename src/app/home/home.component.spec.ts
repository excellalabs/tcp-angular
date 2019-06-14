import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { EmployeesService } from '../services/employees/employees.service';
import { MockEmployeesService } from '../services/employees/employees.service.fake';
import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: EmployeesService, useClass: MockEmployeesService }]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
