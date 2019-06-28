import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { JwtModule } from '@auth0/angular-jwt'
import { ChartsModule } from 'ng2-charts'

import { AdminModule } from './admin/admin.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpMockRequestInterceptor } from './auth/http-mock-request.interceptor'
import { TokenInterceptor } from './auth/token.interceptor'
import { EmployeeModule } from './employee/employee.module'
import { ErrorComponent } from './error/error.component'
import { ChartComponent } from './home/chart/chart.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { MainNavComponent } from './main-nav/main-nav.component'
import { MaterialModule } from './material.module'
import { MessagingModule } from './messaging/messaging.module'
import { PipeModule } from './pipes/pipe.module'
import { AuthService } from './services/auth/auth.service'
import { EmployeesService } from './services/employees/employees.service'
import { SkillCategoriesService } from './services/skill-categories/skill-categories.service'
import { SkillsService } from './services/skills/skills.service'

export function tokenGetterFn() {
  return localStorage.getItem('tcp-angular')
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    MainNavComponent,
    ChartComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MaterialModule,
    EmployeeModule,
    AdminModule,
    PipeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    ChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetterFn,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: [],
      },
    }),
    MessagingModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMockRequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    EmployeesService,
    SkillsService,
    SkillCategoriesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
