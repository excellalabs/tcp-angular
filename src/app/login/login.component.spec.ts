import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../material.module';
import { AuthService } from '../services/auth/auth.service';
import { MockAuthService } from '../services/auth/auth.service.fake';
import { LoginComponent } from './login.component'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule, MaterialModule, NoopAnimationsModule, RouterTestingModule],
      providers: [{provide: AuthService, useClass: MockAuthService}]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
