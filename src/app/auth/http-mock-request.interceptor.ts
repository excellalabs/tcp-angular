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

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
  jwtHelper = new JwtHelperService()

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url === 'login') {
      console.log('Loaded from json : ' + request.url)
      if (
        request.headers.get('u') === 'admin' &&
        request.headers.get('p') === 'password'
      ) {
        return of(
          new HttpResponse({
            status: 200,
            body:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjAzNTQ4MTk5MjEsImV4cCI6MTU5MTk4NDMyOTA4OSwiZW1haWwiOiJqb24uZG9lQGdtYWlsLmNvbSIsImtleSI6ImFzZGYyNHNkIiwicm9sZSI6ImFkbWluIn0.1dxln22U-jkWVN0WDLH0ltpkW47YrI550OXn90v6ahI',
          })
        )
      } else if (
        request.headers.get('u') === 'user' &&
        request.headers.get('p') === 'password'
      ) {
        return of(
          new HttpResponse({
            status: 200,
            body:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjAzNTQ4MTk5MjEsImV4cCI6MTU5MTk4NDMyOTA4OSwiZW1haWwiOiJqb24uZG9lQGdtYWlsLmNvbSIsImtleSI6ImFzZGYyNHNkIiwicm9sZSI6InVzZXIifQ.vnbR72yHX00WxfuffPtvJHshw8_ovRaDoCiMX9O0zVU',
          })
        )
      } else {
        throw new HttpErrorResponse({ error: 'failed login', status: 401 })
      }
    }
    console.log('Loaded from http call :' + request.url)
    return next.handle(request)
  }
}
