import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms'
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { JwtModule } from '@auth0/angular-jwt'

import { AdminModule } from './admin/admin.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpMockRequestInterceptor } from './auth/http-mock-request.interceptor'
import { EmployeeModule } from './employee/employee.module'
import { ErrorComponent } from './error/error.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { MainNavComponent } from './main-nav/main-nav.component'
import { MaterialModule } from './material.module'
import { PipeModule } from './pipes/pipe.module'
import { AuthService } from './services/auth/auth.service'
import { EmployeesService } from './services/employees/employees.service'
import { SkillCategoriesService } from './services/skill-categories/skill-categories.service'
import { SkillsService } from './services/skills/skills.service'

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    MainNavComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    EmployeeModule,
    AdminModule,
    PipeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('tcp-angular')
        },
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: [],
      },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMockRequestInterceptor,
      multi: true,
    },
    EmployeesService,
    SkillsService,
    SkillCategoriesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
