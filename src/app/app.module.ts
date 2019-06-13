import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
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

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    MainNavComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    EmployeeModule,
    AdminModule,
    PipeModule,
    ReactiveFormsModule,
    HttpClientModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
