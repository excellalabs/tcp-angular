import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http'
import { Injectable, Injector } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Observable, of } from 'rxjs'

import { environment } from '../../environments/environment'
import { dummyEmployees} from '../services/employees/employees.service.fake'
import { dummySkillCategories } from '../services/skill-categories/skill-categories.service.fake'
import { dummySkills } from '../services/skills/skills.service.fake'

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
  jwtHelper = new JwtHelperService()

  localEmployees = dummyEmployees;
  localSkills = dummySkills;
  localSkillCategories = dummySkillCategories;

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    switch (request.url) {
      case `${environment.api}/oauth/token`:
        return this.mockLogin(request);
      case `${environment.api}/skill/`:
        return this.mockGetSkills();
      case `${environment.api}/skill-category/`:
        return this.mockGetSkillCategories();
      case `${environment.api}/employee/`:
        return this.mockGetEmployees();
      default:
        console.log(`no mock configuration for ${request.url}`)
    }

    return next.handle(request)
  }

  mockLogin(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    const username = request.body.updates.find(u => u.param === 'username').value
    const password = request.body.updates.find(u => u.param === 'password').value

    if (username === 'user' && password === 'pass') {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjAzNTQ4MTk5MjEsImV4cCI6MTU5MTk4NDMyOTA4OSwiZW1haWwiOiJqb24uZG9lQGdtYWlsLmNvbSIsImtleSI6ImFzZGYyNHNkIiwicm9sZSI6ImFkbWluIn0.1dxln22U-jkWVN0WDLH0ltpkW47YrI550OXn90v6ahI',
          },
        })
      )
    } else if (username === 'admin' && password === 'pass') {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1NzE4NjM4MjksImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwianRpIjoiZjI0NzBhMWUtMmE4My00YTZiLWEzZmQtZTcxOTc1NDFjYTlhIiwiZW1haWwiOiJsZXNsaWUua25vcGVAaW4ucGFya3MuZ292IiwiY2xpZW50X2lkIjoiYXBwIiwiaWF0IjoxNTcxODYwMjI5fQ.In73yyejYOBzbMoyQ40BD4vZ6TASYsbYiyGewwX1htI'
          },
        })
      )
    } else {
      throw new HttpErrorResponse({ error: 'failed login', status: 401 })
    }
  }

  mockGetSkills(): Observable<HttpEvent<any>> {
    return of(
      new HttpResponse({
        status: 200,
        body: this.localSkills
      })
    )
  }

  mockGetSkillCategories(): Observable<HttpEvent<any>> {
    return of(
      new HttpResponse({
        status: 200,
        body: this.localSkillCategories
      })
    )
  }

  mockGetEmployees(): Observable<HttpEvent<any>> {
    return of(
      new HttpResponse({
        status: 200,
        body: this.localEmployees
      })
    )
  }
}
