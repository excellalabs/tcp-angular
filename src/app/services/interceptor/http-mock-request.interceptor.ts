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

import { environment } from '../../../environments/environment'
import { IBaseItem } from '../../models/base-item.interface'
import { dummyEmployees } from '../employees/employees.service.fake'
import { dummySkillCategories } from '../skill-categories/skill-categories.service.fake'
import { dummySkills } from '../skills/skills.service.fake'

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
  jwtHelper = new JwtHelperService()

  localEmployees = dummyEmployees
  localSkills = dummySkills
  localSkillCategories = dummySkillCategories

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf(`${environment.api}/oauth/token`) >= 0) {
      // This cannot be used with real HTTP calls since it uses a fake token
      return this.mockLogin(request)
    } else if (request.url.indexOf(`${environment.api}/skill/`) >= 0) {
      return this.mockSkills(request)
    } else if (request.url.indexOf(`${environment.api}/skill-category/`) >= 0) {
      return this.mockSkillCategories(request)
    } else if (request.url.indexOf(`${environment.api}/employee/`) >= 0) {
      return this.mockEmployees(request)
    } else {
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
            access_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjAzNTQ4MTk5MjEsImV4cCI6MTU5MTk4NDMyOTA4OSwiZW1haWwiOiJqb24uZG9lQGdtYWlsLmNvbSIsImtleSI6ImFzZGYyNHNkIiwicm9sZSI6ImFkbWluIn0.1dxln22U-jkWVN0WDLH0ltpkW47YrI550OXn90v6ahI',
          },
        })
      )
    } else if (username === 'admin' && password === 'pass') {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            access_token:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1NzE4NjQ1Mjk5LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl0sImp0aSI6ImYyNDcwYTFlLTJhODMtNGE2Yi1hM2ZkLWU3MTk3NTQxY2E5YSIsImVtYWlsIjoiam9uLmRvZUBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJhcHAiLCJpYXQiOjE1NzE4NjAzNjF9.dGwAo6XINwY2wkg8jaFeo6DHId3eJCYy2moLUt3LDOk',
          },
        })
      )
    } else {
      throw new HttpErrorResponse({ error: 'failed login', status: 401 })
    }
  }

  mockSkills(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (request.method === 'POST') {
      this.mockPost(request.body, this.localSkills)
    } else if (request.method === 'PUT') {
      this.mockPut(request.body, this.localSkills)
    } else if (request.method === 'DELETE') {
      this.mockDelete(request.url, this.localSkills)
    }

    return of(
      new HttpResponse({
        status: 200,
        body: this.localSkills,
      })
    )
  }

  mockSkillCategories(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (request.method === 'POST') {
      this.mockPost(request.body, this.localSkillCategories)
    } else if (request.method === 'PUT') {
      this.mockPut(request.body, this.localSkillCategories)
    } else if (request.method === 'DELETE') {
      this.mockDelete(request.url, this.localSkillCategories)
    }

    return of(
      new HttpResponse({
        status: 200,
        body: this.localSkillCategories,
      })
    )
  }

  mockEmployees(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (request.method === 'POST') {
      this.mockPost(request.body, this.localEmployees)
    } else if (request.method === 'PUT') {
      this.mockPut(request.body, this.localEmployees)
    } else if (request.method === 'DELETE') {
      this.mockDelete(request.url, this.localEmployees)
    }

    // getById
    if (request.method === 'GET' && request.url.match(/employee\/\d/)) {
      const id = this.getIdFromUrl(request.url)
      const matchingItem = this.localEmployees.find(i => i.id === id)
      return of(
        new HttpResponse({
          status: 200,
          body: matchingItem,
        })
      )
    }

    return of(
      new HttpResponse({
        status: 200,
        body: this.localEmployees,
      })
    )
  }

  mockPost(item: IBaseItem, localItems: IBaseItem[]): void {
    item.id = Math.max(...localItems.map(i => i.id), 0) + 1
    localItems.push(item)
  }

  mockPut(updatedItem: IBaseItem, localItems: IBaseItem[]): void {
    const existingItemIndex = localItems.findIndex(i => i.id === updatedItem.id)
    localItems[existingItemIndex] = updatedItem
  }

  mockDelete(url: string, localItems: IBaseItem[]): void {
    const id = this.getIdFromUrl(url)
    const index = localItems.findIndex(i => i.id === id)
    localItems.splice(index, 1)
  }

  getIdFromUrl(url: string): number {
    const parsedURL = url.split('/')
    return Number(parsedURL[parsedURL.length - 1])
  }
}
