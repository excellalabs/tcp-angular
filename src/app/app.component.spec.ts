import { TestBed, async } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'

import { AppComponent } from './app.component'
import { MainNavComponent } from './main-nav/main-nav.component'
import { MaterialModule } from './material.module'
import { AuthService } from './services/auth/auth.service'
import { MockAuthService } from './services/auth/auth.service.fake'
import { EmployeesService } from './services/employees/employees.service'
import { MockEmployeesService } from './services/employees/employees.service.fake'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, MainNavComponent],
      imports: [MaterialModule, NoopAnimationsModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: EmployeesService, useClass: MockEmployeesService }
      ],
    }).compileComponents()
  }))
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  }))
})
