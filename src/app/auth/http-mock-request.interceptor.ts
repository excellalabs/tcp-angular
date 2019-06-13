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
    if (request.url === 'test') {
      console.log('Loaded from json : ' + request.url)
      return of(
        new HttpResponse({
          status: 200,
          body: ({} as any).default,
        })
      )
    } else if (request.url === 'login') {
      console.log('Loaded from json : ' + request.url)
      if (
        request.headers.get('u') === 'admin' &&
        request.headers.get('p') === 'password'
      ) {
        return of(
          new HttpResponse({
            status: 200,
            body:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjAzNTQ4MTk5MjEsImV4cCI6MTU5MTk4NDMyOTA4OSwia2V5IjoxMjM0NX0.agZBFAV20WhrIUup-ju63cPQcD2zrXzPVnw24fJEmxI',
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
